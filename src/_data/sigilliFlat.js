const sigilli = require("./sigilli.json");

// Elenco piatto di tutti i sigilli, in ordine, con il contesto di rarità/categoria.
// Usato per calcolare il sigillo precedente/successivo nella pagina del singolo sigillo.
const flat = [];
sigilli.forEach((rarita) => {
  rarita.categorie.forEach((categoria) => {
    categoria.sigilli.forEach((sigillo) => {
      flat.push({
        raritaSlug: rarita.slug,
        raritaNome: rarita.nome,
        raritaBadge: rarita.badge,
        categoriaSlug: categoria.slug,
        categoriaNome: categoria.nome,
        slug: sigillo.slug,
        nome: sigillo.nome,
        stato: sigillo.stato,
      });
    });
  });
});

module.exports = flat;
