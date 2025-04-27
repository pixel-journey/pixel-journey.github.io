const SKILLS = [
  {
    id: "tap_power",
    name: "Tap Power",
    description: "Increases damage dealt per tap by 10% per level.",
    maxLevel: 50,
    baseCost: 10,
    type: "red",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 6.0
  },
  {
    id: "auto_tap",
    name: "Auto Tap",
    description: "Automatically taps the enemy based on auto tap speed.",
    maxLevel: 1,
    baseCost: 100,
    type: "blue",
    getEffect: (level) => level > 0, // Boolean effect - either on or off
  },
  {
    id: "auto_tap_speed",
    name: "Auto Tap Speed",
    description: "Reduces auto-tap delay (1s to 0.25s).",
    maxLevel: 25,
    baseCost: 20,
    type: "blue",
    getEffect: (level) => Math.max(0.25, 1 - 0.03 * level), // 1 to 0.25
  },
  {
    id: "bonus_xp",
    name: "Bonus XP",
    description: "Increases XP gained by 5% per level.",
    maxLevel: 20,
    baseCost: 30,
    type: "yellow",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 2.0
  },
  {
    id: "multi_tap",
    name: "Multi Tap",
    description: "2–5% chance per level for taps to hit 2–5 times.",
    maxLevel: 10,
    baseCost: 50,
    type: "red",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.2
  },
  {
    id: "crit_chance",
    name: "Critical Tap Chance",
    description: "1% chance per level for critical strikes.",
    maxLevel: 15,
    baseCost: 40,
    type: "red",
    getEffect: (level) => 0.01 * level, // 0.01 to 0.15
  },
  {
    id: "crit_multiplier",
    name: "Critical Damage Multiplier",
    description: "Increases critical strike damage (160% to 250%).",
    maxLevel: 10,
    baseCost: 60,
    type: "blue",
    getEffect: (level) => 1.5 + 0.1 * level, // 1.6 to 2.5
  },
  {
    id: "prestige_gain",
    name: "Prestige Point Bonus",
    description: "Increases prestige points by 5% per level.",
    maxLevel: 20,
    baseCost: 100,
    type: "yellow",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 2.0
  },
  {
    id: "dye_boost_red",
    name: "Red Dye Boost",
    description: "Increases red dye earned by 10% per level.",
    maxLevel: 25,
    baseCost: 25,
    type: "red",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 3.5
  },
  {
    id: "dye_boost_blue",
    name: "Blue Dye Boost",
    description: "Increases blue dye earned by 10% per level.",
    maxLevel: 25,
    baseCost: 25,
    type: "blue",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 3.5
  },
  {
    id: "dye_boost_yellow",
    name: "Yellow Dye Boost",
    description: "Increases yellow dye earned by 10% per level.",
    maxLevel: 25,
    baseCost: 25,
    type: "yellow",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 3.5
  },
  {
    id: "bonus_color_drop",
    name: "Color Drop Multiplier",
    description: "Increases base dye drop by 5% per level.",
    maxLevel: 30,
    baseCost: 80,
    type: "yellow",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 2.5
  },
  {
    id: "story_chance",
    name: "Flavor Encounter Chance",
    description: "2% chance per level for story events.",
    maxLevel: 10,
    baseCost: 45,
    type: "blue",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.2
  },
  {
    id: "booster_duration",
    name: "Booster Duration",
    description: "Increases booster duration by 5% per level.",
    maxLevel: 15,
    baseCost: 65,
    type: "blue",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 1.75
  },
  {
    id: "yellow_affinity",
    name: "Yellow Ingredient Drop Bias",
    description: "2% chance per level to fight yellow enemies.",
    maxLevel: 20,
    baseCost: 90,
    type: "yellow",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.4
  },
  {
    id: "blue_affinity",
    name: "Blue Ingredient Drop Bias",
    description: "2% chance per level to fight blue enemies.",
    maxLevel: 20,
    baseCost: 90,
    type: "blue",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.4
  },
  {
    id: "red_affinity",
    name: "Red Ingredient Drop Bias",
    description: "2% chance per level to fight red enemies.",
    maxLevel: 20,
    baseCost: 90,
    type: "red",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.4
  },
  {
    id: "shop_booster_duration",
    name: "Shop Booster Duration",
    description: "Increases shop booster duration by 5% per level.",
    maxLevel: 15,
    baseCost: 70,
    type: "blue",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 1.75
  },
]
