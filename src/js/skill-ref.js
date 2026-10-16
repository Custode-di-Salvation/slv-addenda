// Evidenzia i riferimenti a skill/tratti scritti tra parentesi quadre,
// es. [Tenacia], [Percezione]. Gira su tutte le pagine (caricato in
// base.njk) così non serve incollare a mano <span> in ogni .md.
(function () {
  "use strict";

  // maiuscola iniziale, poi solo lettere o spazi: esclude cose come [274 d.C.]
  // o [una delle cinque arie vitali] che nei contenuti sono citazioni,
  // non nomi di skill.
  var SKILL_RE = /\[([A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ' ]*)\]/g;

  function wrapTextNode(node) {
    var text = node.nodeValue;
    SKILL_RE.lastIndex = 0;
    if (!SKILL_RE.test(text)) return;
    SKILL_RE.lastIndex = 0;

    var frag = document.createDocumentFragment();
    var lastIndex = 0;
    var match;
    while ((match = SKILL_RE.exec(text))) {
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      var span = document.createElement("span");
      span.className = "skill-ref";
      span.textContent = match[0];
      frag.appendChild(span);
      lastIndex = SKILL_RE.lastIndex;
    }
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    node.parentNode.replaceChild(frag, node);
  }

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapTextNode(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    var tag = node.tagName;
    // I collegamenti mantengono il proprio aspetto anche fra parentesi quadre.
    if (tag === "A" || tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA" || node.classList.contains("skill-ref")) {
      return;
    }
    // snapshot dei figli: wrapTextNode sostituisce nodi durante il giro
    Array.prototype.slice.call(node.childNodes).forEach(walk);
  }

  var root = document.querySelector("main.main-content");
  if (root) walk(root);
})();
