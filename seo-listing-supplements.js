/**
 * Appended SEO blocks for listing detail pages (does not replace agent descriptions).
 * Imported by detail.html after the main listing render.
 */

import { AREA_GUIDES } from "/seo-area-guide-data.js?v=1";

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ul(items) {
  if (!items || !items.length) {
    return "<p class=\"seo-muted\">See transport authority and mall websites for the latest routes and hours.</p>";
  }
  return `<ul class="seo-list">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
}

export function buildListingSeoSupplementHtml(data, areaGuide, relatedCardsHtml) {
  const loc = [data.location, data.city, data.area].filter(Boolean).join(", ") || "Klang Valley";
  const type = data.type || "Residential property";
  const intent = data.listingType === "rent" ? "rental" : "sale";

  const transport = areaGuide
    ? ul([...areaGuide.mrt, ...areaGuide.highways])
    : ul([
        "RapidKL buses and MRT/LRT — verify the nearest station on official journey planners.",
        "Major Klang Valley highways include Federal Highway, LDP, DUKE, and NKVE depending on sub-location."
      ]);

  const amenities = areaGuide
    ? ul([...areaGuide.malls, ...areaGuide.schools])
    : ul(["Shopping malls and schools vary by township; use maps to confirm distances from this listing."]);

  const areaBlock = areaGuide
    ? `<p>${esc(areaGuide.intro)}</p><p><strong>Local market note:</strong> ${esc(areaGuide.marketSummary)}</p>`
    : `<p>This listing is in <strong>${esc(loc)}</strong>. ${esc(type)} across Kuala Lumpur and Selangor trades in distinct sub-markets — compare similar sizes, tenure, and maintenance charges when benchmarking.</p>`;

  const rentComment =
    data.listingType === "rent"
      ? `<p><strong>Rental context:</strong> Tenant demand in this corridor is often linked to schools, medical clusters, and transit access. Ask the agent for recent transacted rents in the same building where available.</p>`
      : `<p><strong>Investment angle:</strong> For ${esc(intent)} stock, buyers often weigh holding costs (maintenance, sinking fund) against comparable yields in nearby townships. Past performance does not guarantee future returns.</p>`;

  const areaLinks = areaGuide
    ? areaGuide.relatedSlugs
        .map((s) => {
          const g = AREA_GUIDES[s];
          if (!g) return "";
          return `<a href="/areas/${esc(s)}">${esc(g.title)}</a>`;
        })
        .filter(Boolean)
        .join(" · ")
    : `<a href="/areas/mont-kiara">Mont Kiara</a> · <a href="/areas/bangsar">Bangsar</a> · <a href="/areas/petaling-jaya">Petaling Jaya</a>`;

  return `
<section class="seo-supplement" data-seo="listing-supplement" aria-label="Area and neighbourhood context">
  <div class="card">
    <div class="section-kicker">Neighbourhood &amp; connectivity</div>
    <h2>Nearby transport &amp; roads</h2>
    ${transport}
    <h2 style="margin-top:1.25rem;">Malls, schools &amp; amenities</h2>
    ${amenities}
  </div>
  <div class="card">
    <div class="section-kicker">Area summary</div>
    <h2>About this locality</h2>
    ${areaBlock}
    ${rentComment}
  </div>
  <div class="card">
    <div class="section-kicker">Explore further</div>
    <h2>Nearby area guides</h2>
    <p class="seo-muted">Editorial area pages with maps and curated context (internal links strengthen topical clusters):</p>
    <p class="seo-area-links">${areaLinks}</p>
  </div>
  <div class="card">
    <div class="section-kicker">More listings</div>
    <h2>Related properties</h2>
    <p class="seo-muted">Same database, filtered for relevance — always confirm availability with the agent.</p>
    <div class="seo-related-grid">${relatedCardsHtml || "<p class=\"seo-muted\">No related listings loaded.</p>"}</div>
  </div>
  <div class="card">
    <div class="section-kicker">FAQ</div>
    <h2>Common questions</h2>
    <dl class="seo-faq">
      <dt>Is the asking price negotiable?</dt>
      <dd>Many residential listings have room for negotiation depending on tenure, furnishing, and urgency. Your agent can advise on recent comparable transactions.</dd>
      <dt>How do I verify strata fees and sinking fund?</dt>
      <dd>Request the latest statement from the management office or developer panel. Fees can change with budgets approved at general meetings.</dd>
      <dt>Does this page replace the official listing description?</dt>
      <dd>No — the overview above is the agent description. This section adds general neighbourhood context for search users.</dd>
    </dl>
  </div>
</section>`;
}

export function buildRelatedListingCards(items, siteOrigin) {
  const origin = siteOrigin || "";
  return items
    .map((it) => {
      const slug = it.slug || "";
      const title = esc(it.title || "Listing");
      const pathSlug = slug || "listing";
      const href = `${origin}/listing/${pathSlug}-${it.id}`;
      const price = esc(it.price || "");
      const loc = esc(it.location || it.city || "");
      return `<article class="seo-related-card"><a href="${href}"><strong>${title}</strong><span class="seo-related-meta">${price}</span><span class="seo-related-meta">${loc}</span></a></article>`;
    })
    .join("");
}

export function buildListingFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the asking price negotiable for this property?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Negotiability depends on market conditions, seller motivation, and comparable stock. Contact Residential Property KL for guidance on offer strategy."
        }
      },
      {
        "@type": "Question",
        name: "How do I verify maintenance fees and sinking fund?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Request the latest management statement or developer schedule. Budgets approved at general meetings can change recurring charges."
        }
      },
      {
        "@type": "Question",
        name: "Does the neighbourhood section replace the listing description?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The agent description remains the primary property write-up; additional sections provide general locality context."
        }
      }
    ]
  };
}
