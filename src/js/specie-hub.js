// Hub /specie/: ricerca trasversale su tutte le specie. Costruisce un
// indice piatto (caratteristiche + avversioni + poteri di ogni specie) da
// window.SPECIE (dump del data file), e lo filtra in tempo reale mostrando
// una lista di risultati che linkano direttamente alla voce sulla scheda
// della specie (#ancora, gestita da /js/specie.js).
document.addEventListener('DOMContentLoaded', () => {
  const data = window.SPECIE || [];
  const searchInput = document.getElementById('specieSearch');
  const counter = document.getElementById('specieCounter');
  const resultsBox = document.getElementById('specieResults');
  const cardsGrid = document.getElementById('specieCards');
  if (!searchInput || !resultsBox || !cardsGrid) return;

  function stripHtml(html) {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
  }

  const icons = {
    caratteristica: 'fa-solid fa-circle-info',
    avversione: 'fa-solid fa-triangle-exclamation',
    potere: 'fa-solid fa-bolt',
  };
  const labels = {
    caratteristica: 'Caratteristica',
    avversione: 'Avversione',
    potere: 'Potere',
  };

  const index = [];
  data.forEach((sp) => {
    (sp.caratteristiche || []).forEach((c) => {
      index.push({
        tipo: 'caratteristica',
        specieSlug: sp.slug,
        specieNome: sp.nome,
        nome: c.nome,
        id: c.id,
        text: stripHtml(c.nome + ' ' + c.preview + ' ' + (c.lore || []).join(' ')),
        snippet: c.preview,
      });
    });
    (sp.avversioni || []).forEach((a) => {
      index.push({
        tipo: 'avversione',
        specieSlug: sp.slug,
        specieNome: sp.nome,
        nome: a.nome,
        id: a.id,
        text: stripHtml(a.nome + ' ' + a.preview + ' ' + (a.lore || []).join(' ')),
        snippet: a.preview,
      });
    });
    (sp.poteri || []).forEach((p) => {
      const bodyText = stripHtml(p.body);
      index.push({
        tipo: 'potere',
        specieSlug: sp.slug,
        specieNome: sp.nome,
        nome: p.nome,
        id: p.id,
        text: stripHtml(p.nome) + ' ' + bodyText,
        snippet: bodyText.slice(0, 140) + (bodyText.length > 140 ? '…' : ''),
      });
    });
  });
  index.forEach((item) => { item.textLower = item.text.toLowerCase(); });

  function render(term) {
    const t = term.trim().toLowerCase();
    if (!t) {
      resultsBox.classList.remove('is-active');
      cardsGrid.style.display = '';
      resultsBox.innerHTML = '';
      counter.textContent = '';
      return;
    }

    const matches = index.filter((item) => item.textLower.indexOf(t) !== -1);
    cardsGrid.style.display = 'none';
    resultsBox.classList.add('is-active');

    if (!matches.length) {
      resultsBox.innerHTML = '<div class="no-results"><i class="fa-solid fa-ghost"></i> Nessun risultato per "' + t.replace(/</g, '') + '".</div>';
      counter.textContent = '';
      return;
    }

    counter.textContent = matches.length + (matches.length === 1 ? ' risultato' : ' risultati') + ' su ' + index.length + ' voci';

    resultsBox.innerHTML = matches.map((item) => (
      '<a class="specie-result" href="/specie/' + item.specieSlug + '/#' + item.id + '">' +
        '<span class="specie-result-icon"><i class="' + icons[item.tipo] + '"></i></span>' +
        '<span class="specie-result-body">' +
          '<span class="specie-result-title">' + item.nome +
            ' <span class="specie-result-tag">' + labels[item.tipo] + '</span>' +
            ' <span class="specie-result-species">' + item.specieNome + '</span>' +
          '</span>' +
          '<span class="specie-result-snippet">' + item.snippet + '</span>' +
        '</span>' +
      '</a>'
    )).join('');
  }

  searchInput.addEventListener('input', () => render(searchInput.value));
});
