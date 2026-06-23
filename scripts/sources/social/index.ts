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
	raylibRelease,
	monogameRelease,
	love2dRelease,
	strideRelease,
	gdevelopRelease,
	pygameRelease,
} from "./github";
import {
	mastodonGamedev,
	mastodonTagGamedev,
	mastodonTagGodot,
	mastodonTagUnity,
	mastodonTagUnreal,
	mastodonTagIndieDev,
} from "./mastodon";
import { blueskyGameDev } from "./bluesky";
import { zhihuGameDev, zhihuGameDesign, zhihuIndie } from "./zhihu";
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
	lemmyMLGamedev,
	lemmyMLGodot,
	lemmyWorldIndieDev,
	lemmyWorldBevy,
} from "./lemmy";
import { lobstersGameDev } from "./lobsters";
import { gamedevnetForum } from "./gamedevnet";
import { gdseQuestions } from "./gdse";
import { freeGameDev } from "./freegamedev";
import { v2exGameDev } from "./v2ex";
import { unityDiscussions } from "./unity-discussions";
import { unrealForums } from "./unreal-forums";
import { godotForum } from "./godot-forum";
export const socialSources = [
	/* 社交/社区（高时效性短内容） */
	hackerNewsGameDev,
	hackerNewsShow,
	redditGameDev,
	redditGodot,
	redditUnity3D,
	redditUnreal,

	/* Mastodon 实例 + 标签 */
	mastodonGamedev,
	mastodonTagGamedev,
	mastodonTagGodot,
	mastodonTagUnity,
	mastodonTagUnreal,
	mastodonTagIndieDev,

	blueskyGameDev,

	/* GitHub 源 */
	trendingGameDev,
	godotRelease,
	bevyRelease,
	flaxRelease,
	raylibRelease,
	monogameRelease,
	love2dRelease,
	strideRelease,
	gdevelopRelease,
	pygameRelease,

	/* Lemmy 联邦讨论 */
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
	lemmyMLGamedev,
	lemmyMLGodot,
	lemmyWorldIndieDev,
	lemmyWorldBevy,

	/* 知乎搜索 */
	zhihuGameDev,
	zhihuGameDesign,
	zhihuIndie,

	/* 新信息源 */
	lobstersGameDev,
	gamedevnetForum,
	gdseQuestions,
	freeGameDev,
	v2exGameDev,

	/* 引擎官方论坛（Discourse） */
	unityDiscussions,
	unrealForums,
	godotForum,
];
