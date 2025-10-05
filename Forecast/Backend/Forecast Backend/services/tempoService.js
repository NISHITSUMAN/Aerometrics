// services/tempoService.js
const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY;

// Fetch NASA TEMPO data (replace endpoint with actual TEMPO API endpoint)
async function getTEMPOData(lat, lon) {
    try {
        // Example TEMPO endpoint (replace with real Level 2/Level 3 API URL)
        const url = `https://api.nasa.gov/tempo/airquality?lat=${lat}&lon=${lon}&api_key=${NASA_API_KEY}`;

        const response = await axios.get(url);
        const data = response.data;

        return {
            pm25: data.pm25,
            pm10: data.pm10,
            no2: data.no2,
            o3: data.o3,
            co: data.co,
            so2: data.so2,
            timestamp: data.timestamp
        };
    } catch (error) {
        console.error("TEMPO API error:", error.message);
        return null;
    }
}

module.exports = { getTEMPOData };
