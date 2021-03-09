class ObjectGame{

    constructor(x, score){
        this.scrW = WIDTH;
        this.scrH = HEIGHT;
        this.dimW = WIDTH/10;
        this.dimH = HEIGHT/20;
        this.speed = this.dimH;
        this.score = score;
        this.sprite;
        this.path_image = './';
        this.setTexture();
        this.x = x*this.dimW;
        this.y = 0;
        this.sprite.position.x = (x*this.dimW)+this.dimW/2;
        this.sprite.position.y = 0+this.dimH/2;
    }

    getX(){return this.x;}

    getY(){return this.y;}

    getDimW(){return this.dimW;}

    getDimH(){return this.dimH;}

    getScore(){return this.score;}

    setScore(offset){this.score +=offset;}

    draw(){
        drawSprite(this.sprite);
        this.updateScore(); 
    }

    move(){
        if(this.y < this.scrH) {
            this.sprite.position.y += this.speed;
            this.y +=this.speed;
            return true;
        }else{
            return false;
        }
    }

    setTexture(){
        this.sprite = createSprite(0, 0, this.dimW, this.dimH);
        this.sprite.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
        //this.sprite.addImage(loadImage('./image.png'));
    }
    
    updateScore(){
        fill(0, 0, 0);
        textSize(this.dimH);
        text(this.score, this.x+this.dimW/4, this.y+this.dimH);
        
    }

    isHit(){}

}
