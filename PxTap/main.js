var gameState = {
  wave: 1
};

var lastClickTime = 0;
var TAP_RATE_LIMIT = 50; // ms between taps
var tapCount = 0;
var TAP_BATCH_SIZE = 100;

function initGame() {
  safeCall(() => {
    player.init();
    AUDIO.init();
    PARTICLES.init();
    COLLECTION.init();
    ACHIEVEMENTS.init();
    DAILY_REWARDS.init();
    TUTORIAL.init();
    SETTINGS.init();
    if (typeof WALLET !== 'undefined') {
      WALLET.init();
    } else {
      console.warn('WALLET not defined, skipping wallet initialization');
    }

    var savedWave = localStorage.getItem('pxjWave');
    if (savedWave) {
      gameState.wave = parseInt(savedWave, 10);
    }

    ui.init();
    SHOP.renderShop();
    enemy.spawnNewEnemy();
    requestAnimationFrame(gameLoop);
  }, 'initGame');
}

function gameLoop(timestamp) {
  safeCall(() => {
    updateGame();
    renderGame();
    requestAnimationFrame(gameLoop);
  }, 'gameLoop');
}

function updateGame() {
  if (!enemy.current) return;
  player.updateBoosters();
  ACHIEVEMENTS.check();
  COLLECTION.discoverIngredient(enemy.current.tier, enemy.current.color);
  ui.checkUpgradeNotice();
  ui.checkPrestigeIndicator();
}

function renderGame() {
  ui.updateWaveCounter();
  ui.updateCurrencyBar();
  ui.updateXPBar();
  ui.updateLevelTracker();
  ui.renderBoosters();
}

function handleTap(event) {
  event.preventDefault(); // Prevent zoom/scroll
  var now = Date.now();
  if (now - lastClickTime < TAP_RATE_LIMIT) {
    ui.showAntiCheatWarning();
    return;
  }
  lastClickTime = now;
  tapCount++;

  AUDIO.play('tap');
  safeCall(() => {
    events.tapEnemy();
    PARTICLES.createTapParticles(event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY, enemy.current ? enemy.current.color : null);
  }, 'tapEnemy');

  if (tapCount >= TAP_BATCH_SIZE) {
    console.log({
      playerID: 'player1',
      tapCount: tapCount,
      enemyID: enemy.current ? enemy.current.id : 'none',
      avgTapRate: TAP_RATE_LIMIT,
      dyeGained: player.dye,
      timestamp: now
    });
    tapCount = 0;
  }
}

function safeCall(fn, name) {
  try {
    fn();
  } catch (e) {
    console.error(`Error in ${name}:`, e);
    ui.notify('An error occurred. Check console for details.', true);
  }
}

document.getElementById('enemy-container').addEventListener('click', handleTap);
document.getElementById('enemy-container').addEventListener('touchstart', handleTap);
document.getElementById('settings-icon').addEventListener('click', () => ui.togglePanel('settings-panel'));
document.getElementById('collection-btn').addEventListener('click', () => {
  COLLECTION.renderCollection();
  ui.togglePanel('collection-panel');
});
document.addEventListener('DOMContentLoaded', () => safeCall(initGame, 'initGame'));
