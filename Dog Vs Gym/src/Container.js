const NUMBER_MAX_OBSTACLE = 10;
const NUMBER_MIN_OBSTACLE = 0;
const AVERAGE_NUMBER_OBSTACLE = 2;
const NUMBER_MAX_HOTDOG = 2;
const NUMBER_MIN_HOTDOG = 1;

const SCORE_MIN = 1;
const SCORE_MAX_OB = 50;
const SCORE_MAX_HD = 10;

class Container{
    constructor(probability_max_obstacles, probability_zero, probability_zero_hotdog){
        this.probability_max_obstacles = probability_max_obstacles;
        this.probability_zero = probability_zero;
        this.probability_zero_hotdog = probability_zero_hotdog;
        this.array_object = new Array();
        this.coordinate_x  = new Array();
        this.index=0;
    }

    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    newSetOfObstacle(n_random, score_dog){
        for(let i=0; i<n_random; i++){
            this.array_object.push(new Obstacle(this.calculatePosition(), this.getScoreOb(i, score_dog)));
        }
    }

    newSetOfHotdog(n_random, score_dog){
        for(let i=0; i<n_random; i++){
            this.array_object.push(new Hotdog(this.calculatePosition(), this.getScoreHd(n_random, score_dog)));
        }
    }

    move(){
        for(let i=0; i<this.array_object.length; i++){
            if(!this.array_object[i].move()){
                this.array_object[i].sprite.remove();
                this.array_object.splice(i,1);
                i--;
            }
        }
    }

    generate(score_dog){
        if(this.index==SPEED-1){
            this.coordinate_x = [];
            var n_random_ob, n_random_hd = 0;
            if(Math.random() < (this.probability_max_obstacles/100)){
                n_random_ob = NUMBER_MAX_OBSTACLE;
            }else{
                if(Math.random() < (this.probability_zero/100)){
                    n_random_ob = 0;
                }
                else{
                    n_random_ob = this.getRandomNumber(NUMBER_MIN_OBSTACLE, AVERAGE_NUMBER_OBSTACLE);
                }
                if(Math.random() > (this.probability_zero_hotdog/100)){
                    n_random_hd = this.getRandomNumber(NUMBER_MIN_HOTDOG, NUMBER_MAX_HOTDOG);
                }
            }
            this.newSetOfObstacle(n_random_ob, score_dog);
            this.newSetOfHotdog(n_random_hd, score_dog);
            this.index=0;
        }else{
            this.index++;
        }
    }

    getScoreOb(num_obstacle, score_dog){
        if(num_obstacle==NUMBER_MAX_OBSTACLE-1){
            return this.getRandomNumber(SCORE_MIN, score_dog-1);
        }else{
            return this.getRandomNumber(SCORE_MIN, SCORE_MAX_OB);
        }
    }

    getScoreHd(){
        return this.getRandomNumber(SCORE_MIN, SCORE_MAX_HD);
    }

    draw(){
        for(let i=0; i<this.array_object.length; i++){
            this.array_object[i].draw();
        }
    }

    calculatePosition(){
        var condizione=true;
        var x;
        while(condizione){
            x = this.getRandomNumber(NUMBER_MIN_OBSTACLE, NUMBER_MAX_OBSTACLE-1);
            condizione = false;
            for (let i = 0; i< this.coordinate_x.length; i++){
                if(x == this.coordinate_x[i]){
                    condizione = true;
                }
            }
        }
        this.coordinate_x.push(x);
        return x;
    }

    isHit(dog_x, dog_y){
        for(let i=0; i<this.array_object.length; i++){
            if(this.array_object[i].isHit(dog_x, dog_y)){
                if(this.array_object[i].getScore()<=0){
                    this.array_object.splice(i,1);
                }
                return true;
            }
        }
        return false;
    }

    colliding(dog) {
        for(let i = 0; i < this.array_object.length; i++){
            this.array_object[i].colliding(dog);
        }
    }
}
