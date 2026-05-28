# Releasing

This package uses **npm trusted publishing (OIDC)** via GitHub Actions. No npm tokens or secrets are required — npmjs.com trusts this repository to publish directly using short-lived, cryptographically signed tokens.

Publishing is triggered manually via the **Publish** workflow dispatch.

## Prerequisites

Before the first publish, an npm org admin must configure trusted publishing on npmjs.com:

1. Navigate to the package settings on [npmjs.com](https://www.npmjs.com/package/@contentful/experience-delivery/access)
2. Find the **Trusted Publisher** section and click **Add trusted publisher**
3. Select **GitHub Actions** as the provider
4. Fill in:
   - **Organization or user**: `contentful`
   - **Repository**: `contentful-experience-delivery.js`
   - **Workflow filename**: `publish.yml`
   - **Environment name**: _(leave blank)_

This only needs to be done once.

## Production Release

1. Go to [Actions → Publish](https://github.com/contentful/contentful-experience-delivery.js/actions/workflows/publish.yml)
2. Click **Run workflow**
3. Enter the version (e.g., `1.0.0`)
4. Click **Run workflow**

The workflow will:
- Set the version in `package.json`
- Build the package
- Publish with `--tag latest` using OIDC

## Pre-release

1. Go to [Actions → Publish](https://github.com/contentful/contentful-experience-delivery.js/actions/workflows/publish.yml)
2. Click **Run workflow**
3. Enter the pre-release version (e.g., `1.0.0-beta.1`, `2.0.0-alpha.3`, `1.0.0-rc.1`)
4. Click **Run workflow**

The dist-tag is inferred from the pre-release identifier:
- `1.0.0-beta.1` → publishes with `--tag beta`
- `1.0.0-alpha.3` → publishes with `--tag alpha`
- `1.0.0-rc.1` → publishes with `--tag rc`
- `1.0.0-next.5` → publishes with `--tag next`

Consumers opt in to pre-releases via:

```sh
npm install @contentful/experience-delivery@beta
```

A bare `npm install @contentful/experience-delivery` always resolves `latest` and will never pick up a pre-release.

## Version Management

Versions are managed by Fern during generation. However, the publish workflow sets the version at publish time via the input — this allows publishing any version from any commit.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Unable to authenticate" | Trusted publisher not configured on npmjs.com | Follow the prerequisites section above |
| "Unable to authenticate" | Workflow filename mismatch | Trusted publisher config must reference `publish.yml` exactly |
| "Unable to authenticate" | npm version too old for OIDC | The workflow updates npm automatically; if self-hosting runners, ensure npm >= 11.5.1 |
| Publish succeeds but no provenance badge | Private repo limitation | Provenance attestations are only generated for public repositories |
