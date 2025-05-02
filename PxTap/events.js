var events = {
  tapEnemy: function() {
    // console.log("events.tapEnemy called")
    if (!enemy.current) {
      console.warn("No current enemy to tap")
      return
    }

    // Calculate base damage
    var damage = player.calculateTapDamage()
    
    // Apply talent effects to damage
    if (player.talentEffects) {
      // Apply tap damage multiplier
      damage *= player.talentEffects.tap_damage;
      
      // Apply consecutive tap bonus if active
      if (player.talentEffects.consecutive_tap_bonus.value > 0) {
        const now = Date.now();
        if (now - player.lastTapTime < 500) { // Within 0.5s
          player.talentEffects.consecutive_tap_bonus.stacks = 
            Math.min(player.talentEffects.consecutive_tap_bonus.maxStacks, 
                    player.talentEffects.consecutive_tap_bonus.stacks + 1);
        } else {
          player.talentEffects.consecutive_tap_bonus.stacks = 1;
        }
        
        const stackBonus = player.talentEffects.consecutive_tap_bonus.value * 
                           player.talentEffects.consecutive_tap_bonus.stacks;
        damage *= (1 + stackBonus);
        player.lastTapTime = now;
      }
      
      // Apply kill damage boost if active
      if (player.talentEffects.kill_damage_boost.active && 
          Date.now() < player.talentEffects.kill_damage_boost.expires) {
        damage *= player.talentEffects.kill_damage_boost.value;
      }
    }

    // Apply multi_tap
    var tapCount = 1
    if (player.skills.multi_tap) {
      const multiTapChance = SKILLS.find((s) => s.id === "multi_tap").getEffect(player.skills.multi_tap)
      if (Math.random() < multiTapChance) {
        tapCount = Math.floor(2 + Math.random() * 4) // 2 to 5 taps
        // console.log(`Multi-tap triggered! Tap count: ${tapCount}`)
        ui.notify(`Multi-Tap x${tapCount}!`, false)
      }
    }

    // Get the click coordinates from the last tap event
    const clickX = window.lastClickX || window.innerWidth / 2
    const clickY = window.lastClickY || window.innerHeight / 2

    for (let i = 0; i < tapCount; i++) {
      enemy.damage(damage);
      // console.log(`Tap ${i + 1}: ${damage} damage dealt`)

    }

    var dyeReward = CONSTANTS.calculateDyePerTap(enemy.current.tier, damage, player.activeBoosters, enemy.current.color)
    // console.log("Dye reward calculated:", dyeReward)
            // Pass click coordinates to earnDye for visual feedback
        player.earnDye(dyeReward, clickX, clickY)

    var xpReward = enemy.current.xp
    // console.log("XP reward:", xpReward)
    player.addXP(xpReward)

    if (enemy.current.hp <= 0) {
      // console.log("Enemy defeated:", enemy.current)
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
      // console.log(`Auto tap executing with delay: ${delay}ms`)
      this.tapEnemy()
      return true // Return true if auto tap was executed
    }

    // Check for cooldown skip chance from talents
    let shouldSkipCooldown = false;
    if (player.talentEffects && player.talentEffects.auto_tap_no_cooldown_chance > 0) {
      shouldSkipCooldown = Math.random() < player.talentEffects.auto_tap_no_cooldown_chance;
    }

    // Set next auto tap time
    let cooldown = delay; // Use the calculated delay as cooldown
    if (player.talentEffects && player.talentEffects.auto_tap_speed > 1) {
      cooldown /= player.talentEffects.auto_tap_speed;
    }
    
    if (!shouldSkipCooldown) {
      player.nextAutoTap = Date.now() + cooldown;
    } else {
      // Visual feedback for cooldown skip
      ui.notify("Auto-tap cooldown skipped!", false);
    }

    return false // Return false if auto tap was not executed
  },
}
