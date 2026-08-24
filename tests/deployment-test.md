# Deployment Test Spec

> Run after every deployment using **Chrome DevTools MCP**.
> Base URL: `https://schlosserei-maier-ulm.github.io`

---

## How to Run

Paste the prompt below into **opencode** (or any agent with Chrome DevTools MCP):

```
Read and execute the deployment test spec at tests/deployment-test.md against
https://schlosserei-maier-ulm.github.io using Chrome DevTools MCP.
Hard-reload each page (ignore cache). Report results as a checklist with
✓ pass / ✗ fail and a summary at the end.
```

### Agent Instructions

- **Hard-reload** every page with `ignoreCache: true` before testing.
- Use `take_snapshot` to inspect DOM content (headings, links, images, alt text).
- Use `list_network_requests` to verify no failed requests (404/5xx) and no external tracking.
- Use `list_console_messages` filtered to `["error"]` to check for JS errors.
- Use `evaluate_script` to check `document.cookie`, `localStorage`, `sessionStorage`.
- Use `click` to test lightbox and interactive elements.
- When checking images: verify `<img>` elements exist in DOM with correct `src` and that
  the corresponding network request returned HTTP 200 (not 404 or broken).
- When a check says "no `{BASE}`": search snapshot text and all `href`/`src` attributes for
  literal `{BASE}` or URL-encoded `%7BBASE%7D`.

---

## 1. Homepage Completeness (`/`)

Navigate to base URL, hard-reload (ignore cache).

### 1.1 Header (loaded via includes/header.html)
- [ ] Logo image `Maier-Logo-2.jpg` loads (HTTP 200, `alt="Maier Metallbau"`)
- [ ] Brand text shows "MAIER METALLBAU GMBH" and "SCHLOSSEREI · ULM"
- [ ] Nav links exist: Über uns, Leistungen, Einblicke, Ausbildung, Kontakt
- [ ] Nav links point to `#about`, `#services`, `#gallery`, `#apprenticeship`, `#contact`
- [ ] Phone link `tel:073163784` present
- [ ] **No `{BASE}` or `%7BBASE%7D` in any URL or text** (critical)

### 1.2 Hero Section
- [ ] Heading "Ihr Spezialist in der Bearbeitung von Edelstahl-..." visible
- [ ] Subtext mentions "Privatkunden, öffentliche Auftraggeber und Industrie"
- [ ] CTA buttons: "Leistungen entdecken" → `#services`, "Kontakt & Anfahrt" → `#contact`
- [ ] 3 hero images load (all HTTP 200):
  1. `Stahlwangentreppe-mit-Podest.jpg` — alt "Stahlwangentreppe"
  2. `Freitragendes-Vordach-mit-Milchglasfüllung-Wandkonsolen-pulverbeschichtet.jpg` — alt "Vordach"
  3. `Balkongeländer-Milchglasfüllung.jpg` — alt "Balkongeländer"

### 1.3 About Section (`#about`)
- [ ] Heading "Herzlich willkommen bei der Maier Metallbau GmbH"
- [ ] Text mentions "3. Generation" and "Familienbetrieb"
- [ ] Customer list includes: DB Deutsche Bahn, Stadtwerke Ulm, Stadt Ulm
- [ ] Team info: "4 Metallbau-Meister · 1 Geselle · 2 Auszubildende"

### 1.4 Opening Hours (loaded from data/messages.json)
- [ ] "Öffnungszeiten" heading visible
- [ ] Shows "Mo. – Do.: 7.00 – 16.00 Uhr" (from messages.json)
- [ ] Shows "Freitag: geschlossen" (from messages.json)
- [ ] Note: "Termine außerhalb der Zeiten nach Vereinbarung." present

### 1.5 Services Section (`#services`)
- [ ] Heading "Vielseitiges Angebot"
- [ ] 8 service cards present (count = 8), each with image + heading + description:
  1. **Balkone** → `pages/balkone.html` — image `Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg`
  2. **Treppen** → `pages/treppen.html` — image `Stahltreppe-verzinkt-mit-Gitterroststufen-und-Edelstahlhandlauf-e1472556612387.jpg`
  3. **Vordächer** → `pages/vordaecher.html` — image `Edelstahlvordach-mit-Klarglasfüllung.jpg`
  4. **Französische Balkone** → `pages/franzoesische-balkone.html` — image `IMG_3310.jpg`
  5. **Gartentüren** → `pages/gartentueren.html` — image `Gartentüre-aus-Flachstahl.jpg`
  6. **Briefkastenanlagen** → `pages/briefkastenanlagen.html` — image `Freistehender-Briefkasten.jpg`
  7. **Sonderkonstruktionen** → `pages/sonderkonstruktionen.html` — image `Blumenkübel-II.jpg`
   8. **Einblicke** → `pages/galerie.html` — image `Stahlwangentreppe-mit-Podest.jpg`
- [ ] All 8 service card images load (HTTP 200, none broken)

### 1.6 Gallery Section (`#gallery`)
- [ ] Heading "Ausgewählte Referenzen"
- [ ] Container has `data-gallery` attribute (enables lightbox)
- [ ] 8 gallery images present and loading (HTTP 200):
  1. `Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg` — alt "Treppengeländer aus Glas"
  2. `Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg` — alt "Hoftor mit Trespa"
  3. `Blumenkübel-I.jpg` — alt "Blumenkübel"
  4. `IMG_0774-e1495619568874.jpg` — alt "Glasgeländer"
  5. `Fenstergitter-in-verzinkter-Ausführung.jpg` — alt "Fenstergitter"
  6. `Rampe-II-scaled-e1728295107225.jpeg` — alt "Rollstuhlrampe"
  7. `Sichtschutz-Edelstahlleiste-Motivglas-I.jpg` — alt "Sichtschutz"
  8. `Edelstahltreppengeländer.jpg` — alt "Edelstahlgeländer"
- [ ] All images have non-empty `alt` text

### 1.7 Apprenticeship Section (`#apprenticeship`)
- [ ] Heading mentions "Metallbauer (m/w/d)"
- [ ] "Fachrichtung Konstruktionstechnik" present
- [ ] Email link to `schlosserei-maier@freenet.de`
- [ ] Link "Details zur Ausbildung" → `pages/ausbildung.html`
- [ ] Image `Ausbildungsbescheinigung-HwK-Ulm.jpg` loads (HTTP 200)

### 1.8 Contact Section (`#contact`)
- [ ] Address: "Schillerstr. 50, 89077 Ulm"
- [ ] Phone: "0731 63784"
- [ ] Email link to `schlosserei-maier@freenet.de`
- [ ] "Anfahrt & Route" button → `pages/anfahrt.html`
- [ ] "Google Maps öffnen" link → external Google Maps URL
- [ ] Image `Schillerstrasse50.jpg` loads (HTTP 200)

### 1.9 Footer (loaded via includes/footer.html)
- [ ] Logo image `Maier-Logo-2.jpg` loads (HTTP 200)
- [ ] Address: "Schillerstr. 50" and "89077 Ulm"
- [ ] Phone and email present
- [ ] "Seiten" column links: Einblicke, Ausbildung, Öffnungszeiten, Anfahrt
- [ ] "Rechtliches" column links: Impressum, Datenschutzerklärung, Sitemap
- [ ] Copyright "© Maier Metallbau GmbH"
- [ ] **No `{BASE}` or `%7BBASE%7D` in any URL or text**

### 1.10 Announcement Banner (from data/messages.json)
- [ ] If `announcement.enabled` is `true`, banner appears at top of page
- [ ] Banner title: "Ausbildung" (from messages.json)
- [ ] Banner text contains "Für Herbst 2026" (from messages.json)
- [ ] Close button (×) exists; clicking it dismisses the banner

### 1.11 Homepage Image Count
- [ ] **Total: 21 `<img>` tags** on homepage (excluding header/footer logo = 19 page images + 2 logos)

---

## 2. Console & Network Checks (Homepage)

- [ ] **No console errors** (`list_console_messages` with `types: ["error"]` returns empty)
- [ ] **No failed network requests** (no HTTP 404 or 5xx in `list_network_requests`)
- [ ] **No requests to external domains** except `github.io` / `github.com`
- [ ] **No requests to `fonts.googleapis.com` or `fonts.gstatic.com`** (DSGVO: fonts must be self-hosted)
- [ ] **No tracking/analytics requests** (no google-analytics, gtag, fbq, hotjar, matomo URLs)
- [ ] **Font files loaded from** `/assets/fonts/` (same origin):
  - `manrope-latin-400-normal.woff2`
  - `manrope-latin-500-normal.woff2`
  - `manrope-latin-600-normal.woff2`
  - `manrope-latin-700-normal.woff2`

---

## 3. Service Pages — Per-Page Image Verification

For **each** service page: navigate directly, hard-reload, verify header/footer,
check for `{BASE}` issues, check console for errors, verify all images.

### 3.1 Balkone (`/pages/balkone.html`)

- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" links to `../index.html`, "Balkone" shown
- [ ] No console errors
- [ ] **9 images** present and loading (HTTP 200):
  1. `Balkongeländer-Milchglasfüllung.jpg` — alt "Balkongeländer mit Milchglas"
  2. `Balkongeländer-MilchglasfüllungII.jpg` — alt "Balkongeländer Milchglas II"
  3. `Balkongeländer-Milchglasfüllung-mit-Handlauf.jpg` — alt "Balkongeländer mit Handlauf"
  4. `Balkongeländer-mit-VA-Halterungen-und-Milchglasfüllung.jpg` — alt "Balkon VA Halter"
  5. `Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg` — alt "Lamellen Geländer"
  6. `Balkongeländer-mit-satiniertem-Glas.jpg` — alt "Satiniertes Glas"
  7. `Verz.-Ausführung-Füllung-Trespaplatten-II.jpg` — alt "Trespa Balkonanlage"
  8. `Verzinkte-Ausführung-Füllung-Trespaplatten.jpg` — alt "Verzinkte Balkonanlage"
  9. `Verz.-Ausführung-Lochblechfüllung.jpg` — alt "Lochblech Balkonanlage"

### 3.2 Treppen (`/pages/treppen.html`)

- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`, "Treppen" shown
- [ ] No console errors
- [ ] **9 images** present and loading (HTTP 200):
  1. `Stahlwangentreppe-mit-Podest.jpg` — alt "Stahlwangentreppe"
  2. `Stahltreppe-verzinkt-mit-Gitterroststufen-und-Edelstahlhandlauf-e1472556612387.jpg` — alt "Außentreppe verzinkt"
  3. `DSC01602.jpg` — alt "Stahltreppe verzinkt"
  4. `IMG_0841-e1495619483297.jpg` — alt "Stahlwangentreppe verzinkt"
  5. `Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg` — alt "Glasgeländer"
  6. `VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-I.jpg` — alt "VA Glasgeländer"
  7. `VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-II.jpg` — alt "VA Glasgeländer II"
  8. `VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-III-e1495619337769.jpg` — alt "VA Glasgeländer III"
  9. `TreppenhausfestverglasungI.jpg` — alt "Treppenhaus Festverglasung"

### 3.3 Vordächer (`/pages/vordaecher.html`)

- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`, "Vordächer" shown
- [ ] No console errors
- [ ] **8 images** present and loading (HTTP 200):
  1. `Freitragendes-Vordach-mit-Milchglasfüllung-Wandkonsolen-pulverbeschichtet.jpg` — alt "Freitragendes Vordach"
  2. `Edelstahlvordach-mit-Klarglasfüllung.jpg` — alt "Edelstahlvordach"
  3. `DSC00235-1.jpg` — alt "Glasvordach auf Halterungen"
  4. `DSC01658-1.jpg` — alt "Glasvordach"
  5. `Glasvordach-mit-Edelstahlpunkthaltern-e1495617990629.jpg` — alt "Glasvordach Punkthalter"
  6. `Terrassenüberdachung-verzinkte-Ausführung-I.jpg` — alt "Terrassenüberdachung verzinkt"
  7. `Balkon-und-Terrassenüberdachung-in-verzinkter-Ausführung.jpg` — alt "Pergola verzinkt"
  8. `DSC01659.jpg` — alt "Pergola"

### 3.4 Französische Balkone (`/pages/franzoesische-balkone.html`)

- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`, "Französische Balkone" shown
- [ ] No console errors
- [ ] **5 images** present and loading (HTTP 200):
  1. `IMG_3310.jpg` — alt "Französischer Balkon Glas"
  2. `IMG_3311.jpg` — alt "Französischer Balkon Edelstahl"
  3. `Edelstahl-mit-Klarglas-ohne-Handlauf.jpg` — alt "Glasgeländer ohne Handlauf"
  4. `TreppenhausfestverglasungI.jpg` — alt "Festverglasung"
  5. `TreppenhausfestverglasungII.jpg` — alt "Festverglasung Detail"

### 3.5 Gartentüren (`/pages/gartentueren.html`)

- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`, "Gartentüren" shown
- [ ] No console errors
- [ ] **6 images** present and loading (HTTP 200):
  1. `Gartentüre-aus-Flachstahl.jpg` — alt "Gartentüre Flachstahl"
  2. `Gartentüre-Rahmen-verzinkt-Füllung-Trespa-e1570009070479.jpg` — alt "Gartentüre Trespa"
  3. `Gartentüre-mit-Briefkastenanlage.jpg` — alt "Gartentüre mit Briefkasten"
  4. `Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg` — alt "Hoftor Trespa"
  5. `Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa-1.jpg` — alt "Hoftor Detail"
  6. `DSC00852.jpg` — alt "Toranlage"

### 3.6 Briefkastenanlagen (`/pages/briefkastenanlagen.html`)

- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`, "Briefkastenanlagen" shown
- [ ] No console errors
- [ ] **5 images** present and loading (HTTP 200):
  1. `Freistehender-Briefkasten.jpg` — alt "Freistehender Briefkasten"
  2. `Gartentüre-mit-Briefkastenanlage.jpg` — alt "Briefkasten in Tor"
  3. `Briefkasten.jpg` — alt "Briefkasten pulverbeschichtet"
  4. `DSC01603.jpg` — alt "Mehrfachanlage"
  5. `DSC01602.jpg` — alt "Briefkasten Edelstahl"

### 3.7 Sonderkonstruktionen (`/pages/sonderkonstruktionen.html`)

- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`, "Sonderkonstruktionen" shown
- [ ] No console errors
- [ ] **8 images** present and loading (HTTP 200):
  1. `Sichtschutz-Edelstahlleiste-Motivglas-I.jpg` — alt "Sichtschutz Motivglas"
  2. `Blumenkübel-I.jpg` — alt "Blumenkübel"
  3. `Blumenkübel-II.jpg` — alt "Blumenkübel II"
  4. `Rampe-II-scaled-e1728295107225.jpeg` — alt "Rampe verzinkt"
  5. `Rollstuhlrampe-verzinkte-Ausführung.jpg` — alt "Rollstuhlrampe"
  6. `Holzregal.jpg` — alt "Holzregal"
  7. `Weinregal.jpg` — alt "Weinregal"
  8. `VA-Riffelblech.jpg` — alt "Riffelblech"

---

## 4. Gallery Page (`/pages/galerie.html`)

Navigate to gallery page, hard-reload.

### 4.1 Page Structure
- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`, "Einblicke" shown
- [ ] No console errors
- [ ] Gallery grid container has class `gallery-grid` (enables lightbox)

### 4.2 Gallery Images — 12 Total
- [ ] **12 images** present in gallery grid, all loading (HTTP 200):
  1. `Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg` — alt "Balkongeländer Lamellen"
  2. `Stahlwangentreppe-mit-Podest.jpg` — alt "Stahlwangentreppe"
  3. `Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg` — alt "Glasgeländer"
  4. `Glasvordach-mit-Edelstahlpunkthaltern-e1495617990629.jpg` — alt "Glasvordach"
  5. `Gartentüre-aus-Flachstahl.jpg` — alt "Gartentüre"
  6. `Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg` — alt "Hoftor"
  7. `Freistehender-Briefkasten.jpg` — alt "Briefkasten"
  8. `Sichtschutz-Edelstahlleiste-Motivglas-I.jpg` — alt "Sichtschutz"
  9. `Rampe-II-scaled-e1728295107225.jpeg` — alt "Rampe"
  10. `Blumenkübel-II.jpg` — alt "Blumenkübel"
  11. `IMG_0774-e1495619568874.jpg` — alt "Glasgeländer Balkon"
  12. `Terrassenüberdachung-verzinkte-Ausführung-I.jpg` — alt "Terrassenüberdachung"
- [ ] All images have non-empty `alt` text

### 4.3 Lightbox Functionality
- [ ] Click any gallery image → lightbox overlay appears (element with class `lightbox`)
- [ ] Lightbox shows enlarged version of clicked image
- [ ] Click overlay background or close mechanism → lightbox closes
- [ ] After closing, page returns to normal state

---

## 5. Other Content Pages

### 5.1 Ausbildung (`/pages/ausbildung.html`)
- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`
- [ ] No console errors
- [ ] Content mentions "Metallbauer (m/w/d)" and "Konstruktionstechnik"
- [ ] Email link to `schlosserei-maier@freenet.de`
- [ ] **1 image**: `Ausbildungsbescheinigung-HwK-Ulm.jpg` loads (HTTP 200)

### 5.2 Öffnungszeiten (`/pages/oeffnungszeiten.html`)
- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`
- [ ] No console errors
- [ ] Shows opening hours (from messages.json or hardcoded)
- [ ] **1 image**: `Schillerstrasse50.jpg` loads (HTTP 200)

### 5.3 Anfahrt (`/pages/anfahrt.html`)
- [ ] Page loads (HTTP 200), heading visible
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] Breadcrumb: "Start" → `../index.html`
- [ ] No console errors
- [ ] Address info present: "Schillerstraße 50", "89077 Ulm"
- [ ] Google Maps link present (external, opens in new tab)
- [ ] **1 image**: `Schillerstrasse50.jpg` loads (HTTP 200)

---

## 6. Impressum Correctness (`/pages/impressum.html`)

Navigate to impressum page, hard-reload. Verify all required legal content per **§ 5 TMG**:

### 6.1 Required Company Information
- [ ] **Company name:** "Maier Metallbau GmbH"
- [ ] **Address:** "Schillerstraße 50", "89077 Ulm"
- [ ] **Phone:** "0731 63784"
- [ ] **Email:** "schlosserei-maier@freenet.de" (as clickable `mailto:` link)
- [ ] **Vertreten durch:** "Stefan Maier"

### 6.2 Required Registration Info
- [ ] **Registergericht:** "Ulm"
- [ ] **Registernummer:** "HRB 1083"
- [ ] **USt-ID:** "DE147033013"

### 6.3 Required Insurance Info
- [ ] **Berufshaftpflichtversicherung:** "SV SparkassenVersicherung"
- [ ] Location: "Stuttgart"

### 6.4 Legal Sections
- [ ] **§ 5 TMG** reference present in heading or text
- [ ] **Haftung für Inhalte** section — references § 7 Abs. 1 TMG
- [ ] **Haftung für Links** section present
- [ ] **Urheberrecht** section present

### 6.5 Source Code Section
- [ ] **Quelltext** section present
- [ ] Link to `https://github.com/schlosserei-maier-ulm/schlosserei-maier-ulm.github.io`
  - [ ] Has `target="_blank"`
  - [ ] Has `rel="noreferrer"`
- [ ] Link to GitHub issues page
  - [ ] Has `target="_blank"`
  - [ ] Has `rel="noreferrer"`

### 6.6 Page Structure
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] No console errors

---

## 7. Datenschutzerklärung Correctness (`/pages/datenschutz.html`)

Navigate to datenschutz page, hard-reload. Verify all required privacy content per **DSGVO**:

### 7.1 § 1 — Verantwortlicher
- [ ] Company name, address, phone, email present
- [ ] Matches impressum contact data

### 7.2 § 2 — Hosting
- [ ] Mentions "GitHub Pages" as hosting provider
- [ ] References **Art. 6 Abs. 1 lit. f DSGVO** (legitimate interest)
- [ ] Mentions **IP-Adresse** processing
- [ ] Mentions **Server-Logfiles**
- [ ] Link to GitHub repo with `target="_blank"` and `rel="noreferrer"`

### 7.3 § 3 — Keine Cookies, kein Tracking
- [ ] **Explicit statement** that no cookies are set
- [ ] **Explicit statement** that no tracking takes place

### 7.4 § 4 — Kontaktaufnahme
- [ ] Email processing disclosure present
- [ ] References **Art. 6 Abs. 1 lit. b DSGVO** (contract fulfillment)

### 7.5 § 5 — Externe Links (Google Maps)
- [ ] Mentions data transfer to Google when using Maps link
- [ ] Link to `policies.google.com/privacy`
  - [ ] Has `target="_blank"`
  - [ ] Has `rel="noreferrer"`

### 7.6 § 6 — Ihre Rechte
- [ ] References **Art. 15–21 DSGVO**
- [ ] Mentions: Auskunft, Berichtigung, Löschung
- [ ] Mentions **Beschwerderecht bei Aufsichtsbehörde**

### 7.7 § 7 — Aktualität
- [ ] States privacy policy is updated as needed

### 7.8 Page Structure
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] No console errors

---

## 8. DSGVO Compliance (Live Verification)

These checks must be performed on **every page** visited during the test run.
At minimum, verify on: homepage, one service page, galerie, impressum, datenschutz.

### 8.1 No Cookies
- [ ] `evaluate_script`: `() => document.cookie` returns empty string
- [ ] No cookie banner present (none needed)

### 8.2 No Client-Side Storage Tracking
- [ ] `evaluate_script`: `() => Object.keys(localStorage)` returns empty or no tracking keys
- [ ] `evaluate_script`: `() => Object.keys(sessionStorage)` returns empty or no tracking keys

### 8.3 Self-Hosted Fonts
- [ ] `list_network_requests`: font files served from `schlosserei-maier-ulm.github.io/assets/fonts/`
- [ ] **No requests to `fonts.googleapis.com`**
- [ ] **No requests to `fonts.gstatic.com`**
- [ ] 4 font files loaded:
  - `manrope-latin-400-normal.woff2`
  - `manrope-latin-500-normal.woff2`
  - `manrope-latin-600-normal.woff2`
  - `manrope-latin-700-normal.woff2`

### 8.4 No Tracking Scripts
- [ ] No requests to: `google-analytics.com`, `googletagmanager.com`, `facebook.net`, `hotjar.com`, `matomo`
- [ ] No `<script>` tags loading external analytics

### 8.5 No Embedded Iframes
- [ ] No `<iframe>` elements in DOM on any page
- [ ] Google Maps is **external link only** (not embedded)

### 8.6 External Link Attributes
- [ ] All `<a>` tags with external `href` (not same domain, not `mailto:`, not `tel:`) have:
  - `target="_blank"`
  - `rel="noreferrer"`

---

## 9. Sitemap Completeness (`/pages/sitemap.html`)

Navigate to sitemap page, hard-reload.

- [ ] Page loads (HTTP 200)
- [ ] Header/footer render correctly, no `{BASE}` in any URL
- [ ] No console errors
- [ ] Lists **all 15 pages** as clickable links:
  1. `../index.html` (Startseite)
  2. `balkone.html`
  3. `treppen.html`
  4. `vordaecher.html`
  5. `franzoesische-balkone.html`
  6. `gartentueren.html`
  7. `briefkastenanlagen.html`
  8. `sonderkonstruktionen.html`
  9. `galerie.html`
  10. `ausbildung.html`
  11. `anfahrt.html`
  12. `oeffnungszeiten.html`
  13. `impressum.html`
  14. `datenschutz.html`
  15. `sitemap.html`
- [ ] Every link resolves (not 404)

---

## 10. Messages System Verification

### 10.1 Data File
- [ ] `data/messages.json` is fetchable (HTTP 200, valid JSON)
- [ ] Contains `announcement.enabled`, `announcement.title`, `announcement.text`
- [ ] Contains `opening_hours.lines[]` and `opening_hours.note`

### 10.2 Announcement Banner
- [ ] On homepage: if `enabled: true`, banner appears
- [ ] On a subpage (e.g. balkone.html): banner also appears
- [ ] Banner shows title from JSON: "Ausbildung"
- [ ] Banner shows text from JSON containing "Für Herbst 2026"
- [ ] Close button (×) click removes banner from DOM

### 10.3 Opening Hours
- [ ] Homepage `#contact` area or opening hours section shows data from `messages.json`
- [ ] Lines match: "Mo. – Do.: 7.00 – 16.00 Uhr", "Freitag: geschlossen"
- [ ] Note matches: "Termine außerhalb der Zeiten nach Vereinbarung."

---

## 11. Lightbox Functionality (Homepage)

Test on homepage gallery section (`#gallery` with `data-gallery`):

- [ ] Click first gallery image → lightbox overlay appears
- [ ] Lightbox has class `lightbox` and is visible (not `display: none`)
- [ ] Lightbox contains `<img>` with same `src` as clicked image
- [ ] Click on lightbox overlay → lightbox closes (removed from DOM or hidden)
- [ ] No console errors during lightbox open/close cycle

---

## 12. Cross-Page Link Verification

### 12.1 Homepage Internal Links
All internal links on the homepage must resolve (not 404):
- [ ] Service cards: 8 links to `/pages/*.html`
- [ ] Footer "Seiten": Einblicke, Ausbildung, Öffnungszeiten, Anfahrt
- [ ] Footer "Rechtliches": Impressum, Datenschutzerklärung, Sitemap
- [ ] Apprenticeship "Details zur Ausbildung" → `pages/ausbildung.html`
- [ ] Contact "Anfahrt & Route" → `pages/anfahrt.html`

### 12.2 Subpage Header Navigation
From any subpage (e.g. `pages/balkone.html`):
- [ ] Logo link → `../index.html` (resolves, not 404, not `{BASE}`)
- [ ] "Über uns" → `../index.html#about`
- [ ] "Leistungen" → `../index.html#services`
- [ ] "Einblicke" → `../index.html#gallery`
- [ ] "Ausbildung" → `../index.html#apprenticeship`
- [ ] "Kontakt" → `../index.html#contact`
- [ ] Phone link: `tel:073163784`

### 12.3 Subpage Footer Links
From any subpage:
- [ ] Einblicke → `galerie.html` (resolves)
- [ ] Ausbildung → `ausbildung.html` (resolves)
- [ ] Öffnungszeiten → `oeffnungszeiten.html` (resolves)
- [ ] Anfahrt → `anfahrt.html` (resolves)
- [ ] Impressum → `impressum.html` (resolves)
- [ ] Datenschutzerklärung → `datenschutz.html` (resolves)
- [ ] Sitemap → `sitemap.html` (resolves)

### 12.4 Breadcrumb Links (All Subpages)
Every subpage should have a breadcrumb where "Start" links to `../index.html`:
- [ ] balkone.html — breadcrumb "Start" → `../index.html`
- [ ] treppen.html — breadcrumb "Start" → `../index.html`
- [ ] vordaecher.html — breadcrumb "Start" → `../index.html`
- [ ] franzoesische-balkone.html — breadcrumb "Start" → `../index.html`
- [ ] gartentueren.html — breadcrumb "Start" → `../index.html`
- [ ] briefkastenanlagen.html — breadcrumb "Start" → `../index.html`
- [ ] sonderkonstruktionen.html — breadcrumb "Start" → `../index.html`
- [ ] galerie.html — breadcrumb "Start" → `../index.html`
- [ ] ausbildung.html — breadcrumb "Start" → `../index.html`
- [ ] oeffnungszeiten.html — breadcrumb "Start" → `../index.html`
- [ ] anfahrt.html — breadcrumb "Start" → `../index.html`
- [ ] impressum.html — breadcrumb "Start" → `../index.html`
- [ ] datenschutz.html — breadcrumb "Start" → `../index.html`
- [ ] sitemap.html — breadcrumb "Start" → `../index.html`

---

## 13. Complete Image Inventory — 53 Unique Files

Every unique image file referenced across all pages. The agent should verify each file
is accessible at `https://schlosserei-maier-ulm.github.io/assets/images/{FILENAME}`
(HTTP 200, not 404).

| # | Filename | Used on |
|---|----------|---------|
| 1 | `Ausbildungsbescheinigung-HwK-Ulm.jpg` | index, ausbildung |
| 2 | `Balkon-und-Terrassenüberdachung-in-verzinkter-Ausführung.jpg` | vordaecher |
| 3 | `Balkongeländer-Milchglasfüllung-mit-Handlauf.jpg` | balkone |
| 4 | `Balkongeländer-Milchglasfüllung.jpg` | index, balkone |
| 5 | `Balkongeländer-MilchglasfüllungII.jpg` | balkone |
| 6 | `Balkongeländer-mit-VA-Halterungen-und-Milchglasfüllung.jpg` | balkone |
| 7 | `Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg` | index, balkone, galerie |
| 8 | `Balkongeländer-mit-satiniertem-Glas.jpg` | balkone |
| 9 | `Blumenkübel-I.jpg` | index, sonderkonstruktionen |
| 10 | `Blumenkübel-II.jpg` | index, sonderkonstruktionen, galerie |
| 11 | `Briefkasten.jpg` | briefkastenanlagen |
| 12 | `DSC00235-1.jpg` | vordaecher |
| 13 | `DSC00852.jpg` | gartentueren |
| 14 | `DSC01602.jpg` | treppen, briefkastenanlagen |
| 15 | `DSC01603.jpg` | briefkastenanlagen |
| 16 | `DSC01658-1.jpg` | vordaecher |
| 17 | `DSC01659.jpg` | vordaecher |
| 18 | `Edelstahl-mit-Klarglas-ohne-Handlauf.jpg` | franzoesische-balkone |
| 19 | `Edelstahltreppengeländer.jpg` | index |
| 20 | `Edelstahlvordach-mit-Klarglasfüllung.jpg` | index, vordaecher |
| 21 | `Fenstergitter-in-verzinkter-Ausführung.jpg` | index |
| 22 | `Freistehender-Briefkasten.jpg` | index, briefkastenanlagen, galerie |
| 23 | `Freitragendes-Vordach-mit-Milchglasfüllung-Wandkonsolen-pulverbeschichtet.jpg` | index, vordaecher |
| 24 | `Gartentüre-aus-Flachstahl.jpg` | index, gartentueren, galerie |
| 25 | `Gartentüre-mit-Briefkastenanlage.jpg` | gartentueren, briefkastenanlagen |
| 26 | `Gartentüre-Rahmen-verzinkt-Füllung-Trespa-e1570009070479.jpg` | gartentueren |
| 27 | `Glasvordach-mit-Edelstahlpunkthaltern-e1495617990629.jpg` | vordaecher, galerie |
| 28 | `Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa-1.jpg` | gartentueren |
| 29 | `Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg` | index, gartentueren, galerie |
| 30 | `Holzregal.jpg` | sonderkonstruktionen |
| 31 | `IMG_0774-e1495619568874.jpg` | index, galerie |
| 32 | `IMG_0841-e1495619483297.jpg` | treppen |
| 33 | `IMG_3310.jpg` | index, franzoesische-balkone |
| 34 | `IMG_3311.jpg` | franzoesische-balkone |
| 35 | `Maier-Logo-2.jpg` | header, footer (every page) |
| 36 | `Rampe-II-scaled-e1728295107225.jpeg` | index, sonderkonstruktionen, galerie |
| 37 | `Rollstuhlrampe-verzinkte-Ausführung.jpg` | sonderkonstruktionen |
| 38 | `Schillerstrasse50.jpg` | index, oeffnungszeiten, anfahrt |
| 39 | `Sichtschutz-Edelstahlleiste-Motivglas-I.jpg` | index, sonderkonstruktionen, galerie |
| 40 | `Stahltreppe-verzinkt-mit-Gitterroststufen-und-Edelstahlhandlauf-e1472556612387.jpg` | index, treppen |
| 41 | `Stahlwangentreppe-mit-Podest.jpg` | index, treppen, galerie |
| 42 | `Terrassenüberdachung-verzinkte-Ausführung-I.jpg` | vordaecher, galerie |
| 43 | `TreppenhausfestverglasungI.jpg` | treppen, franzoesische-balkone |
| 44 | `TreppenhausfestverglasungII.jpg` | franzoesische-balkone |
| 45 | `Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg` | index, treppen, galerie |
| 46 | `VA-Riffelblech.jpg` | sonderkonstruktionen |
| 47 | `VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-I.jpg` | treppen |
| 48 | `VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-II.jpg` | treppen |
| 49 | `VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-III-e1495619337769.jpg` | treppen |
| 50 | `Verz.-Ausführung-Füllung-Trespaplatten-II.jpg` | balkone |
| 51 | `Verz.-Ausführung-Lochblechfüllung.jpg` | balkone |
| 52 | `Verzinkte-Ausführung-Füllung-Trespaplatten.jpg` | balkone |
| 53 | `Weinregal.jpg` | sonderkonstruktionen |

### Verification Method
For each image, the agent can use `evaluate_script` to fetch and check HTTP status:
```javascript
async () => {
  const images = [ /* list of filenames */ ];
  const base = 'https://schlosserei-maier-ulm.github.io/assets/images/';
  const results = [];
  for (const img of images) {
    const resp = await fetch(base + encodeURIComponent(img), { method: 'HEAD' });
    results.push({ file: img, status: resp.status, ok: resp.ok });
  }
  return results.filter(r => !r.ok);
}
```
- [ ] All 53 images return HTTP 200
- [ ] Zero images return 404 or other error status

---

## Results Template

```
Deployment Test Results — [DATE]
URL: https://schlosserei-maier-ulm.github.io
Commit: [HASH]

Section 1  (Homepage):           ✓ __/__ passed
Section 2  (Console/Network):    ✓ __/__ passed
Section 3  (Service Pages):      ✓ __/__ passed
Section 4  (Gallery Page):       ✓ __/__ passed
Section 5  (Content Pages):      ✓ __/__ passed
Section 6  (Impressum):          ✓ __/__ passed
Section 7  (Datenschutz):        ✓ __/__ passed
Section 8  (DSGVO Compliance):   ✓ __/__ passed
Section 9  (Sitemap):            ✓ __/__ passed
Section 10 (Messages System):    ✓ __/__ passed
Section 11 (Lightbox):           ✓ __/__ passed
Section 12 (Cross-Page Links):   ✓ __/__ passed
Section 13 (Image Inventory):    ✓ __/__ passed

TOTAL: __/__ passed, __/__ failed

Issues found:
- [list any failures with details]
```
