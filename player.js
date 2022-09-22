const DIR_LEFT = 0;
const DIR_RIGHT = 1;

const DIR_DOWN = 2;
const DIR_UP = 3;

const _SKINS = 1;
const PLAYER_IMAGE_SIZE = 34;
const PLAYER_SIZE = PLAYER_IMAGE_SIZE * 4;
const SPEED = 10;

const MOVEMENT_FRAMES = 4;
const MOVEMENT_FRAME_SPEED = 15;

const X = 0;
const Y = 1;

const _DIRS = 4;
const _MOVE_TEXTURES = 3;

const STANDING = 0;
const MOVING_1 = 1;
const MOVING_2 = 2;

const dirs = {
    W: DIR_UP,
    S: DIR_DOWN,
    A: DIR_LEFT,
    D: DIR_RIGHT
};

const allTheRightMoves = {
    W: [0, -1],
    S: [0, 1],
    A: [-1, 0],
    D: [1, 0] 
};

const playersTextures = [];

class Player {
    constructor(characterIndex) {
        this.characterIndex = characterIndex;
        this.speed = SPEED;
        this.direction = DIR_LEFT;

        this.movementTime = 0;
        this.movementStage = STANDING;
        
        this.x = 0;
        this.y = 0;
    }
}

function initPlayer() {
    player = new Player(characterIndex);
    player.x = displayedMap.spawn[X] * TILE_SIZE - PLAYER_SIZE / 2;
    player.y = displayedMap.spawn[Y] * TILE_SIZE - PLAYER_SIZE / 2;
}

function updatePlayer(player) {
    var movement = false;
    player.movementStage = STANDING;

    for(var key in allTheRightMoves) {
        if(keys[key]) {
            movement = true;
            const move = allTheRightMoves[key];
            player.x += move[X] * player.speed;
            player.y += move[Y] * player.speed;
            
            player.direction = dirs[key];
            player.movementStage = getAnimStage(player.movementTime, MOVEMENT_FRAMES, MOVEMENT_FRAME_SPEED);
        }
    }
    if(movement) player.movementTime++;
    else player.movementTime = 0;
}

function renderPlayer(player) {
    const textures = playersTextures[player.characterIndex];

    const renderX = getX(player.x);
    const renderY = getY(player.y);

    const tex = textures[player.direction][player.movementStage];
    tex.draw(ctx, renderX, renderY, PLAYER_SIZE, PLAYER_SIZE);
}

function getX(mapX) {
    return mapX - player.x + X_OFFSET;
}
function getY(mapY) {
    return mapY - player.y + Y_OFFSET;
}