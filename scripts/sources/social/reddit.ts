import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface RedditPost {
	data: {
		title: string;
		permalink: string;
		url: string;
		score: number;
		num_comments: number;
		created_utc: number;
		subreddit: string;
		domain: string;
	};
}

/** Reddit 游戏开发子版块（在 GH Actions 中可正常抓取） */
export function makeRedditSource(
	name: string,
	subreddit: string,
	type: "hot" | "new" | "top" = "hot",
): NewsSource {
	return {
		name,
		lang: "en",
		category: "social",
		platform: "论坛",
		fetch: async () => {
			const data = await fetchJSON<{ data: { children: RedditPost[] } }>(
				`https://www.reddit.com/r/${subreddit}/${type}.json?limit=15`,
			);
			return data.data.children.map((post) => ({
				id: `reddit-${subreddit}-${post.data.created_utc}`,
				title: post.data.title,
				url: `https://reddit.com${post.data.permalink}`,
				pubDate: new Date(post.data.created_utc * 1000).toISOString(),
				extra: {
					info: `r/${post.data.subreddit} · ${post.data.score} 分 · ${post.data.num_comments} 评论`,
					hover: post.data.domain,
				},
			}));
		},
	};
}

export const redditGameDev = makeRedditSource("Reddit r/gamedev", "gamedev");
export const redditGodot = makeRedditSource("Reddit r/godot", "godot");
export const redditUnity3D = makeRedditSource("Reddit r/Unity3D", "Unity3D");
export const redditUnreal = makeRedditSource(
	"Reddit r/unrealengine",
	"unrealengine",
);
