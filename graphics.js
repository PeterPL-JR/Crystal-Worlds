const _IMAGES_PATH = "assets/textures/";

class ImgAsset {
    constructor(source, sx, sy, swidth, sheight) {
        if(isDefined(sx) && isDefined(sy) && isDefined(swidth) && isDefined(sheight)) {
            this.sx = sx;
            this.sy = sy;

            this.swidth = swidth;
            this.sheight = sheight;
        }
        this.source = source;
        this.load();
    }
    load() {
        if(this.source.constructor.name == "String") {
            this.image = loadImage(this.source);
        }
        if(this.source.constructor.name == "HTMLImageElement") {
            this.image = this.source;
        }
    }
    draw(ctx, x, y, width, height) {
        if(!width || !height) {
            if(!this.swidth || !this.sheight) {
                width = this.image.width;
                height = this.image.height;
            } else {                
                width = this.swidth;
                height = this.sheight;
            }
        }
        ctx.imageSmoothingEnabled = false;
        if(isDefined(this.sx) && isDefined(this.sy) && isDefined(this.swidth) && isDefined(this.sheight)) {
            ctx.drawImage(this.image, this.sx, this.sy, this.swidth, this.sheight, x, y, width, height);
        } else {
            ctx.drawImage(this.image, x, y, width, height);
        }
    }
}

function loadImage(path) {
    var img = document.createElement("img");
    img.src = path;
    return img;
}

class AnimStage {
    constructor(minTime, maxTime) {
        this.minTime = minTime;
        this.maxTime = maxTime;
    }
}

function getStagesArray(frames, frameTime) {
    const array = [];
    for(var t = 0; t < frames * frameTime; t += frameTime) {
        const minTime = t;
        const maxTime = t + frameTime - 1;
        array.push(new AnimStage(minTime, maxTime));
    }
    return array;
}

function getAnimStage(time, stagesArray, frameTime) {
    const stages = stagesArray.length;

    for(var s = 0; s < stages; s++) {
        const stage = stagesArray[s];
        const modulo = time % (stages * frameTime);

        if(modulo >= stage.minTime && modulo <= stage.maxTime) {
            return s;
        }
    }
}