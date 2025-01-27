import { defineNuxtPlugin } from '#app'
import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { MemoryBlockstore } from 'blockstore-core/memory'
import { MemoryDatastore } from 'datastore-core/memory'
import { CID } from 'multiformats/cid'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const ipfsConfig = config.public.ipfs

  // Initialize blockstore and datastore
  const blockstore = new MemoryBlockstore()
  const datastore = new MemoryDatastore()

  // Create Helia node
  const helia = await createHelia({
    blockstore,
    datastore
  })

  // Create UnixFS instance
  const fs = unixfs(helia)

  return {
    provide: {
      ipfs: {
        // Add file to IPFS
        async add(file: File | Blob) {
          // Convert File/Blob to AsyncIterable<Uint8Array>
          const buffer = await file.arrayBuffer()
          const content = new Uint8Array(buffer)
          
          const cid = await fs.addBytes(content)
          return { cid: cid.toString() }
        },

        // Add string content to IPFS
        async addString(content: string) {
          const encoder = new TextEncoder()
          const bytes = encoder.encode(content)
          
          const cid = await fs.addBytes(bytes)
          return { cid: cid.toString() }
        },

        // Get file from IPFS as Uint8Array
        async get(cid: string) {
          const decoder = new TextDecoder()
          const bytes = []
          
          for await (const chunk of fs.cat(cid)) {
            bytes.push(chunk)
          }
          
          return new Uint8Array(Buffer.concat(bytes))
        },

        // Get string content from IPFS
        async getString(cid: string) {
          const decoder = new TextDecoder()
          let content = ''
          
          for await (const chunk of fs.cat(cid)) {
            content += decoder.decode(chunk, { stream: true })
          }
          
          // Final decode
          content += decoder.decode()
          return content
        },

        // List directory contents
        async ls(cid: string) {
          const entries = []
          for await (const entry of fs.ls(cid)) {
            entries.push({
              name: entry.name,
              cid: entry.cid.toString(),
              size: entry.size,
              type: entry.type
            })
          }
          return entries
        },

        // Get raw node
        getRaw: helia.get.bind(helia),

        // Get node info
        getInfo: helia.getInfo.bind(helia)
      }
    }
  }
})