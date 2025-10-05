const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function getAirQuality(lat, lon) {
    try {
        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
        const response = await axios.get(url);
        const data = response.data;

        if (!data.list || data.list.length === 0) return null;

        const aq = data.list[0].components;

        return {
            pm25: aq.pm2_5,
            pm10: aq.pm10,
            no2: aq.no2,
            o3: aq.o3,
            co: aq.co,
            so2: aq.so2,
            aqi: data.list[0].main.aqi
        };
    } catch (error) {
        console.error("Air Quality API error:", error.message);
        return null;
    }
}

module.exports = { getAirQuality };
