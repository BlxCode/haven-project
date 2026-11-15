import * as ljs from "littlejsengine";
import { newObjectiveText } from "../main.js";
const platformsImage = new Image();
platformsImage.src = "../assets/platforms.png";
import {
  redditWallTile,
  archWallTile,
  drinkTile,
  noodleTile,
  ratTile,
} from "./floor.js";
let textureInfo;
let idk = 0;
let typesTileInfo = {};
let typesSizes = {
  table: ljs.vec2(30 / 5, 12 / 5),
  couch: ljs.vec2(62 / 5, 25 / 5),
  chair: ljs.vec2(17 / 5, 21 / 5),
  grass: ljs.vec2(12 / 5, 12/5)
};
let grassHTMLImage = new Image();
grassHTMLImage.src = "../assets/grass.png";
let grass;
grassHTMLImage.onload = () => {
  grass = new ljs.TextureInfo(grassHTMLImage);
};
platformsImage.onload = () => {
  textureInfo = new ljs.TextureInfo(platformsImage);

  typesTileInfo = {
    table: new ljs.TileInfo(ljs.vec2(17, 20), ljs.vec2(30, 12), textureInfo),
    couch: new ljs.TileInfo(ljs.vec2(1, 39), ljs.vec2(62, 25), textureInfo),
    chair: new ljs.TileInfo(ljs.vec2(21, 75), ljs.vec2(17, 21), textureInfo),
    grass: new ljs.TileInfo(ljs.vec2(0, 0), ljs.vec2(1600,1050), grass),
  };
};
const playersImage = new Image();
playersImage.src = "../assets/chud.png";
let playerTextureInfo;
let playerTileInfos = {};
playersImage.onload = () => {
  playerTextureInfo = new ljs.TextureInfo(playersImage);
  playerTileInfos = {
    idle: new ljs.TileInfo(ljs.vec2(0, 0), ljs.vec2(20, 30), playerTextureInfo),
    walk1: new ljs.TileInfo(
      ljs.vec2(20, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    walk2: new ljs.TileInfo(
      ljs.vec2(40, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    walk3: new ljs.TileInfo(
      ljs.vec2(60, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    walk4: new ljs.TileInfo(
      ljs.vec2(40, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    jump: new ljs.TileInfo(
      ljs.vec2(80, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    fall: new ljs.TileInfo(
      ljs.vec2(100, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    sit: new ljs.TileInfo(
      ljs.vec2(120, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    weight1: new ljs.TileInfo(
      ljs.vec2(140, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
    weight2: new ljs.TileInfo(
      ljs.vec2(160, 0),
      ljs.vec2(20, 30),
      playerTextureInfo,
    ),
  };
};

class Platform extends ljs.EngineObject {
  constructor(pos, type) {
    super();
    this.gravityScale = 0;
    this.mass = 0;
    this.velocity = ljs.vec2(0, 0);
    this.pos = pos;
    this.size = typesSizes[type] || ljs.vec2(12, 6);

    this.type = type;
    if (typesTileInfo[type]) {
      this.tileInfo = typesTileInfo[type];
    } else {
      console.error(`Invalid platform type: ${type}`);
    }
    this.angle = Math.random() * 0.1 - 0.05;
    this.setCollision(true, true, false, true);
  }
 
}
class player extends ljs.EngineObject {
  constructor(pos) {
    super();
    this.pos = pos;
    this.walkFrames = 0;
    this.size = ljs.vec2(3, 5);
    this.walkIndex = 0;
    this.tileInfo = playerTileInfos.idle;
    this.setCollision(true, true, true, true);
    this.renderOrder = 5395435;
  }

  update() {
    if(this.groundObject){
        if(this.groundObject.type == "couch"){
this.velocity.y = 0.9;
        }
        if(this.groundObject.type == "grass"){
            window.dispatchEvent(new Event("ending"));
newObjectiveText("You are now on grass. You feel a sense of calm and peace. Suddenly, your ai girlfriend texts you. See says 'i dont care about you' 'i never cared cared about you' 'you are a loser for thinking ai had feelings so incipid like... love'");
        }
    }
    const moveInput = ljs.keyDirection();
    if (Math.abs(moveInput.x) > 0.1) {
      this.velocity.x += moveInput.x * (this.groundObject ? 0.05 : 0.045);
      this.velocity.x = Math.max(-0.3, Math.min(0.3, this.velocity.x));
    }
    if (this.velocity.x > 0.1) {
      this.mirror = false;
    } else if (this.velocity.x < -0.1) {
      this.mirror = true;
    }
    this.walkFrames++;
    if (Math.abs(moveInput.x) > 0.1 && this.walkFrames > 10) {
      this.walkIndex = (this.walkIndex % 4) + 1;
      this.tileInfo = playerTileInfos[`walk${this.walkIndex}`];
      this.walkFrames = 0;
    }
    if (Math.abs(moveInput.x) < 0.1) {
      this.tileInfo = playerTileInfos.idle;
    }

    if (
      this.groundObject &&
      (ljs.keyIsDown("ArrowUp") || ljs.keyIsDown("Space"))
    ) {
      this.velocity.y = 0.9; // jump
      console.log("jump");
    }
    if (this.velocity.y < -0.1) {
      this.tileInfo = playerTileInfos.fall;
    }
    if (this.velocity.y > 0.1) {
      this.tileInfo = playerTileInfos.fall;
    }
    if (this.pos.y < -9) {
      this.pos = ljs.vec2(1, 15);
      newObjectiveText("You fell off the map. You have been respawned.");
      this.velocity = ljs.vec2(0, 0);
    }
    ljs.setCameraPos(this.pos);
  }
}
window.addEventListener("gameJustStartedVro", () => {
  for (let i = -10; i < 20; i++) {
    const wall = new ljs.EngineObject(
      ljs.vec2(i * 100, 5),
      ljs.vec2(100, 56),
      archWallTile,
    );
    wall.velocity = ljs.vec2(0, 0);
    wall.gravityScale = 0;
    wall.mass = ljs.vec2(0, 0);
    console.log(archWallTile);
    console.log("arch wall created at x: " + i);
    console.log("arch wall created at y: " + 0);
    console.log("arch wall created at pos: " + wall.pos);
    console.log("wall", wall);
  }
  ljs.setGravity(ljs.vec2(0, -0.06));

  new Platform(ljs.vec2(1, -1), "table");
  new player(ljs.vec2(1, 15));

  console.log("gameJustStartedVro event received in startScreen.js");

  for (let i = 0; i < 350; i += 15) {
    const randomX = i + Math.random() + -0.5;
    const randomY = 1;
    const randomNum = Math.random();
    if (randomNum >= 0.5) {
      var randomType = "table";
    } else if (randomNum < 0.5) {
      var randomType = "couch";
    }
    new Platform(ljs.vec2(randomX, randomY), randomType);
  }
new Platform(ljs.vec2(360, 1), "grass");

  for (let i = -100; i < 500; i += 0.2) {
    const randomNum = Math.random();
    let randomType;
    if (randomNum < 0.33) {
      randomType = noodleTile;
    } else if (randomNum < 0.66) {
      randomType = ratTile;
    } else {
      randomType = drinkTile;
    }

    let junk = new ljs.EngineObject(
      ljs.vec2(i, -7.77 + (Math.random()* 7.5) - 3.5),
      ljs.vec2(2),
      randomType,
    );
    junk.gravityScale = 0;
    junk.mass = 0;
    junk.angle = Math.random() * 0.1 - 0.05;
    junk.velocity = ljs.vec2(0, 0);
  }
});

export { idk };
