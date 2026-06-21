# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 167+ 数据源，GB 四色绿风格。

## 沟通规范

- 用中文交流
- 不使用表情符号
- 让用户做方案选择时，假设零基础，说得浅显易懂
- 做执行、提建议，不做决策

## 开发流程

1. **搜索可用源** -- 使用 webaio 并行搜索中英日三语游戏开发/设计相关网站、博客、RSS
2. **测试 RSS** -- 用 Node.js fetch 测试每个候选源的可用性，记录结果
3. **创建源文件** -- 在 `scripts/sources/` 下新建 `.ts` 文件，实现 `NewsSource` 接口（社交源放 `social/` 目录）
4. **注册源** -- 在 `scripts/sources/index.ts` 中 import 并加入 `allSources` 数组（注意 linkSource 也需注册）；社交源在 `social/index.ts` 中导出 `socialSources` 数组
5. **更新前端映射** --
   - 新闻源：在 `src/App.tsx` 的 `LANG_MAP` 中注册语言分类
   - 社交源：在 `src/App.tsx` 的 `SOCIAL_SOURCE_NAMES` 和 `SOCIAL_PLATFORM` 中同时注册
   - 新增的源名必须在对应映射中注册，否则不会显示
6. **验证** -- `npm run fetch` 抓取数据 + `npm run build` 确认构建通过 + `npx tsc --noEmit` 类型检查
7. **本地预览** -- `npm run dev` 启动 Vite dev server，看效果
8. **提交推送** -- 切到 `feat/xxx` 分支，`git add` + `git commit` + `git push`
9. **合并后操作** -- 合并 master 后需检查 `link-sources.ts` 是否在 `index.ts` 的 `allSources` 中注册
10. **更新信息源列表** -- 每次新增/修改/删除信息源后，运行 `npm run fetch` 刷新数据，然后执行以下命令更新 `sources-list.md`：

    ```bash
    node scripts/update-sources-list.cjs
    ```

    将修改提交到仓库

## 信息源列表文件

`sources-list.md` 是项目唯一的信息源登记册，记录所有新闻/社交/网址信息源的元数据。每次新增、修改或删除信息源时，必须同步更新此文件。

### 字段说明

| 字段 | 说明 |
|------|------|
| 名称 | 信息源展示名，对应 `name` 字段 |
| 类型 | 新闻（RSS/博客）或 社交（API 论坛/社区） |
| 语言 | zh / en / ja |
| 文件 | 对应的源文件路径 |
| 条数 | 最近一次抓取的条目数（0 表示无数据） |
| 最近更新 | 最近一条内容的发布日期 |

### 更新时间点

- 新增 RSS/API 源 → 创建 .ts 文件后，更新列表
- 删除源 → 删除 .ts 文件后，更新列表
- 修改源名称/URL/语言 → 修改后，更新列表
- 重新抓取数据后 → 运行列表更新脚本

## 新增源的标准流程

用户发来一个网站链接后，按以下步骤判定和处理：

### 第一步：判断是否和游戏制作相关

- **相关**：游戏开发/设计/发行/引擎/工具/社区/行业分析等
- **不相关**：纯游戏评测/攻略/直播、泛科技/前端开发、大模型 AI 工具（不直接用于游戏开发）、纯硬件/电竞
- 不确定时先问用户，不要自己判断

### 第二步：判断有无 RSS 或 API

| 条件 | 说明 | 归入标签 | 需注册位置 |
|------|------|---------|-----------|
| 有 RSS，能直接抓取 | 标准 RSS feed | **新闻** | `scripts/sources/*.ts` + `LANG_MAP` |
| 有开放 API（HN/Reddit/Mastodon/Lemmy/GitHub/Bluesky 等） | 无需 Key 即可访问 | **社交** | `social/*.ts` + `SOCIAL_SOURCE_NAMES` + `SOCIAL_PLATFORM` |
| 有 RSS 但有 Cloudflare/登录墙 | 本地不可达但 GH Actions 可达 | **新闻**，加注释说明 | 同上，测试加 `--proxy http://127.0.0.1:1226` |
| 无 RSS 也无 API | 页面可直接访问（或通过代理） | **网址** | `link-sources.ts` 下合适分类 |

测试方法：

- RSS：`curl -s --max-time 8 "<feed_url>" | head -200`
- API：`curl -s --max-time 8 "<api_url>" | head -200`
- 从中国网络不可达时，加上 `--proxy http://127.0.0.1:1226` 再试
- 两种都不可达，说明 GFW 墙外站点，依赖 GH Actions

### 第三步：根据判定结果执行

**归入新闻标签：**

1. 在 `scripts/sources/` 下新建 `.ts`，实现 `NewsSource` 接口
2. RSS 源用 `rss-parser.ts`，`fetch` 返回最多 5 条
3. 注册到 `scripts/sources/index.ts` 的 `allSources`
4. 在 `src/App.tsx` 的 `LANG_MAP` 中注册语言分类

**归入社交标签：**

1. 在 `scripts/sources/social/` 下新建 `.ts`，实现 `NewsSource` 接口
2. API 源建议返回 10-25 条，单源超时可放宽到 15 秒
3. 注册到 `scripts/sources/social/index.ts` 的 `socialSources` 数组
4. 在 `src/App.tsx` 的 `SOCIAL_SOURCE_NAMES`（Set）和 `SOCIAL_PLATFORM`（Record）中同时注册

**归入网址标签：**

1. 打开 `scripts/sources/link-sources.ts`
2. 在 `links` 数组中新建条目，填写 id/title/url/category/lang/desc
3. 选一个合适的现有分类（见上方「网址标签」分类表）。无法归入现有分类时，新增分类必须至少有 3 个条目，否则合并到**网站**分类

## 布局说明

导航栏三个标签：新闻 / 社交 / 网址。三个标签的数据完全独立，一条内容只出现在一个标签中。

| 标签 | 布局方式 | 数据源类型 |
|------|---------|-----------|
| 新闻 | 左侧语言筛选 + 右侧单列列表，按时间倒序 | 传统 RSS/博客/媒体，126 个源，845 条 |
| 社交 | 左侧平台筛选 + 右侧单列列表，按时间倒序 | 论坛/社区/社交平台 API，41 个源，375 条 |
| 网址 | 左侧分类导航 + 右侧按分类分组链接 | 无 RSS 的静态链接索引，214 个 |

- 所有标签共用同一套样式，保持字体/行高/间距一致
- 新闻/社交标签条目显示：来源名 | 标题 | 时间
- 网址标签条目显示：名称 | 描述 | 域名

## 分类体系

### 新闻标签（126 个 RSS/博客源，845 条）

侧边栏按语言筛选：全部（最多 150 条）/ 中文 / English / 日本語（各 50 条）

| 语言 | 源数 | 条数 | 代表性源 |
|------|------|------|---------|
| English | 约 106 | ~650 | GamesIndustry.biz、Unity Blog、Godot Blog、Game Developer、80 Level、GameFromScratch 等 |
| 中文 | 约 12 | ~105 | 机核网、游戏陀螺、触乐、Indienova、GameLook、Necromanov、ManiaHero 等 |
| 日本語 | 约 8 | ~90 | ゲームメーカーズ、IndieGamesJapan、IGDA 日本、ARASHIYAMA 等 |

### 社交标签（41 个论坛/社区/社交平台源，375 条）

侧边栏按平台筛选：全部（最多 150 条）/ 各平台名（50 条）。没有数据的平台不显示。

| 平台 | 源数 | 条数 | 数据来源 |
|------|------|------|---------|
| Zenn | 11 | 103 | 日本技术博客社区（11 个标签） |
| **Lemmy** | **10** | **83** | programming.dev(4) + lemmy.world(4) + sh.itjust.works(2) 联邦社区 |
| Hacker News | 3 | 45 | Algolia 公开 API（游戏开发 + Show HN + 原 HN） |
| GitHub | 4 | 45 | GitHub API 搜索 + Releases（Godot/Bevy/Flax） |
| Mastodon | 1 | 40 | gamedev.place 实例实时公开时间线 |
| Qiita | 6 | 24 | 日本技术百科社区（6 个标签） |
| 论坛 | 4 | 10 | ResetEra + Reddit(3) |
| Bluesky | 1 | 0 | 被墙，GH Actions 中可用 |

注：Reddit/Bluesky 从中国网络不可达，数据量为 0，但 GH Actions 上可正常抓取。

### Lemmy 联邦社区详情

| 源名 | 实例 | 社区 |
|------|------|------|
| Lemmy 游戏开发 | programming.dev | c/gamedev |
| Lemmy Godot | programming.dev | c/godot |
| Lemmy Unity | programming.dev | c/unity |
| Lemmy 游戏设计 | programming.dev | c/game_design |
| Lemmy 游戏开发（lemmy.world） | lemmy.world | c/gamedev |
| Lemmy Godot（lemmy.world） | lemmy.world | c/godot |
| Lemmy Unreal Engine | lemmy.world | c/unrealengine |
| Lemmy 独立游戏 | lemmy.world | c/indiegaming |
| Lemmy 游戏开发（sh.itjust.works） | sh.itjust.works | c/gamedev |
| Lemmy Unreal Engine（sh.itjust.works） | sh.itjust.works | c/unrealengine |

### 网址标签（203 个链接，14 个分类）

侧边栏点击分类名，右侧滚动到对应位置。

| 分类 | 数量 | 说明 |
|------|------|------|
| x.com | 34 | 游戏开发/设计名人 Twitter/X 账号，按 6 组分类 |
| 游戏框架/引擎 | 23 | 引擎项目官网（Godot/Unity/Unreal/Defold/MonoGame 等） |
| YouTube | 22 | 游戏开发/设计优质 YouTube 频道 |
| 知乎专栏 | 19 | 游戏开发/设计知乎专栏合集 |
| Reddit | 16 | 游戏开发相关子论坛合集 |
| 游戏设计 | 17 | 游戏设计分析/理论/教程网站 |
| 网站 | 18 | 游戏开发综合社区/新闻站（原社区+新闻+GDC 合并） |
| B站 | 12 | 游戏开发/设计 B 站 UP 主 |
| 叙事/关卡/UI | 13 | 叙事设计/关卡设计/UIUX 资源与工具 |
| 美术工具 | 11 | Aseprite/Blender/Krita 等美术工具及官方博客 |
| 开发工具 | 13 | 工具合集、CI/CD、编辑器、Awesome 列表 |
| 编程开发 | 7 | 游戏编程/渲染/AI/公司技术博客 |
| 素材资源 | 7 | 免费游戏素材站 |
| 音频工具 | 5 | BGM/SFX 工具与素材 |

## 数据隔离逻辑（src/App.tsx）

```
news (recentNews)    = 所有源 - SOCIAL_SOURCE_NAMES 中的源 - 开发工具链接
social (socialNews)  = 仅 SOCIAL_SOURCE_NAMES 中的源
links                = 仅开发工具链接源（按分类分组渲染）
```

- `SOCIAL_SOURCE_NAMES`（Set）：标记哪些源属于社交标签
- `SOCIAL_PLATFORM`（Record）：将社交源名映射到平台分组（用于侧边栏筛选）
- `LANG_MAP`（Record）：将新闻源名映射到语言分类（zh/en/ja，默认 en）
- 新增社交源时，须同时在 `SOCIAL_SOURCE_NAMES` 和 `SOCIAL_PLATFORM` 中注册
- 新增新闻源时，在 `LANG_MAP` 中注册语言分类

## 源文件结构

```
scripts/sources/
  index.ts            ← 统一注册所有源到 allSources，含 linkSource
  link-sources.ts     ← 网址静态链接（name 固定为 "开发工具链接"）
  social/
    index.ts          ← 导出 socialSources 数组
    hackernews.ts     ← HN Algolia 公开 API
    reddit.ts         ← Reddit JSON API（GH Actions 可用）
    github.ts         ← GitHub 搜索 + Releases API
    mastodon.ts       ← Mastodon 公开时间线
    bluesky.ts        ← Bluesky 公开搜索 API
    lemmy.ts          ← Lemmy 联邦讨论 API（多个实例/社区）
  *.ts                ← 其他 120+ 个传统 RSS 源文件
```

## 数据源规范

每个源文件必须：

- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja）
- fetch 返回 `NewsItem[]`，RSS 源最多 5 条，社交 API 源建议 10-25 条
- 单源超时 10 秒（社交 API 源可放宽到 15 秒），失败不影响其他源
- `link-sources.ts` 作为静态源返回 `LinkEntry[]`，需注册到 `index.ts` 的 `allSources`
- 网址链接源（name 为 "开发工具链接"）只出现在"网址"标签下
- 社交源放在 `scripts/sources/social/` 目录下，在 `social/index.ts` 中统一导出
- 新增 RSS 源：在 `src/App.tsx` 的 `LANG_MAP` 注册
- 新增社交源：在 `src/App.tsx` 的 `SOCIAL_SOURCE_NAMES` 和 `SOCIAL_PLATFORM` 注册
- 添加无 RSS 的网站/工具/社区时，加入 `link-sources.ts` 对应分类
- **lang 字段注意事项**：所有源必须使用 `"zh"`/`"en"`/`"ja"` 之一，不要用 `"community"`

## 名言系统（三语版）

`scripts/utils/quotes.ts` 存放 99 条游戏开发/设计名言。

### 数据结构

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

- **Reddit/Bluesky**：从中国网络不可达，但在 GH Actions 中可正常抓取（社交标签源）
- **Cloudflare 防护**：部分源被 Cloudflare 挡，本地和 GH Actions 都可能 403
- **GitHub API 频率限制**：未认证请求每小时 60 次，GH Actions 中内置认证可达 5000 次
- **Twitter/X**：无免费公开 API，已放弃接入，改为静态链接
- **Steam API**：已移除 Steam 标签（API 间歇不可达，无法稳定抓取）
- **中文网络屏蔽**：部分 Google 系源和 GFW 墙外站点本地不可达，依赖 GitHub Actions
- **Substack**：Substack 博客使用 `/feed` 后缀，部分域名从国内网络不可达，依赖 GH Actions
- **npm run fetch 超时**：167+ 源中有大量不可达，本地抓取可能超时
- **抓取失败保留旧数据**：fetch-all.ts 实现了读上次 news.json、若新数据为空或抓取报错则保留旧数据不覆盖的兜底逻辑
- **新装依赖**：更新使用外部库的源时，需运行 `npm install` 安装对应包
- **npx tsc --noEmit**：需确保 `tsconfig.json` 的 `include` 包含 `data` 目录
- **Lemmy API**：不同版本的 Lemmy 返回结构不同，最新版 `score`/`comments` 在 `post.counts` 下，`url` 在 `post` 下。已统一始终链接到讨论帖，外部链接在描述中标注

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
