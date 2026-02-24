import conditions from '@/content/conditions.json';
import articles from '@/content/articles.json';
import type {ArticleItem, ConditionItem} from './types';

export const conditionItems = conditions as ConditionItem[];
export const articleItems = (articles as ArticleItem[]).sort((a, b) =>
  a.date < b.date ? 1 : -1
);

export const getArticleBySlug = (slug: string) =>
  articleItems.find((article) => article.slug === slug);
