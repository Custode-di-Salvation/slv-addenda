(function () {
  var btn = document.getElementById("askBtn");
  var arm = document.getElementById("pendulumArm");
  var result = document.getElementById("pendulumResult");
  var glyph = document.getElementById("pendulumGlyph");
  var label = document.getElementById("pendulumLabel");
  var desc = document.getElementById("pendulumDesc");

  if (!btn || !window.PENDOLO) return;

  var busy = false;

  btn.addEventListener("click", function () {
    if (busy) return;
    busy = true;
    btn.disabled = true;
    result.hidden = true;

    var esito = window.PENDOLO[Math.floor(Math.random() * window.PENDOLO.length)];
    var restAngle = (Math.random() * 10 - 5).toFixed(1) + "deg";

    arm.style.setProperty("--rest-angle", restAngle);
    arm.classList.remove("is-swinging");
    // forza il reflow per poter riavviare l'animazione al click successivo
    void arm.offsetWidth;
    arm.classList.add("is-swinging");

    window.setTimeout(function () {
      glyph.textContent = esito.glifo;
      label.textContent = esito.nome;
      desc.textContent = esito.testo;
      result.hidden = false;
      btn.disabled = false;
      busy = false;
      btn.textContent = "Poni un'altra domanda";
    }, 1900);
  });
})();
