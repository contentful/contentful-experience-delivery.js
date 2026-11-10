import { beforeAll, describe, expect, inject, it } from "vitest";
import { ContentfulViewDeliveryClient } from "../../src/index.js";
import { rejectionStatus, waitFor } from "./calls.js";
import { getEnv } from "./env.js";

const env = getEnv();
const { experienceId, draftExperienceId } = inject("exoFixtures");
const { spaceId, envId } = env;
const locale = "en-US";

describe("experience delivery and preview", () => {
    const client = new ContentfulViewDeliveryClient({
        token: env.cdaToken,
        baseUrl: env.deliveryUrl,
        spaceId: env.spaceId,
        environmentId: env.envId,
    });
    const previewClient = new ContentfulViewDeliveryClient({
        token: env.cpaToken,
        baseUrl: env.previewUrl,
        spaceId: env.spaceId,
        environmentId: env.envId,
    });

    beforeAll(async () => {
        await waitFor("published experience on delivery", () =>
            client.experience.get(experienceId, { locale }),
        );
        await waitFor("draft experience on preview", () =>
            previewClient.experience.get(draftExperienceId, { locale }),
        );
    });

    it("experience.get returns the published experience", async () => {
        const experience = await client.experience.get(experienceId, { locale });

        expect(experience.sys.id).toBe(experienceId);
    });

    it("experience.getWithOverrides returns the personalized experience", async () => {
        const experience = await client.experience.getWithOverrides(experienceId, { locale });

        expect(experience.sys.id).toBe(experienceId);
    });

    it("experience.get accepts a variant", async () => {
        const experience = await client.experience.get(experienceId, { locale, variant: "control" });

        expect(experience.sys.id).toBe(experienceId);
    });

    it("delivery returns 404 for a draft experience", async () => {
        const status = await rejectionStatus(client.experience.get(draftExperienceId, { locale }));

        expect(status).toBe(404);
    });

    it("preview returns a draft experience", async () => {
        const experience = await previewClient.experience.get(draftExperienceId, { locale });

        expect(experience.sys.id).toBe(draftExperienceId);
    });
});
