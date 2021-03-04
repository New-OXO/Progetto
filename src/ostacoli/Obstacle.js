const R_MINIMO = 127;
const R_MASSIMO = 106;

const G_MINIMO = 255;
const G_MASSIMO = 13;

const B_MINIMO = 212;
const B_MASSIMO = 173;

//r_minimo+((r_massimo-r_minimo)*punteggio/N_MAX_OSTACOLI)

function Obstacle(scrW, scrH, x, score){

    this.scrW = scrW;
    this.scrH = scrH;
    this.dimW = this.scrW/10;
    this.dimH = this.scrH/20;
    this.speed = this.dimH;
    this.score = score;
    this.x = x*this.dimW;
    this.y = 0;
}

Obstacle.prototype.getX = function(){return this.x;}

Obstacle.prototype.getY = function(){return this.y;}

Obstacle.prototype.getDim = function(){return this.dim;}

Obstacle.prototype.getScore = function(){return this.score;}

Obstacle.prototype.draw = function(){
    stroke(0);
    strokeWeight(0);
    this.getColor();
    rect(this.x, this.y, this.dimW, this.dimH, 20);
    
    fill(0, 102, 153);
    textSize(this.dimH);
    text(this.score, this.x+this.dimW/4, this.y+this.dimH);
}

Obstacle.prototype.move = function(){
    if(this.y < this.scrH) {
        this.y += this.speed;
        return true;
    }else{
        return false;
    }
}

Obstacle.prototype.getColor = function(){
    var r = R_MINIMO+((R_MASSIMO-R_MINIMO))*this.score/50; //r_minimo-(()
    var g = G_MINIMO+((G_MASSIMO-G_MINIMO)*this.score)/50;
    var b = B_MINIMO+((B_MASSIMO-B_MINIMO)*this.score)/50;
    fill(r, g, b);
}

/*
c_minimo+((c_massimo-c_minimo)*punteggio/N_MAX_OSTACOLI)
*/


Obstacle.prototype.isHit = function(dog_x, dog_y){
    if(dog_x==this.x && dog_y==this.y){
        this.score--;
        return true;
    }else{
        return false;
    }
}
