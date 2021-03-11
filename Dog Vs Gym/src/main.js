const WIDTH = window.innerWidth*2/3;   // larghezza finestra di gioco
const HEIGHT = window.innerHeight;   // altezza finestra di gioco

const SPEED = 10;    // velocità discesa blocchi

// variabili per istanziare gli oggetti delle classi
let player; 
let container;
let sensor;

let cnv; // variabile per finestra di gioco

let start = false; 

let startBtn;

let bk;

let font;

let speech;

let game, game_over, menu;

let img_game_over;

let dog_head, dog_tail, dog_body;

function preload(){
    game = loadSound('../assets/snd/game_music.mp3');
    game_over = loadSound('../assets/snd/game_over_music.mp3');
    menu = loadSound('../assets/snd/menu_music.mp3');
    img_game_over = loadImage('../assets/img/game_over.png');
    dog_head = loadImage('../assets/img/dog_head.png');
    dog_tail = loadImage('../assets/img/dog_tail.png');
    dog_body = loadImage('../assets/img/dog_body.png');
    font = loadFont("../assets/fonts/DIGIFIT.TTF");
    meadow = loadImage("../assets/img/background_game.jpg");
}

function setup() {

    initCanvas();
    
    player = new Player();  // istanza classe Player
    container = new Container(2, 80, 90);  // probabilità che esca una linea completa di ostacoli , probabilità che escano zero ostacoli , probabilità che escano zero hotdog
    sensor = new SensorPosition();  // istanza classe SensorPosition

    bk = loadImage('../assets/img/background_menu.gif');

    startBtn = new Button(WIDTH / 2 - 200, HEIGHT / 2 + 250, 400, 120, '../assets/img/startBtn.png');

    // Create a Speech Recognition object with callback
    speechRec = new p5.SpeechRec('en-US', gotSpeech);
    // "Continuous recognition" (as opposed to one time only)
    let continuous = true;
    // If you want to try partial recognition (faster, less accurate)
    let interimResults = false;
    // This must come after setting the properties
    speechRec.start(continuous, interimResults);

    // DOM element to display results
    let output = select('#speech');

    // Speech recognized event
    function gotSpeech() {
            // Something is there
            // Get it as a string, you can also get JSON with more info
            console.log(speechRec);
            if (speechRec.resultValue) {
            let said = speechRec.resultString;
            // Show user
            if(said=="start" || said=='Start'){
                start=true;
            }
        }
    }

}

function draw() {
    background(240, 239, 241);

    if(!start) {

        if(!menu.isPlaying()){
            menu.play();
        }

        bg();

        startBtn.draw();
        if(mouseIsPressed) {    
            start = startBtn.isPressed(mouseX, mouseY);
        }
        textAlign(CENTER, CENTER);
        textSize(7);
        text("Icons made byhttps://www.freepik.com from https://www.flaticon.com ---- Sound by https://www.zapsplat.com/", WIDTH/4, HEIGHT-HEIGHT/15);
    } else {
        //background(meadow);
        menu.stop();

        if(!game.isPlaying()){
            game.play();
        }

        background(meadow);

        // se un ostacolo è colpito:
        if(container.isHit(player.getX(), player.getY())){
            // si guarda se lo score del giocatore è arrivato a zero se sì, si esce dall funzione draw()
            if(player.getScore()==0){
                gameOver();
            }
        }
        // altrimenti se non è stato colpito niente si generano nuovi ostacoli e si muovo quelli già presenti
        else{
            container.generate(player.getScore());
            container.move(); 
        }

        
        container.draw();  // metodo per il disegno degli ostacoli
        container.colliding(player);  // metodo per verificare una collisione con un ostacolo

        player.move(sensor.getDirection());   // metodo per muovere il player sull'asse x 
        player.draw();  // metodo per disegnare il player
        }
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

// funzione per la creazione e centramento della finestra di gioco
function initCanvas() {  
    cnv = createCanvas(WIDTH, HEIGHT);
    centerCanvas();
}

function bg() {
    image(bk, -WIDTH/4, 0, windowWidth, windowHeight);
}

function gameOver(){

    player.writeScore();

    game.stop();
    game_over.play();
    
    fill(0, 0, 0, 200);
    rect(0, 0, WIDTH, HEIGHT);

    image(img_game_over, WIDTH/2-650, HEIGHT/2-256, 1256, 512);
    
    noLoop();

    
}