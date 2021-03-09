const RANGE_EQUAL = WIDTH/12;
const RANGE_CENTER = WIDTH/4;


class SensorPosition{
    constructor(){
        this.video;
        this.poseNet;
        this.pose;

        this.initPoseNet();

        this.posX_pre=0;
    }

    initPoseNet() {
        this.video = createCapture(VIDEO);
        this.video.size(width, height);
        
        this.poseNet = ml5.poseNet(this.video, () => {
            console.log('PoseNet ready!');
        });
        
        this.video.hide();
         
        this.poseNet.on('pose', (poses) => {
            if(poses.length > 0) {
                this.pose = poses[0].pose;
            }
        });
    }

    getPose(){return this.pose;}

    getDirection(){
        var posX = WIDTH-this.pose.nose.x;
        var result;
        if(posX>WIDTH/2-RANGE_CENTER/2 && posX<WIDTH/2+RANGE_CENTER/2){
            result="center_screen";
        }else if(posX>=this.posX_pre-RANGE_EQUAL/2 && posX<=this.posX_pre+RANGE_EQUAL/2){
            result = "equal";
        }else if(posX<this.posX_pre-RANGE_EQUAL/2){
            result = "left";
        }else if(posX>this.posX_pre+RANGE_EQUAL/2){
            result = "right"
        }

        this.posX_pre = posX;
        return result;
    }  
}

