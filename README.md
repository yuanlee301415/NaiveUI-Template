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
- pnpm 11+（`packageManager` 固定为 `pnpm@11.27.1`；`.npmrc` 开启 `engine-strict`）

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

停止维护的 `vite-plugin-html`、`vite-plugin-svg-icons` 已替换为本地实现（均位于 `build/plugins/`）：

- `html.ts`：以 Vite `transformIndexHtml` 注入 `<meta name="release">`（不再压缩 HTML）；
- `svgIcons.ts`：本地 SVG sprite，仍通过 `virtual:svg-icons-register` 注入，`<SvgIcon local-icon="avatar" />` 用法不变；
  - 图标目录：`src/assets/svg-icons/`，symbol id 规则为 `icon-local-<name>`（子目录为 `icon-local-<dir>-<name>`）；
- `release.ts`：构建后生成 `dist/release`；
- `unplugins.ts`：自动导入与组件自动注册；
- `rollup-plugin-visualizer` 仅在 `pnpm analyze` 时启用。

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

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Change Log

见 [CHANGELOGS.md](./CHANGELOGS.md)。
