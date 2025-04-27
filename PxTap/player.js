var player = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  dye: { red: 0, blue: 0, yellow: 0 },
  tapDamage: 10,
  skills: {},
  activeBoosters: [],
  prestigePoints: 0,
  nftBonus: 0,
  statistics: { enemiesDefeated: 0 },
  lastAutoTap: 0,

  init: function () {
    console.log("player.init called")
    const savedPlayer = localStorage.getItem("pxjPlayer")
    if (savedPlayer) {
      const parsed = JSON.parse(savedPlayer)
      Object.assign(this, parsed)
      // Ensure activeBoosters is an array
      this.activeBoosters = Array.isArray(parsed.activeBoosters) ? parsed.activeBoosters : []
    }
  },

  calculateTapDamage: function () {
    console.log("player.calculateTapDamage called")
    let damage = this.tapDamage
    console.log("Base tapDamage:", damage)

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
      console.log(`Skill ${skillId} effect: ${effect}, damage: ${damage}`)
    }

    // Apply critical hit
    let critChance = this.skills.crit_chance
      ? SKILLS.find((s) => s.id === "crit_chance").getEffect(this.skills.crit_chance)
      : 0
    const critMultiplier = this.skills.crit_multiplier
      ? SKILLS.find((s) => s.id === "crit_multiplier").getEffect(this.skills.crit_multiplier)
      : 1
    this.activeBoosters.forEach((booster) => {
      if (booster.key === "critChance30s") {
        critChance += SHOP.boosters.find((b) => b.id === booster.key).multiplier
        console.log(`Booster critChance30s added: ${critChance}`)
      }
    })
    if (Math.random() < critChance) {
      damage *= critMultiplier
      console.log(`Critical hit! Multiplier: ${critMultiplier}, damage: ${damage}`)
      ui.notify("Critical Hit!", false)
    }

    // Apply damage booster
    this.activeBoosters.forEach((booster) => {
      if (booster.key === "megaTap10s") {
        const boosterDef = SHOP.boosters.find((b) => b.id === booster.key)
        damage *= boosterDef.multiplier
        console.log(`Booster ${booster.key} multiplier: ${boosterDef.multiplier}, damage: ${damage}`)
      }
    })

    // Additional multipliers
    damage *= 1 + this.prestigePoints / 100
    console.log(`Prestige bonus: ${1 + this.prestigePoints / 100}, damage: ${damage}`)

    damage *= 1 + this.nftBonus / 100
    console.log(`NFT bonus: ${1 + this.nftBonus / 100}, damage: ${damage}`)

    damage *= 1 + gameState.wave / 5
    console.log(`Wave scaling: ${1 + gameState.wave / 5}, damage: ${damage}`)

    // Prevent zero or near-zero damage
    if (isNaN(damage) || damage <= 1) {
      console.error("Invalid damage calculated:", damage)
      damage = this.tapDamage
    }

    console.log("Final damage:", damage)
    return damage
  },

  addXP: function (amount) {
    let modifiedAmount = amount
    if (this.skills.bonus_xp) {
      const effect = SKILLS.find((s) => s.id === "bonus_xp").getEffect(this.skills.bonus_xp)
      modifiedAmount *= effect
      console.log(`XP skill effect: ${effect}, amount: ${modifiedAmount}`)
    }
    this.activeBoosters.forEach((booster) => {
      if (booster.key === "xpBoost45s") {
        const boosterDef = SHOP.boosters.find((b) => b.id === booster.key)
        if (boosterDef) {
          modifiedAmount *= boosterDef.multiplier
          console.log(`XP booster effect: ${boosterDef.multiplier}, amount: ${modifiedAmount}`)
        }
      }
    })
    modifiedAmount *= 1 + this.nftBonus / 100
    this.xp += modifiedAmount
        ui.updateXPBar()
    while (this.xp >= this.xpToNext) {
      this.levelUp()
    }
  },

  levelUp: function () {
    this.xp -= this.xpToNext
    this.level++
    this.xpToNext = Math.round(100 * Math.pow(1.15, this.level - 1))
    ui.notify("Level Up! " + this.level, false)
    if (this.level % 10 === 0) {
      const skills = this.getRandomSkills(3)
      ui.showSkillChoice(skills)
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
    const cost = skill.baseCost * (level + 1)
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
    console.log("player.earnDye called with:", dyeReward)
    for (const color in dyeReward) {
      if (this.dye.hasOwnProperty(color)) {
        let amount = dyeReward[color] * (1 + this.nftBonus / 100)
        if (this.skills[`dye_boost_${color}`]) {
          const effect = SKILLS.find((s) => s.id === `dye_boost_${color}`).getEffect(this.skills[`dye_boost_${color}`])
          amount *= effect
          console.log(`Dye boost (${color}) effect: ${effect}, amount: ${amount}`)
        }

        if (this.skills.bonus_color_drop) {
          const effect = SKILLS.find((s) => s.id === "bonus_color_drop").getEffect(this.skills.bonus_color_drop)
          amount *= effect
          console.log(`Dye skill effect (bonus_color_drop): ${effect}, amount: ${amount}`)
        }
        if (this.activeBoosters.some((booster) => booster.key === "doubleDye60s")) {
          const boosterDef = SHOP.boosters.find((b) => b.id === "doubleDye60s")
          amount *= boosterDef.multiplier
          console.log(`Applied doubleDye60s multiplier: ${boosterDef.multiplier}, amount: ${amount}`)
        }

        this.dye[color] += amount
        if (amount > 0) {
          // Pass click coordinates to the notification
          ui.notify(`+${amount.toFixed(1)} ${color} dye`, false, {
            x: clickX,
            y: clickY,
          })
        }
      }
    }
    ui.updateCurrencyBar()
    this.save()
  },

  purchaseBooster: function (boosterId) {
    console.log("player.purchaseBooster called with:", boosterId)
    const booster = SHOP.boosters.find((b) => b.id === boosterId)
    if (!booster) {
      ui.notify("Booster not found!", true)
      return
    }
    if (this.dye.red < booster.cost.red || this.dye.blue < booster.cost.blue || this.dye.yellow < booster.cost.yellow) {
      ui.notify(`Not enough dye for ${booster.name}`, true)
      return
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
      console.log(`Booster duration effect: ${effect}`)
    }

    if (this.skills.shop_booster_duration) {
      const effect = SKILLS.find((s) => s.id === "shop_booster_duration").getEffect(this.skills.shop_booster_duration)
      durationMultiplier *= effect
      console.log(`Shop booster duration effect: ${effect}`)
    }

    duration *= durationMultiplier
    console.log(`Final booster duration: ${duration}ms (${duration / 1000}s)`)

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
    const earnedPoints = Math.floor((this.level / 10) * multiplier)
    this.prestigePoints += earnedPoints
    this.level = 1
    this.xp = 0
    this.xpToNext = 100
    this.dye = { red: 0, blue: 0, yellow: 0 }
    this.tapDamage = 10
    this.skills = {}
    this.activeBoosters = []
    this.lastAutoTap = 0

    // Reset wave progress
    gameState.wave = 1
    localStorage.setItem("pxjWave", gameState.wave)

    this.save()
    return earnedPoints
  },

  setNFTBonus: function (bonus) {
    this.nftBonus = bonus
    this.save()
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
        nftBonus: this.nftBonus,
        statistics: this.statistics,
        lastAutoTap: this.lastAutoTap,
      }),
    )
  },
}
