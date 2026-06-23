import type { NewsSource } from "../utils/types";
import { gamesIndustry } from "./games-industry";
import { eightyLevel } from "./80-level";
import { unityBlog } from "./engine-blogs";
import { hackerNews } from "./hacker-news";
import { godotReleases } from "./godot-releases";
import { gameFromScratch } from "./game-from-scratch";
import { indieGamesPlus } from "./indie-games-plus";
import { raphKoster } from "./raph-koster";
import { danFelder } from "./dan-felder";
import { chaoticStupid } from "./chaotic-stupid";
import { maniaHero } from "./mania-hero";
import { playTank } from "./play-tank";
import { necromanov } from "./necromanov";
import { gamesByMason } from "./games-by-mason";
import { topHatGames } from "./top-hat-games";
import { lostGarden } from "./lost-garden";
import { gamedevUnchained } from "./gamedev-unchained";
import { frictional } from "./frictional";
import { rawFury } from "./raw-fury";
import { concernedApe } from "./concerned-ape";
import { capcomNews } from "./capcom-news";
import { ludeon } from "./ludeon";
import {
	qiitaGameDev,
	qiitaGameDesign,
	qiitaGodot,
	qiitaUnreal,
	qiitaUnity,
	zennGamedev,
} from "./community";
import { defold } from "./defold";
import { o3de } from "./o3de";
import {
	redBlobGames,
	gameWisdom,
	catnapGames,
	ratKing,
	pushToTalk,
	distractionware,
	designerNotes,
	rampantGames,
	cliffski,
	alanZucconi,
	gameWorldObserver,
	gameDevAcademy,
	kayacTechblog,
	segaTechBlog,
	applibotTechBlog,
	journalStuffWithStuff,
	masBandwidth,
	ncaseMe,
	leagueOfGameMakers,
	randomascii,
	slembcke,
	psychologyOfGames,
	keithBurgun,
	gdkeys,
} from "./design-blogs";

import {
	mechanicsAsMetaphor,
	level99Strategy,
	strategyGameStudio,
	dorophone,
	captainOfIndustry,
	transportFever3,
	pocketCity,
	jonasMeyerOhle,
	cannibalHalfling,
} from "./sim-strategy";
import { gcores } from "./gcores";
import { youxituoluo } from "./youxituoluo";
import { youxichaguan } from "./youxichaguan";
import { indienova } from "./indienova";
import { gameLook } from "./gamelook";
import { blogOwleat } from "./blog-owleat";
import { blogLiuwenyi } from "./blog-liuwenyi";
import { codingnow } from "./codingnow";
import { zengrong } from "./zengrong";
import { chuapp } from "./chuapp";
import { blogNightingale } from "./blog-nightingale";

import { gamemakers } from "./gamemakers";
import { indieGamesJapan } from "./indiegamesjapan";
import { igdaJapan } from "./igda-japan";
import { indieGamesJpDev } from "./indiegamesjp-dev";
import {
	megaVoxels,
	openGameArt,
	agateDragon,
	mastaFran,
} from "./game-art-sources";
import {
	fabienSanglard,
	sirlin,
	lizEngland,
	twoDGameArtGuru,
	gamesByManuel,
} from "./new-blogs";
import { gameDeveloper } from "./game-developer";
import { hysblog } from "./hysblog";
import { arashiyama } from "./arashiyama";
import { aiming } from "./aiming";
import { greeTech } from "./gree-tech";
import {
	flaxEngine,
	haxeFlixel,
	renpy,
	bevy,
	godotBlog,
} from "./engine-sources";
import { linkSource } from "./link-sources";
import {
	aiAndGames,
	nvidiaGameDev,
	sorceressGames,
	generativeGamedev,
	ryanFitzpatrick,
	borisTheBrave,
} from "./ai-sources";
import { unrealBlog, gridSageGames } from "./gamedev-news";
import {
	orfeasEl,
	zennGameEngine,
	zennUnreal,
	zennGodot,
	zennUnity,
	zennBevy,
} from "./engine-tech";
import {
	indieDevGames,
	chaoticanWriter,
	newToNarrative,
	zennGameDesign,
	zennStory,
	zennUIUX,
	zennUIUXDesign,
	hanasaqutto,
	canIPlayThat,
	zennWriting,
} from "./design-tech";
import { mickWest, qiitaGameAI, wpboxDev } from "./game-ai-sources";
import { socialSources } from "./social";
import { indie24, indieInformer, gameDiscoverCo } from "./indie-sources";
import {
	amdGpuOpen,
	blenderDevBlog,
	blenderNews,
	asepriteBlog,
	panda3d,
	vsCodeBlog,
	githubBlog,
	jetbrainsBlog,
	stackOverflowBlog,
	pragmaticEngineer,
} from "./dev-tools";
import { gameDevEssentials } from "./game-design-blogs";
import { gameMakerBlog } from "./gamemaker-blog";

export const allSources: NewsSource[] = [
	/* 英文 */
	gamesIndustry,
	eightyLevel,
	hackerNews,
	gameFromScratch,
	indieGamesPlus,
	raphKoster,
	danFelder,
	chaoticStupid,
	maniaHero,
	playTank,
	gamesByMason,
	topHatGames,
	lostGarden,
	gamedevUnchained,
	fabienSanglard,
	sirlin,
	lizEngland,
	twoDGameArtGuru,
	gamesByManuel,
	megaVoxels,
	openGameArt,
	agateDragon,
	mastaFran,
	/* 中文 */
	gcores,
	youxituoluo,
	youxichaguan,
	indienova,
	gameLook,
	necromanov,
	blogOwleat,
	blogLiuwenyi,
	codingnow,
	zengrong,
	chuapp,
	blogNightingale,
	/* 日文 */

	gameDeveloper,
	gamemakers,
	indieGamesJapan,
	igdaJapan,
	indieGamesJpDev,
	hysblog,
	arashiyama,
	aiming,
	greeTech,

	frictional,
	rawFury,
	concernedApe,
	capcomNews,
	ludeon,
	/* 设计博客 */
	redBlobGames,
	gameWisdom,
	catnapGames,
	ratKing,
	pushToTalk,
	distractionware,
	designerNotes,
	rampantGames,
	cliffski,
	alanZucconi,
	gameWorldObserver,
	gameDevAcademy,
	kayacTechblog,
	segaTechBlog,
	applibotTechBlog,
	journalStuffWithStuff,
	masBandwidth,
	ncaseMe,
	leagueOfGameMakers,
	randomascii,
	slembcke,
	psychologyOfGames,
	keithBurgun,
	gdkeys,
	/* 社区 */
	qiitaGameDev,
	qiitaGameDesign,
	qiitaGodot,
	qiitaUnreal,
	qiitaUnity,
	zennGamedev,
	/* 引擎 */
	unityBlog,
	godotReleases,
	flaxEngine,
	haxeFlixel,
	renpy,
	bevy,
	godotBlog,
	defold,
	o3de,
	orfeasEl,
	/* 引擎技术博客（日文） */
	zennGameEngine,
	zennUnreal,
	zennGodot,
	zennUnity,
	zennBevy,
	/* 引擎技术博客（英文 Dev.to 标签 - 已全部移除 2026-06） */
	/* 策略 / 模拟 / 殖民类游戏设计开发 */
	mechanicsAsMetaphor,
	level99Strategy,
	strategyGameStudio,
	dorophone,
	captainOfIndustry,
	transportFever3,
	pocketCity,
	jonasMeyerOhle,
	cannibalHalfling,
	/* AI 游戏开发 */
	aiAndGames,
	nvidiaGameDev,
	sorceressGames,
	generativeGamedev,
	ryanFitzpatrick,
	borisTheBrave,
	/* 行业综合新闻 */
	unrealBlog,
	gridSageGames,
	/* 开发工具 */
	amdGpuOpen,
	blenderDevBlog,
	blenderNews,
	asepriteBlog,
	panda3d,
	vsCodeBlog,
	githubBlog,
	jetbrainsBlog,
	stackOverflowBlog,
	pragmaticEngineer,
	/* 游戏 AI（行为树/GOAP/状态机/寻路） */
	mickWest,
	qiitaGameAI,
	wpboxDev,

	/* 独立游戏 */
	indie24,
	indieInformer,
	gameDiscoverCo,

	/* 游戏设计/开发博客 */
	gameDevEssentials,
	/* 游戏设计/叙事/世界观 */
	indieDevGames,
	chaoticanWriter,
	newToNarrative,
	zennGameDesign,
	zennStory,
	zennUIUX,
	zennUIUXDesign,
	hanasaqutto,
	canIPlayThat,
	zennWriting,
	gameMakerBlog,
	/* 社交/社区源（高时效短内容） */
	...socialSources,
	/* 网址标签（无 RSS 工具/资源链接） */
	linkSource,
];
