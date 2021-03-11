/*
Classe per la gestione degli input da poseNet
*/

class SensorPosition{
    constructor(){
        this.video;
        this.poseNet;
        this.pose;

        this.initPoseNet();

        this.posX_pre=0;
    }

    // metodo per inizializzare poseNet
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

    // metodo per ottenere la direzione che si è fatta con il corpo
    getDirection(){
        if(this.pose){

            let result;
            let posX = this.pose.nose.x;
            
            if(posX - this.posX_pre > 0) {
                result = 'left';
            } else if(posX - this.posX_pre < 0) {
                result = 'right';
            } else {
                result = 'NONE';
            }
            
            player.setSpeed(Math.abs(posX - this.posX_pre));
            
            this.posX_pre = posX;
            
            return result;
            }
        }
}  


