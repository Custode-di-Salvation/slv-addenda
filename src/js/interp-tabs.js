// ── Pannello a schede "Interpretazione" (condiviso tra le pagine) ──
(function () {
  var wrap = document.getElementById("interpTabs");
  if (!wrap) return;

  var tabs = Array.prototype.slice.call(wrap.querySelectorAll(".interp-tab"));
  var panels = Array.prototype.slice.call(wrap.querySelectorAll(".interp-panel"));

  tabs.forEach(function (tab) {
    tab.setAttribute('aria-pressed', String(tab.classList.contains('is-active')));
    var panel = panels.find(function (p) { return p.dataset.tab === tab.dataset.tab; });
    if (panel) {
      panel.id = panel.id || 'interpretazione-' + tab.dataset.tab;
      tab.setAttribute('aria-controls', panel.id);
    }
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-pressed", "false"); });
      panels.forEach(function (p) { p.classList.remove("is-active"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-pressed", "true");
      var target = wrap.querySelector('.interp-panel[data-tab="' + tab.dataset.tab + '"]');
      if (target) target.classList.add("is-active");
    });
  });
})();
