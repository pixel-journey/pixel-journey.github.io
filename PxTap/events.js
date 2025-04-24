var events = {
  tapEnemy: function() {
    console.log('events.tapEnemy called');
    if (!enemy.current) {
      console.warn('No current enemy to tap');
      return;
    }
    var damage = player.calculateTapDamage();
    console.log('Damage calculated:', damage);
    enemy.damage(damage);
    ui.applyColorFilter(enemy.current.color);
    ui.spawnTapParticles(window.innerWidth / 2, window.innerHeight / 2);
    var dyeReward = CONSTANTS.calculateDyePerTap(enemy.current.tier, damage, player.activeBoosters, enemy.current.color);
    console.log('Dye reward:', dyeReward);
    player.earnDye(dyeReward);
    player.addXP(1);
    if (enemy.current.hp <= 0) {
      console.log('Enemy defeated');
      this.onEnemyDefeated();
    }
  },

  onEnemyDefeated: function() {
    console.log('events.onEnemyDefeated called');
    var bonusDye = CONSTANTS.calculateKillBonus(enemy.current.tier, player.activeBoosters, enemy.current.color);
    console.log('Bonus dye:', bonusDye);
    player.earnDye(bonusDye);
    player.addXP(enemy.current.xp);
    gameState.wave++;
    localStorage.setItem('pxjWave', gameState.wave);
    enemy.spawnNewEnemy();
    ui.updateWaveCounter();
  }
};
