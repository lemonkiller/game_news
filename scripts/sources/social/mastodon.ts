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

/** Mastodon 实例的公开时间线 */
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
				`https://${instance}/api/v1/timelines/public?limit=50limit=20&local=truelocal=true`,
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

export const mastodonGamedev = makeMastodonSource(
	"Mastodon 游戏开发",
	"mastodon.gamedev.place",
);
