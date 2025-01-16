import { MyLocation, UserLocation, UserWeather } from "./Type";
import { fetchWeatherApi } from 'openmeteo';

export async function Weather (user:UserLocation | MyLocation): Promise<UserWeather | undefined>{
    try {
        const url = "https://api.open-meteo.com/v1/forecast";
        const params = {
            "latitude": user.lat,
            "longitude": user.lng,
            "current": ["temperature_2m", "weather_code"],
	        "hourly": ["temperature_2m", "weather_code"]

        };
        const responses = await fetchWeatherApi(url, params);
        
        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        
        const current = response.current()!;
        const hourly = response.hourly()!;
        
        const weatherData:UserWeather = {
            curentTime: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            curentTemperature: current.variables(0)!.value(),
            currentWeatherCode: current.variables(1)!.value(),
            hourlyTime: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            hourlyTemperature: hourly.variables(0)!.valuesArray()!,
            hourlyWeatherCode: hourly.variables(1)!.valuesArray()!
        
        };
        return(weatherData)
    } catch (error) {
        console.error(error);
    }

}