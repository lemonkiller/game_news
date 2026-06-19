import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";

export const orfeasEl: NewsSource = {
	name: "Orfeas Eleftheriou",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.orfeasel.com/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};

export const ogre3d: NewsSource = {
	name: "Ogre3D",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.ogre3d.org/feed");
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};

export const nvidiaUe: NewsSource = {
	name: "NVIDIA Unreal Engine",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText(
			"https://developer.nvidia.com/blog/tag/unreal-engine/feed/",
		);
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};

/** Zenn（日本技术博客平台）的各引擎标签 */
function makeZennSource(name: string, tag: string): NewsSource {
	return {
		name,
		lang: "ja",
		fetch: async () => {
			const xml = await fetchText(`https://zenn.dev/topics/${tag}/feed`);
			const items = parseRSS(xml);
			return items.slice(0, 10).map((item) => ({
				id: getGUID(item),
				title: item.title,
				url: item.link,
				pubDate: item.pubDate,
				extra: {
					info: relativeTime(item.pubDate),
					hover: item.description
						? stripHtml(item.description).slice(0, 200)
						: undefined,
				},
			}));
		},
	};
}

export const zennGameEngine = makeZennSource("Zenn 游戏引擎", "gameengine");
export const zennUnreal = makeZennSource("Zenn UnrealEngine", "unrealengine");
export const zennGodot = makeZennSource("Zenn Godot", "godot");
export const zennUnity = makeZennSource("Zenn Unity", "unity");
export const zennBevy = makeZennSource("Zenn Bevy", "bevy");

/** dev.to 各引擎标签——仅限引擎编程/图形相关的高技术密度标签 */
function makeDevToSource(name: string, tag: string): NewsSource {
	return {
		name,
		lang: "en",
		fetch: async () => {
			const xml = await fetchText(`https://dev.to/feed/tag/${tag}`);
			const items = parseRSS(xml);
			return items.slice(0, 10).map((item) => ({
				id: getGUID(item),
				title: item.title,
				url: item.link,
				pubDate: item.pubDate,
				extra: {
					info: relativeTime(item.pubDate),
					hover: item.description
						? stripHtml(item.description).slice(0, 200)
						: undefined,
				},
			}));
		},
	};
}

export const devtoGameEngine = makeDevToSource("Dev.to 游戏引擎", "gameengine");
export const devtoGodot = makeDevToSource("Dev.to Godot", "godot");
export const devtoUnreal = makeDevToSource("Dev.to Unreal", "unrealengine");
export const devtoUnity = makeDevToSource("Dev.to Unity", "unity");
export const devtoRendering = makeDevToSource("Dev.to 渲染", "rendering");
export const devtoVulkan = makeDevToSource("Dev.to Vulkan", "vulkan");
export const devtoWebGPU = makeDevToSource("Dev.to WebGPU", "webgpu");
export const devtoOpenGL = makeDevToSource("Dev.to OpenGL", "opengl");
