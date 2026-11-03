# Changelog

## [1.0.0-dev.12] - 2026-11-03
### Breaking Changes
- **`DestinationClient.resolveByPath`** — the request parameter type has changed from `DestinationExperiencesByPathRequest` to the new `ResolveByPathDestinationRequest`. Update call sites to use `ResolveByPathDestinationRequest`; if you need override behaviour, use the new `resolveByPathWithOverrides` method instead.

### Added
- **`DestinationClient.resolveByPathWithOverrides`** — new method for path-based experience resolution with override parameters, using the existing `DestinationExperiencesByPathRequest` type.
- **`ResolveByPathDestinationRequest`** — new exported request interface (`access_token`, `locale`, `path`) used by `DestinationClient.resolveByPath`.
- **`GetWithOverridesExperienceRequest.Overrides.content_type`** — new optional `content_type` field on the overrides object.

