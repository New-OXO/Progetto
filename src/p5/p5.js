let player, food;
let video, poseNet, pose;

function initPoseNet() {
    video = createCapture(VIDEO);
    //video.size(320, 240);
    
    poseNet = ml5.poseNet(video, () => {
        console.log('PoseNet ready!');
    });
    
    video.hide();
     
    poseNet.on('pose', (poses) => {
        if(poses.length > 0) {
            pose = poses[0].pose;
        }
    });
}

function setup() {    
    let cnv = createCanvas(windowWidth / 2, windowHeight);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    
    initPoseNet();
    
    player = new Player(15, width, height);
    food = new HotDogs(5, 10, width, height);
}

function draw() {    
    background(0);
    
    player.draw();
    if(pose) {
        player.setX((pose.leftShoulder.x + pose.rightShoulder.x) / 2);
    }
    
    food.move();
}
