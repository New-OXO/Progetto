const R_MINIMO = 127;
const R_MASSIMO = 106;

const G_MINIMO = 255;
const G_MASSIMO = 13;

const B_MINIMO = 212;
const B_MASSIMO = 173;

class Obstacle extends ObjectGame{
    constructor(x, score){
        super(x, score);
    }

    /*getColor(){
        var r = R_MINIMO+((R_MASSIMO-R_MINIMO)*this.score)/50;
        var g = G_MINIMO+((G_MASSIMO-G_MINIMO)*this.score)/50;
        var b = B_MINIMO+((B_MASSIMO-B_MINIMO)*this.score)/50;
        fill(r, g, b);
    }*/

    isHit(dog_x, dog_y, dim){
        dog_x +=dim/2;
        dog_y+=dim;
        var x = super.getX();
        var y = super.getY();
        if((dog_x>=x && dog_x<=x+(super.getDimW())) && (dog_y>=y && dog_y<=y+(super.getDimH()))){
            super.setScore(-1);
            return true;
        }else{
            return false;
        }
    }

    }
/*
//In via di sviluppo
Obstacle.prototype.isNear = function(player_x, player_y){
    if((player_x>this.x && player_x<this.x+this.dimW) && (player_y>this.y && player_y<this.y+this.dimH)){
        return true;
    }else{
        return false;
    }
    
}
Obstacle.prototype.colliding = function(dog_sprite){
    this.sprite.collide(dog_sprite, () => {
        console.log("Ostacolo colpito!");
    });
}
*/
