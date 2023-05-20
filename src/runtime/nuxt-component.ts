import { defineNuxtComponent, NuxtApp } from "nuxt/app"
import { Component, VueCons } from "vue-facing-decorator"

// Discover original non-exported types
type ComponentOptionsOrCons = Parameters<typeof Component>[0]
type ComponentOptions = Exclude<ComponentOptionsOrCons, VueCons>

export interface NuxtComponentOptions extends ComponentOptions {
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
    return defineNuxtComponent(component)
  })
}

function _NuxtComponent(
  arg: NuxtComponentOptionsOrCons,
  cb: (cons: VueCons, option: NuxtComponentOptions) => any
) {
  if (typeof arg === "function") {
    return cb(arg, {})
  }
  return (cons: VueCons) => cb(cons, arg)
}
