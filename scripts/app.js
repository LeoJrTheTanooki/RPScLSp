import { GameStart } from "./game-start.js";
// console.log("I'm from app.js");
let oneVsOne = document.getElementById("oneVsOne");
let oneVsCpu = document.getElementById("oneVsCpu");
let oneRound = document.getElementById("oneRound");
let threeRounds = document.getElementById("threeRounds");
let fourRounds = document.getElementById("fourRounds");
let debugInfinite = document.getElementById("debugInfinite");
let dialogueBox = document.getElementById("main-text");
let duelMode;
let dummyElm = document.getElementById("dummy");
oneVsOne.addEventListener("click", function (e) {
  duelMode = true;
  DisplayOff(oneVsOne, oneVsCpu);
  DisplayOn(oneRound, threeRounds, fourRounds, debugInfinite);
  dialogueBox.textContent = "Now choose your rounds";
});
oneVsCpu.addEventListener("click", function (e) {
  duelMode = false;
  DisplayOff(oneVsOne, oneVsCpu);
  DisplayOn(oneRound, threeRounds, fourRounds, debugInfinite);
  dialogueBox.textContent = "Now choose your rounds";
});
oneRound.addEventListener("click", function (e) {
  GameStart(1, duelMode);
  DisplayOff(oneRound, threeRounds, fourRounds, debugInfinite);
});
threeRounds.addEventListener("click", function (e) {
  GameStart(3, duelMode);
  DisplayOff(oneRound, threeRounds, fourRounds, debugInfinite);
});
fourRounds.addEventListener("click", function (e) {
  GameStart(4, duelMode);
  DisplayOff(oneRound, threeRounds, fourRounds, debugInfinite);
});
debugInfinite.addEventListener("click", function (e) {
  GameStart(99, duelMode);
  DisplayOff(oneRound, threeRounds, fourRounds, debugInfinite);
});

function DisplayOff(
  variable1 = dummyElm,
  variable2 = dummyElm,
  variable3 = dummyElm,
  variable4 = dummyElm
) {
  variable1.classList.add("d-none");
  variable2.classList.add("d-none");
  variable3.classList.add("d-none");
  variable4.classList.add("d-none");
}

function DisplayOn(
  variable1 = dummyElm,
  variable2 = dummyElm,
  variable3 = dummyElm,
  variable4 = dummyElm
) {
  variable1.classList.remove("d-none");
  variable2.classList.remove("d-none");
  variable3.classList.remove("d-none");
  variable4.classList.remove("d-none");
}

export { DisplayOff };
export { DisplayOn };