/**
 * 纯 JavaScript HTML 清理（不依赖 jsdom/DOMPurify，兼容 Node.js v24 + Windows）
 */

const ALLOWED_TAGS = new Set([
  'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre', 'blockquote',
])

const ALLOWED_ATTRS = new Set(['href', 'title', 'target'])

function sanitizeHtml(html: string): string {
  // 使用正则替换方式清理，避免 jsdom/DOMPurify 的兼容性问题
  let result = html

  // 移除所有不允许的标签（保留内容）
  result = result.replace(/<(?!(?:\/?\s*(?:b|i|em|strong|a|p|br|ul|ol|li|code|pre|blockquote))\b)[^>]+>/gi, '')

  // 移除不允许的属性
  result = result.replace(/<(\w+)\s+([^>]*)>/gi, (_match, tag, attrs) => {
    if (!ALLOWED_TAGS.has(tag.toLowerCase())) return _match
    const safeAttrs = attrs.match(/(?:href|title|target|rel)=["'][^"']*["']/gi) || []
    if (safeAttrs.length === 0) return `<${tag}>`
    return `<${tag} ${safeAttrs.join(' ')}>`
  })

  // 确保 a 标签有 rel="nofollow noopener"
  result = result.replace(/<a\s/gi, '<a rel="nofollow noopener" ')

  // 移除 javascript: 伪协议
  result = result.replace(/href=["']javascript:[^"']*["']/gi, 'href="#"')

  return result
}

export { sanitizeHtml }
