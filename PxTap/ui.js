var ui = {
  settings: {
    showDamageNumbers: true,
    alwaysShowBuffs: false,
  },
  lastHealthPct: null, // Track last health percentage

  init: function () {
    console.log("ui.init called")
    this.updateCurrencyBar()
    this.updateXPBar()
    this.updateLevelTracker()
    this.updateWaveCounter()
    this.setupEventListeners()

    // Load UI settings
    const savedSettings = localStorage.getItem("pxjUISettings")
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) }
    }

    // Initialize settings UI
    document.getElementById("damage-numbers-setting").checked = this.settings.showDamageNumbers
    document.getElementById("always-show-buffs").checked = this.settings.alwaysShowBuffs

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
      console.log('ui.updateHealthBar called');
      const healthFill = document.getElementById('health-fill');
      const enemyName = document.getElementById('enemy-name');
      const enemyHP = document.getElementById('enemy-hp');
      const waveCounter = document.getElementById('wave-counter');
      if (!enemy.current) {
        healthFill.style.width = '0%';
        enemyName.textContent = 'No Ingredient';
        enemyHP.textContent = '0 / 0';
        waveCounter.textContent = `Wave: ${gameState.wave}`;
        return;
      }
      const healthPercent = (enemy.current.hp / enemy.current.maxHp) * 100;
      healthFill.style.width = `${healthPercent}%`;
      enemyName.textContent = `${enemy.current.color.charAt(0).toUpperCase() + enemy.current.color.slice(1)} Tier ${enemy.current.tier}`.replace("_", " ");
      enemyHP.textContent = `${Math.round(enemy.current.hp)} / ${enemy.current.maxHp}`;
      waveCounter.textContent = `Wave: ${gameState.wave}`;
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
      } else if (panelId === 'collection-panel') {
        COLLECTION.renderCollection();
      } else if (panelId === 'profile-panel') {
        this.renderProfile();
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
    avatarSection.innerHTML = `
      <div class="profile-avatar">🧙</div>
      <p style="text-align: center; color: var(--accent-color);">Avatar (NFT customization coming soon)</p>
    `

        // Add wallet connect button if not logged in
        if (!WALLET.userAccount) {
          const walletBtn = document.createElement("button")
          walletBtn.className = "wallet-connect-profile"
          walletBtn.textContent = "Connect WAX Wallet"
          walletBtn.addEventListener("click", () => WALLET.login())
          avatarSection.appendChild(walletBtn)
        }

        profileContent.appendChild(avatarSection)

        // Stats section
    const statsSection = document.createElement("div")
    statsSection.innerHTML = "<h3>Player Stats</h3>"
    const statsList = document.createElement("ul")
    statsList.innerHTML = `
      <li>Tap Power: ${(player.calculateTapDamage() / player.tapDamage).toFixed(1)}x</li>
      <li>XP Bonus: ${((player.skills.bonus_xp ? SKILLS.find((s) => s.id === "bonus_xp").getEffect(player.skills.bonus_xp) : 1) * 100).toFixed(1)}%</li>
      <li>Red Dye Bonus: ${((player.skills.dye_boost_red ? SKILLS.find((s) => s.id === "dye_boost_red").getEffect(player.skills.dye_boost_red) : 1) * 100).toFixed(1)}%</li>
      <li>Blue Dye Bonus: ${((player.skills.dye_boost_blue ? SKILLS.find((s) => s.id === "dye_boost_blue").getEffect(player.skills.dye_boost_blue) : 1) * 100).toFixed(1)}%</li>
      <li>Yellow Dye Bonus: ${((player.skills.dye_boost_yellow ? SKILLS.find((s) => s.id === "dye_boost_yellow").getEffect(player.skills.dye_boost_yellow) : 1) * 100).toFixed(1)}%</li>
      <li>Critical Chance: ${(player.skills.crit_chance ? SKILLS.find((s) => s.id === "crit_chance").getEffect(player.skills.crit_chance) * 100 : 0).toFixed(1)}%</li>
      <li>Critical Multiplier: ${(player.skills.crit_multiplier ? SKILLS.find((s) => s.id === "crit_multiplier").getEffect(player.skills.crit_multiplier) : 1).toFixed(1)}x</li>
      <li>Prestige Bonus: ${(player.prestigePoints * 1).toFixed(1)}%</li>
      <li>Booster Duration: ${((player.skills.booster_duration ? SKILLS.find((s) => s.id === "booster_duration").getEffect(player.skills.booster_duration) : 1) * 100).toFixed(1)}%</li>
      <li>Shop Booster Duration: ${((player.skills.shop_booster_duration ? SKILLS.find((s) => s.id === "shop_booster_duration").getEffect(player.skills.shop_booster_duration) : 1) * 100).toFixed(1)}%</li>
      <li>NFT Bonus: ${(player.nftBonus || 0).toFixed(1)}%</li>
    `
    statsSection.appendChild(statsList)
    profileContent.appendChild(statsSection)

    // Skills section
    const skillsSection = document.createElement("div")
    skillsSection.innerHTML = "<h3>Skills</h3>"
    const skillsList = document.createElement("ul")
    for (const skillId in player.skills) {
      if (player.skills.hasOwnProperty(skillId)) {
        const skill = SKILLS.find((s) => s.id === skillId)
                if (skill) {
        const li = document.createElement("li")
        li.textContent = skill.name + " - Level " + player.skills[skillId]
        skillsList.appendChild(li)
                }
      }
    }
    if (Object.keys(player.skills).length === 0) {
      skillsList.innerHTML = "<li>No skills unlocked yet.</li>"
    }
    skillsSection.appendChild(skillsList)
    profileContent.appendChild(skillsSection)

    // NFT section
    const nftSection = document.createElement("div")
    nftSection.innerHTML = "<h3>NFT Boosters</h3>"
    if (WALLET.userAccount) {
      nftSection.innerHTML += `<p>Connected as: ${WALLET.userAccount}</p>`
      WALLET.fetchUserAssets(WALLET.userAccount).then((assets) => {
        const templateCounts = WALLET.countUserTemplates(assets)
        const nftList = document.createElement("ul")
        WALLET.templates.forEach((template) => {
          if (templateCounts[template.id]) {
            const li = document.createElement("li")
            li.textContent = `${template.name} (x${templateCounts[template.id] || 1}) - ${template.bonusEffect.toFixed(1)}% Bonus Each`
            nftList.appendChild(li)
          }
        })
        if (Object.keys(templateCounts).length === 0) {
          nftList.innerHTML = "<li>No NFTs owned in PixelJourney collection.</li>"
        }
        nftSection.appendChild(nftList)
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

  showPrestige: function () {
    const content = document.getElementById("prestige-content")
    content.innerHTML = ""
    const currentSection = document.createElement("div")
    currentSection.innerHTML =
      "<h3>Current Prestige</h3>" +
      "<p>Prestige Level: " +
      player.prestigePoints.toFixed(1) +
      "</p>" +
      "<p>Current Damage Boost: " +
      (player.prestigePoints * 1).toFixed(1) +
      "%</p>"
    content.appendChild(currentSection)
    const prestigeGainMultiplier = player.skills.prestige_gain
      ? SKILLS.find((s) => s.id === "prestige_gain").getEffect(player.skills.prestige_gain)
      : 1
    const gained = Math.floor((player.level / 10) * prestigeGainMultiplier)
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
    content.appendChild(potentialSection)
    this.togglePanel("prestige-panel")
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
    el.style.left = (options.x || window.innerWidth / 2) + "px"
    el.style.top = (options.y || window.innerHeight / 2) + "px"
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
    const earnedPoints = Math.floor((player.level / 10) * prestigeGainMultiplier)
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
      document.querySelectorAll(".panel"),
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

  renderBoosters: () => {
    console.log('ui.renderBoosters called');
    const boostersContainer = document.getElementById("active-boosters");
    if (!boostersContainer) {
      console.warn('Active boosters container not found');
      return;
    }

    boostersContainer.innerHTML = "";

    const showEmptyBoosters = ui.settings.alwaysShowBuffs || false;

    const allBoosterTypes = SHOP?.boosters
      ?.filter((b) => !b.special)
      ?.map((b) => b.id) || [];

    console.log('Available booster types:', allBoosterTypes);

    const activeBoosterMap = {};
    if (Array.isArray(player.activeBoosters)) {
      player.activeBoosters.forEach((booster) => {
        activeBoosterMap[booster.key] = booster;
      });
    } else {
      console.warn('player.activeBoosters is not an array:', player.activeBoosters);
    }

    console.log('Active boosters map:', activeBoosterMap);

    allBoosterTypes.forEach((boosterId) => {
      const boosterDef = SHOP?.boosters?.find((b) => b.id === boosterId);
      if (!boosterDef) {
        console.warn(`Booster definition not found for ID: ${boosterId}`);
        return;
      }

      const activeBooster = activeBoosterMap[boosterId];

      if (activeBooster || showEmptyBoosters) {
        const div = document.createElement("div");

        let timeDisplay = "0s";
        if (activeBooster) {
          const now = Date.now();
          const remaining = Number.isFinite(activeBooster.expires) && Number.isFinite(now)
            ? Math.max(0, Math.ceil((activeBooster.expires - now) / 1000))
            : 0;

          console.log(`Timer calculation for ${boosterId}: expires=${activeBooster.expires}, now=${now}, remaining=${remaining}`);

          if (Number.isNaN(remaining)) {
            console.warn(`Invalid remaining time for ${boosterId}, setting to 0`);
            timeDisplay = "0s";
          } else if (remaining >= 60) {
            timeDisplay = `${Math.floor(remaining / 60)}m ${remaining % 60}s`;
          } else {
            timeDisplay = `${remaining}s`;
          }

          div.className = "active-booster";

          if (remaining <= 5 && remaining > 0) {
            div.classList.add("expiring");
          }
        } else {
          div.className = "empty-booster";
        }

        div.dataset.boosterId = boosterId;

        div.innerHTML = `
          <span class="booster-icon">${boosterDef.icon}</span>
          <span class="booster-name">${boosterDef.name}</span>
          <span class="booster-timer">${timeDisplay}</span>
        `;

        div.title = boosterDef.description;

        boostersContainer.appendChild(div);
      }
    });

    console.log('Buff-bar DOM after render:', boostersContainer.innerHTML);

    SHOP.initBoosterListeners();

    boostersContainer.style.display = 'none';
    boostersContainer.offsetHeight;
    boostersContainer.style.display = 'flex';
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

      const tutorialPrev = document.getElementById("tutorial-prev")
      const tutorialNext = document.getElementById("tutorial-next")
      if (tutorialPrev) tutorialPrev.addEventListener("click", () => TUTORIAL.prevStep())
      if (tutorialNext) tutorialNext.addEventListener("click", () => TUTORIAL.nextStep())

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

      // Always show buffs setting
      const alwaysShowBuffs = document.getElementById("always-show-buffs")
      if (alwaysShowBuffs) {
        alwaysShowBuffs.checked = this.settings.alwaysShowBuffs || false
        alwaysShowBuffs.addEventListener("change", (e) => {
          this.settings.alwaysShowBuffs = e.target.checked
          this.saveSettings()

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
