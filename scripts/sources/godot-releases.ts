import type { NewsSource } from '../utils/types'
export const godotReleases: NewsSource = {
  name: 'Godot Releases', lang: 'en',
  fetch: async () => {
    const xml = await (await fetch('https://github.com/godotengine/godot/releases.atom', { headers: { 'User-Agent': 'Mozilla/5.0' } })).text()
    const items: any[] = []
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
    let match
    while ((match = entryRegex.exec(xml)) !== null) {
      const e = match[1]
      const title = e.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] || ''
      const link = e.match(/<link[^>]*href="([^"]*)"/)?.[1] || ''
      const id = e.match(/<id[^>]*>([^<]*)<\/id>/)?.[1] || title
      const date = e.match(/<published[^>]*>([^<]*)<\/published>/)?.[1] || e.match(/<updated[^>]*>([^<]*)<\/updated>/)?.[1]
      const desc = e.match(/<summary[^>]*>([^<]*)<\/summary>/)?.[1]
      items.push({ title, link, id, date, desc })
    }
    return items.slice(0, 10).map((item: any) => ({
      id: item.id, title: item.title, url: item.link,
      extra: { info: item.date ? new Date(item.date).toLocaleDateString('zh-CN') : '', hover: item.desc ? item.desc.replace(/<[^>]*>/g, '').slice(0, 200) : undefined },
    }))
  },
}
