/**
 * IndieDev.com - 独立游戏开发者论坛
 * 基于 Discourse，提供公开 /latest.json API
 */
import { makeDiscourseSource } from "./discourse";

export const indieDevForum = makeDiscourseSource(
	"IndieDev 论坛",
	"indiedev.com",
	"en",
	"论坛",
);
