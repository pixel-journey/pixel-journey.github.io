var gameState = {
  wave: 1
};

var lastClickTime = 0;
var TAP_RATE_LIMIT = 50; // ms between taps
var tapCount = 0;
var TAP_BATCH_SIZE = 100;

function initGame() {
  // Initialize all systems with error handling
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

    // Load saved wave
    var savedWave = localStorage.getItem('pxjWave');
    if (savedWave) {
      gameState.wave = parseInt(savedWave, 10);
    }

    // Initialize UI
    ui.init();

    // Render shop
    SHOP.renderShop();

    // Spawn initial enemy
    enemy.spawnNewEnemy();

    // Start game loop
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
  // Update boosters
  player.updateBoosters();

  // Check achievements
  ACHIEVEMENTS.check();

  // Update collection for current enemy
  if (enemy.current) {
    COLLECTION.discoverIngredient(enemy.current.tier, enemy.current.color);
  }

  // Update UI notices
  ui.checkUpgradeNotice();
  ui.checkPrestigeIndicator();
}

function renderGame() {
  // Update all UI elements
  ui.updateHealthBar();
  ui.updateWaveCounter();
  ui.updateCurrencyBar();
  ui.updateXPBar();
  ui.updateLevelTracker();
  ui.renderBoosters();
}

function handleTap(event) {
  var now = Date.now();
  if (now - lastClickTime < TAP_RATE_LIMIT) {
    ui.showAntiCheatWarning();
    return;
  }
  lastClickTime = now;
  tapCount++;

  // Play tap sound
  AUDIO.play('tap');

  // Trigger tap event with particle effects
  safeCall(() => {
    events.tapEnemy();
    PARTICLES.createTapParticles(event.clientX, event.clientY, enemy.current ? enemy.current.color : null);
  }, 'tapEnemy');

  // Log tap batch for analytics
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

// Error handling wrapper
function safeCall(fn, name) {
  try {
    fn();
  } catch (e) {
    console.error(`Error in ${name}:`, e);
    ui.notify('An error occurred. Check console for details.', true);
  }
}

// Setup event listeners
document.getElementById('enemy-container').addEventListener('click', handleTap);
document.getElementById('settings-icon').addEventListener('click', () => ui.togglePanel('settings-panel'));
document.getElementById('collection-btn').addEventListener('click', () => {
  COLLECTION.renderCollection();
  ui.togglePanel('collection-panel');
});
document.addEventListener('DOMContentLoaded', () => safeCall(initGame, 'initGame'));
