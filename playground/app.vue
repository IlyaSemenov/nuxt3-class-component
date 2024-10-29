<script lang="ts">
import { Vue } from "vue-facing-decorator"

@NuxtComponent({
  async asyncData() {
    await new Promise((resolve) => setTimeout(resolve, 10))
    return { value: 42 }
  },
})
export default class PlaygroundApp extends Vue {
  value!: number

  inc() {
    this.value++
  }
}
</script>

<template>
  <div>value = {{ value }}</div>
  <button @click="inc">Increase</button>
</template>
