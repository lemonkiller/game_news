import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

// ===== 原有游戏开发工具源 =====

export const amdGpuOpen: NewsSource = {
	name: "AMD GPUOpen",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://gpuopen.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

export const blenderDevBlog: NewsSource = {
	name: "Blender Dev Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://code.blender.org/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

// Game Dev Digest 已移除——基于 dev.to，明确不要 (2026-06)

export const blenderNews: NewsSource = {
	name: "Blender News",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.blender.org/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

// ===== 通用开发工具源（游戏开发也能用得上） =====

/** VS Code Blog - 微软代码编辑器更新、扩展生态、AI 功能 */
export const vsCodeBlog: NewsSource = {
	name: "VS Code Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://code.visualstudio.com/feed.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** GitHub Blog - 版本管理、CI/CD、协作工具更新 */
export const githubBlog: NewsSource = {
	name: "GitHub Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://github.blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** JetBrains Blog - IDE 全家桶更新、开发工具趋势 */
export const jetbrainsBlog: NewsSource = {
	name: "JetBrains Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://blog.jetbrains.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Stack Overflow Blog - 开发者社区趋势、技术调研 */
export const stackOverflowBlog: NewsSource = {
	name: "Stack Overflow Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://stackoverflow.blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Pragmatic Engineer - 大型科技公司工程实践、技术栈分析 */
export const pragmaticEngineer: NewsSource = {
	name: "Pragmatic Engineer",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://blog.pragmaticengineer.com/rss/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
