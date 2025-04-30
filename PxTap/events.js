var events = {
  tapEnemy: () => {
    console.log("events.tapEnemy called")
    if (!enemy.current) {
      console.warn("No current enemy to tap")
      return
    }

    var damage = player.calculateTapDamage()
    console.log("Damage calculated:", damage)

    // Apply multi_tap
    var tapCount = 1
    if (player.skills.multi_tap) {
      const multiTapChance = SKILLS.find((s) => s.id === "multi_tap").getEffect(player.skills.multi_tap)
      if (Math.random() < multiTapChance) {
        tapCount = Math.floor(2 + Math.random() * 4) // 2 to 5 taps
        console.log(`Multi-tap triggered! Tap count: ${tapCount}`)
        ui.notify(`Multi-Tap x${tapCount}!`, false)
      }
    }

    // Get the click coordinates from the last tap event
    const clickX = window.lastClickX || window.innerWidth / 2
    const clickY = window.lastClickY || window.innerHeight / 2

    for (let i = 0; i < tapCount; i++) {
      enemy.damage(damage);
      console.log(`Tap ${i + 1}: ${damage} damage dealt`)

    }

    var dyeReward = CONSTANTS.calculateDyePerTap(enemy.current.tier, damage, player.activeBoosters, enemy.current.color)
    console.log("Dye reward calculated:", dyeReward)
            // Pass click coordinates to earnDye for visual feedback
        player.earnDye(dyeReward, clickX, clickY)

    var xpReward = enemy.current.xp
    console.log("XP reward:", xpReward)
    player.addXP(xpReward)

    if (enemy.current.hp <= 0) {
      console.log("Enemy defeated:", enemy.current)
      gameState.wave++
      localStorage.setItem("pxjWave", gameState.wave)

      enemy.current = null

      setTimeout(() => {
        enemy.spawnNewEnemy()
      }, 100)

      if (gameState.wave % 10 === 0) {
        var skills = player.getRandomSkills(3)
        ui.showSkillChoice(skills)
      }
    }
  },

  autoTap: function () {
    if (!enemy.current) return
    const now = Date.now()
    let delay = 1000 // Default 1s

    // Apply auto_tap_speed skill if available
    if (player.skills.auto_tap_speed) {
      const speedEffect = SKILLS.find((s) => s.id === "auto_tap_speed").getEffect(player.skills.auto_tap_speed)
      if (!isNaN(speedEffect) && speedEffect > 0) {
        delay = speedEffect * 1000
      }
    }

    let shouldAutoTap = false

        // Check if autoTap30s booster is active
        if (Array.isArray(player.activeBoosters) && player.activeBoosters.some((booster) => booster.key === "autoTap30s")) {
          // If autoTap30s is active, ensure we tap at least once per second
          delay = Math.min(delay, 200)
          shouldAutoTap = true
          //console.log("Auto tap booster is active")
        }
        // Otherwise check if auto_tap skill is active
        else if (player.skills.auto_tap) {
          shouldAutoTap = true
          //console.log("Auto tap skill is active")
        }

        // Execute auto tap if conditions are met
        if (shouldAutoTap && now - player.lastAutoTap >= delay) {
          player.lastAutoTap = now
          console.log(`Auto tap executing with delay: ${delay}ms`)
          this.tapEnemy()
          return true // Return true if auto tap was executed
        }

        return false // Return false if auto tap was not executed
      },
}
