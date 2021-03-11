/*
Classe per rappresentare un hotdog
*/

class Hotdog extends ObjectGame{
    constructor(x, score) {
        super(x*2, score, loadImage('../assets/img/hotdog.png'), WIDTH/20, HEIGHT/20);  // richiamo del costruttore per istanziare un oggetto ti tipo ObjectGame
        this.sprite.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
    }


    // metodo per settare il collider
    colliding() { 
        this.sprite.collide(player.dog[0], () => {
            console.log('Hotdog colpito!'+ this.score);
            player.grow(this.score);
            player.playAudioEat();
            this.score=0;
        });
    }
}
