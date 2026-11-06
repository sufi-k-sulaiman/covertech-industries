// Topical cross-linking for Learn guides.
// Each guide is reduced to a set of themes (topic words and their synonyms),
// then guides are linked to whichever other guides share the most themes —
// which naturally connects the original 16 product guides with the newer
// commercial guides (e.g. "mesh" and "snow" connect both sets).

const THEMES = {
  safety: ["safety", "barrier", "drown", "drowning", "submersion", "child", "children", "toddler", "supervision", "supervise", "fence", "gate", "alarm", "rescue"],
  pet: ["dog", "dogs", "pet", "pets", "animal", "animals"],
  mesh: ["mesh", "weave", "woven", "high-density", "density", "permeability"],
  solid: ["solid", "laminate", "laminated", "opaque"],
  tarp: ["tarp", "tarps", "tarped", "polyethylene", "off-the-shelf", "retail", "economy"],
  solar: ["solar", "blanket", "blankets", "thermal", "insulated", "insulation", "heating", "heat", "reel", "bubble", "dome"],
  evaporation: ["evaporation", "evaporate", "humidity", "humid", "condensation", "moisture"],
  chemistry: ["chemical", "chemicals", "chlorine", "bromine", "ph", "alkalinity", "stabilizer", "sanitizer", "corrosion", "corrosive"],
  winter: ["winter", "winterization", "winterizing", "winterize", "closing", "closing", "close", "freeze", "freezing", "frost", "antifreeze"],
  snow: ["snow", "snowfall", "ice", "icy", "blizzard", "storm", "storms", "sleet", "accumulation"],
  anchor: ["anchor", "anchors", "anchoring", "strap", "straps", "spring", "springs", "buckle", "hardware", "insert"],
  track: ["track", "tracks", "rail", "rails", "encapsulated", "surface-mounted", "mechanism", "rope", "ropes", "cable", "cables", "motor", "motorized", "pulley", "housing"],
  automatic: ["automatic", "automated", "auto", "motorized", "mechanism", "retractable"],
  evaporationLoss: ["water loss", "top up", "refill", "makeup water"],
  uv: ["uv", "ultraviolet", "sunlight", "sun", "sunlight", "fading", "fade", "degrade", "degradation", "photo-degradation", "chalking"],
  mildew: ["mold", "mildew", "mould", "fungus", "fungal", "rot", "rotting", "fray", "fraying", "delamination", "brittle"],
  install: ["install", "installation", "installer", "installing", "measure", "measurement", "measurements", "fitting", "fit", "custom", "custom-fit", "template", "deck"],
  water: ["water", "pump", "pumps", "drain", "drainage", "standing", "puddle", "puddling", "cover pump"],
  astm: ["astm", "f1346", "standard", "standards", "code", "codes", "compliance", "compliant", "regulation", "regulations", "law", "laws", "inspector", "inspection", "certified", "certification"],
  cost: ["cost", "costs", "price", "prices", "pricing", "budget", "budgeting", "save", "saving", "savings", "expensive", "cheaper", "cheap", "dollar", "dollars", "quote", "invoice", "afford", "affordable", "roi", "value"],
  energy: ["energy", "efficient", "efficiency", "kwh", "kilowatt", "utility", "utilities", "gas", "heater", "bill", "bills", "btu"],
  maintenance: ["maintenance", "maintain", "care", "clean", "cleaning", "wash", "store", "storage", "storing", "repair", "repairs", "patch", "patching", "service", "upkeep", "lifespan", "longevity"],
  opening: ["opening", "open", "spring", "remove", "removal", "removing", "uncover", "uncovering", "startup", "start-up"],
  warranty: ["warranty", "warranties", "guarantee", "guaranteed", "coverage", "covered", "pro-rated", "prorated", "claim", "claims"],
  liner: ["liner", "liners", "vinyl", "pattern", "patterns", "resin", "mil", "mils", "thickness", "print", "printed", "aquashimmer"],
  commercial: ["commercial", "hotel", "hotels", "motel", "resort", "public", "facility", "facilities", "municipal", "community", "b2b", "wholesale", "dealer", "dealers", "dealership", "distributor", "architect", "engineer", "engineering", "specification", "spec", "specs"],
  indoor: ["indoor", "natatorium", "enclosure", "dehumidifier", "dehumidification", "hvac"],
};

const STOPWORDS = new Set([
  "a", "an", "and", "or", "but", "the", "of", "to", "in", "on", "for", "with", "at", "by", "from",
  "is", "are", "was", "were", "be", "been", "being", "it", "its", "this", "that", "these", "those",
  "you", "your", "yours", "we", "our", "they", "their", "them", "i", "my", "me", "he", "she", "his", "her",
  "as", "if", "than", "then", "so", "such", "not", "no", "can", "will", "would", "should", "could",
  "have", "has", "had", "do", "does", "did", "doing", "about", "into", "over", "under", "more", "most",
  "much", "many", "very", "also", "just", "only", "all", "any", "each", "every", "some", "what", "when",
  "where", "which", "who", "how", "why", "while", "because", "there", "here", "up", "out", "off", "own",
]);

const escapeWord = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const MATCHERS = Object.entries(THEMES).map(([theme, words]) => ({
  theme,
  re: new RegExp(`\\b(${words.map(escapeWord).join("|")})\\b`, "i"),
}));

const cache = new WeakMap();
const registryCache = new WeakMap();

// Themes that appear in most guides ("safety", "maintenance") say little about
// relatedness, so they are counted at a reduced weight.
function genericThemes(articles) {
  if (registryCache.has(articles)) return registryCache.get(articles);

  const freq = new Map();
  let total = 0;
  for (const article of Object.values(articles)) {
    if (!article?.paragraphs) continue;
    total += 1;
    for (const { theme } of themesFor(article)) freq.set(theme, (freq.get(theme) || 0) + 1);
  }

  const generic = new Set();
  for (const [theme, count] of freq) {
    if (total && count / total > 0.45) generic.add(theme);
  }

  registryCache.set(articles, generic);
  return generic;
}

function themesFor(article) {
  if (cache.has(article)) return cache.get(article);

  const titleText = `${article.title || ""} ${article.excerpt || ""} ${article.categoryName || ""} ${(article.keywords || []).join(" ")}`;
  const bodyText = (article.paragraphs || []).join(" ");

  const found = [];
  for (const { theme, re } of MATCHERS) {
    const inTitle = re.test(titleText);
    const inBody = re.test(bodyText);
    if (!inTitle && !inBody) continue;
    // Topic words in the title/headline count for more than ones buried in the body.
    found.push({ theme, weight: (inTitle ? 3 : 0) + (inBody ? 1 : 0) });
  }

  cache.set(article, found);
  return found;
}

/**
 * Guides most closely related to `slug`, by shared topic words.
 * Caps same-category suggestions so every article links across the site.
 */
export function getRelatedArticles(slug, articles, limit = 6) {
  const current = articles[slug];
  if (!current) return [];

  const currentThemes = themesFor(current);
  if (!currentThemes.length) return [];

  const generic = genericThemes(articles);
  const scored = [];
  for (const [otherSlug, other] of Object.entries(articles)) {
    if (otherSlug === slug || !other?.paragraphs) continue;

    const otherThemes = new Map(themesFor(other).map((t) => [t.theme, t.weight]));
    let score = 0;
    const shared = [];

    for (const { theme, weight } of currentThemes) {
      const otherWeight = otherThemes.get(theme);
      if (!otherWeight) continue;
      score += Math.min(weight, otherWeight) * (generic.has(theme) ? 0.35 : 1);
      shared.push(theme);
    }

    if (!score) continue;

    scored.push({
      slug: otherSlug,
      title: other.title,
      categoryName: other.categoryName,
      score,
      shared,
      sameCategory: other.category === current.category,
    });
  }

  scored.sort((a, b) => b.score - a.score || a.sameCategory - b.sameCategory);

  const picked = [];
  let sameCategoryCount = 0;
  for (const item of scored) {
    if (item.sameCategory) {
      if (sameCategoryCount >= 2) continue;
      sameCategoryCount += 1;
    }
    picked.push(item);
    if (picked.length >= limit) break;
  }

  return picked;
}

export { THEMES, STOPWORDS };