import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/**
 * 游戏开发工具类源
 * GPU 调试/性能分析、资产管线、引擎工具等
 */

/**
 * AMD GPUOpen - GPU 渲染、图形调试、性能分析工具
 */
export const amdGpuOpen: NewsSource = {
	name: "AMD GPUOpen",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://gpuopen.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

/**
 * Blender Developers Blog - Blender 开发进展，资产管线工具
 */
export const blenderDevBlog: NewsSource = {
	name: "Blender Dev Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://code.blender.org/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/**
 * Game Dev Digest - Unity 开发工具每周摘要
 */
export const gameDevDigest: NewsSource = {
	name: "Game Dev Digest",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://dev.to/feed/gamedevdigest");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
