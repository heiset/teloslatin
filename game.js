const output = document.getElementById("output");
const answerBox = document.getElementById("answer");

let state = "name";
let playerName = "young historian";
let score = 0;
let qIndex = 0;
let tries = 0;
let conserved = [];
let inventory = [];

const MAX_SCORE = 2778;

// 72 questions total.
// First 42 questions are 39 points.
// Last 30 questions are 38 points.
// 42*39 + 30*38 = 2778.
function pointsForQuestion(i) {
  return i < 42 ? 39 : 38;
}

const interludes = {
  0: [
    "Edward Gibbon adjusts his powdered wig.",
    "\"My small assistant,\" he says, \"A tiny Roman mouse named Publius Nibblius has eaten some of my notes!\"",
    "Your mission: restore the memories.",
    "PRESS ENTER TO CONTINUE",
    ""
  ],
  12: [
    "GIBBON READING STOP.",
    "Gibbon opens a dusty book and clears his throat for too long.",
    "He reads something extremely serious about emperors, provinces, armies, virtue, decline, corruption, barbarians, and everyone needing a nap.",
    "The classroom raven summarizes: 'Big empire. Big problems. Many sandals.'",
    "Type anything and press Enter to continue."
  ],
  24: [
    "GIBBON READING STOP.",
    "Gibbon points at a map and says that Rome once stretched so far that a lazy pigeon could not fly across it before lunch.",
    "A senator named Flavius Backpackus whispers: 'This is why organization matters.'",
    "Type anything and press Enter to continue."
  ],
  36: [
    "GIBBON READING STOP.",
    "A funny bit from the Gibbon-zone: the prose is so grand that even the footnotes seem to be wearing marble helmets.",
    "Gibbon says 'decline' with the expression of a man who has lost both an empire and his bookmark.",
    "Type anything and press Enter to continue."
  ],
  48: [
    "GIBBON READING STOP.",
    "Gibbon pauses to complain, politely but intensely, that history is full of people who had one job and did not do it.",
    "The goat in the toga nods. It has also had one job. It ate the job.",
    "Type anything and press Enter to continue."
  ],
  60: [
    "GIBBON READING STOP.",
    "Near the end of the archive, Gibbon becomes very dramatic.",
    "He says that empires fall slowly, then suddenly, then in a way that requires six volumes.",
    "Publius Nibblius the mouse has begun chewing Volume VII, which does not even exist.",
    "Type anything and press Enter to continue."
  ]
};

const questions = [
  {
    kind: "vocab",
    prompt: [
      "A bronze wolf blocks the archive.",
      "English question: What is the Latin greeting for one person: hello?",
      "Answer with one Latin word."
    ],
    answers: ["salve"],
    success: "salve. lupa annuit.",
    hint: "Singular hello.",
    correction: "Answer: salve."
  },
  {
    kind: "history",
    prompt: [
      "A small valley appears between seven cardboard hills.",
      "English question: According to the video, the first Romans mixed and mingled in the valley that became what place?",
      "Answer in English, one or two words."
    ],
    answers: ["forum", "roman forum", "the forum"],
    success: "Correct.",
    hint: "Rome's central public place.",
    correction: "Answer: Forum."
  },
  {
    kind: "translation",
    prompt: [
      "Gibbon drops a flashcard.",
      "Translate into English: salve.",
      "Answer in English."
    ],
    answers: ["hello", "hi"],
    success: "bene. English restored.",
    hint: "A greeting.",
    correction: "Answer: hello."
  },
  {
    kind: "history",
    prompt: [
      "A king-shaped scarecrow is thrown into the Tiber.",
      "English question: In what year did Rome toss out its king and establish the Republic?",
      "Answer with the year."
    ],
    answers: ["509", "509 bc", "509 bce"],
    success: "Correct.",
    hint: "Five hundred nine B.C.",
    correction: "Answer: 509 BC."
  },
  {
    kind: "vocab",
    prompt: [
      "The attendance scroll glows.",
      "English question: How do you say 'I am here' in one Latin word?",
      "Answer with one Latin word."
    ],
    answers: ["adsum"],
    success: "adsum. praesens es.",
    hint: "Class attendance word.",
    correction: "Answer: adsum."
  },
  {
    kind: "history",
    prompt: [
      "Two ghost babies argue over city planning.",
      "English question: According to legend, which two brothers founded Rome?",
      "Answer with both names."
    ],
    answers: ["romulus and remus", "romulus remus", "remus and romulus", "remus romulus"],
    success: "Correct.",
    hint: "One gives Rome its name.",
    correction: "Answer: Romulus and Remus."
  },
  {
    kind: "translation",
    prompt: [
      "A chair breathes like an old senator.",
      "Translate into English: conside.",
      "Answer with the command in English."
    ],
    answers: ["sit", "sit down"],
    success: "conside. sella contenta est.",
    hint: "What you do in a chair.",
    correction: "Answer: sit down."
  },
  {
    kind: "history",
    prompt: [
      "A marble mask says: Republic? Empire?",
      "English question: The Republic was ruled by elected senators. The Empire was ruled by unelected what?",
      "Answer with one English word."
    ],
    answers: ["emperors", "emperor"],
    success: "Correct.",
    hint: "Caesar helped start this change.",
    correction: "Answer: emperors."
  },
  {
    kind: "vocab",
    prompt: [
      "A storm of chalk dust forms a question mark.",
      "English question: What is the Latin classroom word for board?",
      "Answer with one Latin word."
    ],
    answers: ["tabula"],
    success: "tabula. creta cadit.",
    hint: "You write on it.",
    correction: "Answer: tabula."
  },
  {
    kind: "history",
    prompt: [
      "Julius Caesar points at a calendar with a sword.",
      "English question: What month was named in Caesar's honor?",
      "Answer with one English word."
    ],
    answers: ["july"],
    success: "Correct.",
    hint: "After June.",
    correction: "Answer: July."
  },
  {
    kind: "translation",
    prompt: [
      "A backpack crawls across the floor like a crab.",
      "Translate into English: bulga.",
      "Answer in English."
    ],
    answers: ["backpack", "bag"],
    success: "bulga. sarcina viva quiescit.",
    hint: "Something students carry.",
    correction: "Answer: backpack or bag."
  },
  {
    kind: "history",
    prompt: [
      "A tiny flame appears in the Forum.",
      "English question: In what year B.C. was Julius Caesar assassinated?",
      "Answer with the year."
    ],
    answers: ["44", "44 bc", "44 bce"],
    success: "Correct.",
    hint: "Forty-four B.C.",
    correction: "Answer: 44 BC."
  },
  {
    kind: "vocab",
    prompt: [
      "A window blinks. Gibbon pretends this is normal.",
      "English question: What is the Latin classroom word for window?",
      "Answer with one Latin word."
    ],
    answers: ["fenestra"],
    success: "fenestra. oculus parietis aperitur.",
    hint: "Starts with f.",
    correction: "Answer: fenestra."
  },
  {
    kind: "history",
    prompt: [
      "A road made of old applause stretches before you.",
      "English question: What was the main street of ancient Rome called?",
      "Answer in Latin or English."
    ],
    answers: ["via sacra", "sacred way", "the sacred way"],
    success: "Correct.",
    hint: "It means Sacred Way.",
    correction: "Answer: Via Sacra."
  },
  {
    kind: "translation",
    prompt: [
      "The archive wall asks a very reasonable question.",
      "Translate into English: non intellego.",
      "Answer in English."
    ],
    answers: ["i do not understand", "i dont understand", "i don't understand", "i do not get it", "i dont get it"],
    success: "non intellego. tamen procedis.",
    hint: "Something a student says when confused.",
    correction: "Answer: I do not understand."
  },
  {
    kind: "history",
    prompt: [
      "An arch coughs up a pamphlet titled IMPERIAL SPIN.",
      "English question: The video says triumphal arches functioned as what kind of tools?",
      "Answer with two or three English words."
    ],
    answers: ["public relations", "public relations tools", "pr", "pr tools"],
    success: "Correct.",
    hint: "Modern companies also worry about this.",
    correction: "Answer: public relations tools."
  },
  {
    kind: "vocab",
    prompt: [
      "A pen signs a treaty with a mouse.",
      "English question: What is the Latin classroom word for pen?",
      "Answer with one Latin word."
    ],
    answers: ["calamus"],
    success: "calamus. atramentum ridet.",
    hint: "Not graphis.",
    correction: "Answer: calamus."
  },
  {
    kind: "history",
    prompt: [
      "The sand whispers about gladiators.",
      "English question: The Colosseum held about how many spectators?",
      "Answer with the number."
    ],
    answers: ["50000", "50,000", "fifty thousand"],
    success: "Correct.",
    hint: "Five followed by four zeroes.",
    correction: "Answer: 50,000."
  },
  {
    kind: "translation",
    prompt: [
      "A mouth appears in the wall.",
      "Translate into English: os.",
      "Answer in English."
    ],
    answers: ["mouth"],
    success: "os. paries loquitur.",
    hint: "Body part.",
    correction: "Answer: mouth."
  },
  {
    kind: "history",
    prompt: [
      "A nervous ostrich hands you a Colosseum ticket.",
      "English question: At the Colosseum's grand opening, about how many animals were slaughtered?",
      "Answer with the number."
    ],
    answers: ["5000", "5,000", "five thousand"],
    success: "Correct.",
    hint: "Five thousand.",
    correction: "Answer: 5,000."
  },
  {
    kind: "vocab",
    prompt: [
      "Ghost General Marcellus points to the door.",
      "English question: What is the Latin command 'enter'?",
      "Answer with one Latin word."
    ],
    answers: ["intra", "intrate"],
    success: "intra. ianua paret.",
    hint: "Singular command is best; plural accepted.",
    correction: "Answer: intra."
  },
  {
    kind: "history",
    prompt: [
      "A column spirals upward like a history noodle.",
      "English question: Which emperor's column is described as a long scroll of continuous narration?",
      "Answer with one name."
    ],
    answers: ["trajan", "trajanus"],
    success: "Correct.",
    hint: "His empire reached its greatest size.",
    correction: "Answer: Trajan."
  },
  {
    kind: "translation",
    prompt: [
      "A thirsty robot made of aqueduct stones rolls toward you.",
      "Translate into English: aquam.",
      "Answer in English."
    ],
    answers: ["water"],
    success: "aquam. robotus bibit.",
    hint: "Something to drink.",
    correction: "Answer: water."
  },
  {
    kind: "history",
    prompt: [
      "A fish wearing a toga rises from the Mediterranean.",
      "English question: What did Romans call the Mediterranean Sea?",
      "Answer in Latin or English."
    ],
    answers: ["mare nostrum", "our sea"],
    success: "Correct.",
    hint: "It means our sea.",
    correction: "Answer: Mare Nostrum."
  },
  {
    kind: "vocab",
    prompt: [
      "Judge Crustulus Maximus demands dessert law.",
      "English question: What is the Latin classroom word for cookie?",
      "Answer with one Latin word."
    ],
    answers: ["crustulum", "crustula"],
    success: "crustulum. iudex placatus est.",
    hint: "Starts with crust-.",
    correction: "Answer: crustulum."
  },
  {
    kind: "history",
    prompt: [
      "An altar hums quietly, trying to be stable.",
      "English question: What is the Latin name for the Roman Peace?",
      "Answer with two words."
    ],
    answers: ["pax romana", "roman peace"],
    success: "Correct.",
    hint: "Means Roman Peace.",
    correction: "Answer: Pax Romana."
  },
  {
    kind: "translation",
    prompt: [
      "Tiny senators hold a meeting on a bookshelf.",
      "Translate into English: pegma.",
      "Answer in English."
    ],
    answers: ["bookshelf", "shelf"],
    success: "pegma. senatores parvi sedent.",
    hint: "Where books go.",
    correction: "Answer: bookshelf."
  },
  {
    kind: "history",
    prompt: [
      "You enter a dome. The ceiling looks like impossible math.",
      "English question: The Pantheon is based on what perfect shape?",
      "Answer with one English word."
    ],
    answers: ["circle", "a circle", "perfect circle"],
    success: "Correct.",
    hint: "Round. Very round.",
    correction: "Answer: circle."
  },
  {
    kind: "vocab",
    prompt: [
      "A statue suddenly starts jogging in sandals.",
      "English question: What is the Latin command 'run'?",
      "Answer with one Latin word."
    ],
    answers: ["curre", "currite"],
    success: "curre. statua sudat.",
    hint: "Singular command is best; plural accepted.",
    correction: "Answer: curre."
  },
  {
    kind: "history",
    prompt: [
      "A beam of sunlight lands on your shoe.",
      "English question: What is the only source of light in the Pantheon?",
      "Answer with one English word."
    ],
    answers: ["oculus", "the oculus"],
    success: "Correct.",
    hint: "It means eye.",
    correction: "Answer: oculus."
  },
  {
    kind: "translation",
    prompt: [
      "A priest of silence taps the desk.",
      "Translate into English: favete linguis.",
      "Answer in English."
    ],
    answers: ["keep silence", "be silent", "silence", "hold your tongues"],
    success: "favete linguis. silentium triumphat.",
    hint: "A command for quiet.",
    correction: "Answer: keep silence."
  },
  {
    kind: "history",
    prompt: [
      "A road of stones stretches out like a command.",
      "English question: What ancient road was Rome's gateway to the east?",
      "Answer with two English words."
    ],
    answers: ["appian way", "the appian way", "via appia"],
    success: "Correct.",
    hint: "Starts with A.",
    correction: "Answer: Appian Way."
  },
  {
    kind: "vocab",
    prompt: [
      "Archivist Claudia Quarta holds up a book.",
      "English question: What is the Latin classroom word for book?",
      "Answer with one Latin word."
    ],
    answers: ["liber"],
    success: "liber. memoria servatur.",
    hint: "Begins with lib-.",
    correction: "Answer: liber."
  },
  {
    kind: "history",
    prompt: [
      "A ladder descends into cool tunnels full of old names.",
      "English question: The catacombs were not hideouts. They were budget underground what?",
      "Answer with one English word."
    ],
    answers: ["cemeteries", "cemetery"],
    success: "Correct.",
    hint: "Places for burying the dead.",
    correction: "Answer: cemeteries."
  },
  {
    kind: "translation",
    prompt: [
      "The archive doors begin to close. A goat in a tiny toga waves.",
      "Translate into English: vale.",
      "Answer in English."
    ],
    answers: ["goodbye", "bye", "farewell"],
    success: "vale. capra lacrimat.",
    hint: "A farewell.",
    correction: "Answer: goodbye."
  },
  {
    kind: "history",
    prompt: [
      "The scroll glows with a cross-shaped error message.",
      "English question: Which emperor legalized Christianity after taking power in 312?",
      "Answer with one name."
    ],
    answers: ["constantine", "constantinus"],
    success: "Correct.",
    hint: "His mother was Helena.",
    correction: "Answer: Constantine."
  },

  // New 36 questions

  {
    kind: "vocab",
    prompt: [
      "Gibbon sees a door and immediately writes a paragraph about it.",
      "English question: What is the Latin classroom word for door?",
      "Answer with one Latin word."
    ],
    answers: ["ianua", "ostium"],
    success: "ianua. porta memoriae aperitur.",
    hint: "Either classroom door word is accepted.",
    correction: "Answer: ianua or ostium."
  },
  {
    kind: "history",
    prompt: [
      "A marble emperor calls himself modest while standing on a giant pedestal.",
      "English question: Who was the nephew of Julius Caesar and first great emperor of the Pax Romana?",
      "Answer with one name."
    ],
    answers: ["augustus", "caesar augustus"],
    success: "Correct.",
    hint: "His name starts with A.",
    correction: "Answer: Augustus."
  },
  {
    kind: "translation",
    prompt: [
      "A student ghost raises one transparent hand.",
      "Translate into English: licetne mihi ire ad latrinam?",
      "Answer in English."
    ],
    answers: [
      "can i go to the bathroom",
      "may i go to the bathroom",
      "can i go to bathroom",
      "may i go to bathroom"
    ],
    success: "licet. spectrum abit.",
    hint: "A very common classroom request.",
    correction: "Answer: May I go to the bathroom?"
  },
  {
    kind: "history",
    prompt: [
      "A chariot zooms by and nearly erases your sandals.",
      "English question: Where did Romans go to watch chariot races?",
      "Answer with the place name."
    ],
    answers: ["circus maximus", "the circus maximus"],
    success: "Correct.",
    hint: "Two words: Circus ____.",
    correction: "Answer: Circus Maximus."
  },
  {
    kind: "vocab",
    prompt: [
      "A desk demands recognition.",
      "English question: What is the Latin classroom word for desk or table?",
      "Answer with one Latin word."
    ],
    answers: ["mensa", "mensam"],
    success: "mensa. lignum superbissimum est.",
    hint: "Go to the table = i ad mensam.",
    correction: "Answer: mensa."
  },
  {
    kind: "history",
    prompt: [
      "A Roman engineer holds concrete like it is magic soup.",
      "English question: The Colosseum was begun in 72 A.D. under which emperor?",
      "Answer with one name."
    ],
    answers: ["vespasian", "vespasianus"],
    success: "Correct.",
    hint: "Starts with V.",
    correction: "Answer: Vespasian."
  },
  {
    kind: "translation",
    prompt: [
      "A chalkboard writes by itself.",
      "Translate into English: scribe in tabula.",
      "Answer in English."
    ],
    answers: ["write on the board", "write on board"],
    success: "scribe. tabula delectatur.",
    hint: "Scribe = write.",
    correction: "Answer: Write on the board."
  },
  {
    kind: "history",
    prompt: [
      "A temple refuses to be recycled into someone's patio.",
      "English question: What is the best-preserved temple from ancient Rome?",
      "Answer with one word."
    ],
    answers: ["pantheon", "the pantheon"],
    success: "Correct.",
    hint: "It has the oculus.",
    correction: "Answer: Pantheon."
  },
  {
    kind: "vocab",
    prompt: [
      "Gibbon asks the floor for its credentials.",
      "English question: What is the Latin classroom word for floor?",
      "Answer with one Latin word."
    ],
    answers: ["solum"],
    success: "solum. pavimentum non queritur.",
    hint: "Starts with s.",
    correction: "Answer: solum."
  },
  {
    kind: "history",
    prompt: [
      "A pile of columns from Egypt asks for a passport stamp.",
      "English question: The Pantheon's massive one-piece granite columns were shipped from what country?",
      "Answer with one English word."
    ],
    answers: ["egypt"],
    success: "Correct.",
    hint: "Land of pyramids.",
    correction: "Answer: Egypt."
  },
  {
    kind: "translation",
    prompt: [
      "A tiny Roman actor enters carrying a plastic sun.",
      "Translate into English: solem delineo.",
      "Answer in English."
    ],
    answers: ["i draw the sun", "i am drawing the sun", "i'm drawing the sun"],
    success: "sol pictus ridet.",
    hint: "Delineo = I draw.",
    correction: "Answer: I am drawing the sun."
  },
  {
    kind: "history",
    prompt: [
      "A pagan temple and Christian church wear the same roof.",
      "English question: The Pantheon survived so well because it has been in continuous what?",
      "Answer with one English word."
    ],
    answers: ["use", "usage"],
    success: "Correct.",
    hint: "People kept using it.",
    correction: "Answer: use."
  },
  {
    kind: "vocab",
    prompt: [
      "A flag flaps without wind.",
      "English question: What is the Latin classroom word for flag?",
      "Answer with one Latin word."
    ],
    answers: ["vexillum"],
    success: "vexillum. parvum imperium salutat.",
    hint: "Starts with vex-.",
    correction: "Answer: vexillum."
  },
  {
    kind: "history",
    prompt: [
      "A gloomy tunnel whispers about early Christians.",
      "English question: The catacombs were scattered just outside Rome's what?",
      "Answer with one English word."
    ],
    answers: ["walls", "wall", "city walls"],
    success: "Correct.",
    hint: "They protected the city.",
    correction: "Answer: walls."
  },
  {
    kind: "translation",
    prompt: [
      "Gibbon asks politely, then less politely.",
      "Translate into English: quid significat?",
      "Answer in English."
    ],
    answers: ["what does it mean", "what does this mean", "what means", "what does that mean"],
    success: "bene. sensus inventus est.",
    hint: "A classroom meaning question.",
    correction: "Answer: What does this mean?"
  },
  {
    kind: "history",
    prompt: [
      "An aqueduct gallops across the countryside like a stone horse.",
      "English question: Aqueducts carried what into Rome?",
      "Answer with one English word."
    ],
    answers: ["water"],
    success: "Correct.",
    hint: "Rome needed lots of it.",
    correction: "Answer: water."
  },
  {
    kind: "vocab",
    prompt: [
      "A book refuses to be alone and summons a notebook.",
      "English question: What is one Latin classroom word for notebook?",
      "Answer with one Latin word."
    ],
    answers: ["libellus", "pugillares"],
    success: "libellus. paginae susurrant.",
    hint: "Either notebook word is accepted.",
    correction: "Answer: libellus or pugillares."
  },
  {
    kind: "history",
    prompt: [
      "A barbarian sneaks toward an aqueduct with suspicious tools.",
      "English question: The video says aqueducts were Rome's Achilles what?",
      "Answer with one English word."
    ],
    answers: ["heel"],
    success: "Correct.",
    hint: "Achilles ____.",
    correction: "Answer: heel."
  },
  {
    kind: "translation",
    prompt: [
      "A little cup trembles on the table.",
      "Translate into English: bibe.",
      "Answer with the command in English."
    ],
    answers: ["drink"],
    success: "bibe. poculum vacuum est.",
    hint: "Command for taking a beverage.",
    correction: "Answer: drink."
  },
  {
    kind: "history",
    prompt: [
      "A cross-shaped sign appears over a battlefield.",
      "English question: Constantine had a vision that he would triumph under the sign of the what?",
      "Answer with one English word."
    ],
    answers: ["cross"],
    success: "Correct.",
    hint: "Christian symbol.",
    correction: "Answer: cross."
  },
  {
    kind: "vocab",
    prompt: [
      "A chair and a desk argue over classroom importance.",
      "English question: What is the Latin classroom word for chair?",
      "Answer with one Latin word."
    ],
    answers: ["sella"],
    success: "sella. sedes pacem facit.",
    hint: "You sit in it.",
    correction: "Answer: sella."
  },
  {
    kind: "history",
    prompt: [
      "Gibbon looks worried about religious policy.",
      "English question: In the year 300, you could be killed for being what?",
      "Answer with one English word."
    ],
    answers: ["christian", "a christian"],
    success: "Correct.",
    hint: "Followers of Jesus.",
    correction: "Answer: Christian."
  },
  {
    kind: "translation",
    prompt: [
      "A Roman cafeteria opens in the archive.",
      "Translate into English: panem.",
      "Answer in English."
    ],
    answers: ["bread"],
    success: "panem. micae cadunt.",
    hint: "Food, often with butter.",
    correction: "Answer: bread."
  },
  {
    kind: "history",
    prompt: [
      "The first great Christian church opens like a gigantic filing cabinet.",
      "English question: What church opened as a kind of first Vatican?",
      "Answer with Saint John's or Lateran."
    ],
    answers: [
      "saint john's",
      "saint johns",
      "st john's",
      "st johns",
      "st john lateran",
      "saint john lateran",
      "lateran",
      "san giovanni in laterano",
      "san giovanni in la torano"
    ],
    success: "Correct.",
    hint: "Saint John in the Lateran.",
    correction: "Answer: Saint John's / Lateran."
  },
  {
    kind: "vocab",
    prompt: [
      "A lamp shines on Gibbon's enormous notes.",
      "English question: What is the Latin classroom word for lamp?",
      "Answer with one Latin word."
    ],
    answers: ["lucerna"],
    success: "lucerna. tenebrae cedunt.",
    hint: "Starts with luc-.",
    correction: "Answer: lucerna."
  },
  {
    kind: "history",
    prompt: [
      "A river rolls by, carrying tiny boats and bad decisions.",
      "English question: Rome was born along what river?",
      "Answer with one English word."
    ],
    answers: ["tiber", "the tiber"],
    success: "Correct.",
    hint: "Starts with T.",
    correction: "Answer: Tiber."
  },
  {
    kind: "translation",
    prompt: [
      "A very dramatic student points at a cookie.",
      "Translate into English: mihi placet.",
      "Answer in English."
    ],
    answers: ["i like it", "it pleases me", "i like"],
    success: "mihi placet. crustulum placet quoque.",
    hint: "Literally: it pleases me.",
    correction: "Answer: I like it."
  },
  {
    kind: "history",
    prompt: [
      "Gibbon walks over a bridge and finds a neighborhood across the river.",
      "English question: What Roman district name means across the Tiber?",
      "Answer with one name."
    ],
    answers: ["trastevere", "trastavere", "trastavery", "trestavory"],
    success: "Correct.",
    hint: "Starts with Tras-.",
    correction: "Answer: Trastevere."
  },
  {
    kind: "vocab",
    prompt: [
      "A wall blocks the archive and demands its Latin name.",
      "English question: What is the Latin classroom word for wall?",
      "Answer with one Latin word."
    ],
    answers: ["paries"],
    success: "paries. murus civilior fit.",
    hint: "Starts with p.",
    correction: "Answer: paries."
  },
  {
    kind: "history",
    prompt: [
      "A piazza becomes a living room with pigeons.",
      "English question: In the video, piazzas have served as what kind of center since ancient times?",
      "Answer with one English word."
    ],
    answers: ["community", "community center", "social center"],
    success: "Correct.",
    hint: "A place for people to gather.",
    correction: "Answer: community center."
  },
  {
    kind: "translation",
    prompt: [
      "A tiny doctor appears from Gaul.",
      "Translate into English: medicus sum.",
      "Answer in English."
    ],
    answers: ["i am a doctor", "i'm a doctor", "i am doctor"],
    success: "medicus sum. aegri fugiunt.",
    hint: "Medicus = doctor.",
    correction: "Answer: I am a doctor."
  },
  {
    kind: "history",
    prompt: [
      "A wall suddenly becomes a border between city and country.",
      "English question: In 1929, the Lateran Treaty established what place as its own nation?",
      "Answer with one English word."
    ],
    answers: ["vatican", "the vatican", "vatican city"],
    success: "Correct.",
    hint: "Where the pope lives.",
    correction: "Answer: Vatican City."
  },
  {
    kind: "vocab",
    prompt: [
      "A pencil rolls toward the edge of the desk.",
      "English question: What is the Latin classroom word for pencil?",
      "Answer with one Latin word."
    ],
    answers: ["graphis"],
    success: "graphis. plumbum salvatum est.",
    hint: "Starts with graph-.",
    correction: "Answer: graphis."
  },
  {
    kind: "history",
    prompt: [
      "A very colorful guard refuses to be boring.",
      "English question: The Vatican military is made up of what guard?",
      "Answer with two English words."
    ],
    answers: ["swiss guard", "the swiss guard"],
    success: "Correct.",
    hint: "They came from Switzerland.",
    correction: "Answer: Swiss Guard."
  },
  {
    kind: "translation",
    prompt: [
      "A stern archive bird says something too fast.",
      "Translate into English: potesne iterum id dicere?",
      "Answer in English."
    ],
    answers: [
      "can you repeat that",
      "could you repeat that",
      "can you say that again",
      "could you say that again"
    ],
    success: "iterum dictum est. avis minus tristis est.",
    hint: "You ask this when you missed what someone said.",
    correction: "Answer: Can you repeat that?"
  },
  {
    kind: "history",
    prompt: [
      "An obelisk watches chariots and martyrs.",
      "English question: About what year A.D. was the apostle Peter crucified near the Vatican obelisk?",
      "Answer with the year."
    ],
    answers: ["65", "65 ad", "65 ce"],
    success: "Correct.",
    hint: "Sixty-five A.D.",
    correction: "Answer: about 65 AD."
  },
  {
    kind: "vocab",
    prompt: [
      "Gibbon points down and says he is tired of walking.",
      "English question: What is the Latin word for foot?",
      "Answer with one Latin word."
    ],
    answers: ["pes"],
    success: "pes. calceus historicus apparet.",
    hint: "Starts with p.",
    correction: "Answer: pes."
  },
  {
    kind: "history",
    prompt: [
      "A sculptor carves sadness into marble.",
      "English question: Which artist made the Pieta in Saint Peter's?",
      "Answer with one name."
    ],
    answers: ["michelangelo"],
    success: "Correct.",
    hint: "Also painted the Sistine ceiling.",
    correction: "Answer: Michelangelo."
  },
  {
    kind: "translation",
    prompt: [
      "A hungry historian points at an apple.",
      "Translate into English: malum edit.",
      "Answer in English."
    ],
    answers: ["he eats an apple", "she eats an apple", "he is eating an apple", "she is eating an apple", "eats an apple"],
    success: "malum edit. pomum deletum est.",
    hint: "Edit = eats.",
    correction: "Answer: He/she eats an apple."
  },
  {
    kind: "history",
    prompt: [
      "The Vatican museum hallway seems to continue forever.",
      "English question: The Vatican museums have enough art to fill about how many miles of hallways?",
      "Answer with the number."
    ],
    answers: ["11", "11 miles", "eleven", "eleven miles"],
    success: "Correct.",
    hint: "More than ten, less than twelve.",
    correction: "Answer: 11 miles."
  },
  {
    kind: "vocab",
    prompt: [
      "The final scroll asks for one last command.",
      "English question: What is the Latin command 'come'?",
      "Answer with one Latin word."
    ],
    answers: ["veni", "venite"],
    success: "veni. finis appropinquat.",
    hint: "Singular command is best; plural accepted.",
    correction: "Answer: veni."
  },
  {
    kind: "history",
    prompt: [
      "A ceiling full of prophets, sibyls, and neck pain appears.",
      "English question: Which chapel ceiling was painted by Michelangelo?",
      "Answer with one name."
    ],
    answers: ["sistine", "sistine chapel", "the sistine chapel"],
    success: "Correct.",
    hint: "Starts with S.",
    correction: "Answer: Sistine Chapel."
  }
];

function say(text = "") {
  output.innerHTML += text + "<br>";
  window.scrollTo(0, document.body.scrollHeight);
}

function promptLine() {
  output.innerHTML += '<span class="cursor">_</span><br>';
  window.scrollTo(0, document.body.scrollHeight);
}

function echoInput(text) {
  output.innerHTML = output.innerHTML.replace(/<span class="cursor">_<\/span><br>$/, "");
  output.innerHTML += text + "<br>";
}

function resetInput() {
  answerBox.value = "";
  answerBox.focus();
}

function normalize(s) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,!?;:()[\]{}"']/g, "")
    .replace(/\s+/g, " ");
}

function addItem(item) {
  if (!inventory.includes(item)) inventory.push(item);
}

function statusLine() {
  say(`YEARS CONSERVED: ${score} / ${MAX_SCORE}`);
  say(`relics: ${inventory.join(", ") || "nihil"}`);
  say("");
}

function startGame() {
  say("============================================================");
  say("        ARCHIVUM ROMAE: GIBBON AND THE 2778 YEARS");
  say("============================================================");
  say("");
  say("You are a kid in a strange library under Rome.");
  say("The lamps are smoking. The shelves are taller than school.");
  say("A mouse in a senator's toga is chewing a very important page.");
  say("");
  say("Then Edward Gibbon appears.");
  say("He is wearing a powdered wig, carrying too many notes, and looking like he has personally been disappointed by the third century.");
  say("");
  say('"Young historian," he says, "I wrote many, many pages about Rome."');
  say('"Sadly, a mouse has eaten several centuries."');
  say("");
  say("Gibbon was an English historian. His huge book, The Decline and Fall of the Roman Empire, tried to explain how Rome went from world-ruling monster to historical mystery.");
  say("He liked big ideas: emperors, barbarians, religion, armies, corruption, taxes, provinces, and sentences long enough to need furniture.");
  say("");
  say("Your mission: help Gibbon restore the history!");
  say("");
  say("Maximum possible score: 2778 years conserved.");
  say("No question numbers will appear. History must feel mysterious.");
  say("");
  say("What is your historian name?");
}

function runInterludeIfNeeded() {
  if (interludes[qIndex]) {
    state = "interlude";
    interludes[qIndex].forEach(line => say(line));
    return true;
  }
  return false;
}

function askQuestion() {
  if (qIndex >= questions.length) {
    winGame();
    return;
  }

  if (runInterludeIfNeeded()) return;

  const q = questions[qIndex];

  say("------------------------------------------------------------");

  if (q.kind === "vocab") {
    say("LATIN VOCAB ARCHIVE");
  } else if (q.kind === "translation") {
    say("TRANSLATION ARCHIVE");
  } else {
    say("ROME HISTORY ARCHIVE");
  }

  say("");

  q.prompt.forEach(line => say(line));
  say("");

  if (qIndex > 0 && qIndex % 9 === 0) {
    say(`Current score: ${score} / ${MAX_SCORE} years conserved.`);
    say("");
  }
}

function correctAnswer() {
  const q = questions[qIndex];
  const basePoints = pointsForQuestion(qIndex);
  const earned = tries === 0 ? basePoints : Math.ceil(basePoints / 2);

  score += earned;
  conserved.push(qIndex + 1);

  if (q.kind === "vocab") addItem(q.answers[0]);

  say(q.success);
  say(`+${earned} years conserved.`);
  say("");

  qIndex++;
  tries = 0;

  if (qIndex === 18 || qIndex === 36 || qIndex === 54) {
    say("Gibbon checks the score tablet and mutters something about civilization.");
    statusLine();
  }

  askQuestion();
}

function wrongAnswer() {
  const q = questions[qIndex];

  if (tries === 0) {
    tries++;
    say(q.kind === "history" ? "No." : "non.");
    say(`Hint: ${q.hint}`);
    say("Try once more.");
    say("");
    q.prompt.forEach(line => say(line));
    say("");
  } else {
    say(q.kind === "history" ? "No." : "minime.");
    say(q.correction);
    say("0 years conserved for this archive.");
    say("");

    qIndex++;
    tries = 0;
    askQuestion();
  }
}

function winGame() {
  say("================================================------------");
  say("                  ARCHIVE COMPLETE");
  say("============================================================");
  say("");
  say("Gibbon removes his spectacles.");
  say("The goat in the toga spits out the last century.");
  say("The mouse Publius Nibblius is sentenced to copy vocabulary by hand.");
  say("Rome is not entirely saved, because no one ever entirely saves Rome.");
  say("But you have conserved what you could.");
  say("");

  say(`FINAL SCORE: ${score} / ${MAX_SCORE} years conserved.`);

  const percent = Math.round((score / MAX_SCORE) * 100);

  if (score === MAX_SCORE) {
    say("TITLE: CONSERVATOR MAXIMUS.");
    say("All 2778 years of Rome are safe. Gibbon faints from scholarly joy.");
  } else if (percent >= 90) {
    say("TITLE: HISTORIAN OF MARBLE.");
    say("Almost all of Rome survives. One aqueduct is missing but morale is high.");
  } else if (percent >= 75) {
    say("TITLE: SENATOR OF ACCEPTABLE MEMORY.");
    say("Rome survives with some suspicious holes.");
  } else if (percent >= 50) {
    say("TITLE: JUNIOR SCRIBE OF THE HALF-BURNED SCROLL.");
    say("Future people know Rome existed, but they are confused about sandals.");
  } else {
    say("TITLE: GOAT ASSISTANT.");
    say("Future people believe Caesar invented traffic cones.");
  }

  say("");
  say(`Correct archives: ${conserved.length} / ${questions.length}`);
  say(`Relics collected: ${inventory.join(", ") || "nihil"}`);
  say("");
  say("ludus finitus est.");
  state = "gameover";
}

function handleInput(raw) {
  const answer = normalize(raw);

  if (state === "name") {
    playerName = raw.trim() || "young historian";
    say("");
    say(`salve, ${playerName}.`);
    say("Gibbon hands you a cracked lamp, a Roman coin, and a suspiciously judgmental feather pen.");
    say("");
    state = "playing";
    askQuestion();
    return;
  }

  if (state === "interlude") {
    state = "playing";
    say("");
    say("Gibbon closes the book with unnecessary force.");
    say("The archive continues.");
    say("");
    qIndex++;
    askQuestion();
    return;
  }

  if (state === "gameover") return;

  const q = questions[qIndex];
  const acceptable = q.answers.map(a => normalize(a));

  if (acceptable.includes(answer)) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
}

answerBox.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (state === "gameover") return;

  const val = answerBox.value;
  echoInput(val);
  answerBox.value = "";

  if (!val.trim() && state !== "interlude") {
    say("type something, o historian.");
    say("");
    promptLine();
    resetInput();
    return;
  }

  handleInput(val);

  if (state !== "gameover") {
    promptLine();
  }

  resetInput();
});

document.body.addEventListener("click", () => answerBox.focus());
window.addEventListener("load", () => answerBox.focus());

startGame();
promptLine();
resetInput();
