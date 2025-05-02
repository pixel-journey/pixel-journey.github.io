var enemy = {
  current: null,

  generateEnemy: (wave) => {
    // console.log("enemy.generateEnemy called with wave:", wave)
    var enemyInfo = CONSTANTS.determineEnemy(wave)
    var tier = enemyInfo.tier
    var color = enemyInfo.color

    // Apply color affinity biases
    const affinities = ["yellow_affinity", "blue_affinity", "red_affinity"]
    let totalBias = 0
    const biases = {}
    affinities.forEach((affinity) => {
      if (player.skills[affinity]) {
        const chance = SKILLS.find((s) => s.id === affinity).getEffect(player.skills[affinity])
        biases[affinity] = chance
        totalBias += chance
      }
    })
    if (totalBias > 0 && Math.random() < totalBias) {
      const rand = Math.random() * totalBias
      let cumulative = 0
      for (const affinity in biases) {
        cumulative += biases[affinity]
        if (rand < cumulative) {
          color = affinity.split("_")[0]
          // console.log(`Color bias applied: ${color}`)
          break
        }
      }
    }

    // Apply story_chance and colorRush45s
    let tierChance = player.skills.story_chance
      ? SKILLS.find((s) => s.id === "story_chance").getEffect(player.skills.story_chance)
      : 0
    if (Array.isArray(player.activeBoosters)) {
      player.activeBoosters.forEach((booster) => {
        if (booster.key === "colorRush45s") {
          tierChance += SHOP.boosters.find((b) => b.id === booster.key).multiplier
          // console.log(`Booster colorRush45s added: ${tierChance}`)
        }
      })
    }
    if (Math.random() < tierChance) {
      tier = Math.min(tier + 1, 3)
      // console.log(`Tier encounter triggered! Upgraded to tier ${tier}`)
      ui.notify("Rare Enemy Encounter!", false)
    }

    var hp = CONSTANTS.getEnemyHP(tier, wave)
    var videoSrc = "./ingredients/Pixel_" + color + "_vid_25fps_1k.mp4"

    var enemy = {
      id: "enemy-" + Date.now(),
      tier: tier,
      color: color,
      hp: hp,
      maxHp: hp,
      xp: CONSTANTS.getXP(tier),
      colorDrain: 0,
      videoSrc: videoSrc,
      width: 0,
      height: 0,
    }
    // console.log("Generated enemy:", enemy)
    return enemy
  },

  spawnNewEnemy: function () {
    // console.log("enemy.spawnNewEnemy called")
    this.current = this.generateEnemy(gameState.wave)
    // console.log("Current enemy set:", this.current)

    var video = document.getElementById("enemy-video")
    
    // Clear enemy info before loading new enemy
    document.getElementById('enemy-name').textContent = ''
    document.getElementById('enemy-hp').textContent = ''
    
    video.src = this.current.videoSrc
    video.load()
    video.play().catch((error) => {
      console.error("Video play error:", error)
      video.poster = "./ingredients/Pixel_" + this.current.color + "_static.png"
      ui.notify("Failed to load enemy video, using static image.", true)
    })

    video.style.display = "block"
    video.style.opacity = "1"

    if (video) {
    video.onloadedmetadata = () => {
      this.current.width = video.videoWidth
      this.current.height = video.videoHeight
      // console.log("Video dimensions:", { width: this.current.width, height: this.current.height })
      video.style.maxWidth = "100%"
      video.style.maxHeight = "100%"
      ui.updateHealthBar()
    }
  }

    // ui.applyColorFilter(this.current.color)
    ui.updateHealthBar()

    video.style.transform = "scale(0.8)"
    setTimeout(() => {
      video.style.transform = "scale(1)"
    }, 50)

    if (player.statistics) {
      player.statistics.enemiesDefeated = (player.statistics.enemiesDefeated || 0) + 1
      player.save()
    }
  },

  damage: function(amount) {
    // console.log("enemy.damage called with amount:", amount)
    if (!this.current) {
      console.warn("No current enemy to damage")
      return
    }

    this.current.hp -= amount
    // console.log("Enemy HP after damage:", this.current.hp)

    this.current.colorDrain = clamp(1 - this.current.hp / this.current.maxHp, 0, 1)
    // console.log("Color drain:", this.current.colorDrain)

    const video = document.getElementById("enemy-video")
    video.style.transition = "transform 0.1s"
    video.style.transform = "scale(0.95)"
    setTimeout(() => (video.style.transform = "scale(1)"), 100)

    if (ui.settings && ui.settings.showDamageNumbers) {
      const damageText = document.createElement("div");
      damageText.className = "floating-text damage-text";
      damageText.textContent = `-${amount.toFixed(1)}`;

      // Center position with slight random offset
      const centerX = window.lastClickX / 2 || window.innerHeight / 2;
      const centerY = window.lastClickY / 2 || window.innerWidth / 2;

      // Random offset (-20px to +20px) for natural feel
      const randomOffsetX = (Math.random() * 20);
      const randomOffsetY = (Math.random() * 20 - 100); // Slightly more upward bias

      damageText.style.left = `${centerX + randomOffsetX}px`;
      damageText.style.top = `${centerY + 175 + randomOffsetY}px`; // Start 50px above center

      // Add animation properties
      damageText.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
      damageText.style.willChange = 'transform, opacity';

      document.getElementById("damage-numbers").appendChild(damageText);

      // Trigger animation in the next frame
      requestAnimationFrame(() => {
        damageText.style.transform = 'translateY(-80px)';
        damageText.style.opacity = '0';
      });

      // Remove after animation completes
      setTimeout(() => {
        damageText.remove();
      }, 1000);
    }

    // Check if enemy is defeated
    if (this.current.hp <= 0) {
      // Calculate kill bonus
      const killBonus = CONSTANTS.calculateKillBonus(this.current.tier, player.activeBoosters, this.current.color)
      player.earnDye(killBonus)
  
      // Add collection discovery
      COLLECTION.discoverIngredient(this.current.tier, this.current.color)
  
      // Play defeat sound
      AUDIO.play("enemyDefeat")
  
      // Apply kill damage boost talent if available
      if (player.talentEffects && player.talentEffects.kill_damage_boost) {
        player.talentEffects.kill_damage_boost.active = true;
        player.talentEffects.kill_damage_boost.expires = Date.now() + 
          (player.talentEffects.kill_damage_boost.duration * 1000);
        
        // Visual feedback
        ui.notify(`Overkill activated for ${player.talentEffects.kill_damage_boost.duration}s!`, false);
      }
    }
},
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
