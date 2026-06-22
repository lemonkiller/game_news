/**
 * Game Development Stack Exchange - 最新问答
 * Stack Exchange API v2.3，无需认证即可读取（300 次/天）
 * site=gamedev 对应 gamedev.stackexchange.com
 */
import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface GDSEItem {
	question_id: number;
	title: string;
	link: string;
	creation_date: number;
	score: number;
	answer_count: number;
	view_count: number;
	tags: string[];
	owner?: {
		display_name: string;
	};
}

interface GDSEResponse {
	items: GDSEItem[];
}

export const gdseQuestions: NewsSource = {
	name: "GDSE 最新问答",
	lang: "en",
	category: "social",
	platform: "论坛",
	fetch: async () => {
		const data = await fetchJSON<GDSEResponse>(
			"https://api.stackexchange.com/2.3/questions?order=desc&sort=creation&site=gamedev&pagesize=15&filter=withbody",
		);
		return (data.items || []).map((item) => ({
			id: `gdse-${item.question_id}`,
			title: item.title,
			url: item.link,
			pubDate: new Date(item.creation_date * 1000).toISOString(),
			extra: {
				info: `${item.score} 分 · ${item.answer_count} 回答 · ${item.tags.slice(0, 3).join(", ")}`,
				hover: item.owner?.display_name
					? `提问者: ${item.owner.display_name}`
					: undefined,
			},
		}));
	},
};
