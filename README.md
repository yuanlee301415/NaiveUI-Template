# NaiveUI-Template

> Vue 3 + TypeScript + NaiveUI + UnoCSS Template

## 技术栈
- Vue 3.5 + TypeScript 6
- Vite 8（Rolldown + Oxc）
- Vue Router 5、Pinia 4（`@vue/devtools-api` 为 Pinia 4 的运行时 peer，与 devtools 插件无关）
- NaiveUI 2.45、UnoCSS 66
- ESLint 10（`withVueTs` + `flat/recommended`）、Prettier 3（**仅作用于 `src/`**）
- Vitest 5 + jsdom（单元测试）

## Requirements
- Node.js `^22.13.0 || >=24`
- pnpm 11+

## TypeScript
- `tsconfig.json` 为 solution 配置，引用三个项目：
  - `tsconfig.app.json`：应用源码（`src/` + `types/` + `env.d.ts`），`@/*` 别名，开启 `noUncheckedIndexedAccess`、`noUnusedLocals`、`noUnusedParameters`；
  - `tsconfig.node.json`：`vite` / `uno` / `eslint` / `vitest` 配置与 `build/` 脚本；
  - `tsconfig.vitest.json`：单元测试文件。
- `env.d.ts`：`vite/client` 引用、`ImportMetaEnv`（`VITE_*` 变量）、`__APP_VERSION__` / `__APP_BUILD_TIME__`、虚拟模块声明。
- `types/`：
  - `global.d.ts`：`window.$message/$dialog/$notification/$loading` 全局类型；
  - `router.d.ts`：`RouteMeta` 扩展（`title/icon/roles`）；
  - `auto-imports.d.ts`、`components.d.ts`：由 `unplugin-auto-import` / `unplugin-vue-components` 生成，**不入库**（见 `.gitignore`）。缺失时执行 `pnpm types:gen`；`pnpm type-check` 会自动先生成。
- `jsconfig.json` 保留，仅用于纯 JS 编辑器提示；VS Code 在根目录存在 `tsconfig.json` 时以 TS 配置为准。
- 编码约定：`<script setup lang="ts">`；props/emits/model 使用类型式宏；模板引用使用 `useTemplateRef<T>()`；避免 `any`。

## 构建插件
- `html.ts`：以 Vite `transformIndexHtml` 注入 `<meta name="release">`（不再压缩 HTML）；
- `svgIcons.ts`：本地 SVG sprite，仍通过 `virtual:svg-icons-register` 注入，`<SvgIcon local-icon="avatar" />` 用法不变；
  - 图标目录：`src/assets/svg-icons/`，symbol id 规则为 `icon-local-<name>`（子目录为 `icon-local-<dir>-<name>`）；
  - **只放小图标**：sprite 会被打包进入口 chunk（首屏体积），体积较大的插画请放 `src/assets/images/`，按需 `import xxxUrl from '@/assets/images/xxx.svg?url'` 后以 `<img>` 渲染（如 403/404 页），避免拖累首屏；
- `release.ts`：构建后生成 `dist/release`；
- `unplugins.ts`：自动导入与组件自动注册；
- `rollup-plugin-visualizer` 仅在 `pnpm analyze` 时启用。

## 样式（CSS）
- 全局样式位于根目录 `styles/`（组件样式保留在各自 SFC 的 `<style scoped>` 中）：
  - `index.css`：唯一入口，顺序为 reset → `tokens.css` → `base.css` → `transitions.css`；`src/main.ts` 先引入它，再引入 `virtual:uno.css`（工具类位于自定义样式之后，便于覆盖）；
  - `tokens.css`：设计令牌，命名约定 `--{类别}-{语义}`（颜色 / 布局 / 滚动条 / 动效），**只保留被引用的令牌**；暗色由 `@media (prefers-color-scheme: dark)` 覆盖，与 NaiveUI `useOsTheme` 行为一致；
  - `base.css`：`html` 字号/行高/滚动条、`html/body/#app` 高度（`100vh` + `100dvh`）、`a` 颜色过渡；
  - `transitions.css`：路由切换过渡 `fade-slide`（`<transition name="fade-slide" mode="out-in">`）。
- 常用令牌：`--color-background`、`--color-background-mute`、`--sider-width`、`--sider-collapsed-width`、`--layout-header-height`、`--layout-content-padding`、`--transition-duration` / `--transition-timing`。
- `--base-color` 等 `--n-*` 变量由 NaiveUI 组件（如 `n-el`）提供，不属于本地令牌。
- Prettier 仅格式化 `src/`，`styles/` 按 `.editorconfig`（2 空格、LF）人工维护。

## 脚本
| 脚本 | 说明 |
| --- | --- |
| `pnpm dev` | 开发服务器（端口由 `.env.development` 的 `VITE_PORT` 决定） |
| `pnpm build` | `types:gen` → 类型检查 → 生产构建 |
| `pnpm build:only` | 仅生产构建（跳过类型检查，CI/快速调试用） |
| `pnpm analyze` | 等价 `vite build --mode analyze`：跳过类型检查并生成 `dist/report.html`；该次构建 `MODE=analyze` 且会覆盖 `dist`，发布前请重新 `pnpm build` |
| `pnpm preview` | 构建后本地预览产物 |
| `pnpm preview:dist` | 直接预览已有 `dist` |
| `pnpm types:gen` | 生成 `types/auto-imports.d.ts`、`types/components.d.ts`（不写 `dist`，约 2s） |
| `pnpm type-check` | `types:gen` + `vue-tsc --build`（三个项目一起检查） |
| `pnpm lint` | ESLint 自动修复全仓（含 `build/` 与根配置） |
| `pnpm lint:check` | ESLint 只检查、`--max-warnings 0`（不修改文件） |
| `pnpm format` | Prettier 格式化 `src/` |
| `pnpm format:check` | Prettier 检查 `src/`（不修改文件） |
| `pnpm test:unit` | Vitest（watch 模式） |
| `pnpm test:unit:run` | Vitest 单次运行 |
| `pnpm check` | 本地质量门禁：`lint:check` → `type-check` → `test:unit:run` |
| `pnpm server` | Mock API（json-server，读 `server/db.json5`，端口 3001） |
| `pnpm ver` | 递增 `VITE_INTERNAL_VERSION` |

## 检查与测试
- 提交前钩子：`simple-git-hooks` + `lint-staged` —— 对暂存的代码文件执行 ESLint 修复，对暂存的 `src/` 文件执行 Prettier（Prettier 范围仅 `src/`）。
- 一键门禁：`pnpm check`；发布前再执行 `pnpm build`。
- 单元测试：8 个 spec（37 个用例），覆盖 `utils` / `models` / `stores/shared` / `hooks/formRules` / `SvgIcon` 组件，以及 `build/plugins` 的 HTML 注入与 SVG sprite 生成。
- 未配置 CI（无 GitHub Actions），可在本地或自建流水线执行 `pnpm check` + `pnpm build`。

## 环境变量
- `.env`：`VITE_APP_TITLE`、`VITE_INTERNAL_VERSION`、`VITE_BASE_API`、`VITE_PROXY`、`VITE_ICON_LOCAL_PREFIX`
- `.env.development`：`VITE_PORT`
- 新增 `VITE_*` 变量时，同步补充 `env.d.ts` 的 `ImportMetaEnv`。

## Mock Server
```sh
pnpm server
```
`json-server` 读取 `server/db.json5`（该文件不入库），提供 `/users` 分页/排序、`/login/*`、`/authUser/*`、`/captcha/*` 等接口。


## Change Log
见 [CHANGELOGS.md](./CHANGELOGS.md)。
