# Releasing

This package publishes to **GitHub Packages**. From there, org infrastructure mirrors it to npmjs via trusted publishing.

Publishing is triggered manually via the **Publish** workflow dispatch.

## Prerequisites

1. **Vault role**: The `.contentful/vault-secrets.yaml` file provisions the Vault role for this repo. It must have access to `secret/data/github/github_packages_write`.
2. **Repo secret**: `VAULT_URL` must be configured in the repo's GitHub settings.
3. **First publish to npmjs**: After the first successful GH Packages publish, Mecha does a one-time manual publish to npmjs. From then on, mirroring is automatic.

## Production Release

1. Go to [Actions → Publish](https://github.com/contentful/contentful-experience-delivery.js/actions/workflows/publish.yml)
2. Click **Run workflow**
3. Enter the version (e.g., `1.0.0`)
4. Click **Run workflow**

The workflow will:
- Set the version in `package.json`
- Build the package
- Publish to GitHub Packages with `--tag latest`

## Pre-release

1. Go to [Actions → Publish](https://github.com/contentful/contentful-experience-delivery.js/actions/workflows/publish.yml)
2. Click **Run workflow**
3. Enter the pre-release version (e.g., `1.0.0-beta.1`, `2.0.0-alpha.3`, `1.0.0-rc.1`, `12.0.0-dev.1`)
4. Click **Run workflow**

The dist-tag is inferred from the pre-release identifier:
- `1.0.0-beta.1` → publishes with `--tag beta`
- `1.0.0-alpha.3` → publishes with `--tag alpha`
- `1.0.0-rc.1` → publishes with `--tag rc`
- `12.0.0-dev.1` → publishes with `--tag dev`

Once mirrored to npmjs, consumers install pre-releases via:

```sh
npm install @contentful/experience-delivery@beta
# or by exact version
npm install @contentful/experience-delivery@1.0.0-beta.1
```

A bare `npm install @contentful/experience-delivery` always resolves `latest` and will never pick up a pre-release.

## Version Management

Versions are managed by Fern during generation. The publish workflow sets the version at publish time via the input — this allows publishing any version from any commit.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Vault auth failure | Vault role not provisioned | Ensure `.contentful/vault-secrets.yaml` is on `main` and the role has been created |
| Vault auth failure | `VAULT_URL` secret missing | Check repo settings → Secrets and variables → Actions |
| 403 on publish | Missing `GITHUB_PACKAGES_WRITE_TOKEN` access | Verify the Vault policy grants access to `secret/data/github/github_packages_write` |
| Package not on npmjs | First publish not done | Coordinate with Mecha for the one-time manual npmjs publish |
