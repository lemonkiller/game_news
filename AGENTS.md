# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 140+ 数据源，GB 四色绿像素风格。

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
5. **更新前端映射** -- 在 `src/App.tsx` 的 `LANG_MAP` 中添加语言分类映射
6. **验证** -- `npm run fetch` 抓取数据 + `npm run build` 确认构建通过 + `npx tsc --noEmit` 类型检查
7. **本地预览** -- `npm run dev` 启动 Vite dev server，看效果
8. **提交推送** -- 切到 `feat/xxx` 分支，`git add` + `git commit` + `git push`
9. **合并后操作** -- 合并 master 后需检查 `link-sources.ts` 是否在 `index.ts` 的 `allSources` 中注册

## 布局说明

| 标签 | 布局方式 | 数据源 |
|------|---------|--------|
| 全部 | 时间线瀑布流，每卡 5 条，2 列排列 | 所有源合并按时间排序（排除网址源） |
| 中文 | 同上 | zh 类源（含原社区中文源如 NGA） |
| English | 同上 | en 类源（含原引擎/公司/社区英文源） |
| 日本語 | 同上 | ja 类源（含原社区日文源如 Qiita、Zenn） |
| 网址 | 按分类分组的静态链接列表 | 无 RSS 的开发工具/资源/社区/引擎链接 |

- 所有标签：全部源合并，按 `pubDate` 降序，每 5 条切一块渲染为一张卡片
- 无 `pubDate` 的条目也会展示（排序靠后）
- 网址标签：按分类分组展示，每项含标题/描述/分类，右侧无内容

## 分类体系

| Lang 类型 | 标签名 | 说明 |
|-----------|--------|------|
| `all` | 全部 | 所有源合并（按时间排序） |
| `zh` | 中文 | 中文游戏开发/设计源 + 原社区中文源 |
| `en` | English | 英文游戏开发/设计源 + 原引擎/公司/社区英文源 |
| `ja` | 日本語 | 日文游戏开发/设计源 + 原社区日文源 |
| `links` | 网址 | 无 RSS 的静态链接分类索引 |

- 每个源只属于一个语言分类，不会跨标签出现
- Steam 标签已移除（API 间歇不可达，无法稳定抓取）

## 网址链接分类（link-sources.ts）

按动态性从上到下排列：

社区、游戏设计/分析、游戏行业/演讲、游戏商业/发行、游戏编程/架构、图形/渲染编程、程序化生成、叙事/对话工具、关卡设计、世界观设计、UI/UX 设计、游戏框架/引擎、CI/CD 与构建、素材资源、音频工具、图形/美术工具

## 数据源规范

每个源文件必须：

- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja）
- fetch 返回 `NewsItem[]`，RSS 源建议最多 5 条，linkSource 为静态全量
- 单源超时 10 秒，失败不影响其他源
- `link-sources.ts` 作为静态源返回 `LinkEntry[]`，需注册到 `index.ts` 的 `allSources`
- 网址链接源（linkSource 的 name 为 "开发工具链接"）只出现在"网址"标签下，不得出现在信息流中。App.tsx 的 timelineChunks 中需跳过 `name === "开发工具链接"`
- 新添 RSS 源需同时在 `src/App.tsx` 的 `LANG_MAP` 注册、在 `data/news.json` 中留空后会通过 fetch 自动填充
- 添加无 RSS 的网站/工具/社区时，加入 `link-sources.ts` 对应分类

## 名言系统

- `scripts/utils/quotes.ts` 存放 99 条游戏开发/设计相关名言（中文翻译版）
- 每次切换标签页时随机选取一条显示在导航栏右侧
- 每条名言含 quote（正文）、author（作者）、source（来源/作品，可选）
- 鼠标悬停名言显示作者和来源

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
