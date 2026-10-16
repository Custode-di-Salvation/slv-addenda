(() => {
  const form = document.querySelector('.site-search');
  if (!form) return;
  const input = form.querySelector('input');
  const panel = form.querySelector('.site-search-results');
  const status = form.querySelector('.site-search-status');
  const list = form.querySelector('.site-search-list');
  const closeButton = form.querySelector('.site-search-close');
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let indexPromise, timer, revision = 0, suppressFocus = false;

  const loadIndex = () => indexPromise ||= fetch('/search-index.json').then((response) => {
    if (!response.ok) throw new Error('Search unavailable');
    return response.json();
  }).then((entries) => entries.map((entry) => ({ ...entry,
    titleKey: normalize(entry.title), contextKey: normalize(entry.context),
    textKey: normalize(`${entry.title} ${entry.context} ${entry.text}`),
  }))).catch((error) => { indexPromise = undefined; throw error; });

  const close = (restoreFocus = false) => {
    revision++; clearTimeout(timer); panel.hidden = true;
    if (restoreFocus) { suppressFocus = true; input.focus(); suppressFocus = false; }
  };
  const snippet = (entry, tokens) => {
    const text = entry.text;
    const key = normalize(text);
    const found = tokens.map((token) => key.indexOf(token)).filter((pos) => pos >= 0);
    const start = found.length ? Math.max(0, Math.min(...found) - 45) : 0;
    return `${start ? '…' : ''}${text.slice(start, start + 155)}${text.length > start + 155 ? '…' : ''}`;
  };

  async function render() {
    const current = ++revision;
    const query = normalize(input.value.trim());
    const tokens = query.match(/[\p{L}\p{N}]+/gu) || [];
    list.replaceChildren();
    if (query.length < 2 || !tokens.length) { close(); return; }
    panel.hidden = false;
    status.textContent = 'Ricerca…';
    try {
      const entries = await loadIndex();
      if (current !== revision) return;
      const matchers = tokens.map((token) => new RegExp(`(^|[^\\p{L}\\p{N}])${token}`, 'u'));
      const matches = entries.filter((entry) => matchers.every((matcher) => matcher.test(entry.textKey)))
        .map((entry) => ({ entry, score: (entry.titleKey === query ? 100 : 0)
          + (entry.titleKey.includes(query) ? 40 : 0)
          + tokens.reduce((score, token) => score + (entry.titleKey.includes(token) ? 10 : 0)
            + (entry.contextKey.includes(token) ? 3 : 0), 0) }))
        .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'it'));
      status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'risultato' : 'risultati'} nell’Addenda`
        : `Nessun risultato per “${input.value.trim()}”.`;
      const fragment = document.createDocumentFragment();
      for (const { entry } of matches) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = entry.href;
        const title = document.createElement('span');
        title.className = 'site-search-result-title';
        title.textContent = entry.title;
        const context = document.createElement('span');
        context.className = 'site-search-result-context';
        context.textContent = entry.context;
        const excerpt = document.createElement('span');
        excerpt.className = 'site-search-result-snippet';
        excerpt.textContent = snippet(entry, tokens);
        link.append(title, context, excerpt);
        item.append(link);
        fragment.append(item);
      }
      list.replaceChildren(fragment);
    } catch {
      if (current === revision) status.textContent = 'Ricerca momentaneamente non disponibile. Riprova.';
    }
  }

  input.addEventListener('input', () => {
    revision++;
    clearTimeout(timer);
    if (input.value.trim().length < 2) { close(); return; }
    timer = setTimeout(render, 120);
  });
  input.addEventListener('focus', () => { if (!suppressFocus && input.value.trim().length >= 2) render(); });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && !panel.hidden && list.querySelector('a')) {
      event.preventDefault(); list.querySelector('a').focus();
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); clearTimeout(timer); await render(); list.querySelector('a')?.focus();
  });
  form.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (!['ArrowDown', 'ArrowUp'].includes(event.key) || event.target === input) return;
    const links = [...list.querySelectorAll('a')];
    const position = links.indexOf(event.target);
    if (position < 0) return;
    event.preventDefault();
    const next = position + (event.key === 'ArrowDown' ? 1 : -1);
    if (next < 0) input.focus(); else links[Math.min(next, links.length - 1)]?.focus();
  });
  closeButton.addEventListener('click', () => close(true));
  list.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  document.addEventListener('pointerdown', (event) => { if (!form.contains(event.target)) close(); });
})();
