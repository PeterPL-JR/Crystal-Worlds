const stream = require("fs");
const _ASSETS_PATH = "assets/data/";
const _MAPS_PATH = _ASSETS_PATH + "maps/";

const _FILE_TILES = "tiles.json";
const _FILE_WORLDS = "worlds.json";

function readFile(path) {
    return stream.readFileSync(path).toString();
}
function readJSON(path) {
    return JSON.parse(readFile(path));
}

exports.loadTiles = function() {
    exports.tilesData = readJSON(_ASSETS_PATH + _FILE_TILES);
}
exports.loadMaps = function() {
    const bufferWorldsData = readJSON(_ASSETS_PATH + _FILE_WORLDS);
    const worldsData = {};

    for(var worldName in bufferWorldsData) {
        worldsData[worldName] = [];
        for(var mapName of bufferWorldsData[worldName]) {
            const mapData = readJSON(_MAPS_PATH + mapName);
            worldsData[worldName].push(mapData);
        }
    }
    exports.worldsData = worldsData;
}