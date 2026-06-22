/**
 * Lobste.rs 游戏开发相关文章
 * 公开 JSON API: https://lobste.rs/t/games.json
 */
import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface LobstersItem {
	short_id: string;
	title: string;
	url: string;
	score: number;
	comment_count: number;
	description: string;
	description_plain: string;
	tags: string[];
	created_at: string;
	comments_url: string;
}

/** Lobste.rs games 标签下的热门文章 */
export const lobstersGameDev: NewsSource = {
	name: "Lobsters 游戏开发",
	lang: "en",
	category: "social",
	platform: "Lobste.rs",
	fetch: async () => {
		const data = await fetchJSON<LobstersItem[]>(
			"https://lobste.rs/t/games.json",
		);
		return (data || []).slice(0, 15).map((item) => ({
			id: `lobsters-${item.short_id}`,
			title: item.title,
			url: item.url || item.comments_url,
			pubDate: item.created_at,
			extra: {
				info: `${item.score} 分 · ${item.comment_count} 评论 · ${item.tags.join(", ")}`,
				hover: item.description_plain
					? item.description_plain.slice(0, 200)
					: undefined,
			},
		}));
	},
};
