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


## 步骤 2：TS 基础设施 + 全量重命名 + 基础层类型化（2026-11-25）

### 新增 / 修改的配置

- `tsconfig.json`：solution 风格（`files: []` + 引用 `tsconfig.node.json`、`tsconfig.app.json`），对齐 create-vue。
- `tsconfig.app.json`：继承 `@vue/tsconfig/tsconfig.dom.json`，`noUncheckedIndexedAccess`、`paths.@/*`、`tsBuildInfoFile` 指向 `node_modules/.tmp`。
- `tsconfig.node.json`：继承 `@tsconfig/node24/tsconfig.json`，`module: preserve`、`moduleResolution: bundler`、`types: ["node"]`、`resolveJsonModule`。
- `jsconfig.json`：**保留不动**（按要求），仅用于 JS 编辑器提示；VS Code 在根目录存在 `tsconfig.json` 时以其为准，故 `paths` 已镜像进 `tsconfig.app.json`。
- `env.d.ts`：`vite/client`、`vite-plugin-svg-icons/client` 引用；`ImportMetaEnv`（VITE_* 变量）；`__APP_VERSION__` / `__APP_BUILD_TIME__`；`virtual:uno.css` 声明。
- `types/global.d.ts`：`Window.$message/$dialog/$notification/$loading`（NaiveUI 类型）。
- `types/router.d.ts`：`RouteMeta` 扩展（`title/icon/roles`）。
- `types/auto-imports.d.ts`、`types/components.d.ts`：由 unplugin 生成并入库（`dts` 指向 `types/`）。
- `eslint.config.js`：改用 `withVueTs` + `vueTsConfigs.recommended`；支持 js/ts/vue；忽略生成物；配置文件使用 node globals。
- `package.json`：
  - 新增 `type-check: "vue-tsc --build"`；
  - `ver` 改为 `tsx build/scripts/update-internal-version.ts`；
  - 移除 Prettier 3.10 已不支持的 `--experimental-cli`；
  - `build` 暂保持 `vite build`（步骤 5 接入类型检查）。
- `index.html` 与 `build/plugins/html.ts` 入口改为 `src/main.ts`。
- 构建配置改为 TypeScript：`vite.config.ts`、`uno.config.ts`、`build/plugins/{index,html,unplugins,release}.ts`、`build/scripts/update-internal-version.ts`；`unplugins.ts` 增加 `dts` 输出路径并改用公开导入路径。

### 源码机械改造

- 57 个 `src/**/*.js` → `.ts`（`git mv`，保留历史），`import/export` 说明符去掉 `.js` 后缀（101 处）。
- 41 个 `.vue` 全部改为 `<script setup lang="ts">`。

### 基础层类型化（本次完成）

- `enum`：`Role/Gender/UsingStatus/OperationType/StoreId` 改为 `as const` 对象 + 显式接口，保留迭代与中文标签反查；导出 `RoleType/GenderValue/UsingStatusValue/OperationTypeValue/StoreIdType/EnumOption`。
- `models`：`AuthUser/User/Menu/DataTableSorter/DataTablePaginationBasicConfig` 全部为真实字段声明 + `Partial<T>` 构造参数；`UserParams` 从 `User.UserParams` 静态类改为独立导出的类（同步更新用户管理页调用点）。
- `utils`：`authToken`、`formatDate`（修正签名）、`request`（拦截器解包 + 泛型 `RequestInstance`）、`naiveUI`、`cloneJson`。
- `api`：新增 `LoginResult/AuthUserData/CaptchaResult/UserListResult/GetUsersParams` 等 DTO 与返回类型。
- `directives`（`ObjectDirective<HTMLButtonElement, RoleType[]>`，`roles` 空值保护）、`plugins`、`main.ts` 类型化。

### 验证

- `pnpm build` 成功（Vite 7.3.8 + TS 配置，自动生成 `types/*.d.ts`）。
- `pnpm lint` 退出码 0（修复 `formRules` 中 `&&` 表达式语句告警）。
- `pnpm type-check` 暂为 152 个错误（预期）：hooks / stores / router / SFC 尚未类型化，步骤 3、4 处理。

## 步骤 3–4：hooks / stores / router 与全部 Vue SFC 类型化（2026-11-25）

> 说明：步骤 3 与步骤 4 在同一次改造中连续完成（类型检查需要两者一起收敛），合并为一次提交。

### hooks

- `countdown`：`timer` 使用 `ReturnType<typeof setTimeout>`，所有函数标注返回类型。
- `formRules`：基于 naive-ui `FormItemRule` 定义选项接口（`BaseRuleOptions / PatternRuleOptions / ConfirmPasswordRuleOptions / RuleMessages`），规则返回 `FormItemRule[]`，validator 参数收窄（验证码为 `string[]`）。
- `permission`：`RoleType[]` 收窄，`roles` 空值保护。
- `svgIcon` / `svgIconRender`：`Component` 类型参数，导出 `SvgIconVNodeConfig / SvgIconVNodeFactory`。

### stores

- `setupStore(app: App)`、`resetSetupStore(context: PiniaPluginContext)`。
- `auth`：`AuthUser` 响应式用户 + `LoginPayload`，setup 返回类型显式声明（避免 `useAuthStore` 自引用造成的循环推断）。
- `route`：`RouteRecordRaw[]`、`Ref<Menu[]>`，动态路由添加/重置与 `redirectFormLogin` 查询参数收窄。
- `shared`：`hasPermission/filterAsyncRoutes/genMenus` 基于 `RouteRecordRaw` 与 `Menu` 类型，保留原有过滤行为（叶子节点 `children === undefined`）。

### router

- `router/index`、`constants`、`guard/*`、`routes/*` 全部标注 `Router / RouteRecordRaw` 类型；`RouteMeta` 来自 `types/router.d.ts` 的声明合并。
- 权限守卫：`router.push({ ...to, replace: true })` 断言为 `RouteLocationRaw`，角色列表空值兜底。

### Vue SFC（41 个）

- 统一 `<script setup lang="ts">`，全部组件完成类型化：
  - props/emits 使用类型式宏（`withDefaults(defineProps<...>())`、`defineEmits<{...}>()`）；`UserSearch` 使用 `defineModel<UserParams>('params')`。
  - 模板引用统一 `useTemplateRef<FormInst>()` / `useTemplateRef<{ submit(): Promise<void> }>()`。
  - `User` 表单/搜索/列表：`User | null`、`OperationTypeValue`、`DataTableColumns<User>`、`DataTableRowState`、`DataTableRowKey[]`、`PaginationConfig`。
  - 布局：`MenuOption[]`（Sider）、`DropdownOption[]`（Header）、Breadcrumb 下拉项映射为 `DropdownOption[]`（修复原下拉项缺少 `label` 导致文字为空的问题）。
  - 简单页面仅补充 `lang="ts"` 与必要类型。

### 顺带修复（类型化过程中暴露）

- Breadcrumb 下拉菜单补充 `label` 与图标渲染。
- 权限指令 / `usePermission` 在 `roles` 为 `null` 时不再抛错。
- `DataTablePaginationBasicConfig.suffix` 对齐 naive-ui 的 `RenderPrefix` 参数（`itemCount: number | undefined`）。
- 表单校验 `validate(null, filter)` 改为类型安全的 `validate(undefined, filter)`。

### 验证

- `pnpm type-check`：**0 错误**（solution 构建同时检查 app 与 node 配置）。
- `pnpm lint`：退出码 0。
- `pnpm build`：成功。

## 步骤 5：构建接入类型检查、文档与最终回归（2026-11-25）

### 变更

- `package.json`：
  - `build` 改为 `vue-tsc --build && vite build`（构建前强制类型检查）；
  - 新增 `build:only: "vite build"`（仅构建，供 CI/快速调试使用）。
- `README.md` 重写：
  - 环境要求（Node `^22.13.0 || >=24`、pnpm 12+）；
  - TypeScript 说明：tsconfig 三件套、`env.d.ts`、`types/` 生成物、`jsconfig.json` 定位、编码约定；
  - 脚本说明（dev / build / type-check / lint / format / server / ver）。
- 完整性检查：`pnpm exec prettier --check src/` 通过。

### 最终验证（全部通过）

| 检查 | 结果 |
| --- | --- |
| `pnpm type-check` | 0 错误 |
| `pnpm lint` | 退出码 0 |
| `pnpm build`（含类型检查） | 成功，`dist/release`、`dist/report.html` 正常 |
| `pnpm dev` | 启动正常；99 个 `src` 模块经 Vite 转换全部 200；`/`、`/login/password`、`/manage/user` 均 200 |
| `pnpm server`（json-server） | `/users?_page&_per_page&_sort` 分页/排序、`/login/*`、`/authUser/*`、`/captcha/*` 接口正常 |
| `prettier --check src/` | 通过 |

## 步骤 6：升级 Vite 8 / vue-router 5 / pinia 4（2026-11-25）

> 本机 Node 已切换至 v24.20.0，满足 Vite 8 的运行要求。

### 依赖变更

- `vite` `^7.3.8` → `^8.3.8`（基于 Rolldown + Oxc；默认浏览器 target 更新、CSS 默认使用 Lightning CSS 压缩）。
- `vue-router` `^4.6.5` → `^5.5.1`：按官方迁移文档，不使用文件式路由时 v4 → v5 无破坏性变更，本次未改动业务代码。
- `pinia` `^3.0.4` → `^4.1.0`：v4 为 ESM-only，官方要求手动安装运行时 peer `@vue/devtools-api`。
- 新增 dependencies：`@vue/devtools-api ^8.2.1`（pinia 4 的 peer；与已移除的 `vite-plugin-vue-devtools` 插件无关）。
- 移除 `@rollup/plugin-terser`，新增 devDependency `terser ^5.51.4`（Vite 8 通过 `build.minify: 'terser'` 使用，保持原有“移除 `console.*`、保留 `console.debug/error`”的行为）。
- Vite 8 自身 engines 为 `^20.19.0 || >=22.12.0`；项目 engines 保持 `^22.13.0 || >=24`。

### 构建配置适配（Vite 8 / Rolldown）

- `build.rollupOptions` → `build.rolldownOptions`（后者在 Vite 8 中已属 deprecated 别名）。
- object 形式的 `output.manualChunks` 在 Vite 8/Rolldown 中已移除 → 改用 `output.codeSplitting.groups`（`vue`、`naive-ui` 两个分组，`priority: 10`），产物仍为独立分包。
- Rollup 插件链中的 terser 移除 → 改为 Vite 原生 `build.minify: 'terser'` + `build.terserOptions.compress`（`drop_debugger` + `pure_funcs`）。
- 为兼容 Vite 未来的 native config loader：`vite.config.ts` / `build/plugins/index.ts` 内部 import 补充显式 `.ts` 扩展名，`package.json` 导入使用 `with { type: 'json' }`。

### 验证（全部通过）

| 检查 | 结果 |
| --- | --- |
| `pnpm type-check` | 0 错误（Vite 8 配置类型 + vue-router 5 / pinia 4 类型均通过） |
| `pnpm lint` | 退出码 0 |
| `pnpm build:only` | 成功（约 6.3s）；`vue` / `naive-ui` 独立 chunk、HTML 注入 release/title、CSS 命名正常、`console.log` 已被移除 |
| `pnpm dev`（Vite 8.3.8） | 监听 3000；99 个 `src` 模块全部转换 200；`/`、`/login/password`、`/manage/user` 均 200 |
| `pnpm server`（json-server） | `/users` 分页/排序、`/login/*`、`/authUser/*`、`/captcha/*` 正常 |

### 备注

- 未引入 E2E/单元测试框架；浏览器端交互（登录、权限切换、用户 CRUD）建议手动点检一次。项目已通过「dev 全模块编译 + 生产构建 + Mock API」三重冒烟。

## 改造完成总结

- 全量源码（57 个 `src/*.ts` + 41 个 SFC）与构建配置均为 TypeScript；`pnpm build`、`pnpm type-check` 全绿。
- 依赖升级到当前主流版本：Vite 8.3（Rolldown）、Vue Router 5.5、Pinia 4.1、Vue 3.5、TypeScript 6、ESLint 10；移除 `vite-plugin-vue-devtools`，ESLint 使用 `withVueTs`。
- `jsconfig.json` 按要求保留；自动导入声明与全局类型集中在 `types/`、`env.d.ts`。
