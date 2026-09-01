(function () {
  var btn = document.getElementById("smokeBtn");
  var stage = document.getElementById("smokeStage");
  var result = document.getElementById("smokeResult");
  var dirName = document.getElementById("smokeDirName");
  var dirText = document.getElementById("smokeDirText");
  var colName = document.getElementById("smokeColName");
  var colText = document.getElementById("smokeColText");

  if (!btn || !window.FUMO) return;

  var driftById = { alto: "0px", rotto: "34px", anelli: "14px", basso: "-6px" };
  var durationById = { alto: "2.4s", rotto: "2s", anelli: "2.6s", basso: "1.1s" };

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  btn.addEventListener("click", function () {
    var direzione = pick(window.FUMO.direzione);
    var colore = pick(window.FUMO.colore);

    stage.style.setProperty("--smoke-drift", driftById[direzione.id] || "0px");
    stage.style.setProperty("--smoke-duration", durationById[direzione.id] || "2.4s");
    stage.style.setProperty("--smoke-color", colore.hex ? colore.hex + "aa" : "rgba(205,208,216,.6)");
    stage.classList.remove("is-reading");
    void stage.offsetWidth;
    stage.classList.add("is-reading");

    result.hidden = true;
    window.setTimeout(function () {
      dirName.textContent = direzione.nome;
      dirText.textContent = direzione.testo;
      colName.textContent = colore.nome;
      colText.textContent = colore.testo;
      result.hidden = false;
      btn.textContent = "Leggi di nuovo";
    }, 1600);
  });
})();
