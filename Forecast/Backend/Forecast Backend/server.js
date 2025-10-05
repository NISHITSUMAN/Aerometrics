require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { getAirQuality } = require('./services/airQualityService');
const { getWeatherData } = require('./services/weatherService');
const { generate5DayForecast } = require('./services/forecastService');
const { aqiCategory } = require('./services/aqiService');

const app = express();
const PORT = 5000;

app.use(cors());

async function getCoordinates(city) {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${WEATHER_API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;
    if (data && data.length > 0) {
        return { lat: data[0].lat, lon: data[0].lon };
    }
    // Default to Delhi if not found
    return { lat: 28.6139, lon: 77.2090 };
}

app.get('/api/forecast', async (req, res) => {
    const city = req.query.city || "Delhi";
    const coords = await getCoordinates(city);
    const lat = coords.lat;
    const lon = coords.lon;

    const aqData = await getAirQuality(lat, lon);
    const weather = await getWeatherData(city);

    const pm25 = aqData?.pm25 ?? null;
    const { aqi, category } = aqiCategory(aqData?.aqi);

    const forecast5Day = generate5DayForecast(pm25);

    res.json({
        city,
        aqi,
        category,
        pm25,
        pm10: aqData?.pm10 ?? null,
        no2: aqData?.no2 ?? null,
        o3: aqData?.o3 ?? null,
        co: aqData?.co ?? null,
        so2: aqData?.so2 ?? null,
        weather,
        forecast5Day
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
