import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";
export const youxituoluo: NewsSource = {
	name: "游戏陀螺",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://www.youxituoluo.com/feed");
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
