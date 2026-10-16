const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');
const { parseDocument, DomUtils } = require('htmlparser2');

const root = path.resolve(__dirname, '..');
const sectionNames = {
  abilita: 'Abilità e Tratti', bestiario: 'Bestiario', divinazione: 'Divinazione',
  'rituaria-dogmatica': 'Rituaria Dogmatica', sigilli: 'Sigilli', specie: 'Specie',
};
const slugify = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const plain = (html) => DomUtils.textContent(parseDocument(String(html || '')
  .replace(/<\/?(?:p|div|li|br|h[1-6]|dt|dd|tr|section)\b[^>]*>/gi, ' ')))
  .replace(/\s+/g, ' ').trim();
const flatten = (value) => typeof value === 'string' ? plain(value)
  : value && typeof value === 'object' ? Object.values(value).map(flatten).join(' ') : '';

module.exports = async ({ results, dir }) => {
  const entries = [];
  const add = (title, context, href, text) => {
    entries.push({ title: plain(title), context, href, text: plain(text) });
  };
  for (const page of results || []) {
    if (!page.url?.startsWith('/') || !page.outputPath?.endsWith('.html')) continue;
    const html = typeof page.content === 'string' ? page.content : await fs.readFile(page.outputPath, 'utf8');
    const doc = parseDocument(html);
    const main = DomUtils.findOne((node) => node.name === 'main', doc.children, true);
    const heading = main && DomUtils.findOne((node) => node.name === 'h1', [main], true);
    if (!heading) continue;
    const title = DomUtils.textContent(heading).trim();
    const dynamic = [];
    for (const script of DomUtils.findAll((node) => node.name === 'script', [main])) {
      const match = DomUtils.textContent(script).match(/^\s*window\.([A-Z_]+)\s*=\s*([\s\S]+?);?\s*$/);
      if (match && match[1] !== 'SPECIE') {
        try { dynamic.push(flatten(JSON.parse(match[2].replace(/;$/, '')))); } catch { /* Non-data scripts are excluded. */ }
      }
    }
    for (const node of DomUtils.findAll((node) => ['script', 'style', 'nav', 'aside'].includes(node.name)
      || node.attribs?.class?.split(/\s+/).some((c) => ['specie-nav', 'ritual-nav', 'back-to-top'].includes(c)), [main])) {
      DomUtils.removeElement(node);
    }
    // Species entries below provide precise links without indexing the same rules twice.
    if (/^\/specie\/[^/]+\/$/.test(page.url)) {
      add(title, 'Specie', page.url, title);
    } else {
      const body = plain(DomUtils.getOuterHTML(main));
      const section = sectionNames[page.url.split('/')[1]] || 'Addenda SLV';
      add(title, section, page.url, body + ' ' + dynamic.join(' '));
    }
  }
  const species = JSON.parse(await fs.readFile(path.join(root, 'src/_data/specie.json'), 'utf8'));
  for (const sp of species) {
    if (sp.inRevisione) continue;
    const page = entries.find((entry) => entry.href === `/specie/${sp.slug}/`);
    if (page) page.text = plain([sp.nome, sp.tagline, sp.introCaratteristiche, sp.introAvversioni,
      sp.introPoteri, sp.notaPoteri, sp.body, flatten(sp.eredita)].filter(Boolean).join(' '));
    for (const [field, label] of [['caratteristiche', 'Caratteristica'], ['avversioni', 'Avversione'], ['poteri', 'Potere']]) {
      for (const entry of sp[field] || []) {
        add(entry.nome, `${sp.nome} · ${label}`, `/specie/${sp.slug}/#${entry.id}`,
          [sp.nome, entry.nome, entry.preview, ...(entry.lore || []), ...(entry.mech || []), entry.body,
            entry.requisito, ...Object.values(entry.stats || {})].filter(Boolean).join(' '));
      }
    }
  }
  // These cards are generated in the browser; read their existing data without moving or changing it.
  const skillSource = await fs.readFile(path.join(root, 'src/abilita/index.njk'), 'utf8');
  const skillMatch = skillSource.match(/const\s+skills\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!skillMatch) throw new Error('Dati delle abilità non trovati per la ricerca generale.');
  const skills = vm.runInNewContext(`(${skillMatch[1]})`, Object.create(null), { timeout: 100 });
  for (const skill of skills) {
    const name = skill.name.split('*')[0].trim();
    add(name, skill.type === 'tratti' ? 'Abilità e Tratti · Tratto' : 'Abilità e Tratti · Abilità',
      `/abilita/#abilita-${slugify(name)}`, flatten([name, skill.description, skill.examples]));
  }
  await fs.writeFile(path.join(root, dir.output, 'search-index.json'), JSON.stringify(entries));
};
