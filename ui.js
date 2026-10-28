const gameBox = document.getElementById('game');
const scoreEl = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScoreEl = document.getElementById('final-score');
const highScoreEl = document.getElementById('high-score');

function updateScore(score) {
  scoreEl.textContent = score;
}

function showStartScreen() {
  gameOverScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

function showGameOver(score) {
  finalScoreEl.textContent = score;
  highScoreEl.textContent = saveHighScore(score);
  startScreen.classList.add('hidden');
  gameOverScreen.classList.remove('hidden');
  shakeGame();
}

function hideScreens() {
  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
}

function saveHighScore(score) {
  let best = 0;
  try { best = Number(localStorage.getItem('samurai_best')) || 0; } catch (e) {}
  if (score > best) {
    best = score;
    try { localStorage.setItem('samurai_best', best); } catch (e) {}
  }
  return best;
}

function shakeGame() {
  let frames = 12;
  (function step() {
    const m = frames * 0.8;
    gameBox.style.transform = frames > 0
      ? 'translate(' + (Math.random() - 0.5) * m + 'px,' + (Math.random() - 0.5) * m + 'px)'
      : '';
    if (frames-- > 0) requestAnimationFrame(step);
  })();
}

function setupControls({ onJump, onStart }) {
  function isPlaying() {
    return startScreen.classList.contains('hidden') && gameOverScreen.classList.contains('hidden');
  }
  function act() {
    if (isPlaying()) onJump();
    else onStart();
  }
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      if (!e.repeat) act();
    }
  });
  gameBox.addEventListener('pointerdown', act);
}
