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

export function NuxtComponent<T extends VueCons>(arg: T): T
export function NuxtComponent(arg: NuxtComponentOptions): <T extends VueCons>(cons: T) => T
export function NuxtComponent(arg: VueCons | NuxtComponentOptions) {
  if (typeof arg === "function") {
    // Decorator without options, arg is class
    return decorate(arg, {})
  } else {
    // Decorator with options, return callback
    return (cons: VueCons) => decorate(cons, arg)
  }
}

function decorate<T extends VueCons>(cons: T, options: NuxtComponentOptions): T {
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
  // Decorator is supposed to return the same type as what it decorates.
  return defineNuxtComponent(toNative(component)) as unknown as T
}
