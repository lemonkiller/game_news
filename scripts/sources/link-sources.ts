import type { NewsSource } from "../utils/types";

/**
 * 游戏开发工具/资源链接源（静态数据，无 RSS 抓取）
 * 按分类展示，帮助用户发现有用的开发站点
 */

interface LinkEntry {
	id: string;
	title: string;
	url: string;
	category: string;
	lang: string;
	desc?: string;
}

const links: LinkEntry[] = [
	/* ===== 图形/美术工具 ===== */
	{
		id: "link-aseprite",
		title: "Aseprite",
		url: "https://www.aseprite.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "专业的像素画 & 精灵动图编辑器",
	},
	{
		id: "link-tiled",
		title: "Tiled",
		url: "https://www.mapeditor.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "免费灵活的 2D 网格地图编辑器",
	},
	{
		id: "link-spine",
		title: "Spine",
		url: "http://esotericsoftware.com/",
		category: "图形/美术工具",
		lang: "en",
		desc: "2D 骨骼动画编辑，主流引擎皆可集成",
	},
	{
		id: "link-texturepacker",
		title: "TexturePacker",
		url: "https://www.codeandweb.com/texturepacker",
		category: "图形/美术工具",
		lang: "en",
		desc: "Sprite 帧图打包工具，支持多种引擎导出",
	},
	{
		id: "link-pyxeledit",
		title: "PyxelEdit",
		url: "http://pyxeledit.com/",
		category: "图形/美术工具",
		lang: "en",
		desc: "专为像素画 & 关卡地图设计的编辑器",
	},
	{
		id: "link-piskel",
		title: "Piskel",
		url: "https://www.piskelapp.com/",
		category: "图形/美术工具",
		lang: "en",
		desc: "免费的在线像素画 / 帧图编辑工具",
	},
	{
		id: "link-blender",
		title: "Blender",
		url: "https://www.blender.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "开源 3D 建模/动画/渲染全流程工具",
	},
	{
		id: "link-krita",
		title: "Krita",
		url: "https://krita.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "开源的数字绘画软件，适合概念设计与材质绘制",
	},
	{
		id: "link-material-maker",
		title: "Material Maker",
		url: "https://www.materialmaker.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "节点式 PBR 材质生成工具，类似 Substance Designer",
	},

	/* ===== 音频工具 ===== */
	{
		id: "link-lmms",
		title: "LMMS",
		url: "https://lmms.io/",
		category: "音频工具",
		lang: "en",
		desc: "开源的数字音频工作站（DAW）",
	},
	{
		id: "link-audacity",
		title: "Audacity",
		url: "https://www.audacityteam.org/",
		category: "音频工具",
		lang: "en",
		desc: "免费音频录制 & 编辑软件",
	},
	{
		id: "link-boscaceoil",
		title: "Bosca Ceoil",
		url: "https://boscaceoil.net/",
		category: "音频工具",
		lang: "en",
		desc: "初学者友好的音乐作曲工具",
	},
	{
		id: "link-sfxr",
		title: "sfxr / jsfxr",
		url: "https://sfxr.me/",
		category: "音频工具",
		lang: "en",
		desc: "在线游戏音效生成器（8bit 风格）",
	},
	{
		id: "link-musescore",
		title: "MuseScore",
		url: "https://musescore.org/",
		category: "音频工具",
		lang: "en",
		desc: "开源乐谱编辑 & 导出工具",
	},

	/* ===== 素材资源 ===== */
	{
		id: "link-opengameart",
		title: "OpenGameArt",
		url: "https://opengameart.org/",
		category: "素材资源",
		lang: "en",
		desc: "免费游戏美术资源库（多种许可证）",
	},
	{
		id: "link-freesound",
		title: "Freesound",
		url: "https://freesound.org/",
		category: "素材资源",
		lang: "en",
		desc: "CC 许可的音效 & 音频片段库",
	},
	{
		id: "link-game-icons",
		title: "Game-Icons.net",
		url: "https://game-icons.net/",
		category: "素材资源",
		lang: "en",
		desc: "免费可商用的游戏图标集（SVG）",
	},
	{
		id: "link-kenney",
		title: "Kenney Assets",
		url: "https://kenney.nl/",
		category: "素材资源",
		lang: "en",
		desc: "高质量免费游戏素材包（CC0）",
	},
	{
		id: "link-textures",
		title: "Textures.com",
		url: "https://www.textures.com/",
		category: "素材资源",
		lang: "en",
		desc: "海量 PBR 材质贴图库",
	},
	{
		id: "link-itchio-assets",
		title: "itch.io 素材区",
		url: "https://itch.io/game-assets",
		category: "素材资源",
		lang: "en",
		desc: "独立开发者的付费/免费游戏素材市场",
	},

	/* ===== 学习资源 ===== */
	{
		id: "link-learnopengl",
		title: "Learn OpenGL",
		url: "https://learnopengl.com/",
		category: "学习资源",
		lang: "en",
		desc: "现代 OpenGL 图形编程入门教程",
	},
	{
		id: "link-gp-patterns",
		title: "Game Programming Patterns",
		url: "https://gameprogrammingpatterns.com/",
		category: "学习资源",
		lang: "en",
		desc: "游戏编程设计模式在线全书",
	},
	{
		id: "link-redblob",
		title: "Red Blob Games",
		url: "https://www.redblobgames.com/",
		category: "学习资源",
		lang: "en",
		desc: "交互式游戏算法教程（寻路/噪声/几何等）",
	},
	{
		id: "link-lazyfoo",
		title: "Lazy Foo' SDL Tutorials",
		url: "https://lazyfoo.net/",
		category: "学习资源",
		lang: "en",
		desc: "SDL 2D 游戏编程入门教程",
	},
	{
		id: "link-gdc",
		title: "GDC Vault",
		url: "https://www.gdconf.com/",
		category: "学习资源",
		lang: "en",
		desc: "游戏开发者大会（GDC）演讲录像 & 幻灯片",
	},
	{
		id: "link-pikuma",
		title: "Pikuma",
		url: "https://pikuma.com/",
		category: "学习资源",
		lang: "en",
		desc: "游戏数学/物理/图形学底层教程",
	},

	/* ===== 社区 ===== */
	{
		id: "link-gamedevnet",
		title: "GameDev.net",
		url: "https://gamedev.net/",
		category: "社区",
		lang: "en",
		desc: "游戏开发者社区，论坛/文章/博客",
	},
	{
		id: "link-tigsource",
		title: "TIGSource",
		url: "https://www.tigsource.com/",
		category: "社区",
		lang: "en",
		desc: "独立游戏论坛，Devlog & 开发讨论",
	},
	{
		id: "link-reddit-gamedev",
		title: "r/gamedev",
		url: "https://www.reddit.com/r/gamedev/",
		category: "社区",
		lang: "en",
		desc: "Reddit 游戏开发社区，每日问答 & 分享",
	},
	{
		id: "link-gamedev-discord",
		title: "Game Dev League (Discord)",
		url: "https://discord.gg/gamedev",
		category: "社区",
		lang: "en",
		desc: "最大的游戏开发者 Discord 社区",
	},
	{
		id: "link-indienova",
		title: "indienova",
		url: "https://indienova.com/",
		category: "社区",
		lang: "zh",
		desc: "中文独立游戏社区，资讯/博客/开发日志",
	},
	{
		id: "link-qiita-game",
		title: "Qiita ゲーム開発",
		url: "https://qiita.com/tags/%E3%82%B2%E3%83%BC%E3%83%A0%E9%96%8B%E7%99%BA",
		category: "社区",
		lang: "ja",
		desc: "Qiita 上的游戏开发技术文章标签",
	},
];

/**
 * 所有工具/资源链接（静态数据源）
 * 在前端"网址"标签页中按分类展示
 */
export const linkSource: NewsSource = {
	name: "开发工具链接",
	lang: "all",
	fetch: async () => {
		return links.map((item) => ({
			id: item.id,
			title: item.title,
			url: item.url,
			sourceName: item.category,
			extra: {
				hover: item.desc,
				info: item.category,
			},
		}));
	},
};

/** 获取所有链接原始数据（供前端分组使用） */
export function getAllLinks(): LinkEntry[] {
	return links;
}

/** 按分类分组 */
export function getLinksByCategory(): Record<string, LinkEntry[]> {
	const groups: Record<string, LinkEntry[]> = {};
	for (const link of links) {
		if (!groups[link.category]) groups[link.category] = [];
		groups[link.category].push(link);
	}
	return groups;
}
