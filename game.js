let score =0;
let isRunning  =false;
let lastTime  =null;
let spawnTimer  =0;
let frameId =null;
const countedObstacles  =new Set();
const HITBOX_MARGIN=4;
const SPAWN_INTERVAL = 1.5 ;    
const MAX_DT = 0.05;  

function startGame(){
    if(isRunning) return;

    score = 0;
    spawnTimer = 0;
    countedObstacles.clear();

    resetPlayer();
    resetObstacles();
    updateScore(0);

    hideScreens();
    isRunning = true;
    lastTime = performance.now();
    frameId = requestAnimationFrame(gameLoop);
}
function isColliding(a,b){
    return(
        a.left+HITBOX_MARGIN <b.right-HITBOX_MARGIN &&
        a.right-HITBOX_MARGIN >b.left+HITBOX_MARGIN &&
        a.top+HITBOX_MARGIN <b.bottom-HITBOX_MARGIN &&
        a.bottom-HITBOX_MARGIN >b.top+HITBOX_MARGIN 
    )
}

function gameLoop(timestamp){
    const dt = Math.max(0, Math.min((timestamp - lastTime) / 1000, MAX_DT));
    lastTime = timestamp;

    updatePlayer(dt);
    updateObstacles(dt);

   const playerBox = player.getBoundingClientRect();
    for(const obstacle of obstacles){
        const obstacleBox = obstacle.element.getBoundingClientRect();

        if(isColliding(playerBox, obstacleBox)){
            gameOver();
            return;
        }

        if(obstacleBox.right < playerBox.left && !countedObstacles.has(obstacle)){
            countedObstacles.add(obstacle);
            score++;
            updateScore(score);
        }
    }


     spawnTimer += dt;
    if(spawnTimer >= SPAWN_INTERVAL){
        spawnTimer -= SPAWN_INTERVAL;
        createObstacle();
    }

    if(isRunning){
        frameId = requestAnimationFrame(gameLoop);
    }
}

function gameOver(){
    isRunning = false;
    cancelAnimationFrame(frameId);
    showGameOver(score);
}

setupControls({ onJump: jump, onStart: startGame });
showStartScreen();