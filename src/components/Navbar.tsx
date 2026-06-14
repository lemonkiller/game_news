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
	const langTabs: Lang[] = ["all", "zh", "en", "ja"];
	const catTabs: Lang[] = ["steam", "engine", "company", "community"];

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<h1 className="navbar-title">GameDev News</h1>
				<span className="navbar-subtitle">游戏开发资讯聚合</span>
			</div>

			<div className="navbar-group">
				<span className="navbar-group-label">语言</span>
				<div className="navbar-tabs">
					{langTabs.map((l) => (
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
			</div>

			<div className="navbar-group">
				<span className="navbar-group-label">分类</span>
				<div className="navbar-tabs">
					{catTabs.map((l) => (
						<button
							key={l}
							className={`tab tab-cat ${lang === l ? "active" : ""}`}
							onClick={() => onLangChange(l)}
						>
							{labels[l]}
							<span className="tab-count">{counts[l]}</span>
						</button>
					))}
				</div>
			</div>

			<div className="navbar-info">更新于 {formatTime(updatedAt)}</div>
		</nav>
	);
}

function formatTime(iso: string): string {
	try {
		const d = new Date(iso);
		const month = d.getMonth() + 1;
		const day = d.getDate();
		const hours = String(d.getHours()).padStart(2, "0");
		const mins = String(d.getMinutes()).padStart(2, "0");
		return `${month}月${day}日 ${hours}:${mins}`;
	} catch {
		return iso;
	}
}
