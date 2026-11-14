import * as ljs from "littlejsengine";
import { chuddyGuy, chuddyGuyTiles } from "./src/startScreen.js";
// runs first when the page loads
let gameState = "audioScreen";

let gameUpdateFrames = {
  updateChuddyGuy: 0,
};

let VERITY = new Audio("../assets/VERITY.mp3");

VERITY.loop = true;
function startGame() {}
// runs every frame
function updateGame() {
  for (const things in gameUpdateFrames) {
    gameUpdateFrames[things]++;
  }
  if (gameState == "startScreen") {
    if (gameUpdateFrames.updateChuddyGuy > 30) {
      chuddyGuy.tileInfo =
        chuddyGuy.tileInfo == chuddyGuyTiles.anim1
          ? chuddyGuyTiles.anim2
          : chuddyGuyTiles.anim1;
      // reset wait thingy
      gameUpdateFrames.updateChuddyGuy = 0;
    }
  }
}
// renders updated game
let objectiveAudio = new Audio("../assets/newObjective.mp3");
function newObjectiveText(text) {
    document.getElementById("objective-div").hidden = false;
  document.getElementById("objective-text").textContent = text;
objectiveAudio.play();
  setTimeout(() => {
    document.getElementById("objective-div").hidden = true;
  }, 3000);

}
function enterGame() {
  if (gameState == "audioScreen") {
    gameState = "startScreen";
    document.getElementById("before").hidden = true;
    document.getElementById("loadingScreen").hidden = true;
    document.getElementById("buttonCool").className = "BUTTONANIMGOUP";
    document.getElementById("verity").hidden = false;
    setTimeout(() => {
      document.getElementById("buttonCool").textContent = "Start!";
    }, 2000);
    setTimeout(() => {
      VERITY.play();
    }, 500);
    ljs.engineInit(startGame, updateGame);
  }
}
//make it so that on click of the button with the id "button" it calls the enterGame function
document.getElementById("buttonCool").addEventListener("click", enterGame);
