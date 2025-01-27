import { defineNuxtModule, createResolver, addPlugin, addComponent } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "nuxt-ipfs",
    configKey: "ipfs",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  defaults: {
    blockstoreType: "memory",
    datastoreType: "memory"
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    nuxt.hooks.hook("prepare:types", ({ references }) => {
      references.push({ types: "nuxt-ipfs" });
    });
    nuxt.options.runtimeConfig.public.ipfs = options;
    addPlugin(resolver.resolve("./runtime/plugin"));
    addComponent({
      name: "IpfsMedia",
      filePath: resolver.resolve("./runtime/components/IpfsMedia.vue")
    });
  }
});

export { module as default };
