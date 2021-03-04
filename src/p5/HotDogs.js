function HotDogs(min, max, scrW, scrH) {
    this.hds = [];
    this.qt = 0;
    this.min = min;
    this.max = max;
    this.scrW = scrW;
    this.scrH = scrH;
    
    this.generate();
}

HotDogs.prototype.generate = function() {
    this.qt = int(random(this.min, this.max));
    this.hds = [];
    
    for(let i = 0; i < this.qt; i++) {
        this.hds.push(new HotDog(color('#f9906f'), 5, int(random(2000, 4000)), this.scrW, this.scrH));
    }
};

HotDogs.prototype.move = function() {
    for(let i = 0; i < this.qt; i++) {
        this.hds[i].move();
    }
};
