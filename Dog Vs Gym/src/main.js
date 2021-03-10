const WIDTH = window.innerWidth*2/3;
const HEIGHT = window.innerHeight;

const SPEED = 10;

let player;
let obstacles;
let sensor;

let cnv;

function initCanvas() {
    cnv = createCanvas(WIDTH, HEIGHT);
    centerCanvas();
}

function setup() {
    initCanvas();
    
    player = new Player();
    obstacles = new Container(2, 80, 90);  // probabilità che esca una linea completa di ostacoli / probabilità che escano zero ostacoli / probabilità zero hotdog
    sensor = new SensorPosition();
}

function draw() {
    background(128);

    if(obstacles.isHit(player.getX(), player.getY())){
        if(player.getScore()==0){
            noLoop();
        }
    }
    else{
        obstacles.generate(player.getScore());
        obstacles.move(); 
    }

    
    obstacles.draw();
    obstacles.colliding(player);

    player.move(sensor.getDirection());
    player.draw();

}

function pause(millis){
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

function centerCanvas() {
    var x = (window.innerWidth - WIDTH) / 2;
    var y = (window.innerHeight - HEIGHT) / 2;
    cnv.position(x, y);
  }
