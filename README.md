# nuxt3-class-component

A successor to [nuxt-property-decorator](https://github.com/nuxt-community/nuxt-property-decorator) for Nuxt 3, based on [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator).

Unlike the original `nuxt-property-decorator`, this package is implemented as a Nuxt module. This is because it uses `defineNuxtComponent` internally, which doesn't work outside of Nuxt compilation context.

## Quick Setup

Install:

```sh
npm install nuxt3-class-component vue-facing-decorator
```

Add `nuxt3-class-component` to the `modules` section of `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt3-class-component"],
})
```

## Drop-in replacement for `nuxt-property-decorator`

Your previous Nuxt2 components will work automagically:

```vue
<script lang="ts">
// This pseudo-package is provided by nuxt3-class-component module
import { Component, Vue } from "nuxt-property-decorator"

@Component({
  async asyncData() {
    return { value: 42 }
  },
})
export default class App extends Vue {
  value!: number
}
</script>

<template>
  <div>value = {{ value }}</div>
</template>
```

## New syntax

It is advised to use the new syntax instead:

```vue
<script lang="ts">
import { Vue } from "vue-facing-decorator"

@NuxtComponent({
  async asyncData() {
    return { value: 42 }
  },
})
export default class App extends Vue {
  value!: number
}
</script>

<template>
  <div>value = {{ value }}</div>
</template>
```

## Begging

If you find this module useful, please consider a small one-off donation with the ❤️ Sponsor button.
