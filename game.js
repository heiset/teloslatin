const output = document.getElementById("output");
const answerBox = document.getElementById("answer");

let state = "name";
let playerName = "historian";
let score = 0;
let qIndex = 0;
let tries = 0;
let conserved = [];
let inventory = [];

const MAX_SCORE = 2778;

// 36 questions. First 6 are worth 78, remaining 30 are worth 77.
// 6(78) + 30(77) = 2778.
function pointsForQuestion(i) {
  return i < 6 ? 78 : 77;
}

const questions = [
  {
    type: "vocab",
    title: "THE DOOR OF THE SHE-WOLF",
    prompt: [
      "A bronze wolf blocks the archive.",
      "English question: What is the Latin greeting for one person: hello?",
      "Answer with one Latin word."
    ],
    answers: ["salve"],
    success: "salve. lupa annuit.",
    hint: "It is the singular hello.",
    correction: "Answer: salve."
  },
  {
    type: "history",
    title: "THE LITTLE VALLEY",
    prompt: [
      "A small valley appears between seven cardboard hills.",
      "English question: According to the video, the first Romans mixed and mingled in the valley that became what place?",
      "Answer in English, one or two words."
    ],
    answers: ["forum", "roman forum", "the forum"],
    success: "Correct.",
    hint: "It became Rome's central public space.",
    correction: "Answer: forum."
  },
  {
    type: "vocab",
    title: "THE SENATOR WITH A LAMP",
    prompt: [
      "Senator Lucius Lampadius drops a wax tablet.",
      "English question: How do you say 'I am here' in one Latin word?",
      "Answer with one Latin word."
    ],
    answers: ["adsum"],
    success: "adsum. praesens es.",
    hint: "This is the classroom attendance word.",
    correction: "Answer: adsum."
  },
  {
    type: "history",
    title: "THE YEAR OF NO KINGS",
    prompt: [
      "A king-shaped scarecrow is thrown into the Tiber.",
      "English question: In what year did Rome toss out its king and establish the Republic?",
      "Answer with the year only."
    ],
    answers: ["509", "509 bc", "509 bce"],
    success: "Correct.",
    hint: "It is five hundred nine B.C.",
    correction: "Answer: 509."
  },
  {
    type: "vocab",
    title: "THE CHAIR THAT BREATHES",
    prompt: [
      "A chair whispers: 'Students never sit correctly anymore.'",
      "English question: What is the Latin command 'sit down'?",
      "Answer with one Latin word."
    ],
    answers: ["conside", "considete"],
    success: "conside. sella contenta est.",
    hint: "Singular command is best, but plural is accepted.",
    correction: "Answer: conside."
  },
  {
    type: "history",
    title: "THE TWO BROTHERS",
    prompt: [
      "Two ghost babies argue over city planning.",
      "English question: According to legend, which two brothers founded Rome?",
      "Answer with both names."
    ],
    answers: ["romulus and remus", "romulus remus", "remus and romulus", "remus romulus"],
    success: "Correct.",
    hint: "One brother gives Rome its name.",
    correction: "Answer: Romulus and Remus."
  },
  {
    type: "vocab",
    title: "THE CHALK STORM",
    prompt: [
      "A storm of chalk dust forms the shape of a question mark.",
      "English question: What is the Latin classroom word for board?",
      "Answer with one Latin word."
    ],
    answers: ["tabula"],
    success: "tabula. creta cadit.",
    hint: "It is also the thing you write on.",
    correction: "Answer: tabula."
  },
  {
    type: "history",
    title: "THE UNELECTED MASK",
    prompt: [
      "A marble mask says: 'Republic? Empire? Choose carefully.'",
      "English question: In the video, the Republic was ruled by elected senators. The Empire was ruled by unelected what?",
      "Answer with one English word."
    ],
    answers: ["emperors", "emperor"],
    success: "Correct.",
    hint: "Caesar helped start this change.",
    correction: "Answer: emperors."
  },
  {
    type: "vocab",
    title: "THE BACKPACK OF DESTINY",
    prompt: [
      "A backpack crawls across the floor like a crab.",
      "English question: What is one Latin word for backpack?",
      "Answer with one Latin word."
    ],
    answers: ["bulga", "saccus"],
    success: "bulga. sarcina viva quiescit.",
    hint: "Either classroom word is accepted.",
    correction: "Answer: bulga or saccus."
  },
  {
    type: "history",
    title: "THE MONTH OF CAESAR",
    prompt: [
      "Julius Caesar points at a calendar with a sword.",
      "English question: What month was named in Caesar's honor?",
      "Answer with one English word."
    ],
    answers: ["july"],
    success: "Correct.",
    hint: "It comes after June.",
    correction: "Answer: July."
  },
  {
    type: "vocab",
    title: "THE WINDOW WITH EYES",
    prompt: [
      "A window blinks. The historian Piso is worried.",
      "English question: What is the Latin classroom word for window?",
      "Answer with one Latin word."
    ],
    answers: ["fenestra"],
    success: "fenestra. oculus parietis aperitur.",
    hint: "It begins with f.",
    correction: "Answer: fenestra."
  },
  {
    type: "history",
    title: "THE BURNT SPOT",
    prompt: [
      "A tiny flame appears in the Forum.",
      "English question: In what year B.C. was Julius Caesar assassinated?",
      "Answer with the year only."
    ],
    answers: ["44", "44 bc", "44 bce"],
    success: "Correct.",
    hint: "Forty-four B.C.",
    correction: "Answer: 44."
  },
  {
    type: "vocab",
    title: "THE PEN OF DOOM",
    prompt: [
      "A pen signs a treaty with a mouse.",
      "English question: What is the Latin classroom word for pen?",
      "Answer with one Latin word."
    ],
    answers: ["calamus"],
    success: "calamus. atramentum ridet.",
    hint: "It is not graphis.",
    correction: "Answer: calamus."
  },
  {
    type: "history",
    title: "THE SACRED STREET",
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
    type: "vocab",
    title: "THE TINY NURSE SHRINE",
    prompt: [
      "A small shrine asks for school phrases.",
      "English question: How do you say 'I do not understand' in Latin?",
      "Answer with the short Latin phrase."
    ],
    answers: ["non intellego", "non intellegō"],
    success: "non intellego. tamen procedis.",
    hint: "Two words: non + I understand.",
    correction: "Answer: non intellego."
  },
  {
    type: "history",
    title: "THE PUBLIC RELATIONS ARCH",
    prompt: [
      "An arch coughs up a pamphlet titled IMPERIAL SPIN.",
      "English question: The video says triumphal arches functioned as what kind of tools?",
      "Answer with two or three English words."
    ],
    answers: ["public relations", "public relations tools", "pr", "pr tools"],
    success: "Correct.",
    hint: "Modern companies also worry about this.",
    correction: "Answer: public relations."
  },
  {
    type: "vocab",
    title: "THE MOUTH IN THE WALL",
    prompt: [
      "A mouth appears in the wall and refuses to be normal.",
      "English question: What is the Latin word for mouth?",
      "Answer with one Latin word."
    ],
    answers: ["os"],
    success: "os. paries loquitur.",
    hint: "Two letters.",
    correction: "Answer: os."
  },
  {
    type: "history",
    title: "THE STADIUM OF GORE",
    prompt: [
      "The sand under your feet whispers about gladiators.",
      "English question: The Colosseum held about how many spectators?",
      "Answer with the number."
    ],
    answers: ["50000", "50,000", "fifty thousand"],
    success: "Correct.",
    hint: "Five followed by four zeroes.",
    correction: "Answer: 50,000."
  },
  {
    type: "vocab",
    title: "THE COMMANDING GHOST",
    prompt: [
      "Ghost General Marcellus points to the door.",
      "English question: What is the Latin command 'enter'?",
      "Answer with one Latin word."
    ],
    answers: ["intra", "intrate"],
    success: "intra. ianua paret.",
    hint: "Singular command is best, but plural is accepted.",
    correction: "Answer: intra."
  },
  {
    type: "history",
    title: "THE ANIMAL OPENING CEREMONY",
    prompt: [
      "A very nervous ostrich hands you a ticket.",
      "English question: At the Colosseum's grand opening, about how many animals were slaughtered?",
      "Answer with the number."
    ],
    answers: ["5000", "5,000", "five thousand"],
    success: "Correct.",
    hint: "Five thousand.",
    correction: "Answer: 5,000."
  },
  {
    type: "vocab",
    title: "THE AQUA ROBOT",
    prompt: [
      "A thirsty robot made of aqueduct stones rolls toward you.",
      "English question: What is the Latin word for water as something you drink?",
      "Answer with one Latin word."
    ],
    answers: ["aquam", "aqua"],
    success: "aquam. robotus bibit.",
    hint: "In the class food list, it appears as aquam.",
    correction: "Answer: aquam."
  },
  {
    type: "history",
    title: "THE LONGEST SCROLL",
    prompt: [
      "A column spirals upward like a history noodle.",
      "English question: Which emperor's column is described as a long scroll of continuous narration?",
      "Answer with one name."
    ],
    answers: ["trajan", "trajan's", "trajanus"],
    success: "Correct.",
    hint: "His empire reached its greatest size.",
    correction: "Answer: Trajan."
  },
  {
    type: "vocab",
    title: "THE CRUSTULUM TRIAL",
    prompt: [
      "Judge Crustulus Maximus demands dessert law.",
      "English question: What is the Latin classroom word for cookie?",
      "Answer with one Latin word."
    ],
    answers: ["crustulum", "crustula"],
    success: "crustulum. iudex placatus est.",
    hint: "It starts with crust-.",
    correction: "Answer: crustulum."
  },
  {
    type: "history",
    title: "OUR SEA",
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
    type: "vocab",
    title: "THE BOOKSHELF SENATE",
    prompt: [
      "Tiny senators hold a meeting on a bookshelf.",
      "English question: What is the Latin classroom word for bookshelf?",
      "Answer with one Latin word."
    ],
    answers: ["pegma"],
    success: "pegma. senatores parvi sedent.",
    hint: "It starts with p.",
    correction: "Answer: pegma."
  },
  {
    type: "history",
    title: "THE PEACE ALTAR",
    prompt: [
      "An altar hums quietly, trying very hard to be stable.",
      "English question: What is the Latin name for the Roman Peace?",
      "Answer with two words."
    ],
    answers: ["pax romana", "roman peace"],
    success: "Correct.",
    hint: "It means Roman Peace.",
    correction: "Answer: Pax Romana."
  },
  {
    type: "vocab",
    title: "THE RUNNING STATUE",
    prompt: [
      "A statue suddenly starts jogging in sandals.",
      "English question: What is the Latin command 'run'?",
      "Answer with one Latin word."
    ],
    answers: ["curre", "currite"],
    success: "curre. statua sudat.",
    hint: "Singular command is best, but plural is accepted.",
    correction: "Answer: curre."
  },
  {
    type: "history",
    title: "THE PERFECT CIRCLE",
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
    type: "vocab",
    title: "THE NOISELESS PRIEST",
    prompt: [
      "A priest of silence taps the desk.",
      "English question: What Latin phrase means 'keep silence'?",
      "Answer with the Latin phrase."
    ],
    answers: ["favete linguis", "favete linguae"],
    success: "favete linguis. silentium triumphat.",
    hint: "Two words. Starts with favete.",
    correction: "Answer: favete linguis."
  },
  {
    type: "history",
    title: "THE EYE OF THE PANTHEON",
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
    type: "vocab",
    title: "THE LEFT-RIGHT DEMON",
    prompt: [
      "A demon with two sandals asks for directions.",
      "English question: What is the Latin word for right, as in 'to the right'?",
      "Answer with one Latin word."
    ],
    answers: ["dextram", "dextra"],
    success: "dextram. daemon recte ambulat.",
    hint: "Ad laevam / ad dextram.",
    correction: "Answer: dextram."
  },
  {
    type: "history",
    title: "THE ROAD TO THE EAST",
    prompt: [
      "A road of stones stretches out like a command.",
      "English question: What ancient road was Rome's gateway to the east?",
      "Answer with two English words."
    ],
    answers: ["appian way", "the appian way", "via appia"],
    success: "Correct.",
    hint: "It starts with A.",
    correction: "Answer: Appian Way."
  },
  {
    type: "vocab",
    title: "THE FINAL CLASSROOM OBJECT",
    prompt: [
      "Archivist Claudia Quarta holds up a book.",
      "English question: What is the Latin classroom word for book?",
      "Answer with one Latin word."
    ],
    answers: ["liber"],
    success: "liber. memoria servatur.",
    hint: "It begins with lib-.",
    correction: "Answer: liber."
  },
  {
    type: "history",
    title: "THE UNDERGROUND CITY",
    prompt: [
      "A ladder descends into cool tunnels full of old names.",
      "English question: The video says the catacombs were not hideouts. They were budget underground what?",
      "Answer with one English word."
    ],
    answers: ["cemeteries", "cemetery"],
    success: "Correct.",
    hint: "Places for burying the dead.",
    correction: "Answer: cemeteries."
  },
  {
    type: "vocab",
    title: "THE LAST GOODBYE",
    prompt: [
      "The archive doors begin to close. A goat in a tiny toga waves.",
      "English question: What is the Latin goodbye for one person?",
      "Answer with one Latin word."
    ],
    answers: ["vale"],
    success: "vale. capra lacrimat.",
    hint: "Singular goodbye.",
    correction: "Answer: vale."
  },
  {
    type: "history",
    title: "THE CHRISTIAN EMPEROR",
    prompt: [
      "The final scroll glows with a cross-shaped error message.",
      "English question: Which emperor legalized Christianity after taking power in 312?",
      "Answer with one name."
    ],
    answers: ["constantine", "constantinus"],
    success: "Correct.",
    hint: "His mother was Helena.",
    correction: "Answer: Constantine."
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
  say("        ARCHIVUM ROMAE: THE 2778-YEAR MEMORY CRISIS");
  say("============================================================");
  say("");
  say("You are a junior historian in the basement archive of Rome.");
  say("A goat in a toga has chewed holes in history.");
  say("If you answer well, years of Roman memory are conserved.");
  say("If you answer poorly, future people will think the Pantheon was a pizza oven.");
  say("");
  say("Maximum possible score: 2778 years conserved.");
  say("Questions alternate: Latin vocab, Rick Steves Rome history, Latin vocab, history...");
  say("");
  say("What is your historian name?");
}

function askQuestion() {
  if (qIndex >= questions.length) {
    winGame();
    return;
  }

  const q = questions[qIndex];

  say("------------------------------------------------------------");
  say(`ARCHIVE ${qIndex + 1} / ${questions.length}: ${q.title}`);
  say(`category: ${q.type === "vocab" ? "LATIN VOCAB" : "ROME HISTORY"}`);
  say("");

  q.prompt.forEach(line => say(line));
  say("");

  if ((qIndex + 1) % 6 === 0) {
    say(`Current score before this question: ${score} / ${MAX_SCORE}`);
    say("");
  }
}

function correctAnswer() {
  const q = questions[qIndex];
  const basePoints = pointsForQuestion(qIndex);
  const earned = tries === 0 ? basePoints : Math.ceil(basePoints / 2);

  score += earned;
  conserved.push(qIndex + 1);

  if (q.type === "vocab") {
    addItem(q.answers[0]);
  }

  say(q.success);
  say(`+${earned} years conserved.`);
  say("");

  qIndex++;
  tries = 0;

  if (qIndex === 12 || qIndex === 24 || qIndex === 30) {
    say("A Roman clerk with ink on his elbows checks the score tablet.");
    statusLine();
  }

  askQuestion();
}

function wrongAnswer() {
  const q = questions[qIndex];

  if (tries === 0) {
    tries++;
    say(q.type === "vocab" ? "non." : "No.");
    say(`Hint: ${q.hint}`);
    say("Try once more.");
    say("");
    askShortRetry();
  } else {
    say(q.type === "vocab" ? "minime." : "No.");
    say(q.correction);
    say("0 years conserved for this archive.");
    say("");

    qIndex++;
    tries = 0;
    askQuestion();
  }
}

function askShortRetry() {
  const q = questions[qIndex];
  say(`ARCHIVE ${qIndex + 1}, second attempt: ${q.title}`);
  say(q.prompt[q.prompt.length - 1]);
  say("");
}

function winGame() {
  say("============================================================");
  say("                  ARCHIVE COMPLETE");
  say("============================================================");
  say("");
  say("The goat in the toga stops chewing history.");
  say("Romulus and Remus nod from a suspiciously damp cloud.");
  say("The Pantheon is not remembered as a pizza oven.");
  say("Marcus Aurelius gives you one silent thumbs-up.");
  say("");

  say(`FINAL SCORE: ${score} / ${MAX_SCORE} years conserved.`);

  const percent = Math.round((score / MAX_SCORE) * 100);

  if (score === MAX_SCORE) {
    say("TITLE: CONSERVATOR MAXIMUS.");
    say("All 2778 years of Rome are safe.");
  } else if (percent >= 90) {
    say("TITLE: HISTORIAN OF MARBLE.");
    say("Almost all of Rome survives.");
  } else if (percent >= 75) {
    say("TITLE: SENATOR OF ACCEPTABLE MEMORY.");
    say("Rome survives with some suspicious holes.");
  } else if (percent >= 50) {
    say("TITLE: JUNIOR SCRIBE OF THE HALF-BURNED SCROLL.");
    say("Future people know Rome existed, but they are confused.");
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
    playerName = raw.trim() || "historian";
    say("");
    say(`salve, ${playerName}.`);
    say("Archivist Fabia Pullaria hands you a lamp, a stylus, and one emotionally unstable olive.");
    say("");
    state = "playing";
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

  if (!val.trim()) {
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
