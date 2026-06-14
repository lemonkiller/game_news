const DEFAULT_TIMEOUT = 15000;

export async function fetchWithTimeout(
	url: string,
	options?: RequestInit,
): Promise<Response> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
	try {
		const res = await fetch(url, {
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
