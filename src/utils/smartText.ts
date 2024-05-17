// const smartText = (text?: string) => {
//   if (!text) {
//     return text
//   }
//   const reg = new RegExp(URL_REG, 'gi')
//   return text.replaceAll(reg, "<a href='$1' target='_blank'>$1</a>")
// }

/**
 * 解析 markdown 及 超链接
 * @param markdown
 * @returns
 */

const smartText = (text?: string) => {
  /**
   * 匹配网址正则表达式
   */
  const URL_REG =
    /(((https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gs
  /**
   * 匹配 markdown 语法正则表达式
   */
  const markdownRegex = {
    heading: /^#{1,6}\s.+$/gm,
    bold: /\*\*(.*?)\*\*/gs,
    italic: /\*(.*?)\*/gs,
    strikethrough: /~~(.*?)~~/gs,
    link: /\[([^\[]+)\]\(([^\)]+)\)/gs,
    image: /!\[([^\[]+)\]\(([^\)]+)\)/gs,
    code: /`(.+?)`/gs,
    codeBlock: /```(.+?)```/gs,
    list: /^(\*|\d\.)\s.+$/gm,
    blockquote: /^>\s.+$/gm
  }

  const htmlTags = {
    heading: (text: any, level: any) => `<h${level}>${text}</h${level}>`,
    bold: (text: any) => `<strong>${text}</strong>`,
    italic: (text: any) => `<em>${text}</em>`,
    strikethrough: (text: any) => `<del>${text}</del>`,
    link: (text: any, href: any) => `<a href="${href}">${text}</a>`,
    image: (alt: any, src: any) => `<img src="${src}" alt="${alt}">`,
    code: (text: any) => `<code>${text}</code>`,
    codeBlock: (text: any) => `<pre><code>${text}</code></pre>`,
    list: (items: any, ordered: any) => {
      const tag = ordered ? 'ul' : 'ul'
      const listItems = items.map((item) => `<li>${item}</li>`).join('')
      if (!items[items.length - 1].endsWith('\n')) {
        return `<${tag}>${listItems}</${tag}>\n`
      }
      return `<${tag}>${listItems}</${tag}>`
    },
    blockquote: (text: any) => `<blockquote>${text}</blockquote>`
  }

  return text
    .replace(markdownRegex.heading, (match) => {
      const level = match.match(/^#{1,6}/)[0].length
      const text = match.replace(/^#{1,6}\s/, '')
      return htmlTags.heading(text, level)
    })
    .replace(markdownRegex.bold, (match, p1) => htmlTags.bold(p1))
    .replace(markdownRegex.italic, (match, p1) => htmlTags.italic(p1))
    .replace(markdownRegex.strikethrough, (match, p1) =>
      htmlTags.strikethrough(p1)
    )
    .replace(markdownRegex.link, (match, p1, p2) => htmlTags.link(p1, p2))
    .replace(markdownRegex.image, (match, p1, p2) => htmlTags.image(p1, p2))
    .replace(markdownRegex.code, (match, p1) => htmlTags.code(p1))
    .replace(markdownRegex.codeBlock, (match, p1) => htmlTags.codeBlock(p1))
    .replace(markdownRegex.list, (match) => {
      const ordered = /^[0-9]+\./.test(match)
      const items = match
        .split('\n')
        .map((item) => item.replace(/^\*|\d\.\s/, ''))
      return htmlTags.list(items, ordered)
    })
    .replace(markdownRegex.blockquote, (match, p1) => htmlTags.blockquote(p1))
    .replace(URL_REG, (match, p1, p2) => htmlTags.link(p1, p2))
}

export default smartText
