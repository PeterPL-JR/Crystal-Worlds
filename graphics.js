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
    render(ctx, x, y) {
        ctx.drawImage(this.image, x, y);
    }
}