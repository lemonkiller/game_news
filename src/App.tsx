import { useMemo, useState } from "react";
import data from "../data/news.json";
import Navbar from "./components/Navbar";
import CardColumn from "./components/CardColumn";
import Footer from "./components/Footer";
import type { NewsItem, Lang } from "../scripts/utils/types";

const LANG_LABELS: Record<Lang, string> = {
	all: "全部",
	zh: "中文",
	en: "English",
	ja: "日本語",
};

const LANG_MAP: Record<string, Lang> = {
	"GamesIndustry.biz": "en",
	"80 Level": "en",
	"PC Gamer": "en",
	"Rock Paper Shotgun": "en",
	VG247: "en",
	"Unity Blog": "en",
	"Hacker News": "en",
	"Godot Releases": "en",
	"Reddit r/gamedev": "en",
	GameFromScratch: "en",
	IndieGamesPlus: "en",
	"Raph Koster": "en",
	"Dan Felder": "en",
	ChaoticStupid: "en",
	ManiaHero: "en",
	PlayTank: "en",
	JGallant: "en",
	Necromanov: "en",
	机核网: "zh",
	
	游戏陀螺: "zh",
	游戏茶馆: "zh",
	"Indienova 独立游戏": "zh",
	GameLook: "zh",
	狐王驾虎: "zh",
	博毅创为: "zh",
	云风: "zh",
	增荣博客: "zh",

	"4Gamer.net": "ja",
	AUTOMATON: "ja",
	電ファミニコゲーマー: "ja",
	インサイド: "ja",
	ゲームメーカーズ: "ja",
	IndieGamesJapan: "ja",
	"IGDA Japan": "ja",
	"IndieGamesJp.dev": "ja",
	"Game Coding Classics": "ja",
	ARASHIYAMA: "ja",
	"OSAKANA LABO": "ja",
};

export default function App() {
	const [lang, setLang] = useState<Lang>("all");

	// 只显示有数据的非空列
	const entries = useMemo(() => {
		const sources = data.sources as Record<string, NewsItem[]>;
		return Object.entries(sources)
			.filter(([, items]) => items.length > 0)
			.filter(([name]) => lang === "all" || LANG_MAP[name] === lang);
	}, [lang]);

	const langCounts = useMemo(() => {
		const sources = data.sources as Record<string, NewsItem[]>;
		const counts: Record<Lang, number> = { all: 0, zh: 0, en: 0, ja: 0 };
		for (const [name, items] of Object.entries(sources)) {
			const l = LANG_MAP[name] || "en";
			counts[l] += items.length;
			counts.all += items.length;
		}
		return counts;
	}, []);

	return (
		<div className="app">
			<Navbar
				lang={lang}
				onLangChange={setLang}
				counts={langCounts}
				updatedAt={data.updatedAt}
				labels={LANG_LABELS}
			/>
			<main className="columns">
				{entries.map(([name, items]) => (
					<CardColumn key={name} name={name} items={items.slice(0, 5)} />
				))}
			</main>
			<Footer />
		</div>
	);
}
