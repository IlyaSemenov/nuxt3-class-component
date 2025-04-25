---
"nuxt3-class-component": patch
---

Fix `asyncData` loss after hydration caused by automatically inserted `_fetchKeyBase` (working in Nuxt 3.4 but broken in 3.16).
