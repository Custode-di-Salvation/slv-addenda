// Mappature grafiche per il Bestiario: icona per tipo di creatura e
// etichetta/colore per livello di pericolosità. Usate sia dall'indice
// (index.njk) sia dalla scheda singola (creatura.njk) per restare coerenti.
// Le chiavi di entrambi i dizionari sono in ordine alfabetico.

module.exports = {
  icone: {
    "bestia": "fa-solid fa-dragon",
    "entità energetica": "fa-solid fa-bolt",
    "non-morto": "fa-solid fa-skull",
    "polimorfo": "fa-solid fa-masks-theater",
    "teriantropo": "fa-solid fa-paw",
  },
  iconaDefault: "fa-solid fa-circle-question",

  pericolo: {
    alta: { label: "Alta", icona: "fa-solid fa-skull-crossbones" },
    bassa: { label: "Bassa", icona: "fa-solid fa-shield-halved" },
    estrema: { label: "Estrema", icona: "fa-solid fa-radiation" },
    media: { label: "Media", icona: "fa-solid fa-triangle-exclamation" },
  },
};
