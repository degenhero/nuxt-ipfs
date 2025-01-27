import { defineNuxtModule, addPlugin, addComponent, createResolver } from '@nuxt/kit'
import { fileURLToPath } from 'url'


type StoreType = 'memory' | 'browser'

export interface ModuleOptions {
  blockstoreType: StoreType
  datastoreType: StoreType
}


export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ipfs',
    configKey: 'ipfs',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    blockstoreType: 'memory' as StoreType,
    datastoreType: 'memory' as StoreType
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add types
    nuxt.hooks.hook('prepare:types', ({ references }) => {
      references.push({ types: 'nuxt-ipfs' })
    })

    // Add runtime config
    nuxt.options.runtimeConfig.public.ipfs = options

    // Add plugin
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Register components
    addComponent({
      name: 'IpfsMedia',
      filePath: resolver.resolve('./runtime/components/IpfsMedia.vue')
    })
  }
})
