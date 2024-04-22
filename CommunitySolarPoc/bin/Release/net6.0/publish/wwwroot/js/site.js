// Your API key - replace with your actual API key
const apiKey = 'AIzaSyBwzMj6Ih6b56d5jiom1hDY1q_KyTGsGFc';

// Function to build the GeoTIFF URL with the API key
function buildGeoTiffUrl(id) {
    return `https://solar.googleapis.com/v1/geoTiff:get?id=${encodeURIComponent(id)}&key=${encodeURIComponent(apiKey)}`;
}

// Initialize Google Maps with a default center
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.7685, lng: -86.1580 }, // Updated to match the JSON provided
        zoom: 40
    });
}

// Function to submit coordinates and request solar data from the server
function submitCoordinates(actionName) {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lng = parseFloat(document.getElementById('longitude').value);
    const requestBody = JSON.stringify({ latitude: lat, longitude: lng });

    console.log(`Request URL: /Home/${actionName}`);
    console.log(`Request Body: ${requestBody}`);

    fetch(`/Home/${actionName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(`HTTP error! status: ${response.status}, message: ${error.message}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // Handle the data
        })
        .catch(error => {
            console.error('Error fetching solar data:', error.message);
        });
}


// Update the display with solar data
function updateSolarDataDisplay(data) {
    const solarDataDiv = document.getElementById('solar-data');
    solarDataDiv.innerHTML = `
        <p>Name: ${data.name}</p>
        <p>Center Latitude: ${data.center.latitude}</p>
        <p>Center Longitude: ${data.center.longitude}</p>
        <p>Imagery Date: ${data.imageryDate.year}-${data.imageryDate.month}-${data.imageryDate.day}</p>
        <p>Postal Code: ${data.postalCode}</p>
        <p>Administrative Area: ${data.administrativeArea}</p>
        // ... display more data as needed
    `;
}

// Handle loading environmental data and images
function handleEnvironmentalData(data) {
    // Load GeoTIFF images if URLs are available
    if (data.dsmUrl) loadTiffImage(buildGeoTiffUrl(data.dsmUrl), 'dsmCanvas');
    if (data.rgbUrl) loadTiffImage(buildGeoTiffUrl(data.rgbUrl), 'rgbCanvas');
    if (Array.isArray(data.hourlyShadeUrls)) {
        data.hourlyShadeUrls.forEach((url, index) => {
            createAndLoadTiffImage(buildGeoTiffUrl(url), index); // Assumes a function to create and load Tiff images
        });
    }
}

// Load and display TIFF images using XMLHttpRequest and the TIFF.js library
// Load and display TIFF images using XHR and tiff.js
function loadTiffImage(url, canvasId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        const tiff = new Tiff({ buffer: xhr.response });
        const canvas = tiff.toCanvas();
        if (canvas) {
            canvas.style.width = '100%';
            canvas.style.maxWidth = '800px';
            document.getElementById(canvasId).innerHTML = '';  // Clear previous images if any
            document.getElementById(canvasId).appendChild(canvas);
        }
    };
    xhr.onerror = function () {
        console.error("Error loading TIFF image.");
    };
    xhr.send();
}


// Event listeners for button clicks
document.getElementById('fetch-building-insights').addEventListener('click', () => submitCoordinates('GetBuildingInsights'));
document.getElementById('fetch-environmental-data').addEventListener('click', () => submitCoordinates('GetEnvironmentalData'));

// Initial map load with default coordinates
document.addEventListener('DOMContentLoaded', initMap);
