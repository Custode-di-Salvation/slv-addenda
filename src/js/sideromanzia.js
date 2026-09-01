(function () {
  var btn = document.getElementById("starsBtn");
  var flash = document.getElementById("skyFlash");
  var result = document.getElementById("starsResult");
  var nameEl = document.getElementById("starsName");
  var textEl = document.getElementById("starsText");

  if (!btn || !window.CIELO) return;

  var busy = false;

  btn.addEventListener("click", function () {
    if (busy) return;
    busy = true;
    btn.disabled = true;
    result.hidden = true;

    var fenomeno = window.CIELO[Math.floor(Math.random() * window.CIELO.length)];
    var x = 15 + Math.random() * 70;
    var y = 15 + Math.random() * 65;

    flash.style.left = x + "%";
    flash.style.top = y + "%";
    flash.style.setProperty("--flash-color", fenomeno.hex);
    flash.classList.remove("is-flashing");
    void flash.offsetWidth;
    flash.classList.add("is-flashing");

    window.setTimeout(function () {
      nameEl.textContent = fenomeno.nome;
      textEl.textContent = fenomeno.testo;
      result.hidden = false;
      btn.disabled = false;
      busy = false;
      btn.textContent = "Scruta di nuovo";
    }, 2200);
  });
})();
