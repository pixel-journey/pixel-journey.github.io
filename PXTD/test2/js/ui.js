// ui.js
let creditsText, livesText, waveText, pathElement, targetIndicator;
let speedToggleBtn, mobileSpeedToggleBtn, autoRunBtn, mobileAutoRunBtn;
let rangeToggleBtn, mobileRangeToggleBtn, gameOverScreen, finalScoreText;

// Move setupEventListeners to the top to ensure it’s defined before initUI
function setupEventListeners() {

  window.addEventListener('orientationchange', function() {
    if (window.innerHeight > window.innerWidth) {
      // Portrait mode
      document.getElementById('game-wrapper').style.display = 'none';
      document.getElementById('orientation-message').style.display = 'block';
    } else {
      // Landscape mode
      document.getElementById('game-wrapper').style.display = 'flex';
      document.getElementById('orientation-message').style.display = 'none';
    }
  });

  // Trigger the check on page load
  if (window.innerHeight > window.innerWidth) {
    document.getElementById('game-wrapper').style.display = 'none';
    document.getElementById('orientation-message').style.display = 'block';
  }

  document.querySelectorAll(".tower-btn").forEach(btn => {
    btn.addEventListener("click", handleTowerSelection);
    btn.addEventListener("touchstart", handleTowerSelection);
  });

  document.getElementById("start-wave-btn").addEventListener("click", () => {
    if (!gameState.waveActive) spawnWave();
  });
  document.getElementById("start-wave-btn").addEventListener("touchstart", e => {
    e.preventDefault();
    if (!gameState.waveActive) spawnWave();
  });

  document.getElementById("randomize-map-btn").addEventListener("click", randomizeMap);
  document.getElementById("mobile-randomize-map-btn").addEventListener("click", randomizeMap);

  rangeToggleBtn.addEventListener("click", toggleRangeVisibility);
  mobileRangeToggleBtn.addEventListener("click", toggleRangeVisibility);

  speedToggleBtn.addEventListener("click", toggleGameSpeed);
  mobileSpeedToggleBtn.addEventListener("click", toggleGameSpeed);

  autoRunBtn.addEventListener("click", toggleAutoRun);
  mobileAutoRunBtn.addEventListener("click", toggleAutoRun);

  document.querySelectorAll(".game-mode-btn, .mobile-game-mode-btn").forEach(btn => {
    btn.addEventListener("click", handleGameModeSelection);
  });

  setupTowerUpgradeButtons();

  svg.addEventListener("mousemove", handleMouseMove);
  svg.addEventListener("touchmove", handleTouchMove);
  svg.addEventListener("click", handleBoardClick);
  svg.addEventListener("touchstart", handleBoardTouch);


  // Touch start (equivalent to mousedown)
  svg.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent scrolling/zooming
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (500 / rect.width);
    const y = (touch.clientY - rect.top) * (500 / rect.height);
    // Example: place a game object at touch location
    placeTower(x, y);
  });

  // Touch move (equivalent to mousemove)
  svg.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (500 / rect.width);
    const y = (touch.clientY - rect.top) * (500 / rect.height);
    // Example: update a target indicator
    updateTargetIndicator(x, y);
  });

  document.querySelectorAll(".expandable").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const wasExpanded = content.style.maxHeight !== "0px" && content.style.maxHeight !== "";

      document.querySelectorAll(".expandable-content").forEach(c => {
        c.style.maxHeight = "0px";
        const toggleIcon = c.previousElementSibling.querySelector(".toggle-icon");
        if (toggleIcon) toggleIcon.textContent = "+";
      });

      if (!wasExpanded) {
        content.style.maxHeight = content.scrollHeight + "px";
        header.querySelector(".toggle-icon").textContent = "−";
      }
    });
  });

  function applyBoosterEffect(type) {
    const rank = gameState.boosterRanks[type].rank;

    if (type === "damage") {
      // Apply damage boost to all towers (5% per rank)
      gameState.towers.forEach(tower => {
        tower.dps = tower.baseDps * Math.pow(1.05, rank); // 5% increase per rank
      });
    } else if (type === "attackspeed") {
      // Apply attack speed boost to all towers (5% per rank)
      gameState.towers.forEach(tower => {
        // Assuming towers have a cooldown or fireRate property
        // If using cooldown, reduce it to increase attack speed
        if (tower.fireInterval) {
          tower.fireInterval = tower.fireInterval / Math.pow(1.05, rank); // Decrease fireInterval
        }
      });
    } else if (type === "range") {
      // Apply range boost to all towers (5% per rank)
      gameState.towers.forEach(tower => {
        tower.range = tower.baseRange * Math.pow(1.05, rank);
        if (tower.rangeCircle) {
          tower.rangeCircle.setAttribute("r", tower.range);
        }
      });
    } else if (type === "interest") {
      gameState.interestMultiplier = 1 + rank * 0.1; // 10% per rank
    } else if (type === "wavebonus") {
      gameState.waveBonusMultiplier = 1 + rank * 0.1; // 10% per rank
    } else if (type === "killbonus") {
      gameState.killBonusMultiplier = 1 + rank * 0.1; // 10% per rank
    } else if (type === "reducelvlup") {
      gameState.levelUpCostMultiplier = Math.pow(0.95, rank); // 5% reduction per rank
    }

    updateAllTowers(); // Refresh tower stats
  }


function handleInterestUpgrade() {
  if (gameState.interestLevel >= 9) {
    showNotification("Interest at max level!", "warning");
    return;
  }
  if (gameState.credits < gameState.interestCost) {
    showNotification("Not enough credits!", "error");
    return;
  }
  gameState.credits -= gameState.interestCost;
  gameState.totalCredits -= gameState.interestCost;
  gameState.interestLevel++;
  gameState.interestCost = Math.floor(gameState.interestCost * 2.5);
  const interestBtn = document.getElementById("interest-upgrade");
  if (gameState.interestLevel < 9) {
    const nextInterest = 0.5 + (gameState.interestLevel + 1) * 0.5;
    interestBtn.textContent = `Upgrade Interest to ${nextInterest}% (${gameState.interestCost})`;
  } else {
    interestBtn.textContent = `Interest: Max`;
    interestBtn.disabled = true;
  }
  updateUI();
  logEvent(`Interest Upgraded to ${(0.5 + gameState.interestLevel * 0.5)}%`);
}


  const graphicsToggleBtn = document.getElementById("graphics-toggle-btn");
  graphicsToggleBtn.addEventListener("click", toggleGraphicsMode);


  const interestUpgradeBtn = document.getElementById("interest-upgrade");
  interestUpgradeBtn.addEventListener("click", handleInterestUpgrade);

  document.getElementById("buy-lives-btn").addEventListener("click", () => {
      if (gameState.lives >= 100) {
        showNotification("Lives at maximum!", "warning");
        return;
      }
      const cost = 100;
      if (gameState.credits < cost) {
        showNotification("Not enough credits!", "error");
        return;
      }
      gameState.credits -= cost;
      gameState.lives++;
      updateUI();
      logEvent("Bought 1 Life for 100 Credits");
      showNotification("Bought 1 Life!", "success");
    });


      document.getElementById("share-btn").addEventListener("click", () => {
    const shareText = `I scored ${formatCurrency(gameState.totalCredits)} credits in PxTD Tower Defense!`;
    if (navigator.share) {
      navigator.share({
        title: 'PxTD Tower Defense',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        showNotification("Score copied to clipboard!", "success");
      });
    }
  });

  document.querySelectorAll("#PXJbooster-row .sidebar-btn").forEach(btn => {
    const type = btn.getAttribute("data-type"); // e.g., data-type="damage"
    btn.addEventListener("click", () => {
      const booster = gameState.boosterRanks[type];
      if (booster.rank >= booster.maxRank) {
        showNotification(`${type} at max rank!`, "warning");
        return;
      }
      if (gameState.boosterPoints < booster.cost) {
        showNotification("Not enough booster points!", "error");
        return;
      }
      gameState.boosterPoints -= booster.cost;
      booster.rank++;
      applyBoosterEffect(type);
      updateBoostersUI();
      logEvent(`Applied ${type} boost to rank ${booster.rank}`);
    });
  });

  document.querySelectorAll("#PXJbooster-row .sidebar-btn").forEach(btn => {
  const type = btn.getAttribute("data-type");
  const booster = gameState.boosterRanks[type];
  btn.addEventListener("mouseenter", e => {
    const tooltip = createTooltip(`${booster.effect}\nCurrent Rank: ${booster.rank}/${booster.maxRank}`);
    positionTooltip(tooltip, e.clientX, e.clientY);
    btn.tooltip = tooltip;
  });
  btn.addEventListener("mouseleave", () => {
    if (btn.tooltip) {
      removeTooltip(btn.tooltip);
      btn.tooltip = null;
    }
  });
});
  }

    window.initUI = function() {
      creditsText = document.getElementById("credits");
      livesText = document.getElementById("lives");
      waveText = document.getElementById("wave");
      pathElement = document.getElementById("path");
      targetIndicator = document.getElementById("target-indicator");
      speedToggleBtn = document.getElementById("speed-toggle-btn");
      mobileSpeedToggleBtn = document.getElementById("mobile-speed-toggle-btn");
      autoRunBtn = document.getElementById("auto-run-btn");
      mobileAutoRunBtn = document.getElementById("mobile-auto-run-btn");
      rangeToggleBtn = document.getElementById("range-toggle-btn");
      mobileRangeToggleBtn = document.getElementById("mobile-range-toggle-btn");
      gameOverScreen = document.getElementById("game-over-screen");
      finalScoreText = document.getElementById("final-score");

      const interestUpgradeBtn = document.getElementById("interest-upgrade");
      const nextInterest = 0.5 + (gameState.interestLevel + 1) * 0.5;
      interestUpgradeBtn.textContent = `Upgrade Interest to ${nextInterest}% (${gameState.interestCost})`;

      const rangePreview = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      rangePreview.setAttribute("fill", "none");
      rangePreview.setAttribute("stroke", "#ffffff");
      rangePreview.setAttribute("stroke-width", "2");
      rangePreview.setAttribute("stroke-opacity", "0.5");
      rangePreview.setAttribute("opacity", "0");
      svg.appendChild(rangePreview);
      window.rangePreview = rangePreview;

      setupEventListeners();
      initTowerTooltips();
      updateUI();
    };

function updateUI() {
  creditsText.textContent = `Credits: ${formatCurrency(gameState.credits)}`;
  livesText.textContent = `Lives: ${gameState.lives}`;
  waveText.textContent = `Wave: ${gameState.wave}`;
}

function showGameOver(totalCredits) {
  const duration = Math.floor((Date.now() - gameState.startTime) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  finalScoreText.innerHTML = `Total Credits: ${formatCurrency(totalCredits)}<br>` +
      `Waves Completed: ${gameState.wave - 1}<br>` +
      `Game Duration: ${minutes}m ${seconds}s<br>` +
      `Best Score: ${formatCurrency(gameState.bestScore)}`;
  if (totalCredits > gameState.bestScore) {
    gameState.bestScore = totalCredits;
    localStorage.setItem("bestScore", totalCredits);
    finalScoreText.innerHTML += `<br>New Highscore!`;
  }
  gameOverScreen.style.display = "flex";
  }


function randomizeMap() {
  const points = [];
  const gridSize = CONFIG.grid.size;
  const numTurns = getRandomInt(3, 7);
  let currentX = 25;
  let currentY = 475;
  let direction = "right";

  points.push({ x: currentX, y: currentY });

  for (let i = 0; i < numTurns; i++) {
    const distance = getRandomInt(2, 4) * gridSize;
    if (direction === "right") {
      currentX = Math.min(475, currentX + distance);
      direction = Math.random() > 0.5 ? "up" : "down";
    } else if (direction === "left") {
      currentX = Math.max(25, currentX - distance);
      direction = Math.random() > 0.5 ? "up" : "down";
    } else if (direction === "up") {
      currentY = Math.max(25, currentY - distance);
      direction = Math.random() > 0.5 ? "left" : "right";
    } else if (direction === "down") {
      currentY = Math.min(475, currentY + distance);
      direction = Math.random() > 0.5 ? "left" : "right";
    }
    points.push({ x: currentX, y: currentY });
  }

  if (currentX !== 25 || currentY !== 75) {
    if (currentY !== 75) points.push({ x: currentX, y: 75 });
    points.push({ x: 25, y: 75 });
  }

  gameState.pathPoints = points;
  pathElement.setAttribute("points", points.map(p => `${p.x},${p.y}`).join(" "));
  logEvent("Map Randomized!");
}

function handleTowerSelection(e) {
  e.preventDefault();
  const type = this.getAttribute("data-type");

  // If the same tower is clicked again, de-select it
  if (gameState.selectedTower === type) {
    gameState.selectedTower = null;
    document.querySelectorAll(".tower-btn").forEach(b => b.classList.remove("selected"));
    targetIndicator.setAttribute("opacity", "0");
    rangePreview.setAttribute("opacity", "0");
    // Close any open confirmation popups
    document.querySelectorAll(".confirm-popup").forEach(popup => popup.remove());
  } else {
    // Select a new tower
    document.querySelectorAll(".tower-btn").forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");
    gameState.selectedTower = type;
  }
}

function handleInterestUpgrade() {
  if (gameState.interestLevel >= 9) {
    showNotification("Interest at max level!", "warning");
    return;
  }
  if (gameState.credits < gameState.interestCost) {
    showNotification("Not enough credits!", "error");
    return;
  }
  gameState.credits -= gameState.interestCost;
  gameState.totalCredits -= gameState.interestCost;
  gameState.interestLevel++;
  gameState.interestCost = Math.floor(gameState.interestCost * 2.5);
  const interestBtn = document.getElementById("interest-upgrade");
  if (gameState.interestLevel < 9) {
    const nextInterest = 0.5 + (gameState.interestLevel + 1) * 0.5;
    interestBtn.textContent = `Interest: Rank: ${nextInterest} (${gameState.interestCost})`;
  } else {
    interestBtn.textContent = `Interest: Max`;
    interestBtn.disabled = true;
  }
  updateUI();
  logEvent(`Interest Upgraded to ${(0.5 + gameState.interestLevel * 0.5)}%`);
}

function toggleRangeVisibility() {
  gameState.showRange = !gameState.showRange;
  rangeToggleBtn.textContent = `Range: ${gameState.showRange ? "On" : "Off"}`;
  mobileRangeToggleBtn.textContent = `Range: ${gameState.showRange ? "On" : "Off"}`;
  gameState.towers.forEach(tower => tower.updateRangeVisibility());
  logEvent(`Tower Range Display: ${gameState.showRange ? "Enabled" : "Disabled"}`);
}

function toggleGameSpeed() {
  if (gameState.speedMultiplier === 1) {
    gameState.speedMultiplier = 2;
    speedToggleBtn.textContent = "Speed: Double";
    mobileSpeedToggleBtn.textContent = "Speed: Double";
  } else if (gameState.speedMultiplier === 2) {
    gameState.speedMultiplier = 3;
    speedToggleBtn.textContent = "Speed: Triple";
    mobileSpeedToggleBtn.textContent = "Speed: Triple";
  } else {
    gameState.speedMultiplier = 1;
    speedToggleBtn.textContent = "Speed: Normal";
    mobileSpeedToggleBtn.textContent = "Speed: Normal";
  }
  gameState.enemies.forEach(enemy => enemy.updateSpeed());
  logEvent(`Game Speed: ${speedToggleBtn.textContent.split(": ")[1]}`);
}

function toggleAutoRun() {
  gameState.autoRun = !gameState.autoRun;
  autoRunBtn.textContent = `Auto-Run: ${gameState.autoRun ? "On" : "Off"}`;
  mobileAutoRunBtn.textContent = `Auto-Run: ${gameState.autoRun ? "Enabled" : "Disabled"}`;
  logEvent(`Auto-Run: ${gameState.autoRun ? "Enabled" : "Disabled"}`);
}

function handleGameModeSelection() {
  const mode = this.getAttribute("data-mode");
  gameState.gameMode = mode;
  gameState.healthModifier = CONFIG.gameModes[mode].healthModifier;
  logEvent(`Game Mode: ${CONFIG.gameModes[mode].name}`);
}

function initTowerTooltips() {
  document.querySelectorAll(".tower-btn").forEach(btn => {
    const type = btn.getAttribute("data-type");
    const towerInfo = CONFIG.towers[type];
    const upgradeInfo = gameState.towerUpgrades[type];
    const upgradeType = Object.keys(upgradeInfo).filter(key => key !== "cost" && key !== "description")[0];

    btn.addEventListener("mouseenter", e => {
      const rank = upgradeInfo[upgradeType];
      const upgradeText = rank > 0 ? `\n${upgradeType.charAt(0).toUpperCase() + upgradeType.slice(1)}: Rank ${rank}` : "";
      const tooltip = createTooltip(
        `${type.charAt(0).toUpperCase() + type.slice(1)} Tower\n` +
        `Cost: ${towerInfo.cost} credits\n` +
        `Range: ${towerInfo.range}\n` +
        `DPS: ${towerInfo.dps}\n` +
        `${towerInfo.description}${upgradeText}`
      );
      positionTooltip(tooltip, e.clientX, e.clientY);
      btn.tooltip = tooltip;
    });

    btn.addEventListener("mouseleave", () => {
      if (btn.tooltip) {
        removeTooltip(btn.tooltip);
        btn.tooltip = null;
      }
    });
  });
}

function setupTowerUpgradeButtons() {
  Object.keys(CONFIG.towerUpgrades).forEach(type => {
    const upgradeBtn = document.getElementById(`${type}-upgrade`);
    const mobileUpgradeBtn = document.getElementById(`mobile-${type}-upgrade`);
    const upgrade = gameState.towerUpgrades[type];
    const upgradeType = Object.keys(upgrade).filter(key => key !== "cost" && key !== "description")[0];
    const currentRank = upgrade[upgradeType];

    if (upgradeBtn) {
      if (currentRank < 10) {
              const costMultiplier = 1 + currentRank * 0.5;
              const upgradeCost = Math.floor(upgrade.cost * costMultiplier);
              upgradeBtn.textContent = `${type}: ${upgradeType} (Rank ${currentRank}) - Next: ${upgradeCost}`;
            } else {
              upgradeBtn.textContent = `${type}: ${upgradeType} (Max Rank)`;
            }

upgradeBtn.classList.add('upgrade-progress');
upgradeBtn.style.setProperty('--progress', currentRank);
mobileUpgradeBtn.classList.add('upgrade-progress');
mobileUpgradeBtn.style.setProperty('--progress', currentRank);

      upgradeBtn.addEventListener("click", () => handleTowerUpgrade(type));
      upgradeBtn.addEventListener("mouseenter", e => {
        const currentRank = upgrade[upgradeType];
        const costMultiplier = 1 + currentRank * 0.5;
        const upgradeCost = Math.floor(upgrade.cost * costMultiplier);
        const tooltip = createTooltip(
          `${CONFIG.towerUpgrades[type].description}\nCost: ${upgradeCost} credits`
        );
        positionTooltip(tooltip, e.clientX, e.clientY);
        upgradeBtn.tooltip = tooltip;
      });
      upgradeBtn.addEventListener("mouseleave", () => {
        if (upgradeBtn.tooltip) {
          removeTooltip(upgradeBtn.tooltip);
          upgradeBtn.tooltip = null;
        }
      });
    }

    if (mobileUpgradeBtn) {
      mobileUpgradeBtn.addEventListener("click", () => handleTowerUpgrade(type));
    }
  });
}

  function handleTowerUpgrade(type) {
    const upgrade = gameState.towerUpgrades[type];
    const upgradeType = Object.keys(upgrade).filter(key => key !== "cost" && key !== "description")[0];
    const currentRank = upgrade[upgradeType];
    const maxRank = 10;

    if (currentRank >= maxRank) {
      showNotification(`${type} Towers at max rank!`, "warning");
      return;
    }

    const costMultiplier = 1 + currentRank * 0.5;
    const upgradeCost = Math.floor(upgrade.cost * costMultiplier);

    if (gameState.credits < upgradeCost) {
      showNotification(`Not enough credits for ${type} upgrade!`, "error");
      return;
    }

    gameState.credits -= upgradeCost;
    gameState.totalCredits -= upgradeCost;
    upgrade[upgradeType]++;

    // Apply the upgrade to all existing towers of this type
  gameState.towers.forEach(tower => {
    if (tower.type === type) {
      tower[upgradeType] = true; // Enable the ability (e.g., powerAura, splinters)
    }
  });
    updateUI();

    const upgradeBtn = document.getElementById(`${type}-upgrade`);
    const mobileUpgradeBtn = document.getElementById(`mobile-${type}-upgrade`);
    const newRank = upgrade[upgradeType];
    if (newRank < 10) {
      const nextCostMultiplier = 1 + newRank * 0.5;
      const nextCost = Math.floor(upgrade.cost * nextCostMultiplier);
      upgradeBtn.textContent = `${type}: ${upgradeType} (Rank ${newRank}) - Next: ${nextCost}`;
      mobileUpgradeBtn.textContent = `${type}: ${upgradeType} (Rank ${newRank}) - Next: ${nextCost}`;
    } else {
      upgradeBtn.textContent = `${type}: ${upgradeType} (Max Rank)`;
      mobileUpgradeBtn.textContent = `${type}: ${upgradeType} (Max Rank)`;
    }

  logEvent(`${type.charAt(0).toUpperCase() + type.slice(1)} Towers Upgraded: ${upgradeType} to Rank ${upgrade[upgradeType]}`);

  upgradeBtn.style.setProperty('--progress', newRank);
  mobileUpgradeBtn.style.setProperty('--progress', newRank);
}

function updateBoostersUI() {
  const boosterSection = document.getElementById("pxj-boosters-section");
  if (boosterSection) {
    boosterSection.style.display = "block";
    const h2 = boosterSection.querySelector("h2");
    h2.textContent = `PXJourney Boosters (${gameState.boosterPoints} points)`;
    document.querySelectorAll("#PXJbooster-row .sidebar-btn").forEach(btn => {
      const type = btn.getAttribute("data-type");
      const booster = gameState.boosterRanks[type];
      btn.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} (Rank ${booster.rank}/${booster.maxRank}) - Cost: ${booster.cost}pt`;
    });
  }
}

function toggleGraphicsMode() {
  if (gameState.graphicsMode === "high") {
    gameState.graphicsMode = "low";
    document.getElementById("graphics-toggle-btn").textContent = "Graphics: Low";
  } else if (gameState.graphicsMode === "low") {
    gameState.graphicsMode = "off";
    document.getElementById("graphics-toggle-btn").textContent = "Graphics: Off";
  } else {
    gameState.graphicsMode = "high";
    document.getElementById("graphics-toggle-btn").textContent = "Graphics: High";
  }
  logEvent(`Graphics Mode: ${gameState.graphicsMode}`);
}

function handleMouseMove(e) {
  if (!gameState.selectedTower) {
    targetIndicator.setAttribute("opacity", "0");
    return;
  }

  const rect = svg.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (500 / rect.width);
  const y = (e.clientY - rect.top) * (500 / rect.height);
  updateTargetIndicator(x, y);
}

function handleTouchMove(e) {
  e.preventDefault();
  if (!gameState.selectedTower) {
    targetIndicator.setAttribute("opacity", "0");
    return;
  }

  const rect = svg.getBoundingClientRect();
  const touch = e.touches[0];
  const x = (touch.clientX - rect.left) * (500 / rect.width);
  const y = (touch.clientY - rect.top) * (500 / rect.height);
  updateTargetIndicator(x, y);
}


function updateTargetIndicator(x, y) {
  const gridX = Math.floor(x / CONFIG.grid.size) * CONFIG.grid.size;
  const gridY = Math.floor(y / CONFIG.grid.size) * CONFIG.grid.size;
  if (gridX >= 0 && gridX < 500 && gridY >= 0 && gridY < 500) {
    targetIndicator.setAttribute("x", gridX);
    targetIndicator.setAttribute("y", gridY);
    targetIndicator.setAttribute("opacity", "1");
    if (gameState.selectedTower) {
      rangePreview.setAttribute("cx", gridX + 25);
      rangePreview.setAttribute("cy", gridY + 25);
      rangePreview.setAttribute("r", CONFIG.towers[gameState.selectedTower].range.toString());
      rangePreview.setAttribute("stroke", CONFIG.towers[gameState.selectedTower].color);
      rangePreview.setAttribute("opacity", "1");
    }
  } else {
    targetIndicator.setAttribute("opacity", "0");
    rangePreview.setAttribute("opacity", "0");
  }
}

function handleBoardClick(e) {
  if (!gameState.selectedTower) return;
  const rect = svg.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (500 / rect.width);
  const y = (e.clientY - rect.top) * (500 / rect.height);
  showPlacementConfirmation(x, y);
}

function handleGlobalUpgrade(type) {
  const upgrade = gameState.globalUpgrades[type];
  if (upgrade.rank >= 10) {
    showNotification(`${type} at max rank!`, "warning");
    return;
  }
  if (gameState.credits < upgrade.cost) {
    showNotification(`Not enough credits for ${type} upgrade!`, "error");
    return;
  }
  gameState.credits -= upgrade.cost;
  upgrade.rank++;
  upgrade.cost = Math.floor(upgrade.cost * 2);
  updateAllTowers();
  const upgradeBtn = document.getElementById(`${type}-upgrade`);
  upgradeBtn.textContent = `${type}: Rank ${upgrade.rank} (${upgrade.cost})`;
  if (upgrade.rank === 10) upgradeBtn.classList.add("upgraded");
  logEvent(`${type} Upgraded to Rank ${upgrade.rank}`);
}

function updateAllTowers() {
  gameState.towers.forEach(tower => {
    tower.fireInterval = (tower.type === "fire" || tower.type === "ice" ? 100 : 500) / (1 + gameState.globalUpgrades.globalSpeed.rank * 0.05);
    tower.dps = tower.baseDps * Math.pow(1.15, tower.upgradeLevel) * (1 + gameState.globalUpgrades.globalDamage.rank * 0.05);
    tower.range = tower.baseRange * Math.pow(1.15, tower.upgradeLevel) * (1 + gameState.globalUpgrades.globalRange.rank * 0.05);
    tower.updateSize();
  });
}

function handleBoardTouch(e) {
  e.preventDefault();
  if (!gameState.selectedTower) return;
  const rect = svg.getBoundingClientRect();
  const touch = e.touches[0];
  const x = (touch.clientX - rect.left) * (500 / rect.width);
  const y = (touch.clientY - rect.top) * (500 / rect.height);
  showPlacementConfirmation(x, y);
}

function showPlacementConfirmation(x, y) {
  document.querySelectorAll(".confirm-popup").forEach(popup => popup.remove());
  const gridX = Math.floor(x / 50) * 50;
  const gridY = Math.floor(y / 50) * 50 ;

  // Validate position
  if (!gameState.selectedTower) {
    showNotification("No tower selected!", "warning");
    return;
  }

  const towerCost = CONFIG.towers[gameState.selectedTower].cost;
  if (gameState.credits < towerCost) {
    showNotification("Not Enough Credits!", "error");
    return;
  }

  if (isOnPath(gridX + 25, gridY + 25, gameState.pathPoints)) {
    showNotification("Cannot Place Tower On Path!", "error");
    return;
  }

  if (gridX < 0 || gridX >= 500 || gridY < 0 || gridY >= 500) {
    showNotification("Cannot Place Tower Outside Grid!", "error");
    return;
  }

  const occupied = gameState.towers.some(tower => tower.x === gridX + 25 && tower.y === gridY + 25);
  if (occupied) {
    showNotification("Space Already Occupied!", "error");
    return;
  }

// Show confirmation popup
  const confirmPopup = document.createElement("div");
  confirmPopup.className = "confirm-popup";
  confirmPopup.style.position = "absolute";
  confirmPopup.style.background = "rgba(0, 0, 0, 0.8)";
  confirmPopup.style.color = "white";
  confirmPopup.style.padding = "10px";
  confirmPopup.style.borderRadius = "5px";
  confirmPopup.style.zIndex = "1000";
  confirmPopup.innerHTML = `
    <p>Place ${gameState.selectedTower} Tower here for ${towerCost} credits?</p>
    <button class="confirm-btn">Confirm</button>
    <button class="cancel-btn">Cancel</button>
  `;

  // Calculate position relative to the SVG's position and scaling
  const svg = document.getElementById("game");
  const svgRect = svg.getBoundingClientRect();
  const scaleX = svgRect.width / 500; // SVG width in pixels / SVG coordinate width
  const scaleY = svgRect.height / 500; // SVG height in pixels / SVG coordinate height
  const screenX = svgRect.left + (gridX + 25) * scaleX; // Translate SVG coords to screen coords
  const screenY = svgRect.top + (gridY + 25) * scaleY;

  confirmPopup.style.left = `${screenX}px`;
  confirmPopup.style.top = `${screenY}px`;
  confirmPopup.style.transform = "translate(-50%, -50%)"; // Center the popup on the tower position

  document.body.appendChild(confirmPopup);

  confirmPopup.querySelector(".confirm-btn").addEventListener("click", () => {
    placeTower(x, y);
    confirmPopup.remove();
  });

  confirmPopup.querySelector(".cancel-btn").addEventListener("click", () => {
    confirmPopup.remove();
  });

  // Also support touch events for confirmation
  confirmPopup.querySelector(".confirm-btn").addEventListener("touchstart", () => {
    placeTower(x, y);
    confirmPopup.remove();
  });

  confirmPopup.querySelector(".cancel-btn").addEventListener("touchstart", () => {
    confirmPopup.remove();
  });
}

function placeTower(x, y) {
  const gridX = Math.floor(x / 50) * 50;
  const gridY = Math.floor(y / 50) * 50;

  if (!gameState.selectedTower) {
    showNotification("No tower selected!", "warning");
    return;
  }

  const towerCost = CONFIG.towers[gameState.selectedTower].cost;
  if (gameState.credits < towerCost) {
    showNotification("Not Enough Credits!", "error");
    // playSound("buttonClick");
    return;
  }

  if (isOnPath(gridX + 25, gridY + 25, gameState.pathPoints)) {
    showNotification("Cannot Place Tower On Path!", "error");
    // playSound("buttonClick");
    return;
  }

  if (gridX < 0 || gridX >= 500 || gridY < 0 || gridY >= 500) {
    showNotification("Cannot Place Tower Outside Grid!", "error");
    // playSound("buttonClick");
    return;
  }

  const occupied = gameState.towers.some(tower => tower.x === gridX + 25 && tower.y === gridY + 25);
  if (occupied) {
    showNotification("Space Already Occupied!", "error");
    // playSound("buttonClick");
    return;
  }

  const tower = new Tower(gameState.selectedTower, gridX, gridY, gameState.towerUpgrades[gameState.selectedTower]);
  gameState.towers.push(tower);

  gameState.credits -= towerCost;
  gameState.totalCredits -= towerCost;
  updateUI();

  // playSound("towerPlace");
  const svgRect = svg.getBoundingClientRect();
  const px = (gridX + 25) / 500 * svgRect.width + svgRect.left;
  const py = (gridY + 25) / 500 * svgRect.height + svgRect.top;
  createParticles(px, py, 15, CONFIG.towers[tower.type].color, 5, 1);

  showNotification(`Placed ${tower.type} Tower with ${CONFIG.towers[tower.type].description}!`, "success");

  // Reset the selected tower and UI
    gameState.selectedTower = null;
    document.querySelectorAll(".tower-btn").forEach(btn => btn.classList.remove("selected"));

    // Hide the target indicator and range preview
    targetIndicator.setAttribute("opacity", "0");
    rangePreview.setAttribute("opacity", "0"); // Add this line to hide the range preview

    logEvent(`Placed ${tower.type} Tower at (${gridX}, ${gridY})`);
}

function initializeGlobalUpgrades() {
  console.log("initializeGlobalUpgrades running");
  document.querySelectorAll(".sidebar-section .sidebar-btn").forEach(btn => {
    const id = btn.id;
    let type;

    if (id === "globalSpeed-upgrade") type = "globalSpeed";
    else if (id === "globalDamage-upgrade") type = "globalDamage";
    else if (id === "globalRange-upgrade") type = "globalRange";
    else if (id === "globalCrit-upgrade") type = "globalCrit";
    else if (id === "globalIncome-upgrade") type = "globalIncome";
    else if (id === "interest-upgrade") type = "globalInterest";
    else return; // Skip non-global upgrade buttons

    btn.addEventListener("click", function() {
      const upgrade = gameState.globalUpgrades[type];
      const costMultiplier = 1 + upgrade.rank * 0.5;
      const upgradeCost = Math.floor(upgrade.cost * costMultiplier);

      if (gameState.credits < upgradeCost) {
        showNotification(`Not enough credits for ${type} upgrade!`, "error");
        return;
      }

      gameState.credits -= upgradeCost;
      gameState.totalCredits -= upgradeCost;
      upgrade.rank++;

      // Apply the effect immediately
      if (["globalSpeed", "globalDamage", "globalRange"].includes(type)) {
        gameState.towers.forEach(tower => {
          tower.dps = tower.baseDps * (1 + gameState.globalUpgrades.globalDamage.rank * 0.05) * (1 + gameState.boosterRanks.damage.rank * 0.05);
          tower.fireRate = tower.fireRate / (1 + gameState.globalUpgrades.globalSpeed.rank * 0.05) / (1 + gameState.boosterRanks.attackspeed.rank * 0.05);
          tower.range = tower.baseRange * (1 + gameState.globalUpgrades.globalRange.rank * 0.05) * (1 + gameState.boosterRanks.range.rank * 0.05);
          if (tower.rangeCircle) {
            tower.rangeCircle.setAttribute("r", tower.range);
          }
        });
      }

      this.textContent = `${type === "globalCrit" ? "Critical Chance" : type === "globalDamage" ? "Tower Damage" : type === "globalSpeed" ? "Tower Speed" : type === "globalRange" ? "Tower Range" : type === "globalIncome" ? "Wave Income" : type === "globalInterest" ? "Interest" : type.charAt(0).toUpperCase() + type.slice(1)}: Rank ${upgrade.rank} (${upgradeCost})`;
      updateUI();
      logEvent(`Upgraded ${type} to Rank ${upgrade.rank}`);
    });

    // Initialize display
    const upgrade = gameState.globalUpgrades[type];
    const rank = upgrade.rank;
    btn.textContent = `${type === "globalCrit" ? "Critical Chance" : type === "globalDamage" ? "Tower Damage" : type === "globalSpeed" ? "Tower Speed" : type === "globalRange" ? "Tower Range" : type === "globalIncome" ? "Wave Income" : type === "globalInterest" ? "Interest" : type.charAt(0).toUpperCase() + type.slice(1)}: Rank ${rank} (${upgrade.cost})`;
  });
}

  // Call after DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initializeGlobalUpgrades();
  });
