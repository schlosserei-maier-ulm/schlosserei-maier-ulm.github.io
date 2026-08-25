# Maier Metallbau – Implementation Todo & Testing Strategy

> For multi-agent orchestration (OpenCode, etc.)

---

## Phase 1: Core Infrastructure ✅

### 1.1 Includes System ✅
| Task | Status | Acceptance Criteria |
|------|--------|---------------------|
| Create `includes/header.html` | ✅ | Header HTML with `{BASE}` placeholders |
| Create `includes/footer.html` | ✅ | Footer HTML with `{BASE}` placeholders |
| Update `main.js` includes loader | ✅ | Loads header/footer, replaces `{BASE}` with detected path |

### 1.2 Fonts (DSGVO) ✅
| Task | Status | Acceptance Criteria |
|------|--------|---------------------|
| Download Manrope woff2 files | ✅ | 4 weights in `assets/fonts/` (400/500/600/700) |
| Create `@font-face` CSS | ✅ | Declarations at top of `style.css` |
| Remove Google Fonts links | ✅ | All 15 HTML files updated |

### 1.3 Messages System ✅
| Task | Status | Acceptance Criteria |
|------|--------|---------------------|
| Create `data/messages.json` | ✅ | Valid JSON with announcement & opening_hours |
| Implement messages loader | ✅ | Banner shows when enabled, hours card populated |

---

## Phase 2: Page Updates ✅

### 2.1 Update Pages for Includes ✅
All 15 pages updated: Google Fonts removed, header/footer replaced with `<div id="site-header/footer"></div>` placeholders.

| Page | Status |
|------|--------|
| index.html | ✅ |
| pages/balkone.html | ✅ |
| pages/treppen.html | ✅ |
| pages/vordaecher.html | ✅ |
| pages/franzoesische-balkone.html | ✅ |
| pages/gartentueren.html | ✅ |
| pages/briefkastenanlagen.html | ✅ |
| pages/sonderkonstruktionen.html | ✅ |
| pages/galerie.html | ✅ |
| pages/ausbildung.html | ✅ |
| pages/anfahrt.html | ✅ |
| pages/oeffnungszeiten.html | ✅ |
| pages/impressum.html | ✅ |
| pages/datenschutz.html | ✅ |
| pages/sitemap.html | ✅ |

### 2.2 Legal Pages Updates ✅
| Task | Page | Status |
|------|------|--------|
| Add Quelltext section with GitHub repo + issues links | impressum.html | ✅ |
| Add GitHub Pages hosting info with repo link | datenschutz.html | ✅ |

---

## Phase 3: Testing Strategy

### 3.1 Unit Tests (Per Component)

```yaml
test_includes:
  - name: Header loads on root page
    url: /index.html
    assert: document.querySelector('#header nav') exists
    
  - name: Header loads on subpage
    url: /pages/balkone.html
    assert: document.querySelector('#header nav') exists
    
  - name: Footer loads correctly
    url: /index.html
    assert: document.querySelector('#footer .site-footer') exists

test_messages:
  - name: Messages JSON is valid
    file: /data/messages.json
    assert: JSON.parse succeeds
    
  - name: Announcement shows when enabled
    setup: messages.json announcement.enabled = true
    url: /index.html
    assert: announcement banner visible
    
  - name: Announcement hidden when disabled
    setup: messages.json announcement.enabled = false
    url: /index.html
    assert: announcement banner not visible

test_fonts:
  - name: No external font requests
    url: /index.html
    assert: No requests to fonts.googleapis.com or fonts.gstatic.com
    
  - name: Manrope loads from local
    url: /index.html
    assert: Font files loaded from /assets/fonts/
```

### 3.2 Integration Tests

```yaml
test_navigation:
  - name: All nav links work from home
    url: /index.html
    actions:
      - click: nav a[href="#about"]
      - assert: #about section visible
      - click: nav a[href*="balkone"]
      - assert: url contains /pages/balkone.html

test_responsive:
  viewports:
    - { width: 375, height: 667, name: "iPhone SE" }
    - { width: 768, height: 1024, name: "iPad" }
    - { width: 1440, height: 900, name: "Desktop" }
  tests:
    - name: Header renders correctly
      assert: header visible, no horizontal scroll
    - name: Nav is accessible
      assert: mobile menu works OR desktop nav visible
    - name: Images don't overflow
      assert: all images max-width 100%
```

### 3.3 DSGVO Compliance Tests

```yaml
test_dsgvo:
  - name: No cookies set
    url: /index.html
    assert: document.cookie is empty
    
  - name: No localStorage used
    url: /index.html
    assert: localStorage is empty
    
  - name: No external requests (except none)
    url: /index.html
    assert: All requests to same origin or data: URIs
    
  - name: Impressum exists
    url: /pages/impressum.html
    assert: Contains "§ 5 TMG" or "Angaben gemäß"
    
  - name: Datenschutz exists
    url: /pages/datenschutz.html
    assert: Contains "DSGVO" or "Datenschutz"
```

### 3.4 Performance Tests (Lighthouse)

```yaml
lighthouse_thresholds:
  performance: 90
  accessibility: 90
  best-practices: 90
  seo: 90
  
pages_to_test:
  - /index.html
  - /pages/galerie.html  # Image-heavy
  - /pages/impressum.html
```

---

## Phase 4: Deployment Verification

### 4.1 GitHub Pages Checks
| Check | Command/Action |
|-------|----------------|
| Site loads | `curl -I https://schlosserei-maier-ulm.github.io` returns 200 |
| HTTPS works | Certificate valid |
| All pages accessible | Sitemap URLs return 200 |
| Images load | No 404s in network tab |

### 4.2 Cross-Browser Testing
| Browser | Viewport | Status |
|---------|----------|--------|
| Chrome Desktop | 1440px | ⏳ |
| Chrome Mobile | 375px | ⏳ |
| Firefox Desktop | 1440px | ⏳ |
| Safari Desktop | 1440px | ⏳ |
| Safari iOS | 375px | ⏳ |

---

## Agent Assignment Strategy

For OpenCode or similar multi-agent systems:

```
Agent Pool:
├── Agent-Infra    → Phase 1 (includes, fonts, messages)
├── Agent-Pages-1  → Update pages index.html - galerie.html
├── Agent-Pages-2  → Update pages ausbildung.html - sitemap.html
├── Agent-Test     → Write and run tests
└── Agent-Review   → Final review and fixes

Execution Order:
1. [Parallel] Agent-Infra completes Phase 1
2. [Parallel] Agent-Pages-1 + Agent-Pages-2 update all pages
3. [Sequential] Agent-Test runs all tests
4. [Sequential] Agent-Review fixes issues
5. [Manual] Human reviews and approves
```

---

## Quick Commands

```bash
# Local testing
python -m http.server 8000
# Open http://localhost:8000

# Lighthouse CLI
npx lighthouse http://localhost:8000 --view

# Check for external requests
curl -s http://localhost:8000 | grep -E "(googleapis|gstatic|analytics|facebook)"

# Deploy
git add -A && git commit -m "..." && git push
```

---

## Open Tasks

- [x] **Lightbox navigation & close button** — ✅ Implemented

- [x] **Gallery page back-navigation** — ✅ Implemented

- [x] **Sitemap gallery links broken** — ✅ Fixed

- [x] **Announcement banner unstyled** — ✅ CSS added

- [x] **Opening hours hardcoded** — ✅ Now dynamic via messages.json

- [x] **Compare with original site** — Compared via Chrome DevTools MCP (2026-04-21). See results below.

### Comparison Results: Original (WordPress) vs. Redesign (Static)

#### Section-by-Section Analysis

| Section | Original | Redesign | Status |
|---------|----------|----------|--------|
| **Header** | Logo image + site title + tagline | Logo text + nav + phone link | OK — improved |
| **Navigation** | Über uns, Unser Aufgabenbereich, Galerie (submenu), Anfahrt, Datenschutz, Impressum | Über uns, Leistungen, Einblicke, Ausbildung, Kontakt | OK — cleaner |
| **Sidebar** | Address, opening hours, job offers, search, Ausbildung (WordPress widgets) | Integrated into homepage sections (opening hours card, contact section) | OK — content preserved, layout modernized |
| **Homepage / About** | "Herzlich willkommen" text, customer list, team size, image slider | Same text, same customer list, same team, image stack | OK — content matches |
| **Services** | "Unser Aufgabenbereich" separate page (broken — showed Ausbildung post instead) | Service cards on homepage with images linking to gallery categories | OK — improved |
| **Gallery** | 8 categories: Balkone, Treppen, Vordächer, Franz. Balkone, **Carporte**, Gartentüren, Briefkastenanlagen, Verschiedenes | 7 categories: Balkone, Treppen, Vordächer, Franz. Balkone, Gartentüren, Briefkastenanlagen, Sonderkonstruktionen | DIFF — see below |
| **Ausbildung** | Job posting + link to profession description sub-page | Job posting with profession details integrated into same page | OK — improved |
| **Anfahrt** | Logo, address, email, static map image, Google Maps links | Address, email, static map image, Google Maps link with DSGVO notice | OK — improved |
| **Impressum** | Standard WordPress legal page | Standard legal page + source code links | OK — improved |
| **Datenschutz** | WordPress privacy policy | Custom DSGVO privacy policy + GitHub hosting info | OK — improved |
| **Footer** | "Datenschutzerklärung" link + "Mit Stolz präsentiert von WordPress" | 3-column footer (services, info, legal) | OK — improved |
| **Cookie banner** | "Diese Website verwendet technisch notwendige Cookies" | None (no cookies set = no banner needed) | OK — DSGVO improvement |

#### Findings / Differences

1. **Carporte gallery category missing** (LOW priority)
   - Original has "Carporte" as a gallery category, but its page content says "Wir sind noch mitten im Aufbau der neuen Internetseite. Wir bitten um Geduld!" — it's a placeholder with zero images.
   - **Decision: Skip** — the original never had actual Carporte content. If needed later, add as a Sonderkonstruktionen subcategory.

2. **"Verschiedenes" renamed to "Sonderkonstruktionen"** (OK)
   - The original called it "Verschiedenes" (miscellaneous). The redesign uses "Sonderkonstruktionen" (custom constructions) — a better, more professional label. Content is the same.

3. **"Unser Aufgabenbereich" page removed** (OK)
   - The original had a separate "Unser Aufgabenbereich" (services) page, but it was broken (displayed an Ausbildung blog post instead of services content). The redesign integrates services as cards on the homepage linking to gallery categories. This is an improvement.

4. **Profession description sub-page integrated** (OK)
   - Original had `/ausbildung-zum-metallbauer-beschreibung/` as a separate page with detailed profession info (job tasks, requirements, qualifications). The redesign integrates key points into the Ausbildung page directly. The detailed Bundesagentur-style text about the profession is condensed into practical bullet points. No content loss.

5. **Email address consistent** (OK)
   - Both sites use `schlosserei-maier@freenet.de`

6. **Job posting year outdated on original** (INFO)
   - Original says "Herbst 2025", redesign also says "Start Herbst 2025". Both should be updated to "Herbst 2026" before launch.

7. **Google Maps URL** (OK)
   - Both sites link to the same Google Maps location. Redesign adds DSGVO notice about data transfer to Google.

8. **Search functionality removed** (OK)
   - Original had a WordPress search widget in the sidebar. Redesign has no search (not needed for a ~16-page static site).

#### Conclusion

**No missing features or content.** The redesign covers all content from the original WordPress site. The only structural difference is the Carporte gallery category, which was a placeholder with no images on the original site. All text content, contact info, legal pages, and gallery images are present in the redesign.

**Action items before launch:**
- [x] Update "Herbst 2025" → "Herbst 2026" in `pages/ausbildung.html` and `index.html` (done 2026-04-21)
- [x] Responsive testing on mobile/tablet (done 2026-04-21)
- [x] DSGVO compliance audit (done 2026-04-21, passed)
- [x] Alt text audit and improvements (done 2026-04-21, 15 static + all dynamic images improved)
- [x] **Image optimization** — ✅ Completed (2026-04-22). Reduced 178 MB → 46 MB (74% savings). All images resized to max 1920px, EXIF metadata stripped with jpegoptim.
- [x] **Rename camera-filename images** (DSC/IMG) — ✅ Completed (2026-04-22). 13 camera-filenames renamed to descriptive German names; updated all HTML/JS references.
- [x] **Lighthouse audit** — ✅ Completed (2026-04-22). Results: Performance 66%, Accessibility 98%, Best Practices 96%, SEO 91%. CLS fixed with aspect-ratio CSS.
- [x] **Push to GitHub and verify deployment** — ✅ Completed (2026-04-22). All changes deployed to origin/main; GitHub Pages live with all renamed images working.

---

## Customer Feedback: Text Deviations from Original Site (2026-08-24)

Customer reported that texts differ from the original page. Detailed text-only comparison
(pure formatting differences like `·` vs `.`, time notation, or email capitalization excluded).

**Status: ✅ All items resolved (2026-08-24).** Changes uncommitted — see next steps below.

### A. Willkommen / Über uns (index.html, `#about`)

| # | Original | New | Type | Revert/Keep |
|---|----------|-----|------|-------------|
| **A1** | „Herzlich willkommen bei **der** Maier Metallbau **GmbH**" | „Herzlich willkommen bei Maier Metallbau" | Wording shortened | ✅ reverted |
| **A2** | „Mit **dieser** Erfahrung planen und fertigen wir individuell nach den Wünschen **und Vorstellungen** unserer Kunden. **Dabei stehen wir für höchste Qualität und Zuverlässigkeit.**" | „Mit **jahrzehntelanger** Erfahrung planen und fertigen wir individuell nach den Wünschen unserer Kunden **– von Einzelstücken bis zu kompletten Anlagen.**" | Rewritten | ✅ reverted |
| **A3** | „**Wir arbeiten für Privatkunden, sowie für städtische und staatliche Einrichtungen. Zu unseren Kunden gehören u. a. Firmen wie die** DB Deutsche Bahn, … **Staatliche Hochbauamt, Stadt Ulm, Stadt Neu-Ulm,** … **Otis Aufzüge, ThyssenKrupp Aufzüge, REWE-Märkte** und Noerpel Logistik." | „**Unsere Kunden: Privatkunden, Kommunen und Industrie, u. a.** DB Deutsche Bahn, … **Staatliches Hochbauamt, Stadt Ulm/Neu-Ulm,** … **OTIS, ThyssenKrupp, REWE** und Noerpel Logistik." | Rewritten + company names shortened | ✅ reverted, placed in box (`card card--border`) |
| **A4** | „**Gute Mitarbeiter sind das wertvollste Kapital eines Unternehmens!**" (heading) + „Wir sind stolz auf unser Team und freuen uns, dass wir langjährige Mitarbeiter in unserem Betrieb beschäftigen. Außerdem schauen wir in die Zukunft und bilden seit Jahrzehnten im Beruf Metallbauer (Konstruktionstechnik) aus." + „Die Erfahrung ‚der Alten' in Verbindung mit dem Tatendrang ‚der Jungen' ergibt für uns ein optimales Ergebnis." | **Completely missing** on new site | **Content dropped** | ✅ reverted (block restored) |
| **A5** | „**Zurzeit beschäftigen wir:** 4 Metallbau-Meister . 1 **Metallbau-**Geselle . …" | „**Team:** 4 Metallbau-Meister · 1 Geselle · …" | Wording shortened | ✅ reverted |
| **A6** | Tagline „**Ihr Spezialist in der Bearbeitung von Edelstahl-, Aluminium- und Stahlblechen!**" (site subtitle + h3 on homepage) | Replaced by „Metallbau mit Präzision in Edelstahl, Aluminium und Stahl" (hero h1) | Rewritten | ✅ reverted (now hero h1) |
| **A7** | „**Auf den nachfolgenden Seiten können Sie sich einen Überblick über unser vielseitiges Leistungsangebot machen.**" | Missing (replaced by new services intro) | Content dropped | ✅ done – adapted: „Verschaffen Sie sich einen Überblick …" |

### B. Ausbildung (index.html `#apprenticeship` + pages/ausbildung.html)

| # | Original | New | Type | Revert/Keep |
|---|----------|-----|------|-------------|
| **B1** | „Für Herbst **2025** suchen wir …" | „Für Herbst **2026** suchen wir …" | Intentional year update | ✅ kept |
| **B2** | „**Sollten Sie Interesse haben, freuen wir uns auf Ihre schriftliche Bewerbung an:** Maier Metallbau GmbH, Schillerstr. 50, 89077 Ulm **oder per E-Mail an:** …" | „Bewirb dich per E-Mail an … oder per Post an …" (Du-form!) | **Rewritten, Sie→Du form change** | ✅ reverted (index + ausbildung) |
| **B3** | — (no original source) | „Das lernst du bei uns" / „Das bringst du mit" lists, „Rahmenbedingungen" table (Dauer 3,5 Jahre, Vergütung nach Tarif, etc.) | **Newly invented content** | ✅ done – replaced with original IHK Berufsbeschreibung |
| **B4** | — | Index teaser had invented Du-form text („Du arbeitest nach Zeichnung…") + condensed requirements list | Newly invented content | ✅ removed – shortened to original wording |

### C. Newly written texts with no original source (cannot be reverted, only removed/adjusted)

| # | Location | New text | Revert/Keep |
|---|----------|----------|-------------|
| **C1** | Hero (index) | „Wir planen und fertigen nach Ihren Vorstellungen – für Privatkunden, öffentliche Auftraggeber und Industrie. Qualität, Zuverlässigkeit und saubere Ausführung stehen bei uns an erster Stelle." | ✅ kept |
| **C2** | Services intro (index) | „Wir fertigen Balkone, Treppen, Geländer, Vordächer, Türen, Briefkastenanlagen, Sonderkonstruktionen und mehr…" | ✅ kept |
| **C3** | All 8 service card descriptions (index) | e.g. „Stahl, Edelstahl oder Aluminium mit Glas, Lamellen oder Trespa-Füllungen." — original site had **no** such texts | ✅ kept |
| **C4** | Contact section (index) | „Wir freuen uns auf Ihre Anfrage", pill list „Planung & Beratung / Fertigung & Montage / Wartung & Reparatur" | ✅ kept |
| **C5** | Anfahrt page | „Unsere Werkstatt liegt verkehrsgünstig…" — original page had only address + Maps link | ✅ reverted (sentence removed) |

**Most likely customer concern:** A2, A3, A4 (rewritten/dropped „Über uns" texts) and B2 (formal „Sie" became informal „Du") + B3 (invented Rahmenbedingungen).

### Changed files (uncommitted)

- `index.html` — hero h1, Über-uns section, Ausbildungs-Teaser
- `pages/ausbildung.html` — full IHK Berufsbeschreibung, Sie-form application
- `pages/anfahrt.html` — intro sentence removed
- `tests/deployment-test.md` — heading checks updated to reverted texts
- `TODO.md` — this comparison table

### Next steps

- [x] Run `bash tests/run-tests.sh` — 23/23 passed (2026-08-24)
- [x] Visual check on local server — index + ausbildung verified (2026-08-24)
- [x] Add CHANGELOG.md entry (2026-08-24)
- [x] Commit + push → GitHub Pages deploy — commit `d8ca425` (2026-08-24)
- [x] Verify live site — reverted texts confirmed live (2026-08-24)
- [ ] Inform customer

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for full history.
