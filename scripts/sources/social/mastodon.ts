import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface MastodonPost {
	id: string;
	url: string;
	content: string;
	created_at: string;
	account: {
		display_name: string;
		acct: string;
	};
	media_attachments: Array<{ type: string }>;
}

/** Mastodon 实例的公开本地时间线 */
export function makeMastodonSource(
	name: string,
	instance: string,
	lang = "en",
): NewsSource {
	return {
		name,
		lang,
		category: "social",
		platform: "Mastodon",
		fetch: async () => {
			const data = await fetchJSON<MastodonPost[]>(
				`https://${instance}/api/v1/timelines/public?limit=20&local=true`,
			);
			return data.map((post) => ({
				id: `mastodon-${post.id}`,
				title: post.content.replace(/<[^>]*>/g, "").slice(0, 100),
				url: post.url,
				pubDate: post.created_at,
				extra: {
					info: `${post.account.display_name || post.account.acct}`,
					hover:
						post.media_attachments.length > 0
							? `含 ${post.media_attachments.length} 个附件`
							: undefined,
				},
			}));
		},
	};
}

/** Mastodon 实例的指定标签时间线 */
export function makeMastodonTagSource(
	name: string,
	instance: string,
	tag: string,
	lang = "en",
): NewsSource {
	return {
		name,
		lang,
		category: "social",
		platform: "Mastodon",
		fetch: async () => {
			const data = await fetchJSON<MastodonPost[]>(
				`https://${instance}/api/v1/timelines/tag/${encodeURIComponent(tag)}?local=true&limit=20`,
			);
			return data.map((post) => ({
				id: `mastodon-${instance}-${tag}-${post.id}`,
				title: post.content.replace(/<[^>]*>/g, "").slice(0, 100),
				url: post.url,
				pubDate: post.created_at,
				extra: {
					info: `${post.account.display_name || post.account.acct} #${tag}`,
					hover:
						post.media_attachments.length > 0
							? `含 ${post.media_attachments.length} 个附件`
							: undefined,
				},
			}));
		},
	};
}

/** mastodon.gamedev.place 实例 */
export const mastodonGamedev = makeMastodonSource(
	"Mastodon 游戏开发",
	"mastodon.gamedev.place",
);

/** 标签搜索源 */
export const mastodonTagGamedev = makeMastodonTagSource(
	"Mastodon #gamedev",
	"mastodon.gamedev.place",
	"gamedev",
);
export const mastodonTagGodot = makeMastodonTagSource(
	"Mastodon #godot",
	"mastodon.gamedev.place",
	"godot",
);
export const mastodonTagUnity = makeMastodonTagSource(
	"Mastodon #unity",
	"mastodon.gamedev.place",
	"unity",
);
export const mastodonTagUnreal = makeMastodonTagSource(
	"Mastodon #unrealengine",
	"mastodon.gamedev.place",
	"unrealengine",
);
export const mastodonTagIndieDev = makeMastodonTagSource(
	"Mastodon #indiedev",
	"mastodon.gamedev.place",
	"indiedev",
);

