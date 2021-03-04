let player, food;
let video, poseNet, pose;

function initPoseNet() {
    video = createCapture(VIDEO);
    video.size(320, 200);
    
    poseNet = ml5.poseNet(this.video, () => { console.log('PoseNet ready!'); });
    
    //video.hide();
    
    poseNet.on('pose', (poses) => {
        console.log(poses);
        if(poses.length > 0) {
            pose = poses[0].pose;
        }
    });
}

function setup() {
    initPoseNet();
    
    let cnv = createCanvas(windowWidth / 2, windowHeight);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    
    player = new Player(color(255, 255, 255), 50, 15, width, height);
    food = new HotDogs(5, 10, width, height);
}

function draw() {    
    background(0);
    
    if(pose) {
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 16);
    }
    
    player.draw();
    if(false) {
        player.moveLeft();
    } else if(false) {
        player.moveRight();
    }
    
    food.move();
}
