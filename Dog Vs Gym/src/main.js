const WIDTH = window.innerWidth / 2;
const HEIGHT = window.innerHeight;

let player;
let obstacles;

function initCanvas() {
    let cnv = createCanvas(windowWidth / 2, windowHeight);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function setup() {
    initCanvas();
    
    player = new Player();
    obstacles = new Container(2, 80);
}

function draw() {
    background(128);

    obstacles.generate(player.getScore());
    obstacles.move(); 
    obstacles.draw();
    //obstacles.colliding(player.dog[0]);

    player.move(getDirection());
    player.draw();
}
