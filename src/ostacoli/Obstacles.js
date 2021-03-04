const NUMBER_MAX_OBSTACLE = 10;
const NUMBER_MIN_OBSTACLE = 0;
const AVERAGE_NUMBER_OBSTACLE = 2;

const SCORE_MIN = 1;
const SCORE_MAX = 50;

const PROBABILITY_ZERO = 80

function Obstacles(scrW, scrH, probability){
    this.scrH = scrH;
    this.scrW = scrW;
    this.probability = probability;
    this.array_obstacle = new Array();
    this.coordinate_x  = new Array();
}

Obstacles.prototype.getRandomNumber = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

Obstacles.prototype.newSetOfObstacle = function(n_random, score_dog){
    
    this.coordinate_x = [];
    for(let i=0; i<n_random; i++){
        this.array_obstacle.push(new Obstacle(this.scrW, this.scrH, this.calculatePosition(), this.getScore(n_random, score_dog)));
    }
}

Obstacles.prototype.move = function(){
    for(let i=0; i<this.array_obstacle.length; i++){
        if(!this.array_obstacle[i].move()){
            this.array_obstacle.splice(i,1);
        }
    }
}

Obstacles.prototype.createObstacles = function(score_dog){
    var n_random;
    if(Math.random() < (this.probability/100)){
        n_random = NUMBER_MAX_OBSTACLE;
    }else{
        if(Math.random() < (PROBABILITY_ZERO/100)){
            n_random = 0;
        }
        else{
            n_random = this.getRandomNumber(NUMBER_MIN_OBSTACLE, AVERAGE_NUMBER_OBSTACLE);
        }
    }
    this.newSetOfObstacle(n_random, score_dog);
}

Obstacles.prototype.getScore = function(num_obstacle, score_dog){
    if(num_obstacle==5){
        return this.getRandomNumber(SCORE_MIN, score_dog-1);
    }else{
        return this.getRandomNumber(SCORE_MIN, SCORE_MAX);
    }
}

Obstacles.prototype.draw = function(){
    for(let i=0; i<this.array_obstacle.length; i++){
        this.array_obstacle[i].draw();
    }
}

Obstacles.prototype.calculatePosition = function(){
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

Obstacles.prototype.isHit = function(dog_x, dog_y){
    for(let i=0; i<this.array_obstacle.length; i++){
        if(this.array_obstacle[i].isHit(dog_x, dog_y)){
            if(this.array_obstacle[i].getScore()<=0){
                this.array_obstacle.splice(i,1);
            }
            return true;
        }
    }
    return false;
}
