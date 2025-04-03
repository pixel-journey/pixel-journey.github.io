// config.js
const CONFIG = {
  // Tower configurations with updated prices, ranges, and mechanics
  towers: {
    grass: {
      cost: 50, // Updated price
      range: 150, // Base range
      dps: 50, // Base DPS
      color: "#00ff00",
      projectile: "circle",
      projectileColor: "#00ffff",
      description: "Basic tower with Power Aura ability"
    },
    fire: {
      cost: 250,
      range: 75, // Reduced range significantly
      dps: 130,
      color: "#ff4500",
      projectile: "circle", // Small, fast projectiles
      projectileColor: "#ff4500",
      description: "High-speed, rapid-fire projectiles"
    },
    water: {
      cost: 450,
      range: 100, // Small range for area damage
      dps: 250,
      color: "#1e90ff",
      projectile: "area", // Indicates area damage
      projectileColor: "#1e90ff",
      description: "Area damage"
    },
    ice: {
      cost: 300,
      range: 75, // Smaller range than Water
      dps: 50,
      color: "#00b7eb",
      projectile: "snowflake", // Small, fast projectiles with freeze
      projectileColor: "#00b7eb",
      description: "Rapid-fire projectiles with freeze effect"
    },
    rock: {
      cost: 800,
      range: 120, // Reduced but larger than Ice, Arcane, Gold
      dps: 100,
      color: "#808080",
      projectile: "rect",
      projectileColor: "#808080",
      description: "Stuns enemies"
    },
    lightning: {
      cost: 1000, // Updated price
      range: 150, // Reduced range
      dps: 300,
      color: "#ffff00",
      projectile: "instant", // Indicates instant impact
      projectileColor: "#ffff00",
      description: "Instant impact with ricochet"
    },
    arcane: {
      cost: 600,
      range: 180,
      dps: 200,
      color: "#800080",
      projectile: "star",
      projectileColor: "#800080",
      description: "High damage, slow projectile"
    },
    gold: {
      cost: 200,
      range: 100, // Reduced range
      dps: 75,
      color: "#ffd700",
      projectile: "star",
      projectileColor: "#ffd700",
      description: "Generates credits on hit"
    },
    wood: {
      cost: 150,
      range: 130,
      dps: 125,
      color: "#8b4513",
      projectile: "rect",
      projectileColor: "#8b4513",
      description: "Basic tower"
    }
  },

  // Enemy configurations (unchanged for now)
  enemies: {
    basic: {
      health: 100,
      speed: 1,
      color: "#ff0000",
      credits: 10
    },
    fast: {
      health: 80,
      speed: 2,
      color: "#ff9900",
      credits: 15
    },
    tank: {
      health: 200,
      speed: 0.5,
      color: "#990000",
      credits: 20
    },
    boss: {
      health: 1000,
      speed: 0.1,
      color: "#660000",
      credits: 100
    }
  },
  towerUpgrades: {
    grass: { powerAura: false, cost: 100, description: "Power Aura: Boosts nearby towers' damage by 5%" },
    wood: { splinters: false, cost: 150, description: "Splinters: Damages enemies near the target" },
    gold: { ricochet: false, cost: 175, description: "Ricochet: Attacks bounce to up to 3 nearby enemies" },
    fire: { burn: false, cost: 190, description: "Burn: Applies damage over time to enemies" },
    ice: { freeze: false, cost: 50, description: "Freeze: Slows enemies by 10% (stacks)" },
    water: { splash: false, cost: 250, description: "Splash: Damages all enemies in a small area" },
    arcane: { chain: false, cost: 400, description: "Chain: Attacks up to 5 enemies in sequence" },
    rock: { stun: false, cost: 500, description: "Stun: 5% chance to stop enemies for 2 seconds" },
    lightning: { shock: false, cost: 1000, description: "Shock: Applies continuous damage for 5 seconds" },
  },
  gameModes: {
    easy: { name: "Easy Mode", healthModifier: 0.25, description: "Enemies have 75% less health" },
    newbie: { name: "Newbie Mode", healthModifier: 0.75, description: "Enemies have 25% less health" },
    normal: { name: "Normal Mode", healthModifier: 1, description: "Standard enemy health" },
    hard: { name: "Hard Mode", healthModifier: 1.25, description: "Enemies have 25% more health" },
    pro: { name: "Pro Mode", healthModifier: 1.5, description: "Enemies have 50% more health" },
  },
  initialState: {
    credits: 1000,
    totalCredits: 1000,
    lives: 50,
    wave: 1,
    waveActive: false,
    showRange: false,
    speedMultiplier: 1,
    gameMode: "normal",
    healthModifier: 1,
    autoRun: false,
  },
  grid: { size: 50, width: 10, height: 10 },
  enemy: { baseHealth: 10, baseSpeed: 0.25, healthIncreasePerWave: 1, speedIncreasePerWave: 0.005, creditReward: 5 },
  wave: { baseEnemyCount: 5, enemyIncreasePerWave: 2, maxEnemies: 15, waveCompletionReward: 50, incomePercentage: 0.05 },
};
