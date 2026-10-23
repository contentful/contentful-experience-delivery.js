import { afterAll, beforeAll, describe, expect, inject, it } from "vitest";
import { type ContentfulViewDelivery, ContentfulViewDeliveryClient } from "../../src/index.js";
import { NotReadyError, rejectionStatus, waitFor } from "./calls.js";
import { createDestinationFixture, type DestinationFixture, deleteDestination, runPrefix } from "./cma.js";
import { getEnv } from "./env.js";

// No `locale` is passed: destination requests do not accept one.

const env = getEnv();
const { spaceId } = env;

/** A destination resolves to experiences, or to a redirect; these tests expect experiences. */
function experiencesOf(response: ContentfulViewDelivery.DestinationExperienceResolutionResponse) {
    if (!("experiences" in response)) throw new Error("Expected resolved experiences, got a redirect");
    return response.experiences;
}

describe("destination delivery", () => {
    const client = new ContentfulViewDeliveryClient({ token: env.cdaToken, baseUrl: env.deliveryUrl });
    const destination = client.destination;
    let fixture: DestinationFixture;

    beforeAll(async () => {
        fixture = await createDestinationFixture(runPrefix(), inject("exoFixtures").experienceId);
        // Delivery serves a published copy that is pushed asynchronously, so wait until both paths are there.
        await waitFor("destination on delivery", async () => {
            const sitemap = await destination.sitemap(spaceId, fixture.destinationId);
            if (sitemap.paths.items.length < 2) {
                throw new NotReadyError(`${sitemap.paths.items.length} of 2 paths`);
            }
            // The resolve routes can lag behind the sitemap; a 404 here makes waitFor retry.
            await destination.resolveByNodeId(spaceId, fixture.destinationId, fixture.homeId);
        });
    });

    afterAll(async () => {
        if (!fixture) return;
        const problems: string[] = [];
        await deleteDestination(fixture.destinationId, problems);
        expect(problems, "destination cleanup").toEqual([]);
    });

    describe("sitemap", () => {
        it("lists the published paths", async () => {
            const sitemap = await destination.sitemap(spaceId, fixture.destinationId);

            expect(sitemap.paths.items.map((item) => item.path).sort()).toEqual(["/home", "/products/chair"]);
        });

        it("honors limit", async () => {
            const sitemap = await destination.sitemap(spaceId, fixture.destinationId, { limit: 1 });

            expect(sitemap.paths.items).toHaveLength(1);
        });

        it("returns 404 for an unknown destination", async () => {
            expect(await rejectionStatus(destination.sitemap(spaceId, "doesNotExist123"))).toBe(404);
        });
    });

    describe("resolveByNodeId", () => {
        it("resolves an experience node", async () => {
            const resolved = await destination.resolveByNodeId(spaceId, fixture.destinationId, fixture.homeId);

            expect(experiencesOf(resolved)).toHaveLength(1);
        });

        it("returns 404 for a folder node", async () => {
            expect(
                await rejectionStatus(destination.resolveByNodeId(spaceId, fixture.destinationId, fixture.folderId)),
            ).toBe(404);
        });
    });

    describe("resolveByNodeIdWithOverrides", () => {
        it("accepts personalization events", async () => {
            const resolved = await destination.resolveByNodeIdWithOverrides(
                spaceId,
                fixture.destinationId,
                fixture.homeId,
                {
                    extensions: {
                        personalization: {
                            profileId: "sdk-integration-test",
                            events: [
                                {
                                    type: "component",
                                    channel: "web",
                                    messageId: "sdk-integration-test-1",
                                    timestamp: new Date().toISOString(),
                                    componentId: "sdk-integration-test",
                                    context: {
                                        library: { name: "experience-delivery-integration-tests", version: "0.0.0" },
                                    },
                                },
                            ],
                        },
                    },
                },
            );

            expect(experiencesOf(resolved)).toHaveLength(1);
        });
    });

    describe("resolveByPath", () => {
        it.each(["/home", "/products/chair"])("resolves %s", async (path) => {
            const resolved = await destination.resolveByPath(spaceId, fixture.destinationId, { path });

            expect(experiencesOf(resolved).length).toBeGreaterThan(0);
        });

        it.each([
            ["a folder", "/products", 404],
            ["an unknown path", "/nope", 404],
            ["a non-absolute path", "nope", 422],
        ])("returns an error for %s", async (_what, path, status) => {
            expect(await rejectionStatus(destination.resolveByPath(spaceId, fixture.destinationId, { path }))).toBe(
                status,
            );
        });
    });
});
