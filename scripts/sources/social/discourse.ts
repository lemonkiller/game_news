/**
 * Discourse 论坛通用源工厂
 * Unity Discussions、Unreal Engine 论坛、Godot 论坛均基于 Discourse
 * Discourse 提供公开的 /latest.json API
 */
import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface DiscourseTopic {
	id: number;
	title: string;
	slug: string;
	created_at: string;
	bumped_at: string;
	last_poster_username: string;
	posts_count: number;
	reply_count: number;
	views: number;
}

interface DiscourseResponse {
	topic_list: {
		topics: DiscourseTopic[];
	};
}

/**
 * 创建一个 Discourse 论坛源
 * @param name 显示名称
 * @param baseUrl 论坛域名，如 "discussions.unity.com"
 * @param lang 语言
 * @param platform 平台分组名
 */
export function makeDiscourseSource(
	name: string,
	baseUrl: string,
	lang = "en",
	platform = "论坛",
): NewsSource {
	return {
		name,
		lang,
		category: "social" as const,
		platform,
		fetch: async () => {
			const data = await fetchJSON<DiscourseResponse>(
				`https://${baseUrl}/latest.json`,
			);
			return (data.topic_list?.topics || []).slice(0, 15).map((topic) => ({
				id: `discourse-${baseUrl}-${topic.id}`,
				title: topic.title,
				url: `https://${baseUrl}/t/${topic.slug}/${topic.id}`,
				pubDate: topic.bumped_at || topic.created_at,
				extra: {
					info: `${topic.reply_count} 回复 · ${topic.views} 浏览`,
					hover: `最后回复: ${topic.last_poster_username}`,
				},
			}));
		},
	};
}
