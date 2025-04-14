// game.js
const svg = document.getElementById("game"); // Global SVG declaration

const gameState = {
  credits: CONFIG.initialState.credits,
  totalCredits: CONFIG.initialState.totalCredits,
  lives: CONFIG.initialState.lives,
  wave: CONFIG.initialState.wave,
  waveActive: CONFIG.initialState.waveActive,
  showRange: CONFIG.initialState.showRange,
  speedMultiplier: CONFIG.initialState.speedMultiplier,
  gameMode: CONFIG.initialState.gameMode,
  healthModifier: CONFIG.initialState.healthModifier,
  autoRun: CONFIG.initialState.autoRun,
  enemies: [],
  towers: [],
  projectiles: [],
  pathPoints: [],
  selectedTower: null,
  towerUpgrades: JSON.parse(JSON.stringify(CONFIG.towerUpgrades)),
  waveProgress: { spawned: 0, total: 0 },
  towerUpgrades: {
    grass: { powerAura: 0, cost: 100, description: "Grass: Power Aura" },
    wood: { splinters: 0, cost: 150, description: "Wood: Add Splinters" },
    gold: { ricochet: 0, cost: 175, description: "Gold: Credit Bonus Chance" },
    fire: { burn: 0, cost: 192, description: "Fire: Add Burn" },
    ice: { freeze: 0, cost: 50, description: "Ice: Add Freeze" },
    water: { splash: 0, cost: 250, description: "Water: Add Splash" },
    arcane: { chain: 0, cost: 400, description: "Arcane: Add Chain" },
    rock: { stun: 0, cost: 500, description: "Rock: Add Stun" },
    lightning: { shock: 0, cost: 1000, description: "Lightning: Add Shock Chain" },
  },
  graphicsMode: "high", // "high", "low", "off"
  interestLevel: 0,
  interestCost: 50,
  interestMultiplier: 1,         // Multiplies interest income
  waveBonusMultiplier: 1,        // Multiplies wave completion rewards
  killBonusMultiplier: 1,        // Multiplies enemy kill rewards
  levelUpCostMultiplier: 1,      // Multiplies upgrade costs (less than 1 reduces cost)
  globalUpgrades: {
      globalSpeed: { rank: 0, cost: 100, description: "Increases attack speed by 5%" },
      globalDamage: { rank: 0, cost: 100, description: "Increases damage by 5%" },
      globalRange: { rank: 0, cost: 100, description: "Increases range by 5%" },
      globalCrit: { rank: 0, cost: 150, description: "Increases chance of critical hits (2x damage)" },
      globalIncome: { rank: 0, cost: 200, description: "Increases passive income per wave" },
      globalInterest: { rank: 0, cost: 200, description: "Increases passive interest per round" },
    },
boosterRanks: {
    damage: { rank: 0, maxRank: 10, cost: 1, effect: "Increases tower damage by 5%" },
    attackspeed: { rank: 0, maxRank: 10, cost: 1, effect: "Increases tower firing rate by 5%" },
    range: { rank: 0, maxRank: 10, cost: 1, effect: "Increases tower range by 5%" },
    interest: { rank: 0, maxRank: 5, cost: 5, effect: "Increases interest income by 10%" },
    wavebonus: { rank: 0, maxRank: 5, cost: 10, effect: "Increases wave completion rewards by 10%" },
    killbonus: { rank: 0, maxRank: 5, cost: 15, effect: "Increases enemy kill rewards by 10%" },
    reducelvlup: { rank: 0, maxRank: 5, cost: 10, effect: "Reduces tower upgrade costs by 5%" },
  },
  boosterPoints: 0,
};

function initGame() {
  gameState.startTime = Date.now();
  gameState.bestScore = Number(localStorage.getItem("bestScore")) || 0;
  gameState.pathPoints = [
    { x: 25, y: 475 },
    { x: 225, y: 475 },
    { x: 225, y: 275 },
    { x: 425, y: 275 },
    { x: 425, y: 75 },
    { x: 25, y: 75 },
  ];

  generateGrid();
  window.initUI();
  gameLoop();
  logEvent("Game Started!");
  showEnhancedNotification("Welcome to PxTD Tower Defense!", "success");
}

function spawnWave() {
  if (gameState.waveActive) return;
  gameState.waveActive = true;
  document.getElementById("start-wave-btn").disabled = true;

  const baseEnemies = CONFIG.wave.baseEnemyCount;
  const enemiesPerWave = CONFIG.wave.enemyIncreasePerWave;
  const maxEnemies = CONFIG.wave.maxEnemies;
  const enemyCount = Math.min(baseEnemies + gameState.wave * enemiesPerWave, maxEnemies);

  let specialMessage = "";
  if (gameState.wave % 10 === 0) specialMessage = "BOSS WAVE! Prepare for tank enemies!";
  else if (gameState.wave % 5 === 0) specialMessage = "Tank enemies incoming!";
  else if (gameState.wave % 3 === 0) specialMessage = "Fast enemies incoming!";
  showWaveAnnouncement(gameState.wave, specialMessage);
  // playSound("waveStart");

  gameState.waveProgress.spawned = 0;
  gameState.waveProgress.total = enemyCount;
  updateWaveProgress(0, enemyCount);

  let spawned = 0;
  const spawnInterval = setInterval(() => {
      if (spawned >= enemyCount) {
        clearInterval(spawnInterval);
        return;
      }
      let enemyType = "basic";
      if (gameState.wave % 5 === 0) {
        enemyType = Math.random() < 0.3 ? "tank" : "basic";
      } else if (gameState.wave % 3 === 0) {
        enemyType = Math.random() < 0.5 ? "fast" : "basic";
      } else if (gameState.wave > 5) {
        enemyType = Math.random() < 0.2 ? "fast" : "basic";
      } else if (gameState.wave % 10 === 0) {
        enemyType = "boss";
      }
      gameState.enemies.push(new Enemy(enemyType, gameState.wave));
      spawned++;
      gameState.waveProgress.spawned = spawned;
      updateWaveProgress(spawned, enemyCount);
    }, 1000 / gameState.speedMultiplier);

  if (gameState.wave % 5 === 0) {
    logEvent(`Warning: Wave ${gameState.wave} has tank enemies!`);
    showNotification(`Wave ${gameState.wave}: Tank enemies incoming!`, "warning");
  } else if (gameState.wave % 3 === 0) {
    logEvent(`Warning: Wave ${gameState.wave} has fast enemies!`);
    showNotification(`Wave ${gameState.wave}: Fast enemies incoming!`, "warning");
  } else {
    showNotification(`Wave ${gameState.wave} started!`, "info");
  }
}

function updateTowers() {
  gameState.towers.forEach(tower => {
    const prevTarget = tower.target;
    tower.shoot();
    if (!prevTarget && tower.target) animateTowerAttack(tower);
  });
}

function updateProjectiles() {
  gameState.projectiles.forEach(projectile => projectile.update());
}

function updateEnemies() {
  gameState.enemies.forEach(enemy => enemy.updatePosition());
}

function checkWaveCompletion() {
  if (gameState.waveActive && gameState.enemies.length === 0) {
    gameState.waveActive = false;
    document.getElementById("start-wave-btn").disabled = false;
    gameState.wave++;

    const baseInterest = 0.005;
    const interestIncrement = 0.005;
    const incomePercentage = (baseInterest + gameState.interestLevel * interestIncrement) * gameState.interestMultiplier;
    const incomeBonus = 1 + gameState.globalUpgrades.globalIncome.rank * 0.1; // 10% per rank
    const income = Math.floor(gameState.credits * incomePercentage * incomeBonus);
    const waveReward = Math.floor(CONFIG.wave.waveCompletionReward * gameState.waveBonusMultiplier);
    gameState.credits += waveReward + income;
    gameState.totalCredits += waveReward + income;

    updateUI();
    logEvent(`Wave ${gameState.wave - 1} Completed: +${waveReward} Credits, +${income} Income`);
    showNotification(`Wave ${gameState.wave - 1} completed! +${waveReward + income} Credits`, "success");
    updateWaveProgress(0, 1);

    if (gameState.autoRun) setTimeout(spawnWave, 2000);
  }
}

window.addEventListener("load", () => {
  document.getElementById("start-game-btn").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    initGame();
  });
});

function gameLoop() {
  updateEnemies();
  updateTowers();
  updateProjectiles();
  checkWaveCompletion();
  requestAnimationFrame(gameLoop);
}
