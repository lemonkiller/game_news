// 游戏 AI 信息源——行为树、GOAP、HTN、状态机、寻路等
// 注意：这是游戏 AI（NPC/敌人决策），不是大模型 AI
import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Mick West - 游戏 AI 博客，专注行为树/状态机/寻路/FPS AI */
export const mickWest: NewsSource = {
	name: "Mick West",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://mickwest.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Qiita gameai - 日文游戏 AI 技术文章 */
export const qiitaGameAI: NewsSource = {
	name: "Qiita game AI",
	lang: "ja",
	category: "social",
	platform: "Qiita",
	fetch: async () => {
		const xml = await fetchText("https://qiita.com/tags/gameai/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** wpbox.dev - GOAP/游戏 AI 编程博客 */
export const wpboxDev: NewsSource = {
	name: "wpbox.dev",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://wpbox.dev/feed.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
