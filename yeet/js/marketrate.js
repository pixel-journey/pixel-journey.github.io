
(function ($) {

// Define the API endpoints
const apiUrlYEET = "https://alcor.exchange/api/v2/tokens/yeet-token.yeet";
const apiUrlPXJ = "https://alcor.exchange/api/v2/tokens/pxj-pixeljourney";
const apiUrlWAX = "https://alcor.exchange/api/v2/tokens/wax-eosio.token";
const apiUrlLSWAX = "https://alcor.exchange/api/v2/tokens/lswax-token.fusion";
const apiUrlLSW = "https://alcor.exchange/api/v2/tokens/lsw-lsw.alcor";
const apiUrlTOOLS = "https://alcor.exchange/api/v2/tokens/tools-stonkrewardx";

const apiUrlHolders = 'https://wax.light-api.net/api/holdercount/wax/token.yeet/YEET';




      // Function to fetch all token holders with pagination
    async function getTokenHolders() {
      try {
     // Fetch the data from the API
     const response = await fetch(apiUrlHolders);

     // Check if the response is OK
     if (!response.ok) {
       throw new Error(`An error occurred: ${response.statusText}`);
     }

     // Parse the response text (the API returns the holder count as plain text)
     const holderCount = await response.text();

     // Update the HTML with the holder count
     document.getElementById('yeet-holder-stat').textContent = holderCount;
     document.getElementById('yeet-holder-stat2').textContent = holderCount;
   } catch (error) {
     // Handle errors
     console.error('Error fetching holder count:', error);
     document.getElementById('yeet-holder-stat').textContent = "Error";
     document.getElementById('yeet-holder-stat2').textContent = "Error";
   }
      }

// Function to fetch the token prices and update the HTML
async function fetchAndUpdatePrice() {
  try {
    // Run all fetch requests concurrently using Promise.all
    const [responseYEET, responsePXJ, responseWAX, responseLSWAX, responseLSW, responseTOOLS] = await Promise.all([
      fetch(apiUrlYEET),
      fetch(apiUrlPXJ),
      fetch(apiUrlWAX),
      fetch(apiUrlLSWAX),
      fetch(apiUrlLSW),
      fetch(apiUrlTOOLS)
    ]);

    // Check if responses are OK
    if (!responseYEET.ok || !responsePXJ.ok || !responseWAX.ok || !responseLSWAX.ok || !responseLSW.ok || !responseTOOLS.ok) {
      throw new Error('An error occurred while fetching the token prices');
    }

    // Parse JSON responses concurrently
    const [dataYEET, dataPXJ, dataWAX, dataLSWAX, dataLSW, dataTOOLS] = await Promise.all([
      responseYEET.json(),
      responsePXJ.json(),
      responseWAX.json(),
      responseLSWAX.json(),
      responseLSW.json(),
      responseTOOLS.json()
    ]);

    const YEETPXJ = dataPXJ.system_price/dataYEET.system_price;
    const YEETLSW = dataLSW.system_price/dataYEET.system_price;
    const YEETLSWAX = dataLSWAX.system_price/dataYEET.system_price;
    const YEETTOOLS = dataTOOLS.system_price/dataYEET.system_price;

    // Update HTML with YEET prices
    document.getElementById('yeet-system-price').textContent = dataYEET.system_price.toFixed(2);
    document.getElementById('yeet-usd-price').textContent = dataYEET.usd_price.toFixed(6);
    document.getElementById('yeet-market-cap').textContent = (dataYEET.usd_price * 1000000000).toFixed(2);

    // Update HTML with PXJ prices
  //  document.getElementById('pxj-system-price').textContent = dataPXJ.system_price.toFixed(6);
    document.getElementById('pxj-yeet-price').textContent = YEETPXJ.toFixed(2);

    // Update HTML with WAX prices
    document.getElementById('wax-usd-price').textContent = dataWAX.usd_price.toFixed(2);

    // Update HTML with LSWAX prices
    document.getElementById('lswax-yeet-price').textContent = YEETLSWAX.toFixed(2);

    // Update HTML with LSW prices
    document.getElementById('lsw-yeet-price').textContent = YEETLSW.toFixed(2);

    // Update HTML with TOOLS prices
    document.getElementById('tools-yeet-price').textContent = YEETTOOLS.toFixed(2);



            getTokenHolders();

  } catch (error) {
    console.error("Error fetching or updating token prices:", error);
  }
}


// Set an interval to continuously fetch the data and update the UI every 10 seconds
setInterval(fetchAndUpdatePrice, 10000);

// Fetch the price immediately when the page loads
fetchAndUpdatePrice();




})(jQuery);
