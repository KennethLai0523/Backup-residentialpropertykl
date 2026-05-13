/**
 * SEO area cluster data — used by area-guide.html, listing-cluster.html, and listing detail supplements.
 * Each slug has unique copy to reduce thin/duplicate signals; filterKeywords drive Firestore client-side matching.
 */

export const AREA_GUIDE_SLUGS = [
  "mont-kiara",
  "klcc",
  "bangsar",
  "desa-parkcity",
  "shah-alam",
  "subang-jaya",
  "cheras",
  "petaling-jaya"
];

/** @type {Record<string, { title: string; intro: string; mrt: string[]; highways: string[]; malls: string[]; schools: string[]; marketSummary: string; mapCenter: [number, number]; mapZoom: number; filterKeywords: string[]; relatedSlugs: string[] }>} */
export const AREA_GUIDES = {
  "mont-kiara": {
    title: "Mont Kiara",
    intro:
      "Mont Kiara is one of Kuala Lumpur’s best-known expatriate-friendly neighbourhoods, combining low-rise landed pockets with high-rise condominiums, international schools, and a mature retail scene. Buyers and tenants often compare it with Damansara Heights and Sri Hartamas for lifestyle and connectivity.",
    mrt: ["MRT Kepong Baru / future extensions — verify on journey planners", "RapidKL buses along Jalan Duta and Sprint corridors"],
    highways: ["DUKE Highway", "Sprint Highway (Penchala Link access)", "Jalan Duta"],
    malls: ["1 Mont Kiara", "Plaza Mont Kiara", "Arcoris Mont Kiara", "163 Retail Park (nearby)"],
    schools: ["Mont’Kiara International School", "Garden International School (nearby)"],
    marketSummary:
      "Mont Kiara typically trades at a premium to wider KL averages for condominiums, supported by international demand and school catchments. Rental yields vary by building age, management quality, and unit size — larger family formats often lease faster to corporate tenants.",
    mapCenter: [3.1575, 101.6565],
    mapZoom: 14,
    filterKeywords: ["mont kiara", "montkiara", "mont'kiara"],
    relatedSlugs: ["bangsar", "klcc", "petaling-jaya"]
  },
  klcc: {
    title: "KLCC",
    intro:
      "The KLCC precinct centres on the Petronas Twin Towers and Suria KLCC, with a dense mix of luxury high-rises, corporate offices, and hospitality. It remains a flagship address for investors who prioritise landmark proximity and strong rental liquidity from expatriate and corporate demand.",
    mrt: ["LRT Kelana Jaya Line — KLCC station", "MRT / interchange access via nearby hubs (check live routes)"],
    highways: ["AKLEH", "Jalan Ampang", "Jalan Tun Razak"],
    malls: ["Suria KLCC", "Avenue K", "Lot 10 / Bukit Bintang walkable cluster"],
    schools: ["Sayfol International School", "Fairview International School (city campuses nearby)"],
    marketSummary:
      "KLCC condominiums often command top-tier PSF in Kuala Lumpur; micro-location (tower age, view, parking) drives spreads. Short-term rental regulations and building bylaws should be verified before yield assumptions.",
    mapCenter: [3.1579, 101.7118],
    mapZoom: 14,
    filterKeywords: ["klcc", "kuala lumpur city centre", "city centre", "suria klcc", "petronas"],
    relatedSlugs: ["mont-kiara", "bangsar", "cheras"]
  },
  bangsar: {
    title: "Bangsar",
    intro:
      "Bangsar blends village-like streets with upscale dining, boutique retail, and established condominiums. It appeals to professionals who want quick access to central KL while keeping a walkable, neighbourhood feel.",
    mrt: ["LRT Bangsar station (Kelana Jaya Line)", "KTM Mid Valley / Abdullah Hukum nearby"],
    highways: ["Federal Highway", "New Pantai Expressway (NPE)", "Sprint Highway"],
    malls: ["Bangsar Village I & II", "Mid Valley Megamall (short drive)", "KL Gateway Mall"],
    schools: ["SMK Bukit Bandaraya", "International schools in Damansara / Mont Kiara within commute"],
    marketSummary:
      "Bangsar sees steady demand for mid-size condos and select landed streets. Inventory turnover is sensitive to parking provision, walkability to Bangsar Baru, and proximity to medical clusters along Jalan Maarof.",
    mapCenter: [3.1291, 101.671],
    mapZoom: 14,
    filterKeywords: ["bangsar", "jalan telawi", "bangsar baru"],
    relatedSlugs: ["mont-kiara", "klcc", "petaling-jaya"]
  },
  "desa-parkcity": {
    title: "Desa ParkCity",
    intro:
      "Desa ParkCity is a master-planned township in northwest Kuala Lumpur known for family-oriented landed homes, lakeside parks, and a self-contained retail town centre. It attracts buyers prioritising gated-community feel within KL address boundaries.",
    mrt: ["MRT Kepong / future connectivity — plan trips with Moovit or Google Maps"],
    highways: ["DUKE Highway", "Lebuhraya Damansara–Puchong (LDP)", "Middle Ring Road 2 (MRR2)"],
    malls: ["The Waterfront @ ParkCity", "Plaza Arkadia"],
    schools: ["The International School @ ParkCity", "SJK(C) Desa ParkCity"],
    marketSummary:
      "Landed product often leads pricing in the township; high-rise supply has grown, so compare maintenance fees and density. Resale liquidity is generally strong for well-maintained phases facing the central park.",
    mapCenter: [3.1912, 101.6295],
    mapZoom: 13,
    filterKeywords: ["desa parkcity", "parkcity", "waterfront parkcity"],
    relatedSlugs: ["petaling-jaya", "mont-kiara", "shah-alam"]
  },
  "shah-alam": {
    title: "Shah Alam",
    intro:
      "Shah Alam is Selangor’s state capital with wide boulevards, industrial belts, and large residential townships. Value seekers often compare Setia Alam, Bukit Jelutong, and Section U for landed and high-rise options.",
    mrt: ["Shah Alam KTM Komuter stations", "future LRT/MRT alignments — confirm before marketing copy"],
    highways: ["Federal Highway", "Guthrie Corridor Expressway (GCE)", "ELITE Highway"],
    malls: ["Central i-City", "AEON Mall Shah Alam", "Setia City Mall"],
    schools: ["UiTM Shah Alam", "international schools in Setia Alam / Kota Kemuning"],
    marketSummary:
      "Shah Alam offers a broad PSF range: central sections and mature townships compete with newer growth corridors toward Setia Alam. Industrial proximity can affect micro-locational premiums for selected landed pockets.",
    mapCenter: [3.0733, 101.5185],
    mapZoom: 12,
    filterKeywords: ["shah alam", "setia alam", "bukit jelutong", "kot kemuning", "kota kemuning"],
    relatedSlugs: ["petaling-jaya", "subang-jaya", "cheras"]
  },
  "subang-jaya": {
    title: "Subang Jaya",
    intro:
      "Subang Jaya is a mature Klang Valley city with strong education, retail, and LRT connectivity. USJ and SS15 remain reference points for student housing, while newer high-rises cluster near LRT Kelana Jaya Line extensions.",
    mrt: ["LRT Kelana Jaya Line — SS15, SS18, USJ7, Taipan", "BRT Sunway Line (Sunway–USJ1)"],
    highways: ["KESAS Highway", "LDP", "Federal Highway"],
    malls: ["Sunway Pyramid", "Subang Parade", "Empire Subang", "Da Men USJ"],
    schools: ["INTI International College Subang", "Sunway University", "Taylor’s Lakeside nearby"],
    marketSummary:
      "Subang Jaya benefits from student and professional rental depth; smaller units near LRT can trade liquidity differently from large family condos. Compare maintenance charges across generations of buildings.",
    mapCenter: [3.0565, 101.5859],
    mapZoom: 13,
    filterKeywords: ["subang jaya", "subang", "usj", "ss15", "ss18"],
    relatedSlugs: ["petaling-jaya", "shah-alam", "cheras"]
  },
  cheras: {
    title: "Cheras",
    intro:
      "Cheras spans both Kuala Lumpur and Selangor, with dense condominiums along the MRT Kajang Line and established landed enclaves toward Ampang and Hulu Langat. It is a key corridor for commuters into the city centre.",
    mrt: ["MRT Kajang Line — Taman Connaught, Taman Mutiara, Maluri, etc.", "LRT Ampang Line (interchange Maluri)"],
    highways: ["Cheras–Kajang Highway", "MRR2", "Sungai Besi Expressway"],
    malls: ["Cheras LeisureMall", "Sunway Velocity", "MyTOWN / IKEA Cheras"],
    schools: ["UCSI University", "Taylor’s International School (if applicable to sub-area)"],
    marketSummary:
      "Cheras offers wide price bands: KL-side projects near MRT often compete on PSF with Selangor-side townships on land cost. Verify address council (DBKL vs MBSA) when comparing transactions.",
    mapCenter: [3.0738, 101.734],
    mapZoom: 12,
    filterKeywords: ["cheras", "taman connaught", "alam damai", "bandar tun razak", "maluri"],
    relatedSlugs: ["klcc", "petaling-jaya", "bangsar"]
  },
  "petaling-jaya": {
    title: "Petaling Jaya",
    intro:
      "Petaling Jaya (PJ) is a core Klang Valley municipality with mature commercial hubs, medical clusters, and diverse housing from Damansara to Kelana Jaya. It remains a default search axis alongside Kuala Lumpur for many buyers.",
    mrt: ["LRT Kelana Jaya Line across PJ sectors", "MRT Kajang Line edge stations depending on sub-area"],
    highways: ["LDP", "Sprint Highway", "Federal Highway", "NKVE"],
    malls: ["1 Utama", "The Curve / IPC", "Atria Shopping Gallery", "Paradigm Mall PJ"],
    schools: ["SMK [various]", "international schools in Damansara Utama / Ara Damansara"],
    marketSummary:
      "PJ inventory is fragmented by township age and access to LDP/Sprint. Damansara Utama and Mutiara Damansara often lead condo PSF within PJ, while Kelana Jaya maintains strong rental depth near office corridors.",
    mapCenter: [3.1047, 101.6067],
    mapZoom: 12,
    filterKeywords: ["petaling jaya", "pj", "damansara", "kelana jaya", "mutiara damansara", "bandar utama"],
    relatedSlugs: ["subang-jaya", "mont-kiara", "shah-alam"]
  }
};

export function getAreaGuide(slug) {
  const key = String(slug || "")
    .toLowerCase()
    .trim();
  return AREA_GUIDES[key] || null;
}

export function listingMatchesAreaKeywords(item, keywords) {
  const hay = [item.title, item.location, item.city, item.area, item.address, item.state]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return keywords.some((k) => hay.includes(String(k).toLowerCase()));
}

/**
 * Pick the best-matching area guide slug for a listing (for supplemental copy).
 * @returns {string|null}
 */
export function matchAreaSlugForListing(item) {
  const hay = [item.title, item.location, item.city, item.area, item.address, item.state]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  for (const slug of AREA_GUIDE_SLUGS) {
    const g = AREA_GUIDES[slug];
    if (g.filterKeywords.some((k) => hay.includes(k.toLowerCase()))) return slug;
  }
  return null;
}

/** Intent segments for /rent/{slug}, /condo/{slug}, etc. */
export const CLUSTER_INTENTS = ["rent", "sale", "condo", "office", "warehouse"];

export function parseClusterPath(pathname) {
  const parts = String(pathname || "")
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean);
  if (parts.length !== 2) return null;
  const [intent, slug] = parts;
  if (!CLUSTER_INTENTS.includes(intent)) return null;
  const guide = getAreaGuide(slug);
  if (!guide) return null;
  return { intent, slug, guide };
}
