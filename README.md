# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 166+ 数据源，纯静态零运维。

GB 经典四色绿风格，系统字体栈确保中日英混排一致。

三个完整标签：新闻（RSS/博客）、社交（论坛/社区/社交平台）、网址（静态工具链接）。

## 数据源一览

| 标签 | 源数 | 条数 | 数据类型 |
|------|------|------|---------|
| 新闻 | 126 个 | 845 条 | 传统 RSS、游戏媒体、引擎官方博客、个人博客 |
| 社交 | 41 个 | 375 条 | API 直连论坛/社交/社区平台 |
| 网址 | 214 个 | 214 条 | 无 RSS 的工具/引擎/资源/社区分类链接 |

完整列表见 `scripts/sources/` 目录。

## 布局

### 新闻标签

左侧语言筛选栏 + 右侧单列列表。筛选：全部（最多 150 条）/ 中文 / English / 日本語（各 50 条）。仅显示 1 月内内容。

| 语言 | 源数 | 代表性源 |
|------|------|---------|
| English | 约 106 | GamesIndustry.biz、Unity Blog、Godot Blog、Game Developer、80 Level 等 |
| 中文 | 约 12 | 机核网、游戏陀螺、触乐、Indienova、GameLook、Necromanov 等 |
| 日文 | 约 8 | ゲームメーカーズ、IndieGamesJapan、IGDA 日本、ARASHIYAMA 等 |

### 社交标签

左侧平台筛选栏 + 右侧单列列表。筛选：全部（最多 150 条）/ 各平台名（50 条）。数据来自各平台公开 API。

| 平台 | 源数 | 条数 | 数据来源 |
|------|------|------|---------|
| Zenn | 11 | 103 | 日本技术博客社区（11 个标签） |
| **Lemmy** | **10** | **83** | 3 个实例、6 个游戏开发社区 |
| Hacker News | 3 | 45 | Algolia 公开 API |
| GitHub | 4 | 45 | GitHub 搜索 + Releases |
| Mastodon | 1 | 40 | gamedev.place 实例 |
| Qiita | 6 | 24 | 日本技术百科社区（6 个标签） |
| 论坛 | 4 | 10 | ResetEra + Reddit |
| Bluesky | 1 | 0 | 被墙，GH Actions 中可用 |

没有数据的平台不显示在侧边栏中。

### 网址标签

左侧分类导航栏 + 右侧按分类分组的链接列表。每项含名称、描述、域名。

| 分类 | 数量 | 说明 |
|------|------|------|
| x.com | 34 | 游戏开发/设计名人 Twitter/X 账号（6 组） |
| 游戏框架/引擎 | 23 | 引擎项目官网（Godot/Unity/Unreal/Defold/MonoGame 等） |
| YouTube | 22 | 游戏开发/设计优质 YouTube 频道 |
| 知乎专栏 | 19 | 游戏开发/设计知乎专栏合集 |
| Reddit | 16 | 游戏开发相关子论坛合集 |
| 游戏设计 | 17 | 游戏设计分析/理论/教程网站 |
| 网站 | 18 | 游戏开发综合社区/新闻站（原社区+新闻+GDC 合并） |
| B站 | 12 | 游戏开发/设计 B 站 UP 主 |
| 叙事/关卡/UI | 13 | 叙事设计/关卡设计/UIUX 资源与工具 |
| 美术工具 | 11 | Aseprite/Blender/Krita 等 |
| 开发工具 | 13 | 工具合集、CI/CD、Awesome 列表 |
| 编程开发 | 7 | 游戏编程/渲染/AI/公司技术博客 |
| 素材资源 | 7 | 免费游戏素材站 |
| 音频工具 | 5 | BGM/SFX 工具与素材 |

## 本地化

站点 UI 根据浏览器语言自动切换（中文 / English / 日本語），无需手动选择。

| 组件 | 中文 | English | 日本語 |
|------|------|---------|--------|
| 导航标题 | 游戏新闻 | Game News | ゲームニュース |
| 新闻标签 | 新闻 | News | ニュース |
| 社交标签 | 社交 | Social | ソーシャル |
| 网址标签 | 网址 | Links | URL |
| "更新于" 前缀 | 更新于 | Updated | 更新 |

UI 字符串集中在 `src/i18n/index.ts`，修改文案只需改动这一个文件。

## 架构

### 数据流

```
scripts/sources/*.ts (RSS / API 抓取)
        |
        v
fetch-all.ts (所有源并行抓取，失败保留旧数据)
        |
        v
data/news.json (单一 JSON，供前端消费)
        |
        v
src/App.tsx (三个标签按 SOCIAL_SOURCE_NAMES 隔离)
  - news    = 传统 RSS/博客源（不在 SOCIAL_SOURCE_NAMES 中）
  - social  = 仅 SOCIAL_SOURCE_NAMES 中的源
  - links   = 仅开发工具链接源（通过 getLinksByCategory 直接读取 TS）
```

### 技术栈

- **数据抓取**：GitHub Actions 每 3 小时运行 TypeScript 抓取脚本（20 分钟超时）
- **前端**：Vite + React + TypeScript，系统字体栈
- **部署**：GitHub Pages，`actions/deploy-pages` 官方部署
- **配色**：Game Boy 经典四色绿 `#0F380F #306230 #8BAC0F #9BBC0F`
- **字体**：`-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "Microsoft YaHei", "Hiragino Sans GB", "Noto Sans JP", sans-serif`
- **社交 API**：Hacker News Algolia、Mastodon、Lemmy、GitHub 均为免费公开 API（无 Key 需求）

### 源文件结构

```
scripts/sources/
  index.ts            ← 统一注册所有源到 allSources
  link-sources.ts     ← 网址静态链接（203 条，14 个分类）
  social/
    index.ts          ← 导出 socialSources 数组
    hackernews.ts     HN Algolia
    reddit.ts         Reddit JSON
    github.ts         GitHub 搜索 + Releases
    mastodon.ts       Mastodon 公开时间线
    bluesky.ts        Bluesky 公开搜索
    lemmy.ts          Lemmy 联邦讨论（支持多个实例/社区）
  *.ts                ← 其他 120+ 个传统 RSS 源
```

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 抓取数据（所有 160+ 源一次性抓完，本地可能因网络超时）
npm run fetch

# 3. 启动开发服务器
npm run dev

# 4. 构建
npm run build

# 5. 类型检查
npx tsc --noEmit
```

注意：`npx tsc --noEmit` 需要 `data/news.json` 存在，因此必须在 `npm run fetch` 之后执行。

## 来源类型说明

| 类型 | 说明 | 配置位置 |
|------|------|---------|
| RSS 信息源 | 有 RSS 的新闻/博客，进入新闻标签 | `scripts/sources/*.ts`（social/ 和 link-sources.ts 除外） |
| 社交源 | API 直连论坛/社区平台，进入社交标签 | `scripts/sources/social/*.ts` |
| 网址链接 | 无 RSS 的网站/工具/社区，进入网址标签 | `scripts/sources/link-sources.ts` |
| 名言 | 游戏开发/设计名言，显示在导航栏 | `scripts/utils/quotes.ts` |

## 名言系统（三语版）

99 条游戏开发/设计名言，每条包含中英日三语：

```typescript
export interface Quote {
  zh: string;  // 中文翻译
  en: string;  // 英文原文
  ja: string;  // 日文翻译
  author: string;
  source?: string;
}
```

新增名言时须填写全部三个语言字段。

## 许可

MIT
