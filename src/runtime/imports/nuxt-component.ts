import type { NuxtApp } from "nuxt/app";
import { defineNuxtComponent } from "nuxt/app"
import type { VueCons } from "vue-facing-decorator";
import { Component, toNative } from "vue-facing-decorator"

// Discover original non-exported types
type ComponentOptionsOrCons = Parameters<typeof Component>[0]
type ComponentOptions = Exclude<ComponentOptionsOrCons, VueCons>

export interface NuxtComponentOptions extends ComponentOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asyncData?(nuxtApp: NuxtApp): Promise<Record<string, any>>
}

type NuxtComponentOptionsOrCons = NuxtComponentOptions | VueCons

export function NuxtComponent(arg: NuxtComponentOptionsOrCons) {
  return _NuxtComponent(arg, (cons: VueCons, options: NuxtComponentOptions) => {
    // nuxt-component-decorator allowed asyncData as class method.
    if (cons.prototype.asyncData) {
      if (options.asyncData) {
        throw new Error(
          "Duplicate asyncData (decorator option and class method)."
        )
      }
      options.asyncData = cons.prototype.asyncData
    }
    const component = Component(options)(cons)
    return defineNuxtComponent(toNative(component))
  })
}

function _NuxtComponent<T>(
  arg: NuxtComponentOptionsOrCons,
  cb: (cons: VueCons, option: NuxtComponentOptions) => T
) {
  if (typeof arg === "function") {
    return cb(arg, {})
  }
  return (cons: VueCons) => cb(cons, arg)
}
