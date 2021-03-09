class ObjectGame{

    constructor(x, score){

        this.dimW = this.WIDTH/10;
        this.dimH = this.HEIGHT/20;

        this.speed = 1;
        this.score = score;

        this.sprite.position[0] = x*this.dimW;
        this.sprite.position[1] = 0;

        this.path_image = './';
        this.sprite;
        this.setTexture();
    }

    getX(){return this.sprite.position[0];}

    getY(){return this.sprite.position[1];}

    getDimW(){return this.dimW;}

    getDimH(){return this.dimH;}

    getScore(){return this.score;}

    setScore(offset){this.score +=offset;}

    draw(){
        drawSprite(this.sprite);
        this.updateScore(); 
    }

    move(){
        if(this.sprite.position[1] < this.scrH) {
            this.sprite.position[1] += this.speed;
            return true;
        }else{
            return false;
        }
    }

    setTexture(){
        this.sprite = createSprite(this.dimW, this.dimH);
        this.sprite.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
        this.sprite.addImage(this.path_image);
    }
    
    updateScore(){
        fill(0, 0, 0);
        textSize(this.dimH);
        text(this.score, this.x+this.dimW/4, this.y+this.dimH);
        
    }

}
