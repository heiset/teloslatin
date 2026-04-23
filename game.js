const output = document.getElementById("output");
const answerBox = document.getElementById("answer");

let state = "name";

function say(text = "") {
  output.innerHTML += text + "<br>";
  window.scrollTo(0, document.body.scrollHeight);
}

function promptLine() {
  output.innerHTML += '<span class="cursor">_</span><br>';
  window.scrollTo(0, document.body.scrollHeight);
}

function clearPrompt() {
  output.innerHTML = output.innerHTML.replace(/<span class="cursor">_<\/span><br>$/, "");
}

function echoInput(text) {
  clearPrompt();
  output.innerHTML += text + "<br>";
}

function resetInput() {
  answerBox.value = "";
  answerBox.focus();
}

function handleState(answer) {
  if (state === "name") {
    say("salve, " + answer + "!");
    say("bene venit ad cavernam lunae.");
    state = "done";
    return;
  }

  if (state === "done") {
    say("ludus parvus finitus est.");
    state = "gameover";
  }
}

function startGame() {
  say("CAVERNA LUNAE");
  say("");
  say("quid tibi nomen est?");
}

answerBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (state === "gameover") return;

    const val = answerBox.value.trim().toLowerCase();
    echoInput(val);
    answerBox.value = "";

    if (!val) {
      say("scribe aliquid.");
      say("");
      promptLine();
      resetInput();
      return;
    }

    handleState(val);

    if (state !== "gameover") {
      promptLine();
    }

    resetInput();
  }
});

document.body.addEventListener("click", () => answerBox.focus());
window.addEventListener("load", () => answerBox.focus());

startGame();
promptLine();
resetInput();
