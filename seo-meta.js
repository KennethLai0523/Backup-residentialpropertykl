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
