import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/**
 * AI 游戏开发专题源
 */
export const aiGamechangers: NewsSource = {
	name: "AI Gamechangers",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://aigamechangers.substack.com/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

export const aiAndGames: NewsSource = {
	name: "AI and Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.aiandgames.com/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

export const nvidiaGameDev: NewsSource = {
	name: "NVIDIA Game Dev",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://developer.nvidia.com/blog/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};
