# Changelog

## [1.0.0-dev.10] - 2026-10-08
### Breaking Changes
- **`Viewport`** — exported type removed entirely; remove any references to this type from your code.
- **`ValuesByViewport`** — exported type removed entirely; remove any references to this type from your code.
- **`TreeNodeDesignProperty`** — exported union type removed; the `designProperties` field on `ComponentTreeNode`, `RenamedComponentTreeNode`, `TemplateTreeNode`, and `RenamedTemplateTreeNode` now uses `DesignPropertyValue` directly instead of `DesignPropertyValue | ValuesByViewport`.
- **`viewports` field** — removed from `HydratedExperience`, `HydratedView`, `HydratedExperienceView`, `HydratedFragmentView`, and `HydratedExperienceFragmentView`; remove any code that reads this field.

### Changed
- **Minimum Node.js version** lowered from `>=22.0.0` to `>=18.0.0`, broadening runtime compatibility.

