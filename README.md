# Contentful Experiences Delivery and Preview Client TypeScript Library

[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fcontentful%2Fcontentful-experience-delivery.js)
[![npm shield](https://img.shields.io/npm/v/@contentful/experience-delivery)](https://www.npmjs.com/package/@contentful/experience-delivery)

> ⚠️ **Dev build.** Published to npm as a pre-release (`dev` tag). APIs are unstable and will change.

A TypeScript client for delivering and previewing Contentful Experiences.
Fetch fully resolved Views and personalized Experiences with rich, typed responses
and first-class IntelliSense.


## Table of Contents

- [Installation](#installation)
- [Reference](#reference)
- [Usage](#usage)
- [Authentication](#authentication)
- [Environments](#environments)
- [Request and Response Types](#request-and-response-types)
- [Exception Handling](#exception-handling)
- [Advanced](#advanced)
  - [Subpackage Exports](#subpackage-exports)
  - [Additional Headers](#additional-headers)
  - [Additional Query String Parameters](#additional-query-string-parameters)
  - [Retries](#retries)
  - [Timeouts](#timeouts)
  - [Aborting Requests](#aborting-requests)
  - [Access Raw Response Data](#access-raw-response-data)
  - [Logging](#logging)
  - [Custom Fetch](#custom-fetch)
  - [Runtime Compatibility](#runtime-compatibility)

## Installation

```sh
npm i -s @contentful/experience-delivery
```

> **Note**: This package is not yet published as a stable release on the public npm
> registry. Until then, see [BUILDING.md](./BUILDING.md) for how to build and
> consume it from source.

## Reference

A full reference for this library is available [here](https://github.com/contentful/contentful-experience-delivery.js/blob/HEAD/./reference.md).

## Usage

Instantiate the client with a Content Delivery API token and fetch a published
Experience:

```typescript
import { ContentfulViewDeliveryClient } from "@contentful/experience-delivery";

const client = new ContentfulViewDeliveryClient({
    token: process.env.CONTENTFUL_CDA_TOKEN!,
});

const experience = await client.experience.get(
    "spaceId",
    "environmentId",
    "experienceId",
    { locale: "en-US" },
);
```

See [Authentication](#authentication) for preview tokens and the
`access_token` query-parameter alternative.


## Authentication

The API supports two authentication modes — both backed by a Contentful access token.
You can mint tokens from the **Settings → API keys** page of any Contentful space.

### Delivery client

For published content, use a Content Delivery API (CDA) token:

```typescript
import { ContentfulViewDeliveryClient } from "@contentful/experience-delivery";

const client = new ContentfulViewDeliveryClient({
    token: process.env.CONTENTFUL_CDA_TOKEN!,
});
```

### Preview client

For draft/unpublished content, create a separate client with a Content Preview API (CPA)
token and the preview base URL:

```typescript
import { ContentfulViewDeliveryClient } from "@contentful/experience-delivery";

const previewClient = new ContentfulViewDeliveryClient({
    token: process.env.CONTENTFUL_CPA_TOKEN!,
    baseUrl: "https://preview.xdn.contentful.com",
});

const draft = await previewClient.experience.get(spaceId, envId, experienceId, {
    preview: "true",
    locale: "en-US",
});
```

### `access_token` query parameter

For environments where you can't send the `Authorization` header (e.g. some browser/CDN
scenarios), the API also accepts an `access_token` query parameter:

```typescript
await client.experience.get(spaceId, envId, experienceId, {
    locale: "en-US",
    accessToken: process.env.CONTENTFUL_CDA_TOKEN!,
});
```


## Environments

This SDK allows you to configure different environments for API requests.

```typescript
import { ContentfulViewDeliveryClient, ContentfulViewDeliveryEnvironment } from "@contentful/experience-delivery";

const client = new ContentfulViewDeliveryClient({
    environment: ContentfulViewDeliveryEnvironment.Default,
});
```

## Request and Response Types

The SDK exports all request and response types as TypeScript interfaces. Simply import them with the
following namespace:

```typescript
import { ContentfulViewDelivery } from "@contentful/experience-delivery";

const request: ContentfulViewDelivery.GetExperienceRequest = {
    ...
};
```

## Exception Handling

When the API returns a non-success status code (4xx or 5xx response), a subclass of the following error
will be thrown.

```typescript
import { ContentfulViewDeliveryError } from "@contentful/experience-delivery";

try {
    await client.experience.getWithOverrides(...);
} catch (err) {
    if (err instanceof ContentfulViewDeliveryError) {
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
        console.log(err.rawResponse);
    }
}
```

## Advanced

### Subpackage Exports

This SDK supports direct imports of subpackage clients, which allows JavaScript bundlers to tree-shake and include only the imported subpackage code. This results in much smaller bundle sizes.

```typescript
import { ExperienceClient } from '@contentful/experience-delivery/experience';

const client = new ExperienceClient({...});
```

### Additional Headers

If you would like to send additional headers as part of the request, use the `headers` request option.

```typescript
import { ContentfulViewDeliveryClient } from "@contentful/experience-delivery";

const client = new ContentfulViewDeliveryClient({
    ...
    headers: {
        'X-Custom-Header': 'custom value'
    }
});

const response = await client.experience.getWithOverrides(..., {
    headers: {
        'X-Custom-Header': 'custom value'
    }
});
```

### Additional Query String Parameters

If you would like to send additional query string parameters as part of the request, use the `queryParams` request option.

```typescript
const response = await client.experience.getWithOverrides(..., {
    queryParams: {
        'customQueryParamKey': 'custom query param value'
    }
});
```

### Retries

The SDK is instrumented with automatic retries with exponential backoff. A request will be retried as long
as the request is deemed retryable and the number of retry attempts has not grown larger than the configured
retry limit (default: 2).

Which status codes are retried depends on the `retryStatusCodes` generator configuration:

**`legacy`** (current default): retries on
- [408](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) (Timeout)
- [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (Too Many Requests)
- [5XX](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) (All server errors, including 500)

**`recommended`**: retries on
- [408](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) (Timeout)
- [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (Too Many Requests)
- [502](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) (Bad Gateway)
- [503](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) (Service Unavailable)
- [504](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) (Gateway Timeout)

Use the `maxRetries` request option to configure this behavior.

```typescript
const response = await client.experience.getWithOverrides(..., {
    maxRetries: 0 // override maxRetries at the request level
});
```

### Timeouts

The SDK defaults to a 60 second timeout. Use the `timeoutInSeconds` option to configure this behavior.

```typescript
const response = await client.experience.getWithOverrides(..., {
    timeoutInSeconds: 30 // override timeout to 30s
});
```

### Aborting Requests

The SDK allows users to abort requests at any point by passing in an abort signal.

```typescript
const controller = new AbortController();
const response = await client.experience.getWithOverrides(..., {
    abortSignal: controller.signal
});
controller.abort(); // aborts the request
```

### Access Raw Response Data

The SDK provides access to raw response data, including headers, through the `.withRawResponse()` method.
The `.withRawResponse()` method returns a promise that results to an object with a `data` and a `rawResponse` property.

```typescript
const { data, rawResponse } = await client.experience.getWithOverrides(...).withRawResponse();

console.log(data);
console.log(rawResponse.headers['X-My-Header']);
```

### Logging

The SDK supports logging. You can configure the logger by passing in a `logging` object to the client options.

```typescript
import { ContentfulViewDeliveryClient, logging } from "@contentful/experience-delivery";

const client = new ContentfulViewDeliveryClient({
    ...
    logging: {
        level: logging.LogLevel.Debug, // defaults to logging.LogLevel.Info
        logger: new logging.ConsoleLogger(), // defaults to ConsoleLogger
        silent: false, // defaults to true, set to false to enable logging
    }
});
```
The `logging` object can have the following properties:
- `level`: The log level to use. Defaults to `logging.LogLevel.Info`.
- `logger`: The logger to use. Defaults to a `logging.ConsoleLogger`.
- `silent`: Whether to silence the logger. Defaults to `true`.

The `level` property can be one of the following values:
- `logging.LogLevel.Debug`
- `logging.LogLevel.Info`
- `logging.LogLevel.Warn`
- `logging.LogLevel.Error`

To provide a custom logger, you can pass in an object that implements the `logging.ILogger` interface.

<details>
<summary>Custom logger examples</summary>

Here's an example using the popular `winston` logging library.
```ts
import winston from 'winston';

const winstonLogger = winston.createLogger({...});

const logger: logging.ILogger = {
    debug: (msg, ...args) => winstonLogger.debug(msg, ...args),
    info: (msg, ...args) => winstonLogger.info(msg, ...args),
    warn: (msg, ...args) => winstonLogger.warn(msg, ...args),
    error: (msg, ...args) => winstonLogger.error(msg, ...args),
};
```

Here's an example using the popular `pino` logging library.

```ts
import pino from 'pino';

const pinoLogger = pino({...});

const logger: logging.ILogger = {
  debug: (msg, ...args) => pinoLogger.debug(args, msg),
  info: (msg, ...args) => pinoLogger.info(args, msg),
  warn: (msg, ...args) => pinoLogger.warn(args, msg),
  error: (msg, ...args) => pinoLogger.error(args, msg),
};
```
</details>


### Custom Fetch

The SDK provides a low-level `fetch` method for making custom HTTP requests while still
benefiting from SDK-level configuration like authentication, retries, timeouts, and logging.
This is useful for calling API endpoints not yet supported in the SDK.

```typescript
const response = await client.fetch("/v1/custom/endpoint", {
    method: "GET",
}, {
    timeoutInSeconds: 30,
    maxRetries: 3,
    headers: {
        "X-Custom-Header": "custom-value",
    },
});

const data = await response.json();
```

### Runtime Compatibility


The SDK works in the following runtimes:



- Node.js 22+
- Vercel
- Cloudflare Workers
- Deno v1.25+
- Bun 1.0+
- React Native


