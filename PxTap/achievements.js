const ACHIEVEMENTS = {
  list: [
    {
      id: "first_tap",
      name: "First Tap",
      description: "Tap your first ingredient",
      icon: "👆",
      unlocked: false,
      check: () => true, // Unlocked on first tap
    },
    {
      id: "reach_level_10",
      name: "Apprentice Tapper",
      description: "Reach level 10",
      icon: "🎓",
      unlocked: false,
      check: () => player.level >= 10,
    },
    {
      id: "reach_level_25",
      name: "Expert Tapper",
      description: "Reach level 25",
      icon: "🏆",
      unlocked: false,
      check: () => player.level >= 25,
    },
    {
      id: "reach_level_50",
      name: "Master Tapper",
      description: "Reach level 50",
      icon: "👑",
      unlocked: false,
      check: () => player.level >= 50,
    },
    {
      id: "reach_wave_100",
      name: "Wave Rider",
      description: "Reach wave 100",
      icon: "🌊",
      unlocked: false,
      check: () => gameState.wave >= 100,
    },
    {
      id: "collect_1000_red",
      name: "Red Collector",
      description: "Collect 1,000 red dye",
      icon: "🔴",
      unlocked: false,
      check: () => player.totalDye && player.totalDye.red >= 1000,
    },
    {
      id: "collect_1000_blue",
      name: "Blue Collector",
      description: "Collect 1,000 blue dye",
      icon: "🔵",
      unlocked: false,
      check: () => player.totalDye && player.totalDye.blue >= 1000,
    },
    {
      id: "collect_1000_yellow",
      name: "Yellow Collector",
      description: "Collect 1,000 yellow dye",
      icon: "🟡",
      unlocked: false,
      check: () => player.totalDye && player.totalDye.yellow >= 1000,
    },
    {
      id: "first_prestige",
      name: "Reborn",
      description: "Prestige for the first time",
      icon: "🌀",
      unlocked: false,
      check: () => player.prestigePoints > 0,
    },
    {
      id: "collection_25",
      name: "Collector",
      description: "Discover 25% of all ingredients",
      icon: "📚",
      unlocked: false,
      check: () => COLLECTION.getCompletionPercentage() >= 25,
    },
    {
      id: "collection_50",
      name: "Archivist",
      description: "Discover 50% of all ingredients",
      icon: "📖",
      unlocked: false,
      check: () => COLLECTION.getCompletionPercentage() >= 50,
    },
    {
      id: "collection_100",
      name: "Completionist",
      description: "Discover 100% of all ingredients",
      icon: "🏅",
      unlocked: false,
      check: () => COLLECTION.getCompletionPercentage() >= 100,
    },
    {
      id: "max_skill",
      name: "Skill Master",
      description: "Max out any skill",
      icon: "⚡",
      unlocked: false,
      check: () => {
        for (const skillId in player.skills) {
          const skill = SKILLS.find((s) => s.id === skillId)
          if (skill && player.skills[skillId] >= skill.maxLevel) {
            return true
          }
        }
        return false
      },
    },
  ],

  init: function () {
    // Load saved achievements
    const savedAchievements = localStorage.getItem("pxjAchievements")
    if (savedAchievements) {
      const unlocked = JSON.parse(savedAchievements)
      unlocked.forEach((id) => {
        const achievement = this.list.find((a) => a.id === id)
        if (achievement) {
          achievement.unlocked = true
        }
      })
    }
  },

  check: function () {
    let newUnlocks = false

    this.list.forEach((achievement) => {
      if (!achievement.unlocked && achievement.check()) {
        achievement.unlocked = true
        this.showNotification(achievement)
        newUnlocks = true
      }
    })

    if (newUnlocks) {
      this.save()
    }
  },

  checkCollection: function () {
    // Check collection-related achievements
    const collectionAchievements = this.list.filter((a) => a.id.startsWith("collection_") && !a.unlocked)

    let newUnlocks = false

    collectionAchievements.forEach((achievement) => {
      if (achievement.check()) {
        achievement.unlocked = true
        this.showNotification(achievement)
        newUnlocks = true
      }
    })

    if (newUnlocks) {
      this.save()
    }
  },

  showNotification: (achievement) => {
    const notification = document.getElementById("achievement-notification")
    const icon = document.getElementById("achievement-icon")
    const title = document.getElementById("achievement-title")
    const description = document.getElementById("achievement-description")

    icon.textContent = achievement.icon
    title.textContent = achievement.name
    description.textContent = achievement.description

    notification.classList.add("show")

    // Play achievement sound
    AUDIO.play("achievement")

    // Hide notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show")
    }, 5000)
  },

  getUnlockedCount: function () {
    return this.list.filter((a) => a.unlocked).length
  },

  getTotalCount: function () {
    return this.list.length
  },

  renderAchievements: function () {
    const content = document.getElementById("achievements-info")
    if (!content) return

    content.innerHTML = `
      <h3>Achievements (${this.getUnlockedCount()}/${this.getTotalCount()})</h3>
      <div class="achievements-grid"></div>
    `

    const grid = content.querySelector(".achievements-grid")

    // Create achievement elements
    this.list.forEach((achievement) => {
      const achievementElement = document.createElement("div")
      achievementElement.className = `achievement-item ${achievement.unlocked ? "unlocked" : "locked"}`

      if (achievement.unlocked) {
        achievementElement.innerHTML = `
          <div class="achievement-icon">${achievement.icon}</div>
          <div class="achievement-info">
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
          </div>
        `
      } else {
        achievementElement.innerHTML = `
          <div class="achievement-icon">?</div>
          <div class="achievement-info">

          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-description">${achievement.description}</div>
          </div>
        `
      }

      grid.appendChild(achievementElement)
    })

    // If no achievements, show a message
    if (this.list.length === 0) {
      grid.innerHTML = `<p>No achievements available yet. Keep playing to unlock achievements!</p>`
    }
  },

  save: function () {
    const unlocked = this.list.filter((a) => a.unlocked).map((a) => a.id)
    localStorage.setItem("pxjAchievements", JSON.stringify(unlocked))
  },
}
