export interface MyLocation {
    id: string;
    title: string;
    lat: number;
    lng: number;
}

export interface UserWeather {
    curentTime: Date;
    curentTemperature: number;
    currentWeatherCode: number;
    hourlyTime: Date[];
    hourlyTemperature: Float32Array;
    hourlyWeatherCode: Float32Array;
}

export interface UserLocation{
    id: string;
    title: string;
    first: string;
    last: string;
    lat: number;
    lng: number;
    city: string;
}

export interface FullUser{
    user: UserLocation | MyLocation | null;
    weather: UserWeather | null;
    isLoading: boolean;
    error: string;
}