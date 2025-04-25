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

export function NuxtComponent<T extends VueCons>(componentClass: T): T
export function NuxtComponent(options: NuxtComponentOptions): <T extends VueCons>(componentClass: T) => T
export function NuxtComponent(componentClassOrOptions: VueCons | NuxtComponentOptions) {
  if (typeof componentClassOrOptions === "function") {
    // Decorator without options.
    const componentClass = componentClassOrOptions
    return decorate(componentClass, {})
  } else {
    // Decorator with options.
    const options = componentClassOrOptions
    // Create a decorator callback, it will be immediately called with a class component.
    return (componentClass: VueCons) => decorate(componentClass, options) as unknown as VueCons
  }
}

function decorate(componentClass: VueCons, options: NuxtComponentOptions) {
  // nuxt-component-decorator allowed asyncData as a class method, move it to options.
  if (componentClass.prototype.asyncData) {
    if (options.asyncData) {
      throw new Error(
        "Duplicate asyncData (decorator option and class method)."
      )
    }
    options.asyncData = componentClass.prototype.asyncData
  }
  const component = Component(options)(componentClass)
  return defineNuxtComponent(toNative(component))
}
