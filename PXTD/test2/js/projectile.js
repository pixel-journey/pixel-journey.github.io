class Projectile {
  constructor(tower, target) {
    this.tower = tower;
    this.target = target;
    this.x = tower.x;
    this.y = tower.y;
    this.element = null;
    // Speed: 50 for fire and ice, 5 for rock and wood, 10 for others
    this.speed = (this.tower.type === "fire" || this.tower.type === "ice") ? 50 :
                 (["rock", "wood"].includes(this.tower.type) ? 5 : 10);
    // Size: 3 for fire and ice, 5 for others
    this.size = (this.tower.type === "fire" || this.tower.type === "ice") ? 3 : 5;
    this.createElement();
  }

  createElement() {
    const type = CONFIG.towers[this.tower.type].projectile;
    const color = CONFIG.towers[this.tower.type].projectileColor;

    if (type === "circle") {
      this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.element.setAttribute("r", this.size.toString());
      this.element.setAttribute("fill", color);
    } else if (type === "rect") {
      this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.element.setAttribute("width", (this.size * 2).toString());
      this.element.setAttribute("height", (this.size * 2).toString());
      this.element.setAttribute("x", (-this.size).toString());
      this.element.setAttribute("y", (-this.size).toString());
      this.element.setAttribute("fill", color);
    } else if (type === "star") {
      const scale = this.size / 5; // Scale based on size (original assumed 5)
      this.element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      this.element.setAttribute("points",
        `0,${-8*scale} ${2*scale},${-3*scale} ${7*scale},${-3*scale} ${3*scale},${1*scale} ${5*scale},${6*scale} ` +
        `0,${3*scale} ${-5*scale},${6*scale} ${-3*scale},${1*scale} ${-7*scale},${-3*scale} ${-2*scale},${-3*scale}`
      );
      this.element.setAttribute("fill", color);
    } else if (type === "snowflake") {
      const scale = this.size / 5;
      this.element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      this.element.setAttribute("points",
        `0,${-8*scale} ${2*scale},${-2*scale} ${8*scale},0 ${2*scale},${2*scale} 0,${8*scale} ` +
        `${-2*scale},${2*scale} ${-8*scale},0 ${-2*scale},${-2*scale}`
      );
      this.element.setAttribute("fill", color);
    } else if (type === "drop") {
      const scale = this.size / 5;
      this.element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      this.element.setAttribute("d", `M0,${-8*scale} Q${4*scale},0 0,${8*scale} Q${-4*scale},0 0,${-8*scale}`);
      this.element.setAttribute("fill", color);
    } else if (type === "bolt") {
      const scale = this.size / 5;
      this.element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      this.element.setAttribute("d",
        `M0,${-8*scale} L${3*scale},${-3*scale} L${8*scale},${-4*scale} L${4*scale},0 L${6*scale},${5*scale} ` +
        `L0,${2*scale} L${-6*scale},${5*scale} L${-4*scale},0 L${-8*scale},${-4*scale} L${-3*scale},${-3*scale} Z`
      );
      this.element.setAttribute("fill", color);
    }

    this.element.setAttribute("filter", "url(#glow)");
    this.element.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    svg.appendChild(this.element);

    if (!document.getElementById("glow")) {
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
      filter.setAttribute("id", "glow");
      filter.setAttribute("x", "-50%");
      filter.setAttribute("y", "-50%");
      filter.setAttribute("width", "200%");
      filter.setAttribute("height", "200%");

      const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
      feGaussianBlur.setAttribute("stdDeviation", "2");
      feGaussianBlur.setAttribute("result", "blur");

      const feComposite = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
      feComposite.setAttribute("in", "SourceGraphic");
      feComposite.setAttribute("in2", "blur");
      feComposite.setAttribute("operator", "over");

      filter.appendChild(feGaussianBlur);
      filter.appendChild(feComposite);
      defs.appendChild(filter);
      svg.appendChild(defs);
    }
  }

  update() {
    if (this.tower.type === "lightning") {
      return; // No movement for instant
    }

    if (!this.target || !this.target.element || !this.target.element.parentNode) {
      this.remove();
      return;
    }

    const targetTransform = this.target.element.getAttribute("transform");
    if (!targetTransform || !targetTransform.includes("translate")) {
      this.remove();
      return;
    }

    const targetX = Number.parseFloat(targetTransform.split("translate(")[1].split(",")[0]);
    const targetY = Number.parseFloat(targetTransform.split(",")[1].split(")")[0]);

    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.speed) {
      this.hitTarget();
      return;
    }

    this.x += (dx / distance) * this.speed;
    this.y += (dy / distance) * this.speed;
    this.element.setAttribute("transform", `translate(${this.x}, ${this.y})`);
  }

  hitTarget() {
    this.target.takeDamage(this.tower.dps / 60);
    if (this.tower.type === "ice") {
      this.target.freezeLevel = Math.min(this.target.freezeLevel + 0.1, 1); // Apply freeze effect
    }
    if (this.tower.type === "gold" && Math.random() < 0.1) {
        gameState.credits += 5;
        gameState.totalCredits += 5;
        updateUI();
        const svgRect = svg.getBoundingClientRect();
        const screenX = (this.tower.x / 500) * svgRect.width + svgRect.left;
        const screenY = (this.tower.y / 500) * svgRect.height + svgRect.top;
        showCreditsPop(screenX, screenY - 20, 5);
      }
    this.applySpecialEffects();
    this.remove();
  }

    findNearestEnemy() {
      let nearest = null;
      let minDistance = this.tower.range;
      gameState.enemies.forEach(enemy => {
        if (enemy.element && enemy.element.parentNode) {
          const transform = enemy.element.getAttribute("transform");
          if (transform && transform.includes("translate")) {
            const enemyX = parseFloat(transform.split("translate(")[1].split(",")[0]);
            const enemyY = parseFloat(transform.split(",")[1].split(")")[0]);
            const distance = calculateDistance(this.x, this.y, enemyX, enemyY);
            if (distance < minDistance) {
              minDistance = distance;
              nearest = enemy;
            }
          }
        }
      });
      return nearest;
    }

  applySpecialEffects() {
    const targetTransform = this.target.element.getAttribute("transform");
    if (!targetTransform || !targetTransform.includes("translate")) return;

    const targetX = Number.parseFloat(targetTransform.split("translate(")[1].split(",")[0]);
    const targetY = Number.parseFloat(targetTransform.split(",")[1].split(")")[0]);


        if (this.tower.powerAura) {
        gameState.towers.forEach(t => {
          if (t !== this.tower && calculateDistance(t.x, t.y, this.tower.x, this.tower.y) < 50) {
            t.dps = t.dps * 1.05; // Apply to current DPS
              const powerAuraEffect = document.createElementNS("http://www.w3.org/2000/svg", "circle");
              powerAuraEffect.setAttribute("cx", t.x);
              powerAuraEffect.setAttribute("cy", t.y);
              powerAuraEffect.setAttribute("r", "15");
              powerAuraEffect.setAttribute("fill", "none");
              powerAuraEffect.setAttribute("stroke", "#00ff00");
              powerAuraEffect.setAttribute("stroke-width", "2");
              powerAuraEffect.setAttribute("opacity", "0.7");
              svg.appendChild(powerAuraEffect);
              setTimeout(() => { if (powerAuraEffect.parentNode) svg.removeChild(powerAuraEffect); }, 500);
            }
          });
        }

    if (this.tower.splinters) {
      gameState.enemies.forEach(enemy => {
        if (enemy !== this.target && enemy.element && enemy.element.parentNode) {
          const enemyTransform = enemy.element.getAttribute("transform");
          if (!enemyTransform || !enemyTransform.includes("translate")) return;
          const enemyX = Number.parseFloat(enemyTransform.split("translate(")[1].split(",")[0]);
          const enemyY = Number.parseFloat(enemyTransform.split(",")[1].split(")")[0]);
          if (calculateDistance(enemyX, enemyY, targetX, targetY) < 75) {
            enemy.takeDamage(this.tower.dps / 120);
            const splinterLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            splinterLine.setAttribute("x1", targetX);
            splinterLine.setAttribute("y1", targetY);
            splinterLine.setAttribute("x2", enemyX);
            splinterLine.setAttribute("y2", enemyY);
            splinterLine.setAttribute("stroke", "#8b4513");
            splinterLine.setAttribute("stroke-width", "1");
            splinterLine.setAttribute("opacity", "0.7");
            svg.appendChild(splinterLine);
            setTimeout(() => { if (splinterLine.parentNode) svg.removeChild(splinterLine); }, 300);
          }
        }
      });
    }

    if (this.tower.ricochet) {
      const performRicochet = (source, depth) => {
        if (depth >= 3) return;
        const sourceTransform = source.element.getAttribute("transform");
        if (!sourceTransform || !sourceTransform.includes("translate")) return;
        const sourceX = Number.parseFloat(sourceTransform.split("translate(")[1].split(",")[0]);
        const sourceY = Number.parseFloat(sourceTransform.split("translate(")[1].split(")")[0]);

        let nextTarget = null;
        let minDistance = 150;
        gameState.enemies.forEach(enemy => {
          if (enemy !== source && enemy.element && enemy.element.parentNode) {
            const enemyTransform = enemy.element.getAttribute("transform");
            if (!enemyTransform || !enemyTransform.includes("translate")) return;
            const enemyX = Number.parseFloat(enemyTransform.split("translate(")[1].split(",")[0]);
            const enemyY = Number.parseFloat(enemyTransform.split("translate(")[1].split(")")[0]);
            const distance = calculateDistance(sourceX, sourceY, enemyX, enemyY);
            if (distance < minDistance) {
              minDistance = distance;
              nextTarget = enemy;
            }
          }
        });

        if (nextTarget) {
          const nextX = Number.parseFloat(nextTarget.element.getAttribute("transform").split("translate(")[1].split(",")[0]);
          const nextY = Number.parseFloat(nextTarget.element.getAttribute("transform").split(",")[1].split(")")[0]);
          nextTarget.takeDamage((this.tower.dps / 60) * 0.7 ** depth);
          const ricochetLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
          ricochetLine.setAttribute("x1", sourceX);
          ricochetLine.setAttribute("y1", sourceY);
          ricochetLine.setAttribute("x2", nextX);
          ricochetLine.setAttribute("y2", nextY);
          ricochetLine.setAttribute("stroke", "#ffd700");
          ricochetLine.setAttribute("stroke-width", "2");
          ricochetLine.setAttribute("opacity", "0.7");
          svg.appendChild(ricochetLine);
          setTimeout(() => { if (ricochetLine.parentNode) svg.removeChild(ricochetLine); }, 300);
          performRicochet(nextTarget, depth + 1);
        }
      };
      performRicochet(this.target, 0);
    }

    if (this.tower.burn) {
      this.target.burnDamage = 10;
      const burnEffect = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      burnEffect.setAttribute("cx", targetX);
      burnEffect.setAttribute("cy", targetY);
      burnEffect.setAttribute("r", "12");
      burnEffect.setAttribute("fill", "#ff4500");
      burnEffect.setAttribute("opacity", "0.5");
      svg.appendChild(burnEffect);
      setTimeout(() => { if (burnEffect.parentNode) svg.removeChild(burnEffect); }, 300);
    }

    if (this.tower.freeze) {
      // Freeze effect moved to hitTarget for ice towers
      const freezeEffect = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      freezeEffect.setAttribute("cx", targetX);
      freezeEffect.setAttribute("cy", targetY);
      freezeEffect.setAttribute("r", "15");
      freezeEffect.setAttribute("fill", "#00b7eb");
      freezeEffect.setAttribute("opacity", "0.3");
      svg.appendChild(freezeEffect);
      setTimeout(() => { if (freezeEffect.parentNode) svg.removeChild(freezeEffect); }, 300);
    }

    if (this.tower.splash) {
      gameState.enemies.forEach(enemy => {
        if (enemy !== this.target && enemy.element && enemy.element.parentNode) {
          const enemyX = Number.parseFloat(enemy.element.getAttribute("transform").split("translate(")[1].split(",")[0]);
          const enemyY = Number.parseFloat(enemy.element.getAttribute("transform").split(",")[1].split(")")[0]);
          if (calculateDistance(enemyX, enemyY, targetX, targetY) < 75) {
            enemy.takeDamage(this.tower.dps / 120);
          }
        }
      });
      const splashEffect = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      splashEffect.setAttribute("cx", targetX);
      splashEffect.setAttribute("cy", targetY);
      splashEffect.setAttribute("r", "75");
      splashEffect.setAttribute("fill", "none");
      splashEffect.setAttribute("stroke", "#1e90ff");
      splashEffect.setAttribute("stroke-width", "2");
      splashEffect.setAttribute("opacity", "0.5");
      svg.appendChild(splashEffect);
      let radius = 0;
      const animateSplash = () => {
        radius += 5;
        splashEffect.setAttribute("r", radius);
        splashEffect.setAttribute("opacity", (0.5 - radius / 150).toString());
        if (radius < 75) requestAnimationFrame(animateSplash);
        else if (splashEffect.parentNode) svg.removeChild(splashEffect);
      };
      requestAnimationFrame(animateSplash);
    }

    if (this.tower.chain) {
      const performChain = (source, depth) => {
        if (depth >= 5) return;
        const sourceX = Number.parseFloat(source.element.getAttribute("transform").split("translate(")[1].split(",")[0]);
        const sourceY = Number.parseFloat(source.element.getAttribute("transform").split(",")[1].split(")")[0]);
        let nextTarget = null;
        let minDistance = 150;
        gameState.enemies.forEach(enemy => {
          if (enemy !== source && enemy.element && enemy.element.parentNode) {
            const enemyX = Number.parseFloat(enemy.element.getAttribute("transform").split("translate(")[1].split(",")[0]);
            const enemyY = Number.parseFloat(enemy.element.getAttribute("transform").split(",")[1].split(")")[0]);
            const distance = calculateDistance(sourceX, sourceY, enemyX, enemyY);
            if (distance < minDistance) {
              minDistance = distance;
              nextTarget = enemy;
            }
          }
        });
        if (nextTarget) {
          const nextX = Number.parseFloat(nextTarget.element.getAttribute("transform").split("translate(")[1].split(",")[0]);
          const nextY = Number.parseFloat(nextTarget.element.getAttribute("transform").split(",")[1].split(")")[0]);
          nextTarget.takeDamage(this.tower.dps / 60);
          const chainLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
          chainLine.setAttribute("x1", sourceX);
          chainLine.setAttribute("y1", sourceY);
          chainLine.setAttribute("x2", nextX);
          chainLine.setAttribute("y2", nextY);
          chainLine.setAttribute("stroke", "#ff00ff");
          chainLine.setAttribute("stroke-width", "2");
          chainLine.setAttribute("opacity", "0.7");
          svg.appendChild(chainLine);
          setTimeout(() => { if (chainLine.parentNode) svg.removeChild(chainLine); }, 300);
          performChain(nextTarget, depth + 1);
        }
      };
      performChain(this.target, 0);
    }

    if (this.tower.stun && Math.random() < 0.05) {
      this.target.stunned = true;
      const stunEffect = document.createElementNS("http://www.w3.org/2000/svg", "text");
      stunEffect.setAttribute("x", targetX);
      stunEffect.setAttribute("y", targetY - 20);
      stunEffect.setAttribute("fill", "#ffffff");
      stunEffect.setAttribute("font-family", "Arial");
      stunEffect.setAttribute("font-size", "16");
      stunEffect.setAttribute("text-anchor", "middle");
      stunEffect.textContent = "✧";
      svg.appendChild(stunEffect);
      setTimeout(() => {
        if (stunEffect.parentNode) svg.removeChild(stunEffect);
        this.target.stunned = false;
      }, 2000);
    }

    if (this.tower.shock) {
      this.target.shocked = true;
      const shockEffect = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      shockEffect.setAttribute("cx", targetX);
      shockEffect.setAttribute("cy", targetY);
      shockEffect.setAttribute("r", "15");
      shockEffect.setAttribute("fill", "#ffff00");
      shockEffect.setAttribute("opacity", "0.5");
      svg.appendChild(shockEffect);
      setTimeout(() => { if (shockEffect.parentNode) svg.removeChild(shockEffect); }, 300);
      setTimeout(() => { this.target.shocked = false; }, 5000);
    }
  }

  remove() {
    if (this.element && this.element.parentNode) svg.removeChild(this.element);
    gameState.projectiles = gameState.projectiles.filter(p => p !== this);
  }
}
