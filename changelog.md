# Changelog

## [1.0.0-dev.9] - 2026-09-29
### Breaking Changes
- **`HydratedView.viewports`**, **`HydratedExperienceView.viewports`**, **`HydratedFragmentView.viewports`**, and **`HydratedExperienceFragmentView.viewports`** are now optional (`Viewport[] | undefined`) instead of required. Add a null/undefined guard before accessing this field: `if (view.viewports) { ... }`.

### Changed
- Minimum supported Node.js version lowered from `>=22.0.0` to `>=18.0.0`, broadening runtime compatibility.
- Internal Fern telemetry headers (`X-Fern-Language`, `X-Fern-SDK-Name`, `X-Fern-Runtime`, `X-Fern-Runtime-Version`) are no longer sent with API requests.

