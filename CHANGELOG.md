# nuxt3-class-component

## 1.4.0

### Minor Changes

- fd6a27f: Use `vue-facing-decorator@4`.

### Patch Changes

- 1d7eacb: Allow `@nuxt/kit@4`.

## 1.3.2

### Patch Changes

- d122f2a: Fix `asyncData` loss after hydration caused by automatically inserted `_fetchKeyBase` (working in Nuxt 3.4 but broken in 3.16).

## 1.3.1

### Patch Changes

- 0aa7f7c: ~~Move `vue-facing-decorator` to `peerDependencies`, fix import in pnpm projects without shameful hoisting.~~ That didn't work.

## 1.3.0

### Minor Changes

- 7c31851: Support Nuxt 3.11, automatically enable `experimentalDecorators` in esbuild.
- a7237e9: Type-aware `@NuxtComponent`.

## 1.2.0

### Minor Changes

- 4b7fb2d: Use vue-facing-decorator@3.
