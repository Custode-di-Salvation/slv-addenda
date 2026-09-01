const sigilli = require("./sigilli.json");

// Un elemento per ogni coppia rarità/categoria, usato per generare le pagine
// di categoria (es. /sigilli/comuni/manipolazione/).
module.exports = sigilli.flatMap((rarita) =>
  rarita.categorie.map((categoria) => ({
    raritaSlug: rarita.slug,
    raritaNome: rarita.nome,
    categoria: categoria,
  }))
);
