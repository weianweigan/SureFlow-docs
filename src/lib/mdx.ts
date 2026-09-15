import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { type Locale } from './i18n';

export interface DocTOCItem {
  id: string;
  title: string;
  level: number;
}

export interface DocPageContent {
  title: string;
  description: string;
  content: string;
  toc: DocTOCItem[];
}

export function getDocContent(lang: Locale, slugArray: string[] = []): DocPageContent | null {
  const slug = slugArray.length === 0 ? 'index' : slugArray.join('/');
  const filePath = path.join(process.cwd(), 'content', 'docs', lang, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 解析 frontmatter
  let title = 'Document';
  let description = '';
  let markdownBody = fileContent;

  if (fileContent.startsWith('---')) {
    const parts = fileContent.split('---');
    if (parts.length >= 3) {
      try {
        const data = yaml.load(parts[1]) as { title?: string; description?: string };
        if (data.title) title = data.title;
        if (data.description) description = data.description;
      } catch (e) {
        console.error('Failed to parse frontmatter:', e);
      }
      markdownBody = parts.slice(2).join('---').trim();
    }
  }

  // 提取 TOC 锚点
  const toc: DocTOCItem[] = [];
  const lines = markdownBody.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const heading = trimmed.replace(/^##\s+/, '');
      const id = heading
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
      toc.push({ id, title: heading, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const heading = trimmed.replace(/^###\s+/, '');
      const id = heading
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '');
      toc.push({ id, title: heading, level: 3 });
    }
  }

  return {
    title,
    description,
    content: markdownBody,
    toc,
  };
}
