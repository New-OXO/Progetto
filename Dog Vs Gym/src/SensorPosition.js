const RANGE_EQUAL = WIDTH/12;


class SensorPosition{
    constructor(){
        this.video;
        this.poseNet;
        this.pose;

        this.initPoseNet();

        this.posX_pre=0;

        this.initSpeechRecognize();

        this.speechRec;

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
        var posX = this.pose.nose.x;
        var result;

        if(posX>=this.posX_pre-RANGE_EQUAL/2 && posX<=this.posX_pre+RANGE_EQUAL/2){
            result = "equal";
        }else if(posX<this.posX_pre-RANGE_EQUAL/2){
            result = "left";
        }else if(posX>this.posX_pre+RANGE_EQUAL/2){
            result = "right"
        }

        this.posX_pre = posX;
        return result;
    }


    initSpeechRecognize(){
        // Create a Speech Recognition object with callback
        speechRec = new p5.SpeechRec('it', gotSpeech);
        // "Continuous recognition" (as opposed to one time only)
        let continuous = true;
        // If you want to try partial recognition (faster, less accurate)
        let interimResults = false;
        // This must come after setting the properties
        speechRec.start(continuous, interimResults);
        // DOM element to display results
        let output = select('#speech');
        this.gotSpeech();
    }

    gotSpeech() {
        // Something is there
        // Get it as a string, you can also get JSON with more info
        console.log(speechRec);
        if (speechRec.resultValue) {
            let said = speechRec.resultString;
            // Show user
            output.html(said);
            return said;
        }
    }    
}

