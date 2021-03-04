function Player(cl, dimCrc, speed, scrW, scrH) {
    this.speed = speed;
    this.dim = 1;
    this.x = scrW / 2;
    this.scrW = scrW;
    this.scrH = scrH;
}

Player.prototype.setX = function(x) {
    this.x = x;
};

Player.prototype.draw = function() {
    stroke(0);
    strokeWeight(0);
    fill(color(255, 0, 0));
    ellipse(this.x, this.scrH - this.scrH / 4, 30);
};
