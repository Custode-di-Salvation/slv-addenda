const rituaria = require("./rituaria.json");

// Elenco piatto di tutti i rituali, in ordine, con il contesto di tipo/sotto-tipo.
// Usato per calcolare rituale precedente/successivo nella pagina del singolo rituale.
const flat = [];
rituaria.forEach((tipo) => {
  tipo.sottotipi.forEach((sottotipo) => {
    sottotipo.rituali.forEach((rituale) => {
      flat.push({
        tipoSlug: tipo.slug,
        tipoNome: tipo.nome,
        sottotipoSlug: sottotipo.slug,
        sottotipoNome: sottotipo.nome,
        slug: rituale.slug,
        nome: rituale.nome,
        stato: rituale.stato,
      });
    });
  });
});

module.exports = flat;
