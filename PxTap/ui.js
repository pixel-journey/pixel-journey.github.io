var ui = {
  settings: {
    showDamageNumbers: true
  },
  lastHealthPct: null, // Track last health percentage

  init: function() {
    console.log('ui.init called');
    this.updateCurrencyBar();
    this.updateXPBar();
    this.updateLevelTracker();
    this.updateWaveCounter();
    this.setupEventListeners();
    // Load UI settings
    const savedSettings = localStorage.getItem('pxjUISettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
    // Show wallet modal if WALLET is defined
    if (typeof WALLET !== 'undefined') {
      console.log('Calling WALLET.showWalletModal');
      WALLET.showWalletModal();
    } else {
      console.warn('WALLET not defined, skipping wallet modal');
    }
  },

  updateCurrencyBar: function() {
    document.getElementById('dye-red').textContent = '🔴 ' + (player.dye.red || 0).toFixed(1);
    document.getElementById('dye-blue').textContent = '🔵 ' + (player.dye.blue || 0).toFixed(1);
    document.getElementById('dye-yellow').textContent = '🟡 ' + (player.dye.yellow || 0).toFixed(1);
  },

  updateXPBar: function() {
    const pct = ((player.xp || 0) / (player.xpToNext || 100)) * 100;
    document.getElementById('xp-fill').style.width = pct + '%';
    document.getElementById('xp-text').textContent = `${(player.xp || 0).toFixed(1)} / ${(player.xpToNext || 100).toFixed(1)}`;
  },

  updateLevelTracker: function() {
    document.getElementById('level-tracker').textContent = 'Level: ' + (player.level || 1).toFixed(1);
  },

  updateHealthBar: function() {
    console.log('ui.updateHealthBar called');
    if (!enemy.current) {
      console.warn('No current enemy for health bar update');
      return;
    }
    const pct = Math.max(0, enemy.current.hp / enemy.current.maxHp);
    console.log('Health percentage:', pct, 'HP:', enemy.current.hp, 'Max HP:', enemy.current.maxHp);

    // Skip update if percentage hasn't changed significantly
    if (this.lastHealthPct !== null && Math.abs(pct - this.lastHealthPct) < 0.0001) {
      console.log('Skipping health bar update, no significant change');
      return;
    }
    this.lastHealthPct = pct;

    document.getElementById('health-fill').style.width = (pct * 100) + '%';
    document.getElementById('health-fill').style.backgroundColor = 'hsl(' + (pct * 120) + ', 80%, 60%)';
    const video = document.getElementById('enemy-video');
    video.style.filter = 'grayscale(' + (1 - pct) + ')';
    document.getElementById('enemy-name').textContent = enemy.current.color.replace('_', ' ');
    document.getElementById('enemy-hp').textContent = `${Math.max(0, enemy.current.hp).toFixed(1)} / ${enemy.current.maxHp.toFixed(1)}`;
  },

  updateWaveCounter: function() {
    document.getElementById('wave-counter').textContent = 'Wave: ' + (gameState.wave || 1).toFixed(1);
    const waveProgress = ((gameState.wave % 10) / 10) * 100;
    document.getElementById('wave-progress-fill').style.width = waveProgress + '%';
  },

  togglePanel: function(panelId) {
    const panels = document.querySelectorAll('.panel');
    const buttons = document.querySelectorAll('.nav-btn');
    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === panelId);
    });
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.id === panelId.replace('-panel', '-btn'));
    });
  },

  showSkillChoice: function(skills) {
    const dyeTypes = ['red', 'blue', 'yellow'];
    const dyeType = dyeTypes[Math.floor(Math.random() * 3)];
    const cost = 10;
    if (player.dye[dyeType] < cost) {
      this.notify(`Need ${cost} ${dyeType} dye to open upgrades!`, true);
      return;
    }
    player.dye[dyeType] -= cost;
    this.updateCurrencyBar();

    const panel = document.getElementById('upgrade-panel');
    const options = document.getElementById('skill-options');
    options.innerHTML = '';
    let upgradeApplied = false; // Track if an upgrade has been applied
    skills.forEach(skill => {
      const btn = document.createElement('button');
      btn.className = 'sidebar-btn';
      btn.innerHTML =
        '<div class="skill-icon">⚡</div>' +
        '<div class="skill-name">' + skill.name + '</div>' +
        '<div class="skill-desc">' + skill.description + ' (Cost: ' + (skill.baseCost * ((player.skills[skill.id] || 0) + 1)).toFixed(1) + ' ' + skill.type + ' dye)</div>';
      btn.onclick = () => {
        if (upgradeApplied) {
          this.notify('Upgrade already applied!', true);
          return;
        }
        const success = player.upgradeSkill(skill.id);
        if (success) {
          upgradeApplied = true;
          options.innerHTML = ''; // Clear options
          panel.classList.remove('active'); // Close the entire panel
          document.getElementById('upgrade-btn').classList.remove('active'); // Deactivate button
        }
      };
      options.appendChild(btn);
    });
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.justifyContent = 'space-between';
    controls.style.marginTop = '10px';
    const skipBtn = document.createElement('button');
    skipBtn.className = 'sidebar-btn';
    skipBtn.textContent = 'Skip';
    skipBtn.onclick = () => {
      options.innerHTML = ''; // Clear options
      panel.classList.remove('active'); // Close the entire panel
      document.getElementById('upgrade-btn').classList.remove('active'); // Deactivate button
    };
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'sidebar-btn';
    refreshBtn.textContent = 'Refresh (10 Random Dye)';
    refreshBtn.onclick = () => {
      if (upgradeApplied) {
        this.notify('Cannot refresh after upgrading!', true);
        return;
      }
      const refreshType = dyeTypes[Math.floor(Math.random() * 3)];
      if (player.dye[refreshType] >= 10) {
        player.dye[refreshType] -= 10;
        this.updateCurrencyBar();
        this.showSkillChoice(player.getRandomSkills(3));
      } else {
        this.notify(`Need 10 ${refreshType} dye to refresh!`, true);
      }
    };
    controls.appendChild(skipBtn);
    controls.appendChild(refreshBtn);
    options.appendChild(controls);
    this.togglePanel('upgrade-panel');
  },

  showProfile: function() {
    const content = document.getElementById('profile-content');
    content.innerHTML = '';
    const avatarSection = document.createElement('div');
    avatarSection.innerHTML = `
      <div class="profile-avatar">🧙</div>
      <p style="text-align: center; color: var(--accent-color);">Avatar (NFT customization coming soon)</p>
    `;
    content.appendChild(avatarSection);
    const statsSection = document.createElement('div');
    statsSection.innerHTML = '<h3>Player Stats</h3>';
    const statsList = document.createElement('ul');
    statsList.innerHTML = `
      <li>Tap Power: ${(player.calculateTapDamage() / player.tapDamage).toFixed(1)}x</li>
      <li>XP Bonus: ${((player.skills.bonus_xp ? SKILLS.find(s => s.id === 'bonus_xp').getEffect(player.skills.bonus_xp) : 1) * 100).toFixed(1)}%</li>
      <li>Red Dye Bonus: ${((player.skills.dye_boost_red ? SKILLS.find(s => s.id === 'dye_boost_red').getEffect(player.skills.dye_boost_red) : 1) * 100).toFixed(1)}%</li>
      <li>Blue Dye Bonus: ${((player.skills.dye_boost_blue ? SKILLS.find(s => s.id === 'dye_boost_blue').getEffect(player.skills.dye_boost_blue) : 1) * 100).toFixed(1)}%</li>
      <li>Yellow Dye Bonus: ${((player.skills.dye_boost_yellow ? SKILLS.find(s => s.id === 'dye_boost_yellow').getEffect(player.skills.dye_boost_yellow) : 1) * 100).toFixed(1)}%</li>
      <li>Critical Chance: ${(player.skills.crit_chance ? SKILLS.find(s => s.id === 'crit_chance').getEffect(player.skills.crit_chance) * 100 : 0).toFixed(1)}%</li>
      <li>Critical Multiplier: ${(player.skills.crit_multiplier ? SKILLS.find(s => s.id === 'crit_multiplier').getEffect(player.skills.crit_multiplier) : 1).toFixed(1)}x</li>
      <li>Prestige Bonus: ${(player.prestigePoints * 1).toFixed(1)}%</li>
      <li>Booster Duration: ${((player.skills.booster_duration ? SKILLS.find(s => s.id === 'booster_duration').getEffect(player.skills.booster_duration) : 1) * 100).toFixed(1)}%</li>
      <li>Shop Booster Duration: ${((player.skills.shop_booster_duration ? SKILLS.find(s => s.id === 'shop_booster_duration').getEffect(player.skills.shop_booster_duration) : 1) * 100).toFixed(1)}%</li>
      <li>NFT Bonus: ${(player.nftBonus || 0).toFixed(1)}%</li>
    `;
    statsSection.appendChild(statsList);
    content.appendChild(statsSection);
    const skillsSection = document.createElement('div');
    skillsSection.innerHTML = '<h3>Skills</h3>';
    const skillsList = document.createElement('ul');
    for (const skillId in player.skills) {
      if (player.skills.hasOwnProperty(skillId)) {
        const skill = SKILLS.find(s => s.id === skillId);
        const li = document.createElement('li');
        li.textContent = skill.name + ' - Level ' + player.skills[skillId];
        skillsList.appendChild(li);
      }
    }
    if (Object.keys(player.skills).length === 0) {
      skillsList.innerHTML = '<li>No skills unlocked yet.</li>';
    }
    skillsSection.appendChild(skillsList);
    content.appendChild(skillsSection);
    const nftSection = document.createElement('div');
    nftSection.innerHTML = '<h3>NFT Boosters</h3>';
    if (WALLET.userAccount) {
      nftSection.innerHTML += `<p>Connected as: ${WALLET.userAccount}</p>`;
      WALLET.fetchUserAssets(WALLET.userAccount).then(assets => {
        const templateCounts = WALLET.countUserTemplates(assets);
        const nftList = document.createElement('ul');
        WALLET.templates.forEach(template => {
          if (templateCounts[template.id]) {
            const li = document.createElement('li');
            li.textContent = `${template.name} (x${templateCounts[template.id]}) - ${template.bonusEffect.toFixed(1)}% Bonus Each`;
            nftList.appendChild(li);
          }
        });
        if (Object.keys(templateCounts).length === 0) {
          nftList.innerHTML = '<li>No NFTs owned in PixelJourney collection.</li>';
        }
        nftSection.appendChild(nftList);
      });
    } else {
      nftSection.innerHTML += '<p>Connect a WAX wallet to view NFT boosters.</p>';
    }
    content.appendChild(nftSection);
    this.togglePanel('profile-panel');
  },

  showPrestige: function() {
    const content = document.getElementById('prestige-content');
    content.innerHTML = '';
    const currentSection = document.createElement('div');
    currentSection.innerHTML = '<h3>Current Prestige</h3>' +
      '<p>Prestige Level: ' + player.prestigePoints.toFixed(1) + '</p>' +
      '<p>Current Damage Boost: ' + (player.prestigePoints * 1).toFixed(1) + '%</p>';
    content.appendChild(currentSection);
    const prestigeGainMultiplier = player.skills.prestige_gain ? SKILLS.find(s => s.id === 'prestige_gain').getEffect(player.skills.prestige_gain) : 1;
    const gained = Math.floor((player.level / 10) * prestigeGainMultiplier);
    const newPrestigePoints = player.prestigePoints + gained;
    const potentialSection = document.createElement('div');
    potentialSection.innerHTML = '<h3>Prestige Gains</h3>' +
      '<p>Prestige Points to Gain: ' + gained.toFixed(1) + '</p>' +
      '<p>New Prestige Level: ' + newPrestigePoints.toFixed(1) + '</p>' +
      '<p>New Damage Boost: ' + (newPrestigePoints * 1).toFixed(1) + '%</p>';
    content.appendChild(potentialSection);
    this.togglePanel('prestige-panel');
  },

  showLeaderboard: function() {
    // Placeholder leaderboard data
    const leaderboardData = [
      { rank: 1, player: 'Player1', score: 15000, level: 50 },
      { rank: 2, player: 'Player2', score: 12000, level: 45 },
      { rank: 3, player: 'Player3', score: 10000, level: 40 },
      { rank: 4, player: 'Player4', score: 8000, level: 35 },
      { rank: 5, player: 'Player5', score: 6000, level: 30 }
    ];

    // Render leaderboard table
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    leaderboardData.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.rank}</td>
        <td>${entry.player}</td>
        <td>${entry.score}</td>
        <td>${entry.level}</td>
      `;
      tbody.appendChild(row);
    });

    // Render prizes (10 random Primary Pixel Ingredients)
    const primaryTemplates = WALLET.templates.filter(t => t.name.includes('(Primary)'));
    const prizeList = document.getElementById('leaderboard-prizes');
    prizeList.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const randomTemplate = primaryTemplates[Math.floor(Math.random() * primaryTemplates.length)];
      const li = document.createElement('li');
      li.textContent = randomTemplate.name;
      prizeList.appendChild(li);
    }

    // Start countdown timer
    this.updateLeaderboardCountdown();

    this.togglePanel('leaderboard-panel');
  },

  updateLeaderboardCountdown: function() {
    const countdownEl = document.getElementById('leaderboard-countdown');
    if (!countdownEl) return;

    const update = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      const diff = endOfMonth - now;

      if (diff <= 0) {
        countdownEl.textContent = 'Season ended!';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setTimeout(update, 1000);
    };
    update();
  },

  notify: function(message, isError, options = {}) {
    const el = document.createElement('div');
    el.className = 'floating-text' + (options.className ? ' ' + options.className : '');
    el.style.left = (options.x || window.innerWidth / 2) + 'px';
    el.style.top = (options.y || window.innerHeight / 2) + 'px';
    el.style.color = isError ? '#ff4444' : '#fff';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  },

  showAntiCheatWarning: function() {
    const warning = document.createElement('div');
    warning.id = 'anti-cheat-warning';
    warning.textContent = 'Tapping too fast! Slow down.';
    document.body.appendChild(warning);
    warning.style.display = 'block';
    setTimeout(() => warning.remove(), 2000);
  },

  checkUpgradeNotice: function() {
    const upgrades = player.getRandomSkills(3);
    const btn = document.getElementById('upgrade-btn');
    btn.dataset.ready = upgrades.length > 0 ? 'true' : 'false';
  },

  checkPrestigeIndicator: function() {
    const earnedPoints = Math.floor(player.level / 10);
    const btn = document.getElementById('prestige-btn');
    btn.dataset.ready = earnedPoints > 0 ? 'true' : 'false';
  },

  applyColorFilter: function(color) {
    const filter = CONSTANTS.colorFilters[color] || '';
    const elements = [
      document.getElementById('bottom-nav'),
      document.querySelectorAll('.nav-btn'),
      document.querySelectorAll('.panel')
    ];
    elements.forEach(el => {
      if (el) {
        if (el.length) {
          el.forEach(item => item.style.filter = filter);
        } else {
          el.style.filter = filter;
        }
      }
    });
  },

  renderBoosters: function() {
    const boostersContainer = document.getElementById('active-boosters');
    boostersContainer.innerHTML = '';
    player.activeBoosters.forEach(booster => {
      const boosterDef = SHOP.boosters.find(b => b.id === booster.key);
      if (!boosterDef) return;
      const remaining = Math.ceil((booster.expires - Date.now()) / 1000);
      const div = document.createElement('div');
      div.className = 'active-booster';
      div.innerHTML = `<span class="booster-icon">${boosterDef.icon}</span><span class="booster-timer">${remaining}s</span>`;
      boostersContainer.appendChild(div);
    });
  },

  saveSettings: function() {
    localStorage.setItem('pxjUISettings', JSON.stringify(this.settings));
  },

  setupEventListeners: function() {
    const navButtons = {
      'profile-btn': () => this.showProfile(),
      'upgrade-btn': () => this.showSkillChoice(player.getRandomSkills(3)),
      'shop-btn': () => {
        SHOP.renderShop();
        this.togglePanel('shop-panel');
      },
      'prestige-btn': () => this.showPrestige(),
      'collection-btn': () => {
        COLLECTION.renderCollection();
        this.togglePanel('collection-panel');
      },
      'leaderboard-btn': () => this.showLeaderboard(),
      'settings-icon': () => this.togglePanel('settings-panel')
    };

    for (const [id, handler] of Object.entries(navButtons)) {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('click', handler);
      }
    }

    const confirmPrestige = document.getElementById('confirm-prestige-btn');
    if (confirmPrestige) {
      confirmPrestige.addEventListener('click', () => {
        const gained = player.prestige();
        this.notify(`Prestiged! Gained ${gained.toFixed(1)} points`);
        this.togglePanel('prestige-panel');
      });
    }

    const claimReward = document.getElementById('claim-reward');
    if (claimReward) {
      claimReward.addEventListener('click', () => {
        if (DAILY_REWARDS.claimReward()) {
          DAILY_REWARDS.renderCalendar();
        }
      });
    }

    const tutorialPrev = document.getElementById('tutorial-prev');
    const tutorialNext = document.getElementById('tutorial-next');
    if (tutorialPrev) tutorialPrev.addEventListener('click', () => TUTORIAL.prevStep());
    if (tutorialNext) tutorialNext.addEventListener('click', () => TUTORIAL.nextStep());

    document.querySelectorAll('.panel-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        const panel = closeBtn.closest('.panel');
        panel.classList.remove('active');
        const btnId = panel.id.replace('-panel', '-btn');
        const btn = document.getElementById(btnId);
        if (btn) btn.classList.remove('active');
      });
    });

    // Wallet buttons
    const walletConnectBtn = document.getElementById('wallet-connect-btn');
    const walletLogoutBtn = document.getElementById('wallet-logout-btn');
    if (walletConnectBtn && typeof WALLET !== 'undefined') {
      walletConnectBtn.addEventListener('click', () => WALLET.login());
    }
    if (walletLogoutBtn && typeof WALLET !== 'undefined') {
      walletLogoutBtn.addEventListener('click', () => WALLET.logout());
    }
  },

  spawnTapParticles: function(x, y) {
    PARTICLES.createTapParticles(x, y, enemy.current ? enemy.current.color : null);
  }
};
