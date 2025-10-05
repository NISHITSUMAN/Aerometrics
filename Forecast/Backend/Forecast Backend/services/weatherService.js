const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function getWeatherData(city) {
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        return {
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            weatherDescription: data.weather[0].description
        };
    } catch (error) {
        console.error("Weather API error:", error.message);
        return null;
    }
}

module.exports = { getWeatherData };
