const gameArea = document.querySelector("#game-area");

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
   const obstacle = document.createElement("div");

   obstacle.classList.add("obstacle");
   gameArea.appendChild(obstacle);

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

const player = createPlayer();
const obstacle = createObstacle();
