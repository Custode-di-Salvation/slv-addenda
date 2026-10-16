(() => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!header || !menu || !nav) return;

  document.documentElement.classList.add('navigation-ready');
  menu.hidden = false;
  const setMenu = (open) => {
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    menu.querySelector('i').className = `fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`;
  };
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  nav.querySelector('a.active')?.setAttribute('aria-current', 'page');
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
  }).observe(header);

  const main = document.querySelector('.main-content');
  const content = main?.querySelector('.page-content');
  const index = main?.querySelector('.page-index');
  if (!content || !index || document.body.matches('.is-home, .is-section-home') || content.querySelector('.specie-tabs')) return;
  // Le guide hanno già un indice aperto; conserviamo il ritorno all’inizio.
  if (content.querySelector('.divination-guide')) {
    const topLink = main.querySelector('.back-to-top');
    if (topLink) topLink.hidden = false;
    return;
  }
  const headings = [...content.querySelectorAll('.section-head h2, .creature-info-body h4, .creature-threat-card h4, .creature-origins h4')];
  if (headings.length < 2) return;

  const links = headings.map((heading, position) => {
    const section = heading.closest('section, .creature-info-item, .creature-threat-card, .creature-origins, .abilities') || heading;
    if (!section.id) {
      const slug = heading.textContent.trim().toLowerCase().normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      let id = slug || `sezione-${position + 1}`;
      while (document.getElementById(id)) id += `-${position + 1}`;
      section.id = id;
    }
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = heading.textContent.trim();
    index.querySelector('nav').append(link);
    return { section, link };
  });

  // Insert after the page introduction/facts, in the same full-width flow.
  const introduction = content.querySelector('.ritual-stats, .page-hero, .ritual-page-header, .specie-header, .creature-detail-header');
  const facts = content.querySelector('.ritual-stats');
  const placement = facts || introduction;
  if (placement) placement.after(index);
  else content.prepend(index);
  index.hidden = false;
  const topLink = main.querySelector('.back-to-top');
  if (topLink) topLink.hidden = false;
  const details = index.querySelector('details');
  const compact = window.matchMedia('(max-width: 700px)');
  const adaptIndex = () => { details.open = !compact.matches; };
  adaptIndex();
  compact.addEventListener('change', adaptIndex);

  let scheduled = false;
  const updateCurrent = () => {
    const visible = links.filter(({ section }) => section.getClientRects().length);
    const boundary = header.offsetHeight + 100;
    const current = visible.filter(({ section }) => section.getBoundingClientRect().top <= boundary).pop() || visible[0];
    links.forEach(({ section, link }) => {
      const isHidden = !section.getClientRects().length;
      if (link.hidden !== isHidden) link.hidden = isHidden;
      if (link === current?.link) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    index.hidden = visible.length === 0;
    scheduled = false;
  };
  const scheduleUpdate = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateCurrent); }
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  new MutationObserver((records) => {
    if (records.some(({ target }) => !index.contains(target))) scheduleUpdate();
  }).observe(content, { subtree: true, attributes: true, attributeFilter: ['style', 'hidden', 'class'] });
  updateCurrent();
})();
