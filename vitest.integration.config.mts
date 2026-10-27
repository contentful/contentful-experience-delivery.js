import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Live tests against the Delivery, Preview and Management APIs. Kept out of vitest.config.mts (which Fern regenerates)
// and out of `pnpm test`: run them with `pnpm test:integration`.
export default defineConfig({
    // The paths below are relative to this file, so the config also works when run from a subfolder.
    root: fileURLToPath(new URL(".", import.meta.url)),
    test: {
        name: "integration",
        environment: "node",
        include: ["tests/integration/**/*.integration.ts"],
        globalSetup: ["tests/integration/globalSetup.ts"],
        // Both files share one space and one set of provisioned entities.
        fileParallelism: false,
        testTimeout: 120_000,
        hookTimeout: 120_000,
    },
});
