# Poop Rescue Website Roadmap

## Goal
Expand SEO footprint and conversions by adding high-intent location and neighborhood pages with consistent design, internal links, and sitemap updates.

## Phase 1 — High-Intent Locations (publish first)
- Jacksonville Beach (done)
- San Marco (done)
- Riverside & Avondale (done)
- Southside (done)
- Arlington (done)
- Westside (done)
- Northside (done)
- Orange Park (done)
- Springfield (done)
- Bartram Park (done)
- Baymeadows (done)
- Deerwood (done)
- Julington Creek (done)
- St. Johns County (done)
- Ponte Vedra (done)

Additions next (Phase 1.1):
- Neptune Beach
- Atlantic Beach (distinct from Atlantic Beach Country Club)
- Nocatee
- Murray Hill
- Fleming Island
- Durbin Crossing

## Phase 2 — Prestigious/Gated Communities
- Queen's Harbour Yacht & Country Club (done)
- Glen Kernan Golf & Country Club (done)
- Pablo Creek Reserve (done)
- Jacksonville Golf & Country Club (done)
- Deercreek Country Club (done)
- Atlantic Beach Country Club (done)

Additions next:
- Epping Forest Yacht & Country Club
- Marsh Landing Country Club
- Sawgrass Players Club (TPC Sawgrass area)

## Phase 3 — Aggregate / Supporting Pages
- Beaches hub page (Jax Beach, Neptune, Atlantic)
- Southside hub page (Baymeadows, Deerwood, Tinseltown)
- Clay County hub (Orange Park, Fleming Island)

## Implementation Checklist (per new page)
- [ ] Create `slug.html` using existing neighborhood template (hero, service info, FAQ, CTA)
- [ ] Add meta title/description with local modifiers
- [ ] Include navigation and footer; ensure `script.js` and `styles.css` are loaded
- [ ] Add internal links to nearby areas and hub page(s)
- [ ] Add entry to `locations.html` (Featured or All grid as appropriate)
- [ ] Add `<url>` to `sitemap.xml` with `lastmod` and sensible priority
- [ ] Verify mobile layout and active nav state
- [ ] Test CTAs (tel: and contact anchors) and estimator if present

## Content Guidelines
- Tone: friendly, local, benefit-focused (align with `BRAND_GUIDE.md`)
- Use 2–3 unique local cues per page (parks, roads, landmarks)
- Keep headings scannable; include service frequency and add-ons
- Reuse component styles; do not duplicate CSS

## Tracking
- Organic keywords: area + dog waste removal, poop scoop + area
- GSC coverage: verify new URLs indexed
- Conversions: track clicks on tel: and contact CTA

## Next Up (immediate)
- [ ] Create: `neptune-beach.html`, `atlantic-beach.html`, `nocatee.html`
- [ ] Wire into `locations.html` and `sitemap.xml`
- [ ] Optional: add “Beaches” hub page and cross-link

