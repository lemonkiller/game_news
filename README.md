# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 120+ 数据源，纯静态零运维。

GB 经典四色绿像素风格，口袋妖怪红绿配色。

## 数据源一览

| 标签 | 源数 | 说明 |
|------|------|------|
| 全部 | ~118 | 全部源合并，按时间瀑布流展示 |
| English | ~60 | 游戏开发新闻、设计博客、引擎博客、AI/PCG 博客、公司资讯、Reddit 等 |
| 中文 | ~20 | 国内游戏媒体、独立开发者博客、NGA 版块 |
| 日本語 | ~15 | 日本游戏资讯、Qiita/Zenn 技术博客、公司技术博客 |
| Steam | 4 | 热销、新品、特惠、即将推出（CN 区） |
| 网址 | 61 | 无 RSS 的开发工具/资源/学习/社区链接 |

完整列表见 `scripts/sources/` 目录。

## 布局

| 标签 | 布局 |
|------|------|
| 全部 / 中文 / English / 日本語 | 时间线瀑布流：所有源合并按时间排序，每 5 条一卡，2 列排列 |
| Steam | 多列网格：每源一卡，每卡限 10 条 |
| 网址 | 按 15 个分类分组的静态链接列表 |

每行显示格式：**标题** | **来源站点** | **更新时间**

## 如何贡献数据源

**欢迎提交 PR 增加优质的游戏开发/设计相关数据源！**

要求：

- 内容与**游戏开发、游戏设计、游戏行业**直接相关
- 有稳定的 RSS / Atom / API 输出（有 RSS 的加入抓取，无 RSS 的加入网址标签）
- 已在该语言/地区被广泛认可的优质来源

添加步骤：

1. 在 `scripts/sources/` 下新建文件，实现 `NewsSource` 接口
2. 在 `scripts/sources/index.ts` 中注册（import + allSources 数组）
3. 在 `src/App.tsx` 的 `LANG_MAP` 中添加映射
4. 运行 `npm run fetch` 验证数据能正常抓取
5. 运行 `npm run build` 确认构建通过
6. 提交 PR

无 RSS 的源加入 `scripts/sources/link-sources.ts`，按分类放在对应区域。

## 架构

- **数据抓取**：GitHub Actions 每天 8:00 / 20:00 定时运行 TypeScript RSS/API 抓取
- **前端**：Vite + React + TypeScript，VT323 / Press Start 2P 像素字体
- **部署**：GitHub Pages，`actions/deploy-pages` 官方部署
- **配色**：Game Boy 经典四色绿 `#0F380F #306230 #8BAC0F #9BBC0F`
- **Fetch 顺序执行**：单源 10s 超时，失败不影响其他源

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

# 5. 类型检查
npx tsc --noEmit
```

## 许可

MIT
