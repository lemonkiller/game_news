/**
 * Godot 官方论坛
 * 基于 Discourse，提供公开 /latest.json API
 */
import { makeDiscourseSource } from "./discourse";

export const godotForum = makeDiscourseSource(
	"Godot 论坛",
	"forum.godotengine.org",
	"en",
	"论坛",
);
