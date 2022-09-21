const keys = {};

function keyboard() {
    document.body.onkeydown = function(event) {
        keys[event.key.toUpperCase()] = true;
    }
    document.body.onkeyup = function(event) {
        keys[event.key.toUpperCase()] = false;
    }
}

function mouse() {
}