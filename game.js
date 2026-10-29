let score =0;
let isRunning  =false;
let lastTime  =null;
let spawnTimer  =0;
let frameId =null;
const countedObstacles  =new Set();
const HITBOX_MARGIN=4;
const SPAWN_INTERVAL = 2;    
const MAX_DT = 0.05;  

function startGame(){
    isRunning = true;
    lastTime = performance.now();
    hideScreens();
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
    // updateObstacles(dt);

    if(isRunning){
        frameId = requestAnimationFrame(gameLoop);
    }
}
setupControls({ onJump: jump, onStart: startGame });
showStartScreen();