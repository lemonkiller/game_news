import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { allSources } from "./sources";
import type { FetchResult, NewsItem } from "./utils/types";

const outputDir = join(process.cwd(), "data");
const dataPath = join(outputDir, "news.json");
const CONCURRENCY = 8; // 每批并发抓取数

/** 读取上次抓取的老数据，用于抓取失败时兜底 */
function readOldData(): Record<string, NewsItem[]> {
	try {
		if (existsSync(dataPath)) {
			const old = JSON.parse(readFileSync(dataPath, "utf-8"));
			return old.sources || {};
		}
	} catch {
		/* 文件不存在或格式错误，忽略 */
	}
	return {};
}

/** 将当前结果写入磁盘 */
function saveResult(result: FetchResult) {
	mkdirSync(outputDir, { recursive: true });
	writeFileSync(dataPath, JSON.stringify(result, null, 2));
}

async function main() {
	const oldData = readOldData();

	const result: FetchResult = {
		updatedAt: new Date().toISOString(),
		sources: { ...oldData },
		errors: {},
	};

	let completed = 0;
	const total = allSources.length;
	let errored = 0;

	/** 处理单个源 */
	async function fetchSource(source: (typeof allSources)[0]) {
		process.stdout.write(`[${++completed}/${total}] ${source.name}...`);
		try {
			const items = await source.fetch();
			if (items.length > 0 || !result.sources[source.name]) {
				result.sources[source.name] = items;
				process.stdout.write(` ${items.length} 条\n`);
			} else {
				process.stdout.write(
					` 0 条，保留旧数据 ${result.sources[source.name].length} 条\n`,
				);
			}
		} catch (e) {
			errored++;
			process.stdout.write(` 失败\n`);
			result.errors[source.name] = String(e);
			if (!result.sources[source.name]) {
				result.sources[source.name] = [];
			}
		}
	}

	// 分批并行
	for (let i = 0; i < allSources.length; i += CONCURRENCY) {
		const batch = allSources.slice(i, i + CONCURRENCY);
		await Promise.allSettled(batch.map(fetchSource));
		// 每批完成后保存一次
		saveResult(result);
	}

	const totalItems = Object.values(result.sources).reduce(
		(s, v) => s + v.length,
		0,
	);
	console.log(
		`\n完成！共 ${totalItems} 条新闻，${errored} 个源失败，${total} 个源已处理`,
	);
}

main().catch((e) => {
	console.error("Fatal:", e);
	process.exit(1);
});
