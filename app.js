const canvas = document.querySelector("#container canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 1280;
const HEIGHT = 720;

function init() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    draw();
}

function draw() {
    requestAnimationFrame(draw);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}