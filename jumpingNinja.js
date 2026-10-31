const gameArea = document.querySelector("#game-area");
const obstacles = [];
const BASE_SPEED = 250;
const SPEED_INCREASE = 10;
const MAX_SPEED = 550;
const GRAVITY = 1800;
const JUMP_STRENGTH = 650;

let playerY = 0;
let velocityY = 0;


function createPlayer(){
    
    const existingPlayer = gameArea.querySelector("#player");

    if(existingPlayer){
        return existingPlayer;
    }
    
    const player = document.createElement("div");
    player.id = "player";

    gameArea.appendChild(player);

    return player;
}

function createObstacle(){
   const element = document.createElement("div");

   element.classList.add("obstacle");
   gameArea.appendChild(element);
   
   const obstacle ={
    element: element,
    x: gameArea.clientWidth,
    width: 25
   }

   obstacles.push(obstacle);

   element.style.left = `${obstacle.x}px`

   return obstacle;
}

function jump(){

    if(playerY === 0){
        velocityY = JUMP_STRENGTH;
    }
}

function updatePlayer(dt){
    velocityY -= GRAVITY * dt;

    playerY += velocityY * dt;

    if(playerY <= 0){
        velocityY = 0;
        playerY = 0;
    }

    player.style.bottom = `${playerY}px`;

}
function updateObstacles(dt,score) {
     const speed = getObstacleSpeed(score);
    obstacles.forEach(obstacle =>{
        obstacle.x -= speed * dt;
        obstacle.element.style.left = `${obstacle.x}px`
    });
}

function removeObstacle(index, onRemoved) {
    const obstacle = obstacles[index];

    if (!obstacle) return;

    obstacle.element.remove();
    obstacles.splice(index, 1);

    if (onRemoved) {
        onRemoved(obstacle);
    }
}

function cleanUpObstacles() {
    
    for (let i = obstacles.length -1 ; i>= 0; i--) {
        
        const obstacle = obstacles[i];      
        
        const obstacleToRemove = obstacle.x + obstacle.width <= 0;

        if (obstacleToRemove) {
            removeObstacle(i);
        }
        
    }
}
function resetPlayer(){
    playerY = 0;
    velocityY = 0;
    player.style.bottom = "0px";
}

function resetObstacles(){
    for (let i = obstacles.length - 1; i >= 0; i--) {
        removeObstacle(i);
    }
}

function getObstacleSpeed(score) {
    return Math.min(
        BASE_SPEED + score * SPEED_INCREASE,
        MAX_SPEED
    );
}

const player = createPlayer();

