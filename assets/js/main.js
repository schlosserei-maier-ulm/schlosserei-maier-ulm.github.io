// Detect base path: "../" for pages/, "./" for root
const BASE = location.pathname.includes('/pages/') ? '../' : './';

// Theme: follows system preference; manual choice travels via ?theme= URL param (no storage, DSGVO)
const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
let themeManual = false;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.textContent = theme === 'light' ? '\u263E' : '\u2600';
    btn.setAttribute('aria-label', theme === 'light' ? 'Dunkles Design aktivieren' : 'Helles Design aktivieren');
  }
}

// URL param wins over system preference
const urlTheme = new URLSearchParams(location.search).get('theme');
if (urlTheme === 'light' || urlTheme === 'dark') {
  themeManual = true;
  applyTheme(urlTheme);
} else {
  applyTheme(themeMedia.matches ? 'light' : 'dark');
}
themeMedia.addEventListener('change', e => {
  if (!themeManual) applyTheme(e.matches ? 'light' : 'dark');
});

// Carry manual theme choice across internal navigation
document.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a || !a.href || a.origin !== location.origin) return;
  const url = new URL(a.href);
  if (themeManual) url.searchParams.set('theme', document.documentElement.dataset.theme);
  else url.searchParams.delete('theme');
  a.href = url.toString();
});

// Load HTML includes
async function loadIncludes() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  if (header) {
    try {
      const res = await fetch(BASE + 'includes/header.html');
      if (res.ok) header.innerHTML = (await res.text()).replaceAll('{BASE}', BASE);
    } catch (e) {
      console.error('Header load failed:', e);
    }
  }

  if (footer) {
    try {
      const res = await fetch(BASE + 'includes/footer.html');
      if (res.ok) footer.innerHTML = (await res.text()).replaceAll('{BASE}', BASE);
    } catch (e) {
      console.error('Footer load failed:', e);
    }
  }
}

// Load messages and update UI
async function loadMessages() {
  try {
    const res = await fetch(BASE + 'data/messages.json');
    if (!res.ok) return;
    const data = await res.json();

    // Announcement banner
    if (data.announcement?.enabled) {
      const banner = document.createElement('div');
      banner.className = 'announcement-banner';
      banner.innerHTML = `
        <strong>${data.announcement.title}:</strong> ${data.announcement.text}
        <button class="announcement-banner__close" aria-label="Schließen">&times;</button>
      `;
      document.body.insertBefore(banner, document.body.firstChild);

      banner.querySelector('.announcement-banner__close').addEventListener('click', () => {
        banner.remove();
      });
    }

    // Opening hours card
    const hoursEl = document.getElementById('opening-hours');
    if (hoursEl && data.opening_hours) {
      const lines = data.opening_hours.lines.map(l => `<p>${l}</p>`).join('');
      const note = data.opening_hours.note ? `<p class="hours-note">${data.opening_hours.note}</p>` : '';
      hoursEl.innerHTML = lines + note;
    }
  } catch (e) {
    console.error('Messages load failed:', e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Load includes first, then messages
  await loadIncludes();
  await loadMessages();

  // Theme toggle lives in the header include, bind after load
  applyTheme(document.documentElement.dataset.theme);
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      themeManual = true;
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(next);
      const url = new URL(location.href);
      url.searchParams.set('theme', next);
      history.replaceState(null, '', url);
    });
  }

  // Inject back-to-gallery button on galerie sub-pages (below the gallery grid)
  const galleryMain = document.querySelector('main.shell');
  if (galleryMain && location.pathname.includes('/pages/galerie/') && !location.pathname.endsWith('/index.html')) {
    const backBtn = document.createElement('a');
    backBtn.href = '../../index.html#services';
    backBtn.className = 'gallery-close-btn';
    backBtn.innerHTML = '← Zurück zur Übersicht';
    galleryMain.appendChild(backBtn);
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-header .nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      nav.classList.toggle('is-open', !open);
    });
    // Close menu when a nav link is tapped
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }

  // Lightbox setup
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox__inner">
      <div class="lightbox__stage">
        <img alt="" />
      </div>
      <div class="lightbox__controls">
        <button class="lightbox__nav lightbox__nav--prev" aria-label="Vorheriges Bild">&#8249;</button>
        <button class="lightbox__close" aria-label="Schließen">Schließen</button>
        <button class="lightbox__nav lightbox__nav--next" aria-label="Nächstes Bild">&#8250;</button>
      </div>
    </div>`;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox__close');
  const lbPrev = lightbox.querySelector('.lightbox__nav--prev');
  const lbNext = lightbox.querySelector('.lightbox__nav--next');

  let galleryImgs = [];
  let currentIndex = 0;

  const updateNav = () => {
    lbPrev.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    lbNext.style.visibility = currentIndex < galleryImgs.length - 1 ? 'visible' : 'hidden';
  };

  const open = (imgs, index) => {
    galleryImgs = imgs;
    currentIndex = index;
    lbImg.src = galleryImgs[currentIndex].src;
    lbImg.alt = galleryImgs[currentIndex].alt || '';
    updateNav();
    lightbox.classList.add('active');
  };

  const close = () => lightbox.classList.remove('active');

  const navigate = (dir) => {
    currentIndex = Math.max(0, Math.min(galleryImgs.length - 1, currentIndex + dir));
    lbImg.src = galleryImgs[currentIndex].src;
    lbImg.alt = galleryImgs[currentIndex].alt || '';
    updateNav();
  };

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lbClose) close();
  });
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  document.querySelectorAll('[data-gallery] img, .gallery-grid img').forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const container = img.closest('[data-gallery]') || img.closest('.gallery-grid') || img.closest('.masonry');
      const imgs = container ? Array.from(container.querySelectorAll('img')) : [img];
      open(imgs, imgs.indexOf(img));
    });
  });
});
