const TX_WIDTH = WIDTH/20;
const TX_HEIGHT = HEIGHT/20;

const WAIT = 20;

class Player {
    constructor() {
        this.score = 1;

        this.speed = 15;

        this.dog = [];

        this.dog.push(createSprite(WIDTH / 2, HEIGHT - HEIGHT / 5, TX_WIDTH, TX_HEIGHT));
        this.dog[0].addImage(loadImage('../assets/img/dog_head.jpeg'));
        this.dog[0].setCollider('rectangle', 0, 0, TX_WIDTH, TX_HEIGHT);

        this.dog.push(createSprite(WIDTH / 2, HEIGHT - HEIGHT / 5 + TX_HEIGHT, TX_WIDTH, TX_HEIGHT));
        this.dog[1].addImage(loadImage('../assets/img/dog_tail.jpeg'));

        this.grow(1);
    }

    getX() {return this.dog[0].position.x;}

    getY() {return this.dog[0].position.y-TX_HEIGHT/2;}

    getScore() {return this.score;}

    setSpeed(speed) {this.speed = speed;}

    newSprite() {
        this.dog[this.dog.length - 1].position.y = HEIGHT - HEIGHT / 5 + TX_HEIGHT * ++this.score;

        this.dog.splice(this.dog.length - 1, 0, createSprite(this.dog[this.dog.length - 1].position.x,HEIGHT - HEIGHT / 5 + TX_HEIGHT * (this.score - 1), TX_WIDTH, TX_HEIGHT));
        this.dog[this.dog.length - 2].addImage(loadImage('../assets/img/dog_body.jpeg'));
    }

    //main
    move(direction) {
        let offset = 0;

        switch(direction) {
            case 'center_screen':
                this.dog[0].position.x = WIDTH / 2;
                break;

            case 'left':
                offset -= this.speed;
                break;

            case 'right':
                offset += this.speed;
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

    //main
    draw() {
        for(let i = 0; i < this.dog.length; i++) {
            drawSprite(this.dog[i]);
        }

        this.writeScore();
    }

    grow(num) {    
        for(let i = 0; i < num; i++) {
            this.newSprite();
        }
    }

    remove(){
        this.score-=1;
        this.dog[this.dog.length-1].position.y=this.dog[this.dog.length-2].position.y;
        this.dog[this.dog.length-1].position.x=this.dog[this.dog.length-2].position.x;
        this.dog[this.dog.length-2].remove;
        this.dog.splice(this.dog.length-2, 1); 
    }

    writeScore(){
        fill('#000000');
        textSize(TX_HEIGHT);
        textAlign(CENTER, CENTER);
        text(this.score, this.dog[0].position.x + TX_WIDTH, this.dog[0].position.y);
    }
}