import * as ljs from "littlejsengine";


const noodleHTMLImage = new Image();
noodleHTMLImage.scr = "../assets/noodle.png";
let noodleTile;
noodleHTMLImage.onload = ()=>{
noodleTile = new ljs.TileInfo(
    ljs.vec2(0,0),
    ljs.vex2(100,100),
    new ljs.TextureInfo(noodleHTMLImage)
)
}

const ratHTMLImage = new Image();
ratHTMLImage.scr = "../assets/ratpixel.png"
let ratTile;
ratHTMLImage.onload = ()=>{
ratTile = new ljs.TileInfo(
    ljs.vec2(0,0),
    ljs.vex2(32,32),
    new ljs.TextureInfo(ratHTMLImage)
)
}

const redditWallHTMLImage = new Image();
redditWallHTMLImage.scr = "../assets/ratpixel.png"
let redditWallTile;
redditWallHTMLImage.onload = ()=>{
redditWallTile = new ljs.TileInfo(
    ljs.vec2(0,0),
    ljs.vex2(100,56),
    new ljs.TextureInfo(redditWallHTMLImage)
)
}

const archWallHTMLImage = new Image();
archWallHTMLImage.scr = "../assets/archWall.png"
let archWallTile;
archWallTileImage.onload = ()=>{
archWallTile = new ljs.TileInfo(
    ljs.vec2(0,0),
    ljs.vex2(100,56),
    new ljs.TextureInfo(archWallHTMLImage)

)
}

const drinkHTMLImage = new Image();
drinkHTMLImage.scr = "../assets/drink.png"
let drinkTile;

drinkTileImage.onload = ()=>{

drinkTile = new ljs.TileInfo(
    ljs.vec2(0,0),
    ljs.vex2(32,32),
    new ljs.TextureInfo(drinkHTMLImage)

)
}
export {noodleTile, ratTile, redditWallTile, archWallTile, drinkTile};