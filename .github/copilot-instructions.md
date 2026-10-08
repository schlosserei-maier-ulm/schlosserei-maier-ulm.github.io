# Maier Metallbau – Agent Guide

> See [SPEC.md](../SPEC.md) for full project requirements, DSGVO compliance, and site structure.

## Quick Reference

- **Stack:** Pure static HTML/CSS/JS. No frameworks, no build tools.
- **Fonts:** Self-host Manrope in `assets/fonts/` (DSGVO).
- **Styling:** Single stylesheet `assets/css/style.css` with CSS variables. Dark theme, blue/cyan accents.
- **Layout:** Reuse classes: `shell`, `section`, `two-col`, `card`, `service-grid`, `gallery-grid`, `pill-list`.
- **Images:** Store in `assets/images/`, optimize before commit, use meaningful `alt` text.
- **Paths:** Root pages use `/assets/...`; subpages use `../assets/...`.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Home page with anchors: `#about`, `#services`, `#apprenticeship`, `#contact`; Einblicke links to `pages/galerie/` |
| `includes/header.html` | Shared header/nav (loaded via JS) |
| `includes/footer.html` | Shared footer (loaded via JS) |
| `assets/css/style.css` | All styles; mobile rules in media query at bottom |
| `assets/js/main.js` | Loads header/footer/messages, lightbox for gallery |
| `data/messages.json` | Editable announcements & opening hours |
| `deploy.sh` | rsync to staging server |

## Rules

- Keep JS minimal.
- Header/footer are in `includes/`; edit there, not in individual pages.
- Update sitemap when adding/removing pages.
- No cookies, no tracking, no external requests.
- German language throughout; concise headings.

## Testing

- Run `bash tests/run-tests.sh` for automated checks (structure, DSGVO, includes, fonts).
- After deploying, run `tests/deployment-test.md` via Chrome DevTools MCP in opencode.
- To check all links programmatically: `grep -roPh 'href="[^"]*"' index.html includes/ pages/ | sort -u`
