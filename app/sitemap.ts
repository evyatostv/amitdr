import type {MetadataRoute} from 'next';
import {baseSiteUrl} from '@/lib/seo';
import {articleItems} from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/conditions',
    '/services',
    '/articles',
    '/faq',
    '/book',
    '/contact',
    '/privacy',
    '/accessibility'
  ];

  const localizedRoutes = routes.flatMap((route) => [
    {
      url: `${baseSiteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.7
    },
    {
      url: `${baseSiteUrl}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 0.9 : 0.7
    }
  ]);

  const articleRoutes = articleItems.flatMap((article) => [
    {
      url: `${baseSiteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.date)
    },
    {
      url: `${baseSiteUrl}/en/articles/${article.slug}`,
      lastModified: new Date(article.date)
    }
  ]);

  return [...localizedRoutes, ...articleRoutes];
}
