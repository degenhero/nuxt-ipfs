# nuxt-ipfs

A Nuxt 3 module that provides IPFS functionality through Helia, the modern JavaScript IPFS implementation.

## Features

- Upload files to IPFS
- Store text content on IPFS
- Retrieve files and text from IPFS
- List directory contents
- TypeScript support
- Uses in-memory storage by default


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

1. Add `nuxt-ipfs` dependency to your project:

```bash
npm install nuxt-ipfs
# or
yarn add nuxt-ipfs
```

2. Add `nuxt-ipfs` to the `modules` section of your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-ipfs'],
  ipfs: {
    blockstoreType: 'memory',  // 'memory' or 'browser'
    datastoreType: 'memory'    // 'memory' or 'browser'
  }
})
```


## Setup

1. Add `nuxt-ipfs` dependency to your project:

```bash
npm install nuxt-ipfs
# or
yarn add nuxt-ipfs
```

2. Add `nuxt-ipfs` to the `modules` section of your `nuxt.config.ts`:

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

The module provides a `$ipfs` helper that you can use in your components:

```vue
<script setup>
// Upload a file
async function uploadFile(file) {
  const result = await $ipfs.add(file)
  console.log('File uploaded with CID:', result.cid)
}

// Store text content
async function storeText(text) {
  const result = await $ipfs.addString(text)
  console.log('Text stored with CID:', result.cid)
}

// Retrieve content
async function getText(cid) {
  const content = await $ipfs.getString(cid)
  console.log('Retrieved content:', content)
}

// List directory contents
async function listContents(cid) {
  const entries = await $ipfs.ls(cid)
  console.log('Directory contents:', entries)
}
</script>
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
npm run build
```
