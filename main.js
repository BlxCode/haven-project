import * as ljs from "littlejsengine";
import { chuddyGuy, chuddyGuyTiles, titleObject } from "./src/startScreen.js";
// runs first when the page loads
let gameState = "audioScreen";
const georgePig = new Audio("../assets/george.mp3");

let gameUpdateFrames = {
  updateChuddyGuy: 0,
};

let VERITY = new Audio("../assets/VERITY.mp3");
let aiTalk = new Audio("../assets/aiTalk.mp3");
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
  setTimeout(
    () => {
      document.getElementById("objective-div").hidden = true;
    },
    document.getElementById("objective-text").textContent.length * 67,
  );
}
const aiDatingScreen = document.getElementById("datingScreen");
aiDatingScreen.hidden = true;
let verityTouches = 0;
document.getElementById("verity").addEventListener("click", () => {
  verityTouches++;
  if (verityTouches == 67) {
    newObjectiveText(
      "stop touching me u chud 😡 cheung cheung cheung sahur will kill u",
    );
    setTimeout(() => {
      document.getElementById("verity").remove();
      document.getElementById("tripleC").hidden = false;
      document.getElementById("buttonCool").remove();
      VERITY.pause();
    }, 3500);
  }
});
function makeChudCryScene() {
    setTimeout(() => {
        console.log("chud cry scene");
    chuddyGuy.tileInfo = chuddyGuyTiles.cryFront;
    chuddyGuy.size = ljs.vec2(50, 50);
    chuddyGuy.pos = ljs.vec2(0,0);
    }, 500);
}
let violinSad = new Audio("../assets/sad.mp3");
    ljs.engineInit(startGame, updateGame);

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
    let element = document.getElementById("buttonCool");
    element.addEventListener("click", gameStart);

    function gameStart() {
        setTimeout(() => {
          aiTalk.play();
        }, 500);
      titleObject.destroy();
      VERITY.pause();
      element.remove();
      aiDatingScreen.hidden = false;
      setTimeout(() => {
        aiDatingScreen.hidden = true;
      }, 15500);
      gameState = "theAkshualGame";
      chuddyGuy.tileInfo = chuddyGuyTiles.cryStage1;
      document.getElementById("verity").remove();
      setTimeout(() => {
        chuddyGuy.tileInfo = chuddyGuyTiles.cryStage2;
        newObjectiveText(
          'You got rejected by your ai girlfriend 💀😭. She said "go touch grass" and left you alone.',
        );
      }, 16500);
      setTimeout(() => {
        chuddyGuy.tileInfo = chuddyGuyTiles.cryStage3;
        georgePig.play();
        makeChudCryScene();
      }, 17500);
      setTimeout(() => {
        violinSad.play();
      }, 17600);
      setTimeout(() => {
      chuddyGuy.tileInfo = chuddyGuyTiles.cryStage2;
      }, 21500);
      setTimeout(() => {
        chuddyGuy.tileInfo = chuddyGuyTiles.cryStage1;
      }, 124500);
      setTimeout(() => {
          chuddyGuy.tileInfo = chuddyGuyTiles.back;
    chuddyGuy.size = ljs.vec2(20, 20);
    chuddyGuy.pos = ljs.vec2(0,-5);
        newObjectiveText(
          "You are now alone in the world. the game will make ur character walk into the door cuz i said so, to maybe get her back.",
        );
      }, 23600);
    }
  }
}
//make it so that on click of the button with the id "button" it calls the enterGame function
document.getElementById("buttonCool").addEventListener("click", enterGame);
