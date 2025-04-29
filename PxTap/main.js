var gameState = {
  wave: 1,
}

var lastClickTime = 0
var TAP_RATE_LIMIT = 50 // ms between taps
var tapCount = 0
var TAP_BATCH_SIZE = 100

function initGame() {
  safeCall(() => {
    player.init()
    AUDIO.init()
    PARTICLES.init()
    COLLECTION.init()
    ACHIEVEMENTS.init()
    DAILY_REWARDS.init()
    TUTORIAL.init()
    SETTINGS.init()
    if (typeof WALLET !== "undefined") {
      WALLET.init()
    } else {
      console.warn("WALLET not defined, skipping wallet initialization")
    }

    var savedWave = localStorage.getItem("pxjWave")
    if (savedWave) {
      gameState.wave = Number.parseInt(savedWave, 10)
    }

    ui.init()
    SHOP.initBoosterListeners()
    SHOP.renderShop()
    enemy.spawnNewEnemy()
    requestAnimationFrame(gameLoop)
  }, "initGame")
}

function gameLoop(timestamp) {
  safeCall(() => {
    updateGame()
    renderGame()
    requestAnimationFrame(gameLoop)
  }, "gameLoop")
}

function updateGame() {
  if (!enemy.current) return
  player.updateBoosters()
  ACHIEVEMENTS.check()
  // Update UI indicators
   try {
     ui.checkUpgradeNotice()
   } catch (e) {
     console.warn("Error in checkUpgradeNotice:", e)
   }

   try {
     ui.checkPrestigeIndicator()
   } catch (e) {
     console.warn("Error in checkPrestigeIndicator:", e)
   }

   // Call autoTap function to handle automatic tapping
   try {
     events.autoTap()
   } catch (e) {
     console.error("Error in autoTap:", e)
   }

  // Update UI elements that need frequent updates
ui.updateHealthBar()
ui.renderBoosters()
}

function renderGame() {
  ui.updateWaveCounter()
  ui.updateCurrencyBar()
  ui.updateXPBar()
  ui.updateLevelTracker()
  ui.renderBoosters()
}

function handleTap(event) {
  event.preventDefault() // Prevent zoom/scroll
  var now = Date.now()
  if (now - lastClickTime < TAP_RATE_LIMIT) {
    ui.showAntiCheatWarning()
    return
  }
  lastClickTime = now
  tapCount++

  // Store the click coordinates globally for use in animations
  window.lastClickX = event.clientX || (event.touches && event.touches[0].clientX) || window.innerWidth / 2
  window.lastClickY = event.clientY || (event.touches && event.touches[0].clientY) || window.innerHeight / 2

  AUDIO.play("tap")
  safeCall(() => {
    events.tapEnemy()
    PARTICLES.createTapParticles(window.lastClickX, window.lastClickY, enemy.current ? enemy.current.color : null)
  }, "tapEnemy")

  if (tapCount >= TAP_BATCH_SIZE) {
    console.log({
      playerID: "player1",
      tapCount: tapCount,
      enemyID: enemy.current ? enemy.current.id : "none",
      avgTapRate: TAP_RATE_LIMIT,
      dyeGained: player.dye,
      timestamp: now,
    })
    tapCount = 0
  }
}

function safeCall(fn, name) {
  try {
    fn()
  } catch (e) {
    console.error(`Error in ${name}:`, e)
    ui.notify("An error occurred. Check console for details.", true)
  }
}

document.getElementById("enemy-container").addEventListener("click", handleTap)
document.getElementById("enemy-container").addEventListener("touchstart", handleTap)
document.getElementById("settings-icon").addEventListener("click", () => ui.togglePanel("settings-panel"))
document.addEventListener("DOMContentLoaded", () => safeCall(initGame, "initGame"))
