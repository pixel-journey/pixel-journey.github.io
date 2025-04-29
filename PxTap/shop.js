const SHOP = {
  boosters: [
    {
      id: "autoTap30s",
      name: "Auto Tap",
      icon: "🤖",
      baseDuration: 30000,
      cost: { red: 100, blue: 100, yellow: 100 },
      description: "Automatically taps the enemy (every ~second).",
      multiplier: 1,
    },
    {
      id: "doubleDye60s",
      name: "Double Dye",
      icon: "🎨",
      baseDuration: 60000,
      cost: { red: 1500, blue: 1500, yellow: 1500 },
      description: "Doubles all dye earned from taps and kills.",
      multiplier: 2,
    },
    {
      id: "critChance30s",
      name: "Critical Chance",
      icon: "⚡",
      baseDuration: 30000,
      cost: { red: 2000, blue: 2000, yellow: 2000 },
      description: "Increases critical hit chance by 10%.",
      multiplier: 0.1,
    },
    {
      id: "megaTap10s",
      name: "Mega Tap",
      icon: "👊",
      baseDuration: 10000,
      cost: { red: 5000, blue: 5000, yellow: 5000 },
      description: "Triples your tap damage for a short time.",
      multiplier: 3,
    },
    {
      id: "colorRush45s",
      name: "Color Rush",
      icon: "💫",
      baseDuration: 45000,
      cost: { red: 25000, blue: 25000, yellow: 25000 },
      description: "Increases chance of higher tier ingredients.",
      multiplier: 0.2,
    },
    {
      id: "xpBoost45s",
      name: "XP Boost",
      icon: "📚",
      baseDuration: 45000,
      cost: { red: 2000, blue: 2000, yellow: 2000 },
      description: "Increases XP gained by 50%.",
      multiplier: 1.5,
    },
    {
      id: "upgradeSkills",
      name: "Skill Upgrades",
      icon: "⬆️",
      baseDuration: 0, // Not a timed booster
      cost: { red: 10, blue: 10, yellow: 10 },
      description: "View available skill upgrades to enhance your abilities.",
      multiplier: 0,
      special: true, // Flag as special non-timed item
    },
  ],

  init: function() {
      // Start a timer to update the buff-bar every second
      setInterval(() => {
        if (player.activeBoosters.length > 0) {
          console.log('Updating buff-bar timers');
          ui.renderBoosters(); // Pass false to skip listener reattachment
        }
      }, 1000);
    },

    purchaseBooster: function(boosterId) {
      console.log(`SHOP.purchaseBooster called for booster: ${boosterId}`);
      const boosterDef = this.boosters.find(b => b.id === boosterId);
      if (!boosterDef) {
        console.warn(`Booster not found: ${boosterId}`);
        return false;
      }

      const success = player.purchaseBooster(boosterId);
      if (!success) {
        console.log(`Failed to purchase booster ${boosterId}`);
        ui.notify(`Not enough dye for ${boosterDef.name}`, true);
        return false;
      }

      console.log('Updating UI after successful purchase');
      ui.updateCurrencyBar();
      ui.renderBoosters(); // Pass true to reattach listeners after purchase

      console.log(`Booster ${boosterId} purchased successfully`);
      return true;
    },

    initBoosterListeners: function() {
      console.log('SHOP.initBoosterListeners called');
      const boostersContainer = document.getElementById("active-boosters");
      if (!boostersContainer) {
        console.warn('Boosters container not found');
        return;
      }

      const boosterElements = boostersContainer.querySelectorAll('.active-booster, .empty-booster');
      console.log(`Found ${boosterElements.length} booster elements to attach listeners to`);

          boosterElements.forEach(div => {
            // Remove any existing listeners to prevent duplicates
            const newDiv = div.cloneNode(true);
            div.parentNode.replaceChild(newDiv, div);

            // Debug: Add a temporary inline click handler to confirm clicks are captured
            newDiv.onclick = () => {
              console.log(`Inline click captured for booster: ${newDiv.dataset.boosterId}`);
            };

            newDiv.addEventListener("click", (e) => {
              console.log(`Event listener triggered for booster: ${newDiv.dataset.boosterId}`);
              e.stopPropagation(); // Prevent enemy tap event

              const boosterId = newDiv.dataset.boosterId;
              if (!boosterId) {
                console.warn('Booster ID not found on element');
                return;
              }

              const boosterDef = SHOP.boosters.find(b => b.id === boosterId);
              if (!boosterDef) {
                console.warn(`Booster definition not found for ID: ${boosterId}`);
                return;
              }

              console.log(`Booster clicked: ${boosterId}, Description: ${boosterDef.description}, Active: ${newDiv.classList.contains('active-booster')}`);

              // Check if player can afford it
              const canAfford =
                player.dye.red >= boosterDef.cost.red &&
                player.dye.blue >= boosterDef.cost.blue &&
                player.dye.yellow >= boosterDef.cost.yellow;
              console.log(`Can afford: ${canAfford}, Player dye:`, player.dye, `Cost:`, boosterDef.cost);

              if (canAfford) {
                try {
                  console.log(`Attempting to purchase booster: ${boosterId}`);
                  const success = SHOP.purchaseBooster(boosterId);
                  if (success) {
                    console.log(`Booster ${boosterId} purchased successfully`);
                  } else {
                    console.log(`Failed to purchase booster ${boosterId}`);
                    ui.notify(`Failed to extend ${boosterDef.name}`, true);
                  }
                } catch (error) {
                  console.error(`Error purchasing booster ${boosterId}:`, error);
                  ui.notify(`Error extending ${boosterDef.name}`, true);
                }
              } else {
                ui.notify(`Not enough dye for ${boosterDef.name}`, true);
              }
            });

            console.log(`Attached click listener to booster: ${newDiv.dataset.boosterId}`);
          });

          // Debug: Log all click listeners on the first booster element
          if (boosterElements.length > 0) {
            const firstBooster = boosterElements[0];
            console.log(`Click listeners on ${firstBooster.dataset.boosterId}:`, firstBooster.__proto__.onclick);
          }
    },

  renderShop: function () {
    console.log("SHOP.renderShop called")
    const shopEl = document.getElementById("shop-items") || document.getElementById("shop-content")
    if (!shopEl) {
      console.error("Shop container element not found")
      return
    }

    shopEl.innerHTML = ""


    // Add a separator
    const separator = document.createElement("hr")
    separator.style.margin = "20px 0"
    separator.style.borderColor = "rgba(255, 255, 255, 0.1)"
    shopEl.appendChild(separator)

    // First, render the special Skill Upgrades item
    const skillUpgradeItem = this.boosters.find((b) => b.id === "upgradeSkills")
    if (skillUpgradeItem) {
      const canAfford =
        player.dye.red >= skillUpgradeItem.cost.red &&
        player.dye.blue >= skillUpgradeItem.cost.blue &&
        player.dye.yellow >= skillUpgradeItem.cost.yellow

      const upgradeDiv = document.createElement("div")
      upgradeDiv.className = `shop-item upgrade-shop-item special-upgrade ${!canAfford ? "disabled" : ""}`
      upgradeDiv.innerHTML = `
        <div class="shop-item-header">
          <div class="shop-icon">${skillUpgradeItem.icon}</div>
          <div class="shop-name">${skillUpgradeItem.name}</div>
        </div>
        <div class="shop-desc">${skillUpgradeItem.description}</div>
        <div class="shop-cost">Cost: 🔴 ${skillUpgradeItem.cost.red.toFixed(0)} 🔵 ${skillUpgradeItem.cost.blue.toFixed(0)} 🟡 ${skillUpgradeItem.cost.yellow.toFixed(0)}</div>
      `

      upgradeDiv.onclick = () => {
        if (canAfford) {
          this.purchaseSpecial(skillUpgradeItem.id)
        } else {
          ui.notify(`Not enough dye for ${skillUpgradeItem.name}`, true)
        }
      }

      shopEl.appendChild(upgradeDiv)

      // Add "Show Owned Upgrades" button
      const showOwnedBtn = document.createElement("button")
      showOwnedBtn.className = "show-owned-upgrades"
      showOwnedBtn.textContent = "Show Owned Upgrades"
      showOwnedBtn.onclick = () => {
        ui.togglePanel("shop-panel")
        ui.showProfile()
        // Activate the profile tab
        document.querySelector('.profile-tab[data-tab="profile-info"]').click()
      }
      shopEl.appendChild(showOwnedBtn)
    }

    // Now render all other boosters (without categories)
    const regularBoosters = this.boosters.filter((b) => b.id !== "upgradeSkills")

    regularBoosters.forEach((booster) => {
        // Check if player can afford this booster
        const canAfford =
          player.dye.red >= booster.cost.red &&
          player.dye.blue >= booster.cost.blue &&
          player.dye.yellow >= booster.cost.yellow

        // Check if this booster is already active
        const isActive = Array.isArray(player.activeBoosters) && player.activeBoosters.some((b) => b.key === booster.id)

        const boosterDiv = document.createElement("div")
        boosterDiv.className = `shop-item ${!canAfford ? "disabled" : ""} ${isActive ? "active" : ""}`

        // Calculate baseDuration with player's skills
        let durationSeconds = booster.baseDuration / 1000
        if (player.skills.booster_duration) {
          durationSeconds *= SKILLS.find((s) => s.id === "booster_duration").getEffect(player.skills.booster_duration)
        }
        if (player.skills.shop_booster_duration) {
          durationSeconds *= SKILLS.find((s) => s.id === "shop_booster_duration").getEffect(
            player.skills.shop_booster_duration,
          )
        }

        boosterDiv.innerHTML = `
          <div class="shop-item-header">
          <div class="shop-icon">${booster.icon}</div>
          <div class="shop-name">${booster.name} ${isActive ? "✓" : ""}</div>
</div>
          <div class="shop-desc">${booster.description}</div>
          <div class="shop-duration">Duration: ${Math.round(durationSeconds)}s</div>
          <div class="shop-cost">Cost: 🔴 ${booster.cost.red.toFixed(0)} 🔵 ${booster.cost.blue.toFixed(0)} 🟡 ${booster.cost.yellow.toFixed(0)}</div>
        `

      boosterDiv.onclick = () => {
          if (canAfford) {
            this.purchaseBooster(booster.id)
          } else {
            ui.notify(`Not enough dye for ${booster.name}`, true)
          }
        }

        shopEl.appendChild(boosterDiv)
      })
    },

    purchaseSpecial: function (itemId) {
      console.log("SHOP.purchaseSpecial called with:", itemId)
      const item = this.boosters.find((b) => b.id === itemId)
      if (!item) {
        ui.notify("Item not found!", true)
        return
      }

      if (player.dye.red < item.cost.red || player.dye.blue < item.cost.blue || player.dye.yellow < item.cost.yellow) {
        ui.notify(`Not enough dye for ${item.name}`, true)
        return
      }

      // Deduct the cost
      player.dye.red -= item.cost.red
      player.dye.blue -= item.cost.blue
      player.dye.yellow -= item.cost.yellow
      ui.updateCurrencyBar()

      // Handle specific special items
      if (itemId === "upgradeSkills") {
        const skills = player.getRandomSkills(3)
        ui.showSkillChoice(skills)
        AUDIO.play("purchase")
    }
  },


  // Add a new function to show skill choice
  showSkillChoice: () => {
    // Check if player can afford the upgrade
    if (player.dye.red < 10 || player.dye.blue < 10 || player.dye.yellow < 10) {
      ui.notify("Need 10 of each dye to open upgrades!", true)
      return
    }

    // Deduct the cost
    player.dye.red -= 10
    player.dye.blue -= 10
    player.dye.yellow -= 10
    ui.updateCurrencyBar()

    // Show the skill choice UI
    ui.showSkillChoice(player.getRandomSkills(3))
  },
}
