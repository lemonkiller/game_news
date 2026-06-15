import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
	getTextContent,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";
export const blogOwleat: NewsSource = {
	name: "狐王驾虎",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://www.cnblogs.com/OwlCat/rss");
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
