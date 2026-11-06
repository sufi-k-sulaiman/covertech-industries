// Aggregates every commercial guide batch into one registry for the article
// renderer and the Learn page.
import { NEW_ARTICLES, NEW_CATEGORY_META } from "./guidesData";
import { ARTICLES_A, META_A } from "./guidesBatch2a";
import { ARTICLES_B, META_B } from "./guidesBatch2b";
import { ARTICLES_C, META_C } from "./guidesBatch2c";
import { ARTICLES_D, META_D } from "./guidesBatch2d";

export const ALL_ARTICLES = {
  ...NEW_ARTICLES,
  ...ARTICLES_A,
  ...ARTICLES_B,
  ...ARTICLES_C,
  ...ARTICLES_D,
};

export const ALL_CATEGORY_META = {
  ...NEW_CATEGORY_META,
  ...META_A,
  ...META_B,
  ...META_C,
  ...META_D,
};

// Derive category ordering from article insertion order so prev/next navigation
// stays consistent with how the guides are listed.
export const ALL_CATEGORY_SLUGS = {};
for (const [slug, article] of Object.entries(ALL_ARTICLES)) {
  if (!article?.category) continue;
  if (!ALL_CATEGORY_SLUGS[article.category]) ALL_CATEGORY_SLUGS[article.category] = [];
  ALL_CATEGORY_SLUGS[article.category].push(slug);
}