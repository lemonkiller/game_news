# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 20 个数据源，纯静态，零运维。

## 当前数据源

| 语言 | 源 | 条数 | 接入方式 |
|------|----|------|---------|
| EN | GamesIndustry.biz | 20 | RSS |
| EN | 80 Level | 10 | RSS |
| EN | PC Gamer | 20 | RSS |
| EN | Rock Paper Shotgun | 20 | RSS |
| EN | VG247 | 20 | RSS |
| EN | Unity Blog | 20 | RSS |
| EN | Hacker News | 20 | Algolia API |
| ZH | 机核网 | 20 | RSS |
| ZH | 游戏陀螺 | 20 | RSS |
| ZH | 游戏茶馆 | 10 | RSS |
| JA | 4Gamer.net | 20 | RSS (RDF) |
| JA | AUTOMATON | 20 | RSS |
| JA | 電ファミニコゲーマー | 20 | RSS |
| JA | ゲームメーカーズ | 20 | RSS |
| JA | IndieGamesJapan | 15 | RSS |
| JA | IGDA Japan | 10 | RSS |
| JA | IndieGamesJp.dev | 10 | RSS |

> 另有 Godot Releases (GitHub API)、Reddit r/gamedev (Reddit API)、インサイド (RSS) 因网络问题偶尔失败，在 GitHub Actions 环境下可能更稳定。

## 架构

- **数据抓取**：GitHub Actions 每天 8:00 和 20:00 定时运行 TypeScript 脚本
- **前端**：Vite + React + TypeScript
- **部署**：GitHub Pages

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 抓取数据
npm run fetch

# 3. 启动开发服务器
npm run dev

# 4. 构建
npm run build
```

## 添加数据源

1. 在 `scripts/sources/` 下新建文件，实现 `NewsSource` 接口
2. 在 `scripts/sources/index.ts` 中注册
3. 在 `src/App.tsx` 的 `langMap` 中添加语言映射
4. 提交推送，自动部署

## 许可

MIT
