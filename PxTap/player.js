var player = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  dye: { red: 0, blue: 0, yellow: 0 },
  tapDamage: 10,
  skills: {},
  activeBoosters: [],
  prestigePoints: 0,
  allocatedPrestigePoints: 0,
  nftBonus: 0,
  statistics: { enemiesDefeated: 0 },
  lastAutoTap: 0,
  talentEffects: {
    dye_multiplier: 1,
    tap_damage: 1,
    auto_tap_damage: 1,
    auto_tap_speed: 1,
    auto_multi_chance: 0,
    auto_crit_chance: 0,
    auto_tap_no_cooldown_chance: 0,
    specific_dye_boost: {},
    dye_double_chance: 0,
    critical_boost: { chance: 0, damage: 0 },
    kill_damage_boost: { active: false, value: 1, expires: 0 },
    skill_cost_reduction: 1,
    cross_dye_gain: 0,
    consecutive_tap_bonus: { value: 0, stacks: 0, maxStacks: 0 },
    tap_speed_damage: { value: 0, lastTapTime: 0, bonus: 0 },
  },
  inventory: [],
  maxInventorySlots: 16,
  inventorySlots: 2,

  init: function () {
    // console.log("player.init called")
    const savedPlayer = localStorage.getItem("pxjPlayer")
    if (savedPlayer) {
      const parsed = JSON.parse(savedPlayer)
      Object.assign(this, parsed)
      // Ensure activeBoosters is an array
      this.activeBoosters = Array.isArray(parsed.activeBoosters) ? parsed.activeBoosters : []

        // Initialize talent effects
  this.talentEffects = {
    dye_multiplier: 1,
    tap_damage: 1,
    auto_tap_damage: 1,
    auto_tap_speed: 1,
    auto_multi_chance: 0,
    auto_crit_chance: 0,
    auto_tap_no_cooldown_chance: 0,
    specific_dye_boost: {},
    dye_double_chance: 0,
    critical_boost: { chance: 0, damage: 0 },
    kill_damage_boost: { active: false, value: 1, duration: 5, expires: 0 },
    skill_cost_reduction: 1,
    cross_dye_gain: 0,
    consecutive_tap_bonus: { value: 0, stacks: 0, maxStacks: 0, lastTapTime: 0 },
    tap_speed_damage: { value: 0, lastTapTime: 0, bonus: 0 },
  };
  
  // Apply talent effects if any talents are purchased
  if (PRESTIGE_TALENTS) {
    PRESTIGE_TALENTS.applyAllTalentEffects();
  }
    }
  },

  calculateTapDamage: function () {
    // console.log("player.calculateTapDamage called")
    let damage = this.tapDamage
    // console.log("Base tapDamage:", damage)

    // Apply damage-related skill effects
    for (const skillId in this.skills) {
      const skill = SKILLS.find((s) => s.id === skillId)
      if (!skill || typeof skill.getEffect !== "function") {
        console.warn(`Invalid skill or getEffect for ${skillId}`)
        continue
      }
      if (skillId !== "tap_power" && skillId !== "crit_multiplier") continue
      const effect = skill.getEffect(this.skills[skillId])
      if (effect <= 0 || isNaN(effect)) {
        console.warn(`Invalid effect for ${skillId}: ${effect}`)
        continue
      }
      damage *= effect
      // console.log(`Skill ${skillId} effect: ${effect}, damage: ${damage}`)
    }

    // Apply talent effects to tap damage
    damage *= this.talentEffects.tap_damage;
    // console.log(`Applied talent tap_damage effect: ${this.talentEffects.tap_damage}, damage: ${damage}`);

    // Apply killing momentum talent effect if active
    if (this.talentEffects.kill_damage_boost.active && Date.now() < this.talentEffects.kill_damage_boost.expires) {
      damage *= this.talentEffects.kill_damage_boost.value;
      // console.log(`Applied killing momentum effect: ${this.talentEffects.kill_damage_boost.value}, damage: ${damage}`);
    }

    // Apply consecutive tap bonus if active
    if (this.talentEffects.consecutive_tap_bonus.maxStacks > 0) {
      const now = Date.now();
      if (now - this.talentEffects.consecutive_tap_bonus.lastTapTime < 500) {
        // Increment stacks up to max
        this.talentEffects.consecutive_tap_bonus.stacks = Math.min(
          this.talentEffects.consecutive_tap_bonus.stacks + 1,
          this.talentEffects.consecutive_tap_bonus.maxStacks
        );
      } else {
        // Reset stacks if too much time has passed
        this.talentEffects.consecutive_tap_bonus.stacks = 1;
      }
      
      // Apply stack bonus
      const stackBonus = 1 + (this.talentEffects.consecutive_tap_bonus.value * this.talentEffects.consecutive_tap_bonus.stacks);
      damage *= stackBonus;
      // console.log(`Applied consecutive tap bonus: ${stackBonus} (${this.talentEffects.consecutive_tap_bonus.stacks} stacks), damage: ${damage}`);
      
      // Update last tap time
      this.talentEffects.consecutive_tap_bonus.lastTapTime = now;
    }

    // Apply critical hit
    let critChance = this.skills.crit_chance
      ? SKILLS.find((s) => s.id === "crit_chance").getEffect(this.skills.crit_chance)
      : 0
    
    // Add talent critical boost
    critChance += this.talentEffects.critical_boost.chance;
    // console.log(`Added talent critical chance: ${this.talentEffects.critical_boost.chance}, total: ${critChance}`);
    
    const critMultiplier = this.skills.crit_multiplier
      ? SKILLS.find((s) => s.id === "crit_multiplier").getEffect(this.skills.crit_multiplier)
      : 1
    
    // Apply talent critical damage boost
    const talentCritMultiplier = this.talentEffects.critical_boost.damage;
    
    this.activeBoosters.forEach((booster) => {
      if (booster.key === "critChance30s") {
        critChance += SHOP.boosters.find((b) => b.id === booster.key).multiplier
        // console.log(`Booster critChance30s added: ${critChance}`)
      }
    })
    if (Math.random() < critChance) {
      damage *= critMultiplier * talentCritMultiplier;
      // console.log(`Critical hit! Multiplier: ${critMultiplier} * ${talentCritMultiplier}, damage: ${damage}`)
      ui.notify("Critical Hit!", false)
    }

    // Apply damage booster
    this.activeBoosters.forEach((booster) => {
      if (booster.key === "megaTap10s") {
        const boosterDef = SHOP.boosters.find((b) => b.id === booster.key)
        damage *= boosterDef.multiplier
        // console.log(`Booster ${booster.key} multiplier: ${boosterDef.multiplier}, damage: ${damage}`)
      }
    })

    // Additional multipliers
    damage *= 1 + this.prestigePoints / 100
    // console.log(`Prestige bonus: ${1 + this.prestigePoints / 100}, damage: ${damage}`)

    damage *= 1 + this.nftBonus / 100
    // console.log(`NFT bonus: ${1 + this.nftBonus / 100}, damage: ${damage}`)

    damage *= 1 + gameState.wave / 5
    // console.log(`Wave scaling: ${1 + gameState.wave / 5}, damage: ${damage}`)

    // Prevent zero or near-zero damage
    if (isNaN(damage) || damage <= 1) {
      console.error("Invalid damage calculated:", damage)
      damage = this.tapDamage
    }

    // console.log("Final damage:", damage)
    return damage
  },

  addXP: function (amount) {
    let modifiedAmount = amount
    if (this.skills.bonus_xp) {
      const effect = SKILLS.find((s) => s.id === "bonus_xp").getEffect(this.skills.bonus_xp)
      modifiedAmount *= effect
      // console.log(`XP skill effect: ${effect}, amount: ${modifiedAmount}`)
    }
    this.activeBoosters.forEach((booster) => {
      if (booster.key === "xpBoost45s") {
        const boosterDef = SHOP.boosters.find((b) => b.id === booster.key)
        if (boosterDef) {
          modifiedAmount *= boosterDef.multiplier
          // console.log(`XP booster effect: ${boosterDef.multiplier}, amount: ${modifiedAmount}`)
        }
      }
    })
    modifiedAmount *= 1 + this.nftBonus / 100
    this.xp += modifiedAmount
        ui.updateXPBar()
    while (this.xp >= this.xpToNext) {
      this.levelUp()
    }

    
    // console.log("XP awarded:", modifiedAmount)
  },

  levelUp: function () {
    this.xp -= this.xpToNext
    this.level++
    this.xpToNext = Math.round(100 * Math.pow(1.15, this.level - 1))
    //this.xpToNext = Math.round(100 + Math.pow(this.level, 2.3) * 20);
    ui.notify("Level Up! " + this.level, false)
    if (this.level % 1 === 0) {
      const skills = this.getRandomSkills(3)
      if (ui.settings.autoSelectSkills) {
        // Auto-select the cheapest affordable skill
        const affordableSkills = skills.filter(skill => {
          const level = this.skills[skill.id] || 0
          const cost = Math.round(skill.baseCost * Math.pow(1.5, level))
          return this.dye[skill.type] >= cost
        })
        
        if (affordableSkills.length > 0) {
          // Sort by cost and select first one in case of equal costs
          const cheapestSkill = affordableSkills.sort((a, b) => {
            const levelA = this.skills[a.id] || 0
            const levelB = this.skills[b.id] || 0
            const costA = Math.round(a.baseCost * Math.pow(1.5, levelA))
            const costB = Math.round(b.baseCost * Math.pow(1.5, levelB))
            return costA - costB
          })[0]
          
          this.upgradeSkill(cheapestSkill.id)
        }
      } else {
        ui.showSkillChoice(skills)
      }
    }
  },

  getRandomSkills: function (count) {
    const availableSkills = SKILLS.filter((skill) => !this.skills[skill.id] || this.skills[skill.id] < skill.maxLevel)
    if (availableSkills.length === 0) return []
    const shuffled = availableSkills.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, Math.min(count, shuffled.length))
  },

  upgradeSkill: function (skillId) {
    const skill = SKILLS.find((s) => s.id === skillId)
    const level = this.skills[skillId] || 0
    if (level >= skill.maxLevel) {
      ui.notify("Skill at max level!", true)
      return false
    }
    const cost = Math.round(skill.baseCost * (1 + level * level))
    if (this.dye[skill.type] < cost) {
      ui.notify(`Need ${cost} ${skill.type} dye to upgrade!`, true)
      return false
    }
    this.dye[skill.type] -= cost
    this.skills[skillId] = level + 1
    ui.notify(`${skill.name} upgraded to level ${this.skills[skillId]}`, false)
    this.save()
    return true
  },

  earnDye: function (dyeReward, clickX, clickY) {
  // console.log("player.earnDye called with:", dyeReward)
  
  // Apply global talent effects to all dye rewards before processing individual colors
  if (this.talentEffects && this.talentEffects.dye_double_chance > 0) {
    if (Math.random() < this.talentEffects.dye_double_chance) {
      ui.notify("Dye Explosion! Double rewards!", false);
      for (const color in dyeReward) {
        dyeReward[color] *= 2;
      }
    }
  }
  
  for (const color in dyeReward) {
    if (this.dye.hasOwnProperty(color)) {
      let amount = dyeReward[color] * (1 + this.nftBonus / 100)
      
      // Apply talent dye multiplier
      amount *= this.talentEffects.dye_multiplier;
      // console.log(`Applied talent dye multiplier: ${this.talentEffects.dye_multiplier}, amount: ${amount}`);
      
      // Apply specific dye boost if active
      if (this.talentEffects.specific_dye_boost && 
          this.talentEffects.specific_dye_boost.color === color && 
          this.talentEffects.specific_dye_boost.value > 1) {
        amount *= this.talentEffects.specific_dye_boost.value;
        // console.log(`Applied specific dye boost for ${color}: ${this.talentEffects.specific_dye_boost.value}, amount: ${amount}`);
      }
      
      // Apply existing skill boosts
      if (this.skills[`dye_boost_${color}`]) {
        const effect = SKILLS.find((s) => s.id === `dye_boost_${color}`).getEffect(this.skills[`dye_boost_${color}`])
        amount *= effect
        // console.log(`Dye boost (${color}) effect: ${effect}, amount: ${amount}`)
      }

      if (this.skills.bonus_color_drop) {
        const effect = SKILLS.find((s) => s.id === "bonus_color_drop").getEffect(this.skills.bonus_color_drop)
        amount *= effect
        // console.log(`Dye skill effect (bonus_color_drop): ${effect}, amount: ${amount}`)
      }
      
      // Apply booster effects
      if (this.activeBoosters.some((booster) => booster.key === "doubleDye60s")) {
        const boosterDef = SHOP.boosters.find((b) => b.id === "doubleDye60s")
        amount *= boosterDef.multiplier
        // console.log(`Applied doubleDye60s multiplier: ${boosterDef.multiplier}, amount: ${amount}`)
      }

      // Round to integer
      amount = Math.round(amount);
      this.dye[color] += amount
      
      // Apply dye synergy talent effect - gain a percentage of other dye colors
      if (this.talentEffects.cross_dye_gain > 0) {
        for (const otherColor in this.dye) {
          if (otherColor !== color && this.dye.hasOwnProperty(otherColor)) {
            const synergy = Math.round(amount * this.talentEffects.cross_dye_gain);
            this.dye[otherColor] += synergy;
            // console.log(`Applied dye synergy: ${synergy} ${otherColor} dye`);
          }
        }
      }
      
      if (amount > 0) {
        // Pass click coordinates to the notification
        ui.notify(`+${amount.toFixed(0)} ${color} dye`, false, {
          x: clickX,
          y: clickY,
          color: color,
        })
      }
    }
  }
  ui.updateCurrencyBar()
  this.save()
},

  purchaseBooster: function (boosterId) {
    // console.log("player.purchaseBooster called with:", boosterId)
    const booster = SHOP.boosters.find((b) => b.id === boosterId)
    if (!booster) {
      ui.notify("Booster not found!", true)
      return false;
    }
    if (this.dye.red < booster.cost.red || this.dye.blue < booster.cost.blue || this.dye.yellow < booster.cost.yellow) {
      ui.notify(`Not enough dye for ${booster.name}`, true)
      return false;
    }
    this.dye.red -= booster.cost.red
    this.dye.blue -= booster.cost.blue
    this.dye.yellow -= booster.cost.yellow

    // Calculate duration with all applicable bonuses
    let duration = booster.baseDuration
    let durationMultiplier = 1

    if (this.skills.booster_duration) {
      const effect = SKILLS.find((s) => s.id === "booster_duration").getEffect(this.skills.booster_duration)
      durationMultiplier *= effect
      // console.log(`Booster duration effect: ${effect}`)
    }

    if (this.skills.shop_booster_duration) {
      const effect = SKILLS.find((s) => s.id === "shop_booster_duration").getEffect(this.skills.shop_booster_duration)
      durationMultiplier *= effect
      // console.log(`Shop booster duration effect: ${effect}`)
    }

    duration *= durationMultiplier
    // console.log(`Final booster duration: ${duration}ms (${duration / 1000}s)`)

    // Ensure activeBoosters is an array
    this.activeBoosters = Array.isArray(this.activeBoosters) ? this.activeBoosters : []

    // Check if the same booster is already active
    const existingBoosterIndex = this.activeBoosters.findIndex((b) => b.key === boosterId)
    if (existingBoosterIndex >= 0) {
      // If the same booster exists, extend its duration instead of adding a new one
      const existingBooster = this.activeBoosters[existingBoosterIndex]
      const remainingTime = Math.max(0, existingBooster.expires - Date.now())
      this.activeBoosters[existingBoosterIndex].expires = Date.now() + remainingTime + duration
      ui.notify(`Extended ${booster.name} duration!`, false)
    } else {
    // Add new booster
    this.activeBoosters.push({
      key: boosterId,
      expires: Date.now() + duration,
    })
    ui.notify(`${booster.name} activated!`, false)
    }

    // Play purchase sound
    AUDIO.play("purchase")

    this.save()
    ui.renderBoosters() // Update boosters display immediately

// Pass true to reattach listeners after purchase
    // Don't close the panel if called from buff bar
    // Only close if we're in the shop panel
    const shopPanel = document.getElementById("shop-panel")
    if (shopPanel && shopPanel.classList.contains("active")) {
      ui.togglePanel("shop-panel")
    }
    
    return true;
  },

  updateBoosters: function () {
    const now = Date.now()

    // Check if any boosters are about to expire (within 5 seconds)
    if (Array.isArray(this.activeBoosters)) {
      const expiringBoosters = this.activeBoosters.filter(
        (booster) => booster.expires > now && booster.expires < now + 5000,
      )

      // Notify about expiring boosters
      expiringBoosters.forEach((booster) => {
        const boosterDef = SHOP.boosters.find((b) => b.id === booster.key)
        if (boosterDef && !booster.notifiedExpiring) {
          ui.notify(`${boosterDef.name} expiring soon!`, false)
          booster.notifiedExpiring = true
        }
      })

      // Check for newly expired boosters
      const previousCount = this.activeBoosters.length
      this.activeBoosters = this.activeBoosters.filter((booster) => {
        const active = booster.expires > now
        if (!active) {
          // Booster just expired
          const boosterDef = SHOP.boosters.find((b) => b.id === booster.key)
          if (boosterDef) {
            ui.notify(`${boosterDef.name} has expired`, false)
          }
        }
        return active
      })

      // Only update UI if boosters changed
      if (previousCount !== this.activeBoosters.length) {
        ui.renderBoosters()
      }
    } else {
      this.activeBoosters = []
      ui.renderBoosters()
    }
  },

  prestige: function () {
    const multiplier = this.skills.prestige_gain
      ? SKILLS.find((s) => s.id === "prestige_gain").getEffect(this.skills.prestige_gain)
      : 1
    const earnedPoints = Math.floor((this.level / 10 + gameState.wave / 10) * multiplier)
    
    // Initialize stats object if it doesn't exist
    if (!this.stats) {
      this.stats = {
        totalPrestiges: 0,
        highestPrestigePoints: 0,
        totalPrestigePointsEarned: 0,
        prestigeHistory: []
      }
    }
    
    // Update prestige stats
    this.stats.totalPrestiges = (this.stats.totalPrestiges || 0) + 1
    this.stats.highestPrestigePoints = Math.max(this.stats.highestPrestigePoints || 0, earnedPoints)
    this.stats.totalPrestigePointsEarned = (this.stats.totalPrestigePointsEarned || 0) + earnedPoints
    
    // Add to history (keep last 10 entries)
    const historyEntry = {
      date: new Date().toISOString(),
      points: earnedPoints,
      level: this.level,
      wave: gameState.wave
    }
    
    this.stats.prestigeHistory = this.stats.prestigeHistory || []
    this.stats.prestigeHistory.unshift(historyEntry)
    if (this.stats.prestigeHistory.length > 10) {
      this.stats.prestigeHistory.pop()
    }
    
    // Save UI settings before prestige
    const uiSettings = localStorage.getItem("pxjUISettings")
    
    // Reset game state
    this.prestigePoints += earnedPoints
    this.level = 1
    this.xp = 0
    this.xpToNext = 100
    this.dye = { red: 0, blue: 0, yellow: 0 }
    this.tapDamage = 10
    this.skills = {}
    this.activeBoosters = []
    this.lastAutoTap = 0
    this.inventorySlots = 2
    PRESTIGE_TALENTS.purchasedTalents = []

    // Reset wave progress
    gameState.wave = 1
    localStorage.setItem("pxjWave", gameState.wave)
    enemy.spawnNewEnemy()

    // Restore UI settings after prestige
    if (uiSettings) {
        localStorage.setItem("pxjUISettings", uiSettings)
    }

    this.save()
    return earnedPoints
  },

  
// Add this new method to handle enemy defeat effects
onEnemyDefeated: function() {
  // Apply killing momentum talent effect
  if (this.talentEffects.kill_damage_boost.value > 1) {
    this.talentEffects.kill_damage_boost.active = true;
    this.talentEffects.kill_damage_boost.expires = Date.now() + 5000; // 5 seconds
    // console.log(`Activated killing momentum for 5 seconds, boost: ${this.talentEffects.kill_damage_boost.value}`);
  }
  
  // Apply dye specialization talent effect - chance to double a random dye color
  if (this.talentEffects.dye_double_chance > 0 && Math.random() < this.talentEffects.dye_double_chance) {
    const colors = ["red", "blue", "yellow"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const currentAmount = this.dye[randomColor];
    const bonusAmount = currentAmount * 0.5; // 50% bonus
    
    this.dye[randomColor] += bonusAmount;
    // console.log(`Dye specialization activated: +${bonusAmount.toFixed(1)} ${randomColor} dye`);
    ui.notify(`Dye Specialization: +${bonusAmount.toFixed(1)} ${randomColor} dye!`, false);
    ui.updateCurrencyBar();
  }
},

  setNFTBonus: function (bonus) {
    this.nftBonus = bonus
    this.save()
  },

  getAutoTapDPS: function() {
    let dps = 0;
    if (this.skills.auto_tap) {
        const baseDamage = this.calculateTapDamage() * this.talentEffects.auto_tap_damage;
        
        // Default tap speed is once per 1000ms
        let tapSpeed = 1000;
        
        // Check if autoTap30s booster is active
        if (Array.isArray(this.activeBoosters)) {
            this.activeBoosters.forEach((booster) => {
                if (booster.key === "autoTap30s") {
                    // Increase speed by 500% (reduce interval to 200ms)
                    tapSpeed = 200;
                }
            });
        }
        
        // Calculate DPS based on damage and tap speed
        dps = (baseDamage * 1000) / tapSpeed;
    }
    return dps;
},

  getTapDamage: function() {
    return this.calculateTapDamage();
  },

  getCriticalChance: function() {
    let critChance = this.skills.crit_chance
      ? SKILLS.find((s) => s.id === "crit_chance").getEffect(this.skills.crit_chance)
      : 0;
    critChance += this.talentEffects.critical_boost.chance;
    return critChance;
  },

  addToInventory: function(item) {
    if (this.inventory.length >= this.maxInventorySlots) {
      ui.notify("Inventory is full!", true);
      return false;
    }
    this.inventory.push(item);
    this.save();
    ui.renderInventory();
    return true;
  },

  removeFromInventory: function(index) {
    if (index >= 0 && index < this.inventory.length) {
      this.inventory.splice(index, 1);
      this.save();
      ui.renderInventory();
      return true;
    }
    return false;
  },

  save: function () {
    localStorage.setItem(
      "pxjPlayer",
      JSON.stringify({
        level: this.level,
        xp: this.xp,
        xpToNext: this.xpToNext,
        dye: this.dye,
        tapDamage: this.tapDamage,
        skills: this.skills,
        activeBoosters: this.activeBoosters,
        prestigePoints: this.prestigePoints,
        allocatedPrestigePoints: this.allocatedPrestigePoints,
        nftBonus: this.nftBonus,
        statistics: this.statistics,
        lastAutoTap: this.lastAutoTap,
        inventory: this.inventory,
        maxInventorySlots: this.maxInventorySlots,
        inventorySlots: this.inventorySlots,
      }),
    )
  },
}
