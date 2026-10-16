const rituaria = require("./src/_data/rituaria.json");
const ritualiFlat = require("./src/_data/ritualiFlat.js");
const sigilli = require("./src/_data/sigilli.json");
const sigilliFlat = require("./src/_data/sigilliFlat.js");
const specie = require("./src/_data/specie.json");

module.exports = function (eleventyConfig) {
  // Copia le cartelle statiche nella build finale
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");

  // Serializza un dato Eleventy in JSON da incollare in uno <script> inline
  eleventyConfig.addFilter("dump", (obj) => JSON.stringify(obj));

  // La scheda indica già la specie; il requisito completo resta nella targhetta.
  eleventyConfig.addFilter("requisitoBreve", (value) => {
    const text = String(value || "").trim();
    const age = text.match(/^Solo per .+? da (.+)$/i);
    if (age) return age[1];
    const angel = text.match(/^Solo per angeli (.+)$/i);
    if (angel) return angel[1][0].toUpperCase() + angel[1].slice(1);
    const moreDeaths = text.match(/^Per riemersi con più di (\d+) morti alle spalle$/i);
    if (moreDeaths) return `Più di ${moreDeaths[1]} morti`;
    const deaths = text.match(/^Per riemersi con almeno (\d+) morti alle spalle$/i);
    if (deaths) return `${deaths[1]}+ morti`;
    const rebirths = text.match(/^Solo dopo almeno (\d+) rigenerazioni completate$/i);
    if (rebirths) return `${rebirths[1]}+ rigenerazioni`;
    return text;
  });

  // Helper per le pagine dei singoli rituali (Rituaria Dogmatica): risalgono
  // l'albero rituaria.json per ricavare nomi/posizione senza doverli ripetere
  // nel front matter di ogni rituale.
  eleventyConfig.addNunjucksGlobal("tipoNomeOf", (slug) => {
    const t = rituaria.find((t) => t.slug === slug);
    return t ? t.nome : "";
  });
  eleventyConfig.addNunjucksGlobal("sottotipoNomeOf", (tipoSlug, sottotipoSlug) => {
    const t = rituaria.find((t) => t.slug === tipoSlug);
    const st = t && t.sottotipi.find((s) => s.slug === sottotipoSlug);
    return st ? st.nome : "";
  });
  eleventyConfig.addNunjucksGlobal("ritualIndex", (tipoSlug, sottotipoSlug, slug) =>
    ritualiFlat.findIndex(
      (r) => r.tipoSlug === tipoSlug && r.sottotipoSlug === sottotipoSlug && r.slug === slug
    )
  );
  eleventyConfig.addNunjucksFilter("breve", (nome) => (nome || "").split(" e ")[0]);

  // Stessi helper, versione Sigilli: risalgono sigilli.json per nomi/badge/posizione.
  eleventyConfig.addNunjucksGlobal("raritaOf", (slug) => sigilli.find((r) => r.slug === slug) || {});
  eleventyConfig.addNunjucksGlobal("categoriaSigilloNomeOf", (raritaSlug, categoriaSlug) => {
    const r = sigilli.find((r) => r.slug === raritaSlug);
    const c = r && r.categorie.find((c) => c.slug === categoriaSlug);
    return c ? c.nome : "";
  });
  eleventyConfig.addNunjucksGlobal("sigilloIndex", (raritaSlug, categoriaSlug, slug) =>
    sigilliFlat.findIndex(
      (s) => s.raritaSlug === raritaSlug && s.categoriaSlug === categoriaSlug && s.slug === slug
    )
  );

  eleventyConfig.on("eleventy.after", require("./scripts/build-search-index.js"));

  // Collezione delle guide di divinazione, nell'ordine dato dal campo "ordine"
  eleventyConfig.addCollection("divinazione", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/divinazione/*.njk")
      .filter((item) => item.data.tags && item.data.tags.includes("metodo-divinazione"))
      .sort((a, b) => a.data.ordine - b.data.ordine);
  });

  // Collezione del Bestiario in ordine alfabetico per nome (sovrascrive l'ordine
  // di default di Eleventy, che altrimenti seguirebbe la data/mtime dei file).
  eleventyConfig.addCollection("bestiario", (collectionApi) => {
    return collectionApi.getFilteredByTag("bestiario").sort((a, b) =>
      (a.data.nome || "").localeCompare(b.data.nome || "", "it", { sensitivity: "base" })
    );
  });

  // Helper per le pagine delle Specie: precedente/successiva nell'ordine di specie.json.
  eleventyConfig.addNunjucksGlobal("specieIndex", (slug) => specie.findIndex((s) => s.slug === slug));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
