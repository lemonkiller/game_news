import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
	getTextContent,
	decodeEntities,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";

/** Bevy 官方博客（bevy.org，原 bevyengine.org 已 301 迁移） */
export const bevy: NewsSource = {
	name: "Bevy Engine",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://bevy.org/atom.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: decodeEntities(item.title),
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(decodeEntities(getTextContent(item.description))).slice(0, 200)
					: undefined,
			},
		}));
	},
};
