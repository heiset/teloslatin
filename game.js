const output = document.getElementById("output");
const answerBox = document.getElementById("answer");
const submitBtn = document.getElementById("submit");

let state = "name";
let lives = 3;
let score = 0;
let playerName = "discipule";

function say(text = "") {
  output.textContent += text + "\n";
  output.scrollTop = output.scrollHeight;
}

function resetInput() {
  answerBox.value = "";
  answerBox.focus();
}

function loseLife() {
  lives--;
  if (lives > 0) {
    say(`male respondes. unam vitam perdis. vitae reliquae: ${lives}`);
    say("");
    return false;
  } else {
    say("male respondes. nullae vitae restant.");
    say("ludus finitus est.");
    state = "gameover";
    return true;
  }
}

function startGame() {
  say("============================================================");
  say("                    CAVERNA LUNAE");
  say("============================================================");
  say("salve! (hello!)");
  say("haec est caverna lunae. (this is the cave of the moon.)");
  say("si bene respondes, vincis. (if you answer well, you win.)");
  say("audi. responde. elige. scribe.");
  say("");
  say("quid tibi nomen est? (what is your name?)");
}

function nextPrompt() {
  if (state === "room1") {
    say("tres globuli sunt. (there are three buttons.)");
    say("elige: luna, caseus, fiscus");
  } else if (state === "room2") {
    say('quid est "vale"? (what is "vale"?)');
  } else if (state === "room3") {
    say('quid est "mensa"? (what is "mensa"?)');
  } else if (state === "room4") {
    say('quid significat "surge"? (what does "surge" mean?)');
  } else if (state === "room5") {
    say('quid significat "curre"? (what does "curre" mean?)');
  } else if (state === "room6") {
    say('quid significat "ambula"? (what does "ambula" mean?)');
  } else if (state === "room7") {
    say('quid est verbum latinum pro "what"?');
  } else if (state === "room8") {
    say('quid est "calamus"?');
  } else if (state === "room9") {
    say('quid est "liber"?');
  } else if (state === "room10") {
    say('quid est "sella"?');
  } else if (state === "room11") {
    say('quid est "os"?');
  } else if (state === "room12") {
    say('quid significat "veni"?');
  } else if (state === "room13") {
    say('quid significat "exi"?');
  } else if (state === "room14") {
    say('quid est "ita"?');
  } else if (state === "room15") {
    say('quid est "non"?');
  } else if (state === "room16") {
    say('quid est "audi"?');
  } else if (state === "room17") {
    say('quid est "hic"?');
  } else if (state === "win") {
    say("ianua ultima aperitur.");
    say("donum capis.");
    say("vincis!");
    say(`puncta: ${score}`);
    say(`vitae: ${lives}`);
    state = "gameover";
  }
}

function handleAnswer(raw) {
  const answer = raw.trim().toLowerCase();

  if (state === "name") {
    if (answer) playerName = answer;
    say("");
    say(`salve, ${playerName}!`);
    say("venis ad ostium argenteum.");
    say("ante ostium est capra.");
    say('capra dicit: "intra!"');
    say("");
    state = "room1";
    nextPrompt();
    return;
  }

  const checks = {
    room1: {
      ok: ["luna"],
      good: "bene eligis. ostium aperitur.",
      bad: "male eligis. nihil fit.",
      next: "room2"
    },
    room2: {
      ok: ["goodbye", "bye"],
      good: "ita. speculum gaudet.",
      bad: 'auxilium: anglice responde.',
      next: "room3"
    },
    room3: {
      ok: ["table", "desk"],
      good: "bene. ad mensam venis.",
      bad: "auxilium: in schola est.",
      next: "room4"
    },
    room4: {
      ok: ["stand", "stand up"],
      good: "recte. stas.",
      bad: "auxilium: non sede.",
      next: "room5"
    },
    room5: {
      ok: ["run"],
      good: "recte. curris.",
      bad: "auxilium: celeriter movearis.",
      next: "room6"
    },
    room6: {
      ok: ["walk"],
      good: "recte. ambulas.",
      bad: "auxilium: tardius quam currere.",
      next: "room7"
    },
    room7: {
      ok: ["quid"],
      good: "ita vero. ianua aperitur.",
      bad: "auxilium: verbum breve est.",
      next: "room8"
    },
    room8: {
      ok: ["pen"],
      good: "bene respondes.",
      bad: "auxilium: cum eo scribis.",
      next: "room9"
    },
    room9: {
      ok: ["book"],
      good: "bene respondes.",
      bad: "auxilium: legis ex eo.",
      next: "room10"
    },
    room10: {
      ok: ["chair"],
      good: "bene respondes.",
      bad: "auxilium: in ea consides.",
      next: "room11"
    },
    room11: {
      ok: ["mouth"],
      good: "recte. os aperis.",
      bad: "auxilium: in facie est.",
      next: "room12"
    },
    room12: {
      ok: ["come"],
      good: "recte. venis.",
      bad: "auxilium: non abis.",
      next: "room13"
    },
    room13: {
      ok: ["go out", "exit", "leave"],
      good: "recte. exis.",
      bad: "auxilium: foras is.",
      next: "room14"
    },
    room14: {
      ok: ["yes"],
      good: "bene. luna ridet.",
      bad: "auxilium: est verbum breve affirmandi.",
      next: "room15"
    },
    room15: {
      ok: ["no"],
      good: "bene. luna iterum ridet.",
      bad: "auxilium: negatio est.",
      next: "room16"
    },
    room16: {
      ok: ["listen", "hear"],
      good: "recte. audis.",
      bad: "auxilium: magister hoc saepe dicit.",
      next: "room17"
    },
    room17: {
      ok: ["here"],
      good: "ita. hic es.",
      bad: "auxilium: non illic.",
      next: "win"
    }
  };

  const check = checks[state];
  if (!check) return;

  if (check.ok.includes(answer)) {
    say(check.good);
    say("");
    score += 10;
    state = check.next;
    nextPrompt();
  } else {
    say(check.bad);
    say("");
    if (!loseLife()) {
      nextPrompt();
    }
  }
}

submitBtn.addEventListener("click", () => {
  if (state === "gameover") return;
  handleAnswer(answerBox.value);
  resetInput();
});

answerBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

startGame();
resetInput();
