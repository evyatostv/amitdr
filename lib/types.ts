export type ConditionItem = {
  slug: string;
  nameHe: string;
  nameEn: string;
  shortHe: string;
  shortEn: string;
  treatmentsHe: string[];
  treatmentsEn: string[];
};

export type ArticleItem = {
  slug: string;
  titleHe: string;
  titleEn: string;
  summaryHe: string;
  summaryEn: string;
  checkedHe: string;
  checkedEn: string;
  insightHe: string;
  insightEn: string;
  date: string;
  tags: string[];
  externalLink: string;
  sourceName: string;
};
