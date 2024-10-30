import {
  addImportsDir,
  addTemplate,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit"

export default defineNuxtModule({
  meta: {
    name: "nuxt3-class-component",
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)
    addImportsDir(resolver.resolve("./runtime/imports"))
    const nuxt_property_decorator = addTemplate({
      // Move to ./assets once https://github.com/nuxt/module-builder/issues/63 is resolved
      src: resolver.resolve("../templates/nuxt-property-decorator.ts"),
      dst: nuxt.options.buildDir + "/nuxt-property-decorator.ts",
      write: true,
    })
    nuxt.options.alias["nuxt-property-decorator"] = nuxt_property_decorator.dst
    nuxt.hook('vite:extendConfig', config => {
      if (config.esbuild) {
        config.esbuild.tsconfigRaw ??= {}
        if (typeof config.esbuild.tsconfigRaw === "string") {
          config.esbuild.tsconfigRaw = JSON.parse(config.esbuild.tsconfigRaw)
        }
        if (typeof config.esbuild.tsconfigRaw === "object" && config.esbuild.tsconfigRaw) {
          config.esbuild.tsconfigRaw.compilerOptions ??= {}
          config.esbuild.tsconfigRaw.compilerOptions.experimentalDecorators = true
        }
      }
    })
  },
})
