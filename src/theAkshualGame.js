import * as ljs from "littlejsengine";
const platformsImage = new Image();
platformsImage.src = "../assets/platforms.png";
let textureInfo;
let idk = 0;
let typesTileInfo = {};
let typesSizes = {
  table: ljs.vec2(30 / 5, 12 / 5),
  couch: ljs.vec2(62 / 5, 25 / 5),
  chair: ljs.vec2(17 / 5, 21 / 5),
};
platformsImage.onload = () => {
  textureInfo = new ljs.TextureInfo(platformsImage);

  typesTileInfo = {
    table: new ljs.TileInfo(ljs.vec2(17, 20), ljs.vec2(30, 12), textureInfo),
    couch: new ljs.TileInfo(ljs.vec2(1, 39), ljs.vec2(62, 25), textureInfo),
    chair: new ljs.TileInfo(ljs.vec2(21, 75), ljs.vec2(17, 21), textureInfo),
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
    this.angle = Math.random() / 3 - 0.5;
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
  }

  update() {
    const moveInput = ljs.keyDirection();
    if (Math.abs(moveInput.x) > 0.1) {
      this.velocity.x += moveInput.x * (this.groundObject ? 0.05 : 0.06);
    } else if (Math.abs(moveInput.x) < 0.1) {
      this.velocity.x *= this.groundObject ? 0.05 : 0.06;
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
    if (this.groundObject && moveInput.y > 0) {
      this.velocity.y = 0.9; // jump
      console.log("jump");
    }
    if (this.velocity.y < -0.1) {
      this.tileInfo = playerTileInfos.jump;
    }
    if (this.velocity.y > 0.1) {
      this.tileInfo = playerTileInfos.fall;
    }
    ljs.setCameraPos(this.pos);
  }
}
window.addEventListener("gameJustStartedVro", () => {
  ljs.setGravity(ljs.vec2(0, -0.05));

  new Platform(ljs.vec2(1, -1), "table");
  new player(ljs.vec2(1, 15));

  console.log("gameJustStartedVro event received in startScreen.js");

  for (let i = 0; i < 50; i++) {
    const randomX = Math.floor(Math.random() * 4) + 2;
    const randomY = Math.floor(Math.random() * 3) + 2;
    const randomNum = Math.random();
    if(randomNum < 0.33) {
      var randomType = "table";
    } else if(randomNum < 0.66) {
      var randomType = "couch";
    } else {
      var randomType = "chair";
    }
    new Platform(ljs.vec2(randomX, randomY), randomType);
  }
});
export { idk };
