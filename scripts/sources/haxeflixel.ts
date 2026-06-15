import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
	getTextContent,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";
export const haxeFlixel: NewsSource = {
	name: "HaxeFlixel",
	lang: "engine",
	fetch: async () => {
		const xml = await fetchText("https://haxeflixel.com/feed.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: {
				info: relativeTime(item.pubDate),
				hover: (() => {
					const desc = getTextContent(item.description);
					return desc ? stripHtml(desc).slice(0, 200) : undefined;
				})(),
			},
		}));
	},
};
