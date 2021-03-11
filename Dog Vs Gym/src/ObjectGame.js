class ObjectGame{
//Inizializzo alcune variabili
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
//Creo alcuni metodi setter e getter
    getX(){return this.x;}

    getY(){return this.y;}

    getDimW(){return this.dimW;}

    getDimH(){return this.dimH;}

    getScore(){return this.score;}

    setScore(offset){this.score +=offset;}
//Disegno lo sprite, l'immagine che ho passato come parametro al costruttore e aggiorno il punteggio
    draw(){
        imageMode(CORNER);
        image(this.image, this.x, this.y, this.dimW, this.dimH);
        drawSprite(this.sprite);
        this.updateScore(); 
    }
//Se y non è minore dell'altezza della finestra ritorna false altrimenti "abbassa" l'ostacolo di speed
    move(){
        if(this.y < HEIGHT) {
            this.sprite.position.y += this.speed;
            this.y += this.speed;
            return true;
        }else{
            return false;
        }
    }
//Setto la texture dell'oggetto
    setTexture(){
        this.sprite = createSprite(0, 0, this.dimW, this.dimH);
        //this.sprite.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
        this.sprite.visible = false;
    }
    //"Disegno lo score
    updateScore(){
        fill(0, 0, 0);
        textFont(font);
        textAlign(RIGHT, CENTER);
        textSize(this.dimH*2/3);
        text(this.score, this.x+this.dimW/2, this.sprite.position.y-this.dimH/6);
    }
//La funzione is hit verifica che il punteggio sia a 0.
    isHit(){
        if(this.score==0){
            return true;
        }else{
            return false;
        }
    }

}
