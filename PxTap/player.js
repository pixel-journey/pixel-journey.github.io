var player = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  dye: { red: 0, blue: 0, yellow: 0 },
  tapDamage: 1,
  skills: {},
  activeBoosters: [],
  prestigePoints: 0,
  nftBonus: 0,
  statistics: { enemiesDefeated: 0 },

  init: function() {
    console.log('player.init called');
    const savedPlayer = localStorage.getItem('pxjPlayer');
    if (savedPlayer) {
      Object.assign(this, JSON.parse(savedPlayer));
    }
  },

  calculateTapDamage: function() {
      console.log('player.calculateTapDamage called');
      let damage = this.tapDamage;
      console.log('Base tapDamage:', damage);

      // Apply skill effects
      for (const skillId in this.skills) {
        const skill = SKILLS.find(s => s.id === skillId);
        if (!skill || typeof skill.getEffect !== 'function') {
          console.warn(`Invalid skill or getEffect for ${skillId}`);
          continue;
        }
        if (skillId === 'crit_chance' || skillId === 'crit_multiplier') continue; // Handled separately
        const effect = skill.getEffect(this.skills[skillId]);
        if (effect <= 0 || isNaN(effect)) {
          console.warn(`Invalid effect for ${skillId}: ${effect}`);
          continue;
        }
        damage *= effect;
        console.log(`Skill ${skillId} effect: ${effect}, damage: ${damage}`);
      }

      // Apply critical hit
      const critChance = this.skills.crit_chance ? SKILLS.find(s => s.id === 'crit_chance').getEffect(this.skills.crit_chance) : 0;
      const critMultiplier = this.skills.crit_multiplier ? SKILLS.find(s => s.id === 'crit_multiplier').getEffect(this.skills.crit_multiplier) : 1;
      if (Math.random() < critChance) {
        damage *= critMultiplier;
        console.log(`Critical hit! Multiplier: ${critMultiplier}, damage: ${damage}`);
        ui.notify('Critical Hit!', false);
      }

      // Apply booster effects
      this.activeBoosters.forEach(booster => {
        const boosterDef = SHOP.boosters.find(b => b.id === booster.key);
        if (boosterDef && boosterDef.multiplier) {
          damage *= boosterDef.multiplier;
          console.log(`Booster ${booster.key} multiplier: ${boosterDef.multiplier}, damage: ${damage}`);
        } else {
          console.warn(`Invalid booster: ${booster.key}`);
        }
      });

      // Additional multipliers
      damage *= (1 + this.prestigePoints / 100);
      console.log(`Prestige bonus: ${1 + this.prestigePoints / 100}, damage: ${damage}`);

      damage *= (1 + this.nftBonus / 100);
      console.log(`NFT bonus: ${1 + this.nftBonus / 100}, damage: ${damage}`);

      damage *= (1 + gameState.wave / 5);
      console.log(`Wave scaling: ${1 + gameState.wave / 5}, damage: ${damage}`);

      // Prevent zero or negative damage
      if (isNaN(damage) || damage <= 0.1) {
        console.error('Invalid damage calculated:', damage);
        damage = this.tapDamage;
      }

      console.log('Final damage:', damage);
      return damage;
    },

    addXP: function(amount) {
      let modifiedAmount = amount;
      if (this.skills.bonus_xp) {
        const effect = SKILLS.find(s => s.id === 'bonus_xp').getEffect(this.skills.bonus_xp);
        modifiedAmount *= effect;
        console.log(`XP skill effect: ${effect}, amount: ${modifiedAmount}`);
      }
      this.activeBoosters.forEach(booster => {
        if (booster.key === 'xpBoost45s') {
          const boosterDef = SHOP.boosters.find(b => b.id === booster.key);
          modifiedAmount *= boosterDef.multiplier;
          console.log(`XP booster effect: ${boosterDef.multiplier}, amount: ${modifiedAmount}`);
        }
      });
      modifiedAmount *= (1 + this.nftBonus / 100);
      this.xp += modifiedAmount;
      while (this.xp >= this.xpToNext) {
        this.levelUp();
      }
    },

  levelUp: function() {
    this.xp -= this.xpToNext;
    this.level++;
    this.xpToNext = Math.round(100 * Math.pow(1.15, this.level - 1));
    ui.notify('Level Up! ' + this.level, false);
    if (this.level % 10 === 0) {
      const skills = this.getRandomSkills(3);
      ui.showSkillChoice(skills);
    }
  },

  getRandomSkills: function(count) {
    const availableSkills = SKILLS.filter(skill => !this.skills[skill.id] || this.skills[skill.id] < skill.maxLevel);
    if (availableSkills.length === 0) return [];
    const shuffled = availableSkills.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  upgradeSkill: function(skillId) {
    const skill = SKILLS.find(s => s.id === skillId);
    const level = this.skills[skillId] || 0;
    if (level >= skill.maxLevel) {
      ui.notify('Skill at max level!', true);
      return false;
    }
    const cost = skill.baseCost * (level + 1);
    if (this.dye[skill.type] < cost) {
      ui.notify(`Need ${cost} ${skill.type} dye to upgrade!`, true);
      return false;
    }
    this.dye[skill.type] -= cost;
    this.skills[skillId] = level + 1;
    ui.notify(`${skill.name} upgraded to level ${this.skills[skillId]}`, false);
    this.save();
    return true;
  },

  earnDye: function(dyeReward) {
    console.log('player.earnDye called with:', dyeReward);
    for (const color in dyeReward) {
      if (this.dye.hasOwnProperty(color)) {
        let amount = dyeReward[color] * (1 + this.nftBonus / 100);
        if (this.skills.bonus_color_drop) {
          const effect = SKILLS.find(s => s.id === 'bonus_color_drop').getEffect(this.skills.bonus_color_drop);
          amount *= effect;
          console.log(`Dye skill effect: ${effect}, amount: ${amount}`);
        }
        this.activeBoosters.forEach(booster => {
          if (booster.key === 'doubleDye60s') {
            const boosterDef = SHOP.boosters.find(b => b.id === booster.key);
            amount *= boosterDef.multiplier;
            console.log(`Dye booster effect: ${boosterDef.multiplier}, amount: ${amount}`);
          }
        });
        this.dye[color] += amount;
        if (amount > 0) {
          ui.notify(`+${amount.toFixed(1)} ${color} dye`, false);
        }
      }
    }
    ui.updateCurrencyBar();
    this.save();
  },

  purchaseBooster: function(boosterId) {
    console.log('player.purchaseBooster called with:', boosterId);
    const booster = SHOP.boosters.find(b => b.id === boosterId);
    if (!booster) {
      ui.notify('Booster not found!', true);
      return;
    }
    if (this.dye[booster.type] < booster.cost) {
      ui.notify(`Need ${booster.cost} ${booster.type} dye to purchase!`, true);
      return;
    }
    this.dye[booster.type] -= booster.cost;
    let duration = booster.baseDuration;
    if (this.skills.shop_booster_duration) {
      const effect = SKILLS.find(s => s.id === 'shop_booster_duration').getEffect(this.skills.shop_booster_duration);
      duration *= effect;
      console.log(`Booster duration effect: ${effect}, duration: ${duration}`);
    }
    this.activeBoosters.push({
      key: boosterId,
      expires: Date.now() + duration
    });
    ui.notify(`${booster.name} purchased!`, false);
    this.save();
  },

  activateBooster: function(boosterKey) {
    var booster = SHOP.boosters.find(function(b) { return b.id === boosterKey; });
    if (!booster) return;
    var duration = booster.duration;
    if (this.skills.shop_booster_duration) {
      duration *= SKILLS.find(function(s) { return s.id === 'shop_booster_duration'; }).getEffect(this.skills.shop_booster_duration);
    }
    this.activeBoosters.push({
      key: boosterKey,
      expires: Date.now() + duration * 1000
    });
    this.save();
  },

  updateBoosters: function() {
     var now = Date.now();
     this.activeBoosters = this.activeBoosters.filter(function(b) { return b.expires > now; });
     if (this.activeBoosters.some(function(b) { return b.key === 'autoTap30s'; })) {
       var autoTapSpeed = this.skills.auto_tap_speed ? SKILLS.find(function(s) { return s.id === 'auto_tap_speed'; }).getEffect(this.skills.auto_tap_speed) : 1;
       if (!this.lastAutoTap || (now - this.lastAutoTap) >= (autoTapSpeed * 1000)) {
         events.tapEnemy();
         this.lastAutoTap = now;
       }
     }
   },

  prestige: function() {
    const multiplier = this.skills.prestige_gain ? SKILLS.find(s => s.id === 'prestige_gain').getEffect(this.skills.prestige_gain) : 1;
    const earnedPoints = Math.floor((this.level / 10) * multiplier);
    this.prestigePoints += earnedPoints;
    this.level = 1;
    this.xp = 0;
    this.xpToNext = 100;
    this.dye = { red: 0, blue: 0, yellow: 0 };
    this.tapDamage = 1;
    this.skills = {};
    this.activeBoosters = [];
    this.save();
    ui.updateCurrencyBar();
    ui.updateXPBar();
    ui.updateLevelTracker();
    return earnedPoints;
  },

  setNFTBonus: function(bonus) {
    this.nftBonus = bonus;
    this.save();
  },

  save: function() {
    localStorage.setItem('pxjPlayer', JSON.stringify({
      level: this.level,
      xp: this.xp,
      xpToNext: this.xpToNext,
      dye: this.dye,
      tapDamage: this.tapDamage,
      skills: this.skills,
      activeBoosters: this.activeBoosters,
      prestigePoints: this.prestigePoints,
      nftBonus: this.nftBonus,
      statistics: this.statistics
    }));
  }
};
