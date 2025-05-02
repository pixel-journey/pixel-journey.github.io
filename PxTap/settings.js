const SETTINGS = {
  autoSaveInterval: 30, // seconds
  autoSaveTimer: null,

  init: function () {
    const savedSettings = localStorage.getItem("pxjSettings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      this.autoSaveInterval = settings.autoSaveInterval || 30
    }
    this.initUI()
    this.startAutoSave()
    document.getElementById("settings-icon").addEventListener("click", () => {
      ui.togglePanel("settings-panel")
    })
  },

  initUI: function () {
    document.getElementById("music-volume").value = AUDIO.musicVolume * 100
    document.getElementById("sfx-volume").value = AUDIO.sfxVolume * 100
    document.getElementById("mute-audio").checked = AUDIO.muted
    document.getElementById("particle-effects").checked = PARTICLES.settings.enabled
    document.getElementById("damage-numbers-setting").checked = ui.settings.showDamageNumbers
    document.getElementById("auto-save").value = this.autoSaveInterval

    document.getElementById("music-volume").addEventListener("input", (e) => {
      const volume = Number.parseInt(e.target.value) / 100
      AUDIO.setMusicVolume(volume)
    })

    document.getElementById("sfx-volume").addEventListener("input", (e) => {
      const volume = Number.parseInt(e.target.value) / 100
      AUDIO.setSfxVolume(volume)
    })

    document.getElementById("mute-audio").addEventListener("change", (e) => {
      AUDIO.toggleMute()
      e.target.checked = AUDIO.muted
    })

    document.getElementById("particle-effects").addEventListener("change", (e) => {
      PARTICLES.toggleParticles(e.target.checked)
    })

    document.getElementById("damage-numbers-setting").addEventListener("change", (e) => {
      ui.settings.showDamageNumbers = e.target.checked
      ui.saveSettings()
    })

    document.getElementById("auto-save").addEventListener("change", (e) => {
      const interval = Number.parseInt(e.target.value)
      if (interval >= 10 && interval <= 300) {
        this.autoSaveInterval = interval
        this.saveSettings()
        this.startAutoSave()
      }
    })
        
        document.getElementById("auto-select-skills").addEventListener("change", (e) => {
          ui.autoSelectSkills = e.target.checked
          this.saveSettings()
        })

    document.getElementById("reset-game").addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all game progress? This cannot be undone!")) {
        this.resetGame()
      }
    })
  },

  startAutoSave: function () {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer)
    }
    this.autoSaveTimer = setInterval(() => {
      this.saveGame()
    }, this.autoSaveInterval * 1000)
  },

  saveGame: () => {
    player.save()
    localStorage.setItem("pxjWave", gameState.wave)
    ui.notify("Game saved", false)
  },

  resetGame: () => {
    const audioSettings = localStorage.getItem("pxjAudioSettings")
    const particleSettings = localStorage.getItem("pxjParticleSettings")
    const uiSettings = localStorage.getItem("pxjUISettings")
    const settings = localStorage.getItem("pxjSettings")
    const tutorial = localStorage.getItem("pxjTutorial")
    localStorage.clear()
    if (audioSettings) localStorage.setItem("pxjAudioSettings", audioSettings)
    if (particleSettings) localStorage.setItem("pxjParticleSettings", particleSettings)
    if (uiSettings) localStorage.setItem("pxjUISettings", uiSettings)
    if (settings) localStorage.setItem("pxjSettings", settings)
    if (tutorial) localStorage.setItem("pxjTutorial", tutorial)
    location.reload()
  },

  saveSettings: function () {
    localStorage.setItem(
      "pxjSettings",
      JSON.stringify({
        autoSaveInterval: this.autoSaveInterval,
      }),
    )
  },
}
