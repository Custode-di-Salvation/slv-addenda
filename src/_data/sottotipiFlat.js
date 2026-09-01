const rituaria = require("./rituaria.json");

// Un elemento per ogni sotto-tipo reale (esclude il caso "_" di Evocazione e Controllo,
// che non ha sotto-tipi e i cui rituali stanno direttamente sotto il Tipo).
module.exports = rituaria.flatMap((tipo) =>
  tipo.sottotipi
    .filter((st) => st.slug !== "_")
    .map((st) => ({
      tipoSlug: tipo.slug,
      tipoNome: tipo.nome,
      sottotipo: st,
    }))
);
