const _IMAGES_PATH = "assets/textures/";

class ImgAsset {
    constructor(path) {
        this.path = path;
        this.load();
    }
    load() {
        this.image = document.createElement("img");
        this.image.src = this.path;
    }
    draw(ctx, x, y, width, height) {
        if(!width || !height) {
            width = this.image.width;
            height = this.image.height;
        }
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.image, x, y, width, height);
    }
}