(function () {
  var btn = document.getElementById("skyBtn");
  var bird = document.getElementById("skyBird");
  var result = document.getElementById("skyResult");
  var nameEl = document.getElementById("skyName");
  var textEl = document.getElementById("skyText");

  if (!btn || !window.AUGURIO) return;

  var flightClasses = ["fly-destra", "fly-sinistra", "fly-alto", "fly-cerchio", "fly-via"];
  var busy = false;

  btn.addEventListener("click", function () {
    if (busy) return;
    busy = true;
    btn.disabled = true;
    result.hidden = true;

    var esito = window.AUGURIO[Math.floor(Math.random() * window.AUGURIO.length)];

    flightClasses.forEach(function (c) { bird.classList.remove(c); });
    void bird.offsetWidth;
    bird.classList.add("fly-" + esito.id);

    window.setTimeout(function () {
      nameEl.textContent = esito.nome;
      textEl.textContent = esito.testo;
      result.hidden = false;
      btn.disabled = false;
      busy = false;
      btn.textContent = "Osserva di nuovo";
    }, 2300);
  });
})();
