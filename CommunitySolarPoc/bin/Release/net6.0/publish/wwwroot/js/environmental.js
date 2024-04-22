// Your API key - replace with your actual API key
const apiKey = 'AIzaSyBwzMj6Ih6b56d5jiom1hDY1q_KyTGsGFc';

// Function to build the GeoTIFF URL with the API key
function buildGeoTiffUrl(id) {
    return `https://solar.googleapis.com/v1/geoTiff:get?id=${encodeURIComponent(id)}&key=${encodeURIComponent(apiKey)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fetch-environmental-data').addEventListener('click', () => {
        const lat = parseFloat(document.getElementById('latitude').value);
        const lng = parseFloat(document.getElementById('longitude').value);
        fetchEnvironmentalData(lat, lng);
    });
});

function fetchEnvironmentalData(latitude, longitude) {
    fetch(`/EnvironmentalData/GetEnvironmentalImages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: latitude, longitude: longitude })
    })
        .then(response => response.json())
        .then(data => {
            handleEnvironmentalData(data);
        })
        .catch(error => console.error('Error fetching environmental data:', error));
}

function handleEnvironmentalData(data) {
    if (data.dsmUrl) loadTiffImage(buildGeoTiffUrl(data.dsmUrl), 'dsmCanvas');
    if (data.rgbUrl) loadTiffImage(buildGeoTiffUrl(data.rgbUrl), 'rgbCanvas');
    if (Array.isArray(data.hourlyShadeUrls)) {
        data.hourlyShadeUrls.forEach((url, index) => {
            createAndLoadTiffImage(buildGeoTiffUrl(url), index);
        });
    }
}

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
            document.getElementById(canvasId).innerHTML = '';
            document.getElementById(canvasId).appendChild(canvas);
        }
    };
    xhr.onerror = function () {
        console.error("Error loading TIFF image.");
    };
    xhr.send();
}

function createAndLoadTiffImage(url, index) {
    let canvasId = `shadeCanvas-${index}`;
    let canvasElement = document.createElement('canvas');
    canvasElement.id = canvasId;
    document.querySelector('.solar-image-container').appendChild(canvasElement);
    loadTiffImage(url, canvasId);
}
