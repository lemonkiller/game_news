/**
 * GameDev.net 论坛最新帖子
 * 游戏开发综合论坛，500K+ 开发者社区
 * RSS: https://gamedev.net/forums/rss/
 */
import { fetchText } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

/** 解析 RSS XML 提取条目 */
function parseRSS(xml: string): Array<{
	title: string;
	link: string;
	pubDate: string;
	description: string;
}> {
	const items: Array<{
		title: string;
		link: string;
		pubDate: string;
		description: string;
	}> = [];

	// 简单的 XML 解析：提取 <item> 块
	const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
	let match: RegExpExecArray | null;

	while ((match = itemRegex.exec(xml)) !== null) {
		const block = match[1];
		const title =
			block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
			block.match(/<title>(.*?)<\/title>/)?.[1] ||
			"";
		const link = block.match(/<link>(.*?)<\/link>/)?.[1] || "";
		const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
		const desc =
			block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
			block.match(/<description>(.*?)<\/description>/)?.[1] ||
			"";
		if (title && link) {
			items.push({ title, link, pubDate, description: desc });
		}
	}

	return items;
}

export const gamedevnetForum: NewsSource = {
	name: "GameDev.net 论坛",
	lang: "en",
	category: "social",
	platform: "论坛",
	fetch: async () => {
		const xml = await fetchText("https://gamedev.net/forums/rss/");
		const items = parseRSS(xml);
		return items.slice(0, 15).map((item, i) => ({
			id: `gamedevnet-${i}-${Date.now()}`,
			title: item.title,
			url: item.link,
			pubDate: item.pubDate || new Date().toISOString(),
			extra: {
				hover: item.description
					? item.description.replace(/<[^>]*>/g, "").slice(0, 200)
					: undefined,
			},
		}));
	},
};
