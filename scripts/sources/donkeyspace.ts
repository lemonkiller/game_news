/**
 * Donkeyspace (Frank Lantz)
 * RSS: https://franklantz.substack.com/feed
 * NYU Game Center 主任，AI 游戏设计理论深度文章
 */
import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

export const donkeyspace: NewsSource = {
	name: "Donkeyspace",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://franklantz.substack.com/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
