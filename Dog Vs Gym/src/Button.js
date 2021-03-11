class Button {
    constructor(x, y, w, h, texture_path) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.texture = loadImage(texture_path);
    }

    draw() {
        imageMode(CORNER);
        image(this.texture, this.x, this.y, this.w, this.h);
    }

    isPressed(x, y) {
        if(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
            return true;
        }

        return false;
    }
}