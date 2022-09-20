const canvas = document.querySelector("#container canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 1280;
const HEIGHT = 720;

const _EMIT_GET_TILES = 0;

var socket;
var worlds, tilesData;
var displayedMap;

// TO DELETE!
const worldName = "earth";
const mapIndex = 0;

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var socket = io();
    socket.on(_EMIT_GET_TILES, function(data) {
        worlds = data.worlds;
        tilesData = data.tiles;
        start();
    });
}

function start() {
    initMap(worldName, mapIndex);
    initImages();
    
    draw();
}

function initImages() {
    for(var tile in tilesData) {
        tilesData[tile].image = new ImgAsset(`${_IMAGES_PATH}tiles/${tile}.png`);
    }
}

function initMap(worldName, mapIndex) {
    displayedMap = worlds[worldName][mapIndex];
    console.log("Displayed map:", displayedMap);
}

function draw() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}