import { fetchJSON } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

interface GHRelease {
	tag_name: string;
	name: string;
	html_url: string;
	published_at: string;
	body?: string;
	author: { login: string };
}

/** GitHub 仓库的最新 Release */
export function makeGitHubReleaseSource(
	name: string,
	owner: string,
	repo: string,
): NewsSource {
	return {
		name,
		lang: "en",
		category: "social",
		platform: "GitHub",
		fetch: async () => {
			const releases = await fetchJSON<GHRelease[]>(
				`https://api.github.com/repos/${owner}/${repo}/releases?per_page=10`,
			);
			return releases.map((r) => ({
				id: `gh-${owner}-${repo}-${r.tag_name}`,
				title: `${r.name || r.tag_name}`,
				url: r.html_url,
				pubDate: r.published_at,
				extra: {
					info: `${owner}/${repo}`,
					hover: r.body
						? r.body.replace(/<[^>]*>/g, "").slice(0, 200)
						: undefined,
				},
			}));
		},
	};
}

/** GitHub 搜索近期活跃的游戏开发仓库（按最近更新排序） */
export function makeGitHubTrendingSource(name: string): NewsSource {
	return {
		name,
		lang: "en",
		category: "social",
		platform: "GitHub",
		fetch: async () => {
			// 搜索近期活跃的游戏开发仓库：含 topic 或关键词，仅限今年有更新的
			const queries = [
				"topic:game-development sort:updated-desc",
				"topic:game-engine sort:stars-desc",
				"topic:game+framework pushed:>2026-01-01 sort:stars-desc",
			];
			const results: Array<{
				full_name: string;
				html_url: string;
				description: string | null;
				stargazers_count: number;
				updated_at: string;
				pushed_at: string;
				owner: { login: string };
			}> = [];
			const seen = new Set<string>();

			for (const q of queries) {
				try {
					const data = await fetchJSON<{
						items: Array<{
							full_name: string;
							html_url: string;
							description: string | null;
							stargazers_count: number;
							updated_at: string;
							pushed_at: string;
							owner: { login: string };
						}>;
					}>(
						`https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&per_page=20`,
					);
					for (const r of data.items) {
						if (!seen.has(r.full_name)) {
							seen.add(r.full_name);
							results.push(r);
						}
					}
				} catch {
					/* 单个查询失败不阻塞整体 */
				}
			}

			return results.slice(0, 15).map((r) => ({
				id: `gh-trend-${r.full_name}`,
				title: `${r.full_name} — ${(r.description || "").slice(0, 80)}`,
				url: r.html_url,
				pubDate: r.pushed_at || r.updated_at,
				extra: {
					info: `⭐${r.stargazers_count}`,
					hover: `作者: ${r.owner.login}`,
				},
			}));
		},
	};
}

export const godotRelease = makeGitHubReleaseSource(
	"Godot Release",
	"godotengine",
	"godot",
);
export const bevyRelease = makeGitHubReleaseSource(
	"Bevy Release",
	"bevyengine",
	"bevy",
);
export const flaxRelease = makeGitHubReleaseSource(
	"Flax Release",
	"FlaxEngine",
	"FlaxEngine",
);

export const trendingGameDev = makeGitHubTrendingSource("GitHub 游戏开发趋势");

/* 新增框架/库 Release */
export const raylibRelease = makeGitHubReleaseSource(
	"Raylib Release",
	"raysan5",
	"raylib",
);
export const monogameRelease = makeGitHubReleaseSource(
	"MonoGame Release",
	"MonoGame",
	"MonoGame",
);
export const love2dRelease = makeGitHubReleaseSource(
	"Love2D Release",
	"love2d",
	"love",
);
export const strideRelease = makeGitHubReleaseSource(
	"Stride Release",
	"stride3d",
	"stride",
);
export const gdevelopRelease = makeGitHubReleaseSource(
	"GDevelop Release",
	"4ian",
	"GDevelop",
);
export const pygameRelease = makeGitHubReleaseSource(
	"PyGame Release",
	"pygame",
	"pygame",
);
