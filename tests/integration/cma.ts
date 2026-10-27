import { getEnv } from "./env.js";

/**
 * Minimal CMA client for provisioning and removing the entities the live tests read. Everything it creates is named
 * `sdk-it-<epoch ms>-...`, so a run that was killed before teardown can be recognised and swept later.
 */

const env = getEnv();
const BASE = `${env.cmaUrl}/spaces/${env.spaceId}/environments/${env.envId}`;

const NAME_PREFIX = "sdk-it-";
const STALE_NAME = /^sdk-it-(\d+)-/;

export interface Entity {
    name?: string;
    sys: { id: string; type: string; version: number; publishedVersion?: number; publishedAt?: string };
}

interface CmaResponse<T> {
    status: number;
    json?: T;
    text: string;
}

async function cma<T = Entity>(
    path: string,
    opts: { method?: string; body?: unknown; version?: number; absolute?: boolean } = {},
): Promise<CmaResponse<T>> {
    const headers: Record<string, string> = {
        Authorization: `Bearer ${env.cmaToken}`,
        "Content-Type": "application/vnd.contentful.management.v1+json",
    };
    if (opts.version !== undefined) headers["X-Contentful-Version"] = String(opts.version);
    const response = await fetch(opts.absolute ? path : `${BASE}${path}`, {
        method: opts.method ?? "GET",
        headers,
        body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    });
    const text = await response.text();
    let json: T | undefined;
    try {
        json = text ? (JSON.parse(text) as T) : undefined;
    } catch {
        json = undefined;
    }
    return { status: response.status, json, text };
}

/** Returns the parsed body of a response with the expected status, and throws otherwise. */
function expectStatus(response: CmaResponse<Entity>, expected: number, what: string): Entity {
    if (response.status !== expected || response.json === undefined) {
        throw new Error(`${what}: expected ${expected}, got ${response.status} ${response.text.slice(0, 300)}`);
    }
    return response.json;
}

const isPublished = (entity: Entity) =>
    entity.sys.publishedVersion !== undefined || entity.sys.publishedAt !== undefined;

const resourceLink = (linkType: string, collection: string, id: string) => ({
    sys: {
        type: "ResourceLink",
        linkType,
        urn: `crn:contentful:::experience:spaces/$self/environments/$self/${collection}/${id}`,
    },
});

/** Prefix for the names of entities created by this run. Sweeping recognises leftovers by it and by its epoch. */
export function runPrefix(): string {
    return `${NAME_PREFIX}${Date.now()}-${process.env.GITHUB_RUN_ID ?? "local"}`;
}

async function create(collection: string, body: Record<string, unknown>): Promise<Entity> {
    // The Management API rejects an entity without a description.
    const withDescription = { description: "SDK integration test", ...body };
    return expectStatus(
        await cma(`/${collection}`, { method: "POST", body: withDescription }),
        201,
        `create ${collection}`,
    );
}

async function publish(collection: string, entity: Entity): Promise<Entity> {
    return expectStatus(
        await cma(`/${collection}/${entity.sys.id}/published`, { method: "PUT", version: entity.sys.version }),
        200,
        `publish ${collection}/${entity.sys.id}`,
    );
}

/** Runs one cleanup step. A thrown error (a dropped connection, say) is recorded instead of aborting the rest. */
async function attempt(what: string, problems: string[], step: () => Promise<void>): Promise<void> {
    try {
        await step();
    } catch (error) {
        problems.push(`${what}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/** Unpublishes (if needed) and deletes one entity. Anything that did not work is added to `problems`. */
async function unpublishAndDelete(collection: string, id: string, problems: string[]): Promise<void> {
    await attempt(`${collection}/${id}`, problems, async () => {
        const path = `/${collection}/${id}`;
        const current = await cma(path);
        if (current.status === 404) return; // already gone
        let entity = current.json;
        if (current.status !== 200 || !entity) {
            problems.push(`read ${collection}/${id}: ${current.status} ${current.text.slice(0, 160)}`);
            return;
        }
        if (isPublished(entity)) {
            const unpublished = await cma(`${path}/published`, { method: "DELETE", version: entity.sys.version });
            if (unpublished.status !== 200 || !unpublished.json) {
                problems.push(`unpublish ${collection}/${id}: ${unpublished.status} ${unpublished.text.slice(0, 160)}`);
                return;
            }
            entity = unpublished.json;
        }
        const deleted = await cma(path, { method: "DELETE", version: entity.sys.version });
        if (deleted.status !== 204) {
            problems.push(`delete ${collection}/${id}: ${deleted.status} ${deleted.text.slice(0, 160)}`);
        }
    });
}

// ---- ExO entities (templates, experiences) ----

export interface ExoFixtures {
    experienceId: string;
    draftExperienceId: string;
}

/** Created entities, removed in reverse creation order, which respects the references between them. */
export class Tracker {
    private readonly created: { collection: string; id: string }[] = [];

    track(collection: string, id: string): void {
        this.created.push({ collection, id });
    }

    /** Removes everything tracked and returns what could not be removed. */
    async dispose(): Promise<string[]> {
        const problems: string[] = [];
        for (const { collection, id } of [...this.created].reverse()) {
            await unpublishAndDelete(collection, id, problems);
        }
        this.created.length = 0;
        return problems;
    }
}

/**
 * Creates and publishes a template and an experience, plus one experience that stays a draft.
 * If something fails halfway, what was already created is removed before the error is rethrown.
 */
export async function provisionExoFixtures(prefix: string, tracker: Tracker): Promise<ExoFixtures> {
    try {
        const template = await create("experience_templates", {
            name: `${prefix}-template`,
            componentTree: null,
            contentProperties: [],
            designProperties: [],
        });
        tracker.track("experience_templates", template.sys.id);
        await publish("experience_templates", template);

        const templateLink = resourceLink("Contentful:ExperienceTemplate", "experienceTemplates", template.sys.id);
        const experience = await create("experiences", {
            name: `${prefix}-experience`,
            experienceTemplate: templateLink,
            designProperties: {},
        });
        tracker.track("experiences", experience.sys.id);
        await publish("experiences", experience);

        const draft = await create("experiences", {
            name: `${prefix}-draft-experience`,
            experienceTemplate: templateLink,
            designProperties: {},
        });
        tracker.track("experiences", draft.sys.id);

        return { experienceId: experience.sys.id, draftExperienceId: draft.sys.id };
    } catch (error) {
        const problems = await tracker.dispose();
        if (problems.length > 0)
            console.error(`Cleanup after failed setup was incomplete:\n  ${problems.join("\n  ")}`);
        throw error;
    }
}

// ---- Destinations ----

export interface DestinationFixture {
    destinationId: string;
    folderId: string;
    homeId: string;
}

interface TreeNode extends Entity {
    parent?: { sys?: { id?: string } };
}

async function organizationId(): Promise<string> {
    const space = await cma<{ sys?: { organization?: { sys?: { id?: string } } } }>(
        `${env.cmaUrl}/spaces/${env.spaceId}`,
        {
            absolute: true,
        },
    );
    const id = space.json?.sys?.organization?.sys?.id;
    if (space.status !== 200 || !id) {
        throw new Error(`Could not read the organization of space ${env.spaceId} (${space.status})`);
    }
    return id;
}

/** Channels belong to the organization, so the tests only read one and never create one. */
async function assertChannelPublished(): Promise<void> {
    const channel = await cma(`${env.cmaUrl}/organizations/${await organizationId()}/channels/${env.channelId}`, {
        absolute: true,
    });
    if (channel.status === 404) {
        throw new Error(
            `Channel "${env.channelId}" does not exist in the organization. Set CONTENTFUL_DESTINATION_CHANNEL_ID to a published channel.`,
        );
    }
    if (channel.status !== 200 || !channel.json || !isPublished(channel.json)) {
        throw new Error(
            `Channel "${env.channelId}" is not published (${channel.status}). Set CONTENTFUL_DESTINATION_CHANNEL_ID to a published channel.`,
        );
    }
}

async function deleteNode(destinationId: string, nodeId: string, problems: string[]): Promise<void> {
    await attempt(`node ${nodeId}`, problems, async () => {
        const path = `/destinations/${destinationId}/nodes/${nodeId}`;
        const current = await cma(path);
        if (current.status === 404) return; // already gone
        let node = current.json;
        if (current.status !== 200 || !node) {
            problems.push(`read node ${nodeId}: ${current.status} ${current.text.slice(0, 160)}`);
            return;
        }
        if (isPublished(node)) {
            const unpublished = await cma(`${path}/published`, { method: "DELETE", version: node.sys.version });
            if (unpublished.status !== 200 || !unpublished.json) {
                problems.push(`unpublish node ${nodeId}: ${unpublished.status} ${unpublished.text.slice(0, 160)}`);
                return;
            }
            node = unpublished.json;
        }
        const deleted = await cma(path, { method: "DELETE", version: node.sys.version });
        if (deleted.status !== 204) {
            problems.push(`delete node ${nodeId}: ${deleted.status} ${deleted.text.slice(0, 160)}`);
        }
    });
}

/** Removes a destination and its nodes. A node cannot go while another still names it as parent, so deepest first. */
export async function deleteDestination(destinationId: string, problems: string[]): Promise<void> {
    await attempt(`destination ${destinationId}`, problems, async () => {
        const treeNodes = (await cma<{ nodes?: TreeNode[] }>(`/destinations/${destinationId}/tree`)).json?.nodes ?? [];
        const parentOf = new Map(treeNodes.map((node) => [node.sys.id, node.parent?.sys?.id]));
        const depth = (id: string, seen = new Set<string>()): number => {
            const parent = parentOf.get(id);
            if (parent === undefined || !parentOf.has(parent) || seen.has(id)) return 0;
            return 1 + depth(parent, seen.add(id));
        };
        for (const node of [...treeNodes].sort((a, b) => depth(b.sys.id) - depth(a.sys.id))) {
            await deleteNode(destinationId, node.sys.id, problems);
        }
        await unpublishAndDelete("destinations", destinationId, problems);
    });
}

/**
 * Creates a published Destination with a folder, a child experience node under it (`/products/chair`) and a top-level
 * experience node (`/home`), all pointing at `experienceId`. The destination is published before its nodes, because a
 * node is not published while the entity it references is still a draft.
 */
export async function createDestinationFixture(prefix: string, experienceId: string): Promise<DestinationFixture> {
    await assertChannelPublished();
    const destination = await create("destinations", {
        name: `${prefix}-destination`,
        description: "SDK integration test",
        channelId: env.channelId,
        properties: [],
    });
    try {
        const experience = resourceLink("Contentful:Experience", "experiences", experienceId);
        const createNode = async (body: unknown, what: string) =>
            expectStatus(await cma(`/destinations/${destination.sys.id}/nodes`, { method: "POST", body }), 201, what);

        const folder = await createNode(
            { type: "DestinationFolderNode", properties: [{ type: "Path", path: "products" }] },
            "create folder node",
        );
        const child = await createNode(
            {
                type: "DestinationExperienceNode",
                experience,
                parent: { sys: { type: "Link", linkType: folder.sys.type, id: folder.sys.id } },
                properties: [{ type: "Path", path: "chair" }],
            },
            "create child experience node",
        );
        const home = await createNode(
            { type: "DestinationExperienceNode", experience, properties: [{ type: "Path", path: "home" }] },
            "create home experience node",
        );

        await publish("destinations", destination);
        for (const node of [folder, child, home]) {
            expectStatus(
                await cma(`/destinations/${destination.sys.id}/nodes/${node.sys.id}/published`, {
                    method: "PUT",
                    version: node.sys.version,
                }),
                200,
                `publish node ${node.sys.id}`,
            );
        }
        return { destinationId: destination.sys.id, folderId: folder.sys.id, homeId: home.sys.id };
    } catch (error) {
        const problems: string[] = [];
        await deleteDestination(destination.sys.id, problems);
        if (problems.length > 0)
            console.error(`Cleanup after failed setup was incomplete:\n  ${problems.join("\n  ")}`);
        throw error;
    }
}

// ---- Sweeping leftovers ----

async function listAll(collection: string): Promise<Entity[]> {
    const limit = 100;
    const items = new Map<string, Entity>();
    for (let skip = 0; ; skip += limit) {
        const page = (await cma<{ items?: Entity[]; total?: number }>(`/${collection}?limit=${limit}&skip=${skip}`))
            .json;
        const pageItems = page?.items ?? [];
        const before = items.size;
        for (const item of pageItems) items.set(item.sys.id, item);
        // A short page is the last one. A page with nothing new means the endpoint ignored `skip`, so stop.
        const last =
            pageItems.length < limit ||
            items.size === before ||
            (page?.total !== undefined && skip + limit >= page.total);
        if (last) return [...items.values()];
    }
}

/**
 * Removes entities left behind by runs that were killed before teardown. Only entities whose name says they are older
 * than `maxAgeMs` are touched, so a run that is still going (another PR, another machine) is never affected.
 */
export async function sweepStale(maxAgeMs: number): Promise<string[]> {
    const problems: string[] = [];
    const cutoff = Date.now() - maxAgeMs;
    // Referenced entities last: destinations, then experiences, then templates.
    for (const collection of ["destinations", "experiences", "experience_templates"]) {
        for (const entity of await listAll(collection)) {
            const created = Number(STALE_NAME.exec(entity.name ?? "")?.[1]);
            if (!Number.isFinite(created) || created > cutoff) continue;
            if (collection === "destinations") await deleteDestination(entity.sys.id, problems);
            else await unpublishAndDelete(collection, entity.sys.id, problems);
        }
    }
    return problems;
}
