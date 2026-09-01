(function () {
  var btn = document.getElementById("throwBtn");
  var tray = document.getElementById("bonesTray");
  var reading = document.getElementById("bonesReading");
  var readPosizione = document.getElementById("readPosizione");
  var readRelazione = document.getElementById("readRelazione");
  var readSuperficie = document.getElementById("readSuperficie");
  var readSuono = document.getElementById("readSuono");

  if (!btn || !window.OSSA) return;

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function scatterBones() {
    tray.innerHTML = "";
    var count = 4 + Math.floor(Math.random() * 3); // 4-6 ossa
    for (var i = 0; i < count; i++) {
      (function (index) {
        var bone = document.createElement("i");
        bone.className = "fa-solid fa-bone bone";
        tray.appendChild(bone);

        var angle = Math.random() * 360;
        var radius = 20 + Math.random() * 55; // % dal centro
        var x = 50 + Math.cos(angle * Math.PI / 180) * radius * 0.9;
        var y = 50 + Math.sin(angle * Math.PI / 180) * radius * 0.55;
        var rotate = Math.random() * 360;

        window.setTimeout(function () {
          bone.style.left = x + "%";
          bone.style.top = y + "%";
          bone.style.transform = "translate(-50%, -50%) rotate(" + rotate + "deg) scale(1)";
          bone.classList.add("is-thrown");
        }, 30 + index * 60);
      })(i);
    }
  }

  btn.addEventListener("click", function () {
    scatterBones();

    var posizione = pick(window.OSSA.posizione);
    var relazione = pick(window.OSSA.relazione);
    var superficie = pick(window.OSSA.superficie);
    var suono = pick(window.OSSA.suono);

    readPosizione.textContent = posizione.nome + ": " + posizione.testo;
    readRelazione.textContent = relazione.nome + ": " + relazione.testo;
    readSuperficie.textContent = superficie.nome + ": " + superficie.testo;
    readSuono.textContent = suono.nome + ": " + suono.testo;

    window.setTimeout(function () {
      reading.hidden = false;
    }, 350);

    btn.textContent = "Lancia di nuovo";
  });
})();
