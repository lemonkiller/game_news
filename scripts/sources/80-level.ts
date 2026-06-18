import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";
export const eightyLevel: NewsSource = {
	name: "80 Level",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://80.lv/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 20).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};
