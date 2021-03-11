//Definisco alcune costanti
const NUMBER_MAX_OBSTACLE = 10;
const NUMBER_MIN_OBSTACLE = 0;
const AVERAGE_NUMBER_OBSTACLE = 2;
const NUMBER_MAX_HOTDOG = 2;
const NUMBER_MIN_HOTDOG = 1;

const SCORE_MIN = 1;
const SCORE_MAX_OB = 50;
const SCORE_MAX_HD = 10;

class Container{
    /*Nel costruttore vengono passati tre parametri:
        - la probabilità che ci sia una fila piena di ostacoli
        - la probabilità che non siano presenti ostacoli in una riga
        - la probabilità che non ci siano hotdog
        Settando diversamente queste variabili si può modificare la difficoltà del gioco.
    */
    constructor(probability_max_obstacles, probability_zero, probability_zero_hotdog){
        this.probability_max_obstacles = probability_max_obstacles;
        this.probability_zero = probability_zero;
        this.probability_zero_hotdog = probability_zero_hotdog;
        this.array_object = new Array();
        this.coordinate_x  = new Array();
        this.index=0;
    }
    
    //Questo metodo estrae a sorte un numero intero tra min e max.
    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    //Istanzio n_random Obstacle
    newSetOfObstacle(n_random, score_dog){
        for(let i=0; i<n_random; i++){
            this.array_object.push(new Obstacle(this.calculatePosition(), this.getScoreOb(i, score_dog)));
        }
    }
    //Istanzio n_random Hotdog
    newSetOfHotdog(n_random, score_dog){
        for(let i=0; i<n_random; i++){
            this.array_object.push(new Hotdog(this.calculatePosition(), this.getScoreHd()));
        }
    }
    
    //Sposto sia gli ostacoli che gli hotdog di speed in basso e se è fuori dallo schermo viene eliminato
    move(){
        for(let i=0; i<this.array_object.length; i++){
            if(!this.array_object[i].move()){
                this.array_object[i].sprite.remove();
                this.array_object.splice(i,1);
                i--;
            }
        }
    }
    //Genero in maniera randomica la nuova riga
    generate(score_dog){
        //Visto che la SPEED è minore dell'altezza di un ostacolo, solo quando l'indice è SPEED-1 si creano nuovi elementi
        if(this.index==SPEED-1){
            this.coordinate_x = [];
            var n_random_ob, n_random_hd = 0;
            //Estraggo un numero a sorte e verifico se è minore di probability_max_obstacles
            if(Math.random() < (this.probability_max_obstacles/100)){
                //Se è minore la riga è piena 
                n_random_ob = NUMBER_MAX_OBSTACLE;
            }else{
                //Altrimenti etraggo a sorte la probabilità che non ci siano ostacoli
                if(Math.random() < (this.probability_zero/100)){
                    n_random_ob = 0;
                }
                else{ //e nel caso sia maggiore di probability_zero verranno creati un numero tra MINOBSTACLE e AVERAGEOBSTACLE
                    n_random_ob = this.getRandomNumber(NUMBER_MIN_OBSTACLE, AVERAGE_NUMBER_OBSTACLE);
                }//Nel caso in cui la linea degli ostacoli non è piena estraggo anche un numero di hotdog.
                if(Math.random() > (this.probability_zero_hotdog/100)){
                    n_random_hd = this.getRandomNumber(NUMBER_MIN_HOTDOG, NUMBER_MAX_HOTDOG);
                }
            }
            //Istanzio n_oggetti estratti
            this.newSetOfObstacle(n_random_ob, score_dog);
            this.newSetOfHotdog(n_random_hd, score_dog);
            //Riporto l'index  a 0
            this.index=0;
        }else{
            //Altrimenti incremento l'indice
            this.index++;
        }
    }
    
    //Estraggo a sorte il punteggio degli ostacoli
    getScoreOb(num_obstacle, score_dog){
        if(num_obstacle==NUMBER_MAX_OBSTACLE-1){
            //Nel caso ci sia la linea piena, estraggo in modo che ci sia sicuramente un blocco che il bassotto possa attraversare
            return this.getRandomNumber(SCORE_MIN, score_dog-1);
        }else{
            //Altrimenti vengono estratti casualmente tra un range prefissato
            return this.getRandomNumber(SCORE_MIN, SCORE_MAX_OB);
        }
    }
    
//Estrae a sorta un numero tra MIN e max
    getScoreHd(){
        return this.getRandomNumber(SCORE_MIN, SCORE_MAX_HD);
    }
    //Disegna i vari oggetti, richiamandone il metodo draw
    draw(){
        for(let i=0; i<this.array_object.length; i++){
            this.array_object[i].draw();
        }
    }
    //Calcola la posizione degli ostacoli e degli hotdog all'interno della riga e verifico che non si sovrappongano
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
    //Verifico se il cane ha colpito qualche ostacolo, se lo score dell'ostacolo è <= 0 elimino l'ostacolo
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
    //Verifico che c'è stata una collisione tra dog e objectgame
    colliding(dog) {
        for(let i = 0; i < this.array_object.length; i++){
            this.array_object[i].colliding(dog);
        }
    }
}
