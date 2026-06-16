import { fetchJSON } from "../utils/fetcher";
import type { NewsSource, NewsItem } from "../utils/types";

async function fetchCategory(
	cc: string,
	category: string,
): Promise<NewsItem[]> {
	try {
		const data = await fetchJSON<any>(
			"https://store.steampowered.com/api/featuredcategories?cc=" + cc,
		);
		const cat = data[category] || data.specials;
		if (!cat || !cat.items) return [];
		return cat.items.map((item: any) => ({
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

// Steam 总榜（CN 区）
export const steamTopSellers: NewsSource = {
	name: "Steam 热销",
	lang: "steam",
	fetch: () => fetchCategory("CN", "top_sellers"),
};
export const steamNewReleases: NewsSource = {
	name: "Steam 新品",
	lang: "steam",
	fetch: () => fetchCategory("CN", "new_releases"),
};
export const steamSpecials: NewsSource = {
	name: "Steam 特惠",
	lang: "steam",
	fetch: () => fetchCategory("CN", "specials"),
};
export const steamComingSoon: NewsSource = {
	name: "Steam 即将推出",
	lang: "steam",
	fetch: () => fetchCategory("CN", "coming_soon"),
};
