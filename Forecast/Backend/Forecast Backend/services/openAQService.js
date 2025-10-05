// services/openAQService.js
const axios = require('axios');

// Fetch latest air quality data from OpenAQ using coordinates
async function getOpenAQData(lat, lon) {
    try {
        const url = `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}&radius=5000`; // 5 km radius
        const response = await axios.get(url);
        const results = response.data.results[0];
        if (!results) return null;

        return {
            pm25: results.measurements.find(m => m.parameter === "pm25")?.value ?? null,
            pm10: results.measurements.find(m => m.parameter === "pm10")?.value ?? null,
            no2: results.measurements.find(m => m.parameter === "no2")?.value ?? null,
            o3: results.measurements.find(m => m.parameter === "o3")?.value ?? null,
            co: results.measurements.find(m => m.parameter === "co")?.value ?? null,
            so2: results.measurements.find(m => m.parameter === "so2")?.value ?? null,
            lastUpdated: results.measurements[0]?.lastUpdated ?? null
        };
    } catch (error) {
        console.error("OpenAQ API error:", error.message);
        return null;
    }
}

module.exports = { getOpenAQData };
