import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })

export interface RSSItem {
  title: string
  link: string
  guid?: string | { '#text': string }
  pubDate?: string
  description?: string
}

/** 解析 RSS/Atom/RDF XML 文本，返回标准化条目列表 */
export function parseRSS(xml: string): RSSItem[] {
  const doc = parser.parse(xml)

  // RSS 2.0
  const channel = doc?.rss?.channel
  if (channel) {
    const items = channel.item
    return Array.isArray(items) ? items : items ? [items] : []
  }

  // Atom
  const feed = doc?.feed
  if (feed) {
    const entries = feed.entry
    const items = Array.isArray(entries) ? entries : entries ? [entries] : []
    return items.map((e: any) => ({
      title: typeof e.title === 'object' ? e.title['#text'] ?? e.title['@_'] ?? '' : e.title,
      link: e.link?.['@_href'] ?? e.link?.href ?? '',
      guid: e.id,
      pubDate: e.updated ?? e.published,
      description: e.summary ?? e.content,
    }))
  }

  // RSS 1.0 (RDF)
  const rdf = doc['rdf:RDF']
  if (rdf) {
    const items = rdf.item
    const raw = Array.isArray(items) ? items : items ? [items] : []
    return raw.map((item: any) => ({
      title: item.title ?? '',
      link: item.link ?? item['@_rdf:about'] ?? '',
      guid: item['@_rdf:about'] ?? item.link,
      pubDate: item['dc:date'],
      description: item.description ?? item['content:encoded'],
    }))
  }

  return []
}

/** 从 RSS 条目中提取 GUID */
export function getGUID(item: RSSItem): string {
  if (typeof item.guid === 'string') return item.guid
  if (item.guid?.['#text']) return item.guid['#text']
  return item.link || item.title
}

/** 相对时间 */
export function relativeTime(dateStr: string | undefined): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return '刚刚'
  if (mins < 60) return `${mins} 分钟前`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} 小时前`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} 天前`
  return date.toLocaleDateString('zh-CN')
}

/** 去除 HTML 标签 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}
