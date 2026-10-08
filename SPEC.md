# Maier Metallbau – Project Specification

> Website redesign for **Maier Metallbau GmbH**, Schlosserei Ulm  
> Target domain: **schlosserei-maier-ulm.de** (replaces existing site)

---

## 1. Project Overview

| Aspect | Details |
|--------|---------|
| **Client** | Maier Metallbau GmbH |
| **Current site** | https://schlosserei-maier-ulm.de/ |
| **Goal** | Replace existing site with modern, DSGVO-compliant static website |
| **Tech stack** | Pure HTML/CSS/JS (no backend) |
| **Repository** | https://github.com/schlosserei-maier-ulm/schlosserei-maier-ulm.github.io |
| **Staging** | https://home.thrx.de/maier/ |
| **Production** | https://schlosserei-maier-ulm.github.io (custom domain TBD) |
| **Hosting** | GitHub Pages |

---

## 2. Core Requirements

### 2.1 Responsive Design

- [ ] **Mobile-first** layout optimized for smartphones (320px+)
- [ ] **Tablet** breakpoint (~768px)
- [ ] **Desktop** breakpoint (~1024px+)
- [ ] Touch-friendly navigation with hamburger menu on mobile
- [ ] Readable font sizes (min 16px body text)
- [ ] Tap targets ≥ 44×44 px for buttons/links
- [ ] Images responsive via `srcset` or CSS `max-width: 100%`

### 2.2 DSGVO / Privacy Compliance

| Requirement | Implementation |
|-------------|----------------|
| **No cookies** | Do not set any cookies (session, analytics, or otherwise) |
| **No tracking** | No Google Analytics, Facebook Pixel, Hotjar, etc. |
| **No external requests** | Self-host all fonts and assets; no third-party resources |
| **No cookie banner** | Not required because no cookies/tracking are used |
| **Impressum** | Complete legal notice per § 5 TMG; include source code link |
| **Datenschutzerklärung** | Privacy policy per Art. 13/14 DSGVO; include GitHub hosting info |
| **Contact** | Phone/email only; no contact form (see future improvements) |
| **SSL/TLS** | HTTPS enforced (server config) |

#### Font Handling
Self-host Manrope font files in `assets/fonts/` to comply with DSGVO (no Google Fonts requests).

### 2.3 No Cookie Banner

Since the site:
- Sets no cookies
- Uses no tracking scripts
- Does not store user data in browser storage

…a cookie consent banner is **not required** under DSGVO/ePrivacy regulations.

---

## 3. Gallery Organization & Auto-Loading

All gallery pages have been organized into a dedicated subfolder with automatic image loading from categorized image directories.

### 3.1 Gallery Folder Structure

```
/pages/galerie/
├── index.html                    # Full gallery (all services)
├── balkone.html                  # Balkone & Balkongeländer
├── treppen.html                  # Treppen & Treppengeländer
├── vordaecher.html               # Vordächer & Terrassenüberdachungen
├── franzoesische-balkone.html    # Französische Balkone
├── gartentueren.html             # Gartentüren & Hoftore
├── briefkastenanlagen.html       # Briefkastenanlagen
└── sonderkonstruktionen.html     # Sonderkonstruktionen

/assets/images/galerie/
├── balkone/                      # Balkone images
├── treppen/                      # Treppen images
├── vordaecher/                   # Vordächer images
├── franzoesische-balkone/        # Französische Balkone images
├── gartentueren/                 # Gartentüren images
├── briefkastenanlagen/           # Briefkastenanlagen images
└── sonderkonstruktionen/         # Sonderkonstruktionen images
```

### 3.2 Automatic Image Loading

Each gallery page uses the `gallery-loader.js` script to automatically load and display all images from its corresponding folder:

- No manual HTML updates needed to add images
- Simply add new images to the correct subfolder
- Images are automatically displayed in the gallery grid
- Works for both service-specific galleries and the full gallery (aggregates all services)

**How it works:**
```javascript
<!-- Each gallery page includes a data-gallery attribute -->
<div class="gallery-grid" id="gallery" data-gallery="balkone"></div>

<!-- gallery-loader.js automatically populates it -->
<script src="../../assets/js/gallery-loader.js"></script>
```

### 3.3 Adding New Images

To add images to a service gallery:
1. Add image files to `assets/images/galerie/{service}/`
2. Update `assets/js/gallery-loader.js` image list for that service (optional, for ordering)
3. Push to GitHub – images appear automatically on next deployment

> **Note:** Image filenames must not contain customer names. Use neutral descriptive names (e.g. `R-Treppe.jpg` instead of `Riek-Treppe.jpg`).

### 3.4 Lightbox (Zoom View)

When a visitor clicks an image in any gallery, a lightbox overlay opens. Requirements:

- **Previous / Next buttons** – shown next to the **Schließen** button below the image to navigate within the current gallery without closing the lightbox
- **Schließen button** – centered in the control row below the image (not top-right corner); closes the lightbox
- Keyboard: `Escape` closes, `←` / `→` navigate
- Click outside the image also closes

### 3.5 Gallery Page – Back Navigation

Each gallery sub-page (`/pages/galerie/*.html`) must display a prominent **„Schließen"** button (or back link) that returns the visitor to the main index page (`/index.html#services`). It should be visible without scrolling (e.g. fixed or near the top of the page).

---

## 4. Editable Front-Page Messages

A static JSON file that JavaScript fetches on page load. Admin edits via GitHub web UI.

### 4.1 Use Cases

| Type | Example |
|------|---------|
| Job postings | "Für Herbst 2027 suchen wir interessierte und engagierte Auszubildende" |
| Opening hours | "Mo. – Do.: 7.00 – 16.00 Uhr / Freitag: geschlossen" |
| Announcements | "Betriebsurlaub 23.12. – 06.01." |

### 4.2 File Structure

```
/data/
└── messages.json      # Editable content

/includes/
├── header.html        # Shared header/nav
└── footer.html        # Shared footer
```

### 4.3 Data Structure (`messages.json`)

```json
{
  "announcement": {
    "enabled": true,
    "title": "Ausbildung",
    "text": "Für Herbst 2027 suchen wir interessierte und engagierte Auszubildende"
  },
  "opening_hours": {
    "lines": [
      "Mo. – Do.: 7.00 – 16.00 Uhr",
      "Freitag: geschlossen"
    ],
    "note": "Termine außerhalb der Zeiten nach Vereinbarung."
  }
}
```

### 4.4 Front-End Integration

```javascript
// assets/js/main.js
const BASE = location.pathname.includes('/pages/') ? '../' : './';

// Load header/footer
fetch(BASE + 'includes/header.html').then(r => r.text()).then(html => {
  document.getElementById('header').innerHTML = html;
});

// Load messages
fetch(BASE + 'data/messages.json').then(r => r.json()).then(data => {
  if (data.announcement?.enabled) {
    // Show banner
  }
});
```

### 4.5 Editing Workflow

1. Go to GitHub repo → `data/messages.json`
2. Click pencil icon to edit
3. Save (commit) → GitHub Pages rebuilds automatically (~1 min)

---

## 5. Site Structure

### 10.1 Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/index.html` | Hero, services overview, gallery teaser, contact |
| Gallery (Full) | `/pages/galerie/index.html` | Full gallery with all services |
| Balkone | `/pages/galerie/balkone.html` | Balconies & railings |
| Treppen | `/pages/galerie/treppen.html` | Stairs & handrails |
| Vordächer | `/pages/galerie/vordaecher.html` | Canopies |
| Franz. Balkone | `/pages/galerie/franzoesische-balkone.html` | French balconies |
| Gartentüren | `/pages/galerie/gartentueren.html` | Garden gates |
| Briefkastenanlagen | `/pages/galerie/briefkastenanlagen.html` | Mailbox systems |
| Sonderkonstruktionen | `/pages/galerie/sonderkonstruktionen.html` | Custom metalwork |
| Ausbildung | `/pages/ausbildung.html` | Apprenticeship info |
| Anfahrt | `/pages/anfahrt.html` | Directions & map |
| Öffnungszeiten | `/pages/oeffnungszeiten.html` | Opening hours |
| Impressum | `/pages/impressum.html` | Legal notice |
| Datenschutz | `/pages/datenschutz.html` | Privacy policy |
| Sitemap | `/pages/sitemap.html` | Site map |

### 10.2 Navigation Structure

```
Header Nav:
├── Über uns (#about)
├── Leistungen (#services)
├── Einblicke (/pages/galerie/)
├── Ausbildung (#apprenticeship)
└── Kontakt (#contact)

Footer:
├── Column 1: Leistungen (service pages)
├── Column 2: Informationen (Ausbildung, Öffnungszeiten, Anfahrt)
└── Column 3: Rechtliches (Impressum, Datenschutz, Sitemap)
```

---

## 6. Design System

### 10.1 Colors (CSS Variables)

| Variable | Usage |
|----------|-------|
| `--color-bg` | Dark background (gradient) |
| `--color-surface` | Card/section backgrounds |
| `--color-text` | Primary text (light) |
| `--color-accent` | Blue/cyan accent |
| `--color-muted` | Secondary text |

### 10.2 Typography

- **Primary font:** Manrope (self-hosted for DSGVO)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale:** 16px base, 1.25 ratio

### 10.3 Components

- `.shell` – max-width container
- `.section` – vertical spacing
- `.two-col` – two-column layout
- `.card` – content cards
- `.service-grid` – services overview
- `.gallery-grid` – masonry image grid
- `.pill-list` – tag/badge list
- `.btn` / `.btn--ghost` – buttons

---

## 7. Technical Constraints

### 10.1 Must Have
- Pure HTML/CSS/JS (no build tools, no frameworks)
- **Separation of content and layout:** Text/data in HTML or JSON, styling in CSS only
- **Reusable components:** Header and footer in separate files (`includes/header.html`, `includes/footer.html`), loaded via JavaScript
- Accessible (WCAG 2.1 AA)
- Fast loading (<3s on 3G)

### 10.2 Must NOT Have
- Cookies or local storage
- External tracking/analytics
- Contact forms or external form processors
- Heavy JavaScript frameworks
- CDN dependencies

---

## 8. Deployment

### 10.1 Staging (current)

```bash
# deploy.sh → https://home.thrx.de/maier/
rsync -avz --delete \
  --exclude '.git*' \
  --exclude 'deploy.sh' \
  ./ thr@gateway:/var/www/html/maier
```

### 10.2 Production (GitHub Pages)

- Repository: `schlosserei-maier-ulm/schlosserei-maier-ulm.github.io`
- URL: https://schlosserei-maier-ulm.github.io
- Custom domain: schlosserei-maier-ulm.de (via CNAME)
- Auto-deploy on push to `main`
- Messages edited via GitHub web UI

---

## 9. Checklist

### Pre-Launch
- [x] All pages responsive (test on real devices)
- [ ] Lighthouse mobile score ≥ 90
- [x] DSGVO compliance verified (no cookies, no tracking)
- [x] Impressum complete with correct company data
- [x] Impressum/Datenschutz include GitHub source & issues link
- [x] Datenschutz page complete
- [x] Fonts self-hosted in `assets/fonts/`
- [x] Messages.json loading works
- [ ] All images optimized (WebP preferred)
- [ ] Alt text on all images

### Post-Launch
- [ ] Old site redirects configured (if URLs change)
- [ ] SSL certificate active
- [ ] Client access documented (GitHub account or SSH/SFTP)

---

## 10. Future Improvements

| Feature | Priority | Notes |
|---------|----------|-------|
| Contact form | Medium | Simple form with server-side handler, minimal data |
| Web-based admin UI | Low | Only needed if not using GitHub Pages |
| Image lazy-loading | Low | Native `loading="lazy"` attribute |

---

## Appendix: DSGVO Status

| Item | Status |
|------|--------|
| No tracking scripts | ✅ |
| No cookies | ✅ |
| No external analytics | ✅ |
| No contact form | ✅ |
| Impressum present | ✅ |
| Datenschutz present | ✅ |
| Fonts self-hosted | ✅ |
| HTTPS enforced | ⏳ Server config |
