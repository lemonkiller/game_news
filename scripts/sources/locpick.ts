import { parseRSS, getGUID, stripHtml } from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";

/** Locpick Blog —— 专注于游戏本地化的技术博客（RSS） */
export const locpick: NewsSource = {
	name: "Locpick Blog",
	lang: "en",
	category: "news",
	fetch: async () => {
		const xml = await fetchText("https://locpick.com/blog/feed.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: "游戏本地化技术博客",
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};
