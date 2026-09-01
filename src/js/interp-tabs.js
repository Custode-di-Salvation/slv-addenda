// ── Pannello a schede "Interpretazione" (condiviso tra le pagine) ──
(function () {
  var wrap = document.getElementById("interpTabs");
  if (!wrap) return;

  var tabs = Array.prototype.slice.call(wrap.querySelectorAll(".interp-tab"));
  var panels = Array.prototype.slice.call(wrap.querySelectorAll(".interp-panel"));

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); });
      panels.forEach(function (p) { p.classList.remove("is-active"); });
      tab.classList.add("is-active");
      var target = wrap.querySelector('.interp-panel[data-tab="' + tab.dataset.tab + '"]');
      if (target) target.classList.add("is-active");
    });
  });
})();
