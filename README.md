# nuxt-ipfs

A Nuxt 3 module that provides IPFS integration using Helia, with built-in support for storing and displaying media files (images and videos).

## Features

- 🖼️ Upload and display images and videos using IPFS
- 📝 Store and retrieve text content
- 🎯 Zero configuration required
- 🔧 Customizable storage options
- 🎨 Built-in media viewer component
- 💪 TypeScript support
- ⚡ Powered by Helia, the modern JavaScript IPFS implementation

## Installation

```bash
# npm
npm install nuxt-ipfs

# yarn
yarn add nuxt-ipfs

# pnpm
pnpm add nuxt-ipfs
```

## Setup

Add `nuxt-ipfs` to the `modules` section of your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-ipfs'],
  ipfs: {
    blockstoreType: 'memory',  // 'memory' or 'browser'
    datastoreType: 'memory'    // 'memory' or 'browser'
  }
})
```

## Usage

### Uploading and Displaying Media

```vue
<template>
  <div>
    <!-- File Upload -->
    <input 
      type="file" 
      @change="uploadFile"
      accept="image/*,video/*"
    />

    <!-- Display Media -->
    <IpfsMedia 
      v-if="cid"
      :cid="cid"
      class="w-full max-w-2xl"
    />
  </div>
</template>

<script setup>
const cid = ref('')

async function uploadFile(event) {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    const result = await $ipfs.add(file)
    cid.value = result.cid
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
</script>
```

### Storing Text Content

```vue
<script setup>
// Store text in IPFS
const result = await $ipfs.addString('Hello IPFS!')
console.log('Content CID:', result.cid)

// Retrieve text from IPFS
const content = await $ipfs.getString(result.cid)
console.log('Retrieved content:', content)
</script>
```

## API Reference

### IPFS Helper ($ipfs)

- `add(file: File | Blob)`: Upload a file to IPFS
  ```ts
  const result = await $ipfs.add(file)
  console.log(result.cid) // Returns the CID of the uploaded file
  ```

- `addString(content: string)`: Store text content in IPFS
  ```ts
  const result = await $ipfs.addString('Hello IPFS!')
  console.log(result.cid)
  ```

- `get(cid: string)`: Get file content as Uint8Array
  ```ts
  const data = await $ipfs.get(cid)
  ```

- `getString(cid: string)`: Get text content
  ```ts
  const text = await $ipfs.getString(cid)
  ```

- `ls(cid: string)`: List directory contents
  ```ts
  const entries = await $ipfs.ls(cid)
  ```

### IpfsMedia Component

The `IpfsMedia` component automatically handles displaying both images and videos from IPFS.

```vue
<template>
  <IpfsMedia 
    :cid="cid"
    class="custom-class"
  />
</template>
```

Props:
- `cid` (required): The IPFS CID of the media file

Features:
- Automatic media type detection
- Built-in loading states
- Error handling
- Responsive design
- Support for images (PNG, JPEG, GIF) and videos (MP4, WebM)

## Configuration

In `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-ipfs'],
  ipfs: {
    // Use memory storage (default)
    blockstoreType: 'memory',
    datastoreType: 'memory',

    // Or use persistent browser storage
    blockstoreType: 'browser',
    datastoreType: 'browser'
  }
})
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the module
npm run prepack

# Run tests
npm run test
```

## License

MIT License

## Contributing

Feel free to contribute! Issues and pull requests are welcome.