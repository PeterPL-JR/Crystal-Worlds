var playerX;
var playerY;

const PLAYER_IMAGE_SIZE = 34;
const PLAYER_SIZE = PLAYER_IMAGE_SIZE * 2;
const SPEED = 10;

const X = 0;
const Y = 1;

const allTheRightMoves = {
    W: [0, -1],
    S: [0, 1],
    A: [-1, 0],
    D: [1, 0] 
};

function playerMovement() {
    for(var key in allTheRightMoves) {
        if(keys[key]) {
            const move = allTheRightMoves[key];
            playerX += move[X] * SPEED;
            playerY += move[Y] * SPEED;
        }
    }
}

function getX(mapX) {
    return mapX - playerX + X_OFFSET;
}
function getY(mapY) {
    return mapY - playerY + Y_OFFSET;
}