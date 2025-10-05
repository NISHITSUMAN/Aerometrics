const { aqiCategory } = require('./aqiService');

function generate5DayForecast(currentPM25) {
    const forecast = [];
    if (currentPM25 === null) {
        for (let i = 0; i < 5; i++) {
            forecast.push({ day: i + 1, aqi: null, category: "Unknown", advisory: "Data unavailable" });
        }
        return forecast;
    }

    for (let i = 0; i < 5; i++) {
        const pm25 = currentPM25 * (0.9 + Math.random() * 0.2);
        const { aqi, category } = aqiCategory(pm25);

        let advisory;
        switch(category) {
            case "Good": advisory = "Outdoor activities safe for everyone."; break;
            case "Moderate": advisory = "Sensitive groups should reduce prolonged outdoor exposure."; break;
            case "Unhealthy for Sensitive Groups": advisory = "Sensitive individuals should avoid outdoor activities."; break;
            case "Unhealthy": advisory = "Everyone should reduce outdoor activities."; break;
            case "Very Unhealthy": advisory = "Avoid outdoor activities; health alert."; break;
            case "Hazardous": advisory = "Remain indoors; serious health risk."; break;
            default: advisory = "Data unavailable";
        }

        forecast.push({ day: i + 1, aqi: Math.round(aqi), category, advisory });
    }
    return forecast;
}

module.exports = { generate5DayForecast };
