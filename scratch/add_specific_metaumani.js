const fs = require('fs');

const dataFile = '/Users/robynhood/Desktop/table-slv/slv-addenda/src/_data/specie.json';
let data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const specifiche = {
  'medium': {
    caratteristiche: [
      {
        id: "firma-spirituale",
        nome: "Firma spirituale",
        icona: "fa-solid fa-ghost",
        preview: "faro animico · riconoscimento persistente · visibile ai disincarnati",
        lore: [
          "Il Ren di ogni medium possiede una <b>firma spirituale particolarmente evidente per le anime disincarnate</b>. Fantasmi, anime in transito sulle Spiagge e altre entità capaci di percepire direttamente il Ren possono riconoscere la presenza di un medium anche quando questi non sta utilizzando alcun potere.",
          "La firma è individuale e irripetibile. Un'anima che abbia già avuto contatto con un determinato medium può riconoscerlo nuovamente e distinguerlo da altri medium anche dopo molto tempo.",
          "La firma non comunica automaticamente posizione esatta o distanza illimitata: la capacità di individuarla dipende dalla natura dell'entità, dal piano in cui si trova e dalla forza del legame precedente."
        ],
        mech: [
          "Un'anima che abbia già interagito con il medium può riconoscerne la firma più facilmente in futuro.",
          "Utilizzare capacità di occultamento del Ren può mascherarla, ma il medium non può spegnerla spontaneamente.",
          "La firma persiste anche dopo la morte del medium come parte della sua identità animica.",
          "Essere riconosciuto non significa essere automaticamente raggiungibile o contattabile."
        ]
      },
      {
        id: "attrazione-dei-disincarnati",
        nome: "Attrazione dei disincarnati",
        icona: "fa-solid fa-people-group",
        preview: "presenze ricorrenti · anime perdute · affinità biografica",
        lore: [
          "La firma spirituale dei medium agisce anche come una <b>debole attrazione passiva per anime che cercano un contatto con il piano materiale</b>.",
          "Fantasmi recenti, anime disorientate sulle Spiagge o presenze che necessitano di un intermediario possono avvicinarsi spontaneamente al medium senza essere state evocate. Il fenomeno aumenta nei luoghi segnati dalla morte, durante periodi di forte vulnerabilità emotiva del medium e quando esiste un'affinità personale o simbolica tra il vivo e il morto.",
          "L'attrazione non concede automaticamente informazioni e non obbliga l'anima a essere benevola."
        ],
        mech: [
          "Ospedali, cimiteri, campi di battaglia e luoghi di morte possono aumentare notevolmente il numero di presenze attratte.",
          "Anime legate alla biografia, alla famiglia, alla comunità o alle esperienze del medium tendono a trovare la sua firma più facilmente.",
          "Un medium esperto impara a ignorare parte del rumore, ma non può eliminare completamente il fenomeno."
        ]
      }
    ],
    avversioni: [
      {
        id: "separazione-animica",
        nome: "Separazione animica",
        icona: "fa-solid fa-person-rays",
        preview: "radicamento instabile · catalessi · smarrimento sulle Spiagge",
        lore: [
          "Il Ren del medium è strutturalmente più disposto di quello umano ordinario a <b>spostare il proprio centro di adesione lontano dal corpo materiale</b>.",
          "Contatti particolarmente profondi con le Spiagge o altri piani, channeling prolungati, bilocazioni o esposizioni ripetute a Ren disincarnati possono allentare temporaneamente il radicamento.",
          "Nei casi lievi il medium sperimenta derealizzazione, perdita di sensibilità, sensazione di galleggiamento o difficoltà a riconoscere il proprio corpo come proprio. Nei casi gravi il Ren può separarsi involontariamente dal corpo, lasciandolo in uno stato catalettico simile al coma."
        ],
        mech: [
          "La separazione non avviene automaticamente a ogni uso dei poteri, ma diventa più probabile durante sovraccarico o fallimenti gravi.",
          "Un medium separato può necessitare di grounding, della propria [Retenzione del Ren], dell'intervento di un altro medium o di altri mezzi capaci di ristabilire il legame.",
          "La distruzione o morte del corpo mentre il Ren è separato segue le normali conseguenze della morte."
        ]
      },
      {
        id: "eco-traumatico",
        nome: "Eco traumatico",
        icona: "fa-solid fa-head-side-virus",
        preview: "morte riflessa · sogni intrusivi · trauma vicario",
        lore: [
          "Il contatto con un Ren che porta con sé una morte particolarmente violenta può lasciare nel medium un <b>residuo percettivo traumatico</b>.",
          "Non si tratta necessariamente di una memoria completa dell'altra persona: possono rimanere sensazioni corporee, immagini isolate, odori, dolore fantasma, paura della morte o sogni ricorrenti collegati all'esperienza con cui è entrato in contatto.",
          "Esposizioni ripetute alla stessa morte o a eventi estremamente traumatici possono produrre conseguenze psicologiche simili a quelle di un trauma vissuto direttamente."
        ]
      }
    ]
  },
  'chiaroveggenti': {
    caratteristiche: [
      {
        id: "soglia-onirica",
        nome: "Soglia onirica",
        icona: "fa-solid fa-cloud-moon",
        preview: "visioni involontarie · sonno REM · simbolismo",
        lore: [
          "Il tessuto informativo della Creazione continua a filtrare attraverso lo <i>shining</i> del chiaroveggente anche quando questi non sta utilizzando volontariamente i propri poteri.",
          "Durante il sonno profondo, stati di trance o momenti di coscienza alterata possono quindi verificarsi <b>visioni spontanee prive di costo in Energia</b>, generalmente brevi, incontrollabili e fortemente simboliche.",
          "Il chiaroveggente non sceglie la domanda, il bersaglio o il momento osservato. La Creazione tende a restituire informazioni legate a eventi di forte rilevanza, persone con cui esiste un legame importante o fenomeni particolarmente risonanti."
        ],
        mech: [
          "Le visioni spontanee non sostituiscono [Vista] e non possono essere richieste dal giocatore come fonte gratuita di informazioni.",
          "Sono normalmente introdotte dal master quando narrativamente rilevanti.",
          "Possono riguardare passato, presente remoto o futuro, secondo le normali regole del block universe.",
          "Il futuro degli Aoristi e le lacune aoristiche rimangono illeggibili."
        ]
      }
    ],
    avversioni: [
      {
        id: "contaminazione-della-visione",
        nome: "Contaminazione della visione",
        icona: "fa-solid fa-eye-slash",
        preview: "simbolismo personale · interferenza emotiva · falsa interpretazione",
        lore: [
          "Il chiaroveggente accede a informazioni reali, ma il suo cervello umano deve <b>tradurre una struttura quadridimensionale in immagini, suoni e concetti comprensibili</b>.",
          "Paura, desiderio, trauma, ossessione o forte stress possono contaminare questa traduzione. L'informazione di fondo non viene necessariamente modificata, ma può presentarsi attraverso simboli fuorvianti, dettagli enfatizzati, omissioni o associazioni prodotte dall'inconscio.",
          "Per questo motivo una visione non equivale mai automaticamente a un'interpretazione corretta."
        ],
        mech: [
          "Stati di forte agitazione possono ridurre la chiarezza delle visioni o introdurre elementi simbolici personali.",
          "Un'immagine correttamente vista può essere interpretata erroneamente dal personaggio.",
          "Manipolazioni sovrannaturali del tessuto informativo possono inoltre produrre vere tracce falsificate, se una capacità specifica lo consente."
        ]
      },
      {
        id: "eco-visionario",
        nome: "Eco visionario",
        icona: "fa-solid fa-head-side-virus",
        preview: "trauma osservato · memoria intrusiva · dissociazione",
        lore: [
          "Le visioni particolarmente immersive vengono vissute dal sistema nervoso come esperienze quasi reali.",
          "Assistere attraverso la chiaroveggenza a torture, omicidi, catastrofi o altre esperienze estreme può lasciare <b>stress traumatico, incubi, dolore fantasma o flash sensoriali</b> anche quando il chiaroveggente sa razionalmente di non essere stato fisicamente presente.",
          "Osservare eventi appartenenti alla propria stessa biografia è particolarmente destabilizzante: vedersi dall'esterno o assistere alla propria sofferenza da un punto di vista impossibile può produrre episodi dissociativi e derealizzazione."
        ]
      }
    ]
  },
  'lettori': { // This will be applied to empatici, telepatici, animici
    caratteristiche: [
      {
        id: "canale-bidirezionale",
        nome: "Canale bidirezionale",
        icona: "fa-solid fa-arrows-left-right",
        preview: "sintonizzazione reciproca · permeabilità · contatto tra strati",
        lore: [
          "Che il lettore sia empatico, telepatico o animico, ogni lettura richiede di <b>sintonizzare il proprio Ren con uno specifico strato dell'anima altrui</b>.",
          "Questo canale non è perfettamente unidirezionale. Il lettore accede al soggetto, ma una parte della propria configurazione entra contemporaneamente in contatto con ciò che sta leggendo.",
          "Il fenomeno non permette normalmente al bersaglio di leggere a propria volta il metaumano e non costituisce comunicazione automatica; spiega però perché ogni lettura profonda comporti due rischi speculari: <b>assorbimento</b> e <b>impronta</b>."
        ]
      }
    ],
    avversioni: [
      {
        id: "assorbimento",
        nome: "Assorbimento",
        icona: "fa-solid fa-magnet",
        preview: "contaminazione interna · residui altrui · confusione del sé",
        lore: [
          "Dopo una lettura, una parte di ciò che è stato percepito può <b>rimanere temporaneamente aderente al lettore</b> e integrarsi nel suo vissuto come se gli appartenesse.",
          "Il contenuto assorbito dipende dalla tipologia.",
          "<b>Lettori empatici — Shut:</b> possono trattenere emozioni altrui. Rabbia, paura, desiderio, vergogna o depressione possono persistere per ore o giorni dopo la lettura, talvolta senza che il lettore riconosca immediatamente la loro origine.",
          "<b>Lettori telepatici — Ba:</b> possono trattenere pensieri, formule linguistiche, immagini mentali, ossessioni o frammenti mnemonici. Possono comparire pensieri intrusivi formulati con una voce interiore che non appartiene al lettore.",
          "<b>Lettori animici — Ren:</b> possono trattenere frammenti identitari: tic, preferenze, posture, abitudini, modi di parlare o sensazioni di appartenenza estranee alla propria storia.",
          "L'assorbimento aumenta con profondità, durata e ripetizione della lettura, e diventa particolarmente pericoloso su soggetti fortemente traumatizzati, posseduti, frammentati o sovrannaturalmente alterati."
        ]
      },
      {
        id: "impronta",
        nome: "Impronta",
        icona: "fa-solid fa-fingerprint",
        preview: "residuo del lettore · contaminazione inversa · canale lasciato aperto",
        lore: [
          "L'impronta è il fenomeno opposto all'assorbimento: durante una lettura profonda il lettore può <b>lasciare qualcosa di sé nello strato che ha osservato</b>.",
          "L'effetto è generalmente lieve e temporaneo, ma può diventare più evidente dopo contatti ripetuti.",
          "<b>Empatici:</b> il soggetto può conservare per qualche tempo un tono emotivo, una calma, un'ansia o una particolare sensibilità che appartenevano al lettore.",
          "<b>Telepatici:</b> possono rimanere formule mentali, immagini ricorrenti, parole o pensieri intrusivi collegati al lettore.",
          "<b>Animici:</b> il rischio è più profondo: un contatto intenso può depositare una traccia riconoscibile della firma identitaria del lettore nel Ren del soggetto.",
          "L'impronta non permette di controllare successivamente il bersaglio né crea automaticamente un legame permanente, ma può essere riconosciuta da capacità capaci di analizzare lo strato interessato."
        ]
      }
    ]
  },
  'riemersi': {
    caratteristiche: [
      {
        id: "riemersione-caratteristica",
        nome: "Riemersione",
        icona: "fa-solid fa-water",
        preview: "morte incompleta · ritorno automatico · Creazione finita",
        lore: [
          "Il Ren di un Riemerso contiene una quantità anomala di Creazione che gli impedisce di <b>completare normalmente la Fine</b>.",
          "Quando il Riemerso muore, il Ren si separa dal corpo e raggiunge la propria Spiaggia come quello di qualunque altro essere umano. Dopo circa <b>5–10 minuti</b>, tuttavia, la sovrasaturazione di Creazione lo trascina violentemente nella direzione opposta e lo forza a rientrare nel proprio corpo.",
          "La Riemersione è <b>automatica</b>: il Riemerso non sceglie se tornare e non deve attivare alcun potere.",
          "Il ritorno non costituisce guarigione. Ferite, emorragie, veleni, ustioni, insufficienze d'organo e qualunque altra causa della morte rimangono presenti. La Riemersione riattiva soltanto le funzioni biologiche minime necessarie perché il Ren possa nuovamente aderire all'organismo.",
          "Se la causa letale non viene rimossa, il Riemerso può morire nuovamente poco dopo, entrando in un <b>loop morte–Riemersione</b>.",
          "Ogni Riemersione consuma parte della quantità finita di Creazione presente nel Ren. Il Riemerso non è quindi immortale: <b>ogni ritorno riduce la capacità futura di tornare ancora</b>."
        ],
        mech: [
          "La capacità non funziona quando:",
          "Il corpo è materialmente troppo distrutto per poter nuovamente sostenere la vita;",
          "Il Ren è stato distrutto, intrappolato, reclamato o deviato verso una destinazione che impedisca il ritorno;",
          "Il legame con il corpo viene definitivamente reciso;",
          "La morte avviene per naturale esaurimento senile dell'organismo."
        ]
      },
      {
        id: "impronte-della-riemersione",
        nome: "Impronte della Riemersione",
        icona: "fa-solid fa-hand",
        preview: "conto delle morti · marchi permanenti · memoria corporea",
        lore: [
          "Ogni volta che il Ren attraversa la Spiaggia e viene trascinato nuovamente nel corpo, sulla pelle compare una <b>nuova impronta sbiadita di mano</b>, simile a una cicatrice piatta visibile sotto l'epidermide.",
          "Le impronte sono permanenti e il loro numero corrisponde alle Riemersioni effettivamente avvenute.",
          "Non conferiscono poteri né permettono normalmente di stabilire quando siano avvenute le morti, ma costituiscono un segno fisico impossibile da cancellare definitivamente con mezzi ordinari."
        ]
      }
    ],
    avversioni: [
      {
        id: "sindrome-del-ritorno",
        nome: "Sindrome del ritorno",
        icona: "fa-solid fa-virus",
        preview: "salsedine · disorientamento · corpo non ancora vivo",
        lore: [
          "Una Riemersione è estremamente traumatica per l'organismo.",
          "Al ritorno il Riemerso espelle acqua salmastra dai polmoni, tossisce, vomita, presenta tremori, temperatura alterata, battito irregolare e un sistema nervoso ancora parzialmente disallineato rispetto al presente.",
          "Per alcuni minuti può continuare a sentire il rumore delle onde, l'odore del mare o la sensazione di galleggiare nonostante si trovi sulla terraferma.",
          "Riemersioni multiple in breve tempo fanno accumulare i sintomi e possono produrre stati dissociativi, insonnia, paura della morte, flash della Spiaggia e difficoltà a sentirsi pienamente vivi."
        ]
      },
      {
        id: "deriva",
        nome: "Deriva",
        icona: "fa-solid fa-skull",
        preview: "Creazione finita · erosione del ritorno · Fine definitiva",
        lore: [
          "Ogni morte consuma irreversibilmente una parte della sovrasaturazione di Creazione che rende possibile la Riemersione.",
          "Questo processo prende il nome di <b>Deriva</b>.",
          "Non esiste un numero universale di morti che un Riemerso possa sopportare: la quantità iniziale di Creazione e il consumo prodotto da ogni attraversamento variano da individuo a individuo. Riemersioni particolarmente traumatiche, loop ripetuti o capacità che spendono direttamente questa riserva possono accelerare il processo."
        ],
        mech: [
          "Con il progredire della Deriva il confine tra corpo, Spiaggia e Fine diventa meno stabile. Possono aumentare:",
          "Episodi di derealizzazione;",
          "Sensazione persistente di acqua o salsedine;",
          "Percezioni della Spiaggia durante la veglia;",
          "Difficoltà nel sentirsi completamente aderenti al proprio corpo;",
          "Durata e gravità della Sindrome del ritorno.",
          "Quando la Creazione residua non è più sufficiente a respingere la Fine, la morte successiva diventa <b>definitiva</b>."
        ]
      }
    ]
  },
  'artefici': {
    caratteristiche: [
      {
        id: "investimento-autoriale",
        nome: "Investimento autoriale",
        icona: "fa-solid fa-palette",
        preview: "Ren nell'Opera · firma dell'autore · legame persistente",
        lore: [
          "Perché un'Opera possa interagire con la Creazione, l'Artefice deve <b>investirvi una traccia della propria struttura animica</b>.",
          "Ogni Opera sovrannaturalmente attiva contiene quindi una firma riconducibile al Ren del proprio autore. La quantità ordinariamente investita è troppo piccola per produrre da sola una perdita misurabile di capacità o statistiche, ma rende l'Opera qualcosa di più di un semplice oggetto utilizzato come focus.",
          "Un lettore animico o un altro fenomeno capace di riconoscere firme del Ren può, in condizioni appropriate, rilevare che più Opere provengono dallo stesso Artefice.",
          "Opere particolarmente profonde, numerose o durevoli richiedono un investimento maggiore e aumentano la sensazione che parte dell'autore rimanga distribuita fuori dal proprio corpo.",
          "La distruzione violenta di un'Opera fortemente investita può provocare un contraccolpo proporzionale all'importanza del legame."
        ]
      }
    ],
    avversioni: [
      {
        id: "blocco-creativo",
        nome: "Blocco creativo",
        icona: "fa-solid fa-ban",
        preview: "assenza del modello · sterilità generativa · perdita d'accesso",
        lore: [
          "Lo <i>shining</i> degli Artefici non può operare senza un <b>atto creativo autenticamente strutturato</b>.",
          "Periodi di blocco creativo grave, incapacità di concludere un'Opera, perdita totale del rapporto con il proprio medium artistico o condizioni psicologiche che impediscano di formulare una rappresentazione coerente possono quindi limitare direttamente l'accesso ai poteri.",
          "Il blocco non spegne lo <i>shining</i>: impedisce all'Artefice di costruire il modello necessario affinché la Creazione possa rispondere.",
          "Forzare un'Opera durante un blocco, una forte crisi emotiva o uno stato di intenzione contraddittoria aumenta notevolmente la probabilità che l'effetto emerga in forma incompleta, simbolica o diversa da quella voluta."
        ]
      },
      {
        id: "autoinfluenza",
        nome: "Autoinfluenza",
        icona: "fa-solid fa-masks-theater",
        preview: "autore come soggetto · profezia creativa · realtà che asseconda il modello",
        lore: [
          "La risonanza dell'Artefice con le proprie Opere rende particolarmente pericolose le rappresentazioni che <b>hanno l'autore stesso come soggetto</b>.",
          "Scrivere, dipingere, scolpire o comporre ripetutamente una versione di sé in una determinata condizione può creare una risonanza involontaria tra l'Opera e la propria realtà.",
          "Un Artefice che lavori ossessivamente sulla propria malattia, rovina, morte, fallimento o trasformazione rischia che la Creazione inizi a trovare occasioni plausibili per avvicinarlo a quella rappresentazione.",
          "Il fenomeno non rende automaticamente vero qualsiasi autoritratto e non permette di utilizzare la caratteristica come potere gratuito di auto-potenziamento: è una <b>vulnerabilità all'intenzione creativa non sufficientemente controllata</b>."
        ]
      },
      {
        id: "deriva-creativa",
        nome: "Deriva creativa",
        icona: "fa-solid fa-hurricane",
        preview: "Opera fuori controllo · confine arte/realtà · compulsione",
        lore: [
          "L'atto di modificare la realtà attraverso la creazione può alterare progressivamente il rapporto dell'Artefice con ciò che considera reale.",
          "L'uso compulsivo dei poteri, la produzione di molte Opere sotto stress o il mantenimento simultaneo di numerosi investimenti può provocare una deriva creativa.",
          "Nei casi estremi l'Artefice può perdere temporaneamente il controllo della relazione tra intenzione e rappresentazione, producendo <b>Opere fuori controllo</b> che seguono il significato implicito dell'atto creativo anziché quello che l'autore credeva di voler esprimere."
        ],
        mech: [
          "Sintomi della deriva creativa:",
          "Difficoltà nel ricordare se un evento sia accaduto spontaneamente o a causa di una propria Opera;",
          "Impulsi ossessivi a creare;",
          "Paura di rappresentare eventi negativi;",
          "Convinzione che coincidenze ordinarie siano state prodotte inconsapevolmente;",
          "Opere involontariamente influenzate dallo stato emotivo dell'autore."
        ]
      }
    ]
  },
  'aoristi': {
    caratteristiche: [
      {
        id: "futuro-aoristico",
        nome: "Futuro aoristico",
        icona: "fa-solid fa-hourglass-start",
        preview: "Ren incompleto · lacuna temporale · destino non scritto",
        lore: [
          "La porzione futura del Ren dell'Aorista <b>non esiste nel block universe finché non viene effettivamente vissuta</b>.",
          "Qualsiasi capacità che tenti di leggere direttamente il futuro dell'Aorista incontra quindi un vuoto, una discontinuità o informazioni contraddittorie. Non si tratta di occultamento o resistenza alla precognizione: non esiste letteralmente alcuna informazione futura da leggere.",
          "La stessa anomalia può produrre <b>lacune aoristiche</b> negli eventi esterni quando una loro porzione futura dipende causalmente da una scelta che l'Aorista non ha ancora compiuto."
        ],
        mech: [
          "I chiaroveggenti non possono osservare un futuro aoristico non ancora cristallizzato.",
          "I lettori animici possono leggere la traiettoria già attraversata del Ren, ma non la sua continuazione futura.",
          "Fenomeni che richiedono una morte futura già fissata non possono determinare con certezza quando o come morirà un Aorista.",
          "Il passato dell'Aorista, una volta vissuto e cristallizzato, è invece leggibile normalmente."
        ]
      },
      {
        id: "costante",
        nome: "Costante",
        icona: "fa-solid fa-link",
        preview: "risonanza inversa · riferimento temporale · legame unico",
        lore: [
          "Ogni Aorista possiede potenzialmente una sola <b>Costante</b>: un individuo il cui Ren risuona in fase inversa con il suo, formando un riferimento stabile lungo la linea temporale.",
          "La Costante non viene scelta dall'Aorista e il rapporto non deve necessariamente essere romantico, affettuoso o persino positivo. Può manifestarsi come amore, amicizia, ossessione, rivalità o antagonismo; ciò che conta è la complementarità dei Ren.",
          "Il legame è ontologico e non viene spezzato da litigi, distanza emotiva, tradimenti o interruzione volontaria del rapporto.",
          "Il contatto sensoriale recente con la Costante — vederla, sentirne la voce, toccarla — <b>rafforza il filo di ritorno</b> dell'Aorista e contribuisce a mantenerne il Ren aderente al presente.",
          "La Costante non è automaticamente consapevole della propria funzione.",
          "Se muore, l'Aorista <b>non ne acquisisce un'altra</b>."
        ]
      }
    ],
    avversioni: [
      {
        id: "nausea-temporale",
        nome: "Nausea temporale",
        icona: "fa-solid fa-dizzy",
        preview: "disorientamento cronologico · déjà vécu · accumulo",
        lore: [
          "Ogni manipolazione significativa della propria linea temporale lascia nel Ren dell'Aorista un breve disallineamento tra il tempo appena attraversato e quello presente.",
          "L'intensità aumenta con la profondità, durata e frequenza dei viaggi.",
          "Salti brevi producono normalmente sintomi transitori; viaggi di anni o decenni e regressioni ripetute in poco tempo possono richiedere ore o giorni di recupero.",
          "Continuare a utilizzare capacità temporali durante una nausea ancora grave accelera lo <b>sfasamento cronico</b>."
        ],
        mech: [
          "La nausea temporale può manifestarsi come:",
          "Vertigini;",
          "Confusione su data e ora;",
          "Uso involontario di tempi verbali sbagliati;",
          "Déjà vécu;",
          "Sovrapposizione di ricordi incompatibili;",
          "Sensazione che il presente sia meno reale del tempo appena lasciato."
        ]
      },
      {
        id: "instabilita-da-assenza-della-costante",
        nome: "Instabilità da assenza della Costante",
        icona: "fa-solid fa-link-slash",
        preview: "viaggi spontanei · filo assottigliato · perdita del presente",
        lore: [
          "Quando l'Aorista rimane per un periodo prolungato senza alcun contatto con la propria Costante, il legame che utilizza inconsciamente come riferimento temporale può assottigliarsi.",
          "Il Ren inizia allora a perdere stabilità e può <b>scivolare spontaneamente nel proprio passato senza intenzione cosciente</b>.",
          "Il contatto sensoriale con la Costante ristabilisce normalmente il riferimento e interrompe la progressione dei viaggi spontanei.",
          "La morte della Costante rende questa instabilità particolarmente grave e permanente."
        ],
        mech: [
          "I viaggi spontanei causati dall'instabilità:",
          "Non utilizzano normalmente un Segnalibro scelto;",
          "Tendono a dirigersi verso momenti emotivamente forti della biografia;",
          "Hanno durata imprevedibile;",
          "Producono normale nausea temporale;",
          "Diventano progressivamente più frequenti se il contatto non viene ristabilito."
        ]
      },
      {
        id: "sfasamento-cronico",
        nome: "Sfasamento cronico",
        icona: "fa-solid fa-clock-rotate-left",
        preview: "accavallamento · abrasione identitaria · perdimento",
        lore: [
          "L'abuso delle capacità temporali, i viaggi spontanei prolungati e i tentativi reiterati di forzare eventi cristallizzati possono compromettere progressivamente la capacità del Ren aoristico di riconoscere <b>quale punto della propria linea debba essere vissuto come presente</b>.",
          "La Costante rimane il riferimento più stabile durante l'intero processo e, fino agli stadi non terminali, il suo contatto può rallentare o favorire la regressione dei sintomi."
        ],
        mech: [
          "Lo sfasamento procede generalmente attraverso quattro stadi:",
          "<b>Stadio 1 — Sfasamento:</b> déjà vécu frequente, errori nei tempi verbali, confusione temporale lieve. È ancora completamente reversibile con riposo e stabilizzazione.",
          "<b>Stadio 2 — Accavallamento:</b> due momenti della biografia iniziano a sovrapporsi percettivamente. Luoghi, persone e conversazioni passate possono apparire sopra al presente.",
          "<b>Stadio 3 — Abrasione identitaria:</b> l'Aorista perde l'ordine cronologico della propria vita, confonde età, persone e periodi e fatica a stabilire quali ricordi appartengano a quale versione degli eventi.",
          "<b>Stadio 4 — Perdimento:</b> il Ren rimane disperso nel proprio passato e non riesce più a tornare al corpo del presente. Il corpo entra in uno stato comatoso e progressivamente deperisce."
        ]
      }
    ]
  }
};

const interferenzaEmpatici = {
  id: "interferenza-dissonante",
  nome: "Interferenza dissonante — Empatici",
  icona: "fa-solid fa-burst",
  preview: "Shut esposto · possessione · ritorno della Dissonanza",
  lore: [
    "Lo Shut è uno dei principali punti attraverso cui una possessione demoniaca può esercitare pressione sull'ospite.",
    "Un lettore empatico che si immerga profondamente nello Shut di un posseduto o di qualcuno sottoposto a una forte contaminazione dissonante può quindi subire <b>un ritorno della Dissonanza attraverso lo stesso canale che sta utilizzando per leggere</b>.",
    "Il fenomeno può manifestarsi come paura irrazionale, impulsi aggressivi, nausea, emozioni estranee estremamente intense o temporanea perdita di controllo empatico.",
    "Non equivale a una possessione automatica, ma rende le letture profonde di soggetti posseduti particolarmente rischiose."
  ]
};

data.forEach(s => {
  if (specifiche[s.slug]) {
    s.caratteristiche = s.caratteristiche.concat(specifiche[s.slug].caratteristiche);
    s.avversioni = s.avversioni.concat(specifiche[s.slug].avversioni);
  } else if (['lettori-empatici', 'lettori-telepatici', 'lettori-animici'].includes(s.slug)) {
    s.caratteristiche = s.caratteristiche.concat(specifiche['lettori'].caratteristiche);
    let myAvversioni = specifiche['lettori'].avversioni.map(x => Object.assign({}, x)); // clone
    if (s.slug === 'lettori-empatici') {
      myAvversioni.push(interferenzaEmpatici);
    }
    s.avversioni = s.avversioni.concat(myAvversioni);
  }
});

fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
console.log('Aggiornate specifiche metaumani!');
