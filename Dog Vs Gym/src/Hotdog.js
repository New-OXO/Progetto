class Hotdog extends ObjectGame{
    constructor(x, score) {
        super(x, score, '../assets/img/hotdog.png');
    }

    colliding(dog_sprite) {
        this.sprite.collide(dog_sprite, () => {
            console.log('Hotdog colpito!');
        });
    }
}
