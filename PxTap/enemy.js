var enemy = {
  current: null,

  generateEnemy: function(wave) {
    console.log('enemy.generateEnemy called with wave:', wave);
    var enemyInfo = CONSTANTS.determineEnemy(wave);
    var tier = enemyInfo.tier;
    var color = enemyInfo.color;
    var hp = CONSTANTS.getEnemyHP(tier, wave);
    var videoSrc = './ingredients/Pixel_lvl_' + tier + '_' + color + '_vid_25fps_1k.mp4';

    var enemy = {
      id: 'enemy-' + Date.now(),
      tier: tier,
      color: color,
      hp: hp,
      maxHp: hp,
      xp: CONSTANTS.getXP(tier),
      colorDrain: 0,
      videoSrc: videoSrc,
      width: 0,
      height: 0
    };
    console.log('Generated enemy:', enemy);
    return enemy;
  },

  spawnNewEnemy: function() {
    console.log('enemy.spawnNewEnemy called');
    this.current = this.generateEnemy(gameState.wave);
    console.log('Current enemy set:', this.current);

    var video = document.getElementById('enemy-video');
    video.src = this.current.videoSrc;
    video.load();
    video.play().catch(error => {
      console.error("Video play error:", error);
      video.poster = './ingredients/Pixel_lvl_' + this.current.tier + '_' + this.current.color + '_static.png';
      ui.notify('Failed to load enemy video, using static image.', true);
    });

    video.style.display = 'block';
    video.style.opacity = '1';

    video.onloadedmetadata = () => {
      this.current.width = video.videoWidth;
      this.current.height = video.videoHeight;
      console.log('Video dimensions:', { width: this.current.width, height: this.current.height });
      // Ensure responsive sizing
      video.style.maxWidth = '100%';
      video.style.maxHeight = '100%';
      ui.updateHealthBar();
    };

    video.onerror = () => {
      console.error('Video load error:', this.current.videoSrc);
      video.poster = './ingredients/Pixel_lvl_' + this.current.tier + '_' + this.current.color + '_static.png';
      video.src = './ingredients/Pixel_lvl_' + this.current.tier + '_' + this.current.color + '_vid_25fps_1k.mp4';
      ui.notify('Failed to load enemy video, using static image.', true);
    };

    ui.applyColorFilter(this.current.color);
    ui.updateHealthBar();

    video.style.transform = 'scale(0.8)';
    setTimeout(() => {
      video.style.transform = 'scale(1)';
    }, 50);

    if (player.statistics) {
      player.statistics.enemiesDefeated = (player.statistics.enemiesDefeated || 0) + 1;
      player.save();
    }
  },

  damage: function(amount) {
    console.log('enemy.damage called with amount:', amount);
    if (!this.current) {
      console.warn('No current enemy to damage');
      return;
    }

    this.current.hp -= amount;
    console.log('Enemy HP after damage:', this.current.hp);

    this.current.colorDrain = clamp(1 - this.current.hp / this.current.maxHp, 0, 1);
    console.log('Color drain:', this.current.colorDrain);

    const video = document.getElementById('enemy-video');
    // Add shake animation
    video.style.transition = 'transform 0.1s';
    video.style.transform = 'scale(0.95)';
    setTimeout(() => video.style.transform = 'scale(1)', 100);

    if (ui.settings && ui.settings.showDamageNumbers) {
      const damageText = document.createElement('div');
      damageText.className = 'floating-text damage-text';
      damageText.textContent = `-${amount.toFixed(1)}`;
      damageText.style.left = (window.innerWidth / 2) + 'px';
      damageText.style.top = (window.innerHeight / 2 - 50) + 'px';
      document.getElementById('damage-numbers').appendChild(damageText);
      setTimeout(() => damageText.remove(), 1000);
    }

    ui.updateHealthBar();
    AUDIO.play('tap');
  }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
