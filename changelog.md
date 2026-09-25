# Changelog

## [1.0.0-dev.9] - 2026-09-25
### Breaking Changes
- **`TreeNodeDesignProperty`** — this exported union type (`DesignPropertyValue | ValuesByViewport`) has been removed. Update any code referencing `TreeNodeDesignProperty` to use `DesignPropertyValue` directly.
- **`ValuesByViewport`** — this exported interface has been removed. Per-viewport design property overrides are no longer part of the public API contract.
- **`designProperties`** on `ComponentTreeNode`, `RenamedComponentTreeNode`, `TemplateTreeNode`, and `RenamedTemplateTreeNode` — the value type has changed from `TreeNodeDesignProperty` (which included `ValuesByViewport`) to `DesignPropertyValue`. Code that handles `ValuesByViewport` values in design properties will need to be updated.

### Changed
- **Node.js engine requirement** — the minimum supported Node.js version has been lowered from `>=22.0.0` to `>=18.0.0`, broadening compatibility.

