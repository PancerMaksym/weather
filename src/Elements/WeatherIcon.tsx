import { WiDaySunny, WiDayCloudy, WiCloudy, WiFog, WiSprinkle, WiRain, WiSnow, WiShowers, WiThunderstorm } from "react-icons/wi";

export function WeatherIcon({ weatherCode }: { weatherCode: number }) {
    const weatherIcons: { [key: number]: JSX.Element } = {
        0: <WiDaySunny />, // Clear sky
        1: <WiDayCloudy />, // Mainly clear
        2: <WiDayCloudy />, // Partly cloudy
        3: <WiCloudy />, // Overcast
        45: <WiFog />, // Fog
        48: <WiFog />, // Depositing rime fog
        51: <WiSprinkle />, // Light drizzle
        53: <WiSprinkle />, // Moderate drizzle
        55: <WiSprinkle />, // Dense drizzle
        56: <WiSprinkle />, // Light freezing drizzle
        57: <WiSprinkle />, // Dense freezing drizzle
        61: <WiRain />, // Light rain
        63: <WiRain />, // Moderate rain
        65: <WiRain />, // Heavy rain
        66: <WiRain />, // Light freezing rain
        67: <WiRain />, // Heavy freezing rain
        71: <WiSnow />, // Light snow fall
        73: <WiSnow />, // Moderate snow fall
        75: <WiSnow />, // Heavy snow fall
        77: <WiSnow />, // Snow grains
        80: <WiShowers />, // Light rain showers
        81: <WiShowers />, // Moderate rain showers
        82: <WiShowers />, // Violent rain showers
        85: <WiSnow />, // Light snow showers
        86: <WiSnow />, // Heavy snow showers
        95: <WiThunderstorm />, // Slight or moderate thunderstorm
        96: <WiThunderstorm />, // Thunderstorm with slight hail
        99: <WiThunderstorm />, // Thunderstorm with heavy hail
    };
    
    return weatherIcons[weatherCode] || null; // Повертає null, якщо коду погоди немає в об'єкті
}
