# Changelog

## [1.0.0-dev.12] - 2026-11-03
### Breaking Changes
- **`DestinationClient.resolveByPath`** — the request parameter type has changed from `DestinationExperiencesByPathRequest` to the new `ResolveByPathDestinationRequest`. Update call sites to use `ResolveByPathDestinationRequest`; if you need override behaviour, use the new `resolveByPathWithOverrides` method instead.

### Added
- **`DestinationClient.resolveByPathWithOverrides`** — new method for path-based experience resolution with override parameters, using the existing `DestinationExperiencesByPathRequest` type.
- **`ResolveByPathDestinationRequest`** — new exported request interface (`access_token`, `locale`, `path`) used by `DestinationClient.resolveByPath`.
- **`GetWithOverridesExperienceRequest.Overrides.content_type`** — new optional `content_type` field on the overrides object.

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

