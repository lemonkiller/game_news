import { parseRSS, getGUID, relativeTime, stripHtml } from '../utils/rss-parser'
import { fetchText } from '../utils/fetcher'
import type { NewsSource } from '../utils/types'
export const arashiyama: NewsSource = {
  name: 'ARASHIYAMA', lang: 'ja',
  fetch: async () => {
    const xml = await fetchText('https://t-arashiyama.com/feed/')
    const items = parseRSS(xml)
    return items.slice(0, 5).map((item) => ({
      id: getGUID(item), title: item.title, url: item.link,
      extra: { info: relativeTime(item.pubDate), hover: item.description ? stripHtml(item.description).slice(0, 200) : undefined },
    }))
  },
}
