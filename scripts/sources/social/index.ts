import { hackerNewsGameDev, hackerNewsShow } from "./hackernews";
import {
	redditGameDev,
	redditGodot,
	redditUnity3D,
	redditUnreal,
} from "./reddit";
import {
	godotRelease,
	bevyRelease,
	flaxRelease,
	trendingGameDev,
} from "./github";
import { mastodonGamedev } from "./mastodon";
import { blueskyGameDev } from "./bluesky";
import {
	lemmyGamedev,
	lemmyGodot,
	lemmyUnity,
	lemmyGamedesign,
	lemmyWorldGamedev,
	lemmyWorldGodot,
	lemmyWorldUnreal,
	lemmyWorldIndiegaming,
	lemmyShitGamedev,
	lemmyShitUnreal,
} from "./lemmy";

export const socialSources = [
	/* 社交/社区（高时效性短内容） */
	hackerNewsGameDev,
	hackerNewsShow,
	redditGameDev,
	redditGodot,
	redditUnity3D,
	redditUnreal,
	mastodonGamedev,
	blueskyGameDev,
	/* GitHub 源 */
	trendingGameDev,
	godotRelease,
	bevyRelease,
	flaxRelease,
	/* Lemmy 联邦讨论 */
	lemmyGamedev,
	lemmyGodot,
	lemmyUnity,
	lemmyGamedesign,
	lemmyWorldGamedev,
	lemmyWorldGodot,
	lemmyWorldUnreal,
	lemmyWorldIndiegaming,
	lemmyShitGamedev,
	lemmyShitUnreal,
];
