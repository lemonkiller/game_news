# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 **120 个数据源**，GB 四色绿像素风格。

支持三种抓取方式：
- **RSS/Atom 直连**（90+ 源）
- **RSSHub 桥接**（2000+ 网站可转 RSS）
- **cheerio HTML 抓取**（无 RSS 的网站）

## 沟通规范

- 用中文交流
- 不使用表情符号
- 让用户做方案选择时，假设零基础，说得浅显易懂
- 做执行、提建议，不做决策

## 开发流程

1. **搜索可用源** -- 使用 webaio 并行搜索中英日三语游戏开发/设计相关网站、博客、RSS
2. **测试 RSS** -- 用 Node.js fetch 测试每个候选源的可用性，记录结果
3. **创建源文件** -- 在 `scripts/sources/` 下新建 `.ts` 文件，实现 `NewsSource` 接口
4. **注册源** -- 在 `scripts/sources/index.ts` 中 import 并加入 `allSources` 数组
5. **更新前端映射** -- 在 `src/App.tsx` 的 `LANG_MAP` 中添加语言分类映射
6. **验证** -- `npm run fetch` 抓取数据 + `npm run build` 确认构建通过
7. **本地预览** -- `npm run dev` 启动 Vite dev server，看效果
8. **提交推送** -- 切到 `feat/xxx` 分支，`git add` + `git commit` + `git push`

## 布局说明

| 标签 | 布局方式 | 数据源 |
|------|---------|--------|
| 全部 | 时间线瀑布流，每卡 5 条，2 列排列 | 所有非 Steam 源合并按时间排序 |
| 中文 | 同上 | zh 类源 |
| English | 同上 | en 类源 |
| 日本語 | 同上 | ja 类源 |
| Steam | 多列网格，每源一卡，每卡限 10 条 | Steam 榜单（热销/新品/特惠/即将推出） |

- 非 Steam 标签：所有源合并，按 `pubDate` 降序，每 5 条切一块渲染为一张卡片
- Steam 标签：保持按源分列的传统卡片布局

## 分类体系

| Lang 类型 | 标签名 | 源数 | 说明 |
|-----------|--------|------|------|
| `all` | 全部 | 116 | 所有非 Steam 源合并（按时间排序） |
| `zh` | 中文 | 23 | 游戏媒体 + 独立博客 + NGA + 掘金等 |
| `en` | English | 72 | 行业媒体 + 设计博客 + 引擎 + 工作室 + AI 专题 |
| `ja` | 日本語 | 21 | 游戏媒体 + Qiita/Zenn + 公司技术博客 |
| `steam` | Steam | 4 | Steam 榜单（热销/新品/特惠/即将推出） |

- 每个源只属于一个语言分类，不会跨标签出现

## 数据源规范

每个源文件必须：
- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja / steam）
- fetch 返回 `NewsItem[]`，必须包含 `pubDate` 字段用于排序
- 消息源建议最多 5-10 条，Steam 榜单不限
- 单源超时 10 秒（`fetcher.ts` 的 `fetchWithTimeout`），失败不影响其他源

### 三种抓取方式

```typescript
// 方式 1: RSS/Atom 直连（推荐，最稳定）
const xml = await fetchText("https://example.com/feed");
return toNewsItems(parseRSS(xml)).slice(0, 10);

// 方式 2: RSSHub 桥接（2000+ 网站支持）
const xml = await fetchText("https://rsshub.app/zhihu/column/xxx");
return toNewsItems(parseRSS(xml)).slice(0, 10);

// 方式 3: cheerio HTML 抓取（无 RSS 的网站）
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

## 常见问题

- **Reddit**：使用 JSON API（`hot.json?limit=5`），User-Agent `gamedev-news/1.0 (by /u/lemonkiller)`，批次抓取+共享缓存+10s 间隔+失败重试。从中国网络不可达（GFW），设置 `REDDIT_PROXY` 环境变量可走代理
- **Cloudflare 防护**：部分源（Game Developer、Unreal Blog）可能被 Cloudflare 挡，GH Actions 通常可访问
- **Steam API**：`store.steampowered.com/api/featuredcategories`。本地可能超时，GH Actions 更稳定
- **中文网络屏蔽**：部分 Google 系源和 GFW 墙外站点本地不可达，依赖 GitHub Actions
- **undici 版本**：本地安装的 undici 版本可能高于 GH Node v20 内置版本，Project 使用 `require()` 动态加载避免崩溃
- **GitHub 分支保护**：主分支有保护，推送到 `feat/xxx` 分支再开 PR 合并
- **资源限制**：cheerio 抓取时注意合理设置选择器，避免抓取过多页面；优先使用 RSS 方案
