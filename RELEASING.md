# Releasing

This package uses **npm trusted publishing (OIDC)** via GitHub Actions. No npm tokens or secrets are required — npmjs.com trusts this repository to publish directly using short-lived, cryptographically signed tokens.

Publishing is triggered by creating a GitHub Release.

## Prerequisites

Before the first publish, an npm org admin must configure trusted publishing on npmjs.com:

1. Navigate to the package settings on [npmjs.com](https://www.npmjs.com/package/@contentful/contentful-experiences.js/access)
2. Find the **Trusted Publisher** section and click **Add trusted publisher**
3. Select **GitHub Actions** as the provider
4. Fill in:
   - **Organization or user**: `contentful`
   - **Repository**: `contentful-experiences.js`
   - **Workflow filename**: `ci.yml`
   - **Environment name**: _(leave blank)_

This only needs to be done once.

## Production Release

1. Go to [Releases → New Release](https://github.com/contentful/contentful-experiences.js/releases/new)
2. Click **Choose a tag** and type the version (e.g., `v1.0.0`) — select "Create new tag on publish"
3. Set **Target** to `main`
4. Write release notes (changelog, breaking changes, migration notes)
5. Leave "Set as latest release" checked
6. Click **Publish release**

GitHub Actions will:
- Check out the tagged commit
- Build the package
- Run `npm publish --provenance --access public` using OIDC
- The package appears on npmjs.com with a provenance badge

## Pre-release

1. Go to [Releases → New Release](https://github.com/contentful/contentful-experiences.js/releases/new)
2. Click **Choose a tag** and type the pre-release version (e.g., `v1.0.0-beta.1`) — select "Create new tag on publish"
3. Set **Target** to the appropriate branch (e.g., `main` or a feature branch)
4. Write release notes describing what's being tested
5. Check **Set as a pre-release**
6. Click **Publish release**

GitHub Actions will publish with a `beta` dist-tag (or equivalent based on the pre-release identifier), so `npm install @contentful/contentful-experiences.js` won't pick it up by default. Users opt in with:

```sh
npm install @contentful/contentful-experiences.js@beta
```

## Version Management

Versions are managed by Fern. When the SDK is regenerated, Fern sets the version in `package.json`. The GitHub Release tag must match the version in `package.json` at the tagged commit.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| "Unable to authenticate" | Trusted publisher not configured on npmjs.com | Follow the prerequisites section above |
| "Unable to authenticate" | Workflow filename mismatch | Trusted publisher config must reference `ci.yml` exactly |
| Publish succeeds but no provenance badge | Private repo limitation | Provenance attestations are only generated for public repositories |
| Tag doesn't match package.json version | Fern version and release tag out of sync | Ensure you're tagging the commit where Fern set the version |
