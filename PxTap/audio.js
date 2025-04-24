const AUDIO = {
  sounds: {
    tap: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3',
      volume: 0.5
    },
    levelUp: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3',
      volume: 0.7
    },
    enemyDefeat: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-game-over-213.mp3',
      volume: 0.6
    },
    criticalHit: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-mechanical-bling-210.mp3',
      volume: 0.6
    },
    achievement: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
      volume: 0.7
    },
    purchase: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3',
      volume: 0.6
    },
    prestige: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3',
      volume: 0.8
    },
    backgroundMusic: {
      src: 'https://assets.mixkit.co/sfx/preview/mixkit-game-level-music-689.mp3',
      volume: 0.3
    }
  },

  elements: {},
  muted: false,
  musicVolume: 0.3,
  sfxVolume: 0.6,

  init: function() {
    // Load audio elements
    for (const [key, sound] of Object.entries(this.sounds)) {
      const audio = new Audio(sound.src);
      audio.volume = sound.volume;
      this.elements[key] = audio;
    }

    // Set up background music
    this.elements.backgroundMusic.loop = true;

    // Load settings from localStorage
    const savedSettings = localStorage.getItem('pxjAudioSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.muted = settings.muted;
      this.musicVolume = settings.musicVolume;
      this.sfxVolume = settings.sfxVolume;

      // Apply settings
      this.updateVolumes();
    }
  },

  play: function(soundKey) {
    if (this.muted || !this.elements[soundKey]) return;

    // For short sound effects, create a new audio element to allow overlapping sounds
    if (soundKey !== 'backgroundMusic') {
      const sound = this.elements[soundKey].cloneNode();
      sound.volume = this.sfxVolume;
      sound.play();
    } else {
      this.elements[soundKey].play();
    }
  },

  stopMusic: function() {
    if (this.elements.backgroundMusic) {
      this.elements.backgroundMusic.pause();
      this.elements.backgroundMusic.currentTime = 0;
    }
  },

  toggleMute: function() {
    this.muted = !this.muted;

    if (this.muted) {
      this.stopMusic();
    } else {
      this.play('backgroundMusic');
    }

    this.saveSettings();
  },

  setMusicVolume: function(volume) {
    this.musicVolume = volume;
    if (this.elements.backgroundMusic) {
      this.elements.backgroundMusic.volume = volume;
    }
    this.saveSettings();
  },

  setSfxVolume: function(volume) {
    this.sfxVolume = volume;
    this.saveSettings();
  },

  updateVolumes: function() {
    if (this.elements.backgroundMusic) {
      this.elements.backgroundMusic.volume = this.muted ? 0 : this.musicVolume;
    }

    // Update all SFX volumes
    for (const [key, element] of Object.entries(this.elements)) {
      if (key !== 'backgroundMusic') {
        element.volume = this.muted ? 0 : this.sfxVolume;
      }
    }
  },

  saveSettings: function() {
    const settings = {
      muted: this.muted,
      musicVolume: this.musicVolume,
      sfxVolume: this.sfxVolume
    };

    localStorage.setItem('pxjAudioSettings', JSON.stringify(settings));
  }
};
