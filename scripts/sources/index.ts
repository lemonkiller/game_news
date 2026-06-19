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
import { jgallant } from "./jgallant";
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
	redditGamedev,
	redditGameDesign,
	redditIndieDev,
	redditGameIdeas,
	redditBaseBuilding,
	reddit4X,
	redditAIGamedev,
	redditLevelDesign,
	redditGameEngines,
	resetera,
	ngaGameDesign,
	ngaIndie,
	ngaGameTech,
	ngaDev,
	gameres,
	gamerboom,
	juejinGame,
	sfGameDev,
	cnblogsGameDev,
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
	steamTopSellers,
	steamNewReleases,
	steamSpecials,
	steamComingSoon,
} from "./steam";
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
import { fourGamer } from "./4gamer";
import { automaton } from "./automaton";
import { denfaminicogamer } from "./denfaminicogamer";
import { insideGames } from "./inside-games";
import { gamemakers } from "./gamemakers";
import { indieGamesJapan } from "./indiegamesjapan";
import { igdaJapan } from "./igda-japan";
import { indieGamesJpDev } from "./indiegamesjp-dev";
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
import { aiAndGames, nvidiaGameDev } from "./ai-sources";
import { unrealBlog, gridSageGames } from "./gamedev-news";


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
	jgallant,
	gamesByMason,
	topHatGames,
	lostGarden,
	gamedevUnchained,
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
	fourGamer,
	automaton,
	denfaminicogamer,
	insideGames,
	gamemakers,
	indieGamesJapan,
	igdaJapan,
	indieGamesJpDev,
	hysblog,
	arashiyama,
	aiming,
	greeTech,
	/* Steam */
	steamTopSellers,
	steamNewReleases,
	steamSpecials,
	steamComingSoon,
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
	redditGamedev,
	redditGameDesign,
	redditIndieDev,
	redditGameIdeas,
	redditBaseBuilding,
	reddit4X,
	redditAIGamedev,
	redditLevelDesign,
	redditGameEngines,
	resetera,
	ngaGameDesign,
	ngaIndie,
	ngaGameTech,
	ngaDev,
	gameres,
	gamerboom,
	juejinGame,
	sfGameDev,
	cnblogsGameDev,
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
	/* 行业综合新闻 */
	unrealBlog,
	gridSageGames,
];
