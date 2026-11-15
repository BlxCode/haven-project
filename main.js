import * as ljs from "littlejsengine";
import { chuddyGuy, chuddyGuyTiles, titleObject } from "./src/startScreen.js";
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
  }, document.getElementById("objective-text").textContent.length * 67);

}
  const aiDatingScreen = document.getElementById("datingScreen")
aiDatingScreen.hidden = true
function enterGame() {
  if (gameState == "audioScreen") {
    document.getElementById("sc").remove();
    gameState = "startScreen";
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
    let element =document.getElementById("buttonCool")
    element.addEventListener("click", gameStart)
  
    function gameStart() {
     titleObject.destroy();
     VERITY.pause();
        element.remove();
aiDatingScreen.hidden = false
setTimeout(() => {
  aiDatingScreen.hidden = true;
}, 3500);
gameState = "theAkshualGame";
chuddyGuy.tileInfo = chuddyGuyTiles.cryStage1
setTimeout(() => {
  chuddyGuy.tileInfo = chuddyGuyTiles.cryStage2;
    newObjectiveText('You got rejected by your ai girlfriend 💀😭. She said "go touch grass" and left you alone.')

}, 4500);
setTimeout(() => {
  chuddyGuy.tileInfo = chuddyGuyTiles.cryStage3

}, 5500);




    }
  }
}
//make it so that on click of the button with the id "button" it calls the enterGame function
document.getElementById("buttonCool").addEventListener("click", enterGame);
