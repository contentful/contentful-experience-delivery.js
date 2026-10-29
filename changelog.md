# Changelog

## [1.0.0-dev.12] - 2026-10-29
### Breaking Changes
- **`PersonalizationComponentEvent.Context`**, **`PersonalizationIdentifyEvent.Context`**, **`PersonalizationPageEvent.Context`**, **`PersonalizationScreenEvent.Context`**, and **`PersonalizationTrackEvent.Context`** namespaces have been removed. The `context` field on each event now uses the new shared `PersonalizationEventContext` type. Migrate by replacing references to `<EventType>.Context` (and its nested sub-types) with the equivalent `PersonalizationEventContext*` top-level types.

### Added
- **`PersonalizationEventContext`** and its companion types (`PersonalizationEventContextApp`, `PersonalizationEventContextCampaign`, `PersonalizationEventContextGdpr`, `PersonalizationEventContextLibrary`, `PersonalizationEventContextLocation`, `PersonalizationEventContextLocationCoordinates`, `PersonalizationEventContextPage`) are now exported as top-level SDK types, replacing the duplicated per-event `Context` namespaces.
- **`content_type`** optional field added to the override object in `GetWithOverridesExperienceRequest`, allowing callers to filter by content type when fetching experiences with overrides.

### Changed
- Minimum supported Node.js version lowered from `>=22.0.0` to `>=18.0.0`, broadening runtime compatibility.

