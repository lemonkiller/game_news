import type { Lang } from "../../scripts/utils/types";

interface NavbarProps {
	lang: Lang;
	onLangChange: (lang: Lang) => void;
	counts: Record<Lang, number>;
	updatedAt: string;
	labels: Record<Lang, string>;
}

export default function Navbar({
	lang,
	onLangChange,
	counts,
	updatedAt,
	labels,
}: NavbarProps) {
	const langs: Lang[] = ["all", "zh", "en", "ja"];
	return (
		<nav className="navbar">
			<div className="navbar-left">
				<h1 className="navbar-title">GameDev News</h1>
				<span className="navbar-subtitle">游戏开发资讯聚合</span>
			</div>
			<div className="navbar-tabs">
				{langs.map((l) => (
					<button
						key={l}
						className={`tab ${lang === l ? "active" : ""}`}
						onClick={() => onLangChange(l)}
					>
						{labels[l]}
						<span className="tab-count">{counts[l]}</span>
					</button>
				))}
			</div>
			<div className="navbar-info">更新于 {formatTime(updatedAt)}</div>
		</nav>
	);
}

function formatTime(iso: string): string {
	try {
		const d = new Date(iso);
		return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
	} catch {
		return iso;
	}
}
