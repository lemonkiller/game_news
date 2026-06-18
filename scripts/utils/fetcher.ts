const DEFAULT_TIMEOUT = 10000;

/** 读取系统代理环境变量（优先级: ALL_PROXY > HTTPS_PROXY > HTTP_PROXY） */
function getSystemProxy(): string | undefined {
	return (
		process.env.ALL_PROXY || process.env.HTTPS_PROXY || process.env.HTTP_PROXY
	);
}

/** 创建一个带代理的 fetch 函数（兼容 Node v20/v24） */
function createFetcher() {
	const proxyUrl = getSystemProxy();
	let dispatcher: any = undefined;

	if (proxyUrl) {
		try {
			// undici 动态加载，兼容 Node v20（GH Actions）
			const undici = require("undici");
			if (undici.ProxyAgent) {
				dispatcher = new undici.ProxyAgent(proxyUrl);
			}
		} catch {
			/* undici 不可用时降级为直连 */
		}
	}

	return async (url: string, options?: RequestInit): Promise<Response> => {
		const opts: any = { ...options };
		if (dispatcher) opts.dispatcher = dispatcher;
		return fetch(url, opts);
	};
}

const proxiedFetch = createFetcher();

export async function fetchWithTimeout(
	url: string,
	options?: RequestInit,
): Promise<Response> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
	try {
		const res = await proxiedFetch(url, {
			...options,
			signal: controller.signal,
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
				Accept:
					"application/rss+xml, application/xml, application/json, text/html, */*",
				...options?.headers,
			},
		});
		return res;
	} finally {
		clearTimeout(timer);
	}
}

export async function fetchText(url: string): Promise<string> {
	const res = await fetchWithTimeout(url);
	if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
	return res.text();
}

export async function fetchJSON<T>(url: string): Promise<T> {
	const res = await fetchWithTimeout(url);
	if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
	return res.json();
}
