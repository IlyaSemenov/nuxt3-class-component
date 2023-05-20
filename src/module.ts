import { addImportsDir, createResolver, defineNuxtModule } from "@nuxt/kit"

export default defineNuxtModule({
  meta: {
    name: "nuxt3-class-component",
  },
  setup() {
    const resolver = createResolver(import.meta.url)
    addImportsDir(resolver.resolve("./runtime"))
  },
})
