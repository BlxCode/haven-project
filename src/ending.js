import * as ljs from "littlejsengine";

const chuddyRoomHTMLImage = new Image();
chuddyRoomHTMLImage.src = "../assets/loadingRoom.png";
let chuddyRoomImage, chuddyRoomTile, chuddyRoom;

chuddyRoomHTMLImage.onload = () => {
  chuddyRoomImage = new ljs.TextureInfo(chuddyRoomHTMLImage);

  chuddyRoomTile = new ljs.TileInfo(
    ljs.vec2(0, 0),
    ljs.vec2(100, 56),
    chuddyRoomImage,
  );
};
const chuddyGuyHTMLImage = new Image();
let chuddyGuyImage, chuddyGuyTiles, chuddyGuy;
chuddyGuyHTMLImage.src = "../assets/chuddy.png";
chuddyGuyHTMLImage.onload = () => {
  chuddyGuyImage = new ljs.TextureInfo(chuddyGuyHTMLImage);
  chuddyGuyTiles = {
    anim1: new ljs.TileInfo(
      ljs.vec2(0, 0),
      ljs.vec2(32, 32),
      chuddyGuyImage,
      1,
    ),
    anim2: new ljs.TileInfo(
      ljs.vec2(32, 0),
      ljs.vec2(32, 32),
      chuddyGuyImage,
      1,
    ),
    back: new ljs.TileInfo(
      ljs.vec2(64, 0),
      ljs.vec2(32, 32),
      chuddyGuyImage,
      1,
    ),
    cryStage1: new ljs.TileInfo(
      ljs.vec2(96, 0),
      ljs.vec2(32, 32),
      chuddyGuyImage,
      1,
    ),
    cryStage2: new ljs.TileInfo(
      ljs.vec2(128, 0),
      ljs.vec2(32, 32),
      chuddyGuyImage,
      1,
    ),
    cryStage3: new ljs.TileInfo(
      ljs.vec2(160, 0),
      ljs.vec2(32, 32),
      chuddyGuyImage,
      1,
    ),
    cryFront: new ljs.TileInfo(
      ljs.vec2(192, 0),
      ljs.vec2(32, 32),
      chuddyGuyImage,
      1,
    ),
  };
};

window.addEventListener("ending", () => {
  ljs.setGravity(ljs.vec2(0));

  chuddyRoom = new ljs.EngineObject(
    ljs.vec2(0, 0),
    ljs.vec2(64, 37),
    chuddyRoomTile,
  );
  chuddyGuy = new ljs.EngineObject(
    ljs.vec2(-18, -6),
    ljs.vec2(20, 20),
    chuddyGuyTiles.anim1,
  );





});
