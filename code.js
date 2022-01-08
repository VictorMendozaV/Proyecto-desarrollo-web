
    const STATE_RUNNING = 1; //indica cuando el juego esta corriendo
    const STATE_LOSING = 2; //indica cuando el juego este perdido
    const TICK = 80; // indica la velocidad de desplazamiento de la serpiente en ms
    const SQUARE_SIZE = 10; //indica el tamaño de los cuadros que se manejaran en el juego
    
// indica el tamaño de nuestro mapa    
    const BOARD_WIDTH = 50;
    const BOARD_HEIGHT = 50;

//variables de la serpiente

    const GROW_SCALE = 10; //indica el tamaño que crecera la serpiente cada que llegue a un objetivo

//mapeado de teclas que indican el desplazamiento de la serpiente
    const DIRECTIONS_MAPS = {
 //orientacion X    Y          
        'A': [-1 ,  0 ],
        'D': [ 1 ,  0 ],
        'S': [ 0 ,  1 ],
        'W': [ 0 , -1 ],
        'a': [-1 ,  0 ],
        'd': [ 1 ,  0 ],
        's': [ 0 ,  1 ],
        'w': [ 0 , -1 ],
 }; 

 let score = 0;
 let point = 1;

// variables de estado 
  let state = {
      canvas: null, //referencia del elemento canvas
      context: null,// contexto canvas
      snake:[{x: 0, y: 0}], //posiciones de todos los puntos de la serpiente
      direction: { x: 1, y: 0 },// direccion de la serpiente
      prey: {x: 0, y: 0}, // posicion de la presa
      growing: 0, // cuadros por crecer
      runState: STATE_RUNNING  // estado del juego
  }

//retorna un valor aleatorio para xy
  function randomXY(){
    return {
        x: parseInt(Math.random()* BOARD_WIDTH), 
        y: parseInt(Math.random()* BOARD_HEIGHT)
    }
  }

//logica del juego
function tick(){

    const head =  state.snake[0];//cabeza de la serpiente
    const dx = state.direction.x;//direccion en x
    const dy = state.direction.y;//direccion en y
    const highestIndex = state.snake.length - 1; 
    let interval = TICK;
    let tail = {};
    let didScore = (head.x === state.prey.x && head.y === state.prey.y); 

    Object.assign(tail, state.snake[state.snake.length -1]);

    //comprueba que el estado del juego este corriendo
    if(state.runState === STATE_RUNNING){

        for(let i = highestIndex; i > -1; i-- ){

            const sq = state.snake[i];

            if(i === 0){

                sq.x += dx;
                sq.y += dy;

            } else {

                sq.x = state.snake[i - 1].x;
                sq.y = state.snake[i - 1].y;

            }
        }    
    }else if (state.runState === STATE_LOSING) {


      
      localStorage.setItem("score" ,score );

      interval = 10;
      
       
      if (state.snake.length > 0) {
        state.snake.splice(0, 1); // borra a la serpiente cuadro por cuadro de manera secuencial
      }


      
      if (state.snake.length === 0) {
        state.runState = STATE_RUNNING;
        /*
        state.snake.push(randomXY()); // reubica  a la serpiente de nuevo
        state.prey = randomXY();//reubica en una posicion nueva a la presa
        */

        window.location.href = "puntuacion.html";

        score = 0;
      }
      
    
    
    
    }

    
    if (detectCollision()) {
      state.runState = STATE_LOSING;
      state.growing = 0;
    }

    //contador de puntos
    if(didScore){

        state.growing += GROW_SCALE;
        state.prey = randomXY();
        score = score + point;
        
    }

    if(state.growing > 0){
        state.snake.push(tail);
        state.growing -= 1;
    }

    requestAnimationFrame(draw);//genera una animacion
    setTimeout(tick, interval);//indica el intervalo de tiempo entre frames
    
}







//deteccion de colisiones
function detectCollision(){

    const head = state.snake[0];

    //detecta si colisiona con un borde
    if ( head.x < 0
      || head.x >= BOARD_WIDTH
      || head.y >= BOARD_HEIGHT
      || head.y < 0
    ) {
      return true;
    }

    for (var i = 1; i < state.snake.length; i++) {
      const sq = state.snake[i];
      
      //detecta si colisiona consigo misma
      if (sq.x === head.x && sq.y === head.y) {
        return true;
      }
    }

    return false;
  }

//esta funcion dibuja los cuadros del juego
function drawPixel( color, x, y){
    state.context.fillStyle = color;//establece el color 
    
//dibuja los pixeles con el tamaño establecido por SQUARE_SIZE
    state.context.fillRect( 
        x * SQUARE_SIZE,
        y * SQUARE_SIZE,
        SQUARE_SIZE,
        SQUARE_SIZE
    )
}

function draw(){
    state.context.clearRect( 0, 0, 500, 500);

    //dibuja la serpiente
    for(let i = 0; i < state.snake.length; i++){

        const { x, y} = state.snake[i];
        drawPixel( '#22dd22', x , y); 

    }

    //dibuja la presa
    const { x, y} = state.prey;
    drawPixel( 'yellow' , x, y);
}

//control de direccion
window.onload = function(){
    state.canvas = document.querySelector('canvas');//selecciona el elemento canvas
    state.context = state.canvas.getContext('2d');//identificador del contextor del dibujo 
    

    window.onkeydown = function(e){

        const direction = DIRECTIONS_MAPS[e.key];//asigna el valor de la tecla pulsada a la variable

//verifica que la direccion no sea contraria a la direccion en la que se mueve la serpiente y actualiza la direccion        
        if(direction){
            const [ x,  y] = direction;
            if(-x !== state.direction.x && -y !== state.direction.y ){
                state.direction.x = x;
                state.direction.y = y;
            }
        }
    } 
    
    tick();   

};

//redirige a snake.html
let button = function(){

  var name = document.getElementById("names").value;
  localStorage.setItem("name" , name );


  window.location.href = "snake.html";

    

    
}

let retry = function(){

  window.location.href = "login.html";


}



//clase player, representa al jugador
let player = class{

  //metodo constructor de la clase
  player(name , score){
      this.name = name;
      this.score = score; 
  }
//regresa el nombre del jugador
  getName(){
      return this.name;
  }
//modifica el nombre del jugador
  setName(name){
      this.name = name;
  }
//regresa el puntaje del jugador
  getScore(){
      return this.score;
  }
//modifica del puntaje del jugador
  setScore(score){
      this.score = score;
  }
}