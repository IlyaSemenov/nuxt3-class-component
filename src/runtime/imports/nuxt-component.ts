import type { NuxtApp } from "nuxt/app";
// Rename defineNuxtComponent to prevent Nuxt compiler from injecting _fetchKeyBase.
import { defineNuxtComponent as dnc } from "nuxt/app"
import type { Vue } from "vue-facing-decorator"
import { Component } from "vue-facing-decorator"

// Exract vue-facing-decorator private types
type VueCons = typeof Vue
type ComponentOptionsOrCons = typeof Component extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: infer A1): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: infer A2): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: infer A3): any;
} ? A1[0] | A2[0] | A3[0] : never;

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
  // Apply vue-facing-decorator
  Component(options)(componentClass)
  // Internally, vue-facing-decorator will fill in __vccOpts, extract it
  // and create a Nuxt component with defineNuxtComponent.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return dnc((componentClass as any).__vccOpts)
}
