# Changelog

## [0.0.0-fern-placeholder.8] - 2026-10-08
### Breaking Changes
- **`Viewport`** — exported type removed entirely; remove any references to this type from your code.
- **`ValuesByViewport`** — exported type removed entirely; remove any references to this type from your code.
- **`TreeNodeDesignProperty`** — exported union type removed; the `designProperties` field on `ComponentTreeNode`, `RenamedComponentTreeNode`, `TemplateTreeNode`, and `RenamedTemplateTreeNode` now uses `DesignPropertyValue` directly instead of `DesignPropertyValue | ValuesByViewport`.
- **`viewports` field** — removed from `HydratedExperience`, `HydratedView`, `HydratedExperienceView`, `HydratedFragmentView`, and `HydratedExperienceFragmentView`; remove any code that reads this field.

### Migration
- Delivery and Preview responses no longer include `viewports`. Read design properties directly from `designProperties`.
- Tree-node `designProperties` values are now always direct `DesignPropertyValue` entries; remove code that reads or sends values keyed by viewport ID.
- API request validation for legacy `viewports` fields is tracked separately in the Phase 4 rollout. Its effective `422` cutoff must be published before that rollout is enabled.
