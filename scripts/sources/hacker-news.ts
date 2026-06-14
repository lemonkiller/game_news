import type { NewsSource } from '../utils/types'
export const hackerNews: NewsSource = {
  name: 'Hacker News', lang: 'en',
  fetch: async () => {
    const res = await fetch('https://hn.algolia.com/api/v1/search?query=game+development&tags=story&hitsPerPage=20', { headers: { 'User-Agent': 'Mozilla/5.0' } })
    const data: any = await res.json()
    return (data.hits || []).map((hit: any) => ({
      id: String(hit.objectID), title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      extra: { info: `${hit.points ?? 0} 赞 · ${hit.num_comments ?? 0} 评论`, hover: hit.story_text?.slice(0, 200) },
    }))
  },
}
