let boosterUpdateTimeout = null;

var ui = {
  settings: {
    showDamageNumbers: true,
    alwaysShowBuffs: false,
    autoSelectSkills: false  // Add this line
  },
  lastHealthPct: null, // Track last health percentage

  init: function () {
    console.log("ui.init called")
    this.updateCurrencyBar()
    this.updateXPBar()
    this.updateLevelTracker()
    this.updateWaveCounter()
    this.setupEventListeners()

    // Add booster listeners initialization
    SHOP.initBoosterListeners()

    // Load UI settings
    const savedSettings = localStorage.getItem("pxjUISettings")
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) }
    }

    // Initialize settings UI
    document.getElementById("damage-numbers-setting").checked = this.settings.showDamageNumbers
    document.getElementById("always-show-buffs").checked = this.settings.alwaysShowBuffs
    document.getElementById("auto-select-skills").checked = this.settings.autoSelectSkills  // Initialize checkbox state
    
    document.getElementById("auto-select-skills").addEventListener("change", (e) => {
        this.settings.autoSelectSkills = e.target.checked;
        this.saveSettings();  // Save settings when changed
    });

    // Apply "always show buffs" setting initially
    if (this.settings.alwaysShowBuffs) {
      document.getElementById("active-boosters").classList.add("always-show")
    }

    // Show wallet modal if WALLET is defined
    if (typeof WALLET !== "undefined") {
      console.log("Calling WALLET.showWalletModal")
      WALLET.showWalletModal()

    } else {
      console.warn("WALLET not defined, skipping wallet modal")
    }
  },

  updateCurrencyBar: function () {
    if (this.currencyUpdatePending) return
    this.currencyUpdatePending = true
    setTimeout(() => {
      document.getElementById("dye-red").textContent = "🔴 " + (player.dye.red || 0).toFixed(0)
      document.getElementById("dye-blue").textContent = "🔵 " + (player.dye.blue || 0).toFixed(0)
      document.getElementById("dye-yellow").textContent = "🟡 " + (player.dye.yellow || 0).toFixed(0)
      this.currencyUpdatePending = false
    }, 100) // Update every 100ms
  },

  updateXPBar: () => {
    const pct = ((player.xp || 0) / (player.xpToNext || 100)) * 100
    document.getElementById("xp-fill").style.width = pct + "%"
    document.getElementById("xp-text").textContent =
      `${(player.xp || 0).toFixed(1)} / ${(player.xpToNext || 100).toFixed(0)}`
  },

  updateLevelTracker: () => {
    document.getElementById("level-tracker").textContent = "Level: " + (player.level || 1).toFixed(1)
  },


    updateHealthBar: function() {
      const healthFill = document.getElementById('health-fill');
      const enemyName = document.getElementById('enemy-name');
      const enemyHP = document.getElementById('enemy-hp');
      const waveCounter = document.getElementById('wave-counter');
      
      // Only update if we have an enemy or the display is empty
      if (!enemy.current && enemyName.textContent !== '') {
        healthFill.style.width = '0%';
        enemyName.textContent = '';
        enemyHP.textContent = '';
        waveCounter.textContent = `Wave: ${gameState.wave}`;
        return;
      }
      
      if (enemy.current) {
        const healthPercent = (enemy.current.hp / enemy.current.maxHp) * 100;
        healthFill.style.width = `${healthPercent}%`;
        enemyName.textContent = `${enemy.current.color.charAt(0).toUpperCase() + enemy.current.color.slice(1)} Tier ${enemy.current.tier}`.replace("_", " ");
        enemyHP.textContent = `${Math.round(enemy.current.hp)} / ${enemy.current.maxHp}`;
        waveCounter.textContent = `Wave: ${gameState.wave}`;
      }
    },

    updatePlayerStats: function() {
      const autoTapDPS = player.getAutoTapDPS()
      const tapDamage = player.getTapDamage()
      const critChance = player.getCriticalChance()
      
      document.getElementById('autotap-dps').textContent = `Autotap: ${Math.round(autoTapDPS)} DPS`
      document.getElementById('tap-damage').textContent = `Tap: ${Math.round(tapDamage)}`
      document.getElementById('crit-chance').textContent = `Crit: ${(critChance * 100).toFixed(1)}%`

      // Add Multi Tap chance display
      const multiTapChance = player.skills.multi_tap ? 
          SKILLS.find(s => s.id === "multi_tap").getEffect(player.skills.multi_tap) * 100 : 0;
      document.getElementById('multi-tap').textContent = `Multi Tap: ${multiTapChance.toFixed(1)}%`
      
      // Add XP Bonus display
      const xpBonus = player.skills.bonus_xp ? 
          (SKILLS.find(s => s.id === "bonus_xp").getEffect(player.skills.bonus_xp) - 1) * 100 : 0;
      document.getElementById('xp-bonus').textContent = `XP Bonus: ${xpBonus.toFixed(1)}%`
  },

  updateWaveCounter: () => {
    document.getElementById("wave-counter").textContent = "Wave: " + (gameState.wave || 1).toFixed(0)
  },

  togglePanel: function(panelId) {
    console.log('ui.togglePanel called:', panelId);
    const panel = document.getElementById(panelId);
    const isOpen = panel.classList.contains('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    if (!isOpen) {
      panel.classList.add('active');
      if (panelId === 'shop-panel') {
        SHOP.renderShop();
      } else if (panelId === 'inventory-panel') {
        this.renderInventory();
      } else if (panelId === 'collection-panel') {
        COLLECTION.renderCollection();
      } else if (panelId === 'profile-panel') {
        // this.renderProfile();
      }
    }
  },

  showSkillChoice: function (skills) {
    const dyeTypes = ["red", "blue", "yellow"]
    const dyeType = dyeTypes[Math.floor(Math.random() * 3)]
    const cost = 100
    if (player.dye[dyeType] < cost) {
      this.notify(`Need ${cost} ${dyeType} dye to open upgrades!`, true)
      return
    }
    player.dye[dyeType] -= cost
    this.updateCurrencyBar()

    const panel = document.getElementById("upgrade-panel")
    const options = document.getElementById("skill-options")
    options.innerHTML = ""
    let upgradeApplied = false // Track if an upgrade has been applied
    skills.forEach((skill) => {
      const btn = document.createElement("button")
      btn.className = "sidebar-btn"
      btn.innerHTML =
        '<div class="skill-icon">⚡</div>' +
        '<div class="skill-name">' +
        skill.name +
        "</div>" +
        '<div class="skill-desc">' +
        skill.description +
        " (Cost: " +
        (skill.baseCost * ((player.skills[skill.id] || 0) + 1)).toFixed(1) +
        " " +
        skill.type +
        " dye)</div>"
      btn.onclick = () => {
        if (upgradeApplied) {
          this.notify("Upgrade already applied!", true)
          return
        }
        const success = player.upgradeSkill(skill.id)
        if (success) {
          upgradeApplied = true
          options.innerHTML = "" // Clear options
          panel.classList.remove("active") // Close the entire panel
        }
      }
      options.appendChild(btn)
    })
    const controls = document.createElement("div")
    controls.style.display = "flex"
    controls.style.justifyContent = "space-between"
    controls.style.marginTop = "10px"
    const skipBtn = document.createElement("button")
    skipBtn.className = "sidebar-btn"
    skipBtn.textContent = "Skip"
    skipBtn.onclick = () => {
      options.innerHTML = "" // Clear options
      panel.classList.remove("active") // Close the entire panel
    }
    const refreshBtn = document.createElement("button")
    refreshBtn.className = "sidebar-btn"
    refreshBtn.textContent = "Refresh (-100 Each Dye)"
    refreshBtn.onclick = () => {
      if (upgradeApplied) {
        this.notify("Cannot refresh after upgrading!", true)
        return
      }
      const refreshType = dyeTypes[Math.floor(Math.random() * 3)]
      if (player.dye[refreshType] >= 10) {
        player.dye[refreshType] -= 10
        this.updateCurrencyBar()
        this.showSkillChoice(player.getRandomSkills(3))
      } else {
        this.notify(`Need 100 of each dye to refresh!`, true)
      }
    }
    controls.appendChild(skipBtn)
    controls.appendChild(refreshBtn)
    options.appendChild(controls)
    this.togglePanel("upgrade-panel")
  },

  showProfile: function () {
    // First, set up the profile tab
    const profileContent = document.getElementById("profile-info")
    profileContent.innerHTML = ""

    // Avatar section
    const avatarSection = document.createElement("div")
    avatarSection.className = "profile-section"
    avatarSection.innerHTML = `
      <div class="profile-avatar">🧙</div>
      <p style="text-align: center; color: var(--accent-color);">Avatar (NFT customization coming soon)</p>
    `

        // Add wallet connect button if not logged in
        if (!WALLET.userAccount) {
          const walletBtn = document.createElement("button")
          walletBtn.className = "wallet-connect-profile"
          walletBtn.innerHTML = `<span>🔗</span> Connect WAX Wallet`
          walletBtn.addEventListener("click", () => WALLET.login())
          avatarSection.appendChild(walletBtn)
        }

        profileContent.appendChild(avatarSection)

        // Stats section with grid layout
        const statsSection = document.createElement("div")
        statsSection.className = "profile-section"
        statsSection.innerHTML = "<h3>Player Stats</h3>"
        
        const statsGrid = document.createElement("div")
        statsGrid.className = "stats-grid"
        
        // Define stats with icons and tooltips
        const stats = [
          {
            name: "Tap Power", 
            value: (player.calculateTapDamage() / player.tapDamage).toFixed(1) + "x",
            icon: "👆",
            tooltip: "Your current tap power multiplier"
          },
          {
            name: "XP Bonus", 
            value: ((player.skills.bonus_xp ? SKILLS.find((s) => s.id === "bonus_xp").getEffect(player.skills.bonus_xp) : 1) * 100).toFixed(1) + "%",
            icon: "⭐",
            tooltip: "Bonus XP gained from all sources"
          },
          {
            name: "Red Dye", 
            value: ((player.skills.dye_boost_red ? SKILLS.find((s) => s.id === "dye_boost_red").getEffect(player.skills.dye_boost_red) : 1) * 100).toFixed(1) + "%",
            icon: "🔴",
            tooltip: "Bonus red dye gained from all sources"
          },
          {
            name: "Blue Dye", 
            value: ((player.skills.dye_boost_blue ? SKILLS.find((s) => s.id === "dye_boost_blue").getEffect(player.skills.dye_boost_blue) : 1) * 100).toFixed(1) + "%",
            icon: "🔵",
            tooltip: "Bonus blue dye gained from all sources"
          },
          {
            name: "Yellow Dye", 
            value: ((player.skills.dye_boost_yellow ? SKILLS.find((s) => s.id === "dye_boost_yellow").getEffect(player.skills.dye_boost_yellow) : 1) * 100).toFixed(1) + "%",
            icon: "🟡",
            tooltip: "Bonus yellow dye gained from all sources"
          },
          {
            name: "Crit Chance", 
            value: (player.skills.crit_chance ? SKILLS.find((s) => s.id === "crit_chance").getEffect(player.skills.crit_chance) * 100 : 0).toFixed(1) + "%",
            icon: "⚡",
            tooltip: "Chance to land a critical hit"
          },
          {
            name: "Crit Multi", 
            value: (player.skills.crit_multiplier ? SKILLS.find((s) => s.id === "crit_multiplier").getEffect(player.skills.crit_multiplier) : 1).toFixed(1) + "x",
            icon: "💥",
            tooltip: "Damage multiplier for critical hits"
          },
          {
            name: "Prestige", 
            value: (player.prestigePoints * 1).toFixed(1) + "%",
            icon: "🏆",
            tooltip: "Bonus from prestige points"
          },
          {
            name: "Booster Time", 
            value: ((player.skills.booster_duration ? SKILLS.find((s) => s.id === "booster_duration").getEffect(player.skills.booster_duration) : 1) * 100).toFixed(1) + "%",
            icon: "⏱️",
            tooltip: "Increased duration for all boosters"
          },
          {
            name: "Shop Booster", 
            value: ((player.skills.shop_booster_duration ? SKILLS.find((s) => s.id === "shop_booster_duration").getEffect(player.skills.shop_booster_duration) : 1) * 100).toFixed(1) + "%",
            icon: "🛒",
            tooltip: "Increased duration for shop boosters"
          },
          {
            name: "NFT Bonus", 
            value: (player.nftBonus || 0).toFixed(1) + "%",
            icon: "🖼️",
            tooltip: "Bonus from owned NFTs"
          }
        ];
        
        // Create stat items
        stats.forEach(stat => {
          const statItem = document.createElement("div")
          statItem.className = "stat-item"
          statItem.dataset.tooltip = stat.tooltip
          statItem.innerHTML = `
            <div class="stat-icon">${stat.icon}</div>
            <div class="stat-name">${stat.name}</div>
            <div class="stat-value">${stat.value}</div>
          `
          statsGrid.appendChild(statItem)
        });
        
        statsSection.appendChild(statsGrid)
        profileContent.appendChild(statsSection)

        // Skills section with grid layout
        const skillsSection = document.createElement("div")
        skillsSection.className = "profile-section"
        skillsSection.innerHTML = "<h3>Skills</h3>"
        
        const skillsGrid = document.createElement("div")
        skillsGrid.className = "skills-grid"
        
        // Get all available skills
        const allSkills = SKILLS.map(skill => {
          const currentLevel = player.skills[skill.id] || 0
          const maxLevel = skill.maxLevel || 500
          const progressPct = (currentLevel / maxLevel) * 100
          
          return {
            id: skill.id,
            name: skill.name,
            description: skill.description,
            currentLevel: currentLevel,
            maxLevel: maxLevel,
            progressPct: progressPct,
            unlocked: currentLevel > 0,
            icon: this.getSkillIcon(skill.id)
          }
        });
        
        // Create skill items
        allSkills.forEach(skill => {
          const skillItem = document.createElement("div")
          skillItem.className = skill.unlocked ? "skill-item" : "skill-item locked"
          
          // Create tooltip with skill description and effect
          let tooltip = `${skill.name}: ${skill.description}`
          if (skill.unlocked) {
            const skillDef = SKILLS.find(s => s.id === skill.id)
            if (skillDef && skillDef.getEffect) {
              const effect = skillDef.getEffect(skill.currentLevel)
              tooltip += `\nCurrent effect: ${typeof effect === 'number' ? (effect * 100).toFixed(1) + '%' : effect}`
            }
          } else {
            tooltip += "\n(Not yet unlocked)"
          }
          
          skillItem.dataset.tooltip = tooltip
          
          skillItem.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">${skill.currentLevel}<span class="skill-max">/${skill.maxLevel}</span></div>
            <div class="skill-progress">
              <div class="skill-progress-fill" style="width: ${skill.progressPct}%"></div>
            </div>
          `
          skillsGrid.appendChild(skillItem)
        });
        
        skillsSection.appendChild(skillsGrid)
        profileContent.appendChild(skillsSection)

        // NFT section
        const nftSection = document.createElement("div")
        nftSection.className = "profile-section"
        nftSection.innerHTML = "<h3>NFT Boosters</h3>"
        
        if (WALLET.userAccount) {
          nftSection.innerHTML += `<p>Connected as: <span style="color: var(--primary-color)">${WALLET.userAccount}</span></p>`
          
          const nftGrid = document.createElement("div")
          nftGrid.className = "stats-grid" // Reuse the same grid layout
          
          WALLET.fetchUserAssets(WALLET.userAccount).then((assets) => {
            const templateCounts = WALLET.countUserTemplates(assets)
            
            if (Object.keys(templateCounts).length === 0) {
              nftSection.innerHTML += "<p>No NFTs owned in PixelJourney collection.</p>"
            } else {
              WALLET.templates.forEach((template) => {
                if (templateCounts[template.id]) {
                  const nftItem = document.createElement("div")
                  nftItem.className = "stat-item"
                  nftItem.dataset.tooltip = `${template.name}: Provides a ${template.bonusEffect.toFixed(1)}% bonus to your stats`
                  
                  nftItem.innerHTML = `
                    <div class="stat-icon">🖼️</div>
                    <div class="stat-name">${template.name}</div>
                    <div class="stat-value">x${templateCounts[template.id] || 1}</div>
                    <div style="font-size: 12px; color: var(--accent-color)">+${template.bonusEffect.toFixed(1)}% each</div>
                  `
                  nftGrid.appendChild(nftItem)
                }
              })
              nftSection.appendChild(nftGrid)
            }
          })
        } else {
          nftSection.innerHTML += "<p>Connect a WAX wallet to view NFT boosters.</p>"
        }
        
        profileContent.appendChild(nftSection)

        // Now set up the achievements tab
        ACHIEVEMENTS.renderAchievements()

        // Set up the collection tab
        COLLECTION.renderCollection(true)

        // Show the panel
        this.togglePanel("profile-panel")
      },

      // Helper function to get skill icons
      getSkillIcon: function(skillId) {
        const iconMap = {
          tap_power: "👆",
          bonus_xp: "⭐",
          dye_boost_red: "🔴",
          dye_boost_blue: "🔵",
          dye_boost_yellow: "🟡",
          crit_chance: "⚡",
          crit_multiplier: "💥",
          prestige_gain: "🏆",
          booster_duration: "⏱️",
          shop_booster_duration: "🛒",
          // Add more skill icons as needed
        };
        
        return iconMap[skillId] || "🔮"; // Default icon if not found
  },

  showPrestige: function () {
    // Populate the main prestige info tab
    const prestigeInfoContent = document.getElementById("prestige-info")
    prestigeInfoContent.innerHTML = ""
    
    const currentSection = document.createElement("div")
    currentSection.innerHTML =
      "<h3>Current Prestige</h3>" +
      "<p>Prestige Level: " + player.prestigePoints + "</p>" +
      "<p>Available Prestige Talent Points: " + (player.prestigePoints - player.allocatedPrestigePoints) + "</p>" +
      "<p>Current Damage Boost: " +
      (player.prestigePoints * 1).toFixed(1) +
      "%</p>"
    prestigeInfoContent.appendChild(currentSection)
    
    const prestigeGainMultiplier = player.skills.prestige_gain
      ? SKILLS.find((s) => s.id === "prestige_gain").getEffect(player.skills.prestige_gain)
      : 1
    const gained = Math.floor((player.level / 10 + gameState.wave / 10) * prestigeGainMultiplier)
    const newPrestigePoints = player.prestigePoints + gained
    
    const potentialSection = document.createElement("div")
    potentialSection.innerHTML =
      "<h3>Prestige Gains</h3>" +
      "<p>Prestige Points to Gain: " +
      gained.toFixed(1) +
      "</p>" +
      "<p>New Prestige Level: " +
      newPrestigePoints.toFixed(1) +
      "</p>" +
      "<p>New Damage Boost: " +
      (newPrestigePoints * 1).toFixed(1) +
      "%</p>"
    prestigeInfoContent.appendChild(potentialSection)
    
    // Add prestige button
    const prestigeButton = document.createElement("button")
    prestigeButton.id = "confirm-prestige-btn"
    prestigeButton.className = "sidebar-btn"
    prestigeButton.textContent = "Prestige Now"
    prestigeInfoContent.appendChild(prestigeButton)
    
 // Populate the upgrades tab with the talent tree
 const upgradesContent = document.getElementById("prestige-upgrades")
 upgradesContent.innerHTML = `
   <div class="prestige-points-display">
     <div class="prestige-points-total">
       <span class="points-label">Total Prestige Points:</span>
       <span class="points-value">${player.prestigePoints|| 0}</span>
     </div>
     <div class="prestige-points-available">
       <span class="points-label">Available Points:</span>
       <span class="points-value">${player.prestigePoints - player.allocatedPrestigePoints || 0}</span>
     </div>
   </div>
   
   <div class="prestige-upgrade-actions">
     <button id="reset-talents-btn" class="danger-btn">Reset Talent Allocations</button>
   </div>
   
   <div class="prestige-coming-soon-features">
     <div class="coming-soon-feature">
       <div class="feature-icon">🔄</div>
       <div class="feature-info">
         <h4>Auto Prestige</h4>
         <p>Automatically prestige when reaching certain milestones.</p>
       </div>
       <button class="sidebar-btn" disabled>Coming Soon</button>
     </div>
     
     <div class="coming-soon-feature">
       <div class="feature-icon">🤖</div>
       <div class="feature-info">
         <h4>Auto-Select Prestige Upgrades</h4>
         <p>Automatically allocate prestige points based on your preferences.</p>
       </div>
       <button class="sidebar-btn" disabled>Coming Soon</button>
     </div>
   </div>
   
   <div class="prestige-talent-tree-container">
     <div id="prestige-talent-tree"></div>
   </div>
 `
    
    // Populate the history tab with actual content
    const historyContent = document.getElementById("prestige-history")
    historyContent.innerHTML = `
      <h3>Prestige History</h3>
      <p>Track your prestige journey and achievements.</p>
      
      <div class="prestige-history-stats">
        <div class="stat-item">
          <span class="stat-label">Total Prestiges:</span>
          <span class="stat-value">${player.stats?.totalPrestiges || 0}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Highest Points Gained:</span>
          <span class="stat-value">${player.stats?.highestPrestigePoints?.toFixed(1) || 0}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Points Earned:</span>
          <span class="stat-value">${player.stats?.totalPrestigePointsEarned?.toFixed(1) || 0}</span>
        </div>
      </div>
      
      <h4>Recent Prestiges</h4>
      <div class="prestige-history-list" id="prestige-history-list">
        <p class="empty-history-message">No prestige history recorded yet.</p>
      </div>
    `
    // Render prestige history
    this.renderPrestigeHistory()

    // Show the panel
    this.togglePanel("prestige-panel")
    
    // Re-attach event listener for the prestige button
    document.getElementById("confirm-prestige-btn").addEventListener("click", () => {
      const gained = player.prestige()
      this.notify(`Prestiged! Gained ${gained.toFixed(1)} points`)
      this.togglePanel("prestige-panel")
    })

    // Render the talent tree immediately when the upgrades tab is shown
    PRESTIGE_TALENTS.renderTalentTree()
    
    // Add event listener for reset talents button
    document.getElementById("reset-talents-btn").addEventListener("click", () => {
      if (confirm("Are you sure you want to reset your talent allocations? All points will be refunded.")) {
        PRESTIGE_TALENTS.resetTalents()
      }
    })
    
    // Add tab switching functionality
    document.querySelectorAll('.prestige-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.prestige-tab').forEach(t => t.classList.remove('active'))
        document.querySelectorAll('.prestige-tab-content').forEach(c => c.classList.remove('active'))
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active')
        document.getElementById(tab.dataset.tab).classList.add('active')
        
        // If switching to upgrades tab, render the talent tree
        if (tab.dataset.tab === 'prestige-upgrades') {
          PRESTIGE_TALENTS.renderTalentTree()
        }
      })
    })
  },

  showPrestigeTalents: function() {
    // Show prestige panel
    document.getElementById('prestige-panel').classList.add('active');
    
    // Switch to talents tab
    document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector('.panel-tab[data-tab="prestige-talents"]').classList.add('active');
    document.getElementById('prestige-talents').classList.add('active');
    
    // Initialize talent tree if needed
    if (!talentTreeInitialized) {
      initializeTalentTree();
      talentTreeInitialized = true;
    }
  },

  renderPrestigeHistory: function() {
    const historyList = document.getElementById("prestige-history-list")
    if (!historyList) return
    
    if (!player.stats?.prestigeHistory || player.stats.prestigeHistory.length === 0) {
      historyList.innerHTML = '<p class="empty-history-message">No prestige history recorded yet.</p>'
      return
    }
    
    historyList.innerHTML = ''
    
    player.stats.prestigeHistory.forEach((entry, index) => {
      const date = new Date(entry.date)
      const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
      
      const historyItem = document.createElement('div')
      historyItem.className = 'prestige-history-item'
      historyItem.innerHTML = `
        <div class="history-date">${formattedDate}</div>
        <div class="history-details">
          <span>+${entry.points.toFixed(1)} points</span>
          <span>Level: ${entry.level}</span>
          <span>Wave: ${entry.wave}</span>
        </div>
      `
      historyList.appendChild(historyItem)
    })
  },

  showLeaderboard: function () {
    // Placeholder leaderboard data
    const leaderboardData = [
      { rank: 1, player: "Player1", score: 15000, level: 50 },
      { rank: 2, player: "Player2", score: 12000, level: 45 },
      { rank: 3, player: "Player3", score: 10000, level: 40 },
      { rank: 4, player: "Player4", score: 8000, level: 35 },
      { rank: 5, player: "Player5", score: 6000, level: 30 },
    ]

    // Render leaderboard table
    const tbody = document.getElementById("leaderboard-body")
    tbody.innerHTML = ""
    leaderboardData.forEach((entry) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${entry.rank}</td>
        <td>${entry.player}</td>
        <td>${entry.score}</td>
        <td>${entry.level}</td>
      `
      tbody.appendChild(row)
    })

    // Render prizes (10 random Primary Pixel Ingredients)
    const primaryTemplates = WALLET.templates.filter((t) => t.name.includes("(Primary)"))
    const prizeList = document.getElementById("leaderboard-prizes")
    prizeList.innerHTML = ""
    for (let i = 0; i < 10; i++) {
      const randomTemplate = primaryTemplates[Math.floor(Math.random() * primaryTemplates.length)]
      const li = document.createElement("li")
      li.textContent = randomTemplate.name
      prizeList.appendChild(li)
    }

    // Start countdown timer
    this.updateLeaderboardCountdown()

    this.togglePanel("leaderboard-panel")
  },

  updateLeaderboardCountdown: () => {
    const countdownEl = document.getElementById("leaderboard-countdown")
    if (!countdownEl) return

    const update = () => {
      const now = new Date()
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      const diff = endOfMonth - now

      if (diff <= 0) {
        countdownEl.textContent = "Season ended!"
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`
      setTimeout(update, 1000)
    }
    update()
  },

  notify: (message, isError, options = {}) => {
    // Check if this is a dye reward notification
    if (
      !isError &&
      message.includes("dye") &&
      (message.includes("red") || message.includes("blue") || message.includes("yellow"))
    ) {
      // Extract the amount and color from the message
      const matches = message.match(/\+([\d.]+) (\w+) dye/)
      if (matches && matches.length === 3) {
        const amount = matches[1]
        const color = matches[2]

        // Create an element with the dye icon instead of text
        const el = document.createElement("div")
        el.className = "floating-text reward-icon"

        // Randomize position slightly around the click point
        const randomX = (options.x || window.innerWidth / 2) + (Math.random() * 40 - 20)
        const randomY = (options.y || window.innerHeight / 2) + (Math.random() * 40 - 20)

        el.style.left = randomX + "px"
        el.style.top = randomY + "px"

        // Use the appropriate emoji based on color
        let emoji = "🧪"
        if (color === "red") emoji = "🔴"
        else if (color === "blue") emoji = "🔵"
        else if (color === "yellow") emoji = "🟡"

        el.innerHTML = `${emoji} <span>+${amount}</span>`
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 1000)
        return
      }
    }

    // For non-dye notifications, use the original code
    const el = document.createElement("div")
    el.className = "floating-text" + (options.className ? " " + options.className : "")

    // Randomize position slightly if this is a damage number
    if (options.className && options.className.includes("damage-text")) {
      // Randomize position slightly around the click point
      const randomX = (options.x || window.innerWidth / 2) + (Math.random() * 40 - 20)
      const randomY = (options.y || window.innerHeight / 2) + (Math.random() * 40 - 20)
      el.style.left = randomX + "px"
      el.style.top = randomY + "px"
    } else {
    el.style.left = (options.x || window.innerWidth / 2) + (Math.random() * 40 - 20) + "px"
    el.style.top = (options.y || window.innerHeight / 2) + (Math.random() * 40 - 20) + "px"
        }
    el.style.color = isError ? "#ff4444" : "#fff"
    el.textContent = message
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 1000)
  },

  showAntiCheatWarning: () => {
    const warning = document.createElement("div")
    warning.id = "anti-cheat-warning"
    warning.textContent = "Tapping too fast! Slow down."
    document.body.appendChild(warning)
    warning.style.display = "block"
    setTimeout(() => warning.remove(), 2000)
  },

  checkUpgradeNotice: () => {
    const upgrades = player.getRandomSkills(3)
    return upgrades.length > 0
  },

  checkPrestigeIndicator: () => {
    const prestigeGainMultiplier = player.skills.prestige_gain
      ? SKILLS.find((s) => s.id === "prestige_gain").getEffect(player.skills.prestige_gain)
      : 1
    const earnedPoints = Math.floor((player.level / 10 + gameState.wave / 10) * prestigeGainMultiplier)
     const btn = document.getElementById("prestige-btn")

         // Remove existing badge if any
         const existingBadge = btn.querySelector(".prestige-badge")
         if (existingBadge) {
           existingBadge.remove()
         }

         if (earnedPoints > 0) {
           btn.dataset.ready = "true"

           // Add badge showing points to be earned with improved positioning
           const badge = document.createElement("div")
           badge.className = "prestige-badge"
           badge.textContent = earnedPoints
           btn.appendChild(badge)
         } else {
           btn.dataset.ready = "false"
         }
  },

  applyColorFilter: (color) => {
    const filter = CONSTANTS.colorFilters[color] || ""
    const elements = [
      document.getElementById("bottom-nav"),
      document.querySelectorAll(".nav-btn"),
      // document.querySelectorAll(".panel"),
    ]
    elements.forEach((el) => {
      if (el) {
        if (el.length) {
          el.forEach((item) => (item.style.filter = filter))
        } else {
          el.style.filter = filter
        }
      }
    })
  },

  createActiveEffectIndicator: function(effectName, duration) {
    const container = document.getElementById("active-effects");
    if (!container) return;
    
    const effectId = `effect-${effectName.toLowerCase().replace(/\s+/g, '-')}`;
    
    // Check if indicator already exists
    let indicator = document.getElementById(effectId);
    if (!indicator) {
      // Create new indicator
      indicator = document.createElement("div");
      indicator.id = effectId;
      indicator.className = "active-effect";
      indicator.innerHTML = `
        <div class="effect-icon">✨</div>
        <div class="effect-name">${effectName}</div>
        <div class="effect-timer"></div>
      `;
      container.appendChild(indicator);
    }
    
    // Update timer
    const timer = indicator.querySelector(".effect-timer");
    if (timer) {
      timer.textContent = `${duration.toFixed(1)}s`;
    }
    
    // Set expiration
    indicator.dataset.expires = Date.now() + (duration * 1000);
    
    // Start timer update
    this.updateEffectTimers();
  },

  updateEffectTimers: function() {
    const effects = document.querySelectorAll(".active-effect");
    effects.forEach(effect => {
      const expires = parseInt(effect.dataset.expires);
      const remaining = (expires - Date.now()) / 1000;
      
      if (remaining <= 0) {
        effect.remove();
      } else {
        const timer = effect.querySelector(".effect-timer");
        if (timer) {
          timer.textContent = `${remaining.toFixed(1)}s`;
        }
      }
    });
    
    // Continue updating if effects exist
    if (document.querySelectorAll(".active-effect").length > 0) {
      requestAnimationFrame(() => this.updateEffectTimers());
    }
  },

  renderBoosters: () => {
    // Debounce the update
    if (boosterUpdateTimeout) {
        clearTimeout(boosterUpdateTimeout);
    }
    
    boosterUpdateTimeout = setTimeout(() => {
        const boostersContainer = document.getElementById("active-boosters");
        if (!boostersContainer) {
            console.warn('Active boosters container not found');
            return;
        }

        const showEmptyBoosters = ui.settings.alwaysShowBuffs || false;

        // Create active booster map for quick lookup
        const activeBoosterMap = {};
        if (Array.isArray(player.activeBoosters)) {
            player.activeBoosters.forEach((booster) => {
                activeBoosterMap[booster.key] = booster;
            });
        }

        // Update each booster slot's state
        const boosterSlots = boostersContainer.querySelectorAll('.booster-slot');
        boosterSlots.forEach(slot => {
            const boosterId = slot.dataset.boosterId;
            const boosterDef = SHOP?.boosters?.find(b => b.id === boosterId);
            if (!boosterDef) return;

            
            const activeBooster = activeBoosterMap[boosterId];
            const timerEl = slot.querySelector('.booster-timer');
            
            // Add tooltip with cost information
            if (boosterDef) {
                const costText = `Cost: 🔴 ${boosterDef.cost.red} 🔵 ${boosterDef.cost.blue} 🟡 ${boosterDef.cost.yellow}`;
                slot.title = `${boosterDef.name}: ${boosterDef.description}\n${costText}`;
            }
            
            if (activeBooster) {
                const now = Date.now();
                const remaining = Math.max(0, Math.ceil((activeBooster.expires - now) / 1000));
                
                slot.classList.remove('empty-booster');
                slot.classList.add('active-booster');
                
                if (remaining <= 5 && remaining > 0) {
                    slot.classList.add('expiring');
                } else {
                    slot.classList.remove('expiring');
                }

                // Format time display
                let timeDisplay = remaining >= 60 
                    ? `${Math.floor(remaining / 60)}m ${remaining % 60}s` 
                    : `${remaining}s`;
                    
                timerEl.textContent = timeDisplay;
            } else {
                slot.classList.remove('active-booster', 'expiring');
                slot.classList.add('empty-booster');
                timerEl.textContent = '0s'; // Changed from '0' to '0s' for consistency
            }

            // Show/hide based on settings
            slot.style.display = (activeBooster || showEmptyBoosters) ? 'flex' : 'none';
        });

        SHOP.initBoosterListeners()
      }, 100); // Update at most every 100ms    
},

renderInventory: function() {
  const inventoryContent = document.getElementById("inventory-grid");
  if (!inventoryContent) return;
  
  inventoryContent.innerHTML = "";
  
  // Add shop button as first slot
  const shopSlot = document.createElement("div");
  shopSlot.className = "inventory-slot shop-slot";
  shopSlot.innerHTML = '<div class="inventory-item-icon">🛍️</div>';
  shopSlot.onclick = () => {
      this.togglePanel("inventory-panel");
      SHOP.renderShop();
      this.togglePanel("shop-panel");
  };
  inventoryContent.appendChild(shopSlot);
  
  // Add unlocked inventory slots
  for (let i = 0; i < player.inventorySlots; i++) {
      const slot = document.createElement("div");
      slot.className = "inventory-slot";
      slot.innerHTML = '<div class="inventory-item-icon">+</div>';
      inventoryContent.appendChild(slot);
  }

  // Helper function to format large numbers
  const formatNumber = (num) => {
      if (num >= 1000000000) return (num/1000000000).toFixed(1) + 'B';
      if (num >= 1000000) return (num/1000000).toFixed(1) + 'M';
      if (num >= 1000) return (num/1000).toFixed(1) + 'K';
      return num.toString();
  };
    
// Add locked slots that require dye to unlock
const dyeCosts = [
  {red: 1000, blue: 1000, yellow: 1000},        // Tier 1
  {red: 5000, blue: 5000, yellow: 5000},        // Tier 2
  {red: 25000, blue: 25000, yellow: 25000},     // Tier 3
  {red: 100000, blue: 100000, yellow: 100000},  // Tier 4
  {red: 250000, blue: 250000, yellow: 250000},  // Tier 5
  {red: 500000, blue: 500000, yellow: 500000},  // Tier 6
  {red: 1000000, blue: 1000000, yellow: 1000000}, // Tier 7
  {red: 2500000, blue: 2500000, yellow: 2500000}, // Tier 8
  {red: 5000000, blue: 5000000, yellow: 5000000}, // Tier 9
  {red: 10000000, blue: 10000000, yellow: 10000000}, // Tier 10
  {red: 25000000, blue: 25000000, yellow: 25000000}, // Tier 11
  {red: 50000000, blue: 50000000, yellow: 50000000}, // Tier 12
  {red: 100000000, blue: 100000000, yellow: 100000000}, // Tier 13
  {red: 250000000, blue: 250000000, yellow: 250000000}, // Tier 14
  {red: 500000000, blue: 500000000, yellow: 500000000}, // Tier 15
  {red: 1000000000, blue: 1000000000, yellow: 1000000000} // Tier 16
];
    
dyeCosts.forEach((cost, index) => {
  if (index + 2 < player.inventorySlots) return; // Skip if already unlocked
  
  const slot = document.createElement("div");
  slot.className = "inventory-slot locked";
  const tier = index + 1;
  
  slot.innerHTML = `
      <div class="inventory-item-icon">🔒</div>
      <div class="unlock-cost">
          <span>🎨 ${formatNumber(cost.red)}</span>
      </div>
  `;
  
  slot.onclick = () => {
      if (player.dye.red >= cost.red &&
          player.dye.blue >= cost.blue &&
          player.dye.yellow >= cost.yellow) {
          player.dye.red -= cost.red;
          player.dye.blue -= cost.blue;
          player.dye.yellow -= cost.yellow;
          player.inventorySlots++; // Increment unlocked slots
          SETTINGS.saveGame(); // Save progress
          slot.className = "inventory-slot";
          slot.innerHTML = '<div class="inventory-item-icon">+</div>';
          this.updateCurrencyBar();
          this.notify(`Unlocked Tier ${tier} inventory slot!`, false);
      } else {
          this.notify("Not enough dye to unlock this slot!", true);
      }
  };
  
  // Add tooltip to show exact values
  slot.title = `Unlock Cost:\n🔴 ${cost.red.toLocaleString()}\n🔵 ${cost.blue.toLocaleString()}\n🟡 ${cost.yellow.toLocaleString()}`;
  
  inventoryContent.appendChild(slot);
});
},

showItemDetails: function(item) {
  // Show a modal or tooltip with detailed item information
  this.notify(`${item.name}\n${item.description}`, false);
},

calculateInventoryEffects: function() {
  // Calculate and return array of active effect descriptions
  const effects = [];
  for (const item of player.inventory) {
    if (item.effects) {
      for (const effect of item.effects) {
        effects.push(`${effect.description}: ${effect.value}${effect.unit || '%'}`);
      }
    }
  }
  return effects;
},

    saveSettings: function () {
      localStorage.setItem("pxjUISettings", JSON.stringify(this.settings))
    },

    setupEventListeners: function () {
      const navButtons = {
        "profile-btn": () => this.showProfile(),
        "upgrade-btn": () => this.showSkillChoice(player.getRandomSkills(3)),
        "shop-btn": () => {
          SHOP.renderShop()
          this.togglePanel("shop-panel")
        },
        "prestige-btn": () => this.showPrestige(),
        "collection-btn": () => {
          COLLECTION.renderCollection()
          this.togglePanel("collection-panel")
        },
        "leaderboard-btn": () => this.showLeaderboard(),
        "settings-icon": () => this.togglePanel("settings-panel"),
      }

      for (const [id, handler] of Object.entries(navButtons)) {
        const element = document.getElementById(id)
        if (element) {
          element.addEventListener("click", handler)
        }
      }

      const confirmPrestige = document.getElementById("confirm-prestige-btn")
      if (confirmPrestige) {
        confirmPrestige.addEventListener("click", () => {
          const gained = player.prestige()
          this.notify(`Prestiged! Gained ${gained.toFixed(1)} points`)
          this.togglePanel("prestige-panel")
        })
      }

      const claimReward = document.getElementById("claim-reward")
      if (claimReward) {
        claimReward.addEventListener("click", () => {
          if (DAILY_REWARDS.claimReward()) {
            DAILY_REWARDS.renderCalendar()
          }
        })
      }

          // Add quick skill access listener
    const quickSkillAccess = document.querySelector('.quick-skill-access');
    if (quickSkillAccess) {
        quickSkillAccess.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent shop panel from opening
            const skills = player.getRandomSkills(3);
            this.showSkillChoice(skills);
        });
    }

      document.querySelectorAll(".panel-close").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          const panel = closeBtn.closest(".panel")
          panel.classList.remove("active")
          const btnId = panel.id.replace("-panel", "-btn")
          const btn = document.getElementById(btnId)
          if (btn) btn.classList.remove("active")
        })
      })

      // Wallet buttons
      const walletConnectBtn = document.getElementById("wallet-connect-btn")
      const walletLogoutBtn = document.getElementById("wallet-logout-btn")
      if (walletConnectBtn && typeof WALLET !== "undefined") {
        walletConnectBtn.addEventListener("click", () => WALLET.login())
      }
      if (walletLogoutBtn && typeof WALLET !== "undefined") {
        walletLogoutBtn.addEventListener("click", () => WALLET.logout())
      }

      // Profile tabs navigation
      document.querySelectorAll(".profile-tab").forEach((tab) => {
        tab.addEventListener("click", (e) => {
          const tabId = e.target.dataset.tab

          // Update active tab
          document.querySelectorAll(".profile-tab").forEach((t) => {
            t.classList.toggle("active", t === e.target)
          })

          // Update active content
          document.querySelectorAll(".profile-tab-content").forEach((content) => {
            content.classList.toggle("active", content.id === tabId)
          })
        })
      })

      document.getElementById("inventory-btn").addEventListener("click", () => {
        this.togglePanel("inventory-panel");
        this.renderInventory();  // Make sure to render inventory when opening the panel
    })

        // Prestige tabs navigation
  document.querySelectorAll(".prestige-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      const tabId = e.target.dataset.tab

      // Update active tab
      document.querySelectorAll(".prestige-tab").forEach((t) => {
        t.classList.toggle("active", t === e.target)
      })

      // Update active content
      document.querySelectorAll(".prestige-tab-content").forEach((content) => {
        content.classList.toggle("active", content.id === tabId)
      })
    })
  })

      // Always show buffs setting
      const alwaysShowBuffs = document.getElementById("always-show-buffs")
      if (alwaysShowBuffs) {
        alwaysShowBuffs.checked = this.settings.alwaysShowBuffs || false
        alwaysShowBuffs.addEventListener("change", (e) => {
          this.settings.alwaysShowBuffs = e.target.checked
          this.saveSettings()

            // Update UI to reflect the change
  this.updateSettingsUI();

          if (e.target.checked) {
            document.getElementById("active-boosters").classList.add("always-show")
          } else {
            document.getElementById("active-boosters").classList.remove("always-show")
          }
        })
      }
    },

    spawnTapParticles: (x, y) => {
      if (typeof PARTICLES !== "undefined") {
        PARTICLES.createTapParticles(x, y, enemy.current ? enemy.current.color : null)
      } else {
        console.warn("PARTICLES is not defined. Ensure it is loaded before ui.js.")
      }
    },
  }