# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 80+ 数据源，GB 四色绿像素风格。

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
| 中文 | 同上 | zh 类源（含原社区中文源） |
| English | 同上 | en 类源（含原引擎/公司/社区英文源） |
| 日本語 | 同上 | ja 类源（含原社区日文源） |
| Steam | 多列网格，每源一卡，每卡限 10 条 | Steam 榜单（热销/新品/特惠/即将推出） |

- 非 Steam 标签：所有源合并，按 `pubDate` 降序，每 5 条切一块渲染为一张卡片
- Steam 标签：保持按源分列的传统卡片布局

## 分类体系

| Lang 类型 | 标签名 | 说明 |
|-----------|--------|------|
| `all` | 全部 | 所有非 Steam 源合并（按时间排序） |
| `zh` | 中文 | 中文游戏开发/设计源 + 原社区中文源（NGA 等） |
| `en` | English | 英文游戏开发/设计源 + 原引擎/公司/社区英文源 |
| `ja` | 日本語 | 日文游戏开发/设计源 + 原社区日文源（Qiita、Zenn） |
| `steam` | Steam | Steam 榜单（热销/新品/特惠/即将推出） |

- 每个源只属于一个语言分类，不会跨标签出现
- 引擎/公司/社区已全部归类到对应语言下，不再独立成标签

## 数据源规范

每个源文件必须：
- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja / steam）
- fetch 返回 `NewsItem[]`，消息源建议最多 5 条，Steam 榜单不限
- 单源超时 10 秒，失败不影响其他源

## 常见问题

- **Reddit**: 使用 JSON API（`hot.json?limit=5`），推荐 User-Agent `gamedev-news/1.0 (by /u/lemonkiller)`，批次抓取+共享缓存+10s 间隔+失败重试。从中国网络不可达（超时），依赖 GitHub Actions
- **Cloudflare 防护**：部分源（Game Developer、Unreal Blog）被 Cloudflare 挡，本地和 GH Actions 都可能 403，暂时跳过
- **Steam API**：`store.steampowered.com/api/featuredcategories`，返回 10-30 条。本地网络可能超时，GH Actions 更稳定
- **中文网络屏蔽**：部分 Google 系源（Blogger）和 GFW 墙外站点本地不可达，依赖 GitHub Actions
- **GitHub 分支保护**：主分支有保护，推送到 `feat/xxx` 分支再开 PR 合并
