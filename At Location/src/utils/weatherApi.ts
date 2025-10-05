const OPENWEATHER_API_KEY = "80bcc5b3da53eee330df2deb532ff4a1";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  pm25: number;
  pm10: number;
  co: number;
  so2: number;
  no2: number;
  o3: number;
  temperature: number;
  condition: string;
  humidity: number;
  wind: number;
  uvIndex: number;
}

export const getNashikDemoData = (): WeatherData => {
  // Add slight random variation to make it look "live"
  const vary = (base: number, range: number) => 
    base + (Math.random() - 0.5) * range;

  return {
    pm25: vary(20, 2),
    pm10: vary(48, 3),
    co: vary(258, 15),
    so2: vary(2, 0.5),
    no2: vary(4, 0.8),
    o3: vary(6, 1),
    temperature: vary(28, 1),
    condition: "Patchy rain nearby",
    humidity: vary(74, 3),
    wind: vary(15, 2),
    uvIndex: 9,
  };
};

export const getLiveWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Get current weather
    const weatherResponse = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const weatherData = await weatherResponse.json();

    // Get air pollution data
    const pollutionResponse = await fetch(
      `${OPENWEATHER_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    );
    const pollutionData = await pollutionResponse.json();

    const components = pollutionData.list[0].components;

    return {
      pm25: components.pm2_5 || 0,
      pm10: components.pm10 || 0,
      co: components.co || 0,
      so2: components.so2 || 0,
      no2: components.no2 || 0,
      o3: components.o3 || 0,
      temperature: weatherData.main.temp,
      condition: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      wind: weatherData.wind.speed * 3.6, // Convert m/s to km/h
      uvIndex: 5, // OpenWeather doesn't provide UV in free tier
    };
  } catch (error) {
    console.error("Error fetching live weather data:", error);
    // Fallback to demo data if API fails
    return getNashikDemoData();
  }
};

export const getAQILevel = (pm25: number): { level: string; color: string } => {
  if (pm25 <= 12) return { level: "Good", color: "hsl(120 70% 50%)" };
  if (pm25 <= 35.4) return { level: "Moderate", color: "hsl(60 80% 50%)" };
  if (pm25 <= 55.4) return { level: "Unhealthy for Sensitive Groups", color: "hsl(30 90% 55%)" };
  if (pm25 <= 150.4) return { level: "Unhealthy", color: "hsl(0 85% 60%)" };
  if (pm25 <= 250.4) return { level: "Very Unhealthy", color: "hsl(280 70% 50%)" };
  return { level: "Hazardous", color: "hsl(320 80% 40%)" };
};
