// Pagina di una singola Specie: ricerca testuale + filtro per tipo di voce
// (caratteristiche / avversioni / poteri) sugli accordion e le power-card
// già presenti nella pagina. Gestisce anche l'apertura automatica della
// voce puntata da un link con #ancora (es. da /specie/ o da un'altra scheda).
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('potereSearch');
  const counter = document.getElementById('potereCounter');
  const filterBtns = document.querySelectorAll('.potere-search .filter-btn');
  const items = document.querySelectorAll('[data-search]');

  if (!items.length) return;

  function applyFilters() {
    const term = (searchInput.value || '').trim().toLowerCase();
    const activeBtn = document.querySelector('.potere-search .filter-btn.active');
    const tipo = activeBtn ? activeBtn.dataset.tipo : 'all';

    let visible = 0;
    items.forEach((el) => {
      const matchesTipo = tipo === 'all' || el.dataset.tipo === tipo;
      const matchesTerm = !term || el.dataset.search.indexOf(term) !== -1;
      const show = matchesTipo && matchesTerm;
      el.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    if (counter) {
      const label = visible === 1 ? 'voce trovata' : 'voci trovate';
      counter.textContent = term || tipo !== 'all' ? visible + ' ' + label : '';
    }

    // Nasconde i sotto-titoli di gruppo (es. "Solo per angeli custodi") quando
    // il filtro/ricerca nasconde tutte le card sottostanti, per non lasciare
    // un'intestazione orfana senza nessun potere visibile sotto.
    document.querySelectorAll('.potere-gruppo-heading').forEach((heading) => {
      let sibling = heading.nextElementSibling;
      let hasVisible = false;
      while (sibling && !sibling.classList.contains('potere-gruppo-heading')) {
        if (sibling.style.display !== 'none') { hasVisible = true; break; }
        sibling = sibling.nextElementSibling;
      }
      heading.style.display = hasVisible ? '' : 'none';
    });
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
  applyFilters();

  // Apertura automatica da #ancora (link diretto da /specie/ o da un'altra scheda)
  function openFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;

    if (target.tagName === 'DETAILS') target.open = true;
    target.classList.add('potere-highlight');
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
    setTimeout(() => target.classList.remove('potere-highlight'), 2200);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  // Linkify poteri
  const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  document.querySelectorAll('.potere-lore, .potere-mech span, .potere-card-body p, .potere-card-body li').forEach(el => {
    el.innerHTML = el.innerHTML.replace(/(<span class="skill-ref">)?\[([^\]\[<>]{2,60})\](<\/span>)?/g, (match, openSpan, inner, closeSpan) => {
      const id = slugify(inner);
      const target = document.getElementById(id);
      if (target && (target.classList.contains('potere-item') || target.classList.contains('potere-card'))) {
        return `<a href="#${id}" class="potere-link">[${inner}]</a>`;
      }
      return match;
    });
  });
});
