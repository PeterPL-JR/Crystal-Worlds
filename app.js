const canvas = document.querySelector("#container canvas");
const ctx = canvas.getContext("2d");

const SCREEN_MAP_WIDTH = 12;
const SCREEN_MAP_HEIGHT = 7;

const TILE_IMAGE_SIZE = 34;
const TILE_SIZE = TILE_IMAGE_SIZE * 3;

const WIDTH = SCREEN_MAP_WIDTH * TILE_SIZE;
const HEIGHT = SCREEN_MAP_HEIGHT * TILE_SIZE;

var mapWidth;
var mapHeight;

const _EMIT_GET_TILES = 0;

var socket;
var worlds;

var tilesObj = {};
var tilesArray = [];

var displayedMap;
const tiles = [];

// TO DELETE!
const worldName = "earth";
const mapIndex = 0;

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var socket = io();
    socket.on(_EMIT_GET_TILES, function(data) {
        worlds = data.worlds;
        tilesObj = data.tiles;
        start();
    });
}

function start() {
    initMap(worldName, mapIndex);
    initImages();

    draw();
}

function initImages() {
    for(var tile in tilesObj) {
        const obj = tilesObj[tile];
        tilesArray[obj.index] = obj;
        
        tilesArray[obj.index].name = tile;
        tilesArray[obj.index].image = new ImgAsset(`${_IMAGES_PATH}tiles/${tile}.png`);
        delete tilesArray[obj.index].index;
    }
}

function initMap(worldName, mapIndex) {
    displayedMap = worlds[worldName][mapIndex];

    const tilesIndexes = displayedMap.data;
    mapWidth = tilesIndexes[0].length;
    mapHeight = tilesIndexes.length;

    for(var y = 0; y < mapHeight; y++) {
        for(var x = 0; x < mapWidth; x++) {
            const type = tilesIndexes[y][x];
            tiles.push({x, y, type})
        }
    }
}

function draw() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    renderTiles();
}

function renderTiles() {
    for(var tile of tiles) {
        const renderX = tile.x * TILE_SIZE;
        const renderY = tile.y * TILE_SIZE;
        tilesArray[tile.type].image.draw(ctx, renderX, renderY, TILE_SIZE, TILE_SIZE);
    }
}