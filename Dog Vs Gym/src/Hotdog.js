class Hotdog extends ObjectGame{
    constructor(x, score) {
        super(x*2, score, loadImage('../assets/img/hotdog.png'), WIDTH/20, HEIGHT/20);
        this.sprite.setCollider("rectangle", 0, 0, this.dimW, this.dimH);
    }

    colliding() {
        this.sprite.collide(player.dog[0], () => {
            console.log('Hotdog colpito!'+ this.score);
            player.grow(this.score);
            this.score=0;
        });
    }
}
