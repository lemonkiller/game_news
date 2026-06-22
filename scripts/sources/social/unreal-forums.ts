/**
 * Epic Developer Community Forums (Unreal Engine)
 * 基于 Discourse，提供公开 /latest.json API
 */
import { makeDiscourseSource } from "./discourse";

export const unrealForums = makeDiscourseSource(
	"Unreal Engine 论坛",
	"forums.unrealengine.com",
	"en",
	"论坛",
);
