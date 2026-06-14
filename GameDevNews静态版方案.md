# GameDev News 静态版 -- 全套开发部署实施方案

> 基于 GitHub Pages + GitHub Actions 的游戏开发资讯聚合站
> 无需服务器，零运维成本，全自动化更新

---

## 一、架构总览

```
                         GitHub 生态（全免费）

  ┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
  │ GitHub        │     │ GitHub            │     │ GitHub        │
  │ Actions       │ ──→ │ Actions           │ ──→ │ Pages         │
  │ 定时触发      │     │ 抓取50+源        │     │ 托管静态文件  │
  │ (每30分钟)    │     │ 生成 data/news.json│   │ + 前端页面     │
  └──────────────┘     └──────────────────┘     └──────────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ gh-pages 分支  │
                         │ index.html     │
                         │ data/news.json │
                         │ assets/*       │
                         └──────────────┘
                                │
                                ▼
                       用户访问站点
```

### 数据流

```
[数据源]                         [抓取脚本]         [前端]
Game Developer RSS   ─┐
GamesIndustry.biz    ─┤
80 Level RSS         ─┤──→ fetch-all.ts ──→ data/news.json ──→ React 页面
Reddit r/gamedev     ─┤       (定时执行)       (静态 JSON)      (读取内嵌数据)
Indienova RSS        ─┤
Godot Blog RSS       ─┤
...                  ─┘
```

### 与传统方案对比

| 对比项 | NewsNow（原始） | GameDev News（本方案） |
|--------|---------------|----------------------|
| 后端 | Nitro 运行时服务器 | 无（构建时生成数据） |
| 数据获取 | 用户请求时实时抓取 | Actions 定时预抓取 |
| 部署平台 | Cloudflare Pages | GitHub Pages（纯静态） |
| 运维 | 需要配置 D1 数据库 | 零配置 |
| 实时性 | 秒级 | 延迟 30 分钟以内 |

### 语言切换设计

按语言分组，通过切换标签只显示对应语言的卡片列：

```
[ 全部 ] [ 中文 ] [ 英文 ] [ 日文 ]

选中

---

## 二、项目结构

```
gamedev-news/
├── .github/
│   └── workflows/
│       └── fetch-and-deploy.yml    # Actions 工作流
├── scripts/
│   ├── fetch-all.ts               # 主抓取脚本
│   ├── sources/                   # 各数据源（每个文件一个源）
│   │   ├── game-developer.ts
│   │   ├── games-industry.ts
│   │   ├── 80-level.ts
│   │   ├── reddit-gamedev.ts
│   │   ├── indienova.ts
│   │   ├── godot-blog.ts
│   │   ├── steam-top.ts
│   │   └── index.ts              # 汇总所有源
│   └── utils/
│       ├── types.ts               # 类型定义
│       ├── fetcher.ts             # HTTP 请求封装
│       └── rss-parser.ts          # RSS/XML 解析
├── src/                           # 前端 React 应用
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── CardColumn.tsx
│   │   ├── NewsCard.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── styles/
│   │   └── global.css
│   └── vite-env.d.ts
├── public/
│   └── icons/                     # 各平台图标
├── data/                          # 抓取生成的数据（gitignore）
│   └── news.json
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 三、各层详细设计

### 3.1 数据层 -- 抓取脚本

**统一类型**（`scripts/utils/types.ts`）：

```typescript
export interface NewsItem {
  id: string
  title: string
  url: string
  extra?: {
    info?: string    // 热度/时间等辅助信息
    hover?: string   // 鼠标悬停预览文本
  }
}

export interface NewsSource {
  name: string            // 列标题
  icon: string            // 图标文件名
  fetch(): Promise<NewsItem[]>
}
```

**源文件示例**（`scripts/sources/game-developer.ts`）：

```typescript
import { parseRSS } from '../utils/rss-parser'
import type { NewsSource } from '../utils/types'

export const gameDeveloper: NewsSource = {
  name: 'Game Developer',
  icon: 'gamedeveloper.png',
  fetch: async () => {
    const xml = await fetch('https://www.gamedeveloper.com/feed/rss')
      .then(r => r.text())
    const items = parseRSS(xml)
    return items.slice(0, 20).map(item => ({
      id: item.guid,
      title: item.title,
      url: item.link,
      extra: {
        info: relativeTime(item.pubDate),
        hover: stripHtml(item.description?.slice(0, 200) ?? ''),
      },
    }))
  },
}
```

**主抓取脚本**（`scripts/fetch-all.ts`）：

```typescript
import { allSources } from './sources'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

async function main() {
  const outputDir = join(process.cwd(), 'data')
  mkdirSync(outputDir, { recursive: true })

  const results: Record<string, any[]> = {}
  const errors: Record<string, string> = {}

  for (const source of allSources) {
    try {
      console.log(`[${source.name}] 抓取中...`)
      const items = await source.fetch()
      results[source.name] = items
      console.log(`[${source.name}] 完成: ${items.length} 条`)
    } catch (e) {
      console.error(`[${source.name}] 失败:`, e)
      errors[source.name] = String(e)
    }
  }

  writeFileSync(
    join(outputDir, 'news.json'),
    JSON.stringify({
      updatedAt: new Date().toISOString(),
      sources: results,
      errors,
    }, null, 2)
  )
}

main()
```

### 3.2 前端层 -- React 静态页面

**数据加载**：Vite 构建时自动将 `data/news.json` 打包进 JS 文件：

```typescript
// src/main.tsx
import newsData from '../data/news.json'

// newsData 在构建时被内联，用户访问时不发任何网络请求
```

**主组件**（`src/App.tsx`）：

```tsx
import data from '../data/news.json'

export function App() {
  const entries = Object.entries(data.sources as Record<string, any[]>)

  return (
    <div className="app">
      <header>
        <h1>GameDev News</h1>
        <span>更新于 {formatTime(data.updatedAt)}</span>
      </header>
      <main className="columns">
        {entries.map(([name, items]) => (
          <CardColumn key={name} name={name} items={items} />
        ))}
      </main>
    </div>
  )
}
```

### 3.3 CI/CD 层 -- GitHub Actions

**工作流**（`.github/workflows/fetch-and-deploy.yml`）：

```yaml
name: Fetch and Deploy

on:
  schedule:
    - cron: '*/30 * * * *'   # 每30分钟
  workflow_dispatch:          # 手动触发
  push:
    branches: [main]          # push 触发（开发调试）

jobs:
  fetch-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci

      - name: 抓取所有数据源
        run: npx tsx scripts/fetch-all.ts

      - name: 构建前端
        run: npm run build

      - name: 部署到 GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          keep_files: false
```

---

## 四、配置步骤（从零到上线）

### 前提

```
1. 一个 GitHub 账号（免费）
2. 电脑上装了 Node.js >= 20
3. 一个浏览器
```

### 第 1 步：在 GitHub 上创建仓库

```
登录 GitHub → 点 "+" → New repository
仓库名: gamedev-news
公开/私有都可以
创建
```

### 第 2 步：克隆到本地

```bash
git clone https://github.com/你的用户名/gamedev-news.git
cd gamedev-news
```

### 第 3 步：初始化项目

```bash
npm init -y
npm install react react-dom
npm install -D vite @vitejs/plugin-react typescript tsx fast-xml-parser
```

### 第 4 步：配置文件

**`vite.config.ts`**：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gamedev-news/',
  build: { outDir: 'dist' },
})
```

### 第 5 步：启用 GitHub Pages

```
仓库 Settings → Pages
→ Source: GitHub Actions
```

### 第 6 步：推送并验证

```bash
git add .
git commit -m "init: gamedev news aggregator"
git push origin main
```

然后：
1. 打开仓库 Actions 标签页，看到工作流正在运行
2. 等待 1-2 分钟完成
3. 访问 `https://你的用户名.github.io/gamedev-news/`

---

## 五、自动化更新节奏

| 事件 | 触发方式 | 耗时 |
|------|---------|------|
| 每 30 分钟自动抓取 | cron 定时 | ~40 秒 |
| 手动触发 | 仓库 Actions → Run workflow | ~40 秒 |
| 代码 push | 自动触发 | ~40 秒 |

数据最多延迟 30 分钟，对游戏开发资讯来说完全足够。

---

## 六、扩展数据源的方法

添加一个新源只需要 4 步：

```bash
# 1. 新建源文件
touch scripts/sources/my-new-source.ts

# 2. 写入抓取逻辑（参照已有源）
echo 'export const mySource = { name: "...", icon: "...", fetch: async () => [...] }' > ...

# 3. 在 sources/index.ts 中注册
echo 'export { mySource } from "./my-new-source"' >> sources/index.ts

# 4. 放个图标到 public/icons/

# 5. 推送 → 自动部署上线
```

## 六、数据源完整清单（三语覆盖）

### 英文源（English）

| 源 | 类型 | 接入方式 | 内容方向 |
|----|------|---------|---------|
| **Game Developer** (gamedeveloper.com) | RSS | 低 | 游戏开发技术、行业新闻 |
| **GamesIndustry.biz** | RSS | 低 | 游戏商业、市场、发行 |
| **80 Level** (80.lv) | RSS | 低 | 技术美术、CGI、VFX |
| **Unreal Engine Blog** | RSS | 低 | 引擎更新、技术教程 |
| **Unity Blog** | RSS | 低 | 引擎更新、开发资源 |
| **Godot Blog** | RSS | 低 | 引擎更新、社区动态 |
| **Reddit r/gamedev** | JSON API | 低 | 社区热议、开发问答 |
| **Reddit r/IndieDev** | JSON API | 低 | 独立开发分享 |
| **Reddit r/Unity3D** | JSON API | 低 | Unity 技术讨论 |
| **Reddit r/UnrealEngine** | JSON API | 低 | Unreal 技术讨论 |
| **Hacker News (game 话题)** | Algolia API | 低 | 技术讨论中的游戏相关 |
| **itch.io 热门** | RSS | 低 | 独立游戏新作发布 |
| **Steam 热门独立游戏** | Store API | 中 | 独立游戏市场风向 |
| **Indie Game Gazette** | RSS | 低 | 独立开发深度分析 |
| **GDC Vault 新闻** | RSS | 中 | GDC 大会资讯 |

### 中文源

| 源 | 类型 | 接入方式 | 内容方向 |
|----|------|---------|---------|
| **Indienova 独立游戏** (indienova.com) | RSS | 低 | 独立游戏资讯、开发日志 |
| **GameRes 游资网** (gameres.com) | RSS | 低 | 游戏行业深度、开发技术 |
| **游戏葡萄** (youxiputao.com) | RSS | 低 | 游戏产业新媒体 |
| **游戏陀螺** (youxituoluo.com) | RSS | 低 | 手游行业、创业 |
| **游戏茶馆** (youxichaguan.com) | RSS | 低 | 行业风向、产品评测 |
| **游民星空** (gamersky.com) | RSS | 低 | 单机游戏新闻、评测 |
| **机核网** (gcores.com) | RSS | 低 | 游戏文化、播客、深度 |
| **知乎游戏话题** | API | 低 | 游戏行业热议 |
| **36氪游戏频道** | RSS | 低 | 游戏商业、投融资 |
| **腾讯游戏学堂** | RSS | 中 | 游戏开发技术分享 |
| **TapTap 热门** | 爬取 | 中 | 移动游戏热度 |
| **BiliBili 游戏区热门** | API | 中 | 游戏视频热点 |

### 日文源（日本語）

| 源 | 类型 | 接入方式 | 内容方向 |
|----|------|---------|---------|
| **4Gamer.net** (4gamer.net) | RSS | 低 | 日本最大综合游戏资讯 |
| **ファミ通** (famitsu.com) | RSS | 低 | 游戏新闻、销量排行 |
| **電ファミニコゲーマー** (denfaminicogamer.jp) | RSS | 低 | 游戏深度文章、文化 |
| **Game*Spark** (gamespark.jp) | RSS | 低 | 国内外游戏新闻、独立游戏 |
| **AUTOMATON** (automaton-media.com) | RSS | 低 | 独立游戏、海外游戏信息 |
| **インサイド** (inside-games.jp) | RSS | 低 | 最新游戏新闻速报 |
| **ゲームメーカーズ** (gamemakers.jp) | RSS | 低 | 游戏开发教程、工具信息 |
| **Indie Games Japan** (indiegamesjapan.com) | RSS | 低 | 独立游戏介绍 |
| **IndieGamesJp.dev** (indiegamesjp.dev) | RSS | 低 | 开发者向技术活动资讯 |
| **Indie Freaks** (indie-freaks.com) | RSS | 低 | 独立游戏新闻、展会 |
| **IGDA 日本** (igda.jp) | RSS | 低 | 国际游戏开发者协会日本 |
| **BitSummit 新闻** | RSS | 中 | 日本独立游戏展会资讯 |
| **Indie Tsushin** (indietsushin.net) | RSS | 低 | 英文介绍日本独立游戏 |

### 按语言分组统计

| 语言 | 源数量 | 更新频率预估 |
|------|--------|-------------|
| 英文 | 15 | 高（每日多次） |
| 中文 | 12 | 中高（每日更新） |
| 日文 | 13 | 高（每日多次） |
| **总计** | **40** | -- |

### 语言切换机制

用户可通过顶栏标签切换显示的语言：

```
[ 全部 ] [ 中文 ] [ English ] [ 日本語 ]

选中

---

## 七、实施路线图

| 阶段 | 内容 | 工作量 |
|------|------|--------|
| **第 1 天** | 搭项目骨架：Vite + React + TS + 基础页面 | ~2 小时 |
| **第 2 天** | 实现 3-5 个数据源 + Actions 工作流 | ~3 小时 |
| **第 3 天** | 界面打磨：深色模式 + 布局优化 + 图标 | ~2 小时 |
| **之后** | 持续添加数据源，提升覆盖 | 按需 |

---

## 八、局限与说明

| 项目 | 说明 |
|------|------|
| 不是实时 | 最多延迟 30 分钟，游戏开发资讯完全够用 |
| 无用户系统 | 纯公开页面，无需登录 |
| 无个性化 | 所有用户看到相同内容 |
| 无搜索 | 可以后续加（纯前端搜索本地数据） |
| GitHub Actions 配额 | 每月 2000 分钟免费，本方案约用 960 分钟 |

---

要不要现在开始动手搭项目骨架？先创建仓库、初始化项目、跑通第一个数据源，你验证满意后再继续加更多源。
