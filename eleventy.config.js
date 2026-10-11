const rituaria = require("./src/_data/rituaria.json");
const ritualiFlat = require("./src/_data/ritualiFlat.js");
const sigilli = require("./src/_data/sigilli.json");
const sigilliFlat = require("./src/_data/sigilliFlat.js");
const specie = require("./src/_data/specie.json");

module.exports = function (eleventyConfig) {
  // Keep narrative card headings visible while long bodies scroll.
  eleventyConfig.addFilter("uniformCards", (content) => String(content).replace(
    /(<div class="(?:medium-card|method-card)">\s*<h4\b[^>]*>[\s\S]*?<\/h4>)([\s\S]*?)(<\/div>)/g,
    (_, heading, body, close) => `${heading}<div class="card-scroll-body" tabindex="0" role="region" aria-label="Contenuto del riquadro">${body}</div>${close}`
  ));
  // Copia le cartelle statiche nella build finale
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");

  // Serializza un dato Eleventy in JSON da incollare in uno <script> inline
  eleventyConfig.addFilter("dump", (obj) => JSON.stringify(obj));

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
