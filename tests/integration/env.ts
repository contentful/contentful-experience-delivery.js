import { fileURLToPath } from "node:url";

const HOSTS = {
    prod: {
        delivery: "https://xdn.contentful.com",
        preview: "https://preview.xdn.contentful.com",
        cma: "https://api.contentful.com",
    },
    staging: {
        delivery: "https://xdn.flinkly.com",
        preview: "https://preview.xdn.flinkly.com",
        cma: "https://api.flinkly.com",
    },
} as const;

const REQUIRED = [
    "CONTENTFUL_CDA_TOKEN",
    "CONTENTFUL_CPA_TOKEN",
    "CONTENTFUL_CMA_TOKEN",
    "CONTENTFUL_SPACE_ID",
] as const;

export interface IntegrationEnv {
    cdaToken: string;
    cpaToken: string;
    cmaToken: string;
    spaceId: string;
    envId: string;
    channelId: string;
    deliveryUrl: string;
    previewUrl: string;
    cmaUrl: string;
}

let cached: IntegrationEnv | undefined;

/** Reads `tests/integration/.env` (if present) and the environment, and fails with every missing variable at once. */
export function getEnv(): IntegrationEnv {
    if (cached) return cached;

    try {
        // Does not override variables that are already exported, so CI secrets always win.
        process.loadEnvFile(fileURLToPath(new URL("./.env", import.meta.url)));
    } catch {
        // No .env file: variables must come from the environment.
    }

    const missing = REQUIRED.filter((name) => !process.env[name]);
    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}. See tests/integration/README.md.`,
        );
    }

    // An unset repository variable reaches the environment as an empty string, so use || rather than ??.
    const target = process.env.CONTENTFUL_API_TARGET || "prod";
    if (target !== "prod" && target !== "staging") {
        throw new Error(`CONTENTFUL_API_TARGET must be "prod" or "staging", got "${target}"`);
    }
    const hosts = HOSTS[target];

    cached = {
        cdaToken: process.env.CONTENTFUL_CDA_TOKEN as string,
        cpaToken: process.env.CONTENTFUL_CPA_TOKEN as string,
        cmaToken: process.env.CONTENTFUL_CMA_TOKEN as string,
        spaceId: process.env.CONTENTFUL_SPACE_ID as string,
        envId: process.env.CONTENTFUL_ENV_ID || "master",
        channelId: process.env.CONTENTFUL_DESTINATION_CHANNEL_ID || "web",
        deliveryUrl: hosts.delivery,
        previewUrl: hosts.preview,
        cmaUrl: hosts.cma,
    };
    return cached;
}
