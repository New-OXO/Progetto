const WIDTH = window.innerWidth*2/3;   // larghezza finestra di gioco
const HEIGHT = window.innerHeight;   // altezza finestra di gioco

const SPEED = 10;    // velocità discesa blocchi

// variabili per istanziare gli oggetti delle classi
let player; 
let obstacles;
let sensor;

let cnv; // variabile per finestra di gioco

// funzione per la creazione e centramento della finestra di gioco
function initCanvas() {  
    cnv = createCanvas(WIDTH, HEIGHT);
    centerCanvas();
}

function setup() {
    initCanvas();
    
    player = new Player();  // istanza classe Player
    obstacles = new Container(2, 80, 90);  // probabilità che esca una linea completa di ostacoli , probabilità che escano zero ostacoli , probabilità che escano zero hotdog
    sensor = new SensorPosition();  // istanza classe SensorPosition
}

function draw() {
    background(128);

    // se un ostacolo è colpito:
    if(obstacles.isHit(player.getX(), player.getY())){
        // si guarda se lo score del giocatore è arrivato a zero se sì, si esce dall funzione draw()
        if(player.getScore()==0){
            noLoop();
        }
    }
    // altrimenti se non è stato colpito niente si generano nuovi ostacoli e si muovo quelli già presenti
    else{
        obstacles.generate(player.getScore());
        obstacles.move(); 
    }

    
    obstacles.draw();  // metodo per il disegno degli ostacoli
    obstacles.colliding(player);  // metodo per verificare una collisione con un ostacolo

    player.move(sensor.getDirection());   // metodo per muovere il player sull'asse x 
    player.draw();  // metodo per disegnare il player

}

// funzione per creare delle pause
function pause(millis){   
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

// funzione per centrare la schermata di gioco
function centerCanvas() {
    var x = (window.innerWidth - WIDTH) / 2;
    var y = (window.innerHeight - HEIGHT) / 2;
    cnv.position(x, y);
  }
