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
    accessToken: "access_token",
    optimizationProfileId: "optimization-profile-id",
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
    accessToken: "access_token",
    optimizationProfileId: "optimization-profile-id",
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

## Template
<details><summary><code>client.template.<a href="/src/api/resources/template/client/Client.ts">get</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.HydratedView</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.template.get("spaceId", "environmentId", "id", {
    preview: "true",
    accessToken: "access_token",
    optimizationProfileId: "optimization-profile-id",
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

**request:** `ContentfulViewDelivery.GetTemplateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TemplateClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Component
<details><summary><code>client.component.<a href="/src/api/resources/component/client/Client.ts">get</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.HydratedFragmentView</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.component.get("spaceId", "environmentId", "id", {
    preview: "true",
    accessToken: "access_token",
    optimizationProfileId: "optimization-profile-id",
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

**request:** `ContentfulViewDelivery.GetComponentRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ComponentClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Fragment
<details><summary><code>client.fragment.<a href="/src/api/resources/fragment/client/Client.ts">get</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.HydratedFragmentView</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Superseded by `getExperienceFragment` (`GET /experience_fragments/{id}`), which returns the renamed ExO entity shape.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.fragment.get("spaceId", "environmentId", "id", {
    preview: "true",
    accessToken: "access_token",
    optimizationProfileId: "optimization-profile-id",
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

**request:** `ContentfulViewDelivery.GetFragmentRequest` 
    
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

## ExperienceFragment
<details><summary><code>client.experienceFragment.<a href="/src/api/resources/experienceFragment/client/Client.ts">get</a>(spaceId, environmentId, id, { ...params }) -> ContentfulViewDelivery.HydratedExperienceFragmentView</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.experienceFragment.get("spaceId", "environmentId", "id", {
    preview: "true",
    accessToken: "access_token",
    optimizationProfileId: "optimization-profile-id",
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

**request:** `ContentfulViewDelivery.GetExperienceFragmentRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ExperienceFragmentClient.RequestOptions` 
    
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
    accessToken: "access_token",
    releaseLte: "release[lte]",
    timestampLte: "timestamp[lte]",
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
    accessToken: "access_token",
    releaseLte: "release[lte]",
    timestampLte: "timestamp[lte]",
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

