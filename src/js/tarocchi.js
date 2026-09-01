(function () {
  var btn = document.getElementById("drawBtn");
  var card = document.getElementById("tarotCard");
  var frame = document.getElementById("tarotFrame");
  var numeral = document.getElementById("tarotNumeral");
  var name = document.getElementById("tarotName");
  var orient = document.getElementById("tarotOrient");
  var drawnLabel = document.getElementById("tarotDrawnLabel");

  if (!btn || !window.ARCANI) return;

  var busy = false;

  btn.addEventListener("click", function () {
    if (busy) return;
    busy = true;
    btn.disabled = true;

    // piccola animazione di "mescolata" prima della rivelazione
    card.classList.remove("is-flipped");
    card.classList.add("is-drawing");

    window.setTimeout(function () {
      card.classList.remove("is-drawing");

      var carta = window.ARCANI[Math.floor(Math.random() * window.ARCANI.length)];
      var reversed = Math.random() < 0.5;

      numeral.textContent = carta.numeroRomano;
      name.textContent = carta.nome;
      orient.textContent = reversed ? "Rovesciata" : "Dritta";
      frame.classList.toggle("is-reversed", reversed);

      drawnLabel.innerHTML = carta.numeroRomano + ": " + carta.nome +
        "<span class=\"orient\">" + (reversed ? "Rovesciata" : "Dritta") + "</span>";

      card.classList.add("is-flipped");
      btn.disabled = false;
      busy = false;
      btn.textContent = "Pesca un'altra carta";
    }, 450);
  });
})();

// ── Griglia "Tutti gli Arcani" ──
(function () {
  var grid = document.getElementById("arcaniGrid");
  if (!grid || !window.ARCANI) return;

  var chips = Array.prototype.slice.call(grid.querySelectorAll(".arcano-chip"));
  var detail = document.getElementById("arcanoDetail");
  var title = document.getElementById("arcanoDetailTitle");
  var upright = document.getElementById("arcanoDetailUpright");
  var reversed = document.getElementById("arcanoDetailReversed");
  var lore = document.getElementById("arcanoDetailLore");

  function showCard(chip, scroll) {
    var carta = window.ARCANI[+chip.dataset.index];
    if (!carta) return;

    chips.forEach(function (c) { c.classList.remove("is-active"); });
    chip.classList.add("is-active");

    title.textContent = carta.numeroRomano + ": " + carta.nome;
    upright.textContent = carta.dritto;
    reversed.textContent = carta.rovesciato;
    lore.textContent = carta.approfondimento || "";

    if (scroll && window.innerWidth < 800) {
      detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () { showCard(chip, true); });
  });

  // la prima carta risulta sempre aperta di default
  if (chips[0]) showCard(chips[0], false);
})();

// ── Carosello "Le stese" ──
(function () {
  var carousel = document.getElementById("steseCarousel");
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".stesa-slide"));
  var tabs = Array.prototype.slice.call(carousel.querySelectorAll(".stesa-tab"));
  var dotsWrap = document.getElementById("stesaDots");
  var prevBtn = document.getElementById("stesaPrev");
  var nextBtn = document.getElementById("stesaNext");
  var current = 0;

  // genera i pallini di navigazione
  var dots = slides.map(function (_, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "stesa-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", "Vai alla stesa " + (i + 1));
    dot.addEventListener("click", function () { goTo(i); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === current);
    });
    tabs.forEach(function (tab, i) {
      tab.classList.toggle("is-active", i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === current);
    });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { goTo(i); });
  });
  prevBtn.addEventListener("click", function () { goTo(current - 1); });
  nextBtn.addEventListener("click", function () { goTo(current + 1); });
})();
