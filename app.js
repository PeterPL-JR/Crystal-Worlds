const canvas = document.querySelector("#container canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 1280;
const HEIGHT = 720;

const _EMIT_GET_TILES = 0;

var socket;

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var socket = io();
    socket.on(_EMIT_GET_TILES, function(data) {
        console.log(data);
    });
    draw();
}

function draw() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}