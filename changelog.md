# Changelog

## [1.0.0-dev.11] - 2026-10-27
### Breaking Changes
- **`ContentfulViewDeliveryClient`** — the `component`, `template`, `fragment`, and `experienceFragment` sub-client getters have been removed; remove all calls to `client.component.*`, `client.template.*`, `client.fragment.*`, and `client.experienceFragment.*`.
- **`serialization` namespace** — the entire `serialization` export (including all schema builders, serialization types, and the `src/serialization/types/index.ts` barrel) has been removed from the SDK; remove all imports of `serialization` or `core/schemas` and the `./serialization`, `./template`, `./component`, `./fragment`, and `./experienceFragment` package subpath exports.
- **`GetWithOverridesExperienceRequest`** — `accessToken` renamed to `access_token`, `optimizationProfileId` renamed to `optimization-profile-id`, and `extensions` now typed as `GetWithOverridesExperienceRequest.Extensions`; update all call sites to use the new property names.
- **Hydrated view and extension types** — `HydratedExperienceView`, `HydratedFragmentView`, `HydratedView`, `HydratedTreeNode`, and all associated `HydratedExperienceViewExtensions*`, `HydratedFragmentViewExtensions*`, and `HydratedViewExtensions*` families have been removed or had their `sys` and `errors` field types changed to inlined namespace types; migrate to the new inline `Sys` and `Errors.Item` interfaces.
- **`resolveByNodeId`** — now requires a new `request: ResolveByNodeIdDestinationRequest` parameter before `requestOptions`; pass `{}` to preserve previous behavior.
- See full changelog for all changes

### Added
- **`ResolveByNodeIdDestinationRequest`** — new request type accepted by `resolveByNodeId`, with optional `access_token` and `locale` query parameters.
- **`access_token` and `locale`** — optional query parameters added to `DestinationExperiencesByNodeRequest`, `DestinationExperiencesByPathRequest`, `SitemapDestinationRequest`, and forwarded in all relevant request methods.

