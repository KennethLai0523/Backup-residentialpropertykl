/**
 * Client-side SEO helpers (social tags + JSON-LD injection).
 * Dynamic pages still benefit crawlers that execute JS; keep accurate defaults in HTML.
 */

export const SITE_ORIGIN = "https://residentialpropertykl.com";
export const SITE_NAME = "Residential Property KL";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/logo.png`;

export function upsertMetaByProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function upsertMetaByName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function setCanonicalLink(href, id = "canonical-link") {
  let link = document.getElementById(id);
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * @param {{ title: string, description: string, url: string, image?: string, type?: string }} opts
 */
export function applySocialMeta(opts) {
  const image = opts.image || DEFAULT_OG_IMAGE;
  const type = opts.type || "website";

  upsertMetaByProperty("og:title", opts.title);
  upsertMetaByProperty("og:description", opts.description);
  upsertMetaByProperty("og:url", opts.url);
  upsertMetaByProperty("og:type", type);
  upsertMetaByProperty("og:image", image);
  upsertMetaByProperty("og:site_name", SITE_NAME);
  upsertMetaByProperty("og:locale", "en_MY");

  upsertMetaByName("twitter:card", "summary_large_image");
  upsertMetaByName("twitter:title", opts.title);
  upsertMetaByName("twitter:description", opts.description);
  upsertMetaByName("twitter:image", image);
}

export function injectJsonLd(id, data) {
  const old = document.getElementById(id);
  if (old) old.remove();
  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

/** Canonical URL for the current page (production host, no trailing slash except root). */
export function canonicalFromLocation() {
  const u = new URL(window.location.href);
  u.hash = "";
  let path = u.pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return `${SITE_ORIGIN}${path}${u.search}`;
}

/** Trim to ~140–160 chars for meta descriptions (word-safe). */
export function truncateMetaDescription(text, max = 158) {
  const s = String(text || "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

export function listingIntentLabel(listingType) {
  const v = String(listingType || "").toLowerCase();
  if (v.includes("rent")) return "For Rent";
  return "For Sale";
}

/** e.g. "Condominium For Sale in Mont Kiara | Residential Property KL" */
export function buildListingPageTitle(data) {
  const type = (data.type || "Property").trim();
  const intent = listingIntentLabel(data.listingType);
  const location = (data.location || data.city || data.area || "Klang Valley").trim();
  return `${type} ${intent} in ${location} | ${SITE_NAME}`;
}

export function buildListingMetaDescription(data) {
  const type = (data.type || "Property").trim();
  const intent = data.listingType === "rent" ? "for rent" : "for sale";
  const location = (data.location || data.city || data.area || "Kuala Lumpur").trim();
  const price = data.price ? String(data.price).trim() : "";
  const bua = data.bua ? `, ${data.bua} built-up` : "";
  const raw = price
    ? `${type} ${intent} in ${location}${bua}. ${price}. View photos, details and contact Residential Property KL.`
    : `${type} ${intent} in ${location}${bua}. Browse photos, property details and enquire with Residential Property KL for viewings.`;
  return truncateMetaDescription(raw);
}

/** Descriptive image alt for listing photos. */
export function buildListingImageAlt(data) {
  const type = (data.type || "Residential property").trim();
  const intent = data.listingType === "rent" ? "for rent" : "for sale";
  const location = (data.location || data.city || data.area || "Klang Valley").trim();
  const title = (data.title || "").trim();
  if (title) {
    return truncateMetaDescription(`${title} — ${type} ${intent} in ${location}`, 120);
  }
  return `${type} ${intent} in ${location}`;
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/images/logo.png`,
    email: "ResidentialPropertyKL@gmail.com",
    telephone: "+60-16-628-7357",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Petaling Jaya",
      addressRegion: "Selangor",
      addressCountry: "MY"
    },
    areaServed: [
      { "@type": "City", name: "Kuala Lumpur" },
      { "@type": "AdministrativeArea", name: "Selangor" },
      { "@type": "Place", name: "Klang Valley" }
    ]
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function applyPageSeo({ title, description, url, image, type = "website" }) {
  if (title) document.title = title;
  if (description) upsertMetaByName("description", description);
  if (url) setCanonicalLink(url);
  applySocialMeta({
    title: title || document.title,
    description: description || "",
    url: url || canonicalFromLocation(),
    image,
    type
  });
}
