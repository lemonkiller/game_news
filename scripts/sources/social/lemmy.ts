import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface LemmyPost {
	post: {
		id: number;
		name: string;
		body?: string;
		url?: string;
		published: string;
		community_id: number;
	};
	community?: { name: string };
	counts?: {
		score: number;
		comments: number;
	};
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
		category: "social",
		platform: "Lemmy",
		fetch: async () => {
			const data = await fetchJSON<{ posts: LemmyPost[] }>(
				`https://${instance}/api/v3/post/list?community_name=${community}&limit=10&sort=Hot`,
			);
			return (data.posts || []).map((p) => {
				const pd = p.post;
				const counts = p.counts;
				const communityName = p.community?.name || community;
				// 始终链接到 Lemmy 讨论帖，避免外部链接导致显示混乱
				const externalUrl = pd.url;
				const score = counts?.score ?? 0;
				const comments = counts?.comments ?? 0;
				return {
					id: `lemmy-${pd.id}`,
					title: pd.name,
					url: `https://${instance}/post/${pd.id}`,
					pubDate: pd.published,
					extra: {
						info: externalUrl
							? `${communityName} · 外链: ${new URL(externalUrl).hostname} · ${score} 分 · ${comments} 评论`
							: `${communityName} · ${score} 分 · ${comments} 评论`,
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

export const lemmyUnity = makeLemmySource(
	"Lemmy Unity",
	"programming.dev",
	"unity",
);

export const lemmyGamedesign = makeLemmySource(
	"Lemmy 游戏设计",
	"programming.dev",
	"game_design",
);

export const lemmyWorldGamedev = makeLemmySource(
	"Lemmy 游戏开发（lemmy.world）",
	"lemmy.world",
	"gamedev",
);

export const lemmyWorldGodot = makeLemmySource(
	"Lemmy Godot（lemmy.world）",
	"lemmy.world",
	"godot",
);

export const lemmyWorldUnreal = makeLemmySource(
	"Lemmy Unreal Engine",
	"lemmy.world",
	"unrealengine",
);

export const lemmyWorldIndiegaming = makeLemmySource(
	"Lemmy 独立游戏",
	"lemmy.world",
	"indiegaming",
);

export const lemmyShitGamedev = makeLemmySource(
	"Lemmy 游戏开发（sh.itjust.works）",
	"sh.itjust.works",
	"gamedev",
);

export const lemmyShitUnreal = makeLemmySource(
	"Lemmy Unreal Engine（sh.itjust.works）",
	"sh.itjust.works",
	"unrealengine",
);
