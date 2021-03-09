class Player{

    constructor(){

        this.dimW = this.WIDTH/20/3;
        this.dimH = this.HEIGHT/20/3;

        this.score = 1;

        this.x = WIDTH/2;
        this.y = HEIGHT-HEIGHT/4;

        this.body = new Array([this.x, this.y+this.dimH]);

        this.sprite_head;
        this.sprite_body;
        this,sprite_tail;

        this.setTexture();
    }

    move(x) {
        if(x<0 || x>WIDTH){
            return;
        }
        this.x=WIDTH-x;
        for(let i=0; i<this.body.length; i++){
            pause((i+1)*20);
            this.body[i][0]=WIDTH-x;
        }
    }

    draw() {
        this.sprite_head.position.x = this.body[0][0];
        this.sprite_head.position.y = this.body[0][1];
        drawSprite(this.sprite_head);

        for(let i=1; i<=this.body.length-1; i++){
            this.sprite_body.position.x = this.body[i][0];
            this.sprite_body.position.y = this.body[i][1];
            drawSprite(this.sprite_body);
        }

        this.sprite_tail.position.x = this.body[this.body.length-1][0];
        this.sprite_tail.position.y = this.body[this.body.length-1][1];
        drawSprite(this.sprite_tail);

        
        this.updateScore(); 
    }

    getX(){return this.x;}

    getY(){return this.y;}

    getDimW(){return this.dimW;}

    getDimH(){return this.dimH;}

    getScore(){return this.score;}

    setScore(offset){this.score+=offset;}  // da creare dei controlli

    grow(num) {    
        for(let i = 0; i < num; i++) {
            x = this.x;
            y = this.y + this.dimH * ++this.score;
            
            this.body.push([x,y]);
        }
    }

    setTexture(){
        this.sprite_head = createSprite(this.dimW, this.dimH);
        this.sprite_head.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
        this.sprite_head.addImage('');

        this.sprite_body = createSprite(this.dimW, this.dimH);
        this.sprite_body.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
        this.sprite_body.addImage('');

        this.sprite_tail = createSprite(this.dimW, this.dimH);
        this.sprite_tail.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
        this.sprite_tail.addImage('');
    }
    
    updateScore(){
        fill(0, 0, 0);
        textSize(this.dimH);
        text(this.score, this.x+this.dimW/4, this.y+this.dimH);
    }

}