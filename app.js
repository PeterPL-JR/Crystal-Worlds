const canvas = document.querySelector("#container canvas");
const ctx = canvas.getContext("2d");

const SCREEN_MAP_WIDTH = 18;
const SCREEN_MAP_HEIGHT = 10;

const TILE_IMAGE_SIZE = 34;
const TILE_SIZE = TILE_IMAGE_SIZE * 2;

const WIDTH = SCREEN_MAP_WIDTH * TILE_SIZE;
const HEIGHT = SCREEN_MAP_HEIGHT * TILE_SIZE;

const X_OFFSET = WIDTH / 2 - PLAYER_SIZE / 2;
const Y_OFFSET = HEIGHT / 2 - PLAYER_SIZE / 2;

var mapWidth;
var mapHeight;

const _EMIT_GET_TILES = 0;

var socket;
var worlds;

var tilesObj = {};
var tilesArray = [];

var displayedMap;
const tiles = [];
var player;
var time = 0;

// TO DELETE!
const worldName = "earth";
const mapIndex = 0;
const characterIndex = 0;

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    keyboard();
    mouse();

    var socket = io();
    socket.on(_EMIT_GET_TILES, function(data) {
        worlds = data.worlds;
        tilesObj = data.tiles;
        start();
    });
    setInterval(function() {
        time++;
    }, 10);
}

function start() {
    initMap(worldName, mapIndex);
    initImages();
    initPlayer();

    draw();
}

function initImages() {
    // Init Tiles Images
    for(var tile in tilesObj) {
        const obj = tilesObj[tile];
        tilesArray[obj.index] = obj;
        
        tilesArray[obj.index].name = tile;
        tilesArray[obj.index].image = new ImgAsset(`${_IMAGES_PATH}tiles/${tile}.png`);
        delete tilesArray[obj.index].index;
    }
    // Init Player Images
    for(var c = 0; c < _SKINS; c++) {
        const image = loadImage(`${_IMAGES_PATH}player/player${c}.png`);
        playersTextures[c] = [];

        for(var dir = 0; dir < _DIRS; dir++) {
            playersTextures[c][dir] = [];

            for(var moveTex = 0; moveTex < _MOVE_TEXTURES; moveTex++) {
                const sx = dir * PLAYER_IMAGE_SIZE;
                const sy = moveTex * PLAYER_IMAGE_SIZE;
                playersTextures[c][dir][moveTex] = new ImgAsset(image, sx, sy, PLAYER_IMAGE_SIZE, PLAYER_IMAGE_SIZE);
            }
        }
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
            tiles.push({x, y, type});
        }
    }
}

function draw() {
    requestAnimationFrame(draw);
    updatePlayer(player);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    renderTiles();
    renderPlayer(player);
}

function renderTiles() {
    for(var tile of tiles) {
        const renderX = getX(tile.x * TILE_SIZE);
        const renderY = getY(tile.y * TILE_SIZE);
        tilesArray[tile.type].image.draw(ctx, renderX, renderY, TILE_SIZE, TILE_SIZE);
    }
}

function isDefined(value) {
    return value != undefined;
}