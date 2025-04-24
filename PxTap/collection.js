const COLLECTION = {
  items: [],

  init: function() {
    // Initialize collection with all possible ingredients
    for (let tier = 1; tier <= 3; tier++) {
      const colors = CONSTANTS.COLORS[tier];
      colors.forEach(color => {
        this.items.push({
          id: `${tier}_${color}`,
          name: color.replace('_', ' '),
          tier: tier,
          color: color,
          discovered: false,
          count: 0
        });
      });
    }

    // Load saved collection data
    const savedCollection = localStorage.getItem('pxjCollection');
    if (savedCollection) {
      const savedItems = JSON.parse(savedCollection);
      savedItems.forEach(savedItem => {
        const item = this.items.find(i => i.id === savedItem.id);
        if (item) {
          item.discovered = savedItem.discovered;
          item.count = savedItem.count;
        }
      });
    }
  },

  discoverIngredient: function(tier, color) {
    const item = this.items.find(i => i.tier === tier && i.color === color);
    if (item && !item.discovered) {
      item.discovered = true;
      item.count = 1;
      this.save();

      // Trigger achievement notification
      ACHIEVEMENTS.checkCollection();

      return true; // New discovery
    } else if (item) {
      item.count++;
      this.save();
      return false; // Already discovered
    }
    return false;
  },

  getCompletionPercentage: function() {
    const discovered = this.items.filter(i => i.discovered).length;
    return Math.floor((discovered / this.items.length) * 100);
  },

  getTierCompletionPercentage: function(tier) {
    const tierItems = this.items.filter(i => i.tier === tier);
    const discovered = tierItems.filter(i => i.discovered).length;
    return Math.floor((discovered / tierItems.length) * 100);
  },

  renderCollection: function() {
    const content = document.getElementById('collection-content');
    content.innerHTML = '';

    // Add completion stats
    const statsDiv = document.createElement('div');
    statsDiv.className = 'collection-stats';
    statsDiv.innerHTML = `
      <h3>Collection Completion: ${this.getCompletionPercentage()}%</h3>
      <div class="tier-stats">
        <div>Tier 1: ${this.getTierCompletionPercentage(1)}%</div>
        <div>Tier 2: ${this.getTierCompletionPercentage(2)}%</div>
        <div>Tier 3: ${this.getTierCompletionPercentage(3)}%</div>
      </div>
    `;
    content.appendChild(statsDiv);

    // Create tier sections
    for (let tier = 1; tier <= 3; tier++) {
      const tierSection = document.createElement('div');
      tierSection.className = 'collection-section';

      const tierHeader = document.createElement('h3');
      tierHeader.textContent = `Tier ${tier} Ingredients`;
      tierSection.appendChild(tierHeader);

      const tierGrid = document.createElement('div');
      tierGrid.className = 'collection-grid';

      // Filter items for this tier
      const tierItems = this.items.filter(i => i.tier === tier);

      // Create item elements
      tierItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = `collection-item ${item.discovered ? '' : 'locked'}`;

        if (item.discovered) {
          itemElement.innerHTML = `
            <div class="collection-icon" style="filter: ${CONSTANTS.colorFilters[item.color]}">🧪</div>
            <div class="collection-name">${item.name}</div>
            <div class="collection-count">×${item.count}</div>
            <div class="collection-rarity">Tier ${item.tier}</div>
          `;
        } else {
          itemElement.innerHTML = `
            <div class="collection-icon">❓</div>
            <div class="collection-name">Unknown</div>
            <div class="collection-rarity">Tier ${item.tier}</div>
          `;
        }

        tierGrid.appendChild(itemElement);
      });

      tierSection.appendChild(tierGrid);
      content.appendChild(tierSection);
    }
  },

  save: function() {
    localStorage.setItem('pxjCollection', JSON.stringify(this.items));
  }
};
