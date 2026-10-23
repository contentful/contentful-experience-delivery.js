# Changelog

## [1.0.0-dev.11] - 2026-10-23
### Breaking Changes
- **`ContentfulViewDeliveryClient` resource getters** — the `component`, `template`, `fragment`, and `experienceFragment` getters (and their corresponding `ComponentClient`, `TemplateClient`, `FragmentClient`, `ExperienceFragmentClient`) have been removed; remove all calls to these getters and their associated `get(...)` methods.
- **Removed resource types** — `ComponentLink`, `ComponentTreeNode`, `TemplateTreeNode`, `TemplateLink`, `DeliveryFragmentSys`, `DeliveryExperienceSys`, `HydratedView`, `HydratedExperienceView`, `HydratedFragmentView`, `HydratedExperienceFragmentView`, and all associated nested extension, source-map, and personalization sub-types have been removed; remove or replace all imports of these symbols.
- **`serialization` namespace** — the `serialization` re-export and the entire internal schema-builder library (including `object`, `record`, primitive builders, and all serialization resource barrels) have been removed from the public API; remove all imports of `serialization.*` and use API types directly.
- **`GetExperienceRequest` / `GetWithOverridesExperienceRequest`** — `accessToken` renamed to `access_token` and `optimizationProfileId` renamed to `"optimization-profile-id"`; the `extensions` field is replaced by `parameters`; update all call sites to use the new property names.
- **`i18NContext` → `i18nContext` rename and inlined `Sys` / `I18NContext` namespaces** — error body types (`BadRequestErrorBody`, `ConflictErrorBody`, `ForbiddenErrorBody`, `InternalServerErrorBody`, `NotFoundErrorBody`, `UnauthorizedErrorBody`, `UnprocessableEntityErrorBody`) rename the `i18NContext` field to `i18nContext` and inline `Sys` and `I18NContext` as nested namespace types; update all property accesses and type references.
- **`resolveByNodeId`** — a new required `request: ResolveByNodeIdDestinationRequest` parameter is inserted before `requestOptions`; existing callers must add the new argument (pass `{}` to preserve previous behaviour).
- **Package subpath exports removed** — `./serialization`, `./template`, `./component`, `./fragment`, and `./experienceFragment` subpath exports have been removed from `package.json`; migrate all direct subpath imports to the main entry point.
- See full changelog for all changes

### Added
- **`access_token` and `locale` fields** — added to `SitemapDestinationRequest`, `DestinationExperiencesByNodeRequest`, `DestinationExperiencesByPathRequest`, and the new `ResolveByNodeIdDestinationRequest` type to support token-based and locale-scoped requests.
- **`UnprocessableEntityErrorBodyZeroI18NContextParametersValue`** — new discriminated union type for i18n context parameter values in unprocessable entity error bodies, with `string`, `number`, `date`, `array.string`, and `array.number` variants.

