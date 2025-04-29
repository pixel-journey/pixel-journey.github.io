const PRESTIGE_TALENTS = {
  // Talent tree structure
  tiers: [
    // Tier 1 (Root)
    [
      {
        id: "prestige_foundation",
        name: "Prestige Foundation",
        description: "The foundation of your prestige journey. Increases all dye gains by 5%.",
        cost: 5,
        effect: (player) => {
          return {
            type: "dye_multiplier",
            value: 1.05,
          }
        },
        position: { x: 0, y: 0 },
        connections: ["auto_mastery", "resource_mastery", "power_mastery"],
      },
    ],

    // Tier 2
    [
      {
        id: "auto_mastery",
        name: "Automation Mastery",
        description: "Auto-taps deal 25% more damage.",
        cost: 8,
        effect: (player) => {
          return {
            type: "auto_tap_damage",
            value: 1.25,
          }
        },
        position: { x: -2, y: 1 },
        connections: ["rapid_automation", "multi_auto"],
      },
      {
        id: "resource_mastery",
        name: "Resource Mastery",
        description: "All dye gains increased by 15%.",
        cost: 8,
        effect: (player) => {
          return {
            type: "dye_multiplier",
            value: 1.15,
          }
        },
        position: { x: 0, y: 1 },
        connections: ["color_specialization", "dye_explosion"],
      },
      {
        id: "power_mastery",
        name: "Power Mastery",
        description: "Base tap damage increased by 20%.",
        cost: 8,
        effect: (player) => {
          return {
            type: "tap_damage",
            value: 1.2,
          }
        },
        position: { x: 2, y: 1 },
        connections: ["critical_mastery", "overkill"],
      },
    ],

    // Tier 3
    [
      {
        id: "rapid_automation",
        name: "Rapid Automation",
        description: "Reduces auto-tap cooldown by 15%.",
        cost: 12,
        effect: (player) => {
          return {
            type: "auto_tap_speed",
            value: 0.85, // Multiplier to reduce cooldown
          }
        },
        position: { x: -3, y: 2 },
        connections: ["auto_efficiency"],
      },
      {
        id: "multi_auto",
        name: "Multi-Auto",
        description: "15% chance for auto-taps to hit multiple times.",
        cost: 12,
        effect: (player) => {
          return {
            type: "auto_multi_chance",
            value: 0.15,
          }
        },
        position: { x: -1, y: 2 },
        connections: ["auto_critical"],
      },
      {
        id: "color_specialization",
        name: "Color Specialization",
        description: "One random dye type gains 30% bonus each prestige.",
        cost: 12,
        effect: (player) => {
          // Randomly select a color each prestige
          const colors = ["red", "blue", "yellow"]
          const selectedColor = colors[Math.floor(Math.random() * colors.length)]
          return {
            type: "specific_dye_boost",
            color: selectedColor,
            value: 1.3,
          }
        },
        position: { x: -1, y: 2 },
        connections: ["resource_efficiency"],
      },
      {
        id: "dye_explosion",
        name: "Dye Explosion",
        description: "10% chance for dye rewards to be doubled.",
        cost: 12,
        effect: (player) => {
          return {
            type: "dye_double_chance",
            value: 0.1,
          }
        },
        position: { x: 1, y: 2 },
        connections: ["rainbow_affinity"],
      },
      {
        id: "critical_mastery",
        name: "Critical Mastery",
        description: "Critical hit chance and damage increased by 10%.",
        cost: 12,
        effect: (player) => {
          return {
            type: "critical_boost",
            chance: 0.1,
            damage: 0.1,
          }
        },
        position: { x: 1, y: 2 },
        connections: ["power_overwhelming"],
      },
      {
        id: "overkill",
        name: "Overkill",
        description: "Defeating enemies grants bonus damage for 5 seconds.",
        cost: 12,
        effect: (player) => {
          return {
            type: "kill_damage_boost",
            value: 1.2,
            duration: 5,
          }
        },
        position: { x: 3, y: 2 },
        connections: ["momentum"],
      },
    ],

    // Tier 4
    [
      {
        id: "auto_efficiency",
        name: "Auto Efficiency",
        description: "Auto-taps have a 5% chance to not consume their cooldown.",
        cost: 15,
        effect: (player) => {
          return {
            type: "auto_tap_no_cooldown_chance",
            value: 0.05,
          }
        },
        position: { x: -4, y: 3 },
        connections: [],
      },
      {
        id: "auto_critical",
        name: "Auto Critical",
        description: "Auto-taps have +15% critical hit chance.",
        cost: 15,
        effect: (player) => {
          return {
            type: "auto_crit_chance",
            value: 0.15,
          }
        },
        position: { x: -2, y: 3 },
        connections: [],
      },
      {
        id: "resource_efficiency",
        name: "Resource Efficiency",
        description: "Skills cost 10% less dye to upgrade.",
        cost: 15,
        effect: (player) => {
          return {
            type: "skill_cost_reduction",
            value: 0.9,
          }
        },
        position: { x: 0, y: 3 },
        connections: [],
      },
      {
        id: "rainbow_affinity",
        name: "Rainbow Affinity",
        description: "Gain small amounts of all dye types when collecting any dye.",
        cost: 15,
        effect: (player) => {
          return {
            type: "cross_dye_gain",
            value: 0.1, // 10% of primary dye gained as other colors
          }
        },
        position: { x: 2, y: 3 },
        connections: [],
      },
      {
        id: "power_overwhelming",
        name: "Power Overwhelming",
        description: "Every 10 consecutive taps increases damage by 5% (stacks up to 50%).",
        cost: 15,
        effect: (player) => {
          return {
            type: "consecutive_tap_bonus",
            value: 0.05,
            maxStacks: 10,
          }
        },
        position: { x: 2, y: 3 },
        connections: [],
      },
      {
        id: "momentum",
        name: "Momentum",
        description: "Tapping speed increases damage up to 30% based on tap frequency.",
        cost: 15,
        effect: (player) => {
          return {
            type: "tap_speed_damage",
            value: 0.3,
          }
        },
        position: { x: 4, y: 3 },
        connections: [],
      },
    ],
  ],

  // Player's purchased talents
  purchased: [],

  // Initialize the talent system
  init: function () {
    // Load saved talents
    const savedTalents = localStorage.getItem("pxjPrestigeTalents")
    if (savedTalents) {
      this.purchased = JSON.parse(savedTalents)
    }

    // Apply effects of purchased talents
    this.applyTalentEffects()
  },

  // Get a talent by ID
  getTalent: function (talentId) {
    for (const tier of this.tiers) {
      for (const talent of tier) {
        if (talent.id === talentId) {
          return talent
        }
      }
    }
    return null
  },

  // Check if a talent is purchased
  isTalentPurchased: function (talentId) {
    return this.purchased.includes(talentId)
  },

  // Check if a talent is available to purchase
  isTalentAvailable: function (talentId) {
    const talent = this.getTalent(talentId)
    if (!talent) return false

    // If it's the first talent, it's always available
    if (talent.id === "prestige_foundation") return true

    // Check if any prerequisite talent is purchased
    for (const tier of this.tiers) {
      for (const t of tier) {
        if (t.connections.includes(talentId) && this.isTalentPurchased(t.id)) {
          return true
        }
      }
    }

    return false
  },

  // Purchase a talent
  purchaseTalent: function (talentId) {
    const talent = this.getTalent(talentId)
    if (!talent) {
      ui.notify("Talent not found!", true)
      return false
    }

    // Check if already purchased
    if (this.isTalentPurchased(talentId)) {
      ui.notify("Talent already purchased!", true)
      return false
    }

    // Check if available to purchase
    if (!this.isTalentAvailable(talentId)) {
      ui.notify("Talent prerequisites not met!", true)
      return false
    }

    // Check if player has enough prestige points
    if (player.prestigePoints < talent.cost) {
      ui.notify(`Not enough prestige points! Need ${talent.cost}`, true)
      return false
    }

    // Purchase the talent
    player.prestigePoints -= talent.cost
    this.purchased.push(talentId)

    // Apply the talent effect
    this.applyTalentEffects()

    // Save
    this.save()
    player.save()

    ui.notify(`Purchased ${talent.name}!`, false)
    AUDIO.play("purchase")

    return true
  },

  // Apply all purchased talent effects
  applyTalentEffects: function () {
    // Reset talent effects
    player.talentEffects = {
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
    }

    // Apply each purchased talent
    for (const talentId of this.purchased) {
      const talent = this.getTalent(talentId)
      if (!talent) continue

      const effect = talent.effect(player)

      switch (effect.type) {
        case "dye_multiplier":
          player.talentEffects.dye_multiplier *= effect.value
          break
        case "tap_damage":
          player.talentEffects.tap_damage *= effect.value
          break
        case "auto_tap_damage":
          player.talentEffects.auto_tap_damage *= effect.value
          break
        case "auto_tap_speed":
          player.talentEffects.auto_tap_speed *= effect.value
          break
        case "auto_multi_chance":
          player.talentEffects.auto_multi_chance += effect.value
          break
        case "auto_crit_chance":
          player.talentEffects.auto_crit_chance += effect.value
          break
        case "auto_tap_no_cooldown_chance":
          player.talentEffects.auto_tap_no_cooldown_chance += effect.value
          break
        case "specific_dye_boost":
          player.talentEffects.specific_dye_boost[effect.color] =
            (player.talentEffects.specific_dye_boost[effect.color] || 1) * effect.value
          break
        case "dye_double_chance":
          player.talentEffects.dye_double_chance += effect.value
          break
        case "critical_boost":
          player.talentEffects.critical_boost.chance += effect.chance
          player.talentEffects.critical_boost.damage += effect.damage
          break
        case "kill_damage_boost":
          // This is applied when an enemy is defeated
          player.talentEffects.kill_damage_boost = {
            value: effect.value,
            duration: effect.duration,
            active: false,
            expires: 0,
          }
          break
        case "skill_cost_reduction":
          player.talentEffects.skill_cost_reduction *= effect.value
          break
        case "cross_dye_gain":
          player.talentEffects.cross_dye_gain += effect.value
          break
        case "consecutive_tap_bonus":
          player.talentEffects.consecutive_tap_bonus = {
            value: effect.value,
            stacks: 0,
            maxStacks: effect.maxStacks,
          }
          break
        case "tap_speed_damage":
          player.talentEffects.tap_speed_damage = {
            value: effect.value,
            lastTapTime: 0,
            bonus: 0,
          }
          break
      }
    }
  },

  // Render the talent tree UI
  renderTalentTree: function () {
    const container = document.getElementById("prestige-talent-tree")
    if (!container) return

    container.innerHTML = ""

    // Create SVG for connections
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("class", "talent-connections")
    svg.setAttribute("width", "100%")
    svg.setAttribute("height", "100%")
    container.appendChild(svg)

    // Create talent nodes
    const talentNodes = document.createElement("div")
    talentNodes.className = "talent-nodes"
    container.appendChild(talentNodes)

    // Track rendered talents to avoid duplicates
    const renderedTalents = new Set()

    // Render each tier
    for (let tierIndex = 0; tierIndex < this.tiers.length; tierIndex++) {
      const tier = this.tiers[tierIndex]

      // Create tier container
      const tierContainer = document.createElement("div")
      tierContainer.className = "talent-tier"
      tierContainer.dataset.tier = tierIndex
      talentNodes.appendChild(tierContainer)

      // Render each talent in this tier
      for (const talent of tier) {
        // Skip if already rendered
        if (renderedTalents.has(talent.id)) continue
        renderedTalents.add(talent.id)

        // Check if talent should be visible
        const isVisible = tierIndex === 0 || this.isConnectedToUnlocked(talent.id)
        if (!isVisible) continue

        // Create talent node
        const talentNode = document.createElement("div")
        talentNode.className = "talent-node"
        talentNode.dataset.id = talent.id
        talentNode.style.left = `${50 + talent.position.x * 15}%`
        talentNode.style.top = `${talent.position.y * 120 + 20}px`

        // Add purchased class if purchased
        if (this.isTalentPurchased(talent.id)) {
          talentNode.classList.add("purchased")
        } else if (this.isTalentAvailable(talent.id)) {
          talentNode.classList.add("available")
        } else {
          talentNode.classList.add("locked")
        }

        // Add talent content
        talentNode.innerHTML = `
          <div class="talent-icon">${this.getTalentIcon(talent)}</div>
          <div class="talent-tooltip">
            <div class="talent-name">${talent.name}</div>
            <div class="talent-description">${talent.description}</div>
            <div class="talent-cost">Cost: ${talent.cost} Prestige Points</div>
          </div>
        `

        // Add click event
        talentNode.addEventListener("click", () => {
          if (this.isTalentPurchased(talent.id)) {
            ui.notify(`${talent.name} is already purchased.`, false)
          } else if (this.isTalentAvailable(talent.id)) {
            this.purchaseTalent(talent.id)
            this.renderTalentTree() // Re-render to update
          } else {
            ui.notify("Unlock prerequisite talents first!", true)
          }
        })

        tierContainer.appendChild(talentNode)

        // Draw connections
        if (this.isTalentPurchased(talent.id)) {
          for (const connectedId of talent.connections) {
            const connectedTalent = this.getTalent(connectedId)
            if (!connectedTalent) continue

            // Draw line
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
            line.setAttribute("x1", `${50 + talent.position.x * 15}%`)
            line.setAttribute("y1", `${talent.position.y * 120 + 20}px`)
            line.setAttribute("x2", `${50 + connectedTalent.position.x * 15}%`)
            line.setAttribute("y2", `${connectedTalent.position.y * 120 + 20}px`)
            line.setAttribute("class", "talent-connection")

            if (this.isTalentPurchased(connectedId)) {
              line.classList.add("active")
            }

            svg.appendChild(line)
          }
        }
      }
    }

    // Add prestige points counter
    const pointsCounter = document.createElement("div")
    pointsCounter.className = "prestige-points-counter"
    pointsCounter.textContent = `Available Prestige Points: ${player.prestigePoints}`
    container.appendChild(pointsCounter)
  },

  // Check if a talent is connected to any unlocked talent
  isConnectedToUnlocked: function (talentId) {
    // Check if any prerequisite talent is purchased
    for (const tier of this.tiers) {
      for (const t of tier) {
        if (t.connections.includes(talentId) && this.isTalentPurchased(t.id)) {
          return true
        }
      }
    }
    return false
  },

  // Get an icon for a talent based on its effect
  getTalentIcon: (talent) => {
    const effect = talent.effect({})

    switch (effect.type) {
      case "dye_multiplier":
        return "🎨"
      case "tap_damage":
        return "👆"
      case "auto_tap_damage":
        return "🤖"
      case "auto_tap_speed":
        return "⚡"
      case "auto_multi_chance":
        return "🔄"
      case "auto_crit_chance":
        return "💥"
      case "auto_tap_no_cooldown_chance":
        return "⏱️"
      case "specific_dye_boost":
        if (effect.color === "red") return "🔴"
        if (effect.color === "blue") return "🔵"
        if (effect.color === "yellow") return "🟡"
        return "🌈"
      case "dye_double_chance":
        return "✨"
      case "critical_boost":
        return "⚡"
      case "kill_damage_boost":
        return "💪"
      case "skill_cost_reduction":
        return "💰"
      case "cross_dye_gain":
        return "🌈"
      case "consecutive_tap_bonus":
        return "👆"
      case "tap_speed_damage":
        return "🚀"
      default:
        return "🌟"
    }
  },

  // Reset all talents (for testing)
  resetTalents: function () {
    // Refund prestige points
    for (const talentId of this.purchased) {
      const talent = this.getTalent(talentId)
      if (talent) {
        player.prestigePoints += talent.cost
      }
    }

    // Clear purchased talents
    this.purchased = []

    // Reset effects
    this.applyTalentEffects()

    // Save
    this.save()
    player.save()

    ui.notify("Talent tree reset!", false)
  },

  // Save talent data
  save: function () {
    localStorage.setItem("pxjPrestigeTalents", JSON.stringify(this.purchased))
  },
}

// Mock ui, player, and AUDIO for standalone execution
const ui = {
  notify: (message, isError) => {
    console.log(`${isError ? "Error: " : ""}${message}`)
  },
}

const player = {
  prestigePoints: 100,
  talentEffects: {},
  save: () => {
    console.log("Player data saved.")
  },
}

const AUDIO = {
  play: (sound) => {
    console.log(`Playing sound: ${sound}`)
  },
}
