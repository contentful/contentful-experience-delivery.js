# Integration tests

Live tests that call the real Delivery, Preview and Management APIs through the SDK in this checkout. They are kept
out of `pnpm test` (the `unit` project) and are not run by `ci.yml`.

`.fernignore` keeps Fern from overwriting this folder and `vitest.integration.config.mts`. It cannot protect a single
line of `package.json`, which Fern owns, so the `test:integration` script is **not** protected yet: a regeneration can
drop it until it is added to `generators.yml` (`packageJson.scripts`) in `sdk-generation-config`. The
`npx vitest run` command below works either way.

## Run

```bash
cp tests/integration/.env.example tests/integration/.env   # then fill it in
npx vitest run --config vitest.integration.config.mts      # same as `pnpm test:integration`
```

Type-check the folder with `npx tsc -p tests/integration/tsconfig.json`. The repo-wide `tests/tsconfig.json` targets
ES6 without Node types and cannot check these files.

## Environment

| Variable                            | Required | Default  | Notes                                                                                                       |
| ----------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `CONTENTFUL_SPACE_ID`               | yes      |          | A space with ExO enabled (the `exoM1` entitlement)                                                          |
| `CONTENTFUL_CDA_TOKEN`              | yes      |          | Delivery token                                                                                              |
| `CONTENTFUL_CPA_TOKEN`              | yes      |          | Preview token                                                                                               |
| `CONTENTFUL_CMA_TOKEN`              | yes      |          | Personal access token that can create and delete ExO entities                                               |
| `CONTENTFUL_ENV_ID`                 | no       | `master` |                                                                                                             |
| `CONTENTFUL_DESTINATION_CHANNEL_ID` | no       | `web`    | Must be a **published** organization channel with a `Path` node property. See below. The tests only read it |
| `CONTENTFUL_API_TARGET`             | no       | `prod`   | `prod` or `staging`. Picks the delivery, preview and management hosts together                              |

Variables already exported in your shell win over `.env`. Use `env -u CONTENTFUL_SPACE_ID ...` if a stale value is
getting in the way.

### The destination channel

Destinations need an organization channel, and the tests only read it. It must be **published** and must declare a
`Path` node property, because the tests create nodes with a `Path` property and the Management API rejects those
otherwise (422 `UnknownNodePropertyType`). A minimal channel that works:

```json
{ "name": "web", "properties": [], "nodeProperties": [{ "name": "path", "type": "Path" }] }
```

If it is missing, the destination tests fail in setup with `Channel "<id>" does not exist` (not found in the space's
organization), `is not published`, or the 422 above. The delivery and preview tests are unaffected.

## Running in CI

`.github/workflows/integration.yml` runs the suite on every PR from a branch in this repo, Fern's included, and on
manual dispatch. Forks are skipped because they cannot read secrets. It is not a required check (the required list is
in the repo ruleset), so a failure is a signal for the reviewer, not a block.

Renovate's PRs (`renovate/**` branches) are skipped on purpose. The shared Renovate config automerges only when every
status check passes, not just the required ones, so a red run would stall dependency updates.
- Repository **secrets**, all four required: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_CDA_TOKEN`, `CONTENTFUL_CPA_TOKEN`,
  `CONTENTFUL_CMA_TOKEN`.
- Repository **variables**, optional: `CONTENTFUL_API_TARGET`, `CONTENTFUL_ENV_ID`,
  `CONTENTFUL_DESTINATION_CHANNEL_ID`. Empty values fall back to the defaults above.
- Use a dedicated space with the ExO entitlement and a published channel, and a service-account CMA token rather than a
  personal one.
- Until all four secrets exist, the `integration` job is skipped and the `credentials` job passes with a warning
  annotation naming the missing ones. A green `credentials` job on its own means nothing ran.

## What it does

1. `globalSetup.ts` removes leftovers from killed runs (see below), then provisions a published template, a published
   experience and a draft experience through the Management API.
2. `delivery.integration.ts` checks `experience.get`, `experience.getWithOverrides`, `experience.get` with `variant`,
   that delivery returns 404 for a draft, and that preview serves it.
3. `destinations.integration.ts` creates a destination (a folder, a child node and a home node), waits until delivery
   serves it, then checks `destination.sitemap`, `resolveByNodeId`, `resolveByNodeIdWithOverrides` and `resolveByPath`,
   including the 404 and 422 cases. It deletes the destination afterwards.
4. Teardown deletes everything the run created, in reverse order, and fails the run if anything could not be removed.

Everything is named `sdk-it-<epoch ms>-<run id>-...`. At the start of a run, entities with that prefix that are more than
an hour old are deleted, so a killed run does not leave the space cluttered, and a run that is still going elsewhere
(another PR, another machine) is never touched.

## Notes

- The tests assert status codes and counts. They do not validate response bodies against the types; that is tracked
  separately (AIS-814).
- Do not send `preview=true`: the preview API rejects it (422 `unknown_parameter`), although the SDK request types still
  expose it.
- Freshly published entities can answer 404 for a few seconds while delivery catches up, so the tests poll
  (`waitFor` in `calls.ts`) before asserting.
- There is no standalone fragment check. `GET /experience_fragments/:id` (`experienceFragment.get`) and the legacy
  `/fragments/:id` (`fragment.get`) were removed from the preview API on 2026-10-23 (SPA-5484), and the timeline read
  (`release.fragment.get`) is a different, point-in-time operation.
