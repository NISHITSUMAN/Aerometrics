// services/aqiService.js

function aqiCategory(aqi) {
    if (aqi === null) return { aqi: null, category: "Unknown" };
    if (aqi <= 25) return { aqi, category: "Good" };
    if (aqi <= 50) return { aqi, category: "Moderate" };
    if (aqi <= 75) return { aqi, category: "Unhealthy for Sensitive Groups" };
    if (aqi <= 100) return { aqi, category: "Unhealthy" };
    if (aqi <= 125) return { aqi, category: "Very Unhealthy" };
    return { aqi, category: "Hazardous" };
}

module.exports = { aqiCategory };
