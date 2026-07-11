import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Mohawk Games Old World 4X 策略游戏开发博客 */
export const oldWorldBlog: NewsSource = {
	name: "Old World 开发博客",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://mohawkgames.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
