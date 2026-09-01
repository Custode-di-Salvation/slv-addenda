(function () {
  var btn = document.getElementById("cupBtn");
  var icon = document.getElementById("cupIcon");
  var result = document.getElementById("cupResult");
  var symbolName = document.getElementById("cupSymbolName");
  var symbolText = document.getElementById("cupSymbolText");
  var posName = document.getElementById("cupPosName");
  var posText = document.getElementById("cupPosText");

  if (!btn || !window.TAZZA) return;

  var busy = false;

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  btn.addEventListener("click", function () {
    if (busy) return;
    busy = true;
    btn.disabled = true;
    result.hidden = true;

    icon.classList.remove("is-turning");
    void icon.offsetWidth;
    icon.classList.add("is-turning");

    window.setTimeout(function () {
      var simbolo = pick(window.TAZZA.simboli);
      var posizione = pick(window.TAZZA.posizioni);

      symbolName.textContent = simbolo.nome;
      symbolText.textContent = simbolo.testo;
      posName.textContent = posizione.nome;
      posText.textContent = posizione.testo;
      result.hidden = false;

      btn.disabled = false;
      busy = false;
      btn.textContent = "Ruota di nuovo";
    }, 1600);
  });
})();
