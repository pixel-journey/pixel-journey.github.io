const DAILY_REWARDS = {
  lastClaimDate: null,
  streak: 0,
  maxStreak: 7,
  rewards: [
    { icon: '🔴', type: 'red', amount: 100 },
    { icon: '🔵', type: 'blue', amount: 100 },
    { icon: '🟡', type: 'yellow', amount: 100 },
    { icon: '⚡', type: 'skill', amount: 1 },
    { icon: '🔴🔵🟡', type: 'all', amount: 150 },
    { icon: '⏱️', type: 'booster', amount: 1 },
    { icon: '🌟', type: 'all', amount: 300 }
  ],

  init: function() {
    // Load saved data
    const savedData = localStorage.getItem('pxjDailyRewards');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.lastClaimDate = data.lastClaimDate ? new Date(data.lastClaimDate) : null;
      this.streak = data.streak || 0;
    }

    // Check if reward is available
    if (this.isRewardAvailable()) {
      // Show notification
      setTimeout(() => {
        ui.notify('Daily reward available!', false);

        // Add indicator to profile button
        const profileBtn = document.getElementById('profile-btn');
        profileBtn.dataset.dailyReward = 'true';
      }, 2000);
    }
  },

  isRewardAvailable: function() {
    if (!this.lastClaimDate) return true;

    const now = new Date();
    const lastClaim = new Date(this.lastClaimDate);

    // Reset time to midnight for comparison
    now.setHours(0, 0, 0, 0);
    lastClaim.setHours(0, 0, 0, 0);

    // Check if it's a new day
    return now.getTime() > lastClaim.getTime();
  },

  claimReward: function() {
    if (!this.isRewardAvailable()) {
      ui.notify('You already claimed your daily reward today!', true);
      return false;
    }

    // Check if streak should be reset (more than 1 day since last claim)
    const now = new Date();
    if (this.lastClaimDate) {
      const lastClaim = new Date(this.lastClaimDate);
      lastClaim.setHours(0, 0, 0, 0);

      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      if (lastClaim.getTime() < yesterday.getTime()) {
        // More than 1 day has passed, reset streak
        this.streak = 0;
      }
    }

    // Increment streak
    this.streak = (this.streak % this.maxStreak) + 1;

    // Get reward for current streak
    const reward = this.rewards[this.streak - 1];

    // Apply reward
    if (reward.type === 'all') {
      player.dye.red += reward.amount;
      player.dye.blue += reward.amount;
      player.dye.yellow += reward.amount;
      ui.notify(`Daily Reward: ${reward.amount} of each dye!`, false);
    } else if (reward.type === 'skill') {
      // Give a random skill point
      const availableSkills = SKILLS.filter(s => !player.skills[s.id] || player.skills[s.id] < s.maxLevel);
      if (availableSkills.length > 0) {
        const randomSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
        player.skills[randomSkill.id] = (player.skills[randomSkill.id] || 0) + 1;
        ui.notify(`Daily Reward: Skill point in ${randomSkill.name}!`, false);
      } else {
        // Fallback if no skills available
        player.dye.red += 200;
        player.dye.blue += 200;
        player.dye.yellow += 200;
        ui.notify(`Daily Reward: 200 of each dye!`, false);
      }
    } else if (reward.type === 'booster') {
      // Give a random booster
      const randomBooster = SHOP.boosters[Math.floor(Math.random() * SHOP.boosters.length)];
      player.activateBooster(randomBooster.id);
      ui.notify(`Daily Reward: ${randomBooster.name} activated!`, false);
    } else {
      // Single dye type
      player.dye[reward.type] += reward.amount;
      ui.notify(`Daily Reward: ${reward.amount} ${reward.type} dye!`, false);
    }

    // Update last claim date
    this.lastClaimDate = new Date();

    // Save data
    this.save();
    player.save();

    // Update UI
    ui.updateCurrencyBar();

    // Remove indicator from profile button
    const profileBtn = document.getElementById('profile-btn');
    profileBtn.dataset.dailyReward = 'false';

    // Play reward sound
    AUDIO.play('purchase');

    return true;
  },

  renderCalendar: function() {
    const calendar = document.getElementById('daily-reward-calendar');
    calendar.innerHTML = '';

    for (let i = 0; i < this.maxStreak; i++) {
      const day = i + 1;
      const reward = this.rewards[i];
      const isClaimed = this.streak > i;
      const isToday = this.streak === i;

      const dayElement = document.createElement('div');
      dayElement.className = `calendar-day ${isClaimed ? 'claimed' : ''} ${isToday && !isClaimed ? 'active' : ''}`;

      dayElement.innerHTML = `
        <div class="day-number">Day ${day}</div>
        <div class="reward-icon">${reward.icon}</div>
        <div class="reward-value">${reward.amount}</div>
      `;

      calendar.appendChild(dayElement);
    }

    // Update claim button
    const claimButton = document.getElementById('claim-reward');
    claimButton.disabled = !this.isRewardAvailable();
    claimButton.textContent = this.isRewardAvailable() ? 'Claim Reward' : 'Already Claimed Today';

    // Add event listener to claim button
    claimButton.onclick = () => {
      if (this.claimReward()) {
        this.renderCalendar();
      }
    };
  },

  showDailyReward: function() {
    ui.togglePanel('daily-reward-panel');
    this.renderCalendar();
  },

  save: function() {
    localStorage.setItem('pxjDailyRewards', JSON.stringify({
      lastClaimDate: this.lastClaimDate,
      streak: this.streak
    }));
  }
};
