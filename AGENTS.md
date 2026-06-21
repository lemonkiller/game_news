# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 150+ 数据源，GB 四色绿风格。

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
5. **更新前端映射** -- 在 `src/App.tsx` 中更新 `LANG_MAP`（新闻源）、`SOCIAL_SOURCE_NAMES` 和 `SOCIAL_PLATFORM`（社交源）
6. **验证** -- `npm run fetch` 抓取数据 + `npm run build` 确认构建通过 + `npx tsc --noEmit` 类型检查
7. **本地预览** -- `npm run dev` 启动 Vite dev server，看效果
8. **提交推送** -- 切到 `feat/xxx` 分支，`git add` + `git commit` + `git push`
9. **合并后操作** -- 合并 master 后需检查 `link-sources.ts` 是否在 `index.ts` 的 `allSources` 中注册

## 布局说明

导航栏三个标签：新闻 / 社交 / 网址。三个标签的数据完全独立，一条内容只出现在一个标签中。

| 标签 | 布局方式 | 数据源类型 |
|------|---------|-----------|
| 新闻 | 左侧语言筛选 + 右侧单列列表，按时间倒序 | 传统 RSS/博客/媒体，125 个源，845 条 |
| 社交 | 左侧平台筛选 + 右侧单列列表，按时间倒序 | 论坛/社区/社交平台 API，25 个源，335 条 |
| 网址 | 左侧分类导航 + 右侧按分类分组链接 | 无 RSS 的静态链接索引，233 个 |

- 所有标签共用同一套 `news-item` 样式，保持字体/行高/间距一致
- 新闻/社交标签条目显示：来源名 | 标题 | 时间
- 网址标签条目显示：名称 | 描述 | 域名

## 分类体系

### 新闻标签（125 个 RSS/博客源）

| 语言 | 源数 | 条数 |
|------|------|------|
| 中文 | 14 | 105 |
| English | 96 | 570 |
| 日本語 | 15 | 170 |
| **合计** | **125** | **845** |

侧边栏按语言筛选：全部（150 条）/ 中文（50 条）/ English（50 条）/ 日本語（50 条）

### 社交标签（25 个论坛/社区/社交源）

| 平台 | 条数 | 包含源 |
|------|------|--------|
| Zenn | 103 | 11 个 Zenn 标签（日本技术博客社区） |
| Hacker News | 70 | 原 HN + 新增 2 个 HN 社交源 |
| Lemmy | 50 | gamedev + godot 联邦讨论社区 |
| Mastodon | 40 | gamedev.place 实例实时动态 |
| GitHub | 38 | 游戏开发趋势 + Godot/Bevy/Flax Release |
| Qiita | 24 | 6 个 Qiita 标签（日本技术百科社区） |
| 论坛 | 10 | ResetEra |
| Reddit/Bluesky | 0 | 被墙但 GH Actions 上可用 |
| **合计** | **335** | **25 个源** |

侧边栏按平台筛选：全部（150 条）/ 各平台名（50 条）。没有数据的平台不显示在侧边栏中。

### 网址标签（233 个链接，12 个分类）

社区(52)、博客(34)、游戏框架/引擎(30)、游戏设计(25)、编程开发(20)、叙事/关卡/UI(16)、新闻(14)、开发工具(14)、美术工具(14)、素材资源(7)、音频工具(5)、其他(2)

侧边栏点击分类名，右侧滚动到对应位置。

## 数据隔离逻辑（src/App.tsx）

```
news (recentNews)    = 所有源 - SOCIAL_SOURCE_NAMES 中的源 - 开发工具链接
social (socialNews)  = 仅 SOCIAL_SOURCE_NAMES 中的源
links                = 仅开发工具链接源（按分类分组渲染）
```

新增社交源时，需在 `SOCIAL_SOURCE_NAMES` Set 中添加源名，并在 `SOCIAL_PLATFORM` Record 中映射到平台分组。

## 源文件结构

```
scripts/sources/
  index.ts            ← 统一注册所有源到 allSources
  link-sources.ts     ← 网址静态链接（name 固定为 "开发工具链接"）
  social/             ← 社交/社区源
    index.ts          ← 导出 socialSources 数组
    hackernews.ts     ← HN Algolia 公开 API
    reddit.ts         ← Reddit JSON API（GH Actions 可用）
    github.ts         ← GitHub 搜索 + Releases API
    mastodon.ts       ← Mastodon 公开时间线
    bluesky.ts        ← Bluesky 公开搜索 API
    lemmy.ts          ← Lemmy 联邦讨论 API
  *.ts                ← 其他 120+ 个传统 RSS 源文件
```

## 数据源规范

每个源文件必须：

- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja）
- fetch 返回 `NewsItem[]`，RSS 源最多 5 条，社交 API 源建议 25-50 条
- 单源超时 10 秒（社交 API 源可放宽到 15 秒），失败不影响其他源
- `link-sources.ts` 作为静态源返回 `LinkEntry[]`，需注册到 `index.ts` 的 `allSources`
- 网址链接源（name 为 "开发工具链接"）只出现在"网址"标签下
- 社交源放在 `scripts/sources/social/` 目录下，在 `social/index.ts` 中统一导出
- 新增 RSS 源：在 `src/App.tsx` 的 `LANG_MAP` 注册、在 `data/news.json` 中留空后通过 fetch 自动填充
- 新增社交源：在 `src/App.tsx` 的 `SOCIAL_SOURCE_NAMES` 和 `SOCIAL_PLATFORM` 注册
- 添加无 RSS 的网站/工具/社区时，加入 `link-sources.ts` 对应分类
- **lang 字段注意事项**：所有源必须使用 `"zh"`/`"en"`/`"ja"` 之一，不要用 `"community"`

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

### 完全不可达

- Ogre3D（RSS 彻底死亡）
- NVIDIA Unreal Engine（RSS 彻底死亡）

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

所有 UI 字符串集中在 `src/i18n/index.ts`。

### 新增语言支持

要新增第四种语言（如韩语 `ko`）：

1. 在 `src/i18n/index.ts` 中 `UiLang` 类型加入 `"ko"`
2. 在 `detectLanguage()` 中添加 `nav.startsWith("ko")` 判断
3. 在所有 `Record<UiLang, ...>` 对象中添加 `ko` 条目
4. 更新 `TAB_LABELS`（需加 social 键）、`TAB_TIPS`、`NAV_TITLE`、`NAV_SUBTITLE_PREFIX` 等

## 常见问题

- **Reddit**：从中国网络不可达，但在 GH Actions 中可正常抓取（社交标签源）
- **Cloudflare 防护**：部分源（Bluesky 等）被 Cloudflare 挡，本地和 GH Actions 都可能 403
- **GitHub API 频率限制**：未认证请求每小时 60 次，GH Actions 中内置认证可达 5000 次
- **Twitter/X**：无免费公开 API，已放弃接入
- **Steam API**：已移除 Steam 标签（API 间歇不可达，无法稳定抓取）
- **中文网络屏蔽**：部分 Google 系源和 GFW 墙外站点本地不可达，依赖 GitHub Actions
- **Substack**：Substack 博客使用 `/feed` 后缀，部分域名从国内网络不可达，依赖 GH Actions
- **GitHub 分支保护**：主分支有保护，推送到 `feat/xxx` 分支再开 PR 合并
- **Git 推送超时**：国内网络间歇性阻断 GitHub，可使用 `GIT_HTTP_TIMEOUT=3` 环境变量加速失败重试
- **npm run fetch 超时**：150+ 源中有大量不可达，本地抓取可能超时。可用 node 脚本单独抓取特定源更新数据
- **抓取失败保留旧数据**：fetch-all.ts 实现了读上次 news.json、若新数据为空或抓取报错则保留旧数据不覆盖的兜底逻辑
- **新装依赖**：更新使用外部库的源时，需运行 `npm install` 安装对应包
- **npx tsc --noEmit**：需确保 `tsconfig.json` 的 `include` 包含 `data` 目录

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
