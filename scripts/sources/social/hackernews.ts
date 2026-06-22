import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface HNItem {
	objectID: string;
	title: string;
	url?: string;
	points: number;
	num_comments: number;
	author: string;
	created_at: string;
}

/** Hacker News 游戏开发相关文章（使用 Algolia 公开 API） */
export const hackerNewsGameDev: NewsSource = {
	name: "Hacker News 游戏开发",
	lang: "en",
	category: "social",
	platform: "Hacker News",
	fetch: async () => {
		const data = await fetchJSON<{ hits: HNItem[] }>(
			"https://hn.algolia.com/api/v1/search?query=game+development&tags=story&hitsPerPage=25",
		);
		return data.hits.map((item) => ({
			id: `hn-${item.objectID}`,
			title: item.title,
			url: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`,
			pubDate: item.created_at,
			extra: {
				info: `${item.points} 分 · ${item.num_comments} 评论`,
				hover: `作者: ${item.author}`,
			},
		}));
	},
};

/** Hacker News Show HN 游戏项目 */
export const hackerNewsShow: NewsSource = {
	name: "HN Show 游戏",
	lang: "en",
	category: "social",
	platform: "Hacker News",
	fetch: async () => {
		const data = await fetchJSON<{ hits: HNItem[] }>(
			"https://hn.algolia.com/api/v1/search?query=game&tags=show_hn&hitsPerPage=25",
		);
		return data.hits.map((item) => ({
			id: `hn-show-${item.objectID}`,
			title: item.title,
			url: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`,
			pubDate: item.created_at,
			extra: {
				info: `${item.points} 分 · ${item.num_comments} 评论`,
				hover: `作者: ${item.author}`,
			},
		}));
	},
};
