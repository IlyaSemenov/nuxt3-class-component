import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils"
import { describe, expect, it } from "vitest"

describe("ssr", async () => {
  await setup({
    rootDir: fileURLToPath(
      new URL("./fixtures/nuxt-property-decorator", import.meta.url)
    ),
  })

  it("renders the index page", async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch("/")
    expect(html).toContain("<div>value = 42</div>")
  })
})
