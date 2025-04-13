
// tower.js - Add activity indicator for "Graphics off" mode
class Tower {
  constructor(type, x, y, upgrades) {
    this.type = type
    this.x = x + 25 // Center in 50x50 grid
    this.y = y + 25
    this.baseRange = CONFIG.towers[type].range
    this.baseDps = CONFIG.towers[type].dps
    this.fireInterval = (this.type === "fire" || this.type === "ice" ? 100 : 500) / (1 + gameState.globalUpgrades.speed.rank * 0.05);
    this.range = this.baseRange * (1 + gameState.globalUpgrades.range.rank * 0.05);
    this.dps = this.baseDps * (1 + gameState.globalUpgrades.damage.rank * 0.05);
    this.target = null
    this.element = null
    this.rangeCircle = null
    this.upgradeLevel = 0
    this.baseSize = 22 // 25% of 50x50 grid
    this.size = this.baseSize
    this.maxSize = 49 // Cap at grid size
    this.lastShot = 0
    this.powerAuraApplied = false // Track Power Aura application
    this.isActive = false // Track if tower is currently attacking
    this.activityIndicator = null // Visual indicator for "Graphics off" mode
    this.targetingMode = "closest"; // Default

    // Special abilities from upgrades or defaults
    this.powerAura = upgrades ? upgrades.powerAura : false
    this.splinters = upgrades ? upgrades.splinters : false
    this.ricochet = type === "lightning" && upgrades ? upgrades.ricochet : false
    this.burn = upgrades ? upgrades.burn : false
    this.freeze = upgrades ? upgrades.freeze : false
    this.splash = upgrades ? upgrades.splash : false
    this.chain = upgrades ? upgrades.chain : false
    this.stun = upgrades ? upgrades.stun : false
    this.shock = upgrades ? upgrades.shock : false

    this.createElement(x, y)
  }

  createElement(x, y) {
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "g")
    const base = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    const offset = (50 - this.size) / 2 // Center in 50x50 grid
    base.setAttribute("x", x + offset)
    base.setAttribute("y", y + offset)
    base.setAttribute("width", this.size)
    base.setAttribute("height", this.size)
    base.setAttribute("fill", CONFIG.towers[this.type].color)
    base.setAttribute("stroke", "#ffffff")
    base.setAttribute("stroke-width", "2")
    base.setAttribute("rx", "3")
    this.element.appendChild(base)

    // Tower-specific visuals
    if (this.type === "grass") {
      const top = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      top.setAttribute("cx", x + 25)
      top.setAttribute("cy", y + 25)
      top.setAttribute("r", this.size / 4)
      top.setAttribute("fill", "#ffffff")
      this.element.appendChild(top)
    } else if (this.type === "fire") {
      const top = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
      top.setAttribute(
        "points",
        `${x + 25},${y + offset + 5} ${x + offset + this.size - 5},${y + offset + this.size - 5} ${x + offset + 5},${y + offset + this.size - 5}`,
      )
      top.setAttribute("fill", "#ffcc00")
      this.element.appendChild(top)
    } else if (this.type === "water") {
      const top = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      top.setAttribute("cx", x + 25)
      top.setAttribute("cy", y + 25)
      top.setAttribute("r", this.size / 3)
      top.setAttribute("fill", "#00ffff")
      top.setAttribute("opacity", "0.7")
      this.element.appendChild(top)
    } else {
      const top = document.createElementNS("http://www.w3.org/2000/svg", "rect")
      top.setAttribute("x", x + offset + this.size / 4)
      top.setAttribute("y", y + offset + this.size / 4)
      top.setAttribute("width", this.size / 2)
      top.setAttribute("height", this.size / 2)
      top.setAttribute("fill", "#ffffff")
      this.element.appendChild(top)
    }

    // Add activity indicator for "Graphics off" mode
    this.activityIndicator = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    this.activityIndicator.setAttribute("cx", x + 25)
    this.activityIndicator.setAttribute("cy", y + offset - 5) // Position above tower
    this.activityIndicator.setAttribute("r", 3)
    this.activityIndicator.setAttribute("fill", "#ffffff")
    this.activityIndicator.setAttribute("opacity", "0") // Hidden by default
    this.element.appendChild(this.activityIndicator)

    this.updateGlow() // Apply initial glow
    svg.appendChild(this.element)

    // Range circle for visualization
    this.rangeCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    this.rangeCircle.setAttribute("cx", this.x)
    this.rangeCircle.setAttribute("cy", this.y)
    this.rangeCircle.setAttribute("r", this.range)
    this.rangeCircle.setAttribute("fill", "none")
    this.rangeCircle.setAttribute("stroke", CONFIG.towers[this.type].color)
    this.rangeCircle.setAttribute("stroke-width", "2")
    this.rangeCircle.setAttribute("stroke-opacity", "0.3")
    this.rangeCircle.setAttribute("opacity", gameState.showRange ? "1" : "0")
    svg.appendChild(this.rangeCircle)

    // Event listeners for upgrade menu
    this.element.addEventListener("click", (e) => {
      e.stopPropagation()
      this.showUpgradeMenu()
    })
    this.element.addEventListener("touchstart", (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.showUpgradeMenu()
    })
  }

  updateGlow() {
    // Skip glow effects in "off" mode for performance
    if (gameState.graphicsMode === "off") return

    const glowStrength = Math.min(this.upgradeLevel / 25, 1) * 5 // Scale glow up to 5 over 25 upgrades
    this.element.setAttribute("filter", `url(#glow-${this.type}-${this.x}-${this.y})`)
    let defs = svg.querySelector("defs")
    if (!defs) {
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")
      svg.appendChild(defs)
    }
    let filter = defs.querySelector(`#glow-${this.type}-${this.x}-${this.y}`)
    if (filter) defs.removeChild(filter)
    filter = document.createElementNS("http://www.w3.org/2000/svg", "filter")
    filter.setAttribute("id", `glow-${this.type}-${this.x}-${this.y}`)
    filter.setAttribute("x", "-50%")
    filter.setAttribute("y", "-50%")
    filter.setAttribute("width", "200%")
    filter.setAttribute("height", "200%")
    const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
    blur.setAttribute("stdDeviation", glowStrength.toString())
    blur.setAttribute("result", "blur")
    const composite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite")
    composite.setAttribute("in", "SourceGraphic")
    composite.setAttribute("in2", "blur")
    composite.setAttribute("operator", "over")
    filter.appendChild(blur)
    filter.appendChild(composite)
    defs.appendChild(filter)
  }

  updateRangeVisibility() {
    if (this.rangeCircle) this.rangeCircle.setAttribute("opacity", gameState.showRange ? "1" : "0")
  }

  updateSize() {
    this.size = Math.min(this.baseSize + (this.upgradeLevel * (this.maxSize - this.baseSize)) / 25, this.maxSize)
    const base = this.element.firstChild
    const offset = (50 - this.size) / 2
    base.setAttribute("x", this.x - 25 + offset)
    base.setAttribute("y", this.y - 25 + offset)
    base.setAttribute("width", this.size)
    base.setAttribute("height", this.size)
    this.rangeCircle.setAttribute("r", this.range)

    // Update activity indicator position
    if (this.activityIndicator) {
      this.activityIndicator.setAttribute("cy", this.y - 25 + offset - 5)
    }

    // Skip glow update in "off" mode
    if (gameState.graphicsMode !== "off") {
      this.updateGlow()
    }
  }

  // Show activity indicator for "Graphics off" mode
  showActivityFlash(duration = 300) {
    if (!this.activityIndicator) return

    // Always show activity in "off" mode, optional in other modes
    if (gameState.graphicsMode === "off" || this.isActive) {
      this.activityIndicator.setAttribute("opacity", "1")

      // Pulse animation for better visibility
      const startTime = performance.now()
      const animate = (timestamp) => {
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)

        if (progress < 1) {
          // Pulse effect
          const opacity = 1 - progress
          const scale = 1 + progress
          this.activityIndicator.setAttribute("opacity", opacity.toString())
          this.activityIndicator.setAttribute("r", (3 * scale).toString())
          requestAnimationFrame(animate)
        } else {
          this.activityIndicator.setAttribute("opacity", "0")
          this.activityIndicator.setAttribute("r", "3")
        }
      }

      requestAnimationFrame(animate)
    }
  }

    showUpgradeMenu() {
      const existingMenu = document.querySelector(".upgrade-menu");
      if (existingMenu) document.body.removeChild(existingMenu);

      const menu = document.createElement("div");
        menu.className = "upgrade-menu";
        if (!svg) {
          console.error("SVG element not found");
          return;
        }
        const svgRect = svg.getBoundingClientRect();
        const towerX = this.x * (svgRect.width / 500);
        const towerY = this.y * (svgRect.height / 500);
        menu.style.left = `${Math.max(0, svgRect.left + towerX)}px`;
        menu.style.top = `${Math.max(0, svgRect.top + towerY - 120)}px`;

        const towerName = this.type.charAt(0).toUpperCase() + this.type.slice(1);
        menu.innerHTML = `
          <h3>${towerName} Tower (Level ${this.upgradeLevel})</h3>
          <div class="stats">
            <div><span class="label">DPS</span><span class="value">${Math.round(this.dps)}</span></div>
            <div><span class="label">Range</span><span class="value">${Math.round(this.range)}</span></div>
          </div>
          <div>Targeting:
            <select id="targeting-select-${this.x}-${this.y}">
              <option value="closest" ${this.targetingMode === "closest" ? "selected" : ""}>Closest</option>
              <option value="lowestHealth" ${this.targetingMode === "lowestHealth" ? "selected" : ""}>Lowest Health</option>
              <option value="strongest" ${this.targetingMode === "strongest" ? "selected" : ""}>Strongest</option>
              <option value="first" ${this.targetingMode === "first" ? "selected" : ""}>First</option>
              <option value="last" ${this.targetingMode === "last" ? "selected" : ""}>Last</option>
            </select>
          </div>
        `;

        document.body.appendChild(menu);

        const targetingSelect = document.getElementById(`targeting-select-${this.x}-${this.y}`);
        if (targetingSelect) {
          targetingSelect.addEventListener("change", (e) => {
            this.targetingMode = e.target.value;
            logEvent(`Changed ${this.type} tower targeting to ${this.targetingMode}`);
          });
        }

      const upgradeCost = Math.floor(CONFIG.towers[this.type].cost * 0.2 * (this.upgradeLevel + 1));
      const upgradeBtn = document.createElement("div");
      upgradeBtn.className = "upgrade-btn";
      upgradeBtn.innerHTML = `Upgrade (+15%) <span>${upgradeCost}</span>`;
      upgradeBtn.addEventListener("click", () => {
        this.upgrade(upgradeCost);
        document.body.removeChild(menu);
      });
      menu.appendChild(upgradeBtn);

      const sellValue = Math.floor(CONFIG.towers[this.type].cost * 0.7 * (1 + this.upgradeLevel * 0.2));
      const sellBtn = document.createElement("div");
      sellBtn.className = "sell-btn";
      sellBtn.innerHTML = `Sell Tower <span>+${sellValue}</span>`;
      sellBtn.addEventListener("click", () => {
        this.sell(sellValue);
        document.body.removeChild(menu);
      });
      menu.appendChild(sellBtn);

      document.body.appendChild(menu);

      const specialAbilities = [];
      if (this.powerAura) specialAbilities.push("Power Aura");
      if (this.splinters) specialAbilities.push("Splinters");
      if (this.ricochet) specialAbilities.push("Ricochet");
      if (this.burn) specialAbilities.push("Burn");
      if (this.freeze) specialAbilities.push("Freeze");
      if (this.splash) specialAbilities.push("Splash");
      if (this.chain) specialAbilities.push("Chain");
      if (this.stun) specialAbilities.push("Stun");
      if (this.shock) specialAbilities.push("Shock");

      if (specialAbilities.length > 0) {
        const abilitiesSection = document.createElement("div");
        abilitiesSection.className = "abilities-section";
        abilitiesSection.innerHTML = `
          <div class="abilities-title">Special Abilities</div>
          <div class="abilities-list">${specialAbilities.join(", ")}</div>
        `;
        menu.appendChild(abilitiesSection);
      }

      const closeMenu = e => {
        if (!menu.contains(e.target) && !this.element.contains(e.target)) {
          document.body.removeChild(menu);
          document.removeEventListener("click", closeMenu);
        }
      };
      setTimeout(() => document.addEventListener("click", closeMenu), 100);
    }

    upgrade() {
      // Check if the tower is already at max level
      if (this.upgradeLevel >= 100) {
        showNotification("Tower at maximum level!", "warning");
        return;
      }

      // Calculate the base cost (before reduction)
      const baseCost = CONFIG.towers[this.type].cost * 0.2 * (this.upgradeLevel + 1);

      // Apply the cost reduction multiplier
      const upgradeCost = Math.floor(baseCost * gameState.levelUpCostMultiplier);

      // Check if the player has enough credits
      if (gameState.credits < upgradeCost) {
        showNotification("Not Enough Credits!", "error");
        return;
      }

      // Deduct the reduced cost and upgrade the tower
      gameState.credits -= upgradeCost;
      gameState.totalCredits -= upgradeCost;
      this.upgradeLevel++;

      // Update tower stats (damage and range)
      this.dps = Math.min(this.baseDps * Math.pow(1.15, this.upgradeLevel), 250000);
      this.range = this.baseRange * Math.pow(1.15, this.upgradeLevel);
      this.updateSize();

      // Update the game interface and log the upgrade
      updateUI();
      logEvent(`Upgraded ${this.type} Tower to Level ${this.upgradeLevel}`);
      showNotification(`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Tower upgraded to Level ${this.upgradeLevel}!`, "success");
    }

    sell(value) {
      gameState.credits += value;
      gameState.totalCredits += value;
      updateUI();

      const svgRect = svg.getBoundingClientRect();
      const x = (this.x / 500) * svgRect.width + svgRect.left;
      const y = (this.y / 500) * svgRect.height + svgRect.top;
      createParticles(x, y, 20, "#ff5555", 3, 1);

      if (this.element && this.element.parentNode) svg.removeChild(this.element);
      if (this.rangeCircle && this.rangeCircle.parentNode) svg.removeChild(this.rangeCircle);
      gameState.towers = gameState.towers.filter(tower => tower !== this);

      // playSound("buttonClick");
      logEvent(`Sold ${this.type} Tower for ${value} Credits`);
      showNotification(`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Tower sold for ${value} credits!`, "info");
    }

    findTarget() {
      let target = null;
      if (this.targetingMode === "closest") {
        let minDistance = this.range;
        gameState.enemies.forEach(enemy => {
          if (enemy.element && enemy.element.parentNode) {
            const transform = enemy.element.getAttribute("transform");
            if (transform && transform.includes("translate")) {
              const enemyX = parseFloat(transform.split("translate(")[1].split(",")[0]);
              const enemyY = parseFloat(transform.split(",")[1].split(")")[0]);
              const distance = calculateDistance(this.x, this.y, enemyX, enemyY);
              if (distance < minDistance) {
                minDistance = distance;
                target = enemy;
              }
            }
          }
        });
      } else if (this.targetingMode === "lowestHealth") {
        let minHealth = Infinity;
        gameState.enemies.forEach(enemy => {
          if (enemy.element && enemy.element.parentNode) {
            const transform = enemy.element.getAttribute("transform");
            if (transform && transform.includes("translate")) {
              const enemyX = parseFloat(transform.split("translate(")[1].split(",")[0]);
              const enemyY = parseFloat(transform.split(",")[1].split(")")[0]);
              const distance = calculateDistance(this.x, this.y, enemyX, enemyY);
              if (distance < this.range && enemy.health < minHealth) {
                minHealth = enemy.health;
                target = enemy;
              }
            }
          }
        });
      } else if (this.targetingMode === "strongest") {
        let maxHealth = 0;
        gameState.enemies.forEach(enemy => {
          if (enemy.element && enemy.element.parentNode) {
            const transform = enemy.element.getAttribute("transform");
            if (transform && transform.includes("translate")) {
              const enemyX = parseFloat(transform.split("translate(")[1].split(",")[0]);
              const enemyY = parseFloat(transform.split(",")[1].split(")")[0]);
              const distance = calculateDistance(this.x, this.y, enemyX, enemyY);
              if (distance < this.range && enemy.health > maxHealth) {
                maxHealth = enemy.health;
                target = enemy;
              }
            }
          }
        });
      } else if (this.targetingMode === "first") {
        let maxProgress = -1;
        gameState.enemies.forEach(enemy => {
          if (enemy.element && enemy.element.parentNode) {
            const transform = enemy.element.getAttribute("transform");
            if (transform && transform.includes("translate")) {
              const enemyX = parseFloat(transform.split("translate(")[1].split(",")[0]);
              const enemyY = parseFloat(transform.split(",")[1].split(")")[0]);
              const distance = calculateDistance(this.x, this.y, enemyX, enemyY);
              if (distance < this.range) {
                const progress = enemy.currentPoint + enemy.progress / 100;
                if (progress > maxProgress) {
                  maxProgress = progress;
                  target = enemy;
                }
              }
            }
          }
        });
      } else if (this.targetingMode === "last") {
        let minProgress = Infinity;
        gameState.enemies.forEach(enemy => {
          if (enemy.element && enemy.element.parentNode) {
            const transform = enemy.element.getAttribute("transform");
            if (transform && transform.includes("translate")) {
              const enemyX = parseFloat(transform.split("translate(")[1].split(",")[0]);
              const enemyY = parseFloat(transform.split(",")[1].split(")")[0]);
              const distance = calculateDistance(this.x, this.y, enemyX, enemyY);
              if (distance < this.range) {
                const progress = enemy.currentPoint + enemy.progress / 100;
                if (progress < minProgress) {
                  minProgress = progress;
                  target = enemy;
                }
              }
            }
          }
        });
      }
      return target;
    }



  shoot() {
    const now = Date.now()
    const wasActive = this.isActive
    this.isActive = false // Reset activity state

    if (this.type === "water") {
      const interval = 200;
      if (now - this.lastShot < interval) return;
      let hitEnemy = false;
      gameState.enemies.forEach(enemy => {
        if (enemy.element && enemy.element.parentNode) {
          const transform = enemy.element.getAttribute("transform");
          if (transform && transform.includes("translate")) {
            const enemyX = parseFloat(transform.split("translate(")[1].split(",")[0]);
            const enemyY = parseFloat(transform.split(",")[1].split(")")[0]);
            const distance = calculateDistance(this.x, this.y, enemyX, enemyY);
            if (distance < this.range) {
              enemy.takeDamage(this.dps * (interval / 1000));
              hitEnemy = true;
            }
          }
        }
      });
      if (hitEnemy) {
        this.isActive = true;
        this.lastShot = now;

        // Show activity in "Graphics off" mode
        if (gameState.graphicsMode === "off" && !wasActive) {
          this.showActivityFlash()
        }

        // Visual effect for other modes
        if (gameState.graphicsMode !== "off") {
          const waterEffect = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          waterEffect.setAttribute("cx", this.x)
          waterEffect.setAttribute("cy", this.y)
          waterEffect.setAttribute("r", this.range / 2)
          waterEffect.setAttribute("fill", "none")
          waterEffect.setAttribute("stroke", "#1e90ff")
          waterEffect.setAttribute("stroke-width", "2")
          waterEffect.setAttribute("opacity", "0.3")
          svg.appendChild(waterEffect)

          // Simple animation
          let opacity = 0.3
          const fadeInterval = setInterval(() => {
            opacity -= 0.05
            waterEffect.setAttribute("opacity", opacity.toString())
            if (opacity <= 0 && waterEffect.parentNode) {
              svg.removeChild(waterEffect)
              clearInterval(fadeInterval)
            }
          }, 50)
        }
      }
    } else {
      // Adjust fire interval: 100ms for fire and ice, 500ms for others
      const fireInterval = this.type === "fire" || this.type === "ice" ? 100 : 500
      if (now - this.lastShot < fireInterval) return

      this.target = this.findTarget()
      if (this.target) {
        this.isActive = true

        // Show activity in "Graphics off" mode
        if (gameState.graphicsMode === "off" && !wasActive) {
          this.showActivityFlash()
        }

        if (this.type === "lightning") {
            this.target.takeDamage(this.dps / 60);
            this.applySpecialEffects(this.target);
            if (gameState.graphicsMode !== "off") {
              const transform = this.target.element.getAttribute("transform");
              if (transform && transform.includes("translate")) {
                const targetX = parseFloat(transform.split("translate(")[1].split(",")[0]);
                const targetY = parseFloat(transform.split(",")[1].split(")")[0]);
                const beam = document.createElementNS("http://www.w3.org/2000/svg", "line");
                beam.setAttribute("x1", this.x);
                beam.setAttribute("y1", this.y);
                beam.setAttribute("x2", targetX);
                beam.setAttribute("y2", targetY);
                beam.setAttribute("stroke", CONFIG.towers[this.type].projectileColor);
                beam.setAttribute("stroke-width", "3");
                beam.setAttribute("opacity", "0.8");
                svg.appendChild(beam);
                setTimeout(() => { if (beam.parentNode) svg.removeChild(beam); }, 100);
              }
            }
        } else {
          // Create projectile for fire, ice, and other towers
          if (gameState.graphicsMode !== "off") {
            const projectile = new Projectile(this, this.target)
            gameState.projectiles.push(projectile)
          } else {
            // Direct damage in "off" mode without projectile animation
            this.target.takeDamage(this.dps / 60)
            this.applySpecialEffects(this.target)
          }
        }
        this.lastShot = now

        // Apply Power Aura (5% DPS boost within 1 grid square)
        if (this.powerAura && !this.powerAuraApplied) {
          gameState.towers.forEach((t) => {
            if (t !== this && calculateDistance(t.x, t.y, this.x, this.y) <= 50) {
              t.dps *= 1.05 // 5% boost
            }
          })
          this.powerAuraApplied = true // Apply only once
        }

        // Particle effect on high graphics (1-3% chance)
        if (gameState.graphicsMode === "high" && Math.random() < 0.5) {
          const svgRect = svg.getBoundingClientRect()
          const x = (this.x / 500) * svgRect.width + svgRect.left
          const y = (this.y / 500) * svgRect.height + svgRect.top
          createParticles(x, y, 15, CONFIG.towers[this.type].color, 5, 1)
        }

        // Flash effect on high graphics
        if (gameState.graphicsMode === "high") {
          const flash = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          flash.setAttribute("cx", this.x)
          flash.setAttribute("cy", this.y)
          flash.setAttribute("r", "10")
          flash.setAttribute("fill", CONFIG.towers[this.type].projectileColor)
          flash.setAttribute("opacity", "0.7")
          svg.appendChild(flash)
          setTimeout(() => {
            if (flash.parentNode) svg.removeChild(flash)
          }, 100)
        }
      }
    }
  }

  applySpecialEffects(target) {
    if (this.burn) target.burnDamage += 5 * this.burn
    if (this.freeze) target.freezeLevel = Math.min(target.freezeLevel + this.freeze * 0.1, 1)
    if (this.stun && Math.random() < 0.1 * this.stun) target.stunned = true
    if (this.shock) target.shocked = true
    // Add ricochet, splinters, etc., logic if expanded in Projectile
  }
}

// Helper function to capitalize tower names
function towerName(type) {
  return type.charAt(0).toUpperCase() + type.slice(1)
}
