(function () {
  var btn = document.getElementById("flameBtn");
  var icon = document.getElementById("flameIcon");
  var result = document.getElementById("flameResult");
  var behaviorName = document.getElementById("flameBehaviorName");
  var behaviorText = document.getElementById("flameBehaviorText");
  var colorName = document.getElementById("flameColorName");
  var colorText = document.getElementById("flameColorText");

  if (!btn || !window.FUOCO) return;

  var behaviorClasses = ["flame-alta", "flame-bassa", "flame-danzante", "flame-scoppiettante", "flame-puntante"];

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  btn.addEventListener("click", function () {
    var comportamento = pick(window.FUOCO.comportamento);
    var colore = pick(window.FUOCO.colore);

    behaviorClasses.forEach(function (c) { icon.classList.remove(c); });
    icon.classList.add("flame-" + comportamento.id);
    icon.style.color = colore.hex;
    icon.style.filter = "drop-shadow(0 0 20px " + colore.hex + "88)";

    behaviorName.textContent = comportamento.nome;
    behaviorText.textContent = comportamento.testo;
    colorName.textContent = colore.nome;
    colorText.textContent = colore.testo;
    result.hidden = false;

    btn.textContent = "Osserva di nuovo";
  });
})();
