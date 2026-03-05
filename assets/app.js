/* ── Dinaria API Docs — app.js ───────────────────────────────────── */

let NAV = null;
let currentFile = null;

const DEFAULT_PAGE = 'content/index.md';

/* ── Bootstrap ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  NAV = await fetchNav();
  renderNav();

  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash && hash.endsWith('.md')) {
    loadPage('content/' + hash, labelFromFile(hash));
  } else {
    loadPage(DEFAULT_PAGE, 'Dinaria API');
  }

  window.addEventListener('hashchange', onHashChange);
});

/* ── Nav fetch ──────────────────────────────────────────────────── */
async function fetchNav() {
  try {
    const r = await fetch('data/nav.json');
    return await r.json();
  } catch (e) {
    console.error('Failed to load nav.json', e);
    return [];
  }
}

/* ── Nav render ─────────────────────────────────────────────────── */
function renderNav() {
  const tree = document.getElementById('nav-tree');
  tree.innerHTML = '';
  (NAV || []).forEach(item => {
    if (item.children) {
      tree.appendChild(buildSection(item));
    } else {
      tree.appendChild(buildLink(item.file, item.title, true));
    }
  });
  markActive(currentFile);
}

function buildSection(section) {
  const wrap = document.createElement('div');
  wrap.className = 'nav-section';

  const hdr = document.createElement('div');
  hdr.className = 'nav-section-header open';
  hdr.innerHTML = `<span>${section.title}</span>
    <svg class="nav-arrow" width="12" height="12" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>`;

  const kids = document.createElement('div');
  kids.className = 'nav-children';
  section.children.forEach(child => {
    kids.appendChild(buildLink(child.file, child.title, false));
  });

  hdr.addEventListener('click', () => {
    const open = hdr.classList.toggle('open');
    kids.classList.toggle('collapsed', !open);
  });

  wrap.appendChild(hdr);
  wrap.appendChild(kids);
  return wrap;
}

function buildLink(file, title, topLevel) {
  const a = document.createElement('a');
  a.href = '#' + encodeURIComponent(file.replace('content/', ''));
  a.className = 'nav-link' + (topLevel ? ' top-level' : '');
  a.dataset.file = file;
  a.textContent = title;
  a.addEventListener('click', e => {
    e.preventDefault();
    loadPage(file, title);
    closeSidebar();
  });
  return a;
}

function markActive(file) {
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.file === file);
  });
}

/* ── Page load ──────────────────────────────────────────────────── */
async function loadPage(file, title) {
  currentFile = file;
  markActive(file);
  history.replaceState(null, '', '#' + encodeURIComponent(file.replace('content/', '')));

  const inner = document.getElementById('content-inner');
  inner.innerHTML = '<div class="loading">Loading…</div>';

  try {
    const r = await fetch(file);
    if (!r.ok) throw new Error(`${r.status} — ${file}`);
    let md = await r.text();
    // Strip Jekyll / YAML front matter
    md = md.replace(/^---[\s\S]*?---\s*\n?/, '');
    inner.innerHTML = marked.parse(md);

    const h1 = inner.querySelector('h1');
    document.getElementById('topbar-title').textContent =
      h1 ? h1.textContent : title;

    document.getElementById('content').scrollTop = 0;
  } catch (e) {
    inner.innerHTML = `<div class="error-msg">
      <h2>Page not found</h2><p>${file}</p><small>${e.message}</small>
    </div>`;
  }
}

/* ── Hash routing ───────────────────────────────────────────────── */
function onHashChange() {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash && hash.endsWith('.md')) {
    const file = 'content/' + hash;
    if (file !== currentFile) loadPage(file, labelFromFile(hash));
  }
}

/* ── Helpers ────────────────────────────────────────────────────── */
function goHome() { loadPage(DEFAULT_PAGE, 'Dinaria API'); }

function labelFromFile(path) {
  return path.split('/').pop().replace('.md', '')
    .replace(/^\d+_/, '').replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('visible');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
}
