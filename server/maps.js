const stream = require("fs");
const _ASSETS_PATH = "assets/data/";

const _FILE_TILES = "tiles.json";

exports.loadTiles = function() {
    stream.readFile(_ASSETS_PATH + _FILE_TILES, "utf-8", function(error, data) {
        exports.tilesData = JSON.parse(data);
    });
}