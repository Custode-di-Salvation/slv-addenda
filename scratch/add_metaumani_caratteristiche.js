const fs = require('fs');

const dataFile = '/Users/robynhood/Desktop/table-slv/slv-addenda/src/_data/specie.json';
let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const metaumani = [
  'chiaroveggenti',
  'lettori-empatici',
  'lettori-telepatici',
  'lettori-animici',
  'medium',
  'riemersi',
  'aoristi',
  'artefici'
];

const introCaratteristiche = "<p>Le caratteristiche di specie sono tratti <b>passivi</b> e <b>permanenti</b> che definiscono la natura dei metaumani. Sono sempre attive e non richiedono attivazione né tiro di dado, a meno che non sia specificato diversamente nella singola voce.</p>";

const introAvversioni = "<p>I metaumani non possiedono normalmente avversioni materiali universali paragonabili a quelle di creature estranee alla natura umana. Sale, ferro, luoghi consacrati, simboli religiosi e altre sostanze tradizionalmente associate alla protezione sovrannaturale non producono effetti particolari su di loro in quanto metaumani.</p><p>Le loro vulnerabilità derivano invece dalla <b>maggiore apertura del Ren verso la Creazione</b>. Gli effetti meccanici sono situazionali e determinati dal master in base a intensità e durata dell'esposizione: possono comprendere Condizioni appropriate, svantaggi, attivazioni involontarie o altri contraccolpi coerenti con la tipologia.</p>";

const caratteristicheComuni = [
  {
    "id": "shining",
    "nome": "Shining",
    "icona": "fa-solid fa-sparkles",
    "preview": "firma animica · risonanza con la Creazione · permanente",
    "lore": [
      "Ogni metaumano nasce con una particolare configurazione del <b>Ren</b>, comunemente definita <i>shining</i>, che lo rende capace di entrare in risonanza con uno specifico aspetto della Creazione. Non si tratta di una forza estranea acquisita successivamente, ma di una caratteristica strutturale dell'anima presente fin dal concepimento.",
      "Lo shining non rende il metaumano biologicamente diverso da un essere umano ordinario: metabolismo, capacità fisiche, vulnerabilità alle malattie, invecchiamento e mortalità rimangono umani salvo caratteristiche specifiche della singola tipologia.",
      "Sul piano animico, tuttavia, il Ren possiede una <b>firma più intensa e strutturata</b> rispetto alla norma. Capacità in grado di osservare direttamente l'anima possono quindi riconoscere che un individuo possiede uno shining, pur senza identificarne necessariamente la natura o le capacità precise.",
      "Lo shining è parte integrante dell'identità del soggetto. Non può essere estratto come una fonte energetica indipendente, trasferito volontariamente a un'altra persona o rimosso attraverso interventi sul corpo. Alterazioni profonde del Ren possono interferire temporaneamente con la sua espressione, ma non trasformano normalmente un metaumano in un essere umano ordinario."
    ],
    "mech": [
      "Un effetto capace di leggere direttamente il <b>Ren</b> può riconoscere la presenza di uno shining.",
      "Riconoscerne la presenza non significa automaticamente identificarne la tipologia, i poteri posseduti o il livello di esperienza.",
      "Lo shining non conferisce di per sé bonus a [Forza], [Agilità], [Costituzione], Punti Vita o capacità di guarigione.",
      "Il corpo del metaumano rimane soggetto alle normali vulnerabilità biologiche umane, salvo eccezioni indicate nella singola specie."
    ]
  },
  {
    "id": "sensibilita-risonante",
    "nome": "Sensibilità risonante",
    "icona": "fa-solid fa-wave-square",
    "preview": "eco di fondo · percezione istintiva · affinità selettiva",
    "lore": [
      "Lo shining non permette soltanto al metaumano di agire sulla propria sfera di risonanza: rende anche il suo Ren <b>più sensibile alla presenza di fenomeni che appartengono allo stesso dominio</b>.",
      "Questa sensibilità viene percepita in maniera differente da individuo a individuo. Può manifestarsi come pressione dietro gli occhi, tensione alla nuca o al plesso solare, improvvisa nausea, pelle d'oca, alterazioni dell'udito, una sensazione di familiarità inspiegabile o la semplice certezza che nell'ambiente sia presente qualcosa di anomalo.",
      "Non costituisce un senso sovrannaturale preciso e non sostituisce i poteri di specie. La sensibilità comunica normalmente soltanto che <b>qualcosa di fortemente risonante è presente</b>, non che cosa sia, dove si trovi esattamente o che cosa stia facendo.",
      "La natura dell'eco dipende dalla tipologia del metaumano. Un medium può percepire una forte presenza di Ren disincarnati; un empatico può avvertire una saturazione emotiva estrema; un telepate un'insolita densità mentale; un lettore animico una configurazione del Ren particolarmente anomala; un chiaroveggente una forte concentrazione informativa; un aorista una distorsione della continuità temporale; un artefice una manifestazione eccezionalmente generativa della Creazione."
    ],
    "mech": [
      "La Sensibilità risonante viene normalmente gestita dal <b>master</b> e fornisce impressioni generiche, non informazioni analitiche.",
      "Non permette di individuare automaticamente una sorgente nascosta né di distinguere necessariamente più sorgenti presenti nello stesso luogo.",
      "Non concede vantaggio automatico ai tiri e non sostituisce un potere che possieda una funzione di lettura specifica.",
      "Fenomeni particolarmente intensi possono essere percepiti involontariamente anche quando il metaumano preferirebbe ignorarli."
    ]
  },
  {
    "id": "densita-del-ka",
    "nome": "Densità del Ka",
    "icona": "fa-solid fa-fire-flame-curved",
    "preview": "energia vitale concentrata · condotto efficace · preda sovrannaturale",
    "lore": [
      "Il <b>Ka</b> di un metaumano possiede una densità energetica superiore a quella dell'essere umano medio. Lo shining non aumenta necessariamente la quantità di vita biologica disponibile, ma rende il sistema anima-corpo un <b>condotto particolarmente ricco di Creazione</b>, capace di sostenere fenomeni che in un essere umano ordinario troverebbero meno presa.",
      "Questa caratteristica non comporta una maggiore resistenza fisica né una riserva aggiuntiva di Energia utilizzabile dal personaggio. Un metaumano non sopporta meglio una ferita da arma da fuoco, non guarisce più rapidamente e non recupera automaticamente Energia più in fretta.",
      "La maggiore densità diventa invece rilevante quando un fenomeno sovrannaturale utilizza direttamente il <b>Ka, lo shining o l'energia vitale</b> come risorsa. Predatori animici, rituali che richiedono energia vitale, entità che si alimentano della Creazione o pratiche che necessitano di un condotto umano possono trovare nel metaumano una sorgente eccezionalmente efficace.",
      "Per la stessa ragione sangue, capelli, tessuti o altri componenti biologici appartenenti a un metaumano possono assumere un valore particolare in pratiche che dipendano esplicitamente dalla sua risonanza."
    ],
    "mech": [
      "La Densità del Ka non aumenta i Punti Vita né l'Energia massima.",
      "Non rende il metaumano genericamente più vulnerabile a qualsiasi capacità sovrannaturale.",
      "Diventa rilevante soltanto per effetti che utilizzano esplicitamente <b>Ka, energia vitale o shining</b> come bersaglio, carburante o condotto.",
      "Il valore rituale di un metaumano dipende anche dalla compatibilità tra la sua particolare risonanza e il fenomeno che si intende produrre."
    ]
  }
];

const avversioniComuni = [
  {
    "id": "sovraccarico-risonante",
    "nome": "Sovraccarico risonante",
    "icona": "fa-solid fa-head-side-virus",
    "preview": "rumore psichico · iperstimolazione · perdita dei filtri",
    "lore": [
      "Lo stesso shining che consente al metaumano di entrare in risonanza con la Creazione costituisce anche un punto di ingresso. Quando il Ren viene esposto a una quantità eccessiva di fenomeni compatibili con la propria tipologia, la normale capacità di <b>filtrare e organizzare ciò che riceve può collassare</b>.",
      "Il sovraccarico non è semplice stanchezza. Informazioni, emozioni, presenze o configurazioni sovrannaturali iniziano a imporsi sulla percezione del metaumano senza che questi riesca più a separarle correttamente da sé stesso o dall'ambiente.",
      "Le manifestazioni dipendono dalla tipologia.",
      "Un <b>empatico</b> immerso nel panico di una folla può perdere la capacità di distinguere le emozioni proprie da quelle altrui; un <b>telepate</b> può essere investito da frammenti di pensiero incompatibili; un <b>medium</b> può percepire troppe presenze contemporaneamente; un <b>lettore animico</b> può subire la sovrapposizione di firme del Ren; un <b>chiaroveggente</b> può essere travolto da un'eccessiva densità di informazione temporale; un <b>aorista</b> può sviluppare accavallamenti e nausea temporale; un <b>artefice</b> può perdere il confine tra rappresentazione e realtà.",
      "Una prima esposizione tende a produrre sintomi lievi: cefalea, nausea, tremore, vertigini, difficoltà di concentrazione o fenomeni sensoriali intrusivi. Esposizioni intense o prolungate possono trasformarsi in vera perdita di controllo della propria risonanza."
    ],
    "mech": [
      "Il Sovraccarico risonante non si attiva per la semplice presenza di un singolo fenomeno compatibile: richiede una <b>densità, intensità o durata eccezionale</b>.",
      "Il master può applicare svantaggio a prove che richiedano concentrazione, una Condizione appropriata o manifestazioni involontarie dello shining.",
      "Continuare a utilizzare poteri durante un sovraccarico già grave può amplificarne le conseguenze.",
      "La forma precisa del contraccolpo dipende sempre dalla tipologia metaumana e dalla natura dello stimolo."
    ]
  },
  {
    "id": "predazione-dello-shining",
    "nome": "Predazione dello shining",
    "icona": "fa-solid fa-teeth",
    "preview": "Ka concentrato · aggancio facilitato · risorsa ambita",
    "lore": [
      "La maggiore densità del Ka rende i metaumani particolarmente appetibili per creature e fenomeni che <b>si alimentano direttamente della vitalità, del Ren o della Creazione presente negli esseri viventi</b>.",
      "Un predatore sovrannaturale capace di drenare Ka può percepire un metaumano come una fonte più ricca di energia; un rituale che utilizzi esseri viventi come condotti può trovare nel suo shining un supporto particolarmente efficace; entità capaci di stabilire legami attraverso l'energia vitale possono trovare nel Ren metaumano una risonanza più evidente a cui agganciarsi.",
      "Questo non significa che qualsiasi potere sia automaticamente più efficace contro un metaumano. Una manipolazione telepatica, empatica o animica segue le proprie normali regole se non utilizza specificamente la densità del Ka o dello shining.",
      "La vulnerabilità riguarda esclusivamente quei fenomeni per i quali <b>la quantità o qualità della Creazione presente nel bersaglio costituisce parte del meccanismo stesso</b>."
    ],
    "mech": [
      "Effetti di drenaggio del Ka o dell'energia vitale possono considerare il metaumano una sorgente particolarmente ricca.",
      "Ritualisti ed entità capaci di utilizzare lo shining come condotto possono ottenere una presa più stabile o duratura, a discrezione del master.",
      "Componenti biologici provenienti da un metaumano possono possedere maggiore valore in rituali compatibili con la sua risonanza.",
      "La vulnerabilità non aumenta automaticamente i danni inflitti da armi, veleni, malattie o capacità sovrannaturali che non sfruttino direttamente Ka o shining."
    ]
  }
];

data.forEach(s => {
  if (metaumani.includes(s.slug)) {
    s.introCaratteristiche = introCaratteristiche;
    s.introAvversioni = introAvversioni;
    s.caratteristiche = JSON.parse(JSON.stringify(caratteristicheComuni));
    s.avversioni = JSON.parse(JSON.stringify(avversioniComuni));
  }
});

fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log('Fatto!');
