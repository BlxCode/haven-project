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
function enterGame(){
    if (gameState == "audioScreen") {
    document.getElementById("buttonCool").className = "BUTTONANIMGOUP";
    document.getElementById("verity").hidden = false;
    setTimeout(() => {
    document.getElementById("buttonCool").textContent = "Start!";
    }, 2000);
    VERITY.play();
ljs.engineInit(startGame, updateGame);
gameState = "startScreen";
    }
}
//make it so that on click of the button with the id "button" it calls the enterGame function
document.getElementById("buttonCool").addEventListener("click", enterGame);