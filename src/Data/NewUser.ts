import { FullUser, UserLocation } from "./Type";
import { Weather } from "./Weather";

export async function NewUser(): Promise<FullUser | undefined> {  
    const newFullUser: FullUser = {
        user: null,
        weather: null,
        isLoading: true,
        error: ""
    };

    try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const newUser: UserLocation = {
            id: json.results[0].login.uuid,
            title: json.results[0].name.title,
            first: json.results[0].name.first,
            last: json.results[0].name.last,
            lat: json.results[0].location.coordinates.latitude,
            lng: json.results[0].location.coordinates.longitude,
            city: json.results[0].location.city
        };

        const newWeather = await Weather(newUser);

        if (newWeather) {
            newFullUser.user = newUser;
            newFullUser.weather = newWeather;
            newFullUser.isLoading = false;
        }
        return newFullUser; 
    } catch (error) {
        console.error(error);
        newFullUser.error = error instanceof Error ? error.message : "Unknown error"; 
        return newFullUser; 
    }

    return newFullUser; ;  
}
