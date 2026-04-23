const output = document.getElementById("output");
const answerBox = document.getElementById("answer");
const submitBtn = document.getElementById("submit");

let state = "boot";
let lives = 3;
let score = 0;
let playerName = "discipule";
let inventory = [];
let flags = {
  habesClavem: false,
  habesCrustulum: false,
  habesCalamum: false,
  viditLunam: false,
  dixitVale: false,
  sacerdosPlacatus: false
};

function say(text = "") {
  output.textContent += text + "\n";
  window.scrollTo(0, document.body.scrollHeight);
}

function echoInput(text) {
  output.textContent += "> " + text + "\n";
}

function resetInput() {
  answerBox.value = "";
  answerBox.focus();
}

function normalize(s) {
  return s.trim().toLowerCase();
}

function addItem(item) {
  if (!inventory.includes(item)) inventory.push(item);
}

function statusLine() {
  say(`vitae: ${lives} | puncta: ${score} | res: ${inventory.join(", ") || "nihil"}`);
  say("");
}

function loseLife() {
  lives--;
  if (lives > 0) {
    say("male.");
    say("cancer ambulat per parietem et te mordet.");
    say(`vitae reliquae: ${lives}`);
    say("");
    return false;
  } else {
    say("male.");
    say("sacerdotes glitchiani te in murum digitalem trudunt.");
    say("ludus finitus est.");
    state = "gameover";
    return true;
  }
}

function succeed(text, points = 10) {
  say(text);
  score += points;
  say("");
}

function fail(text) {
  say(text);
  say("");
  if (!loseLife()) {
    promptState();
  }
}

function winGame() {
  say("ianua ultima tremit.");
  say("luna ipsa descendit.");
  say("capra gerens ocularia nigra iterum apparet.");
  say("sacerdotes glitchiani genua flectunt.");
  say("crustulum infinitum et coupon prandii capis.");
  say("");
  say("vincis.");
  statusLine();
  state = "gameover";
}

function startGame() {
  say("============================================================");
  say("               CAVERNA LUNAE GLITCHIANA");
  say("============================================================");
  say("nox est.");
  say("sub schola ianua argentea apparet.");
  say("capra cum oculariis nigris dicit: salve.");
  say("");
  say("quid tibi nomen est?");
  state = "name";
}

function promptState() {
  switch (state) {
    case "room1":
      say("tres globuli super mensam sunt.");
      say("scribe: luna / caseus / fiscus");
      break;

    case "room2":
      say("speculum nigrum susurrat.");
      say("scribe verbum valedictionis.");
      break;

    case "room3":
      say("vox dicit: surge.");
      say("quid facis?");
      break;

    case "room4":
      say("alia vox clamat: curre.");
      say("quid facis?");
      break;

    case "room5":
      say("post currendum larva placida dicit: conside.");
      say("quid facis?");
      break;

    case "room6":
      say("super mensa sunt liber, calamus, cummi.");
      say("quid capis?");
      break;

    case "room7":
      say("in pariete scriptum est: quid est hoc?");
      say("scribe verbum interrogativum.");
      break;

    case "room8":
      say("ostium aeneum dicit: da mihi verbum pro yes.");
      break;

    case "room9":
      say("ostium iterum dicit: da mihi verbum pro no.");
      break;

    case "room10":
      say("robotus ferrivector stat in flumine pensi domestici.");
      say("sitis est.");
      say("quid vis?");
      break;

    case "room11":
      say("in tenebris vox dicit: aperi os.");
      say("scribe partem corporis.");
      break;

    case "room12":
      say("soccus gigas rotans dicit: veni huc.");
      say("quid facis?");
      break;

    case "room13":
      say("eodem momento alius soccus clamat: exi hinc.");
      say("quid facis?");
      break;

    case "room14":
      say("avis compta cravataque te intuetur.");
      say("super sella sunt panis, lac, crustulum.");
      say("quid vis edere?");
      break;

    case "room15":
      say("luna picta quaerit:");
      say("ubi es?");
      say("scribe uno verbo.");
      break;

    case "room16":
      say("tabula magna ante te est.");
      say("vox dicit: scribe in tabula.");
      say("quid scribis?");
      break;

    case "room17":
      say("ianua ossibus facta petit nomen rei scholasticae.");
      say("in ea discipulus consedit.");
      say("quid est?");
      break;

    case "room18":
      say("in cubiculo vento pleno fenestra tremit.");
      say("vox dicit: aperi ____.");
      say("scribe rem.");
      break;

    case "room19":
      say("fenestra nunc aperta est.");
      say("vox dicit: claude ____.");
      say("scribe eandem rem.");
      break;

    case "room20":
      say("sacerdos glitchianus ad tabulam scriptoria venit.");
      say("is dicit: audi.");
      say("quid facis?");
      break;

    case "room21":
      say("idem sacerdos dicit: loquere latine.");
      say("quid facis?");
      break;

    case "room22":
      say("in solo sunt duae res: bulga et capsula.");
      say("quid est backpack?");
      say("scribe uno verbo.");
      break;

    case "room23":
      say("per parietem ambulat umbra.");
      say("quid vides?");
      say("scribe uno verbo.");
      break;

    case "room24":
      say("magnum ostium geographicum apparet.");
      say("sacerdos quaerit: quae patria est italia?");
      say("scribe latine.");
      break;

    case "room25":
      say("sacerdos iterum quaerit: quae patria est graecia?");
      say("scribe latine.");
      break;

    case "room26":
      say("nunc sacerdos vult aquam.");
      say("quid vult bibere?");
      say("scribe uno verbo.");
      break;

    case "room27":
      say("deinde vult panem.");
      say("quid vult edere?");
      say("scribe uno verbo.");
      break;

    case "room28":
      say("spectrum scholasticum clamat: quot bulgae?");
      say("respondere non potes numero anglico.");
      say("scribe numerum latinum pro three.");
      break;

    case "room29":
      say("capra redit.");
      say("dicit: quomodo dicis hello pluribus?");
      say("scribe uno verbo.");
      break;

    case "room30":
      say("in medio conclavis sacerdos glitchianus sedet super pegma.");
      say("si vis transire, dic verbo uno quid faciat discipulus bonus.");
      say("options latent in schola.");
      break;

    case "room31":
      say("sacerdos murmurat: quid est here?");
      say("scribe uno verbo latine.");
      break;

    case "room32":
      say("murmurat iterum: quid est there?");
      say("scribe uno verbo latine.");
      break;

    case "room33":
      say("super caput tuum luna falsa dicit: quid est book?");
      say("scribe uno verbo.");
      break;

    case "room34":
      say("in extrema ianua ignis viridis ardet.");
      say("ianua poscit verbum ultimum.");
      say("scribe imperativum pro come.");
      break;

    case "boss1":
      say("sacerdotes glitchiani surgunt.");
      say("maximus eorum dicit: quid est your name?");
      say("sed nolo sententiam longam.");
      say("scribe verbum solum quo me vocant.");
      break;

    case "boss2":
      say("sacerdos secundus dicit: quid est i am here?");
      say("scribe uno verbo.");
      break;

    case "boss3":
      say("sacerdos tertius dicit: quid facis si magister dicit revertere?");
      say("scribe uno verbo.");
      break;

    case "boss4":
      say("omnes simul clamant: vale an salve?");
      say("si vis finem, elige recte.");
      break;
  }
}

function handleState(answer) {
  switch (state) {
    case "name":
      if (answer) playerName = answer;
      say("");
      say(`salve, ${playerName}.`);
      say("capra ridet.");
      say('"noli timere," dicit, "sed fortasse time."');
      say("");
      state = "room1";
      promptState();
      return;

    case "room1":
      if (answer === "luna") {
        flags.viditLunam = true;
        succeed("globulus lunae tremit. scala apparet.", 5);
        state = "room2";
        promptState();
      } else {
        fail("nihil bene fit.");
      }
      return;

    case "room2":
      if (answer === "vale" || answer === "valete") {
        flags.dixitVale = true;
        succeed("speculum aperitur sicut aqua nigra.");
        state = "room3";
        promptState();
      } else {
        fail("speculum irascitur.");
      }
      return;

    case "room3":
      if (answer === "surgo") {
        succeed("recte. surgis.");
        state = "room4";
        promptState();
      } else {
        fail("non surgis.");
      }
      return;

    case "room4":
      if (answer === "curro") {
        succeed("recte. curris. pavimentum ululat.");
        state = "room5";
        promptState();
      } else {
        fail("tardus es.");
      }
      return;

    case "room5":
      if (answer === "consido") {
        succeed("recte. consides. sella tamen respirat.");
        state = "room6";
        promptState();
      } else {
        fail("sella te odit.");
      }
      return;

    case "room6":
      if (answer === "calamum" || answer === "calamus") {
        flags.habesCalamum = true;
        addItem("calamus");
        succeed("calamum capis. bene.", 12);
        state = "room7";
        promptState();
      } else {
        fail("res falsa est.");
      }
      return;

    case "room7":
      if (answer === "quid") {
        succeed("verbum rectum est. paries finditur.");
        state = "room8";
        promptState();
      } else {
        fail("paries manet.");
      }
      return;

    case "room8":
      if (answer === "ita") {
        succeed("ostium inclinatur.");
        state = "room9";
        promptState();
      } else {
        fail("ostium negat.");
      }
      return;

    case "room9":
      if (answer === "non" || answer === "minime") {
        succeed("ostium tandem aperitur.");
        state = "room10";
        promptState();
      } else {
        fail("ostium nimis positivum est.");
      }
      return;

    case "room10":
      if (answer === "aquam") {
        addItem("aqua");
        succeed("robotus tibi poculum aquae dat et transitum concedit.");
        state = "room11";
        promptState();
      } else {
        fail("robotus caput ferreum quatit.");
      }
      return;

    case "room11":
      if (answer === "os") {
        succeed("recte. tenebrae te non comedunt.");
        state = "room12";
        promptState();
      } else {
        fail("tenebrae os tuum quaerunt.");
      }
      return;

    case "room12":
      if (answer === "venio") {
        succeed("soccus laetus salit.");
        state = "room13";
        promptState();
      } else {
        fail("soccus lacrimat.");
      }
      return;

    case "room13":
      if (answer === "exeo" || answer === "abeo") {
        succeed("optime. soccus alter evanescit.");
        state = "room14";
        promptState();
      } else {
        fail("soccus adhuc clamat.");
      }
      return;

    case "room14":
      if (answer === "crustulum") {
        flags.habesCrustulum = true;
        addItem("crustulum");
        succeed("avis graviter annuit. crustulum tibi est.");
        state = "room15";
        promptState();
      } else {
        fail("avis te iudicat.");
      }
      return;

    case "room15":
      if (answer === "hic") {
        succeed("luna picta semel palpebrat.");
        state = "room16";
        promptState();
      } else {
        fail("luna te non invenit.");
      }
      return;

    case "room16":
      if (answer === "domum") {
        succeed("tabula gaudet quod domum scribis.");
        state = "room17";
        promptState();
      } else {
        fail("creta sola gemit.");
      }
      return;

    case "room17":
      if (answer === "sella") {
        succeed("ossa recedunt.");
        state = "room18";
        promptState();
      } else {
        fail("ossa manent.");
      }
      return;

    case "room18":
      if (answer === "fenestram" || answer === "fenestra") {
        succeed("ventus intrat et cantat.");
        state = "room19";
        promptState();
      } else {
        fail("ventus te irridet.");
      }
      return;

    case "room19":
      if (answer === "fenestram" || answer === "fenestra") {
        succeed("silentium fit subito.");
        state = "room20";
        promptState();
      } else {
        fail("fenestra tremit magis.");
      }
      return;

    case "room20":
      if (answer === "audio") {
        succeed("sacerdos dicit: tandem.");
        state = "room21";
        promptState();
      } else {
        fail("sacerdos putat te surdum esse.");
      }
      return;

    case "room21":
      if (answer === "loquor") {
        succeed("sacerdos parum ridet.");
        state = "room22";
        promptState();
      } else {
        fail("barbarus videris.");
      }
      return;

    case "room22":
      if (answer === "bulga" || answer === "saccus") {
        succeed("recte. bulga aperitur et fumus exit.");
        state = "room23";
        promptState();
      } else {
        fail("capsula mordet.");
      }
      return;

    case "room23":
      if (answer === "umbram" || answer === "umbra") {
        succeed("umbra te sinit transire.");
        state = "room24";
        promptState();
      } else {
        fail("umbra crescit.");
      }
      return;

    case "room24":
      if (answer === "italia") {
        succeed("terra sub pedibus tuis paulum cantat.");
        state = "room25";
        promptState();
      } else {
        fail("mappa rugit.");
      }
      return;

    case "room25":
      if (answer === "graecia") {
        succeed("mappa iterum quiescit.");
        state = "room26";
        promptState();
      } else {
        fail("litterae in muro ruunt.");
      }
      return;

    case "room26":
      if (answer === "aquam") {
        succeed("sacerdos aquam bibit sine facie.");
        state = "room27";
        promptState();
      } else {
        fail("sacerdos sitit adhuc.");
      }
      return;

    case "room27":
      if (answer === "panem") {
        succeed("sacerdos panem edit et minus terribilis fit.");
        state = "room28";
        promptState();
      } else {
        fail("venter sacerdotis fremit.");
      }
      return;

    case "room28":
      if (answer === "tres") {
        succeed("numerus rectus est.");
        state = "room29";
        promptState();
      } else {
        fail("numeri te deserunt.");
      }
      return;

    case "room29":
      if (answer === "salvete") {
        succeed("capra inclinat caput. satis bene.");
        state = "room30";
        promptState();
      } else {
        fail("capra offenditur.");
      }
      return;

    case "room30":
      if (answer === "audit" || answer === "scribit" || answer === "legit") {
        succeed("sacerdos dicit: fortasse discipulus bonus es.", 15);
        state = "room31";
        promptState();
      } else {
        fail("sacerdos dicit: minime.");
      }
      return;

    case "room31":
      if (answer === "hic") {
        succeed("primum verbum transit.");
        state = "room32";
        promptState();
      } else {
        fail("verbum cadit.");
      }
      return;

    case "room32":
      if (answer === "illic") {
        succeed("secundum verbum transit.");
        state = "room33";
        promptState();
      } else {
        fail("longinquitas clausa est.");
      }
      return;

    case "room33":
      if (answer === "liber") {
        succeed("luna falsa frangitur. vera luna apparet.");
        state = "room34";
        promptState();
      } else {
        fail("luna falsa mendax manet.");
      }
      return;

    case "room34":
      if (answer === "veni") {
        succeed("ianua ultima aperitur.");
        state = "boss1";
        promptState();
      } else {
        fail("ianua te spernit.");
      }
      return;

    case "boss1":
      if (answer === "nomen") {
        succeed("primus sacerdos tacet.");
        state = "boss2";
        promptState();
      } else {
        fail("primus sacerdos ridet metallice.");
      }
      return;

    case "boss2":
      if (answer === "adsum") {
        succeed("secundus sacerdos retro abit.");
        state = "boss3";
        promptState();
      } else {
        fail("secundus sacerdos negat praesentiam tuam.");
      }
      return;

    case "boss3":
      if (answer === "revertor") {
        succeed("tertius sacerdos evanescit in glitch.", 20);
        state = "boss4";
        promptState();
      } else {
        fail("tertius sacerdos manet.");
      }
      return;

    case "boss4":
      if (answer === "vale") {
        flags.sacerdosPlacatus = true;
        succeed("omnes sacerdotes respondent: vale.", 25);
        winGame();
      } else {
        fail("finis nondum venit.");
      }
      return;
  }
}

submitBtn.addEventListener("click", () => {const output = document.getElementById("output");
const answerBox = document.getElementById("answer");

let state = "boot";
let lives = 3;
let score = 0;
let playerName = "discipule";
let inventory = [];
let flags = {
  habesClavem: false,
  habesCrustulum: false,
  habesCalamum: false,
  viditLunam: false,
  dixitVale: false,
  sacerdosPlacatus: false
};

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
  return s.trim().toLowerCase();
}

function addItem(item) {
  if (!inventory.includes(item)) inventory.push(item);
}

function statusLine() {
  say(`vitae: ${lives} | puncta: ${score} | res: ${inventory.join(", ") || "nihil"}`);
  say("");
}

function loseLife() {
  lives--;
  if (lives > 0) {
    say("male.");
    say("cancer ambulat per parietem et te mordet.");
    say(`vitae reliquae: ${lives}`);
    say("");
    return false;
  } else {
    say("male.");
    say("sacerdotes glitchiani te in murum digitalem trudunt.");
    say("ludus finitus est.");
    state = "gameover";
    return true;
  }
}

function succeed(text, points = 10) {
  say(text);
  score += points;
  say("");
}

function fail(text) {
  say(text);
  say("");
  if (!loseLife()) {
    promptState();
  }
}

function winGame() {
  say("ianua ultima tremit.");
  say("luna ipsa descendit.");
  say("capra gerens ocularia nigra iterum apparet.");
  say("sacerdotes glitchiani genua flectunt.");
  say("crustulum infinitum et coupon prandii capis.");
  say("");
  say("vincis.");
  statusLine();
  state = "gameover";
}

function startGame() {
  say("============================================================");
  say("               CAVERNA LUNAE GLITCHIANA");
  say("============================================================");
  say("nox est.");
  say("sub schola ianua argentea apparet.");
  say("capra cum oculariis nigris dicit: salve.");
  say("");
  say("quid tibi nomen est?");
  state = "name";
}

function promptState() {
  switch (state) {
    case "room1":
      say("tres globuli super mensam sunt.");
      say("scribe: luna / caseus / fiscus");
      break;

    case "room2":
      say("speculum nigrum susurrat.");
      say("scribe verbum valedictionis.");
      break;

    case "room3":
      say("vox dicit: surge.");
      say("quid facis?");
      break;

    case "room4":
      say("alia vox clamat: curre.");
      say("quid facis?");
      break;

    case "room5":
      say("post currendum larva placida dicit: conside.");
      say("quid facis?");
      break;

    case "room6":
      say("super mensa sunt liber, calamus, cummi.");
      say("quid capis?");
      break;

    case "room7":
      say("in pariete scriptum est: quid est hoc?");
      say("scribe verbum interrogativum.");
      break;

    case "room8":
      say("ostium aeneum dicit: da mihi verbum pro yes.");
      break;

    case "room9":
      say("ostium iterum dicit: da mihi verbum pro no.");
      break;

    case "room10":
      say("robotus ferrivector stat in flumine pensi domestici.");
      say("sitis est.");
      say("quid vis?");
      break;

    case "room11":
      say("in tenebris vox dicit: aperi os.");
      say("scribe partem corporis.");
      break;

    case "room12":
      say("soccus gigas rotans dicit: veni huc.");
      say("quid facis?");
      break;

    case "room13":
      say("eodem momento alius soccus clamat: exi hinc.");
      say("quid facis?");
      break;

    case "room14":
      say("avis compta cravataque te intuetur.");
      say("super sella sunt panis, lac, crustulum.");
      say("quid vis edere?");
      break;

    case "room15":
      say("luna picta quaerit:");
      say("ubi es?");
      say("scribe uno verbo.");
      break;

    case "room16":
      say("tabula magna ante te est.");
      say("vox dicit: scribe in tabula.");
      say("quid scribis?");
      break;

    case "room17":
      say("ianua ossibus facta petit nomen rei scholasticae.");
      say("in ea discipulus consedit.");
      say("quid est?");
      break;

    case "room18":
      say("in cubiculo vento pleno fenestra tremit.");
      say("vox dicit: aperi ____.");
      say("scribe rem.");
      break;

    case "room19":
      say("fenestra nunc aperta est.");
      say("vox dicit: claude ____.");
      say("scribe eandem rem.");
      break;

    case "room20":
      say("sacerdos glitchianus ad tabulam scriptoria venit.");
      say("is dicit: audi.");
      say("quid facis?");
      break;

    case "room21":
      say("idem sacerdos dicit: loquere latine.");
      say("quid facis?");
      break;

    case "room22":
      say("in solo sunt duae res: bulga et capsula.");
      say("quid est backpack?");
      say("scribe uno verbo.");
      break;

    case "room23":
      say("per parietem ambulat umbra.");
      say("quid vides?");
      say("scribe uno verbo.");
      break;

    case "room24":
      say("magnum ostium geographicum apparet.");
      say("sacerdos quaerit: quae patria est italia?");
      say("scribe latine.");
      break;

    case "room25":
      say("sacerdos iterum quaerit: quae patria est graecia?");
      say("scribe latine.");
      break;

    case "room26":
      say("nunc sacerdos vult aquam.");
      say("quid vult bibere?");
      say("scribe uno verbo.");
      break;

    case "room27":
      say("deinde vult panem.");
      say("quid vult edere?");
      say("scribe uno verbo.");
      break;

    case "room28":
      say("spectrum scholasticum clamat: quot bulgae?");
      say("respondere non potes numero anglico.");
      say("scribe numerum latinum pro three.");
      break;

    case "room29":
      say("capra redit.");
      say("dicit: quomodo dicis hello pluribus?");
      say("scribe uno verbo.");
      break;

    case "room30":
      say("in medio conclavis sacerdos glitchianus sedet super pegma.");
      say("si vis transire, dic verbo uno quid faciat discipulus bonus.");
      say("options latent in schola.");
      break;

    case "room31":
      say("sacerdos murmurat: quid est here?");
      say("scribe uno verbo latine.");
      break;

    case "room32":
      say("murmurat iterum: quid est there?");
      say("scribe uno verbo latine.");
      break;

    case "room33":
      say("super caput tuum luna falsa dicit: quid est book?");
      say("scribe uno verbo.");
      break;

    case "room34":
      say("in extrema ianua ignis viridis ardet.");
      say("ianua poscit verbum ultimum.");
      say("scribe imperativum pro come.");
      break;

    case "boss1":
      say("sacerdotes glitchiani surgunt.");
      say("maximus eorum dicit: quid est your name?");
      say("sed nolo sententiam longam.");
      say("scribe verbum solum quo me vocant.");
      break;

    case "boss2":
      say("sacerdos secundus dicit: quid est i am here?");
      say("scribe uno verbo.");
      break;

    case "boss3":
      say("sacerdos tertius dicit: quid facis si magister dicit revertere?");
      say("scribe uno verbo.");
      break;

    case "boss4":
      say("omnes simul clamant: vale an salve?");
      say("si vis finem, elige recte.");
      break;
  }
}

function handleState(answer) {
  switch (state) {
    case "name":
      if (answer) playerName = answer;
      say("");
      say(`salve, ${playerName}.`);
      say("capra ridet.");
      say('"noli timere," dicit, "sed fortasse time."');
      say("");
      state = "room1";
      promptState();
      return;

    case "room1":
      if (answer === "luna") {
        flags.viditLunam = true;
        succeed("globulus lunae tremit. scala apparet.", 5);
        state = "room2";
        promptState();
      } else {
        fail("nihil bene fit.");
      }
      return;

    case "room2":
      if (answer === "vale" || answer === "valete") {
        flags.dixitVale = true;
        succeed("speculum aperitur sicut aqua nigra.");
        state = "room3";
        promptState();
      } else {
        fail("speculum irascitur.");
      }
      return;

    case "room3":
      if (answer === "surgo") {
        succeed("recte. surgis.");
        state = "room4";
        promptState();
      } else {
        fail("non surgis.");
      }
      return;

    case "room4":
      if (answer === "curro") {
        succeed("recte. curris. pavimentum ululat.");
        state = "room5";
        promptState();
      } else {
        fail("tardus es.");
      }
      return;

    case "room5":
      if (answer === "consido") {
        succeed("recte. consides. sella tamen respirat.");
        state = "room6";
        promptState();
      } else {
        fail("sella te odit.");
      }
      return;

    case "room6":
      if (answer === "calamum" || answer === "calamus") {
        flags.habesCalamum = true;
        addItem("calamus");
        succeed("calamum capis. bene.", 12);
        state = "room7";
        promptState();
      } else {
        fail("res falsa est.");
      }
      return;

    case "room7":
      if (answer === "quid") {
        succeed("verbum rectum est. paries finditur.");
        state = "room8";
        promptState();
      } else {
        fail("paries manet.");
      }
      return;

    case "room8":
      if (answer === "ita") {
        succeed("ostium inclinatur.");
        state = "room9";
        promptState();
      } else {
        fail("ostium negat.");
      }
      return;

    case "room9":
      if (answer === "non" || answer === "minime") {
        succeed("ostium tandem aperitur.");
        state = "room10";
        promptState();
      } else {
        fail("ostium nimis positivum est.");
      }
      return;

    case "room10":
      if (answer === "aquam") {
        addItem("aqua");
        succeed("robotus tibi poculum aquae dat et transitum concedit.");
        state = "room11";
        promptState();
      } else {
        fail("robotus caput ferreum quatit.");
      }
      return;

    case "room11":
      if (answer === "os") {
        succeed("recte. tenebrae te non comedunt.");
        state = "room12";
        promptState();
      } else {
        fail("tenebrae os tuum quaerunt.");
      }
      return;

    case "room12":
      if (answer === "venio") {
        succeed("soccus laetus salit.");
        state = "room13";
        promptState();
      } else {
        fail("soccus lacrimat.");
      }
      return;

    case "room13":
      if (answer === "exeo" || answer === "abeo") {
        succeed("optime. soccus alter evanescit.");
        state = "room14";
        promptState();
      } else {
        fail("soccus adhuc clamat.");
      }
      return;

    case "room14":
      if (answer === "crustulum") {
        flags.habesCrustulum = true;
        addItem("crustulum");
        succeed("avis graviter annuit. crustulum tibi est.");
        state = "room15";
        promptState();
      } else {
        fail("avis te iudicat.");
      }
      return;

    case "room15":
      if (answer === "hic") {
        succeed("luna picta semel palpebrat.");
        state = "room16";
        promptState();
      } else {
        fail("luna te non invenit.");
      }
      return;

    case "room16":
      if (answer === "domum") {
        succeed("tabula gaudet quod domum scribis.");
        state = "room17";
        promptState();
      } else {
        fail("creta sola gemit.");
      }
      return;

    case "room17":
      if (answer === "sella") {
        succeed("ossa recedunt.");
        state = "room18";
        promptState();
      } else {
        fail("ossa manent.");
      }
      return;

    case "room18":
      if (answer === "fenestram" || answer === "fenestra") {
        succeed("ventus intrat et cantat.");
        state = "room19";
        promptState();
      } else {
        fail("ventus te irridet.");
      }
      return;

    case "room19":
      if (answer === "fenestram" || answer === "fenestra") {
        succeed("silentium fit subito.");
        state = "room20";
        promptState();
      } else {
        fail("fenestra tremit magis.");
      }
      return;

    case "room20":
      if (answer === "audio") {
        succeed("sacerdos dicit: tandem.");
        state = "room21";
        promptState();
      } else {
        fail("sacerdos putat te surdum esse.");
      }
      return;

    case "room21":
      if (answer === "loquor") {
        succeed("sacerdos parum ridet.");
        state = "room22";
        promptState();
      } else {
        fail("barbarus videris.");
      }
      return;

    case "room22":
      if (answer === "bulga" || answer === "saccus") {
        succeed("recte. bulga aperitur et fumus exit.");
        state = "room23";
        promptState();
      } else {
        fail("capsula mordet.");
      }
      return;

    case "room23":
      if (answer === "umbram" || answer === "umbra") {
        succeed("umbra te sinit transire.");
        state = "room24";
        promptState();
      } else {
        fail("umbra crescit.");
      }
      return;

    case "room24":
      if (answer === "italia") {
        succeed("terra sub pedibus tuis paulum cantat.");
        state = "room25";
        promptState();
      } else {
        fail("mappa rugit.");
      }
      return;

    case "room25":
      if (answer === "graecia") {
        succeed("mappa iterum quiescit.");
        state = "room26";
        promptState();
      } else {
        fail("litterae in muro ruunt.");
      }
      return;

    case "room26":
      if (answer === "aquam") {
        succeed("sacerdos aquam bibit sine facie.");
        state = "room27";
        promptState();
      } else {
        fail("sacerdos sitit adhuc.");
      }
      return;

    case "room27":
      if (answer === "panem") {
        succeed("sacerdos panem edit et minus terribilis fit.");
        state = "room28";
        promptState();
      } else {
        fail("venter sacerdotis fremit.");
      }
      return;

    case "room28":
      if (answer === "tres") {
        succeed("numerus rectus est.");
        state = "room29";
        promptState();
      } else {
        fail("numeri te deserunt.");
      }
      return;

    case "room29":
      if (answer === "salvete") {
        succeed("capra inclinat caput. satis bene.");
        state = "room30";
        promptState();
      } else {
        fail("capra offenditur.");
      }
      return;

    case "room30":
      if (answer === "audit" || answer === "scribit" || answer === "legit") {
        succeed("sacerdos dicit: fortasse discipulus bonus es.", 15);
        state = "room31";
        promptState();
      } else {
        fail("sacerdos dicit: minime.");
      }
      return;

    case "room31":
      if (answer === "hic") {
        succeed("primum verbum transit.");
        state = "room32";
        promptState();
      } else {
        fail("verbum cadit.");
      }
      return;

    case "room32":
      if (answer === "illic") {
        succeed("secundum verbum transit.");
        state = "room33";
        promptState();
      } else {
        fail("longinquitas clausa est.");
      }
      return;

    case "room33":
      if (answer === "liber") {
        succeed("luna falsa frangitur. vera luna apparet.");
        state = "room34";
        promptState();
      } else {
        fail("luna falsa mendax manet.");
      }
      return;

    case "room34":
      if (answer === "veni") {
        succeed("ianua ultima aperitur.");
        state = "boss1";
        promptState();
      } else {
        fail("ianua te spernit.");
      }
      return;

    case "boss1":
      if (answer === "nomen") {
        succeed("primus sacerdos tacet.");
        state = "boss2";
        promptState();
      } else {
        fail("primus sacerdos ridet metallice.");
      }
      return;

    case "boss2":
      if (answer === "adsum") {
        succeed("secundus sacerdos retro abit.");
        state = "boss3";
        promptState();
      } else {
        fail("secundus sacerdos negat praesentiam tuam.");
      }
      return;

    case "boss3":
      if (answer === "revertor") {
        succeed("tertius sacerdos evanescit in glitch.", 20);
        state = "boss4";
        promptState();
      } else {
        fail("tertius sacerdos manet.");
      }
      return;

    case "boss4":
      if (answer === "vale") {
        flags.sacerdosPlacatus = true;
        succeed("omnes sacerdotes respondent: vale.", 25);
        winGame();
      } else {
        fail("finis nondum venit.");
      }
      return;
  }
}

answerBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

startGame();
promptLine();
resetInput();

document.body.addEventListener("click", () => answerBox.focus());
window.addEventListener("load", () => answerBox.focus());

answerBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (state === "gameover") return;

    const val = answerBox.value.trim().toLowerCase();
    echoInput(val);
    answerBox.value = "";

    if (!val && state !== "name") {
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
  if (state === "gameover") return;
  const val = answerBox.value;
  echoInput(val);
  const answer = normalize(val);
  answerBox.value = "";
  if (!answer && state !== "name") {
    say("scribe aliquid.");
    say("");
    resetInput();
    return;
  }
  handleState(answer);
  resetInput();
});

answerBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

startGame();
resetInput();
