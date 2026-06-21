import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface LemmyPost {
	post: {
		id: number;
		name: string;
		body?: string;
		url?: string;
		score: number;
		num_comments: number;
		published: string;
		community_name?: string;
		community?: { name: string };
	};
	community?: { name: string };
}

/** Lemmy 实例上的某个社区 */
export function makeLemmySource(
	name: string,
	instance: string,
	community: string,
): NewsSource {
	return {
		name,
		lang: "en",
		fetch: async () => {
			const data = await fetchJSON<{ posts: LemmyPost[] }>(
				`https://${instance}/api/v3/post/list?community_name=${community}&limit=25limit=10&sort=Hotsort=Hot`,
			);
			return (data.posts || []).map((p) => {
				const pd = p.post;
				const communityName =
					p.community?.name || pd.community_name || community;
				return {
					id: `lemmy-${pd.id}`,
					title: pd.name,
					url: pd.url || `https://${instance}/post/${pd.id}`,
					pubDate: pd.published,
					extra: {
						info: `${communityName} · ${pd.score} 分 · ${pd.num_comments} 评论`,
						hover: pd.body
							? pd.body.replace(/<[^>]*>/g, "").slice(0, 200)
							: undefined,
					},
				};
			});
		},
	};
}

export const lemmyGamedev = makeLemmySource(
	"Lemmy 游戏开发",
	"programming.dev",
	"gamedev",
);

export const lemmyGodot = makeLemmySource(
	"Lemmy Godot",
	"programming.dev",
	"godot",
);
