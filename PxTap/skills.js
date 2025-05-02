const SKILLS = [
  {
    id: "tap_power",
    name: "Tap Power",
    description: "Increases base damage dealt per tap by 10% per upgrade.",
    maxLevel: 500,
    baseCost: 10,
    type: "red",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 6.0
  },
  {
    id: "auto_tap",
    name: "Auto Tap",
    description: "Enable automatic taps the enemy based on auto tap speed.",
    maxLevel: 1,
    baseCost: 100,
    type: "blue",
    getEffect: (level) => level > 0, // Boolean effect - either on or off
  },
  {
    id: "auto_tap_speed",
    name: "Auto Tap Speed",
    description: "Reduces auto-tap delay (1s to 0.000001s).",
    maxLevel: 250,
    baseCost: 20,
    type: "blue",
    getEffect: (level) => 1 / (1 + 0.1 * level), // Never reaches 0
  },
  {
    id: "bonus_xp",
    name: "Bonus XP",
    description: "Increases XP gained by 5% per upgrade.",
    maxLevel: 200,
    baseCost: 30,
    type: "yellow",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 20
  },
  {
    id: "multi_tap",
    name: "Multi Tap",
    description: "2–50% chance per upgrade for taps to hit 2–50 times.",
    maxLevel: 100,
    baseCost: 50,
    type: "red",
    getEffect: (level) => 0.02 * level, // 0.02 to 2
  },
  {
    id: "crit_chance",
    name: "Critical Tap Chance",
    description: "1% chance per upgrade for critical strikes.",
    maxLevel: 100,
    baseCost: 40,
    type: "red",
    getEffect: (level) => 0.01 * level, // 0.01 to 1
  },
  {
    id: "crit_multiplier",
    name: "Critical Damage Multiplier",
    description: "Increases critical strike damage (160% to 1650%).",
    maxLevel: 100,
    baseCost: 60,
    type: "blue",
    getEffect: (level) => 1.5 + 0.1 * level, // 1.6 to 16.5
  },
  {
    id: "prestige_gain",
    name: "Prestige Point Bonus",
    description: "Increases prestige points by 5% per upgrade.",
    maxLevel: 20,
    baseCost: 100,
    type: "yellow",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 2.0
  },
  {
    id: "dye_boost_red",
    name: "Red Dye Boost",
    description: "Increases red dye earned by 10% per upgrade.",
    maxLevel: 25,
    baseCost: 25,
    type: "red",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 3.5
  },
  {
    id: "dye_boost_blue",
    name: "Blue Dye Boost",
    description: "Increases blue dye earned by 10% per upgrade.",
    maxLevel: 25,
    baseCost: 25,
    type: "blue",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 3.5
  },
  {
    id: "dye_boost_yellow",
    name: "Yellow Dye Boost",
    description: "Increases yellow dye earned by 10% per upgrade.",
    maxLevel: 25,
    baseCost: 25,
    type: "yellow",
    getEffect: (level) => 1 + 0.1 * level, // 1.1 to 3.5
  },
  {
    id: "bonus_color_drop",
    name: "Color Drop Multiplier",
    description: "Increases base dye drop by 5% per upgrade.",
    maxLevel: 300,
    baseCost: 80,
    type: "yellow",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 2.5
  },
  {
    id: "story_chance",
    name: "Bonus Encounter Chance",
    description: "2% chance per upgrade for bonus shops/rare enemies/story events.",
    maxLevel: 10,
    baseCost: 45,
    type: "blue",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.2
  },
  {
    id: "booster_duration",
    name: "Booster Duration",
    description: "Increases booster duration by 5% per upgrade.",
    maxLevel: 150,
    baseCost: 650,
    type: "blue",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 1.75
  },
  {
    id: "yellow_affinity",
    name: "Yellow Ingredient Drop Bias",
    description: "2% chance per upgrade to fight yellow enemies.",
    maxLevel: 50,
    baseCost: 90,
    type: "yellow",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.4
  },
  {
    id: "blue_affinity",
    name: "Blue Ingredient Drop Bias",
    description: "2% chance per upgrade to fight blue enemies.",
    maxLevel: 50,
    baseCost: 90,
    type: "blue",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.4
  },
  {
    id: "red_affinity",
    name: "Red Ingredient Drop Bias",
    description: "2% chance per upgrade to fight red enemies.",
    maxLevel: 50,
    baseCost: 90,
    type: "red",
    getEffect: (level) => 0.02 * level, // 0.02 to 0.4
  },
  {
    id: "shop_booster_duration",
    name: "Shop Booster Duration",
    description: "Increases shop booster duration by 5% per upgrade.",
    maxLevel: 15,
    baseCost: 70,
    type: "blue",
    getEffect: (level) => 1 + 0.05 * level, // 1.05 to 1.75
  },
]
