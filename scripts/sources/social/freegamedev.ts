/**
 * FreeGameDev.net - 开源游戏开发论坛
 * Flarum 框架，提供公开 JSON API
 * API: https://freegamedev.net/api/discussions
 */
import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface FreeGameDevItem {
	id: string;
	attributes: {
		title: string;
		slug: string;
		commentCount: number;
		lastPostedAt: string;
		createdAt: string;
	};
	relationships?: {
		user?: {
			data?: {
				id?: string;
			};
		};
	};
}

interface FreeGameDevResponse {
	data: FreeGameDevItem[];
	links?: {
		next?: string;
	};
}

export const freeGameDev: NewsSource = {
	name: "FreeGameDev.net",
	lang: "en",
	category: "social",
	platform: "论坛",
	fetch: async () => {
		const data = await fetchJSON<FreeGameDevResponse>(
			"https://freegamedev.net/api/discussions",
		);
		return (data.data || []).slice(0, 15).map((item) => ({
			id: `freegamedev-${item.id}`,
			title: item.attributes.title,
			url: `https://freegamedev.net/d/${item.id}/${item.attributes.slug}`,
			pubDate: item.attributes.lastPostedAt || item.attributes.createdAt,
			extra: {
				info: `${item.attributes.commentCount} 评论`,
			},
		}));
	},
};
