const PARTICLES = {
  settings: {
    enabled: true,
    tapParticles: true,
    backgroundParticles: true,
    maxParticles: 100,
  },

  init: function () {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("pxjParticleSettings")
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) }
    }

    if (this.settings.backgroundParticles) {
      this.initBackgroundParticles()
    }
  },

  initBackgroundParticles: function () {
    // Create canvas for background particles
    const canvas = document.createElement("canvas")
    canvas.id = "background-particles"
    canvas.style.position = "absolute"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "1"
    document.getElementById("game-wrapper").appendChild(canvas)

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize particles
    this.particles = []
    this.ctx = canvas.getContext("2d")

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      this.particles.push(this.createParticle())
    }

    // Start animation loop
    this.animateBackgroundParticles()

    // Handle window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  },

  createParticle: () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
    color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 0.3 + 0.1})`,
  }),

  animateBackgroundParticles: function () {
    if (!this.settings.enabled || !this.settings.backgroundParticles) return

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i]

      this.ctx.fillStyle = p.color
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      this.ctx.fill()

      // Update position
      p.x += p.speedX
      p.y += p.speedY

      // Wrap around edges
      if (p.x < 0) p.x = window.innerWidth
      if (p.x > window.innerWidth) p.x = 0
      if (p.y < 0) p.y = window.innerHeight
      if (p.y > window.innerHeight) p.y = 0
    }

    requestAnimationFrame(() => this.animateBackgroundParticles())
  },

  createTapParticles: function (x, y, color = null) {
    if (!this.settings.enabled || !this.settings.tapParticles) return

    // Create a container for particles at tap location
    const particleContainer = document.createElement("div")
    particleContainer.style.position = "absolute"
    particleContainer.style.left = x + "px"
    particleContainer.style.top = y + "px"
    particleContainer.style.pointerEvents = "none"
    particleContainer.style.zIndex = "20"
    document.body.appendChild(particleContainer)

    // Generate particles
    const particleCount = 15
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 5 + 2 + "px"
      particle.style.height = particle.style.width

      // Use color if provided, otherwise random color
      if (color) {
        particle.style.backgroundColor = color
      } else {
        const hue = Math.random() * 360
        particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`
      }

      particle.style.borderRadius = "50%"
      particle.style.opacity = "0.8"

      // Randomize initial position offset
      const offsetX = (Math.random() - 0.5) * 10
      const offsetY = (Math.random() - 0.5) * 10
      particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`

      particleContainer.appendChild(particle)

      // Animate particle
      const angle = Math.random() * 2 * Math.PI
      const distance = 30 + Math.random() * 50
      const duration = 500 + Math.random() * 500
      const moveX = Math.cos(angle) * distance
      const moveY = Math.sin(angle) * distance

      particle.animate(
        [
          { transform: `translate(${offsetX}px, ${offsetY}px)`, opacity: 0.8 },
          { transform: `translate(${moveX}px, ${moveY}px)`, opacity: 0 },
        ],
        {
          duration: duration,
          easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
        },
      ).onfinish = () => {
        particle.remove()
      }
    }

    // Clean up container after animation
    setTimeout(() => {
      particleContainer.remove()
    }, 1500)
  },

  createExplosion: function (x, y, color = null) {
    if (!this.settings.enabled) return

    // Create a container for explosion particles
    const particleContainer = document.createElement("div")
    particleContainer.style.position = "absolute"
    particleContainer.style.left = x + "px"
    particleContainer.style.top = y + "px"
    particleContainer.style.pointerEvents = "none"
    particleContainer.style.zIndex = "20"
    document.body.appendChild(particleContainer)

    // Generate particles
    const particleCount = 30
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.style.position = "absolute"
      particle.style.width = Math.random() * 8 + 3 + "px"
      particle.style.height = particle.style.width

      // Use color if provided, otherwise random color
      if (color) {
        particle.style.backgroundColor = color
      } else {
        const hue = Math.random() * 60 + 10 // Orange-yellow range
        particle.style.backgroundColor = `hsl(${hue}, 100%, 60%)`
      }

      particle.style.borderRadius = "50%"
      particle.style.opacity = "0.9"
      particle.style.boxShadow = `0 0 10px ${particle.style.backgroundColor}`

      particleContainer.appendChild(particle)

      // Animate particle
      const angle = Math.random() * 2 * Math.PI
      const distance = 50 + Math.random() * 100
      const duration = 800 + Math.random() * 700
      const moveX = Math.cos(angle) * distance
      const moveY = Math.sin(angle) * distance

      particle.animate(
        [
          { transform: "translate(0, 0)", opacity: 0.9 },
          { transform: `translate(${moveX}px, ${moveY}px)`, opacity: 0 },
        ],
        {
          duration: duration,
          easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
        },
      ).onfinish = () => {
        particle.remove()
      }
    }

    // Clean up container after animation
    setTimeout(() => {
      particleContainer.remove()
    }, 1500)
  },

  toggleParticles: function (enabled) {
    this.settings.enabled = enabled
    this.saveSettings()
  },

  saveSettings: function () {
    localStorage.setItem("pxjParticleSettings", JSON.stringify(this.settings))
  },
}
