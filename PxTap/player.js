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

    for (const skillId in this.skills) {
      const skill = SKILLS.find(s => s.id === skillId);
      if (skill && typeof skill.getEffect === 'function') {
        const effect = skill.getEffect(this.skills[skillId]);
        damage *= effect;
        console.log(`Skill ${skillId} effect: ${effect}, damage: ${damage}`);
      } else {
        console.warn(`Invalid skill or getEffect for ${skillId}`);
      }
    }

    this.activeBoosters.forEach(booster => {
      const boosterDef = SHOP.boosters.find(b => b.id === booster.key);
      if (boosterDef && boosterDef.multiplier) {
        damage *= boosterDef.multiplier;
        console.log(`Booster ${booster.key} multiplier: ${boosterDef.multiplier}, damage: ${damage}`);
      } else {
        console.warn(`Invalid booster: ${booster.key}`);
      }
    });

    damage *= (1 + this.prestigePoints / 100);
    console.log(`Prestige bonus: ${1 + this.prestigePoints / 100}, damage: ${damage}`);

    damage *= (1 + this.nftBonus / 100);
    console.log(`NFT bonus: ${1 + this.nftBonus / 100}, damage: ${damage}`);

    if (isNaN(damage) || damage <= 0) {
      console.error('Invalid damage calculated:', damage);
      damage = this.tapDamage; // Fallback to base damage
    }

    console.log('Final damage:', damage);
    return damage;
  },

  addXP: function(amount) {
    let modifiedAmount = amount;
    if (this.skills.bonus_xp) {
      modifiedAmount *= SKILLS.find(s => s.id === 'bonus_xp').getEffect(this.skills.bonus_xp);
    }
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
        const amount = dyeReward[color] * (1 + this.nftBonus / 100);
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
    const booster = SHOP.boosters.find(b => b.id === boosterId);
    if (this.dye[booster.type] < booster.cost) {
      ui.notify(`Need ${booster.cost} ${booster.type} dye to purchase!`, true);
      return;
    }
    this.dye[booster.type] -= booster.cost;
    let duration = booster.baseDuration;
    if (this.skills.shop_booster_duration) {
      duration *= SKILLS.find(s => s.id === 'shop_booster_duration').getEffect(this.skills.shop_booster_duration);
    }
    this.activeBoosters.push({
      key: boosterId,
      expires: Date.now() + duration
    });
    ui.notify(`${booster.name} purchased!`, false);
    this.save();
  },

  updateBoosters: function() {
    const now = Date.now();
    this.activeBoosters = this.activeBoosters.filter(booster => booster.expires > now);
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
