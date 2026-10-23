# Reference
## Experience
<details><summary><code>client.experience.<a href="/src/api/resources/experience/client/Client.ts">get</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.GetExperienceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.experience.get("spaceId", "environmentId", "id", {
    preview: "true",
    access_token: "access_token",
    "optimization-profile-id": "optimization-profile-id",
    locale: "locale",
    variant: "variant"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**environmentId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**id:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.GetExperienceRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ExperienceClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.experience.<a href="/src/api/resources/experience/client/Client.ts">getWithOverrides</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.GetWithOverridesExperienceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.experience.getWithOverrides("spaceId", "environmentId", "id", {
    preview: "true",
    access_token: "access_token",
    "optimization-profile-id": "optimization-profile-id",
    locale: "locale",
    variant: "variant"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**environmentId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**id:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.GetWithOverridesExperienceRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ExperienceClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Destination
<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">sitemap</a>(spaceId, destinationId, { ...params }) -> ContentfulViewDelivery.DestinationSitemap</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.sitemap("spaceId", "destinationId", {
    access_token: "access_token",
    pageNext: "pageNext",
    pagePrev: "pagePrev",
    limit: 1.1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**destinationId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.SitemapDestinationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DestinationClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">resolveByNodeId</a>(spaceId, destinationId, nodeId, { ...params }) -> ContentfulViewDelivery.DestinationExperienceResolutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.resolveByNodeId("spaceId", "destinationId", "nodeId", {
    access_token: "access_token",
    locale: "locale"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**destinationId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**nodeId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.ResolveByNodeIdDestinationRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DestinationClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">resolveByNodeIdWithOverrides</a>(spaceId, destinationId, nodeId, { ...params }) -> ContentfulViewDelivery.DestinationExperienceResolutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.resolveByNodeIdWithOverrides("spaceId", "destinationId", "nodeId", {
    access_token: "access_token",
    locale: "locale"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**destinationId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**nodeId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.DestinationExperiencesByNodeRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DestinationClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">resolveByPath</a>(spaceId, destinationId, { ...params }) -> ContentfulViewDelivery.DestinationExperienceResolutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.resolveByPath("spaceId", "destinationId", {
    access_token: "access_token",
    locale: "locale",
    path: "path"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**destinationId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.DestinationExperiencesByPathRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DestinationClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Release Experience
<details><summary><code>client.release.experience.<a href="/src/api/resources/release/resources/experience/client/Client.ts">get</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.HydratedView</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.release.experience.get("spaceId", "environmentId", "id", {
    access_token: "access_token",
    "release[lte]": "release[lte]",
    "timestamp[lte]": "timestamp[lte]",
    locale: "locale"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**environmentId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**id:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.release.GetExperienceRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ExperienceClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Release Fragment
<details><summary><code>client.release.fragment.<a href="/src/api/resources/release/resources/fragment/client/Client.ts">get</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.HydratedFragmentView</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.release.fragment.get("spaceId", "environmentId", "id", {
    access_token: "access_token",
    "release[lte]": "release[lte]",
    "timestamp[lte]": "timestamp[lte]",
    locale: "locale"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**spaceId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**environmentId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**id:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.release.GetFragmentRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FragmentClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

