import { ContentfulViewDeliveryError } from "../../src/index.js";

/** Thrown by a poll callback to say "reached the API, but not the expected state yet". */
export class NotReadyError extends Error {}

/**
 * Delivery serves a published copy that is pushed asynchronously, so freshly published entities answer 404 for a few
 * seconds. Retries on 404 and `NotReadyError` only; any other failure (bad token, 5xx) is a real failure right away.
 */
export async function waitFor<T>(what: string, fn: () => Promise<T>, timeoutMs = 60_000): Promise<T> {
    const start = Date.now();
    let last = "no response";
    while (Date.now() - start < timeoutMs) {
        try {
            return await fn();
        } catch (error) {
            const notYet =
                error instanceof NotReadyError ||
                (error instanceof ContentfulViewDeliveryError && error.statusCode === 404);
            if (!notYet) throw error;
            last = error instanceof Error ? error.message : String(error);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    throw new Error(`${what} was not available within ${timeoutMs / 1000}s (last: ${last})`);
}

/** Awaits a call that is expected to fail and returns the HTTP status of the error. */
export async function rejectionStatus(call: Promise<unknown>): Promise<number | undefined> {
    try {
        await call;
    } catch (error) {
        if (error instanceof ContentfulViewDeliveryError) return error.statusCode;
        throw error;
    }
    throw new Error("Expected the call to fail, but it succeeded");
}
