/* ── Dinaria Docs app.js ─────────────────────────────────────────────
   Responsibilities:
   1. Persist & apply scope (argentina / brazil) via localStorage + URL hash
   2. Fetch nav.json and render sidebar nav for the active scope
   3. Fetch a .md file, strip any residual front-matter, render with marked.js
   4. Keep chips, nav links, and body class in sync
──────────────────────────────────────────────────────────────────── */

let NAV = null;
let currentScope = 'argentina';
let currentFile  = null;

/* ── Bootstrap ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  // Resolve initial scope from hash, then localStorage, then default
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash.startsWith('brazil/'))   currentScope = 'brazil';
  else if (hash.startsWith('argentina/')) currentScope = 'argentina';
  else currentScope = localStorage.getItem('dinaria-scope') || 'argentina';

  NAV = await fetchNav();
  applyScope(currentScope);
  renderNav(currentScope);

  // Load page from hash if present
  if (hash && hash.includes('/')) {
    const file = hash.replace(/^(argentina|brazil)\//, (_, s) => `content/${s}/`);
    const title = labelFromFile(file);
    loadPage(file, title);
  }

  window.addEventListener('hashchange', onHashChange);
});

/* ── Fetch nav.json ─────────────────────────────────────────────── */
async function fetchNav() {
  try {
    const r = await fetch('data/nav.json');
    return await r.json();
  } catch (e) {
    console.error('Failed to load nav.json', e);
    return { argentina: [], brazil: [] };
  }
}

/* ── Scope ──────────────────────────────────────────────────────── */
function setScope(scope) {
  currentScope = scope;
  localStorage.setItem('dinaria-scope', scope);
  applyScope(scope);
  renderNav(scope);
  // Always go to the Overview of the new scope when switching —
  // filenames differ between scopes so we cannot map them 1:1.
  currentFile = null;
  history.replaceState(null, '', '#');
  document.getElementById('content-inner').innerHTML = welcomeHTML();
  document.getElementById('topbar-title').textContent = 'Dinaria API Docs';
}

function applyScope(scope) {
  // Body class for CSS hooks
  document.body.classList.toggle('scope-brazil', scope === 'brazil');
  document.body.classList.toggle('scope-argentina', scope === 'argentina');

  // Sidebar chips
  document.getElementById('chip-argentina').classList.toggle('active-arg', scope === 'argentina');
  document.getElementById('chip-brazil').classList.toggle('active-bra', scope === 'brazil');

  // Topbar chips (mobile)
  const tca = document.getElementById('topbar-chip-argentina');
  const tcb = document.getElementById('topbar-chip-brazil');
  if (tca) tca.classList.toggle('active-arg', scope === 'argentina');
  if (tcb) tcb.classList.toggle('active-bra', scope === 'brazil');
}

/* ── Nav rendering ──────────────────────────────────────────────── */
function renderNav(scope) {
  const tree = document.getElementById('nav-tree');
  const items = NAV[scope] || [];
  tree.innerHTML = '';

  items.forEach(item => {
    if (item.children) {
      tree.appendChild(buildSection(item, scope));
    } else {
      tree.appendChild(buildLink(item.file, item.title, true));
    }
  });

  // Mark active link
  markActive(currentFile);
}

function buildSection(section, scope) {
  const wrap = document.createElement('div');
  wrap.className = 'nav-section';

  const header = document.createElement('div');
  header.className = 'nav-section-header open';
  header.innerHTML = `<span>${section.title}</span><svg class="nav-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>`;
  header.addEventListener('click', () => {
    const isOpen = header.classList.toggle('open');
    children.classList.toggle('collapsed', !isOpen);
  });

  const children = document.createElement('div');
  children.className = 'nav-children';
  section.children.forEach(child => {
    children.appendChild(buildLink(child.file, child.title, false));
  });

  wrap.appendChild(header);
  wrap.appendChild(children);
  return wrap;
}

function buildLink(file, title, topLevel) {
  const a = document.createElement('a');
  a.href = '#';
  a.className = 'nav-link' + (topLevel ? ' top-level' : '');
  a.dataset.file = file;
  a.textContent = title;
  a.addEventListener('click', e => {
    e.preventDefault();
    loadPage(file, title);
  });
  return a;
}

function markActive(file) {
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.file === file);
  });
}

/* ── Page loading ───────────────────────────────────────────────── */
async function loadPage(file, title) {
  currentFile = file;
  setHash(file);
  markActive(file);

  const inner = document.getElementById('content-inner');
  inner.innerHTML = '<div class="nav-loading">Loading...</div>';

  try {
    const r = await fetch(file);
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    let md = await r.text();
    // Strip Jekyll front matter (--- ... ---)
    md = md.replace(/^---[\s\S]*?---\s*/m, '');
    // Render
    inner.innerHTML = marked.parse(md);
    // Update topbar title
    const h1 = inner.querySelector('h1');
    document.getElementById('topbar-title').textContent = h1 ? h1.textContent : title;
    // Scroll to top
    document.getElementById('content').scrollTop = 0;
    window.scrollTo(0, 0);
  } catch (e) {
    inner.innerHTML = `<div class="error-msg"><h2>Page not found</h2><p>${file}</p><p style="color:#888">${e.message}</p></div>`;
  }
}

/* ── Hash routing ───────────────────────────────────────────────── */
function setHash(file) {
  // e.g. content/argentina/00_overview.md -> #argentina/00_overview.md
  const hash = file.replace('content/', '');
  history.replaceState(null, '', '#' + encodeURIComponent(hash));
}

function onHashChange() {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (!hash || !hash.includes('/')) return;
  const [scope, ...rest] = hash.split('/');
  if (scope === 'argentina' || scope === 'brazil') {
    const file = `content/${scope}/${rest.join('/')}`;
    if (scope !== currentScope) {
      currentScope = scope;
      applyScope(scope);
      renderNav(scope);
    }
    loadPage(file, labelFromFile(file));
  }
}

/* ── Home ───────────────────────────────────────────────────────── */
function goHome() {
  currentFile = null;
  history.replaceState(null, '', '#');
  document.getElementById('content-inner').innerHTML = welcomeHTML();
  document.getElementById('topbar-title').textContent = 'Dinaria API Docs';
  markActive(null);
}

function welcomeHTML() {
  return `<div class="welcome">
    <h1>Dinaria API Documentation</h1>
    <p>The Dinaria API lets you create, manage, and track payments through secure, backend-driven flows.</p>
    <p>Use the <strong>Argentina</strong> or <strong>Brazil</strong> chip to switch scopes. Each scope shows the relevant endpoints, identifiers (CBU/CVU for Argentina, PIX keys for Brazil), and currency (ARS / BRL).</p>
    <div class="welcome-links">
      <a href="#" onclick="setScope('argentina');loadPage('content/argentina/01_getting_started.md','Getting Started');return false;" class="welcome-btn">Get started &mdash; Argentina</a>
      <a href="#" onclick="setScope('brazil');loadPage('content/brazil/01_getting_started.md','Getting Started');return false;" class="welcome-btn brazil">Get started &mdash; Brazil</a>
    </div>
  </div>`;
}

/* ── Mobile sidebar ─────────────────────────────────────────────── */
function toggleSidebar() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('overlay');
  s.classList.toggle('open');
  o.classList.toggle('visible');
}

/* ── Helpers ────────────────────────────────────────────────────── */
function labelFromFile(file) {
  const base = file.split('/').pop().replace('.md', '');
  return base
    .replace(/^\d+_/, '')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
