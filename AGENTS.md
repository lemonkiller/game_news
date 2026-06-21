# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 140+ 数据源，GB 四色绿风格。

## 沟通规范

- 用中文交流
- 不使用表情符号
- 让用户做方案选择时，假设零基础，说得浅显易懂
- 做执行、提建议，不做决策

## 开发流程

1. **搜索可用源** -- 使用 webaio 并行搜索中英日三语游戏开发/设计相关网站、博客、RSS
2. **测试 RSS** -- 用 Node.js fetch 测试每个候选源的可用性，记录结果
3. **创建源文件** -- 在 `scripts/sources/` 下新建 `.ts` 文件，实现 `NewsSource` 接口
4. **注册源** -- 在 `scripts/sources/index.ts` 中 import 并加入 `allSources` 数组（注意 linkSource 也需注册）
5. **更新前端映射** -- 在 `src/App.tsx` 的 `LANG_MAP` 中添加语言分类映射；新增的源名必须在 `LANG_MAP` 中注册，否则不会显示
6. **验证** -- `npm run fetch` 抓取数据 + `npm run build` 确认构建通过 + `npx tsc --noEmit` 类型检查
7. **本地预览** -- `npm run dev` 启动 Vite dev server，看效果
8. **提交推送** -- 切到 `feat/xxx` 分支，`git add` + `git commit` + `git push`
9. **合并后操作** -- 合并 master 后需检查 `link-sources.ts` 是否在 `index.ts` 的 `allSources` 中注册

## 布局说明

| 标签 | 布局方式 | 数据源 |
|------|---------|--------|
| 新闻 | 左侧语言筛选 + 右侧单列列表，按时间倒序 | 全部源合并，仅显示 1 个月内，全部=150条/单语言=50条 |
| 网址 | 左侧分类导航 + 右侧按分类分组的链接列表 | `link-sources.ts` 静态链接 |

- 新闻页左侧语言筛选：全部 / 中文 / English / 日本語，点击切换内容
- 网址页左侧分类导航：点击跳转到对应分类位置（无滚动条，约 12 个分类）
- 新闻条目格式：来源 | 标题 | 时间
- 网址条目格式：名称 | 描述 | 域名
- 导航栏仅显示两个标签：新闻 / 网址，切换时名言随机变化

## 分类体系

| 标签 | 筛选 | 说明 |
|------|------|------|
| 新闻（全部） | 语言 + 时间 | 所有语言合并，1月内，最多 150 条 |
| 新闻（中文） | 语言 + 时间 | 仅中文源，1月内，最多 50 条 |
| 新闻（English） | 语言 + 时间 | 仅英文源，1月内，最多 50 条 |
| 新闻（日本語） | 语言 + 时间 | 仅日文源，1月内，最多 50 条 |
| 网址 | 分类 | 静态链接，按分类分组展示 |

## 网址链接分类（link-sources.ts）

按以下 12 个分类组织，侧边栏无需滚动：

社区、博客、游戏框架/引擎、游戏设计、编程开发、叙事/关卡/UI、新闻、开发工具、美术工具、素材资源、音频工具、其他

## 数据源规范

每个源文件必须：

- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja）
- fetch 返回 `NewsItem[]`，RSS 源建议最多 5 条，linkSource 为静态全量
- 单源超时 10 秒，失败不影响其他源
- `link-sources.ts` 作为静态源返回 `LinkEntry[]`，需注册到 `index.ts` 的 `allSources`
- 网址链接源（linkSource 的 name 为 "开发工具链接"）只出现在"网址"标签下，不得出现在信息流中
- 新添 RSS 源需同时在 `src/App.tsx` 的 `LANG_MAP` 注册、在 `data/news.json` 中留空后会通过 fetch 自动填充
- 添加无 RSS 的网站/工具/社区时，加入 `link-sources.ts` 对应分类
- **lang 字段注意事项**：
  - community.ts 中的源过去使用 `lang: "community"`，现在必须改为 `lang: "zh"` / `"en"` / `"ja"` 之一，否则不会被 `LANG_MAP` 匹配
  - 参见 zennGamedev 改为 `lang: "ja"` 的先例

## 名言系统（三语版）

`scripts/utils/quotes.ts` 存放 99 条游戏开发/设计名言。

### 数据结构

每条名言包含三个语言版本：

```typescript
export interface Quote {
  zh: string;  // 中文翻译
  en: string;  // 英文原文
  ja: string;  // 日文翻译
  author: string;
  source?: string; // 来源/作品（可选）
}
```

### 新增名言的步骤

1. 打开 `scripts/utils/quotes.ts`
2. 在 `quotes` 数组中添加新条目，填写三个语言字段
3. 尽可能找到可靠的英文原文（而非从中文回译）
4. 日文翻译参考日本游戏开发社区的惯用表述
5. 确认 author 包含中英双语（如 "宫本茂（Shigeru Miyamoto）"）
6. 运行 `npx tsc --noEmit` 确认类型正确

### 显示逻辑

- 每次切换标签页时，随机选取一条显示在导航栏右侧
- 根据浏览器检测到的 UI 语言自动显示对应语言版本
- 鼠标悬停名言显示作者和来源

## 字体说明

从 Press Start 2P / VT323 像素字体改为系统字体栈，确保中日英混排大小一致：

```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC",
             "Microsoft YaHei", "Hiragino Sans GB", "Noto Sans JP", sans-serif;
```

## 黑名单（不要再添加的源）

以下源已被移除或测试过但明确不适合本聚合站，记录以避免重复添加：

### 前端/网页开发类

- freeCodeCamp（全栈/前端教程，非游戏开发）
- Smashing Magazine（前端/网页设计杂志）
- CSS-Tricks（前端/CSS 技术）

### Dev.to 平台

所有 dev.to 标签源全部移除。理由：内容质量偏低，社区内容混杂，不适合聚合展示。
涉及的标签：gameengine / godot / unrealengine / unity / rendering / vulkan / webgpu / opengl
连带移除：Game Dev Digest（基于 dev.to 标签）

### AI/大模型工具（不直接相关游戏开发）

- Ollama（本地 LLM 运行工具）
- Anthropic Engineering Blog（Claude 工程博客）

## 多语言本地化系统（i18n）

站点 UI 根据浏览器语言自动切换（zh / en / ja），无需手动选择。

### 架构

```
src/i18n/index.ts      ← 语言检测 + 所有 UI 字符串
src/components/
  Navbar.tsx           ← 从 i18n 模块读取标题/标签/提示
src/App.tsx            ← 根组件，调用 detectLanguage() 并向下传递
```

### 工作原理

1. `detectLanguage()` 读取 `navigator.language`，匹配 `zh` → 中文，`ja` → 日文，其他 → 英文（默认）
2. 结果作为 `uiLang` 属性传递给 `Navbar`
3. 各组件根据 `uiLang` 从对应的语言映射中取字符串
4. 标签名、导航标题、"更新于"前缀、时间格式全部跟随 `uiLang`
5. 名言根据 `uiLang` 自动切换 `q.zh` / `q.en` / `q.ja` 字段

### 修改 UI 字符串的位置

所有 UI 字符串集中在 `src/i18n/index.ts`：

```typescript
export const NAV_TITLE: Record<UiLang, string> = { zh: "游戏新闻", en: "Game News", ja: "ゲームニュース" };
export const TAB_LABELS: Record<UiLang, Record<string, string>> = { ... };
export const TAB_TIPS: Record<UiLang, Record<string, string>> = { ... };
```

需要改动 UI 文案时只改这个文件即可。

### 新增语言支持

要新增第四种语言（如韩语 `ko`）：

1. 在 `src/i18n/index.ts` 中 `UiLang` 类型加入 `"ko"`
2. 在 `detectLanguage()` 中添加 `nav.startsWith("ko")` 判断
3. 在所有 `Record<UiLang, ...>` 对象中添加 `ko` 条目
4. 更新 `TAB_LABELS`、`TAB_TIPS`、`NAV_TITLE`、`NAV_SUBTITLE_PREFIX` 等

## 常见问题

- **Reddit**：从中国网络不可达，已从信息流中移除，改为网址标签下的静态链接
- **Cloudflare 防护**：部分源（Game Developer、Unreal Blog）被 Cloudflare 挡，本地和 GH Actions 都可能 403，暂时跳过
- **Steam API**：已移除 Steam 标签（API 间歇不可达，无法稳定抓取）
- **中文网络屏蔽**：部分 Google 系源（Blogger）和 GFW 墙外站点本地不可达，依赖 GitHub Actions
- **Substack**：Substack 博客使用 `/feed` 后缀，部分 Substack 域名从国内网络不可达，依赖 GH Actions
- **GitHub 分支保护**：主分支有保护，推送到 `feat/xxx` 分支再开 PR 合并
- **Git 推送超时**：国内网络间歇性阻断 GitHub，可使用 `GIT_HTTP_TIMEOUT=3` 环境变量加速失败重试
- **npm run fetch 超时**：140+ 源中有大量不可达，本地抓取可能超时。可用 node 脚本单独抓取特定源更新数据
- **抓取失败保留旧数据**：fetch-all.ts 实现了读上次 news.json、若新数据为空或抓取报错则保留旧数据不覆盖的兜底逻辑
- **新装依赖**：更新 `html-scraper.ts` 等使用外部库的源时，需运行 `npm install` 安装对应包
- **npx tsc --noEmit**：需确保 `tsconfig.json` 的 `include` 包含 `data` 目录
- **RSS 源的 lang 字段**：community.ts 中的源必须使用 `"zh"`/`"en"`/`"ja"`，不要用 `"community"`

## 项目设置

项目级设置文件 `.pi/settings.json` 用于配置 pi 的自动上下文压缩行为：

```json
{
  "compaction": {
    "enabled": true,
    "reserveTokens": 700000,
    "keepRecentTokens": 20000
  }
}
```

以 1M 窗口模型为例，`700000` 预留会在上下文超过 **300K** 时自动触发压缩。
