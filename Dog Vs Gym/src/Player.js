const TX_WIDTH = 35;
const TX_HEIGHT = 35;

const WAIT = 20;

class Player {
    constructor() {
        this.score = 1;

        this.speed = 15;

        this.dog = [];

        this.dog.push(createSprite(WIDTH / 2, HEIGHT - HEIGHT / 5, TX_WIDTH, TX_HEIGHT));
        this.dog[0].addImage(loadImage('../assets/img/dog_head.png'));
        this.dog[0].setCollider('rectangle', 0, 0, TX_WIDTH, TX_HEIGHT);

        this.dog.push(createSprite(WIDTH / 2, HEIGHT - HEIGHT / 5 + TX_HEIGHT, TX_WIDTH, TX_HEIGHT));
        this.dog[1].addImage(loadImage('../assets/img/dog_tail.png'));

        this.grow(1);

        this.bark = loadSound('../assets/snd/dog_bark.mp3');
        this.gym = loadSound('../assets/snd/dog_gym.mp3');
        this.eat = loadSound('../assets/snd/dog_eat.mp3');
    }

    getX() {return this.dog[0].position.x;}  // metodo per ritornare le coordinate x della testa

    getY() {return this.dog[0].position.y-TX_HEIGHT/2;}  // metodo per ritornare le coordinate y della testa

    getScore() {return this.score;}  // metodo per ritornare lo score

    setSpeed(speed) {this.speed = speed;}  // metodo per settare lo speed

    // metodo per creare un nuovo sprite
    newSprite() {
        this.dog[this.dog.length - 1].position.y = HEIGHT - HEIGHT / 5 + TX_HEIGHT * ++this.score;

        this.dog.splice(this.dog.length - 1, 0, createSprite(this.dog[this.dog.length - 1].position.x,HEIGHT - HEIGHT / 5 + TX_HEIGHT * (this.score - 1), TX_WIDTH, TX_HEIGHT));
        this.dog[this.dog.length - 2].addImage(loadImage('../assets/img/dog_body.png'));
    }

    // metodo per muovere il corpo del player sull'asse x
    move(direction) {
        let offset = 0;

        switch(direction) {  // in base alla direzione:
            case 'center_screen':
                this.dog[0].position.x = WIDTH / 2;     // setto la x a meta dello schermo
                break;

            case 'left':
                offset -= this.speed;  // setto l'offset alla velocità negativa
                break;

            case 'right':
                offset += this.speed;  // setto l'offset a 
                break;
        }

        if(this.dog[0].position.x + offset < 0 || this.dog[0].position.x + offset > WIDTH) {
            return;
        }

        this.dog[0].position.x += offset;
        for(let i = 1; i < this.dog.length; i++) {
            //setTimeout(() => {
                this.dog[i].position.x = this.dog[0].position.x;
            //}, WAIT * i);
        }
    }

    // metodo per disegnare il corpo del player
    draw() {
        for(let i = 0; i < this.dog.length; i++) {
            drawSprite(this.dog[i]);
        }

        this.writeScore();
    }

    // metodo per fare allungare il corpo del player
    grow(num) {    
        for(let i = 0; i < num; i++) {
            this.newSprite();
        }
    }

    // metodo per rimuovere un elemento dal corpo del player
    remove(){
        this.score-=1;
        this.dog[this.dog.length-1].position.y=this.dog[this.dog.length-2].position.y;
        this.dog[this.dog.length-1].position.x=this.dog[this.dog.length-2].position.x;
        this.dog[this.dog.length-2].remove;
        this.dog.splice(this.dog.length-2, 1); 
    }

    // metodo per aggiornare lo score del player
    writeScore(){
        fill('#000000');
        textFont(font);
        textSize(TX_HEIGHT);
        textAlign(CENTER, CENTER);
        if(this.dog.length!=0){
            text(this.score, this.dog[0].position.x + TX_WIDTH, this.dog[0].position.y);
        }else{
            this.score = 0;
        }
    }

    playAudioBark(){
        this.bark.play();
    }

    playAudioGym(){
        this.gym.play();
    }

    playAudioEat(){
        this.eat.play();
    }
}