# Releasing

This package publishes to **GitHub Packages**. From there, org infrastructure mirrors it to npmjs via trusted publishing.

Publishing is triggered by creating a GitHub Release with a version tag (e.g., `v1.0.0`).

## Prerequisites

1. **Vault role**: The `.contentful/vault-secrets.yaml` file provisions the Vault role for this repo. It must have access to `secret/data/github/github_packages_write`.
2. **Repo secret**: `VAULT_URL` must be configured in the repo's GitHub settings.
3. **First publish to npmjs**: After the first successful GH Packages publish, a one-time manual publish to npmjs is required. From then on, mirroring is automatic.

## Production Release

1. Go to [Releases → New Release](https://github.com/contentful/contentful-experience-delivery.js/releases/new)
2. Click **Choose a tag** and type the version (e.g., `v1.0.0`) — select "Create new tag on publish"
3. Set **Target** to `main`
4. Write release notes (changelog, breaking changes, migration notes)
5. Leave "Set as latest release" checked
6. Click **Publish release**

The workflow will:
- Extract the version from the tag (`v1.0.0` → `1.0.0`)
- Set the version in `package.json` (ephemeral, not committed)
- Build the package
- Publish to GitHub Packages with `--tag latest`

## Pre-release

1. Go to [Releases → New Release](https://github.com/contentful/contentful-experience-delivery.js/releases/new)
2. Click **Choose a tag** and type the pre-release version (e.g., `v1.0.0-beta.1`, `v2.0.0-alpha.3`, `v12.0.0-dev.1`)
3. Set **Target** to the appropriate branch
4. Write release notes describing what's being tested
5. Check **Set as a pre-release**
6. Click **Publish release**

The dist-tag is inferred from the pre-release identifier:
- `v1.0.0-beta.1` → publishes with `--tag beta`
- `v1.0.0-alpha.3` → publishes with `--tag alpha`
- `v1.0.0-rc.1` → publishes with `--tag rc`
- `v12.0.0-dev.1` → publishes with `--tag dev`

Once mirrored to npmjs, consumers install pre-releases via:

```sh
npm install @contentful/experience-delivery@beta
# or by exact version
npm install @contentful/experience-delivery@1.0.0-beta.1
```

A bare `npm install @contentful/experience-delivery` always resolves `latest` and will never pick up a pre-release.

> **Important**: Any tag push matching `v*` triggers publishing — whether from the GitHub Releases UI or `git push origin v1.0.0` locally. Do not push version tags unless you intend to publish.

## Version Management

The version in `package.json` on the repo stays at a Fern placeholder. At publish time, the workflow extracts the version from the git tag and sets it ephemerally — no PR or commit needed to bump the version.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Vault auth failure | Vault role not provisioned | Ensure `.contentful/vault-secrets.yaml` is on `main` and the role has been created |
| Vault auth failure | `VAULT_URL` secret missing | Check repo settings → Secrets and variables → Actions |
| 403 on publish | Missing `GITHUB_PACKAGES_WRITE_TOKEN` access | Verify the Vault policy grants access to `secret/data/github/github_packages_write` |
| Package not on npmjs | First publish not done | A one-time manual publish to npmjs is required to establish the package |
| Wrong dist-tag | Tag name doesn't contain pre-release identifier | Ensure tag format is `v<semver>` (e.g., `v1.0.0-beta.1`, not `beta-1.0.0`) |
