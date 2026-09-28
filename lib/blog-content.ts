import fs from 'node:fs/promises'
import path from 'node:path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

export async function renderBlogPost(slug: string) {
    const source = await fs.readFile(path.join(process.cwd(), 'content/blog', `${slug}.mdx`), 'utf8')
    const result = await unified().use(remarkParse).use(remarkRehype).use(rehypeSanitize).use(rehypeStringify).process(source)
    return String(result)
}