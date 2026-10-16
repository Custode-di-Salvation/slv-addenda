// Schede di specie: tab e collegamenti diretti alle voci.
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.specie-container');
  if (!container) return;
  const tablist = container.querySelector('.specie-tabs');
  const tabs = [...container.querySelectorAll('.specie-tabs [role="tab"]')];
  const panels = [...container.querySelectorAll('.specie-tab-panel')];
  if (!tabs.length || !panels.length) return;
  let activeType = '';

  function selectTab(tab) {
    activeType = tab.dataset.tipo;
    tabs.forEach((button) => {
      const selected = button === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => { panel.hidden = panel.dataset.panelTipo !== activeType; });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus();
      selectTab(tabs[next]);
    });
  });
  tablist.hidden = false;
  selectTab(tabs.find((tab) => tab.dataset.tipo === 'potere') || tabs[0]);

  // Un link diretto mostra la tab corretta e apre solo la voce richiesta.
  function openFromHash() {
    let hash;
    try { hash = decodeURIComponent(window.location.hash.slice(1)); }
    catch { return; }
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target || !container.contains(target)) return;
    const panel = target.closest('.specie-tab-panel');
    if (!panel) return;
    const tab = tabs.find((button) => button.dataset.tipo === panel.dataset.panelTipo);
    if (tab) selectTab(tab);
    if (target.tagName === 'DETAILS') target.open = true;
    target.classList.add('potere-highlight');
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    setTimeout(() => target.scrollIntoView({ behavior, block: 'start' }), 50);
    setTimeout(() => target.classList.remove('potere-highlight'), 2200);
  }
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  container.querySelectorAll('.potere-lore, .potere-mech span, .potere-card-body p, .potere-card-body li, .potere-nota-body').forEach((element) => {
    element.innerHTML = element.innerHTML.replace(/(<span class="skill-ref">)?\[([^\]\[<>]{2,60})\](<\/span>)?/g, (match, openSpan, inner) => {
      const id = slugify(inner);
      const target = document.getElementById(id);
      if (target?.matches('.potere-item, .potere-card')) return `<a href="#${id}" class="potere-link">[${inner}]</a>`;
      return match;
    });
  });
});
