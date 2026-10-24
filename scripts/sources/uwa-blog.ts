import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** UWA 博客（侑虎科技）：Unity 移动端性能优化中文权威 */
export const uwaBlog: NewsSource = {
	name: "UWA 博客",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://blog.uwa4d.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
