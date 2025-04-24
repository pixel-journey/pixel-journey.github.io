const SHOP = {
  boosters: [
    {
      id: 'autoTap30s',
      name: 'Auto Tap',
      icon: '🤖',
      duration: 30,
      cost: { red: 100, blue: 100, yellow: 100 },
      description: 'Automatically taps the enemy every second',
      effect: function() { player.activateBooster('autoTap30s'); }
    },
    {
      id: 'doubleDye60s',
      name: 'Double Dye',
      icon: '🎨',
      duration: 60,
      cost: { red: 150, blue: 150, yellow: 150 },
      description: 'Doubles all dye earned from taps and kills',
      effect: function() { player.activateBooster('doubleDye60s'); }
    },
    {
      id: 'critChance30s',
      name: 'Critical Chance',
      icon: '⚡',
      duration: 30,
      cost: { red: 200, blue: 200, yellow: 200 },
      description: 'Increases critical hit chance by 10%',
      effect: function() { player.activateBooster('critChance30s'); }
    },
    {
      id: 'megaTap10s',
      name: 'Mega Tap',
      icon: '👊',
      duration: 10,
      cost: { red: 300, blue: 300, yellow: 300 },
      description: 'Triples your tap damage for a short time',
      effect: function() { player.activateBooster('megaTap10s'); }
    },
    {
      id: 'colorRush45s',
      name: 'Color Rush',
      icon: '🌈',
      duration: 45,
      cost: { red: 250, blue: 250, yellow: 250 },
      description: 'Increases chance of higher tier ingredients',
      effect: function() { player.activateBooster('colorRush45s'); }
    }
  ],

  purchaseBooster: function(id) {
    var booster = this.boosters.find(function(b) { return b.id === id; });
    if (!booster) return;
    var duration = booster.duration;
    if (player.skills.shop_booster_duration) {
      duration *= SKILLS.find(function(s) { return s.id === 'shop_booster_duration'; }).getEffect(player.skills.shop_booster_duration);
    }
    booster.duration = Math.ceil(duration);
    var red = booster.cost.red;
    var blue = booster.cost.blue;
    var yellow = booster.cost.yellow;
    if (
      player.dye.red >= red &&
      player.dye.blue >= blue &&
      player.dye.yellow >= yellow
    ) {
      player.dye.red -= red;
      player.dye.blue -= blue;
      player.dye.yellow -= yellow;
      booster.effect();
      ui.notify('Purchased ' + booster.name);
      ui.updateCurrencyBar();
      ui.togglePanel('shop-panel'); // Close shop panel
    } else {
      ui.notify('Not enough dye for ' + booster.name, true);
    }
  },

  renderShop: function() {
    var shopEl = document.getElementById('shop-items');
    shopEl.innerHTML = '';
    this.boosters.forEach(function(booster) {
      var btn = document.createElement('button');
      btn.className = 'sidebar-btn';
      btn.innerHTML =
        '<div class="shop-icon">' + booster.icon + '</div>' +
        '<div class="shop-name">' + booster.name + '</div>' +
        '<div class="shop-desc">Cost: 🔴 ' + booster.cost.red.toFixed(1) + ' 🔵 ' + booster.cost.blue.toFixed(1) + ' 🟡 ' + booster.cost.yellow.toFixed(1) + '</div>';
      btn.onclick = function() { SHOP.purchaseBooster(booster.id); };
      shopEl.appendChild(btn);
    });
  }
};
