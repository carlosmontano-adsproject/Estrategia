/* ============================================================
   AUREN SCROLLYTELLING ENGINE — interacciones
   - Contadores que animan al entrar en viewport
   - Side-nav activo por sección
   - Timeline que se "dibuja" al hacer scroll
   - Galería de video (Google Drive) con carga diferida
   - Waffle charts opcionales
   Requiere markup con clases del engine.css.
   ============================================================ */

// ---- Galería de video desde un array global `window.VIDEOS` ----
// Cada item: { n, title, phase, id }  (id = Google Drive file id)
function buildVideos() {
  const grid = document.getElementById('video-grid');
  if (!grid || !window.VIDEOS) return;
  window.VIDEOS.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <div class="video-frame" data-id="${v.id}">
        <span class="video-num">${v.n}</span>
        <div class="video-placeholder" role="button" tabindex="0" aria-label="Reproducir ${v.title}">
          <span class="video-play"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
          <span>Reproducir</span>
        </div>
      </div>
      <div class="video-body">
        <span class="video-phase-tag">${v.phase || ''}</span>
        <span class="video-title">${v.title}</span>
      </div>`;
    const ph = card.querySelector('.video-placeholder');
    const frame = card.querySelector('.video-frame');
    const load = () => {
      const iframe = document.createElement('iframe');
      iframe.src = `https://drive.google.com/file/d/${v.id}/preview`;
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;
      frame.appendChild(iframe);
      ph.remove();
    };
    ph.addEventListener('click', load);
    ph.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); } });
    grid.appendChild(card);
  });
}

// ---- Contador ----
function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';
  const target = parseFloat(el.dataset.counter);
  const decimals = parseInt(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  (function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toLocaleString('es-MX', { maximumFractionDigits: decimals, minimumFractionDigits: decimals }) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  })(start);
}

// ---- Timeline reveal ----
function revealTimeline() {
  const fill = document.getElementById('timeline-fill');
  if (fill && !fill.dataset.animated) { fill.dataset.animated = 'true'; setTimeout(() => fill.style.height = '100%', 100); }
  document.querySelectorAll('.timeline-item').forEach((item, idx) => {
    if (item.dataset.shown) return;
    item.dataset.shown = 'true';
    setTimeout(() => item.classList.add('show'), idx * 220);
  });
}

// ---- Video cards reveal ----
function revealVideos() {
  document.querySelectorAll('.video-card').forEach((card, idx) => {
    if (card.dataset.shown) return;
    card.dataset.shown = 'true';
    setTimeout(() => card.classList.add('show'), idx * 90);
  });
}

// ---- Waffle (opcional): div.waffle[data-a="74"] ----
function buildWaffle(el) {
  if (el.dataset.built) return;
  el.dataset.built = 'true';
  const a = parseInt(el.dataset.a || 0);
  for (let i = 1; i <= 100; i++) {
    const dot = document.createElement('div');
    dot.className = 'waffle-dot ' + (i <= a ? 'a' : 'b');
    el.appendChild(dot);
  }
  setTimeout(() => el.querySelectorAll('.waffle-dot').forEach((d, i) => setTimeout(() => d.classList.add('show'), i * 8)), 100);
}

// ---- Init ----
(function init() {
  buildVideos();

  const onView = el => {
    if (el.dataset.counter) animateCounter(el);
    if (el.id === 'timeline') revealTimeline();
    if (el.id === 'video-grid') revealVideos();
    if (el.classList && el.classList.contains('waffle')) buildWaffle(el);
  };

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) onView(e.target); }), { threshold: 0.25 });
    document.querySelectorAll('[data-counter], .waffle').forEach(el => obs.observe(el));
    ['timeline', 'video-grid'].forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
  } else {
    document.querySelectorAll('[data-counter]').forEach(animateCounter);
    document.querySelectorAll('.waffle').forEach(buildWaffle);
    revealTimeline(); revealVideos();
  }

  // Side-nav activo
  const navDots = document.querySelectorAll('.nav-dot');
  const navObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) navDots.forEach(d => d.classList.toggle('active', d.dataset.target === e.target.id));
  }), { rootMargin: '-40% 0px -40% 0px' });
  document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));
})();
