# Reference
## Experience
<details><summary><code>client.experience.<a href="/src/api/resources/experience/client/Client.ts">get</a>(id, { ...params }) -> ContentfulViewDelivery.GetExperienceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.experience.get("id", {
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

<details><summary><code>client.experience.<a href="/src/api/resources/experience/client/Client.ts">getWithOverrides</a>(id, { ...params }) -> ContentfulViewDelivery.GetWithOverridesExperienceResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.experience.getWithOverrides("id", {
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
<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">sitemap</a>(destinationId, { ...params }) -> ContentfulViewDelivery.DestinationSitemap</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.sitemap("destinationId", {
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

<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">resolveByNodeId</a>(destinationId, nodeId, { ...params }) -> ContentfulViewDelivery.DestinationExperienceResolutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.resolveByNodeId("destinationId", "nodeId", {
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

<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">resolveByNodeIdWithOverrides</a>(destinationId, nodeId, { ...params }) -> ContentfulViewDelivery.DestinationExperienceResolutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.resolveByNodeIdWithOverrides("destinationId", "nodeId", {
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

<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">resolveByPath</a>(destinationId, { ...params }) -> ContentfulViewDelivery.DestinationExperienceResolutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.resolveByPath("destinationId", {
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

**destinationId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `ContentfulViewDelivery.ResolveByPathDestinationRequest` 
    
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

<details><summary><code>client.destination.<a href="/src/api/resources/destination/client/Client.ts">resolveByPathWithOverrides</a>(destinationId, { ...params }) -> ContentfulViewDelivery.DestinationExperienceResolutionResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.destination.resolveByPathWithOverrides("destinationId", {
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
<details><summary><code>client.release.experience.<a href="/src/api/resources/release/resources/experience/client/Client.ts">get</a>(id, { ...params }) -> ContentfulViewDelivery.HydratedView</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.release.experience.get("id", {
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
<details><summary><code>client.release.fragment.<a href="/src/api/resources/release/resources/fragment/client/Client.ts">get</a>(id, { ...params }) -> ContentfulViewDelivery.HydratedFragmentView</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.release.fragment.get("id", {
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

