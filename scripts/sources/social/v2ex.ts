/**
 * V2EX 游戏开发节点 - 最新主题
 * 中文开发者社区（750K+ 用户）
 * 经典 API: https://www.v2ex.com/api/topics/show.json?node_name=gamedev
 */
import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface V2EXNode {
	name: string;
	title: string;
}

interface V2EXTopic {
	id: number;
	title: string;
	url: string;
	created: number;
	replies: number;
	node: V2EXNode;
	member: {
		username: string;
	};
}

export const v2exGameDev: NewsSource = {
	name: "V2EX 游戏开发",
	lang: "zh",
	category: "social",
	platform: "V2EX",
	fetch: async () => {
		const data = await fetchJSON<V2EXTopic[]>(
			"https://www.v2ex.com/api/topics/show.json?node_name=gamedev",
		);
		return (data || []).slice(0, 15).map((topic) => ({
			id: `v2ex-gamedev-${topic.id}`,
			title: topic.title,
			url: topic.url,
			pubDate: new Date(topic.created * 1000).toISOString(),
			extra: {
				info: `${topic.replies} 回复`,
				hover: `作者: ${topic.member.username} · ${topic.node.title}`,
			},
		}));
	},
};
