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
		desc: "专业的像素画 & 精灵动图编辑器，支持图层/帧动画/调色板，Steam 有售",
	},
	{
		id: "link-tiled",
		title: "Tiled",
		url: "https://www.mapeditor.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "免费灵活的 2D 网格地图编辑器，支持正交/等距/六边形地图，多引擎导出",
	},
	{
		id: "link-spine",
		title: "Spine",
		url: "http://esotericsoftware.com/",
		category: "图形/美术工具",
		lang: "en",
		desc: "2D 骨骼动画编辑器，被 Unity/UE/Godot/Cocos 等主流引擎广泛集成",
	},
	{
		id: "link-texturepacker",
		title: "TexturePacker",
		url: "https://www.codeandweb.com/texturepacker",
		category: "图形/美术工具",
		lang: "en",
		desc: "Sprite 帧图打包 & 图集优化工具，支持 Unity/UE/Cocos/Phaser 等引擎导出",
	},
	{
		id: "link-pyxeledit",
		title: "PyxelEdit",
		url: "http://pyxeledit.com/",
		category: "图形/美术工具",
		lang: "en",
		desc: "专为像素画设计的编辑器，内置瓷砖地图编辑 & 逐帧动画功能",
	},
	{
		id: "link-piskel",
		title: "Piskel",
		url: "https://www.piskelapp.com/",
		category: "图形/美术工具",
		lang: "en",
		desc: "免费在线像素画编辑器，无需安装即可制作精灵图和逐帧动画",
	},
	{
		id: "link-blender",
		title: "Blender",
		url: "https://www.blender.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "开源 3D 建模/雕刻/材质/动画/渲染/合成全流程，游戏资产管线标配",
	},
	{
		id: "link-krita",
		title: "Krita",
		url: "https://krita.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "开源数字绘画软件，笔刷引擎强大，适合游戏概念设计与材质贴图绘制",
	},
	{
		id: "link-material-maker",
		title: "Material Maker",
		url: "https://www.materialmaker.org/",
		category: "图形/美术工具",
		lang: "en",
		desc: "开源节点式 PBR 材质生成工具，类似 Substance Designer，可导出到 Godot/UE",
	},

	/* ===== 音频工具 ===== */
	{
		id: "link-lmms",
		title: "LMMS",
		url: "https://lmms.io/",
		category: "音频工具",
		lang: "en",
		desc: "开源数字音频工作站（DAW），支持 MIDI/VST/LADSPA，可制作游戏配乐",
	},
	{
		id: "link-audacity",
		title: "Audacity",
		url: "https://www.audacityteam.org/",
		category: "音频工具",
		lang: "en",
		desc: "免费开源音频录制 & 多轨编辑，用于游戏音效剪辑/去噪/格式转换",
	},
	{
		id: "link-boscaceoil",
		title: "Bosca Ceoil",
		url: "https://boscaceoil.net/",
		category: "音频工具",
		lang: "en",
		desc: "蓝调音乐作曲工具，初学者友好，可快速生成循环背景音乐旋律",
	},
	{
		id: "link-sfxr",
		title: "sfxr / jsfxr",
		url: "https://sfxr.me/",
		category: "音频工具",
		lang: "en",
		desc: "在线 8bit/16bit 游戏音效生成器，调节参数即时试听并导出 WAV",
	},
	{
		id: "link-musescore",
		title: "MuseScore",
		url: "https://musescore.org/",
		category: "音频工具",
		lang: "en",
		desc: "开源乐谱编辑器，可谱写 MIDI 并导出为音频文件或印刷式乐谱 PDF",
	},

	/* ===== 素材资源 ===== */
	{
		id: "link-opengameart",
		title: "OpenGameArt",
		url: "https://opengameart.org/",
		category: "素材资源",
		lang: "en",
		desc: "最大的免费游戏美术库，含精灵/纹理/模型/音效，多种 CC 许可证",
	},
	{
		id: "link-freesound",
		title: "Freesound",
		url: "https://freesound.org/",
		category: "素材资源",
		lang: "en",
		desc: "CC 许可音效共享平台，收录数万条真实世界录音和合成音效片段",
	},
	{
		id: "link-game-icons",
		title: "Game-Icons.net",
		url: "https://game-icons.net/",
		category: "素材资源",
		lang: "en",
		desc: "数千款免费可商用游戏 SVG 图标，支持按颜色/大小批量导出",
	},
	{
		id: "link-kenney",
		title: "Kenney Assets",
		url: "https://kenney.nl/",
		category: "素材资源",
		lang: "en",
		desc: "高质量免费游戏素材包（CC0），涵盖 UI/图标/角色/环境/字体等",
	},
	{
		id: "link-textures",
		title: "Textures.com",
		url: "https://www.textures.com/",
		category: "素材资源",
		lang: "en",
		desc: "海量 PBR 材质贴图库，涵盖各类地面/墙面/金属/木纹等游戏材质",
	},
	{
		id: "link-itchio-assets",
		title: "itch.io 素材区",
		url: "https://itch.io/game-assets",
		category: "素材资源",
		lang: "en",
		desc: "独立开发者交易平台，数千款付费/免费游戏素材涵盖 2D/3D/音频/代码",
	},

	/* ===== 学习资源 ===== */
	{
		id: "link-learnopengl",
		title: "Learn OpenGL",
		url: "https://learnopengl.com/",
		category: "学习资源",
		lang: "en",
		desc: "现代 OpenGL 图形编程入门教程，从 shader 到 PBR 渲染一应俱全",
	},
	{
		id: "link-gp-patterns",
		title: "Game Programming Patterns",
		url: "https://gameprogrammingpatterns.com/",
		category: "学习资源",
		lang: "en",
		desc: "游戏编程设计模式在线全书，涵盖命令/观察者/对象池/状态机等经典模式",
	},
	{
		id: "link-redblob",
		title: "Red Blob Games",
		url: "https://www.redblobgames.com/",
		category: "学习资源",
		lang: "en",
		desc: "交互式可视化游戏算法教程，A* 寻路/六边形网格/程序化生成等",
	},
	{
		id: "link-lazyfoo",
		title: "Lazy Foo' SDL",
		url: "https://lazyfoo.net/",
		category: "学习资源",
		lang: "en",
		desc: "SDL 2D 游戏编程入门教程，从窗口创建到粒子系统，完整 C++ 指南",
	},
	{
		id: "link-gdc",
		title: "GDC Vault",
		url: "https://www.gdconf.com/",
		category: "学习资源",
		lang: "en",
		desc: "游戏开发者大会演讲录像与幻灯片，了解游戏工业最新实践的第一现场",
	},
	{
		id: "link-pikuma",
		title: "Pikuma",
		url: "https://pikuma.com/",
		category: "学习资源",
		lang: "en",
		desc: "游戏数学/物理/图形学底层原理教程，从零实现软渲染器和游戏引擎",
	},

	/* ===== 社区 ===== */
	{
		id: "link-gamedevnet",
		title: "GameDev.net",
		url: "https://gamedev.net/",
		category: "社区",
		lang: "en",
		desc: "老牌游戏开发者社区，活跃论坛/技术文章/博客/资源分享",
	},
	{
		id: "link-tigsource",
		title: "TIGSource",
		url: "https://www.tigsource.com/",
		category: "社区",
		lang: "en",
		desc: "经典独立游戏论坛，开发者发布 Devlog 与开发讨论的首选地之一",
	},
	{
		id: "link-reddit-gamedev",
		title: "r/gamedev",
		url: "https://www.reddit.com/r/gamedev/",
		category: "社区",
		lang: "en",
		desc: "Reddit 最大的游戏开发社区，每日海量问答/经验分享/作品展示",
	},
	{
		id: "link-gamedev-discord",
		title: "Game Dev League",
		url: "https://discord.gg/gamedev",
		category: "社区",
		lang: "en",
		desc: "Discord 上最大的游戏开发者社群，按引擎/工种分频道讨论",
	},
	{
		id: "link-indienova",
		title: "indienova",
		url: "https://indienova.com/",
		category: "社区",
		lang: "zh",
		desc: "中文独立游戏社区，提供资讯/开发日志/游戏素材资源等综合信息",
	},
	{
		id: "link-qiita-game",
		title: "Qiita ゲーム開発",
		url: "https://qiita.com/tags/%E3%82%B2%E3%83%BC%E3%83%A0%E9%96%8B%E7%99%BA",
		category: "社区",
		lang: "ja",
		desc: "日本最大技术博客平台上的游戏开发标签，收录大量 Unity/UE 实战文章",
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

/** 按分类分组 */
export function getLinksByCategory(): Record<string, LinkEntry[]> {
	const groups: Record<string, LinkEntry[]> = {};
	for (const link of links) {
		if (!groups[link.category]) groups[link.category] = [];
		groups[link.category].push(link);
	}
	return groups;
}
