declare module '#app' {
    interface NuxtApp {
      $ipfs: {
        add(file: File | Blob): Promise<{ cid: string }>
        addString(content: string): Promise<{ cid: string }>
        get(cid: string): Promise<Uint8Array>
        getString(cid: string): Promise<string>
        ls(cid: string): Promise<Array<{
          name: string
          cid: string
          size: number
          type: string
        }>>
        getBlock(cid: string): Promise<Uint8Array>
        hasBlock(cid: string): Promise<boolean>
      }
    }
  }
  
  export { }