# CHANGELOGS

本文件记录「项目支持 TypeScript」改造的每一步；每完成一步更新本文件并提交。

## 改造目标

- 遵循 Vue3 + TS 最佳实践（对齐 create-vue 当前模板：solution-style tsconfig、`vue-tsc --build`、`env.d.ts`、`withVueTs` ESLint）。
- 应用源码与构建脚本全部改为 TypeScript。
- 依赖按当前主流版本适度升级。
- 保留 `jsconfig.json`。
- 移除 devtools 相关依赖（`vite-plugin-vue-devtools`），不引入 `@vue/devtools-api`。
- ESLint 使用 `withVueTs`。

## 步骤 1：依赖升级与移除 devtools（2026-11-25）

### 变更

- **移除** `vite-plugin-vue-devtools` 依赖，并同步移除 `build/plugins/index.js` 中的 `vueDevTools()` 插件。
- **升级**（主版本内，避免引入 devtools 依赖）：
  - `vue` `^3.5.25` → `^3.5.46`
  - `vue-router` `^4.6.3` → `^4.6.5`（不升 v5：v5 会引入 `@vue/devtools-api` 等额外依赖）
  - `pinia` `^3.0.4` 保持（不升 v4：v4 要求手动安装 `@vue/devtools-api`）
  - `naive-ui` `^2.43.2` → `^2.45.3`
  - `axios` `^1.13.2` → `^1.21.1`
  - `tailwind-merge` `^3.4.0` → `^3.7.1`
  - `@unocss/reset` `^66.5.10` → `^66.13.0`
  - `vite` `^7.2.4` → `^7.3.8`（保持 7.x：Vite 8 为 Rolldown 且要求 Node ≥ 24.12，本机为 24.9.0）
  - `@vitejs/plugin-vue` `^6.0.2` → `^6.0.11`
  - `unocss` / `@unocss/preset-icons` `^66.5.10` → `^66.13.0`
  - `unplugin-auto-import` `^20.3.0` → `^21.1.0`
  - `unplugin-vue-components` `^30.0.0` → `^32.1.0`
  - `@rollup/plugin-terser` `^0.4.4` → `^1.0.2`
  - `rollup-plugin-visualizer` `^6.0.5` → `^7.1.3`
  - `less` `^4.5.1` → `^4.9.1`
  - `prettier` `3.6.2` → `^3.10.1`
  - `eslint` `^9.39.1` → `^10.15.0`，`@eslint/js` `^9.39.1` → `^10.0.1`
  - `eslint-plugin-vue` `~10.5.1` → `~10.12.1`
  - `globals` `^16.5.0` → `^17.14.0`
  - `lint-staged` `^16.2.7` → `^17.6.2`
  - `simple-git-hooks` `^2.13.1` → `^2.14.0`
  - `json-server` `1.0.0-beta.3` → `^1.0.0-beta.15`
  - `@iconify-json/line-md` `^1.2.13` → `^1.2.16`
- **新增** TS 工具链：`typescript ~6.0.3`、`vue-tsc ^3.3.14`、`@vue/tsconfig ^0.9.1`、`@tsconfig/node24 ^24.0.6`、`@types/node ^24.19.2`、`@vue/eslint-config-typescript ^14.9.0`、`vue-eslint-parser ^10.4.2`、`tsx ^4.23.15`。
- `engines.node`：`^20.19.0 || >=22.12.0` → `^22.13.0 || >=24`（Node 20 已 EOL，且 ESLint 10 / rollup-plugin-visualizer 7 的要求）。
- `lint-staged` 匹配文件扩展名增加 `ts/mts/tsx`。
- `pnpm-workspace.yaml`：pnpm 12 的安装脚本审批改为 `allowBuilds`（esbuild / less / simple-git-hooks），替换旧的 `onlyBuiltDependencies`。
- 修正 `build/plugins/unplugins.js` 的导入路径为 `unplugin-vue-components/vite`、`unplugin-vue-components/resolvers`（v32 仅公开这些有类型的 exports）。

### 说明

- `json-server` 保持 `1.0.0-beta.3`：当前 registry 镜像（npmmirror）的版本列表只到 `1.0.0-beta.9`，`^1.0.0-beta.15` 无法解析，故锁定已回归验证过的 beta.3。
- 未新增 `@vue/devtools-api`（移除 devtools 相关依赖的要求）。

### 验证

- `pnpm install` 成功（含 esbuild / simple-git-hooks 安装脚本）；
- `pnpm build` 成功（Vite 7.3.8，仍为纯 Vite 构建）；
- `pnpm lint` 退出码 0。


## 后续步骤

- 步骤 2：TS 基础设施（tsconfig 三件套、`env.d.ts`、`types/*`、ESLint `withVueTs`、构建配置 `.ts`）+ 全量 `.js → .ts` 机械重命名 + 基础层（enum/models/utils/api/constants）类型化。
- 步骤 3：hooks / stores / router / directives / plugins 类型化，生成自动导入声明。
- 步骤 4：41 个 Vue SFC 类型化，`pnpm type-check` 全绿。
- 步骤 5：最终验证（lint/build/dev/json-server 冒烟）、README 更新、`build` 接入 `vue-tsc --build`。
