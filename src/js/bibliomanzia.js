(function () {
  var btn = document.getElementById("bookBtn");
  var icon = document.getElementById("bookIcon");
  var result = document.getElementById("bookResult");
  var lineEl = document.getElementById("bookLine");

  if (!btn) return;

  var busy = false;

  function setFace(faClass) {
    icon.classList.remove("fa-book", "fa-book-open");
    icon.classList.add(faClass);
  }

  btn.addEventListener("click", function () {
    if (busy) return;
    busy = true;
    btn.disabled = true;
    result.hidden = true;

    setFace("fa-book");
    icon.classList.remove("is-opening");
    void icon.offsetWidth;
    icon.classList.add("is-opening");

    window.setTimeout(function () {
      setFace("fa-book-open");
    }, 600);

    window.setTimeout(function () {
      var pagina = 1 + Math.floor(Math.random() * 350);
      var riga = 1 + Math.floor(Math.random() * 32);
      lineEl.textContent = "Pagina " + pagina + ", riga " + riga;
      result.hidden = false;
      btn.disabled = false;
      busy = false;
      btn.textContent = "Apri di nuovo";
    }, 1200);
  });
})();
