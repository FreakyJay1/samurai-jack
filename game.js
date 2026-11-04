let score = 0;
let isRunning = false;
let lastTime = null;
let spawnTimer = 0;
let frameId = null;
const countedObstacles = new Set();
const HITBOX_MARGIN = 4;
const MIN_OBSTACLE_SPACING = 450;
const MAX_OBSTACLE_SPACING = 700;
let nextSpawnInterval = getSpawnInterval(0);
const MAX_DT = 0.09;

function startGame() {
    if (isRunning) return;

    score = 0;
    spawnTimer = 0;
    nextSpawnInterval = getSpawnInterval(0);
    countedObstacles.clear();

    resetPlayer();
    resetObstacles();
    updateScore(0);

    hideScreens();
    isRunning = true;
    lastTime = performance.now();
    frameId = requestAnimationFrame(gameLoop);
}
function isColliding(playerBox, obstacleBox) {
    return (
        playerBox.left + HITBOX_MARGIN < obstacleBox.right - HITBOX_MARGIN &&
        playerBox.right - HITBOX_MARGIN > obstacleBox.left + HITBOX_MARGIN &&
        playerBox.top + HITBOX_MARGIN < obstacleBox.bottom - HITBOX_MARGIN &&
        playerBox.bottom - HITBOX_MARGIN > obstacleBox.top + HITBOX_MARGIN
    )
}

function gameLoop(timestamp) {
    if (!isRunning) return; 

    const dt = calculateDeltaTime(timestamp);

    updatePlayer(dt);
    updateObstacles(dt, score);

    if (playerCollision()) {
        gameOver();
        return;
    }

     passedObstacles();

    cleanUpObstacles(obstacle => {
        countedObstacles.delete(obstacle);
    });
    
    updateObstacleSpawner(dt);

    if (isRunning) {
        frameId = requestAnimationFrame(gameLoop);
    }
}

function calculateDeltaTime(timestamp) {
    const dt = Math.max(
        0,
        Math.min((timestamp - lastTime) / 1000, MAX_DT)
    );

    lastTime = timestamp;

    return dt;
}

function playerCollision() {
    
    const playerBox = player.getBoundingClientRect();

    return obstacles.some(obstacle =>{
         const obstacleBox = obstacle.element.getBoundingClientRect();

         return isColliding(playerBox,obstacleBox);
    });

}
function passedObstacles() {

    const playerBox = player.getBoundingClientRect();

    for (obstacle of obstacles) {
        const obstacleBox = obstacle.element.getBoundingClientRect();

        const hasPassed = obstacleBox.right < playerBox.left;

        const alreadyCounted = countedObstacles.has(obstacle);

        if (hasPassed && !alreadyCounted) {
            countedObstacles.add(obstacle);
            score++;
            updateScore(score);
        }
        
    }
    
}

function getRandomSpacing(){
   return Math.random() * (MAX_OBSTACLE_SPACING - MIN_OBSTACLE_SPACING) + MIN_OBSTACLE_SPACING;
}

function getSpawnInterval(score) {
   
   const speed = getObstacleSpeed(score)
   const spacing = getRandomSpacing();
   const interval = spacing / speed;

   return interval;
}

function updateObstacleSpawner(dt) {

    spawnTimer += dt;

    if (spawnTimer >= nextSpawnInterval) {
        spawnTimer -= nextSpawnInterval
        createObstacle();

        nextSpawnInterval = getSpawnInterval(score);
    }  
}

function gameOver() {
    isRunning = false;
    cancelAnimationFrame(frameId);
    showGameOver(score);
}

setupControls({ onJump: jump, onStart: startGame });
showStartScreen();

