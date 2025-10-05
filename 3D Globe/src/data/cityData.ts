export interface CityData {
  city: string;
  lat: number;
  lng: number;
  aqi: number;
  mainPollutant?: string;
}

export const indianCities: CityData[] = [
  { city: "Delhi", lat: 28.6139, lng: 77.2090, aqi: 215, mainPollutant: "PM2.5" },
  { city: "Mumbai", lat: 19.0760, lng: 72.8777, aqi: 140, mainPollutant: "PM10" },
  { city: "Bengaluru", lat: 12.9716, lng: 77.5946, aqi: 88, mainPollutant: "O3" },
  { city: "Chennai", lat: 13.0827, lng: 80.2707, aqi: 95, mainPollutant: "NO2" },
  { city: "Kolkata", lat: 22.5726, lng: 88.3639, aqi: 175, mainPollutant: "PM2.5" },
  { city: "Hyderabad", lat: 17.3850, lng: 78.4867, aqi: 110, mainPollutant: "PM10" },
  { city: "Pune", lat: 18.5204, lng: 73.8567, aqi: 95, mainPollutant: "O3" },
  { city: "Ahmedabad", lat: 23.0225, lng: 72.5714, aqi: 155, mainPollutant: "PM2.5" },
  { city: "Jaipur", lat: 26.9124, lng: 75.7873, aqi: 165, mainPollutant: "PM10" },
  { city: "Lucknow", lat: 26.8467, lng: 80.9462, aqi: 185, mainPollutant: "PM2.5" },
];

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return "#00e400"; // Good - Green
  if (aqi <= 100) return "#ffff00"; // Moderate - Yellow
  if (aqi <= 150) return "#ff7e00"; // Unhealthy for Sensitive - Orange
  if (aqi <= 200) return "#ff0000"; // Unhealthy - Red
  if (aqi <= 300) return "#8f3f97"; // Very Unhealthy - Purple
  return "#7e0023"; // Hazardous - Maroon
};

export const getAQILevel = (aqi: number): string => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

export const getAQIDescription = (aqi: number): string => {
  if (aqi <= 50) return "Air quality is satisfactory, and air pollution poses little or no risk.";
  if (aqi <= 100) return "Air quality is acceptable. However, there may be a risk for some people.";
  if (aqi <= 150) return "Members of sensitive groups may experience health effects.";
  if (aqi <= 200) return "Some members of the general public may experience health effects.";
  if (aqi <= 300) return "Health alert: The risk of health effects is increased for everyone.";
  return "Health warning of emergency conditions: everyone is more likely to be affected.";
};
