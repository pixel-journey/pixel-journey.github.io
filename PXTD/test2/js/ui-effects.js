// ui-effects.js - Optimized version

// Optimized particle system with performance tiers
function createParticles(x, y, count, color, size, duration) {
  // Early return if graphics are off, but still trigger minimal visual feedback
  if (gameState.graphicsMode === "off") {
    // Instead of no particles, create a single flash for minimal feedback
    const flash = document.createElement("div")
    flash.className = "minimal-flash"
    flash.style.left = `${x - 10}px`
    flash.style.top = `${y - 10}px`
    flash.style.backgroundColor = color
    document.body.appendChild(flash)
    setTimeout(() => {
      if (flash.parentNode) flash.parentNode.removeChild(flash)
    }, 200)
    return
  }

  // Reduce particles for low graphics mode
  if (gameState.graphicsMode === "low") {
    count = Math.max(3, Math.floor(count / 3)) // Ensure at least 3 particles
    size = Math.max(2, size - 1) // Slightly smaller particles
    duration = Math.min(duration, 0.5) // Shorter duration
  }

  // Use requestAnimationFrame for smoother animation
  const startTime = performance.now()
  const particles = []

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.backgroundColor = color

    // More efficient positioning with transform instead of left/top
    const randomX = Math.random() * 20 - 10
    const randomY = Math.random() * 20 - 10
    particle.style.transform = `translate(${x + randomX - size / 2}px, ${y + randomY - size / 2}px)`

    // Add velocity for more dynamic movement
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 2 + 1
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    particles.push({
      element: particle,
      vx,
      vy,
      x: x + randomX - size / 2,
      y: y + randomY - size / 2,
      opacity: 1,
    })

    document.body.appendChild(particle)
  }

  // Animate particles with requestAnimationFrame for better performance
  function animateParticles(timestamp) {
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / (duration * 1000), 1)

    if (progress < 1) {
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.opacity = 1 - progress
        p.element.style.transform = `translate(${p.x}px, ${p.y}px)`
        p.element.style.opacity = p.opacity
      })
      requestAnimationFrame(animateParticles)
    } else {
      // Clean up particles
      particles.forEach((p) => {
        if (p.element.parentNode) p.element.parentNode.removeChild(p.element)
      })
    }
  }

  requestAnimationFrame(animateParticles)
}

// Show credits popup with improved performance
function showCreditsPop(x, y, amount) {
  // Skip animation in "off" mode but still show the value
  if (gameState.graphicsMode === "off") {
      updateUI();
      return;
    }
    const popup = document.createElement("div");
    popup.className = "credit-pop";
    popup.textContent = `+${amount}`;
    popup.style.left = `${x}px`; // Use screen coordinates
    popup.style.top = `${y}px`;
    document.body.appendChild(popup);

  // Use transform for better performance
  popup.style.transform = `translate(${x}px, ${y}px)`
  document.body.appendChild(popup)

  // Use a single timeout instead of animation when in low graphics mode
  if (gameState.graphicsMode === "low") {
    setTimeout(() => {
      if (popup.parentNode) popup.parentNode.removeChild(popup)
    }, 800)
    return
  }

  // Full animation for high graphics mode
  setTimeout(() => {
    if (popup.parentNode) popup.parentNode.removeChild(popup)
  }, 1500)
}

// Show wave announcement with optimized animations
function showWaveAnnouncement(wave, specialMessage) {
  const announcement = document.getElementById("wave-announcement")
  if (!announcement) return

  const waveTitle = announcement.querySelector("h2")
  const waveMessage = announcement.querySelector("p")

  if (waveTitle) waveTitle.textContent = `Wave ${wave}`

  if (waveMessage) {
    if (specialMessage) waveMessage.textContent = specialMessage
    else if (wave % 5 === 0) waveMessage.textContent = "BOSS WAVE! Prepare for tank enemies!"
    else if (wave % 3 === 0) waveMessage.textContent = "Fast enemies incoming!"
    else waveMessage.textContent = "Prepare your defenses!"
  }

  // Always show announcement regardless of graphics mode for gameplay clarity
  announcement.style.display = "block"

  // Simplified animation for low graphics mode
  if (gameState.graphicsMode === "low") {
    announcement.style.animation = "none"
    announcement.style.opacity = "1"
    setTimeout(() => {
      announcement.style.opacity = "0"
      setTimeout(() => {
        announcement.style.display = "none"
      }, 300)
    }, 2000)
  } else if (gameState.graphicsMode === "off") {
    // Even simpler for "off" mode
    setTimeout(() => {
      announcement.style.display = "none"
    }, 2000)
  } else {
    // Full animation for high graphics mode
    announcement.style.animation = "waveAnnounce 3s ease-in-out forwards"
    setTimeout(() => {
      announcement.style.display = "none"
    }, 3000)
  }
}

// Enhanced notification function with graphics mode awareness
function showEnhancedNotification(message, type = "info") {
  // Always show notifications regardless of graphics mode (gameplay important)
  const notification = document.createElement("div")
  notification.className = `game-notification ${type}`

  let title = "Information"
  if (type === "success") title = "Success"
  if (type === "warning") title = "Warning"
  if (type === "error") title = "Error"

  notification.innerHTML = `
    <div class="title">${title}</div>
    <div class="message">${message}</div>
  `

  document.body.appendChild(notification)

  // Simplified animation for low graphics mode
  if (gameState.graphicsMode === "low") {
    notification.style.animation = "none"
    notification.style.opacity = "1"
    notification.style.transform = "translateX(0)"
    setTimeout(() => {
      notification.style.opacity = "0"
      setTimeout(() => {
        if (notification.parentNode) notification.parentNode.removeChild(notification)
      }, 300)
    }, 2700)
  } else if (gameState.graphicsMode === "off") {
    // Even simpler for "off" mode
    setTimeout(() => {
      if (notification.parentNode) notification.parentNode.removeChild(notification)
    }, 3000)
  } else {
    // Full animation for high graphics mode
    setTimeout(() => {
      if (notification.parentNode) notification.parentNode.removeChild(notification)
    }, 3000)
  }
}

// Update wave progress bar with optimized rendering
function updateWaveProgress(current, total) {
  const progressBar = document.getElementById("wave-progress-fill")
  if (!progressBar) return

  const percentage = (current / total) * 100

  // Use requestAnimationFrame for smoother updates
  requestAnimationFrame(() => {
    progressBar.setAttribute("width", `${percentage}%`)
  })
}

// Tower attack animation with graphics mode awareness
function animateTowerAttack(tower) {
  if (!tower || !tower.element) return

  // Always show some indication of attack, even in "off" mode
  if (gameState.graphicsMode === "off") {
    // Simple color flash for minimal feedback
    const originalFill = tower.element.querySelector("rect").getAttribute("fill")
    tower.element.querySelector("rect").setAttribute("fill", "#ffffff")
    setTimeout(() => {
      tower.element.querySelector("rect").setAttribute("fill", originalFill)
    }, 100)
    return
  }

  // Full animation for other modes
  tower.element.classList.add("tower-attack")
  setTimeout(() => {
    tower.element.classList.remove("tower-attack")
  }, 300)
}

// Enemy death animation with performance tiers
function animateEnemyDeath(enemy) {
  if (!enemy || !enemy.element) return

  // Always show some indication of death, even in "off" mode
  if (gameState.graphicsMode === "off") {
    // Simple fade out
    enemy.element.style.opacity = "0"
    setTimeout(() => {
      if (enemy.element.parentNode) enemy.element.parentNode.removeChild(enemy.element)
    }, 200)
    return
  }

  // Full animation for other modes
  enemy.element.classList.add("enemy-death")

  if (typeof enemy.x !== "undefined" && typeof enemy.y !== "undefined") {
    const color =
      enemy.type === "basic"
        ? "#00ff00"
        : enemy.type === "fast"
          ? "#ffff00"
          : enemy.type === "tank"
            ? "#ff0000"
            : "#ffffff"

    // Adjust particle count based on graphics mode
    const particleCount = gameState.graphicsMode === "high" ? 10 : 5
    createParticles(enemy.x, enemy.y, particleCount, color, 5, 0.5)
  }
}

// Initialize UI effects
window.addEventListener("load", () => {
  // Add minimal-flash style to document
  const style = document.createElement("style")
  style.textContent = `
    .minimal-flash {
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      opacity: 0.7;
      pointer-events: none;
      z-index: 100;
      animation: minimalFlash 0.2s forwards;
    }

    @keyframes minimalFlash {
      0% { transform: scale(0.5); opacity: 0.7; }
      100% { transform: scale(1.2); opacity: 0; }
    }
  `
  document.head.appendChild(style)
})

// Enhanced tower placement function with optimized effects
function enhancedPlaceTower(gridX, gridY, type, cost) {
  const tower = new Tower(type, gridX, gridY, gameState.towerUpgrades[type])
  gameState.towers.push(tower)

  gameState.credits -= cost
  gameState.totalCredits -= cost

  // playSound("towerPlace")
  const svgRect = svg.getBoundingClientRect()
  const x = ((gridX + 25) / 500) * svgRect.width + svgRect.left
  const y = ((gridY + 25) / 500) * svgRect.height + svgRect.top

  // Adjust particle count based on graphics mode
  const particleCount = gameState.graphicsMode === "high" ? 15 : gameState.graphicsMode === "low" ? 7 : 0
  if (particleCount > 0) {
    createParticles(x, y, particleCount, CONFIG.towers[type].color, 5, 1)
  }

  return tower
}
