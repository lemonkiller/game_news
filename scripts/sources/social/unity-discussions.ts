/**
 * Unity Discussions - 官方论坛
 * 基于 Discourse，提供公开 /latest.json API
 */
import { makeDiscourseSource } from "./discourse";

export const unityDiscussions = makeDiscourseSource(
	"Unity Discussions",
	"discussions.unity.com",
	"en",
	"论坛",
);
