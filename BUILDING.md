# Building from Source

This package is not yet published as a stable release on the public npm registry.
Until then, the supported way to onboard is to build it from source and consume the
local build directly. This guide walks through that process end to end.

> If you're contributing changes to this SDK rather than just consuming it, see
> [CONTRIBUTING.md](./CONTRIBUTING.md) as well.

## Prerequisites

- **Node.js 20 or higher** — Node 18 reached end-of-life in April 2025 and the test
  suite's tooling requires a newer `node:util` API than Node 18 provides, so builds
  on Node 18 are not supported even though `package.json` still declares
  `>=18.0.0`.
- **pnpm** — the repo pins `packageManager: pnpm@10.33.0` in `package.json`. If you
  don't already have pnpm installed, enable it via [Corepack](https://nodejs.org/api/corepack.html)
  (bundled with Node 20+):

  ```bash
  corepack enable
  ```

## 1. Clone the repository

```bash
git clone https://github.com/contentful/contentful-experience-delivery.js.git
cd contentful-experience-delivery.js
```

## 2. Install dependencies

```bash
pnpm install
```

## 3. Build the package

```bash
pnpm build
```

This compiles both the CommonJS and ESM outputs into `dist/`. `dist/` is gitignored
and is **not** committed to the repository, so this step is required — installing
directly from a git URL or an unbuilt local checkout (e.g. `npm install
git+https://github.com/contentful/contentful-experience-delivery.js.git`) will not
produce a working package, since there's no `prepare`/`postinstall` script to build
it automatically.

## 4. (Optional) Run the test suite

Confirm the build works as expected in your environment:

```bash
pnpm test:unit
```

## 5. Consume the built package in your project

With `dist/` built, package it into an installable tarball with `pnpm pack`:

```bash
pnpm pack
```

This produces `contentful-experience-delivery-<version>.tgz` in the repo root. Install
that tarball from your own project:

```bash
npm install /path/to/contentful-experience-delivery.js/contentful-experience-delivery-<version>.tgz
```

Alternatively, for local iteration you can point directly at the built repo
directory instead of packing a tarball — npm/pnpm will symlink or copy it in:

```bash
npm install /path/to/contentful-experience-delivery.js
```

Either approach makes the package available exactly as it will be once published,
including both CommonJS (`require`) and ESM (`import`) entry points:

```typescript
import { ContentfulViewDeliveryClient } from "@contentful/experience-delivery";

const client = new ContentfulViewDeliveryClient({
    token: process.env.CONTENTFUL_CDA_TOKEN!,
});
```

See the [README](./README.md#usage) for full usage and authentication details.

## Keeping your local build up to date

Since you're building from source rather than tracking a published version, pull the
latest changes and rebuild whenever you want to update:

```bash
git pull
pnpm install
pnpm build
pnpm pack
```

Then reinstall the new tarball in your consuming project.
