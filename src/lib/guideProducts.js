import { productsData } from '@/lib/productsData';

// Which products each guide points at. Guides are the informational entry point;
// these links carry readers (and crawlers) from a guide into the catalogue, which
// is where the commercial intent lives.
const BY_CATEGORY = {
  'vinyl-liners': ['in-ground-liners', 'above-ground-liners'],
  'safety-covers': ['safety-covers', 'winter-covers'],
  'solar-covers': ['solar-covers', 'pool-insulation'],
  'winter-covers': ['winter-covers', 'safety-covers'],
};

// Topic words that pull in a more specific product regardless of category.
const OVERRIDES = [
  { re: /\b(track|automatic|automated|motorized|retractable)\b/i, slugs: ['safety-covers', 'in-ground-liners'] },
  { re: /\b(golf|sports|turf|green)\b/i, slugs: ['golf-covers'] },
  { re: /\b(tarp|curing|blanket for concrete|construction)\b/i, slugs: ['curing-blankets'] },
  { re: /\b(steel|kit|frame|wall)\b/i, slugs: ['steel-kits'] },
  { re: /\b(insulat|thermal|indoor|natatorium|floor|wall)\b/i, slugs: ['pool-insulation', 'solar-covers'] },
  { re: /\b(evaporat|heat|heating|energy|solar)\b/i, slugs: ['solar-covers'] },
  { re: /\b(astm|barrier|law|laws|commercial|hotel|wholesale|dealer)\b/i, slugs: ['safety-covers'] },
  { re: /\b(mesh|solid|anchor|cable|rope)\b/i, slugs: ['safety-covers', 'winter-covers'] },
  { re: /\b(spa|hot tub)\b/i, slugs: ['solar-covers'] },
];

/**
 * Two or three catalogue products a guide should link to, most specific first.
 */
export function getRelatedProducts(article, limit = 3) {
  if (!article) return [];

  const slugs = [];
  const add = (list) => list.forEach((slug) => {
    if (productsData[slug] && !slugs.includes(slug)) slugs.push(slug);
  });

  add(BY_CATEGORY[article.category] || []);

  const text = `${article.title || ''} ${article.excerpt || ''} ${(article.keywords || []).join(' ')}`;
  OVERRIDES.forEach(({ re, slugs: overrideSlugs }) => {
    if (re.test(text)) add(overrideSlugs);
  });

  if (!slugs.length) add(['in-ground-liners', 'safety-covers']);

  return slugs.slice(0, limit).map((slug) => ({
    slug,
    name: productsData[slug].name,
    tagline: productsData[slug].tagline,
    image: productsData[slug].images?.[0],
  }));
}