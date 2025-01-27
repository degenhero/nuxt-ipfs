<template>
    <div class="ipfs-media">
      <!-- Loading state -->
      <div v-if="loading" class="loading-container">
        <div class="loader"></div>
      </div>
  
      <!-- Error state -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
      </div>
  
      <!-- Image display -->
      <img
        v-else-if="mediaType?.startsWith('image/')"
        :src="mediaUrl"
        :alt="'IPFS content: ' + cid"
        @error="handleMediaError"
        class="media-content"
      />
  
      <!-- Video display -->
      <video
        v-else-if="mediaType?.startsWith('video/')"
        :src="mediaUrl"
        controls
        @error="handleMediaError"
        class="media-content"
      >
        Your browser does not support the video tag.
      </video>
  
      <!-- Unsupported media type -->
      <div v-else-if="mediaType" class="unsupported-container">
        <p>Unsupported media type: {{ mediaType }}</p>
      </div>
  
      <!-- No CID provided -->
      <div v-else class="empty-container">
        <p>No CID provided</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  
  const props = defineProps({
    cid: {
      type: String,
      required: true
    }
  })
  
  const loading = ref(true)
  const error = ref(null)
  const mediaUrl = ref(null)
  const mediaType = ref(null)
  
  // MIME type detection helper
  const detectMimeType = async (blob) => {
    const arr = new Uint8Array(await blob.slice(0, 4).arrayBuffer())
    
    // PNG signature: 89 50 4E 47
    if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47) {
      return 'image/png'
    }
    
    // JPEG signature: FF D8 FF
    if (arr[0] === 0xFF && arr[1] === 0xD8 && arr[2] === 0xFF) {
      return 'image/jpeg'
    }
    
    // GIF signature: 47 49 46 38
    if (arr[0] === 0x47 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x38) {
      return 'image/gif'
    }
    
    // WebM signature: 1A 45 DF A3
    if (arr[0] === 0x1A && arr[1] === 0x45 && arr[2] === 0xDF && arr[3] === 0xA3) {
      return 'video/webm'
    }
    
    // MP4 signature: usually starts with ftyp at byte 4
    if (arr[0] === 0x66 && arr[1] === 0x74 && arr[2] === 0x79 && arr[3] === 0x70) {
      return 'video/mp4'
    }
    
    return 'application/octet-stream'
  }
  
  const handleMediaError = () => {
    error.value = 'Failed to load media'
    loading.value = false
  }
  
  const loadMedia = async () => {
    if (!props.cid) {
      loading.value = false
      return
    }
  
    try {
      loading.value = true
      error.value = null
  
      const { $ipfs } = useNuxtApp()
      const data = await $ipfs.get(props.cid)
      
      // Convert to Blob and detect MIME type
      const blob = new Blob([data])
      mediaType.value = await detectMimeType(blob)
      
      // Create object URL
      if (mediaUrl.value) {
        URL.revokeObjectURL(mediaUrl.value)
      }
      mediaUrl.value = URL.createObjectURL(blob)
      
    } catch (err) {
      error.value = 'Failed to load media from IPFS'
      console.error('Error loading IPFS media:', err)
    } finally {
      loading.value = false
    }
  }
  
  // Watch for CID changes
  watch(() => props.cid, loadMedia)
  
  // Initial load
  onMounted(loadMedia)
  
  // Cleanup
  onBeforeUnmount(() => {
    if (mediaUrl.value) {
      URL.revokeObjectURL(mediaUrl.value)
    }
  })
  </script>
  
  <style scoped>
.ipfs-media{background:#f9fafb;border-radius:.5rem;min-height:200px;overflow:hidden;position:relative;width:100%}.empty-container,.error-container,.loading-container,.unsupported-container{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;min-height:200px;padding:1rem;text-align:center}.loader{animation:spin 1s linear infinite;border:3px solid #f3f3f3;border-radius:50%;border-top-color:#3b82f6;height:24px;width:24px}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}.error-container{color:#ef4444}.error-icon{font-size:24px;margin-bottom:.5rem}.media-content{height:100%;-o-object-fit:contain;object-fit:contain;width:100%}.empty-container,.unsupported-container{color:#6b7280}
</style>