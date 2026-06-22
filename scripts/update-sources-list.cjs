/**
 * 信息源列表更新脚本
 *
 * 从 news.json、源文件和生成的源注册表中读取数据，生成 sources-list.md。
 * 每次新增/修改/删除信息源后执行此脚本。
 *
 * 用法: node scripts/update-sources-list.cjs
 * 前置: npm run fetch (生成 data/news.json) && npm run generate-registry
 */

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(process.cwd(), "data", "news.json");
const REGISTRY_PATH = path.join(
	process.cwd(),
	"src",
	"generated",
	"source-registry.json",
);
const OUTPUT_PATH = path.join(process.cwd(), "sources-list.md");
const SOURCES_DIR = path.join(process.cwd(), "scripts", "sources");

if (!fs.existsSync(DATA_PATH)) {
	console.error("错误: data/news.json 不存在，请先运行 npm run fetch");
	process.exit(1);
}

if (!fs.existsSync(REGISTRY_PATH)) {
	console.error(
		"错误: src/generated/source-registry.json 不存在，请先运行 npm run generate-registry",
	);
	process.exit(1);
}

const news = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));

/** 从生成的注册表读取社交源名称集合 */
const SOCIAL_SOURCE_NAMES = new Set(registry.socialNames || []);

/** 从生成的注册表读取语言映射 */
const langMap = registry.langMap || {};

// 构建源文件->名称映射
function buildFileMap(dir) {
	const map = {};
	const files = fs
		.readdirSync(dir)
		.filter(
			(f) =>
				f.endsWith(".ts") &&
				![
					"index.ts",
					"link-sources.ts",
					"rss-parser.ts",
					"fetcher.ts",
					"types.ts",
					"quotes.ts",
				].includes(f),
		);
	for (const f of files) {
		const content = fs.readFileSync(path.join(dir, f), "utf-8");
		const matches = content.matchAll(/name:\s*['"]([^'"]+)['"]/g);
		for (const m of matches) map[m[1]] = path.join(dir, f);
	}
	return map;
}

const fileMap = {
	...buildFileMap(SOURCES_DIR),
	...buildFileMap(path.join(SOURCES_DIR, "social")),
};

// 特殊处理 social 源（动态 name，通过函数参数传入）
function extractDynamicNames(fileName, dir, pattern) {
	const content = fs.readFileSync(path.join(dir, fileName), "utf-8");
	const matches = content.matchAll(pattern);
	for (const m of matches) fileMap[m[1]] = "scripts/sources/social/" + fileName;
}

extractDynamicNames(
	"lemmy.ts",
	path.join(SOURCES_DIR, "social"),
	/export const \w+ = makeLemmySource\(\s*['"]([^'"]+)['"]/g,
);
extractDynamicNames(
	"bluesky.ts",
	path.join(SOURCES_DIR, "social"),
	/export const \w+ = makeBlueskySource\(\s*['"]([^'"]+)['"]/g,
);
extractDynamicNames(
	"github.ts",
	path.join(SOURCES_DIR, "social"),
	/export const \w+ = makeGitHub(?:Release|Trending)Source\(\s*['"]([^'"]+)['"]/g,
);
extractDynamicNames(
	"mastodon.ts",
	path.join(SOURCES_DIR, "social"),
	/export const \w+ = makeMastodonSource\(\s*['"]([^'"]+)['"]/g,
);
extractDynamicNames(
	"reddit.ts",
	path.join(SOURCES_DIR, "social"),
	/export const \w+ = makeRedditSource\(\s*['"]([^'"]+)['"]/g,
);

// 处理 community.ts、design-tech.ts 等非 social 目录中的动态 name
for (const fName of [
	"community.ts",
	"design-tech.ts",
	"engine-tech.ts",
	"game-ai-sources.ts",
]) {
	const content = fs.readFileSync(path.join(SOURCES_DIR, fName), "utf-8");
	const matches = content.matchAll(
		/export const \w+ = make\w+Source\(\s*['"]([^'"]+)['"]/g,
	);
	for (const m of matches) fileMap[m[1]] = "scripts/sources/" + fName;
}

// 生成数据
const sourceNames = Object.keys(news.sources).filter(
	(n) => n !== "开发工具链接",
);
const rows = [];

for (const name of sourceNames) {
	const items = news.sources[name];
	const isSocial = SOCIAL_SOURCE_NAMES.has(name);
	const lang = langMap[name] || "en";
	const itemCount = items ? items.length : 0;
	const lastDate =
		items && items.length > 0 && items[0].pubDate
			? items[0].pubDate.slice(0, 10)
			: "-";
	// 统一转为相对路径
	let filePath = fileMap[name] || "-";
	if (filePath.startsWith(process.cwd())) {
		filePath = filePath.slice(process.cwd().length + 1).replace(/\\/g, "/");
	}

	rows.push({
		name,
		type: isSocial ? "社交" : "新闻",
		lang,
		file: filePath,
		items: itemCount,
		lastUpdate: lastDate,
	});
}

rows.sort(
	(a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name),
);

// 网址分类数据
const linkCats = [
	["行业动态", 34, "游戏行业名人 X/Twitter 账号"],
	["开发社区", 31, "游戏开发综合社区/论坛/子论坛"],
	["游戏设计", 31, "游戏机制/叙事/关卡/数值设计理论与资源"],
	["视频/频道", 25, "YouTube 游戏开发/设计优质频道与 GDC 演讲"],
	["游戏引擎", 24, "各游戏引擎官网/文档/社区"],
	["2D/3D 美术", 17, "Aseprite/Blender/Krita 等美术工具及像素/建模资源"],
	["编程 & 架构", 16, "游戏编程/渲染/AI/图形学技术教程与博客"],
	["开发工具", 13, "CI/CD/版本控制/调试器/编辑器与 Awesome List"],
	["中文资源", 7, "知乎专栏/B站/国内游戏开发社区"],
	["素材资源", 7, "免费游戏素材/模型/音效/图标"],
	["音频工具", 5, "BGM/SFX 工具与音频素材"],
	["UI/UX 设计", 1, "游戏界面/交互/可用性设计资源"],
	["发行/运营", 1, "游戏发行/推广/商店优化/本地化资源（待扩充）"],
];

// 生成 Markdown
let md = "# 信息源列表\n\n";
md += "> 自动由 `scripts/update-sources-list.cjs` 生成。不要手动编辑。\n\n";
md += "## 新闻/社交源\n\n";
md += `共 ${rows.length} 个源。\n\n`;
md += "| 名称 | 类型 | 语言 | 文件 | 条数 | 最近更新 |\n";
md += "|------|------|------|------|------|---------|\n";
for (const r of rows) {
	md += `| ${r.name} | ${r.type} | ${r.lang} | ${r.file} | ${r.items} | ${r.lastUpdate} |\n`;
}

md += "\n## 网址链接分类\n\n";
md +=
	"网址标签下的链接按 14 个分类组织。具体条目见 `scripts/sources/link-sources.ts`。\n\n";
md += "| 分类 | 数量 | 说明 |\n";
md += "|------|------|------|\n";
for (const [cat, count, desc] of linkCats) {
	md += `| ${cat} | ${count} | ${desc} |\n`;
}

fs.writeFileSync(OUTPUT_PATH, md);
console.log(`已更新 ${OUTPUT_PATH}，共 ${rows.length} 个源`);
