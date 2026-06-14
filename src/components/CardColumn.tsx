import NewsCard from "./NewsCard";
import type { NewsItem } from "../../scripts/utils/types";

interface CardColumnProps {
	name: string;
	items: NewsItem[];
}

export default function CardColumn({ name, items }: CardColumnProps) {
	return (
		<section className="column">
			<h2 className="column-title">{name}</h2>
			<div className="column-cards">
				{items.map((item) => (
					<NewsCard key={item.id} item={item} />
				))}
			</div>
		</section>
	);
}
