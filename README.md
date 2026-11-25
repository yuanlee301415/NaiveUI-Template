# NaiveUI-Template

> Vue 3 + TypeScript + NaiveUI + UnoCSS Template

This template should help get you started developing with Vue 3 + TypeScript in Vite.

## 技术栈

- Vue 3.5 + TypeScript 6
- Vite 8（Rolldown + Oxc）
- Vue Router 5、Pinia 4（Pinia 4 需配套安装 `@vue/devtools-api`）
- NaiveUI 2.45、UnoCSS 66
- ESLint 10（`withVueTs`）、Prettier 3

## Requirements

- Node.js `^22.13.0 || >=24`（pnpm 12）
- pnpm 12+

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## TypeScript

- `tsconfig.json` 为 solution 配置，分别引用 `tsconfig.app.json`（应用，`src/` + `types/`）与 `tsconfig.node.json`（构建配置，`vite/uno/eslint/build`）。
- 类型检查：`pnpm type-check`（`vue-tsc --build`），`pnpm build` 也会先执行类型检查。
- `env.d.ts`：`vite/client` 引用、`ImportMetaEnv`（`VITE_*` 变量）、`__APP_VERSION__` / `__APP_BUILD_TIME__`。
- `types/`：
  - `global.d.ts`：`window.$message/$dialog/$notification/$loading` 全局类型；
  - `router.d.ts`：`RouteMeta` 扩展（`title/icon/roles`）；
  - `auto-imports.d.ts`、`components.d.ts`：由 `unplugin-auto-import` / `unplugin-vue-components` 在 `dev`/`build` 时自动生成，已入库以便直接运行 `type-check`。
- `jsconfig.json` 保留为纯 JS 编辑器提示使用；VS Code 在根目录存在 `tsconfig.json` 时以 TS 配置为准（`paths` 已同步）。
- 编码约定：`<script setup lang="ts">`；props/emits/model 使用类型式宏；模板引用使用 `useTemplateRef<T>()`；避免 `any`。

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Type-Check Only

```sh
pnpm type-check
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Format with [Prettier](https://prettier.io/)

```sh
pnpm format
```

### Mock Server (json-server)

```sh
pnpm server
```

### Bump Internal Version

```sh
pnpm ver
```

## Change Log

见 [CHANGELOGS.md](./CHANGELOGS.md)。
