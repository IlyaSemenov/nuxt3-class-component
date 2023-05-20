<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({
  async asyncData() {
    await new Promise((resolve) => {
      setTimeout(resolve, 10)
    })
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
