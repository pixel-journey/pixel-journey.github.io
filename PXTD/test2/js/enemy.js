// enemy.js
class Enemy {
  constructor(type, wave) {
    this.type = type;
    this.health = (CONFIG.enemy.baseHealth + wave * CONFIG.enemy.healthIncreasePerWave) * gameState.healthModifier;
    this.maxHealth = this.health;
    this.baseSpeed = CONFIG.enemy.baseSpeed + wave * CONFIG.enemy.speedIncreasePerWave;
    this.speed = this.baseSpeed * gameState.speedMultiplier;
    this.currentPoint = 0;
    this.progress = 0;
    this.element = null;
    this.healthBar = null;
    this.healthBarFill = null;
    this.burnDamage = 0;
    this.burnTimer = 0;
    this.stunned = false;
    this.shocked = false;
    this.shockTimer = 0;
    this.freezeLevel = 0;
    this.createElement();

    logEvent(`Enemy Spawned: ${type}, Health: ${Math.round(this.health)}`);
  }

  createElement() {
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");

    if (this.type === "basic") {
      const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      triangle.setAttribute("points", "0,20 -10,0 10,0");
      triangle.setAttribute("fill", "#00ff00");
      triangle.setAttribute("stroke", "#55ff55");
      triangle.setAttribute("stroke-width", "2");
      this.element.appendChild(triangle);
    } else if (this.type === "fast") {
      const triangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      triangle.setAttribute("points", "0,25 -8,-5 8,-5");
      triangle.setAttribute("fill", "#ffff00");
      triangle.setAttribute("stroke", "#aaaa00");
      triangle.setAttribute("stroke-width", "2");
      this.element.appendChild(triangle);
    } else if (this.type === "tank") {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", "12");
      circle.setAttribute("fill", "#ff0000");
      circle.setAttribute("stroke", "#aa0000");
      circle.setAttribute("stroke-width", "2");
      this.element.appendChild(circle);
    }

    svg.appendChild(this.element);

    this.healthBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.healthBar.setAttribute("width", "30");
    this.healthBar.setAttribute("height", "5");
    this.healthBar.setAttribute("fill", "#555555");
    this.healthBar.setAttribute("rx", "2");
    svg.appendChild(this.healthBar);

    this.healthBarFill = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.healthBarFill.setAttribute("width", "30");
    this.healthBarFill.setAttribute("height", "5");
    this.healthBarFill.setAttribute("fill", "#ff0000");
    this.healthBarFill.setAttribute("rx", "2");
    svg.appendChild(this.healthBarFill);

    this.statusEffects = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(this.statusEffects);

    this.updatePosition();
  }

  updatePosition() {
    if (this.currentPoint >= gameState.pathPoints.length - 1) {
      gameState.lives--;
      updateUI();
      logEvent(`Enemy Reached End: Lost 1 Life (Lives: ${gameState.lives})`);
      this.remove();

      if (gameState.lives <= 0) {
        showGameOver(gameState.totalCredits);
      }
      return;
    }

    if (!this.stunned) {
      const start = gameState.pathPoints[this.currentPoint];
      const end = gameState.pathPoints[this.currentPoint + 1];
      const progress = this.progress / 100;
      const x = start.x + (end.x - start.x) * progress;
      const y = start.y + (end.y - start.y) * progress;

      const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

      this.element.setAttribute("transform", `translate(${x}, ${y}) rotate(${angle + 90})`);
      this.healthBar.setAttribute("x", x - 15);
      this.healthBar.setAttribute("y", y - 25);
      this.healthBarFill.setAttribute("x", x - 15);
      this.healthBarFill.setAttribute("y", y - 25);
      this.healthBarFill.setAttribute("width", (this.health / this.maxHealth) * 30);

      this.updateStatusEffects(x, y);

      this.progress += this.speed;
      if (this.progress >= 100) {
        this.currentPoint++;
        this.progress = 0;
      }
    }

    this.applyStatusEffects();
  }

  updateStatusEffects(x, y) {
    while (this.statusEffects.firstChild) {
      this.statusEffects.removeChild(this.statusEffects.firstChild);
    }

    if (this.burnDamage > 0) {
      const fire = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      fire.setAttribute("cx", x);
      fire.setAttribute("cy", y);
      fire.setAttribute("r", "5");
      fire.setAttribute("fill", "#ff4500");
      fire.setAttribute("opacity", "0.7");
      this.statusEffects.appendChild(fire);
    }

    if (this.shocked) {
      const shock = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      shock.setAttribute("cx", x);
      shock.setAttribute("cy", y);
      shock.setAttribute("r", "7");
      shock.setAttribute("fill", "#ffff00");
      shock.setAttribute("opacity", "0.5");
      this.statusEffects.appendChild(shock);
    }

    if (this.freezeLevel > 0) {
      const freeze = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      freeze.setAttribute("cx", x);
      freeze.setAttribute("cy", y);
      freeze.setAttribute("r", "8");
      freeze.setAttribute("fill", "#00b7eb");
      freeze.setAttribute("opacity", "0.3");
      this.statusEffects.appendChild(freeze);
    }

    if (this.stunned) {
      const stun = document.createElementNS("http://www.w3.org/2000/svg", "text");
      stun.setAttribute("x", x);
      stun.setAttribute("y", y - 15);
      stun.setAttribute("fill", "#ffffff");
      stun.setAttribute("font-family", "Arial");
      stun.setAttribute("font-size", "10");
      stun.setAttribute("text-anchor", "middle");
      stun.textContent = "✧";
      this.statusEffects.appendChild(stun);
    }
  }

  applyStatusEffects() {
    if (this.burnDamage > 0 && this.burnTimer > 0) {
      this.takeDamage(this.burnDamage / 60);
      this.burnTimer--;
      if (this.burnTimer <= 0) this.burnDamage = 0;
    }
    if (this.shocked && this.shockTimer > 0) {
      this.takeDamage(10 / 60);
      this.shockTimer--;
      if (this.shockTimer <= 0) this.shocked = false;
    }
    if (this.freezeLevel > 0) {
      this.freezeLevel = Math.max(0, this.freezeLevel - 0.01);
      this.updateSpeed();
    }
  }

  updateSpeed() {
    let speedMultiplier = gameState.speedMultiplier;
    if (this.freezeLevel > 0) {
      speedMultiplier *= Math.max(0.3, 1 - this.freezeLevel * 0.3);
    }
    this.speed = this.baseSpeed * speedMultiplier;
  }

  takeDamage(damage) {
    this.health -= damage;
    this.healthBarFill.setAttribute("width", Math.max(0, (this.health / this.maxHealth) * 30));

    const healthPercent = this.health / this.maxHealth;
    let healthColor = healthPercent < 0.3 ? "#ff0000" : healthPercent < 0.6 ? "#ffaa00" : "#00cc00";
    this.healthBarFill.setAttribute("fill", healthColor);

    if (this.health <= 0) {
      gameState.credits += CONFIG.enemy.creditReward;
      gameState.totalCredits += CONFIG.enemy.creditReward;
      updateUI();
      logEvent(`Enemy Defeated: +${CONFIG.enemy.creditReward} Credits`);
      this.remove();
    }
  }

  applyBurn(damage, duration) {
    this.burnDamage = damage;
    this.burnTimer = duration * 60;
  }

  applyShock(duration) {
    this.shocked = true;
    this.shockTimer = duration * 60;
  }

  remove() {
    if (this.element && this.element.parentNode) svg.removeChild(this.element);
    if (this.healthBar && this.healthBar.parentNode) svg.removeChild(this.healthBar);
    if (this.healthBarFill && this.healthBarFill.parentNode) svg.removeChild(this.healthBarFill);
    if (this.statusEffects && this.statusEffects.parentNode) svg.removeChild(this.statusEffects);
    gameState.enemies = gameState.enemies.filter(enemy => enemy !== this);
  }
}
