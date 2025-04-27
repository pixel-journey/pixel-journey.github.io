const CONSTANTS = {
  INGREDIENT_TIERS: { PRIMARY: 1, SECONDARY: 2, TERTIARY: 3 },
  DROP_THRESHOLDS: { secondary: 10, tertiary: 25 },
  COLORS: {
    1: ["Red", "Blue", "Yellow", "Black_White"],
    2: ["Green", "Orange", "Purple"],
    3: ["Amber", "Chartreuse", "Magenta", "Teal", "Vermillion", "Violet"],
  },
  ingredientStats: {
    1: { baseHp: 20, xp: 5, dyePerTap: 1, dyeBonus: 10 },
    2: { baseHp: 60, xp: 15, dyePerTap: 3, dyeBonus: 25 },
    3: { baseHp: 150, xp: 30, dyePerTap: 6, dyeBonus: 50 },
  },

  dyeMapping: {
    Red: { red: 1 },
    Blue: { blue: 1 },
    Yellow: { yellow: 1 },
    Black_White: { red: 0.5, blue: 0.5, yellow: 0.5 },
    Green: { blue: 0.5, yellow: 0.5 },
    Orange: { red: 0.5, yellow: 0.5 },
    Purple: { red: 0.5, blue: 0.5 },
    Amber: { red: 0.6, yellow: 0.4 },
    Chartreuse: { yellow: 0.6, blue: 0.4 },
    Magenta: { red: 0.6, blue: 0.4 },
    Teal: { blue: 0.6, yellow: 0.4 },
    Vermillion: { red: 0.7, yellow: 0.3 },
    Violet: { red: 0.5, blue: 0.5 },
  },

  colorFilters: {
    Red: "hue-rotate(0deg) saturate(1.5)",
    Blue: "hue-rotate(210deg) saturate(1.5)",
    Yellow: "hue-rotate(60deg) saturate(1.5)",
    Black_White: "grayscale(1)",
    Green: "hue-rotate(120deg) saturate(1.5)",
    Orange: "hue-rotate(30deg) saturate(1.5)",
    Purple: "hue-rotate(270deg) saturate(1.5)",
    Amber: "hue-rotate(45deg) saturate(1.5)",
    Chartreuse: "hue-rotate(90deg) saturate(1.5)",
    Magenta: "hue-rotate(300deg) saturate(1.5)",
    Teal: "hue-rotate(180deg) saturate(1.5)",
    Vermillion: "hue-rotate(15deg) saturate(1.5)",
    Violet: "hue-rotate(240deg) saturate(1.5)",
  },

  determineEnemy: function (wave) {
    let tier, color
    if (wave >= this.DROP_THRESHOLDS.tertiary && Math.random() < 0.2) {
      tier = this.INGREDIENT_TIERS.TERTIARY
      color = this.COLORS[3][Math.floor(Math.random() * this.COLORS[3].length)]
    } else if (wave >= this.DROP_THRESHOLDS.secondary && Math.random() < 0.4) {
      tier = this.INGREDIENT_TIERS.SECONDARY
      color = this.COLORS[2][Math.floor(Math.random() * this.COLORS[2].length)]
    } else {
      tier = this.INGREDIENT_TIERS.PRIMARY
      color = this.COLORS[1][Math.floor(Math.random() * this.COLORS[1].length)]
    }
    return { tier: tier, color: color }
  },

  calculateDyePerTap: function (tier, damage, activeBoosters, color) {
     let baseDye = this.ingredientStats[tier].dyePerTap * (damage / 10)
     if (typeof player !== "undefined" && player.skills.bonus_color_drop) {
       baseDye *= SKILLS.find((s) => s.id === "bonus_color_drop").getEffect(player.skills.bonus_color_drop)
     }

     var dyeMix = this.dyeMapping[color]
     var result = {}

     for (var dyeColorName in dyeMix) {
       if (dyeMix.hasOwnProperty(dyeColorName)) {
         result[dyeColorName] = Math.ceil(baseDye * dyeMix[dyeColorName])
       }
     }

     // Apply doubleDye60s booster if active
     if (
       typeof player !== "undefined" &&
       Array.isArray(player.activeBoosters) &&
       player.activeBoosters.some((booster) => booster.key === "doubleDye60s")
     ) {
       const boosterDef = SHOP.boosters.find((b) => b.id === "doubleDye60s")
       for (var dyeColorName in result) {
         result[dyeColorName] *= boosterDef.multiplier
       }
       console.log(`Applied doubleDye60s multiplier: ${boosterDef.multiplier}, result:`, result)
     }

     return result
   },

  calculateKillBonus: function (tier, activeBoosters, color) {
    let bonus = this.ingredientStats[tier].dyeBonus
    if (player.skills.bonus_color_drop) {
      bonus *= SKILLS.find((s) => s.id === "bonus_color_drop").getEffect(player.skills.bonus_color_drop)
    }
    if (player.activeBoosters.some((b) => b.key === "doubleDye60s")) {
      bonus *= 2
    }
    var dyeMix = this.dyeMapping[color]
    var result = {}
    for (var dyeColor in dyeMix) {
      if (dyeMix.hasOwnProperty(dyeColor)) {
        result[dyeColor] = Math.ceil(bonus * dyeMix[dyeColor])
      }
    }
    return result
  },

  getEnemyHP: function (tier, wave) {
    const base = this.ingredientStats[tier].baseHp
    return Math.floor(base * Math.pow(1.1, wave))
  },

  getXP: function (tier) {
    return this.ingredientStats[tier].xp
  },
}
