#!/usr/bin/env node

import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {readFile} from 'node:fs/promises';

const SOURCE_URL =
  process.env.PUBMED_RSS_URL ||
  'https://pubmed.ncbi.nlm.nih.gov/rss/search/107QS1L1jrYfSgKA6801STC9ZPIp31Z_y_WV7b0UZ3k3kdggnA/?limit=100&utm_campaign=pubmed-2&fc=20241213144035';

const OUTPUT_PATH = resolve(process.cwd(), 'public/feeds/pubmed-custom.xml');
const SITE_URL = process.env.SITE_URL || 'https://drd.co.il';
const MAX_ITEMS = Number(process.env.PUBMED_FEED_LIMIT || 100);

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function extractTag(block, tagName) {
  const cdataPattern = new RegExp(
    `<${tagName}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tagName}>`,
    'i'
  );
  const match = block.match(cdataPattern);
  return match ? match[1].trim() : '';
}

function buildCustomFeed(sourceXml) {
  const channelBlock = sourceXml.match(/<channel>[\s\S]*?<\/channel>/i)?.[0] || '';
  const itemBlocks = sourceXml.match(/<item>[\s\S]*?<\/item>/gi) || [];

  const sourceTitle = extractTag(channelBlock, 'title') || 'PubMed Feed';
  const sourceDescription =
    extractTag(channelBlock, 'description') || 'Custom PubMed feed';
  const sourceLanguage = extractTag(channelBlock, 'language') || 'en-us';
  const lastBuildDate =
    extractTag(channelBlock, 'lastBuildDate') || new Date().toUTCString();

  const customItems = itemBlocks.slice(0, MAX_ITEMS).map((itemBlock) => {
    const title = extractTag(itemBlock, 'title');
    const link = extractTag(itemBlock, 'link');
    const guid = extractTag(itemBlock, 'guid') || link;
    const pubDate = extractTag(itemBlock, 'pubDate');
    const description = extractTag(itemBlock, 'description');

    return [
      '    <item>',
      `      <title>${escapeXml(title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="false">${escapeXml(guid)}</guid>`,
      pubDate ? `      <pubDate>${escapeXml(pubDate)}</pubDate>` : '',
      description
        ? `      <description>${escapeXml(description)}</description>`
        : '',
      '    </item>'
    ]
      .filter(Boolean)
      .join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    `    <title>${escapeXml(`Custom: ${sourceTitle}`)}</title>`,
    `    <link>${escapeXml(`${SITE_URL}/feeds/pubmed-custom.xml`)}</link>`,
    `    <description>${escapeXml(sourceDescription)}</description>`,
    `    <language>${escapeXml(sourceLanguage)}</language>`,
    `    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>`,
    ...customItems,
    '  </channel>',
    '</rss>',
    ''
  ].join('\n');
}

async function buildFeedFromLocalArticles() {
  const raw = await readFile(
    resolve(process.cwd(), 'content/articles.json'),
    'utf8'
  );
  const items = JSON.parse(raw);
  const pubmedArticles = items
    .filter((item) =>
      String(item.externalLink || '').includes('pubmed.ncbi.nlm.nih.gov')
    )
    .slice(0, MAX_ITEMS);

  const now = new Date().toUTCString();
  const customItems = pubmedArticles.map((item) => {
    const link = item.externalLink;
    const title = item.titleEn || item.titleHe || 'PubMed Article';
    const guid = item.slug || link;
    const pubDate = item.date ? new Date(item.date).toUTCString() : now;
    const description = item.summaryEn || item.summaryHe || '';

    return [
      '    <item>',
      `      <title>${escapeXml(title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="false">${escapeXml(guid)}</guid>`,
      `      <pubDate>${escapeXml(pubDate)}</pubDate>`,
      description
        ? `      <description>${escapeXml(description)}</description>`
        : '',
      '    </item>'
    ]
      .filter(Boolean)
      .join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>Custom: PubMed Feed (Local Fallback)</title>',
    `    <link>${escapeXml(`${SITE_URL}/feeds/pubmed-custom.xml`)}</link>`,
    '    <description>Fallback feed generated from local PubMed-linked articles.</description>',
    '    <language>en-us</language>',
    `    <lastBuildDate>${escapeXml(now)}</lastBuildDate>`,
    ...customItems,
    '  </channel>',
    '</rss>',
    ''
  ].join('\n');
}

async function main() {
  let outputXml = '';

  try {
    const response = await fetch(SOURCE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch PubMed RSS (${response.status})`);
    }

    const sourceXml = await response.text();
    if (!sourceXml.includes('<rss') || !sourceXml.includes('<item>')) {
      throw new Error('Fetched content does not look like RSS feed XML');
    }

    outputXml = buildCustomFeed(sourceXml);
    console.log('PubMed RSS fetched successfully.');
  } catch (error) {
    console.warn(`PubMed RSS unavailable, using local fallback: ${error.message}`);
    outputXml = await buildFeedFromLocalArticles();
  }
  await mkdir(dirname(OUTPUT_PATH), {recursive: true});
  await writeFile(OUTPUT_PATH, outputXml, 'utf8');
  console.log(`Custom PubMed feed written to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
