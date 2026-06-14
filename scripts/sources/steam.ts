import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText, fetchJSON } from "../utils/fetcher";
import type { NewsSource, NewsItem } from "../utils/types";

/** RSS 方式抓取 Steam 榜单 */
async function fetchRSS(url: string): Promise<NewsItem[]> {
	const xml = await fetchText(url);
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
}

/** API 方式抓取 Steam 榜单（按地区） */
async function fetchSteamCategory(
	cc: string,
	category: string,
): Promise<NewsItem[]> {
	try {
		const data = await fetchJSON<any>(
			"https://store.steampowered.com/api/featuredcategories?cc=" + cc,
		);
		const cat = data[category] || data.specials;
		if (!cat || !cat.items) return [];
		return cat.items.slice(0, 10).map((item: any) => ({
			id: String(item.id),
			title: item.name,
			url: "https://store.steampowered.com/app/" + item.id,
			extra: {
				info: item.discounted ? (item.final_price / 100).toFixed(2) + "元" : "",
			},
		}));
	} catch {
		return [];
	}
}

export const steamTopSellers: NewsSource = {
	name: "Steam 热销",
	lang: "steam",
	fetch: () => fetchRSS("https://store.steampowered.com/feeds/topsellers.xml"),
};

export const steamNewReleases: NewsSource = {
	name: "Steam 新品",
	lang: "steam",
	fetch: () => fetchRSS("https://store.steampowered.com/feeds/newreleases.xml"),
};

export const steamSpecials: NewsSource = {
	name: "Steam 特惠",
	lang: "steam",
	fetch: () => fetchRSS("https://store.steampowered.com/feeds/specials.xml"),
};

export const steamComingSoon: NewsSource = {
	name: "Steam 即将推出",
	lang: "steam",
	fetch: () => fetchSteamCategory("CN", "coming_soon"),
};

export const steamTopCN: NewsSource = {
	name: "Steam 热销 (CN)",
	lang: "steam",
	fetch: () => fetchSteamCategory("CN", "top_sellers"),
};

export const steamTopUS: NewsSource = {
	name: "Steam 热销 (US)",
	lang: "steam",
	fetch: () => fetchSteamCategory("US", "top_sellers"),
};

export const steamTopJP: NewsSource = {
	name: "Steam 热销 (JP)",
	lang: "steam",
	fetch: () => fetchSteamCategory("JP", "top_sellers"),
};
