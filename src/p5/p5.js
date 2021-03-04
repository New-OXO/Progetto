let player, food;

function setup() {
    let cnv = createCanvas(windowWidth / 2, windowHeight);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    
    player = new Player(color(255, 255, 255), 50, 15, width, height);
    food = new HotDogs(5, 10, width, height);
}

function draw() {
    background(0);
    
    player.draw();
    if(keyIsDown(LEFT_ARROW)) {
        player.moveLeft();
    } 
    if(keyIsDown(RIGHT_ARROW)) {
        player.moveRight();
    }
    
    food.move();
}
