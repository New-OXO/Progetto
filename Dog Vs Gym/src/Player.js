const TX_WIDTH = 64;
const TX_HEIGHT = 64;

const WAIT = 20;

class Player {
    constructor() {
        this.score = 1;

        this.speed = 15;

        this.dog = [];

        this.dog.push(createSprite(WIDTH / 2, HEIGHT / 2, TX_WIDTH, TX_HEIGHT));
        this.dog[0].addImage(loadImage('../assets/img/dog0.png'));
        this.dog[0].setCollider('rectangle', 0, 0, TX_WIDTH, TX_HEIGHT);

        this.dog.push(createSprite(WIDTH / 2, HEIGHT / 2 + TX_HEIGHT, TX_WIDTH, TX_HEIGHT));
        this.dog[1].addImage(loadImage('../assets/img/dog1.png'));
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getScore() {
        return this.score;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    newSprite() {
        this.dog[this.dog.length - 1].position.y = HEIGHT / 2 + TX_HEIGHT * ++this.score;

        this.dog.splice(this.dog.length - 1, 0, createSprite(this.dog[this.dog.length - 1].position.x,
                                                             HEIGHT / 2 + TX_HEIGHT * (this.score - 1), TX_WIDTH, TX_HEIGHT));
        this.dog[this.dog.length - 2].addImage(loadImage('../assets/img/dog2.png'));
    }

    //main
    move(direction) {
        let offset = 0;

        switch(direction) {
            case 'CENTER_SCREEN':
                this.dog[0].position.x = WIDTH / 2;
                break;

            case 'LEFT':
                offset -= this.speed;
                break;

            case 'RIGHT':
                offset += this.speed;
                break;
        }

        if(this.dog[0].position.x + offset < 0 || this.dog[0].position.x + offset > WIDTH) {
            return;
        }

        this.dog[0].position.x += offset;
        for(let i = 1; i < this.dog.length; i++) {
            setTimeout(() => {
                this.dog[i].position.x += offset;
            }, WAIT * i);
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

    writeScore(){
        fill('#000000');
        textSize(TX_HEIGHT);
        textAlign(CENTER, CENTER);
        text(this.score, this.dog[0].position.x + TX_WIDTH, this.dog[0].position.y);
    }
}