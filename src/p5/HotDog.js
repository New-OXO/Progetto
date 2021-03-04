function HotDog(cl, speed, wait, scrW, scrH) {
    this.cl = cl;
    this.speed = speed;
    this.wait = wait;
    this.ready = false;
    this.y = 0;
    this.x = 0;
    this.scrW = scrW;
    this.scrH = scrH;
    
    this.generate();
}

HotDog.prototype.generate = function() {
    this.y = 0;
    this.x = int(random(0, this.scrW));
};

HotDog.prototype.translate = function() {
    if(this.y < this.scrH) {
        this.y += this.speed;
    } else {
        this.generate();
    }
};

HotDog.prototype.draw = function() {
    stroke(0);
    strokeWeight(0);
    fill(this.cl);
    ellipse(this.x, this.y, 40, 20);
};

HotDog.prototype.move = function() {
    if(!this.ready) {
        setTimeout(() => {
            this.translate();
            this.draw();
            this.ready = !this.ready;
        }, this.wait);
    } else {
        this.translate();
        this.draw();
    }
};
