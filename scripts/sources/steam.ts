import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";

export const steamTopSellers: NewsSource = {
	name: "Steam 热销",
	lang: "steam",
	fetch: async () => {
		const xml = await fetchText(
			"https://store.steampowered.com/feeds/topsellers.xml",
		);
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
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

export const steamNewReleases: NewsSource = {
	name: "Steam 新品",
	lang: "steam",
	fetch: async () => {
		const xml = await fetchText(
			"https://store.steampowered.com/feeds/newreleases.xml",
		);
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
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

export const steamSpecials: NewsSource = {
	name: "Steam 特惠",
	lang: "steam",
	fetch: async () => {
		const xml = await fetchText(
			"https://store.steampowered.com/feeds/specials.xml",
		);
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: item.description ? item.description.slice(0, 80) : "" },
		}));
	},
};
