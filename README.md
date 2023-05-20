# nuxt3-class-component

A successor to [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator) for Nuxt 3, based on [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator).

## Quick Setup

1. Install

```sh
npm install nuxt3-class-component vue-facing-decorator
```

2. Add `nuxt3-class-component` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ["nuxt3-class-component"],
})
```

3. Use it to define Nuxt components:

```vue
<script lang="ts">
import { Vue } from "vue-facing-decorator"

@NuxtComponent({
  async asyncData() {
    return { value: 42 }
  },
})
export default class PlaygroundApp extends Vue {
  value!: number
}
</script>

<template>
  <div>value = {{ value }}</div>
</template>
```
