(function () {
  var diagram = document.getElementById("liverDiagram");
  if (!diagram || !window.FEGATO) return;

  var hotspots = Array.prototype.slice.call(diagram.querySelectorAll(".liver-hotspot"));
  var title = document.getElementById("liverDetailTitle");
  var text = document.getElementById("liverDetailText");

  hotspots.forEach(function (spot) {
    spot.addEventListener("click", function () {
      var zona = window.FEGATO[+spot.dataset.index];
      if (!zona) return;

      hotspots.forEach(function (s) { s.classList.remove("is-active"); });
      spot.classList.add("is-active");

      title.textContent = zona.nome;
      text.textContent = zona.testo;
    });
  });
})();
