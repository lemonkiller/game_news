# GameDev News 项目工作流程

## 项目概述

GameDev News 是一个游戏开发资讯聚合站，基于 GitHub Pages + GitHub Actions，纯静态零运维。覆盖中英日三语 50+ 数据源，GB 四色绿像素风格。

## 沟通规范

- 用中文交流
- 不使用表情符号
- 让用户做方案选择时，假设零基础，说得浅显易懂
- 做执行、提建议，不做决策

## 开发流程

1. **搜索可用源** -- 并行搜索中英日三语游戏开发/设计相关网站、博客、RSS
2. **测试 RSS** -- 用 Node.js fetch 测试每个候选源的可用性，记录结果
3. **创建源文件** -- 在 `scripts/sources/` 下新建 `.ts` 文件，实现 `NewsSource` 接口
4. **注册源** -- 在 `scripts/sources/index.ts` 中 import 并加入 `allSources` 数组
5. **更新前端映射** -- 在 `src/App.tsx` 的 `LANG_MAP` 中添加语言/分类映射
6. **验证** -- `npm run fetch` 抓取数据 + `npm run build` 确认构建通过
7. **本地预览** -- 启动 Vite dev server，让用户看效果
8. **提交推送** -- `git commit` + `git push origin master:feat/xxx`

## 分类体系

| Lang 类型 | 标签名 | 说明 |
|-----------|--------|------|
| `all` | 全部 | 显示所有源 |
| `zh` | 中文 | 中文游戏开发/设计源 |
| `en` | English | 英文游戏开发/设计源 |
| `ja` | 日本語 | 日文游戏开发/设计源 |
| `steam` | Steam | Steam 榜单（热销/新品/特惠） |
| `engine` | 引擎 | 游戏引擎官方博客 |
| `company` | 公司 | 游戏公司官方资讯 |

- 每个源只属于一个分类，不会跨标签出现
- 引擎源不出现在语言标签中
- Steam 源全部归入 Steam 标签

## 数据源规范

每个源文件必须：
- 实现 `NewsSource` 接口（name / lang / fetch）
- name 用展示名（如 "触乐"、"4Gamer.net"）
- lang 用对应分类（zh / en / ja / steam / engine / company）
- fetch 返回 `NewsItem[]`，最多 5条
- 单源超时 10 秒，失败不影响其他源

## 常见问题

- **Cloudflare 防护**：部分源（Game Developer、Unreal Blog）被 Cloudflare 挡，本地和 GH Actions 都可能 403，暂时跳过
- **Steam API**：本地网络可能超时，GH Actions 环境下更稳定；也可用 Steam RSS 替代
- **GitHub 分支保护**：主分支有保护，需要通过 PR 合并，推送到 `feat/xxx` 分支
