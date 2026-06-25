import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import data from "../data/news.json";
import Navbar from "./components/Navbar";
import { quotes } from "../scripts/utils/quotes";
import { detectLanguage } from "./i18n";
import { ErrorBoundary } from "./components/ErrorBoundary";

const NewsTab = lazy(() => import("./components/NewsTab"));
const SocialTab = lazy(() => import("./components/SocialTab"));
const LinksTab = lazy(() => import("./components/LinksTab"));

const uiLang = detectLanguage();

type View = "news" | "social" | "links";

/** 从 URL hash 读取当前视图 */
function viewFromHash(): View {
	const hash = window.location.hash.slice(1);
	if (hash === "social" || hash === "links") return hash;
	return "news";
}

export default function App() {
	const [view, setView] = useState<View>(viewFromHash);
	const [dailyQuote, setDailyQuote] = useState<(typeof quotes)[0] | null>(null);

	// 视图切换时同步 hash + 随机名言
	const onViewChange = useCallback((v: View) => {
		setView(v);
		window.location.hash = v;
		setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
	}, []);

	// 监听浏览器后退/前进
	useEffect(() => {
		const onHashChange = () => setView(viewFromHash());
		window.addEventListener("hashchange", onHashChange);
		// 初始 hash
		if (!window.location.hash) {
			window.location.hash = "news";
		}
		return () => window.removeEventListener("hashchange", onHashChange);
	}, []);

	return (
		<ErrorBoundary>
			<div className="app">
				<Navbar
					view={view}
					onViewChange={onViewChange}
					updatedAt={data.updatedAt}
					quote={dailyQuote}
					uiLang={uiLang}
				/>
				{view === "links" ? (
					<Suspense fallback={<div className="links-content" />}>
						<LinksTab uiLang={uiLang} />
					</Suspense>
				) : view === "social" ? (
					<Suspense fallback={<div className="links-content" />}>
						<SocialTab uiLang={uiLang} />
					</Suspense>
				) : (
					<Suspense fallback={<div className="links-content" />}>
						<NewsTab uiLang={uiLang} />
					</Suspense>
				)}
			</div>
		</ErrorBoundary>
	);
}
