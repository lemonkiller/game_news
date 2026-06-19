# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 **~100 个数据源**，GB 四色绿像素风格。

支持的抓取方式：

- **RSS/Atom 直连**（多数源），稳定优先
- **cheerio HTML 抓取**（无 RSS 的网站，工具保留备用）

> RSSHub 方式已移除：所有测试过的 RSSHub 路由（知乎、B站、微博等）因反爬/Cloudflare 均不可靠，且内容不属游戏开发领域。

## 沟通规范

- 用中文交流
- 不使用表情符号
- 让用户做方案选择时，假设零基础，说得浅显易懂
- 做执行、提建议，不做决策

## 开发流程

1. **搜索可用源** -- 使用 webaio 并行搜索中英日三语游戏开发/设计相关网站、博客、RSS
2. **测试 RSS** -- 用 Node.js fetch 测试每个候选源的可用性，记录结果
3. **分流处理**：
   - **能抓取的源** → 创建抓取源文件（`scripts/sources/`），注册到 `allSources`，进入瀑布流
   - **无法抓取的源**（无 RSS / Cloudflare / 反爬等）→ 添加到 `scripts/sources/link-sources.ts` 的 `links` 数组，进入「网址」标签
4. **创建源文件** -- 在 `scripts/sources/` 下新建 `.ts` 文件，实现 `NewsSource` 接口
5. **注册源** -- 在 `scripts/sources/index.ts` 中 import 并加入 `allSources` 数组
6. **更新前端映射** -- 在 `src/App.tsx` 的 `LANG_MAP` 中添加语言分类映射
7. **验证** -- `npm run fetch` 抓取数据 + `npm run build` 确认构建通过
8. **本地预览** -- `npm run dev` 启动 Vite dev server，看效果
9. **提交推送** -- 切到 `feat/xxx` 分支，`git add` + `git commit` + `git push`

## 布局说明

| 标签 | 布局方式 | 数据源 |
|------|---------|--------|
| 全部 | 时间线瀑布流，每卡 5 条，2 列排列 | 所有非 Steam 源合并按时间排序 |
| 中文 | 同上 | zh 类源 |
| English | 同上 | en 类源 |
| 日本語 | 同上 | ja 类源 |
| Steam | 多列网格，每源一卡，每卡限 10 条 | Steam 榜单（热销/新品/特惠/即将推出） |
| 网址 | 单栏全宽链接列表，按分类分组展示 | 无 RSS 的工具/资源站，静态链接 |

- 非 Steam 标签：所有源合并，按 `pubDate` 降序，每 5 条切一块渲染为一张卡片
- Steam 标签：保持按源分列的传统卡片布局
- 网址标签：纯静态展示，不参与抓取

## 分类体系

| Lang 类型 | 标签名 | 源数 | 说明 |
|-----------|--------|------|------|
| `all` | 全部 | ~90 | 所有非 Steam 源合并（按时间排序） |
| `zh` | 中文 | ~19 | 游戏媒体 + 独立博客 + 游戏公司技术博客 |
| `en` | English | ~56 | 行业媒体 + 设计博客 + 引擎 + 工作室 + AI 专题 + 开发工具 |
| `ja` | 日本語 | ~17 | 游戏媒体 + Qiita/Zenn + 公司技术博客 |
| `steam` | Steam | 4 | Steam 榜单（热销/新品/特惠/即将推出） |
| `links` | 网址 | 38 | 无 RSS 的开发工具/资源站，静态链接按分类展示 |

- 每个源只属于一个语言分类，不会跨标签出现

## 数据源规范

每个源文件必须：

- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja / steam）
- fetch 返回 `NewsItem[]`，必须包含 `pubDate` 字段用于排序
- 消息源建议最多 5-10 条，Steam 榜单不限
- 单源超时 10 秒（`fetcher.ts` 的 `fetchWithTimeout`），失败不影响其他源

### 抓取方式

```typescript
// 方式 1: RSS/Atom 直连（推荐，最稳定）
const xml = await fetchText("https://example.com/feed");
return toNewsItems(parseRSS(xml)).slice(0, 10);

// 方式 2: cheerio HTML 抓取（无 RSS 的网站，备用方案）
import { scrapeList } from "../utils/html-scraper";
return scrapeList("https://example.com/news", {
    container: "article.post",
    title: { selector: "h2 a" },
    link: { selector: "h2 a", attr: "href" },
    date: { selector: "time", attr: "datetime" },
}, 10);
```

## 抓取脚本说明

`scripts/fetch-all.ts` 是抓取总入口：

- 遍历 `allSources` 数组（120 个源）
- 每个源调用 `source.fetch()`，有 10 秒超时保护
- **增量写入**：每抓完一个源立即保存到 `data/news.json`，防止中途卡死丢失数据

## GitHub Actions 工作流

- `.github/workflows/` 中定义定时任务
- 默认 Node.js v20（GH 官方镜像）
- `undici` 使用动态 `require()` 加载，兼容 Node v20/v24
- 包含 `npx tsc --noEmit` 类型检查步骤，阻止类型错误合并

## 代理配置

从中国网络访问海外站点（Reddit 等）需要代理。`fetcher.ts` 支持以下环境变量：

| 变量 | 作用域 | 说明 |
|------|--------|------|
| `HTTPS_PROXY` | 全局 | 所有 fetch 请求走此代理 |
| `HTTP_PROXY` | 全局 | HTTP 请求的代理 |
| `REDDIT_PROXY` | 仅 Reddit | 优先级高于 `HTTPS_PROXY` |

### 配置示例（Clash Verge 端口 1226）

```powershell
# Windows PowerShell
$env:HTTPS_PROXY="http://127.0.0.1:1226"
$env:REDDIT_PROXY="http://127.0.0.1:1226"
npm run fetch
```

```bash
# Linux / macOS / Git Bash
export HTTPS_PROXY=http://127.0.0.1:1226
export REDDIT_PROXY=http://127.0.0.1:1226
npm run fetch
```

### 技术原理

`fetchWithTimeout()` 内部通过 `undici.ProxyAgent` 实现代理，使用动态 `require()` 加载 undici，避免 Node v20（GH Actions）上因版本不兼容崩溃。当没有设置环境变量时，`undici` 不会加载，行为与原生 fetch 完全一致。

### 常见场景

- **本地开发（中国）**：设 `HTTPS_PROXY` 后，大部分海外源可正常抓取
- **Reddit**：必须额外设置 `REDDIT_PROXY`，因为 Reddit 使用独立的 `fetch` 路径
- **GitHub Actions**：无需任何代理配置，环境变量不存在时自动直连

## 常见问题

- **Reddit**：使用 JSON API（`hot.json?limit=5`），User-Agent `gamedev-news/1.0 (by /u/lemonkiller)`，批次抓取+共享缓存+10s 间隔+失败重试。从中国网络不可达（GFW），设置 `REDDIT_PROXY` 环境变量可走代理
- **Cloudflare 防护**：部分站点（gamedeveloper.com、gamedev.net 等）被 Cloudflare 挡住，即使走代理也可能 403。这类源已从项目中移除
- **NVIDIA Game Dev**：大 Feed（~770KB），通过代理可正常抓取 100 条
- **GameRes 论坛**：`bbs.gameres.com` 当前返回「系统维护中」，恢复后可考虑重新加入
- **Steam API**：`store.steampowered.com/api/featuredcategories`。本地可能超时，GH Actions 更稳定
- **中文网络屏蔽**：部分 Google 系源和 GFW 墙外站点本地不可达，依赖 GitHub Actions 或本地代理
- **undici 版本**：本地安装的 undici 版本可能高于 GH Node v20 内置版本，Project 使用 `require()` 动态加载避免崩溃
- **GitHub 分支保护**：主分支有保护，推送到 `feat/xxx` 分支再开 PR 合并
- **优先 RSS**：添加新源时优先选择有稳定 RSS 的站点；cheerio 抓取仅作备用
- **示例文件**：cheerio 用法示例在 `scripts/examples/html-scraping-demo.ts`
- **网址标签**：无 RSS 的站点添加到 `scripts/sources/link-sources.ts`，在前端「网址」标签按分类展示
