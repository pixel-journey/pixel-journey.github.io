// This file manages the prestige talent system
const PRESTIGE_TALENTS = {
  // Store all talent definitions
  talents: [
    // Tier 1 - Basic talents
    {
      id: "dye_efficiency",
      name: "Dye Efficiency",
      description: "Increases all dye gained by 10% per level",
      maxLevel: 5,
      tier: 1,
      cost: 1,
      effect: (level) => 1 + (level * 0.1),
      applyEffect: (level) => {
        player.talentEffects.dye_multiplier = 1 + (level * 0.1);
      }
    },
    {
      id: "tap_power",
      name: "Tap Power",
      description: "Increases tap damage by 15% per level",
      maxLevel: 5,
      tier: 1,
      cost: 1,
      effect: (level) => 1 + (level * 0.15),
      applyEffect: (level) => {
        player.talentEffects.tap_damage = 1 + (level * 0.15);
      }
    },
    {
      id: "auto_tap_efficiency",
      name: "Auto Tap Efficiency",
      description: "Increases auto tap damage by 20% per level",
      maxLevel: 5,
      tier: 1,
      cost: 1,
      effect: (level) => 1 + (level * 0.2),
      applyEffect: (level) => {
        player.talentEffects.auto_tap_damage = 1 + (level * 0.2);
      }
    },
    
    // Tier 2 - Advanced talents
    {
      id: "critical_mastery",
      name: "Critical Mastery",
      description: "Increases critical hit chance by 5% and critical damage by 20% per level",
      maxLevel: 3,
      tier: 2,
      cost: 2,
      requires: ["tap_power"],
      effect: (level) => ({ chance: level * 0.05, damage: 1 + (level * 0.2) }),
      applyEffect: (level) => {
        player.talentEffects.critical_boost.chance = level * 0.05;
        player.talentEffects.critical_boost.damage = 1 + (level * 0.2);
      }
    },
    {
      id: "auto_tap_speed",
      name: "Auto Tap Speed",
      description: "Increases auto tap speed by 25% per level",
      maxLevel: 3,
      tier: 2,
      cost: 2,
      requires: ["auto_tap_efficiency"],
      effect: (level) => 1 + (level * 0.25),
      applyEffect: (level) => {
        player.talentEffects.auto_tap_speed = 1 + (level * 0.25);
      }
    },
    {
      id: "dye_specialization",
      name: "Dye Specialization",
      description: "10% chance to double a random dye color on enemy defeat",
      maxLevel: 3,
      tier: 2,
      cost: 2,
      requires: ["dye_efficiency"],
      effect: (level) => level * 0.1,
      applyEffect: (level) => {
        player.talentEffects.dye_double_chance = level * 0.1;
      }
    },
    
    // Tier 3 - Expert talents
    {
      id: "auto_multi_tap",
      name: "Auto Multi-Tap",
      description: "Auto tap has a 15% chance per level to hit multiple times",
      maxLevel: 2,
      tier: 3,
      cost: 3,
      requires: ["auto_tap_speed"],
      effect: (level) => level * 0.15,
      applyEffect: (level) => {
        player.talentEffects.auto_multi_chance = level * 0.15;
      }
    },
    {
      id: "skill_efficiency",
      name: "Skill Efficiency",
      description: "Reduces skill upgrade costs by 10% per level",
      maxLevel: 2,
      tier: 3,
      cost: 3,
      requires: ["dye_specialization"],
      effect: (level) => 1 - (level * 0.1),
      applyEffect: (level) => {
        player.talentEffects.skill_cost_reduction = 1 - (level * 0.1);
      }
    },
    {
      id: "killing_momentum",
      name: "Killing Momentum",
      description: "Gain 25% increased damage for 5 seconds after defeating an enemy",
      maxLevel: 2,
      tier: 3,
      cost: 3,
      requires: ["critical_mastery"],
      effect: (level) => 1 + (level * 0.25),
      applyEffect: (level) => {
        // This effect is applied dynamically when an enemy is defeated
        player.talentEffects.kill_damage_boost.value = 1 + (level * 0.25);
        player.talentEffects.kill_damage_boost.active = false;
      }
    },
    
    // Tier 4 - Master talents
    {
      id: "auto_critical",
      name: "Auto Critical",
      description: "Auto taps have a 10% chance per level to critically hit",
      maxLevel: 1,
      tier: 4,
      cost: 5,
      requires: ["auto_multi_tap"],
      effect: (level) => level * 0.1,
      applyEffect: (level) => {
        player.talentEffects.auto_crit_chance = level * 0.1;
      }
    },
    {
      id: "dye_synergy",
      name: "Dye Synergy",
      description: "Gain 5% of other dye colors when collecting any dye",
      maxLevel: 1,
      tier: 4,
      cost: 5,
      requires: ["skill_efficiency"],
      effect: (level) => level * 0.05,
      applyEffect: (level) => {
        player.talentEffects.cross_dye_gain = level * 0.05;
      }
    },
    {
      id: "combo_master",
      name: "Combo Master",
      description: "Consecutive taps within 0.5s stack damage up to 50%",
      maxLevel: 1,
      tier: 4,
      cost: 5,
      requires: ["killing_momentum"],
      effect: (level) => ({ value: level * 0.1, maxStacks: 5 }),
      applyEffect: (level) => {
        player.talentEffects.consecutive_tap_bonus.value = level * 0.1;
        player.talentEffects.consecutive_tap_bonus.maxStacks = 5;
        player.talentEffects.consecutive_tap_bonus.stacks = 0;
      }
    }
  ],
  
  // Store player's purchased talents
  purchasedTalents: {},
  
  init: function() {
    console.log("PRESTIGE_TALENTS.init called");
    // Load saved talents
    const savedTalents = localStorage.getItem("pxjPrestigeTalents");
    if (savedTalents) {
      this.purchasedTalents = JSON.parse(savedTalents);
      // Apply all talent effects
      this.applyAllTalentEffects();
    }
    
    // Render the talent tree
    this.renderTalentTree();
    
    // Set up event listeners
    this.setupEventListeners();
  },
  
  // Apply all purchased talent effects
  applyAllTalentEffects: function() {
      // Reset talent effects to default values
      player.talentEffects = {
        tap_damage: 1,
        auto_tap_damage: 1,
        auto_tap_speed: 1,
        auto_multi_chance: 0,
        auto_crit_chance: 0,
        auto_tap_no_cooldown_chance: 0,
        dye_multiplier: 1,
        specific_dye_boost: { color: null, value: 1 },
        dye_double_chance: 0,
        critical_boost: { chance: 0, damage: 1 },
        kill_damage_boost: { active: false, value: 1, duration: 5, expires: 0 },
        skill_cost_reduction: 1,
        cross_dye_gain: 0,
        consecutive_tap_bonus: { value: 0, stacks: 0, maxStacks: 10, lastTapTime: 0 },
        tap_speed_damage: { value: 0, lastTapTime: 0, bonus: 0 }
      };
      
      // Apply effects from purchased talents
      if (this.purchasedTalents && Object.keys(this.purchasedTalents).length > 0) {
        Object.keys(this.purchasedTalents).forEach(talentId => {
          const talent = this.talents.find(t => t.id === talentId);
          if (!talent) return;
          
          const level = this.purchasedTalents[talentId];
          if (talent.applyEffect) {
            talent.applyEffect(level);
          }
        });
      }
    
    console.log("Applied talent effects:", player.talentEffects);
  },
  
  // Purchase a talent
  purchaseTalent: function(talentId) {
    // Instead of using this.getTalent, find the talent directly from the talents array
    const talent = this.talents.find(t => t.id === talentId);
    
    // Check if talent exists
    if (!talent) return false;
    
    // Check if talent is already at max level
    if (this.purchasedTalents[talentId] >= talent.maxLevel) return false;
    
    // Check if player has enough prestige points
    if (player.prestigePoints - player.allocatedPrestigePoints < talent.cost) return false;
    
    // Check if prerequisites are met
    if (talent.requires) {
      for (const reqId of talent.requires) {
        const reqTalent = this.talents.find(t => t.id === reqId);
        if (!reqTalent) continue;
        
        // Check if the required talent is at max level
        const reqLevel = this.purchasedTalents[reqId] || 0;
        if (reqLevel < reqTalent.maxLevel) return false;
      }
    }
    
    // Purchase the talent
    this.purchasedTalents[talentId] = (this.purchasedTalents[talentId] || 0) + 1;
    player.allocatedPrestigePoints += talent.cost;
    
    // Apply talent effect
    this.applyAllTalentEffects(talentId);
    
    // Save changes
    this.save();
    
    // Update the UI to show the new available prestige points
    this.updatePrestigePointsDisplay();

    // Update UI
    this.renderTalentTree();

    ui.notify(`${talent.name} upgraded to level ${this.purchasedTalents[talent.id]}!`, false);
    return true;
  },
  
  updatePrestigePointsDisplay: function() {
    // Update the prestige points display in the UI
    const pointsAvailable = document.querySelector("#prestige-upgrades .prestige-points-available .points-value");
    if (pointsAvailable) {
      pointsAvailable.textContent = (player.prestigePoints - player.allocatedPrestigePoints).toFixed(0);
    }
  },

  resetTalents: function() {
    // Don't modify player.prestigePoints, just reset allocatedPrestigePoints
    player.allocatedPrestigePoints = 0;
    
    // Reset purchased talents
    this.purchasedTalents = {};
    
    // Reset talent effects
    this.applyAllTalentEffects();
    
    // Save changes
    this.save();
    
    // Update prestige points display
    this.updatePrestigePointsDisplay();
    
    // Update UI
    this.renderTalentTree();
    
    // Notify player
    ui.notify("Talent allocations have been reset!", false);
    
    return true;
  },
  
  // Render the talent tree UI
  renderTalentTree: function() {    
    const container = document.getElementById("prestige-talent-tree");
    if (!container) return;
    
    // Clear container
    container.innerHTML = "";
    
    // Add info icon with tooltip
    const titleContainer = document.createElement("div");
    titleContainer.className = "talent-tree-title-container";
    
    const title = document.createElement("h2");
    title.textContent = "Prestige Talents";
    
    const infoIcon = document.createElement("span");
    infoIcon.className = "info-icon";
    infoIcon.textContent = "ℹ️";
    infoIcon.title = "Click for talent tree information";
    
    // Create tooltip content (hidden by default)
    const tooltip = document.createElement("div");
    tooltip.className = "talent-tree-tooltip";
    tooltip.innerHTML = `
      <p><strong>How to unlock talents:</strong></p>
      <p>• Tier 1 talents are available immediately</p>
      <p>• To unlock a talent in a higher tier, you must <strong>fully max out</strong> the connected talent in the previous tier</p>
      <p>• Gold borders indicate maxed talents</p>
    `;
    tooltip.style.display = "none";
    
    // Toggle tooltip on info icon click
    infoIcon.addEventListener("click", function(e) {
      e.stopPropagation();
      tooltip.style.display = tooltip.style.display === "none" ? "block" : "none";
    });
    
    // Hide tooltip when clicking elsewhere
    document.addEventListener("click", function() {
      tooltip.style.display = "none";
    });
    
    titleContainer.appendChild(title);
    titleContainer.appendChild(infoIcon);
    titleContainer.appendChild(tooltip);
    container.appendChild(titleContainer);
    
    // Create talent tree structure
    const treeContainer = document.createElement("div");
    treeContainer.className = "talent-tree-container";
    
    // Create SVG for connections
    const connections = document.createElement("svg");
    connections.className = "talent-connections";
    connections.setAttribute("width", "100%");
    connections.setAttribute("height", "100%");
    
    // Create nodes container
    const nodesContainer = document.createElement("div");
    nodesContainer.className = "talent-nodes";
    
    // Group talents by tier
    const tierGroups = {};
    this.talents.forEach(talent => {
      if (!tierGroups[talent.tier]) tierGroups[talent.tier] = [];
      tierGroups[talent.tier].push(talent);
    });
    
    // Create tier elements
    Object.keys(tierGroups).sort((a, b) => a - b).forEach(tier => {
      const tierDiv = document.createElement("div");
      tierDiv.className = "talent-tier";
      tierDiv.dataset.tier = tier;
      
      // Add talents to tier
      tierGroups[tier].forEach(talent => {
        const talentNode = document.createElement("div");
        talentNode.className = "talent-node";
        talentNode.dataset.talentId = talent.id;
        
        // Check if talent is available
        const isAvailable = this.isTalentAvailable(talent);
        const currentLevel = this.purchasedTalents[talent.id] || 0;
        const maxLevel = talent.maxLevel || 1;
        
        // Add appropriate classes
        if (currentLevel >= maxLevel) {
          talentNode.classList.add("purchased", "maxed");
        } else if (currentLevel > 0) {
          talentNode.classList.add("purchased");
        } else if (isAvailable) {
          talentNode.classList.add("available");
        } else {
          talentNode.classList.add("locked");
        }
        
        // Add talent content
        talentNode.innerHTML = `
          <div class="talent-icon">${talent.icon || '⚡'}</div>
          <div class="talent-name">${talent.name}</div>
          <div class="talent-description">${talent.description}</div>
          <div class="talent-level">${currentLevel}/${talent.maxLevel}</div>
          <div class="talent-cost">${talent.cost} points</div>
        `;
        
        // Add click event
        talentNode.addEventListener("click", () => {
          if (isAvailable) {
            this.purchaseTalent(talent.id);
          } else if (currentLevel === 0) {
            // Show a more informative message about why the talent is locked
            if (talent.requires) {
              const requiredTalents = talent.requires.map(reqId => {
                const reqTalent = this.talents.find(t => t.id === reqId);
                if (!reqTalent) return "unknown talent";
                
                const reqLevel = this.purchasedTalents[reqId] || 0;
                return `${reqTalent.name} (${reqLevel}/${reqTalent.maxLevel})`;
              }).join(", ");
              
              ui.notify(`This talent requires: ${requiredTalents} to be maxed out first!`, true);
            } else {
              ui.notify("This talent is not yet available!", true);
            }
          }
        });
        
        tierDiv.appendChild(talentNode);
      });
      
      nodesContainer.appendChild(tierDiv);


    });
    
    // Add connections between talents with clearer visual indication
    this.talents.forEach(talent => {
      if (talent.requires) {
        talent.requires.forEach(reqId => {
          const reqTalent = this.talents.find(t => t.id === reqId);
          if (reqTalent) {
            // Create connection line
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("class", "talent-connection");
            line.dataset.from = reqId;
            line.dataset.to = talent.id;
            
            // Check if connection should be active
            const reqLevel = this.purchasedTalents[reqId] || 0;
            const reqMaxLevel = reqTalent.maxLevel || 1;
            
            if (reqLevel >= reqMaxLevel && this.purchasedTalents[talent.id]) {
              line.classList.add("active");
            } else if (reqLevel >= reqMaxLevel) {
              line.classList.add("available");
            }
            
            connections.appendChild(line);
          }
        });
      }
    });
    
    // Add elements to container
    treeContainer.appendChild(connections);
    treeContainer.appendChild(nodesContainer);
    container.appendChild(treeContainer);
    
    // Position connection lines (after DOM is updated)
    setTimeout(() => this.positionConnectionLines(), 50);
    
    // Update prestige points display
    const pointsDisplay = document.getElementById("prestige-points-display");
    if (pointsDisplay) {
      pointsDisplay.textContent = `Available Points: ${player.prestigePoints - player.allocatedPrestigePoints}/${player.prestigePoints}`;
    }
  },
  
  // Check if a talent is available to be purchased
  isTalentAvailable: function(talent) {
    // Check if player has enough prestige points
    if (player.prestigePoints - player.allocatedPrestigePoints < talent.cost) {
      return false;
    }
    
    // Check if talent is already at max level
    const currentLevel = this.purchasedTalents[talent.id] || 0;
    if (currentLevel >= talent.maxLevel) {
      return false;
    }
    
    // Check if prerequisites are met
    if (talent.requires) {
      for (const reqId of talent.requires) {
        const requiredTalent = this.talents.find(t => t.id === reqId);
        if (!requiredTalent) continue;
        
        // Check if the required talent is fully unlocked (at max level)
        const reqLevel = this.purchasedTalents[reqId] || 0;
        if (reqLevel < requiredTalent.maxLevel) {
          return false;
        }
      }
    }
    
    return true;
  },
  
  // Position connection lines between talents
  positionConnectionLines: function() {
    const connections = document.querySelectorAll(".talent-connection");
    connections.forEach(connection => {
      const fromId = connection.dataset.from;
      const toId = connection.dataset.to;
      
      const fromNode = document.querySelector(`.talent-node[data-talent-id="${fromId}"]`);
      const toNode = document.querySelector(`.talent-node[data-talent-id="${toId}"]`);
      
      if (fromNode && toNode) {
        const fromRect = fromNode.getBoundingClientRect();
        const toRect = toNode.getBoundingClientRect();
        const svgRect = connection.parentElement.getBoundingClientRect();
        
        // Calculate center points
        const fromX = fromRect.left + fromRect.width/2 - svgRect.left;
        const fromY = fromRect.top + fromRect.height/2 - svgRect.top;
        const toX = toRect.left + toRect.width/2 - svgRect.left;
        const toY = toRect.top + toRect.height/2 - svgRect.top;
        
        // Set line attributes
        connection.setAttribute("x1", fromX);
        connection.setAttribute("y1", fromY);
        connection.setAttribute("x2", toX);
        connection.setAttribute("y2", toY);
      }
    });
  },
  
  // Set up event listeners
  setupEventListeners: function() {
    // Handle window resize for connection lines
    window.addEventListener("resize", () => {
      this.positionConnectionLines();
    });
  },
  
  // Save talents to localStorage
  save: function() {
    localStorage.setItem("pxjPrestigeTalents", JSON.stringify(this.purchasedTalents));
  }
};
