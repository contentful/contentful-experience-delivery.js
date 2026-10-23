import type { TestProject } from "vitest/node";
import { type ExoFixtures, provisionExoFixtures, runPrefix, sweepStale, Tracker } from "./cma.js";

declare module "vitest" {
    export interface ProvidedContext {
        exoFixtures: ExoFixtures;
    }
}

const STALE_AFTER_MS = 60 * 60 * 1000;

/** Provisions the published and draft experiences once for the whole run, and removes them after. */
export default async function setup(project: TestProject): Promise<() => Promise<void>> {
    const leftovers = await sweepStale(STALE_AFTER_MS);
    if (leftovers.length > 0) {
        console.warn(`Could not remove entities left by earlier runs:\n  ${leftovers.join("\n  ")}`);
    }

    const tracker = new Tracker();
    project.provide("exoFixtures", await provisionExoFixtures(runPrefix(), tracker));

    return async () => {
        const problems = await tracker.dispose();
        if (problems.length > 0) {
            throw new Error(`Teardown left test entities behind:\n  ${problems.join("\n  ")}`);
        }
    };
}
