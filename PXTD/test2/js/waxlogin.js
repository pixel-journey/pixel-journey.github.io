// Initialize WAXJS with the WAX Sweden RPC endpoint and auto-login enabled
const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://api.waxsweden.org',
    tryAutoLogin: true
});


    const tokenRanges = {
        WAX: { min: 1, max: 50000 },
        PXJ: { min: 100, max: 5000000 },
        WUF: { min: 1000000, max: 1000000000 }
    };


// Global variable to track the logged-in user
let userAccount = null;


async function fetchUserAssets(userAccount) {
    const collectionName = 'pixeljourney'; // Replace with your collection name
    const url = `https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${userAccount}&collection_name=${collectionName}&page=1&limit=1000`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch assets');
        const data = await response.json();
        return data.data; // Array of asset objects
    } catch (error) {
        console.error('Error fetching user assets:', error);
        return [];
    }
}

const templates = [
  { id: "781515", name: "Pixal PFP", bonusEffect: 0.05 },
  { id: "820134", name: "Pixel Ingredient Pack", bonusEffect: 0.05 },
  { id: "858568", name: "Black (Primary)", bonusEffect: 0.5 },
  { id: "858569", name: "Red (Primary)", bonusEffect: 0.01 },
  { id: "858570", name: "Yellow (Primary)", bonusEffect: 0.01 },
  { id: "858571", name: "Blue (Primary)", bonusEffect: 0.01 },
  { id: "858572", name: "Green (Secondary)", bonusEffect: 0.03 },
  { id: "858573", name: "Orange (Secondary)", bonusEffect: 0.03 },
  { id: "858574", name: "Purple (Secondary)", bonusEffect: 0.03 },
  { id: "858575", name: "Amber (Tertiary)", bonusEffect: 0.1 },
  { id: "858576", name: "Chartreuse (Tertiary)", bonusEffect: 0.1 },
  { id: "858577", name: "Violet (Tertiary)", bonusEffect: 0.1 },
  { id: "858578", name: "Teal (Tertiary)", bonusEffect: 0.1 },
  { id: "858580", name: "Vermillion (Tertiary)", bonusEffect: 0.1 },
  { id: "859273", name: "Magenta (Tertiary)", bonusEffect: 0.1 }
];

function countUserTemplates(assets) {
    const templateCounts = {};
    assets.forEach(asset => {
        const templateId = asset.template.template_id;
        templateCounts[templateId] = (templateCounts[templateId] || 0) + 1;
    });
    return templateCounts; // e.g., { '12345': 2, '67890': 1 }
}

function populateBoostersTable(templateCounts) {
    const tbody = document.getElementById('boosters-table-body');
    tbody.innerHTML = ''; // Clear existing rows
    let totalBonus = 0;

    templates.forEach(template => {
        if (template.bonusEffect && templateCounts[template.id]) {
            const amountHeld = templateCounts[template.id];
            const totalEffectBonus = template.bonusEffect * amountHeld;
            totalBonus += totalEffectBonus;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${template.name}</td>
                <td>${template.bonusEffect}%</td>
                <td>${amountHeld}</td>
                <td>${totalEffectBonus}%</td>
            `;
            tbody.appendChild(row);
        }
    });

    // Add a total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total Bonus</strong></td>
        <td><strong>${totalBonus}%</strong></td>
    `;
    tbody.appendChild(totalRow);
}

async function onLoginSuccess(userAccount) {
    const assets = await fetchUserAssets(userAccount);
    const templateCounts = countUserTemplates(assets);
    populateBoostersTable(templateCounts);
    let totalBonus = 0;
      templates.forEach(template => {
        if (templateCounts[template.id]) totalBonus += template.bonusEffect * templateCounts[template.id];
      });
      gameState.boosterPoints = Math.floor(totalBonus); // Convert % to points
      updateBoostersUI();
    }

    function updateBoostersUI() {
      const boosterSection = document.getElementById("pxj-boosters-section");
      if (boosterSection) {
        boosterSection.style.display = "block";
        const h2 = boosterSection.querySelector("h2");
        if (h2) {
          h2.textContent = `PXJourney Boosters (${gameState.boosterPoints} points)`;
        }
      }
    }

    const SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbz4zOQAj7s_eQ7wfwtTm-kS8q5GsRPLPjFwE-2wnoXgWChIBza_uxeRRKGQOor-4BBHlA/exec";
    // SCRIPT ON SHEETS:
    // function doPost(e) {
    //   var sheetName = data.type === "highscore" ? "HighScores" : "Logs";
    //   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    //   const data = JSON.parse(e.postData.contents);
    //
    //
    //   if (data.type === "highscore") {
    //   sheet.appendRow([
    //     new Date(),
    //     data.player || '',
    //     data.totalCredits || 0,
    //     data.wave || 0,
    //     data.damage || 0,
    //     data.wallet || '',
    //     data.gameMode || '',
    //     data.notes || ''
    //   ]);
    //   } else if (data.type === "log") {
    //     sheet.appendRow([data.username, data.eventLog, data.boardConfig, new Date()]);
    //   }
    //
    //
    //
    //   return ContentService
    //     .createTextOutput(JSON.stringify({status: 'success'}))
    //     .setMimeType(ContentService.MimeType.JSON);
    // }


    document.getElementById("submit-log-btn").addEventListener("click", () => {
      const playerName = localStorage.getItem("playerName") || "Guest";
      const wallet = localStorage.getItem("wallet") || "NotConnected";

      const logData = {
        player: playerName,
        totalCredits: gameState.totalCredits,
        wave: gameState.wave,
        //damage: calculateTotalDamage(), // Replace or implement this
        wallet: wallet,
        gameMode: gameState.gameMode,
        notes: "Submitted from PxTD"
      };

      fetch(SHEETS_ENDPOINT, {
        method: "POST",
        mode: "no-cors", // bypass CORS for simple logging
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "log", logData })
      }).then(() => {
        logEvent("Gameplay data submitted to Google Sheets.");
        showNotification("Log submitted. Thank you!", "success");
      }).catch(err => {
        logEvent("Failed to submit log.");
        showNotification("Error submitting log.", "error");
      });
    });


// Login function to authenticate the user and display their account and trust score
async function login() {
    console.log('Login function called');
    const loginResponse = document.getElementById('loginresponse');
    loginResponse.innerHTML = ''; // Clear previous messages

    try {
        console.log('Attempting to login with WaxJS');
        userAccount = await wax.login();
        console.log('Login successful, userAccount:', userAccount);
        const trustScore = wax.trustScore || 'Not available'; // Handle undefined trustScore

        // Hide the "Connect Wax" button
        const connectButton = document.getElementById('connect-wax-btn');
        connectButton.style.display = 'none';

        // Show the logout button
        document.getElementById('logout-wax-btn').style.display = 'block';

        // Create and insert the "Logged In" button
        const loggedInButton = document.createElement('div');
        loggedInButton.id = 'logged-in-btn';
        loggedInButton.className = 'sidebar-btn';
        loggedInButton.textContent = `Logged in as ${userAccount}`;
        loggedInButton.style.display = 'block';
        connectButton.parentNode.insertBefore(loggedInButton, connectButton.nextSibling);

        // Add event listener to open the modal
        loggedInButton.addEventListener('click', () => {
            const modal = document.getElementById('wax-user-modal');
            const modalInfo = document.getElementById('wax-modal-user-info');
            modalInfo.innerHTML = `Account: <strong>${userAccount}</strong><br/>Trust Score: ${trustScore}`;
            modal.style.display = 'block';
        });

        await onLoginSuccess(userAccount); // Add this line

        document.getElementById('donate-btn').disabled = false;
    } catch (e) {
        loginResponse.innerHTML = `Login failed: ${e.message}`;
        console.error('Login Error:', e);
    }
}

// Logout function to clear the user state and reset the UI
function logout() {
    userAccount = null;
    const loginResponse = document.getElementById('loginresponse');
    loginResponse.innerHTML = ''; // Clear the login response

    // Show the "Connect Wax" button and hide the logout button
    const connectButton = document.getElementById('connect-wax-btn');
    connectButton.style.display = 'block';
    document.getElementById('logout-wax-btn').style.display = 'none';

    // Hide and remove the "Logged In" button
    const loggedInButton = document.getElementById('logged-in-btn');
    if (loggedInButton) {
        loggedInButton.remove(); // Remove the button from the DOM
    }

    // Disable the donate-btn button
    document.getElementById('donate-btn').disabled = true;

    // Clear the transaction response
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = 'Transaction Response\n';
}

async function donate() {
    const responseElement = document.getElementById('response');
    responseElement.innerHTML = 'Transaction Response\n';

    if (!wax.api) {
        responseElement.insertAdjacentHTML('beforeend', '* Please login first *');
        return;
    }

    try {
        // Get user inputs
        const selectedToken = document.querySelector('input[name="token"]:checked').value;
        const amount = document.getElementById('amount-slider').value;
        const contract = getContractForToken(selectedToken);
        const quantity = `${parseFloat(amount).toFixed(8)} ${selectedToken}`;

        // Construct and send the transaction
        const result = await wax.api.transact({
            actions: [{
                account: contract,
                name: 'transfer',
                authorization: [{
                    actor: wax.userAccount,
                    permission: 'active',
                }],
                data: {
                    from: wax.userAccount,
                    to: 'dev.pxj',
                    quantity: quantity,
                    memo: 'Donation from PxTD',
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        });

        responseElement.insertAdjacentHTML('beforeend', JSON.stringify(result, null, 2));
        console.log('Transaction Result:', result);
    } catch (e) {
        responseElement.insertAdjacentHTML('beforeend', `Transaction failed: ${e.message}`);
        console.error('Transaction Error:', e);
    }
}

function getContractForToken(token) {
    switch (token) {
        case 'WUF': return 'wuffi';
        case 'PXJ': return 'pixeljourney';
        case 'WAX': return 'eosio.token';
        default: throw new Error('Invalid token selected');
    }
}

function formatAmount(amount) {
    if (amount >= 1000000000) {
        return (amount / 1000000000) + 'B'; // Billions
    } else if (amount >= 1000000) {
        return (amount / 1000000) + 'M';    // Millions
    } else if (amount >= 10000) {
        return (amount / 1000) + 'K';       // Thousands
    } else {
        return amount;                      // Less than 10,000
    }
}

function setupWaxElements() {
    const mobileMenus = document.getElementById('left-sidebar');
    if (!mobileMenus) {
        console.error('Mobile menus container not found!');
        return;
    }

    // Add login response paragraph (keep existing functionality)
    const loginResponse = document.createElement('p');
    loginResponse.id = 'loginresponse';
    loginResponse.style.color = '#ef9d47';
    mobileMenus.appendChild(loginResponse);

    // Update amount display when slider moves
    document.getElementById('amount-slider').addEventListener('input', function() {
        const amount = this.value;
        document.getElementById('amount-display').textContent = `${parseFloat(amount).toFixed(8)}`;
    });
}

// Check for auto-login on page load
async function checkAutoLogin() {
    if (wax.userAccount) {
        userAccount = wax.userAccount;
        const trustScore = wax.trustScore || 'Not available';
        const loginResponse = document.getElementById('loginresponse');

        // Update UI for auto-login
        const connectButton = document.getElementById('connect-wax-btn');
        connectButton.style.display = 'none';
        document.getElementById('logout-wax-btn').style.display = 'block';

        // Create and insert the "Logged In" button
        const loggedInButton = document.createElement('div');
        loggedInButton.id = 'logged-in-btn';
        loggedInButton.className = 'sidebar-btn';
        loggedInButton.textContent = `Logged in as ${userAccount}`;
        loggedInButton.style.display = 'block';
        connectButton.parentNode.insertBefore(loggedInButton, connectButton.nextSibling);

        // Add event listener to open the modal
        loggedInButton.addEventListener('click', () => {
            const modal = document.getElementById('wax-user-modal');
            const modalInfo = document.getElementById('wax-modal-user-info');
            modalInfo.innerHTML = `Account: <strong>${userAccount}</strong><br/>Trust Score: ${trustScore}`;
            modal.style.display = 'block';
        });

        document.getElementById('donate-btn').disabled = false;
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically add the necessary elements
    setupWaxElements();

    // Attach login function to the existing "Connect Wax" button
    const connectButton = document.getElementById('connect-wax-btn');
    if (connectButton) {
        connectButton.addEventListener('click', login);
    } else {
        console.error('Connect Wax button not found!');
    }

    // Attach logout function to the dynamically created logout button
    const logoutButton = document.getElementById('logout-wax-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    const donateButton = document.getElementById('donate-btn');
        if (donateButton) {
            donateButton.addEventListener('click', donate);
        }

        // Get DOM elements
const slider = document.getElementById('amount-slider');
const amountDisplay = document.getElementById('amount-display');
const tokenRadios = document.querySelectorAll('input[name="token"]');

// Function to update slider and display
function updateSlider(token) {
    const range = tokenRanges[token];
    slider.min = range.min;
    slider.max = range.max;
    slider.value = range.min; // Start at minimum
    amountDisplay.textContent = formatAmount(parseFloat(slider.value));
}

// Initialize with default token (WUF)
updateSlider('WAX');

// Update slider when token changes
tokenRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        updateSlider(this.value);
    });
});

// Update display when slider moves
slider.addEventListener('input', function() {
    amountDisplay.textContent = formatAmount(parseFloat(this.value));
});


    // Modal close functionality
    const modal = document.getElementById('wax-user-modal');
    const closeButton = document.querySelector('.wax-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Check for auto-login
    checkAutoLogin();
});
