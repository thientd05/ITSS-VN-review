// ITSS Ôn tập — shared behaviour: theme toggle, auto-TOC, scrollspy
(function () {
  // ---- theme ----
  const root = document.documentElement;
  const saved = localStorage.getItem('itss-theme');
  if (saved) root.setAttribute('data-theme', saved);
  window.toggleTheme = function () {
    const cur = root.getAttribute('data-theme') === 'dark' ? '' : 'dark';
    if (cur) root.setAttribute('data-theme', cur); else root.removeAttribute('data-theme');
    localStorage.setItem('itss-theme', cur);
    const b = document.getElementById('themeBtn'); if (b) b.textContent = cur ? '☀︎' : '☾';
  };
  document.addEventListener('DOMContentLoaded', function () {
    const b = document.getElementById('themeBtn');
    if (b) b.textContent = root.getAttribute('data-theme') === 'dark' ? '☀︎' : '☾';

    // ---- auto TOC from h2/h3 in main.content ----
    const main = document.querySelector('main.content');
    const toc = document.querySelector('.toc nav');
    if (main && toc) {
      const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const heads = main.querySelectorAll('h2, h3');
      heads.forEach(h => {
        if (!h.id) h.id = slug(h.textContent) || ('s-' + Math.random().toString(36).slice(2, 7));
        const a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/^\s*\d+\s*/, '').trim();
        if (h.tagName === 'H3') a.className = 'lvl3';
        toc.appendChild(a);
      });
      // ---- scrollspy ----
      const links = Array.from(toc.querySelectorAll('a'));
      const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            links.forEach(a => a.classList.remove('active'));
            const a = map.get(e.target.id); if (a) a.classList.add('active');
          }
        });
      }, { rootMargin: '-72px 0px -70% 0px', threshold: 0 });
      heads.forEach(h => obs.observe(h));
    }
  });
})();
