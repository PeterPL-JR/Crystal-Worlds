const stream = require("fs");
const _ASSETS_PATH = "assets/data/";

const _FILE_TILES = "tiles.json";
const _FILE_MAPS = "maps.json";

const maps = [];

exports.loadTiles = function() {
    stream.readFile(_ASSETS_PATH + _FILE_TILES, "utf-8", function(error, data) {
        exports.tilesData = JSON.parse(data);
    });
}
exports.loadMaps = function() {
    stream.readFile(_ASSETS_PATH + _FILE_MAPS, "utf-8", function(error, data) {
        var mapsNames = JSON.parse(data);
        for(var mapName of mapsNames) {
            console.log(mapName);
        }
    });
}