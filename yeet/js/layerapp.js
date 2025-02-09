$(document).ready(function () {
      const collectionName = 'pixeljourney'; // Replace with your collection name
      const templateId = '781515'; // Replace with your template ID
    let nftList = [];   // Stores all NFTs
    let burnedCount = 0; // Count of burned NFTs
    let page = 1;       // Start pagination at page 1
    const delay = 100;  // Delay between API requests (in milliseconds)
    let isFetching = false;

    // Function to load NFTs with pagination and delay
    function loadNFTs(page) {
        if (isFetching) return;  // Prevent overlapping requests
        isFetching = true;

        const apiUrl = `https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=${collectionName}&template_id=${templateId}&page=${page}`;

        // Fetch the NFTs from the collection template
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const assets = data.data;

                // Append new NFTs to the existing list
                nftList = nftList.concat(assets);

                // Check if an NFT is burned by looking at the burned_at_block and burned_at_time fields
                assets.forEach(nft => {
                    if (nft.burned_at_block !== null || nft.burned_at_time !== null) {
                        burnedCount++;
                    }
                });

                // If 100 assets were returned, there might be more, so fetch the next page
                if (assets.length === 100) {
                    setTimeout(() => {
                        loadNFTs(page + 1); // Fetch the next batch (next page) with delay
                    }, delay);
                } else {
                    isFetching = false;  // No more NFTs to load
                    populateNFTDropdown(nftList);  // Populate dropdown with the full list of NFTs

                    loadNFT(nftList[0].data.img);  // Load the first NFT (mint 1 by default)

                    // Display burned count
                    $('#burnedCount').text(burnedCount);
                }
            })
            .catch(error => {
                console.error('Error fetching NFTs:', error);
            });
    }

    // Function to populate the NFT select dropdown
    function populateNFTDropdown(nfts) {
        $('#nftSelect').empty();
        nfts.forEach((nft, index) => {
            $('#nftSelect').append(`<option value="${nft.asset_id}" data-img="${nft.data.img}" ${index === 0 ? 'selected' : ''}>${nft.name} (Mint ${nft.template_mint})</option>`);
        });
    }

    // Handle search input to filter NFT options
    $('#nftSearch').on('input', function () {
        const searchTerm = $(this).val().toLowerCase();
        const filteredNFTs = nftList.filter(nft => nft.name.toLowerCase().includes(searchTerm));
        populateNFTDropdown(filteredNFTs);

        if (filteredNFTs.length > 0) {
            loadNFT(filteredNFTs[0].data.img);  // Load the first NFT of the filtered list
        } else {
            $('#nftImage').attr('src', '');  // Clear the image if no NFTs match
        }
    });

    // Handle NFT selection change
    $('#nftSelect').change(function () {
        const selectedNFT = $(this).find(':selected').data('img');
        loadNFT(selectedNFT);
    });

    // Load the selected NFT image
    function loadNFT(imgHash) {
        const imgUrl = imgHash ? `https://ipfs.io/ipfs/${imgHash}` : 'default-image-url';
        $('#nftImage').attr('src', imgUrl);
        loadLayers();
    }

    // Handle layer selection change
    $('#layer1Select, #layer2Select').change(function () {
        loadLayers();
    });

    // Load layers on top of the NFT
    function loadLayers() {
        const layer1 = $('#layer1Select').val();
        const layer2 = $('#layer2Select').val();

        if (layer1) {
            $('#layer1Image').attr('src', `path_to_layer_images/${layer1}`).show();
        } else {
            $('#layer1Image').hide();
        }

        if (layer2) {
            $('#layer2Image').attr('src', `path_to_layer_images/${layer2}`).show();
        } else {
            $('#layer2Image').hide();
        }
    }

    // Export/Save the final NFT + layers combination
    $('#exportBtn').click(function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;

        // Draw NFT and layers onto the canvas
        const nftImage = document.getElementById('nftImage');
        const layer1Image = document.getElementById('layer1Image');
        const layer2Image = document.getElementById('layer2Image');

        context.drawImage(nftImage, 0, 0, canvas.width, canvas.height);
        if (layer1Image.style.display !== 'none') {
            context.drawImage(layer1Image, 0, 0, canvas.width, canvas.height);
        }
        if (layer2Image.style.display !== 'none') {
            context.drawImage(layer2Image, 0, 0, canvas.width, canvas.height);
        }

        // Convert canvas to an image and download
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'combined-nft.png';
        link.click();
    });

    // Start loading NFTs with pagination and delay
    loadNFTs(page);
});
