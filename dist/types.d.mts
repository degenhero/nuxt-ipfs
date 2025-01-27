
import type { ModuleOptions } from './module.js'


declare module '@nuxt/schema' {
  interface NuxtConfig { ['ipfs']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['ipfs']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['ipfs']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['ipfs']?: ModuleOptions }
}


export type { ModuleOptions, default } from './module.js'
