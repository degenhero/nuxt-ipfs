import * as _nuxt_schema from '@nuxt/schema';

type StoreType = 'memory' | 'browser';
interface ModuleOptions {
    blockstoreType: StoreType;
    datastoreType: StoreType;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions, ModuleOptions, false>;

export { type ModuleOptions, _default as default };
