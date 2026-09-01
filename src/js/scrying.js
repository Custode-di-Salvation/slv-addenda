(function () {
  var btn = document.getElementById("scryBtn");
  var surface = document.getElementById("scrySurface");
  var result = document.getElementById("scryResult");
  var symbolEl = document.getElementById("scrySymbol");
  var meaningEl = document.getElementById("scryMeaning");

  if (!btn || !window.VISIONI) return;

  var busy = false;

  btn.addEventListener("click", function () {
    if (busy) return;
    busy = true;
    btn.disabled = true;
    result.hidden = true;

    surface.classList.remove("is-scrying");
    void surface.offsetWidth;
    surface.classList.add("is-scrying");

    window.setTimeout(function () {
      var visione = window.VISIONI[Math.floor(Math.random() * window.VISIONI.length)];
      symbolEl.textContent = visione.simbolo;
      meaningEl.textContent = visione.testo;
      result.hidden = false;
      btn.disabled = false;
      busy = false;
      btn.textContent = "Scruta di nuovo";
    }, 2400);
  });
})();
