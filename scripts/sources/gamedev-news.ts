import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/**
 * 行业综合新闻源（游戏开发相关）
 */

export const unrealBlog: NewsSource = {
	name: "Unreal Engine Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.unrealengine.com/rss");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};



/**
 * Grid Sage Games - 独立游戏开发博客
 * 作者 Josh Ge，作品 Cogmind，深入游戏设计/开发
 */
export const gridSageGames: NewsSource = {
	name: "Grid Sage Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.gridsagegames.com/blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
