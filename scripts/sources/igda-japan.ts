import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";
export const igdaJapan: NewsSource = {
	name: "IGDA Japan",
	lang: "ja",
	fetch: async () => {
		const xml = await fetchText("https://igda.jp/feed/");
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
