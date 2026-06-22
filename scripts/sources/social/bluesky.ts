import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface BlueskyPost {
	uri: string;
	author: {
		handle: string;
		displayName?: string;
	};
	record: {
		text: string;
		createdAt: string;
	};
	likeCount?: number;
	replyCount?: number;
}

/** Bluesky 公开搜索 API */
export function makeBlueskySource(name: string, query: string): NewsSource {
	return {
		name,
		lang: "en",
		category: "social",
		platform: "Bluesky",
		fetch: async () => {
			const data = await fetchJSON<{ posts: BlueskyPost[] }>(
				`https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(query)}&limit=50`,
			);
			return (data.posts || []).map((post) => {
				const author = post.author.displayName || post.author.handle;
				return {
					id: post.uri,
					title: post.record.text.slice(0, 120),
					url: `https://bsky.app/profile/${post.author.handle}/post/${post.uri.split("/").pop()}`,
					pubDate: post.record.createdAt,
					extra: {
						info: `${author} · 💙${post.likeCount || 0} 💬${post.replyCount || 0}`,
						hover: `Bluesky · @${post.author.handle}`,
					},
				};
			});
		},
	};
}

export const blueskyGameDev = makeBlueskySource(
	"Bluesky 游戏开发",
	"game development",
);
