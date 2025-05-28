// YEET Airdrop Visualization Script

(function($) {
  // Initialize the visualization when document is ready
  $(document).ready(function() {
    initAirdropVisualization();
  });

  function initAirdropVisualization() {
    // Create the airdrop section container
    const totalYeet = calculateTotalYeet();
    const formattedTotal = (totalYeet / 1000000).toFixed(2);
    
    // Generate the HTML for the collections table
    let tableHTML = `
      <div class="table-responsive">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>Collection</th>
              <th>Total YEET</th>
              <th>YEET per NFT</th>
              <th>Top Holder YEET</th>
              <th>Top Holder WAX Value</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    // Sort collections by total YEET (highest first)
    const sortedCollections = [...yeetAirdropData.collections].sort((a, b) => b.totalYeet - a.totalYeet);
    
    // Add each collection to the table
    sortedCollections.forEach(collection => {
      const totalYeetFormatted = (collection.totalYeet / 1000000).toFixed(2) + 'M';
      const yeetPerNFTFormatted = collection.yeetPerNFT ? collection.yeetPerNFT.toFixed(4) : 'N/A';
      const topHolderYeetFormatted = (collection.topHolder.yeet / 1000).toFixed(1) + 'K';
      const topHolderWaxFormatted = (collection.topHolder.waxValue / 1000).toFixed(1) + 'K';
      
      tableHTML += `
        <tr>
          <td>${collection.name}</td>
          <td>${totalYeetFormatted}</td>
          <td>${yeetPerNFTFormatted}</td>
          <td>${topHolderYeetFormatted}</td>
          <td>${topHolderWaxFormatted}</td>
        </tr>
      `;
    });
    
    tableHTML += `
          </tbody>
        </table>
      </div>
    `;
    
    // Create the summary statistics
    const totalCollections = yeetAirdropData.collections.length;
    const averageYeetPerCollection = (totalYeet / totalCollections / 1000000).toFixed(2);
    
    // Find the collection with the highest top holder
    const highestTopHolder = sortedCollections.reduce((max, collection) => 
      collection.topHolder.yeet > max.topHolder.yeet ? collection : max, sortedCollections[0]);
    
    // Create the summary HTML
    const summaryHTML = `
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card bg-light">
            <div class="card-body text-center">
              <h3 class="text-custom">${formattedTotal}M</h3>
              <p class="mb-0">Total YEET Distributed</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-light">
            <div class="card-body text-center">
              <h3 class="text-custom">${totalCollections}</h3>
              <p class="mb-0">Collections Supported</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-light">
            <div class="card-body text-center">
              <h3 class="text-custom">${averageYeetPerCollection}M</h3>
              <p class="mb-0">Avg YEET Per Collection</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card bg-light">
            <div class="card-body text-center">
              <h3 class="text-custom">${(highestTopHolder.topHolder.yeet / 1000).toFixed(1)}K</h3>
              <p class="mb-0">Highest Top Holder (${highestTopHolder.name})</p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Create a pie chart for the top 10 collections by YEET distribution
    const top10Collections = sortedCollections.slice(0, 10);
    const chartData = {
      labels: top10Collections.map(c => c.name),
      datasets: [{
        data: top10Collections.map(c => c.totalYeet),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#8AC249', '#EA5F89', '#00A69C', '#B2B2B2'
        ]
      }]
    };
    
    // Add the chart container
    const chartHTML = `
      <div class="row mb-5">
        <div class="col-md-8 offset-md-2">
          <div class="card">
            <div class="card-header bg-custom text-white">
              <h5 class="mb-0">Top 10 Collections by YEET Distribution</h5>
            </div>
            <div class="card-body">
              <canvas id="yeetDistributionChart" width="400" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Combine all elements
    const airdropSectionHTML = `
      <section class="section" id="airdrops">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="title text-center mb-5">
                <h3 class="font-weight-600 mb-3">YEET Airdrop Distribution</h3>
                <p class="text-muted">Detailed breakdown of YEET token distribution across over ${totalCollections} collections in the WAX ecosystem (remaining ~12.5% of YEET total supply shared by WAXP/LSW/LSWAX/stablecoin holders and LP-position owners).</p>
              </div>
            </div>
          </div>
          
          ${summaryHTML}
          
          ${chartHTML}
          
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header bg-custom text-white d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">Collection Details</h5>
                  <button class="btn btn-sm btn-light" id="toggleAirdropTable">Show/Hide Details</button>
                </div>
                <div class="card-body airdrop-table-container" style="display: none;">
                  ${tableHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    
    // Insert the airdrop section before the roadmap
    $('#roadmap').before(airdropSectionHTML);
    
    // Initialize the toggle functionality for the table
    $('#toggleAirdropTable').on('click', function() {
      $('.airdrop-table-container').slideToggle();
    });
    
    // Initialize the chart if Chart.js is available
    if (typeof Chart !== 'undefined') {
      const ctx = document.getElementById('yeetDistributionChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
          responsive: true,
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'YEET Distribution by Collection'
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
    } else {
      console.warn('Chart.js is not available. Please include Chart.js library for visualization.');
    }
  }
})(jQuery);