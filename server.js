const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const server = http.createServer(app);
const {Server} = require("socket.io");

const io = new Server(server);
const PORT = process.env.PORT || 1024;

const maps = require("./server/maps");
maps.loadTiles();
maps.loadMaps();

const _EMIT_GET_WORLDS_DATA = 0;

io.on("connection", function(socket) {
    socket.emit(_EMIT_GET_WORLDS_DATA, {
        tiles: maps.tilesData,
        worlds: maps.worldsData
    });
});

app.use(express.static(
    path.join(__dirname, "/")
));

server.listen(PORT, function() {
    console.log("Server is listening on port " + PORT);
});