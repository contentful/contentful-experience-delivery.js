# Changelog

## [0.0.0-fern-placeholder.7] - 2026-09-14
### Changed
- **Minimum Node.js version** — broadened from `>=22.0.0` to `>=18.0.0`, enabling use in Node 18 and 20 environments.

### Added
- **`DestinationClient`** — new resource client accessible via `client.destination` on `ContentfulViewDeliveryClient`, providing `sitemap`, `resolveByNodeId`, `resolveByNodeIdWithOverrides`, and `resolveByPath` methods for Destination-scoped delivery operations.
- **`DestinationExperienceResolutionResponse`**, **`DestinationExperiencesResponse`**, **`DestinationRedirectResponse`**, and **`ResolvedDestinationExperience`** — new types for resolving and representing experiences at a Destination path or node.
- **`PersonalizationEvent`** union type and concrete event interfaces (`PersonalizationPageEvent`, `PersonalizationTrackEvent`, `PersonalizationIdentifyEvent`, `PersonalizationScreenEvent`, `PersonalizationComponentEvent`) — new types for tracking personalization analytics events, along with supporting enums `PersonalizationEventBaseChannel`, `PersonalizationEventBaseType`, and `PersonalizationEventBaseComponentType`.
- **`DestinationSitemap`**, **`SitemapPath`**, and related paginated sitemap types** — new types for enumerating all routable paths in a published Destination, with cursor-based pagination via `SitemapDestinationRequest`.
- **`Error_`**, **`ErrorSys`**, and **`ErrorI18NContext`** — new shared error types for structured API error responses; `./destination` subpath export also added for direct import of the destination resource client.

