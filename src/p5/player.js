function Player(cl, dimCrc, speed, scrW, scrH) {
    this.cl = cl;
    this.dimCrc = dimCrc;
    this.speed = speed;
    this.dim = 1;
    this.x = scrW / 2;
    this.y = scrH - scrH / 4;
    this.scrW = scrW;
    this.scrH = scrH;
}

Player.prototype.moveLeft = function() {
    if(this.x - this.dimCrc >= 0) {    
        this.x -= this.speed;
    }
};

Player.prototype.moveRight = function() {
    if(this.x + this.dimCrc <= this.scrW) {
        this.x += this.speed;
    }
};

Player.prototype.draw = function() {
    stroke(0);
    strokeWeight(0);
    fill(this.cl);
    circle(this.x, this.y, this.dimCrc);
};
