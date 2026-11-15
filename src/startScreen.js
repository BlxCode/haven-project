import * as ljs from "littlejsengine";





const chuddyRoomHTMLImage = new Image();
chuddyRoomHTMLImage.src = "../assets/loadingRoom.png";

const chuddyRoomImage = new ljs.TextureInfo(chuddyRoomHTMLImage);

const chuddyRoomTile = new ljs.TileInfo(
  ljs.vec2(0, 0),
  ljs.vec2(100,56),
  chuddyRoomImage,
);

const chuddyRoom = new ljs.EngineObject(
  ljs.vec2(0, 0),
    ljs.vec2(64,37),
  chuddyRoomTile,
);





const chuddyGuyHTMLImage = new Image();
chuddyGuyHTMLImage.src = "../assets/chuddy.png";
const chuddyGuyImage = new ljs.TextureInfo(chuddyGuyHTMLImage);
const chuddyGuyTiles = {
  anim1: new ljs.TileInfo(ljs.vec2(0, 0), ljs.vec2(32, 32), chuddyGuyImage),
  anim2: new ljs.TileInfo(ljs.vec2(32, 0), ljs.vec2(32, 32), chuddyGuyImage),
  back: new ljs.TileInfo(ljs.vec2(64, 0), ljs.vec2(32, 32), chuddyGuyImage),
  cryStage1: new ljs.TileInfo(ljs.vec2(96, 0), ljs.vec2(32, 32), chuddyGuyImage),
  cryStage2: new ljs.TileInfo(ljs.vec2(128, 0), ljs.vec2(32, 32), chuddyGuyImage),
  cryStage3: new ljs.TileInfo(ljs.vec2(160, 0), ljs.vec2(32, 32), chuddyGuyImage),
};

const chuddyGuy = new ljs.EngineObject(
  ljs.vec2(-18, -6),
  ljs.vec2(20, 20),
  chuddyGuyTiles.anim1,
);

const titleHTMLImage = new Image();
titleHTMLImage.src = "../assets/textlogo.png";
const title = new ljs.TextureInfo(titleHTMLImage);
const titleTile = new ljs.TileInfo(
  ljs.vec2(0, 0),
  ljs.vec2(100, 25),
  title,
);
const titleObject = new ljs.EngineObject(
  ljs.vec2(14, 8.5),
  ljs.vec2(32, 10),
  titleTile,
);

export { titleObject };
export { chuddyRoom };

export { chuddyGuy };
export { chuddyGuyTiles };
