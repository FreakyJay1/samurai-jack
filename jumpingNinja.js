const gameArea = document.querySelector("#game-area");
const obstacles = [];
const obstacleSpeed = 250; 

let playerY = 0;
let velocityY = 0;

const gravity = 1800;

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
        velocityY = 600;
    }
}

function updatePlayer(dt){
    velocityY -= gravity * dt;

    playerY += velocityY * dt;

    if(playerY <= 0){
        velocityY = 0;
        playerY = 0;
    }

    player.style.bottom = `${playerY}px`;

}
function updateObstacles(dt) {
    obstacles.forEach(obstacle =>{
        obstacle.x -= obstacleSpeed * dt;
        obstacle.element.style.left = `${obstacle.x}px`
    });
}

function removeObstacle(index) {
    const obstacle = obstacles[index];

    obstacle.element.remove();
    
    obstacles.splice(index,1);

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

const player = createPlayer();
const obstacle = createObstacle();
