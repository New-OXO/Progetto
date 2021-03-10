class ObjectGame{

    constructor(x, score, image, dimW, dimH){
        this.dimW = dimW;
        this.dimH = dimH;
        this.speed = this.dimH/SPEED;
        this.score = score;
        this.sprite;
        this.image = image;
        this.setTexture();
        this.x = x*this.dimW;
        this.y = -this.dimH;
        this.sprite.position.x = (x*this.dimW)+this.dimW/2;
        this.sprite.position.y = -this.dimH/2;
        this.sprite.debug = true;
    }

    getX(){return this.x;}

    getY(){return this.y;}

    getDimW(){return this.dimW;}

    getDimH(){return this.dimH;}

    getScore(){return this.score;}

    setScore(offset){this.score +=offset;}

    draw(){
        imageMode(CORNER);
        image(this.image, this.x, this.y, this.dimW, this.dimH);
        drawSprite(this.sprite);
        this.updateScore(); 
    }

    move(){
        if(this.y < HEIGHT) {
            this.sprite.position.y += this.speed;
            this.y += this.speed;
            return true;
        }else{
            return false;
        }
    }

    setTexture(){
        this.sprite = createSprite(0, 0, this.dimW, this.dimH);
        //this.sprite.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
        this.sprite.visible = false;
    }
    
    updateScore(){
        fill(0, 0, 0);
        textSize(this.dimH);
        text(this.score, this.x+this.dimW/4, this.y+this.dimH);
    }

    isHit(){
        if(this.score==0){
            return true;
        }else{
            return false;
        }
    }

}
