// console.log("wallet.js loaded")
const WALLET = {
  userAccount: null,
  wax: null,

  templates: [
    { id: "781515", name: "Pixal PFP", bonusEffect: 1 },
    { id: "820134", name: "Pixel Ingredient Pack", bonusEffect: 1 },
    { id: "858568", name: "Black (Primary)", bonusEffect: 1 },
    { id: "858569", name: "Red (Primary)", bonusEffect: 1 },
    { id: "858570", name: "Yellow (Primary)", bonusEffect: 1 },
    { id: "858571", name: "Blue (Primary)", bonusEffect: 1 },
    { id: "858572", name: "Green (Secondary)", bonusEffect: 1 },
    { id: "858573", name: "Orange (Secondary)", bonusEffect: 1 },
    { id: "858574", name: "Purple (Secondary)", bonusEffect: 1 },
    { id: "858575", name: "Amber (Tertiary)", bonusEffect: 1 },
    { id: "858576", name: "Chartreuse (Tertiary)", bonusEffect: 1 },
    { id: "858577", name: "Violet (Tertiary)", bonusEffect: 1 },
    { id: "858578", name: "Teal (Tertiary)", bonusEffect: 1 },
    { id: "858580", name: "Vermillion (Tertiary)", bonusEffect: 1 },
    { id: "859273", name: "Magenta (Tertiary)", bonusEffect: 1 },
  ],

  init: function () {
    // console.log("WALLET.init called")
    if (typeof waxjs === "undefined") {
      console.error("waxjs is not defined. Ensure waxjs.min.js is loaded.")
      ui.notify("WAX wallet integration unavailable. Playing in Guest Mode.", true)
      this.guestMode()
      return
    }
    this.wax = new waxjs.WaxJS({
      rpcEndpoint: "https://api.waxsweden.org",
      tryAutoLogin: true,
    })
    // Setup modal event listeners
    const guestBtn = document.getElementById("guest-btn")
    const waxBtn = document.getElementById("wax-login-btn")
    if (guestBtn) {
      guestBtn.addEventListener("click", () => {
        // console.log("Guest button clicked")
        this.guestMode()
      })
      // console.log("Guest button listener added")
    } else {
      console.error("Guest button not found")
    }
    if (waxBtn) {
      waxBtn.addEventListener("click", () => {
        // console.log("WAX login button clicked")
        this.login()
      })
      // console.log("WAX login button listener added")
    } else {
      console.error("WAX login button not found")
    }
    // Check for auto-login
    this.checkAutoLogin()
  },

  async fetchUserAssets(userAccount) {
    const collectionName = "pixeljourney"
    const url = `https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${userAccount}&collection_name=${collectionName}&page=1&limit=1000`
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch assets")
      const data = await response.json()
      return data.data
    } catch (error) {
      console.error("Error fetching user assets:", error)
      ui.notify("Failed to load NFT assets.", true)
      return []
    }
  },

  countUserTemplates(assets) {
    const templateCounts = {}
    assets.forEach((asset) => {
      const templateId = asset.template.template_id
      templateCounts[templateId] = (templateCounts[templateId] || 0) + 1
    })
    return templateCounts
  },

  calculateNFTBonus(templateCounts) {
    let totalBonus = 0
    this.templates.forEach((template) => {
      if (templateCounts[template.id]) {
        totalBonus += template.bonusEffect * templateCounts[template.id]
      }
    })
    return totalBonus
  },

  showWalletModal: () => {
    // console.log("WALLET.showWalletModal called")
    const modal = document.getElementById("wallet-modal")
    if (!modal) {
      console.error("Wallet modal not found!")
      return
    }
    modal.style.display = "flex"
    modal.classList.add("active")
    // console.log("Wallet modal displayed")
  },

  async login() {
    // console.log("WALLET.login called")
    if (!this.wax) {
      ui.notify("WAX wallet integration unavailable.", true)
      return
    }
    try {
      this.userAccount = await this.wax.login()
      const assets = await this.fetchUserAssets(this.userAccount)
      const templateCounts = this.countUserTemplates(assets)
      const nftBonus = this.calculateNFTBonus(templateCounts)
      player.setNFTBonus(nftBonus)
      ui.notify(`Logged in as ${this.userAccount}. NFT Bonus: ${nftBonus.toFixed(1)}%`, false)
      document.getElementById("wallet-modal").style.display = "none"
      document.getElementById("wallet-modal").classList.remove("active")
      document.getElementById("profile-btn").textContent = `👤 ${this.userAccount}`
      document.getElementById("wallet-connect-btn").style.display = "none"
      document.getElementById("wallet-logout-btn").style.display = "block"
      const profilePanel = document.getElementById("profile-panel")
      if (profilePanel.classList.contains('active')) {
        ui.showProfile();
      }

    } catch (e) {
      ui.notify(`Login failed: ${e.message}`, true)
      console.error("Login Error:", e)
    }
  },

  guestMode: () => {
    // console.log("WALLET.guestMode called")
    player.setNFTBonus(0)
    ui.notify("Playing in Guest Mode", false)
    const modal = document.getElementById("wallet-modal")
    if (modal) {
      modal.style.display = "none"
      modal.classList.remove("active")
    }
    document.getElementById("profile-btn").textContent = "👤 Guest"
    document.getElementById("wallet-connect-btn").style.display = "block"
    document.getElementById("wallet-logout-btn").style.display = "none"
  },

  logout: function () {
    // console.log("WALLET.logout called")
    this.userAccount = null
    player.setNFTBonus(0)
    ui.notify("Logged out", false)
    this.notifyListeners('logout', {});
    document.getElementById("profile-btn").textContent = "👤 Guest"
    document.getElementById("wallet-connect-btn").style.display = "block"
    document.getElementById("wallet-logout-btn").style.display = "none"
    this.showWalletModal()
  },

  async checkAutoLogin() {
    // console.log("WALLET.checkAutoLogin called")
    if (!this.wax) return
    if (this.wax.userAccount) {
      this.userAccount = this.wax.userAccount
      const assets = await this.fetchUserAssets(this.userAccount)
      const templateCounts = this.countUserTemplates(assets)
      const nftBonus = this.calculateNFTBonus(templateCounts)
      player.setNFTBonus(nftBonus)
      ui.notify(`Auto-logged in as ${this.userAccount}. NFT Bonus: ${nftBonus.toFixed(1)}%`, false)
      document.getElementById("wallet-modal").style.display = "none"
      document.getElementById("wallet-modal").classList.remove("active")
      document.getElementById("profile-btn").textContent = `👤 ${this.userAccount}`
      document.getElementById("wallet-connect-btn").style.display = "none"
      document.getElementById("wallet-logout-btn").style.display = "block"
      const profilePanel = document.getElementById("profile-panel")
      if (profilePanel.classList.contains('active')) {
        ui.renderProfile();
      }
    }
  },
}
