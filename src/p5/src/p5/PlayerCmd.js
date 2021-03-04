function PlayerCmd() {
    this.video = createCapture(VIDEO);
    this.poseNet = ml5.poseNet(this.video, modelLoaded);
    
    this.video.hide();
}

function modelLoaded() {
    console.log('posNet ready');
}

/*PlayerCmd.prototype. = function() {
};*/
