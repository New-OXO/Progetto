var ostacoli;
var cnv;

const VELOCITA = 100;

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth*2/3;


function setup() {
    ostacoli = new Obstacles(WIDTH, HEIGHT, 2);
    cnv = createCanvas(WIDTH, HEIGHT);
    centerCanvas();
}

function draw(){
    
    if(ostacoli.isHit(dog.getDogX(), dog.getDogY())){
       dog.setScore()  //dentro la funzione bisognerà fare this.score--
    }
    else{
        ostacoli.move();
        ostacoli.createObstacles(dog.getScore());
    }
    background(0);
    ostacoli.draw();
    pause(VELOCITA);

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