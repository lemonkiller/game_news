import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";
export const zengrong: NewsSource = {
	name: "增荣博客",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://blog.zengrong.net/index.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};
