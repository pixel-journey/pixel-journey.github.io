const SKILLS = [
  {
    id: 'tap_power',
    name: 'Tap Power',
    description: 'Increases damage dealt per tap.',
    maxLevel: 50,
    baseCost: 10,
    type: 'red',
    getEffect: function(level) { return 1 + 0.1 * level; }
  },
  {
    id: 'auto_tap_speed',
    name: 'Auto Tap Speed',
    description: 'Decreases delay between auto taps.',
    maxLevel: 25,
    baseCost: 20,
    type: 'blue',
    getEffect: function(level) { return Math.max(0.1, 1 - 0.03 * level); }
  },
  {
    id: 'bonus_xp',
    name: 'Bonus XP',
    description: 'Gain more XP per tap and kill.',
    maxLevel: 20,
    baseCost: 30,
    type: 'yellow',
    getEffect: function(level) { return 1 + 0.05 * level; }
  },
  {
    id: 'multi_tap',
    name: 'Multi Tap',
    description: 'Chance for taps to hit multiple times.',
    maxLevel: 10,
    baseCost: 50,
    type: 'red',
    getEffect: function(level) { return 0.02 * level; }
  },
  {
    id: 'crit_chance',
    name: 'Critical Tap Chance',
    description: 'Taps have a chance to critically strike.',
    maxLevel: 15,
    baseCost: 40,
    type: 'red',
    getEffect: function(level) { return 0.01 * level; }
  },
  {
    id: 'crit_multiplier',
    name: 'Critical Damage Multiplier',
    description: 'Increases the power of critical strikes.',
    maxLevel: 10,
    baseCost: 60,
    type: 'blue',
    getEffect: function(level) { return 1.5 + 0.1 * level; }
  },
  {
    id: 'prestige_gain',
    name: 'Prestige Point Bonus',
    description: 'Earn more prestige points per run.',
    maxLevel: 20,
    baseCost: 100,
    type: 'yellow',
    getEffect: function(level) { return 1 + 0.05 * level; }
  },
  {
    id: 'dye_boost_red',
    name: 'Red Dye Boost',
    description: 'Increases amount of red dye earned.',
    maxLevel: 25,
    baseCost: 25,
    type: 'red',
    getEffect: function(level) { return 1 + 0.1 * level; }
  },
  {
    id: 'dye_boost_blue',
    name: 'Blue Dye Boost',
    description: 'Increases amount of blue dye earned.',
    maxLevel: 25,
    baseCost: 25,
    type: 'blue',
    getEffect: function(level) { return 1 + 0.1 * level; }
  },
  {
    id: 'dye_boost_yellow',
    name: 'Yellow Dye Boost',
    description: 'Increases amount of yellow dye earned.',
    maxLevel: 25,
    baseCost: 25,
    type: 'yellow',
    getEffect: function(level) { return 1 + 0.1 * level; }
  },
  {
    id: 'bonus_color_drop',
    name: 'Color Drop Multiplier',
    description: 'Increase the base drop of dye per enemy.',
    maxLevel: 30,
    baseCost: 80,
    type: 'yellow',
    getEffect: function(level) { return 1 + 0.05 * level; }
  },
  {
    id: 'story_chance',
    name: 'Flavor Encounter Chance',
    description: 'Increases chance for random story events.',
    maxLevel: 10,
    baseCost: 45,
    type: 'blue',
    getEffect: function(level) { return 0.02 * level; }
  },
  {
    id: 'booster_duration',
    name: 'Booster Duration',
    description: 'Boosters last longer when activated.',
    maxLevel: 15,
    baseCost: 65,
    type: 'blue',
    getEffect: function(level) { return 1 + 0.05 * level; }
  },
  {
    id: 'yellow_affinity',
    name: 'Yellow Ingredient Drop Bias',
    description: 'Increases chance to fight yellow ingredients.',
    maxLevel: 20,
    baseCost: 90,
    type: 'yellow',
    getEffect: function(level) { return 0.02 * level; }
  },
  {
    id: 'blue_affinity',
    name: 'Blue Ingredient Drop Bias',
    description: 'Increases chance to fight blue ingredients.',
    maxLevel: 20,
    baseCost: 90,
    type: 'blue',
    getEffect: function(level) { return 0.02 * level; }
  },
  {
    id: 'red_affinity',
    name: 'Red Ingredient Drop Bias',
    description: 'Increases chance to fight red ingredients.',
    maxLevel: 20,
    baseCost: 90,
    type: 'red',
    getEffect: function(level) { return 0.02 * level; }
  },
  {
    id: 'shop_booster_duration',
    name: 'Shop Booster Duration',
    description: 'Increases duration of shop-purchased boosters.',
    maxLevel: 15,
    baseCost: 70,
    type: 'blue',
    getEffect: function(level) { return 1 + 0.05 * level; }
  }
];
