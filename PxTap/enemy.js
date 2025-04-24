var enemy = {
  current: null,

  generateEnemy: function(wave) {
    var enemyInfo = CONSTANTS.determineEnemy(wave);
    var tier = enemyInfo.tier;
    var color = enemyInfo.color;
    var hp = CONSTANTS.getEnemyHP(tier, wave);
    var videoSrc = './ingredients/Pixel_lvl_' + tier + '_' + color + '_vid_25fps_1k.mp4';

    return {
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
  },

  spawnNewEnemy: function() {
    this.current = this.generateEnemy(gameState.wave);

    var video = document.getElementById('enemy-video');
    video.src = this.current.videoSrc;
    video.load();
    video.play().catch(error => {
      console.error("Video play error:", error);
      // Fallback to static image
      video.src = '';
      video.poster = './ingredients/Pixel_lvl_' + this.current.tier + '_' + this.current.color + '_static.png';
      ui.notify('Failed to load enemy video, using static image.', true);
    });

    // Ensure video is visible
    video.style.display = 'block';
    video.style.opacity = '1';

    // Get video dimensions
    video.onloadedmetadata = () => {
      this.current.width = video.videoWidth;
      this.current.height = video.videoHeight;
      // Force UI update
      ui.updateHealthBar();
    };

    video.onerror = () => {
      console.error('Video load error:', this.current.videoSrc);
      video.poster = './ingredients/Pixel_lvl_' + this.current.tier + '_' + this.current.color + '_static.png';
      video.src = './ingredients/Pixel_lvl_' + this.current.tier + '_' + this.current.color + '_vid_25fps_1k.mp4'; // Reset to avoid empty source
      ui.notify('Failed to load enemy video, using static image.', true);
    };

    // Apply color filter
    ui.applyColorFilter(this.current.color);

    // Update UI
    ui.updateHealthBar();

    // Add entrance animation
    video.style.transform = 'scale(0.8)';
    setTimeout(() => {
      video.style.transform = 'scale(1)';
    }, 50);

    // Update player statistics
    if (player.statistics) {
      player.statistics.enemiesDefeated = (player.statistics.enemiesDefeated || 0) + 1;
    }
  },

  damage: function(amount) {
    if (!this.current) return;

    // Apply damage
    this.current.hp -= amount;

    // Calculate color drain percentage
    this.current.colorDrain = clamp(1 - this.current.hp / this.current.maxHp, 0, 1);

    // Apply visual effects
    const video = document.getElementById('enemy-video');
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

    // Update health bar
    ui.updateHealthBar();

    // Play hit sound
    AUDIO.play('tap');
  }
};

// Utility
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
