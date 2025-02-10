import { useUsersStore } from "../store/users";
import { FullUser, UserLocation } from "./Type";
import { Weather } from "./Weather";

function isUnique(user: string, users: FullUser[]): boolean {
  return !users.some(el => el.user?.id === user); // Порівнюємо по ID або іншому унікальному параметру
}

export async function NewUser(): Promise<FullUser> {  
    const { users } = useUsersStore.getState(); 
    
    let newFullUser: FullUser = {
        user: null,
        weather: null,
        isLoading: true,
        error: "",
    };

    try {
        let response = await fetch("https://randomuser.me/api/");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        let json = await response.json();
        let result = json.results[0];
        while (!isUnique(result.login.uuid, users)) {  
            response = await fetch("https://randomuser.me/api/");
            json = await response.json();
            result = json.results[0];
        }
        


        const newUser: UserLocation = {
            id: result.login.uuid,
            photo: result.picture.medium,
            title: result.name.title,
            first: result.name.first,
            last: result.name.last,
            lat: Number(result.location.coordinates.latitude),
            lng: Number(result.location.coordinates.longitude),
            city: result.location.city,
        };

        const newWeather = await Weather(newUser);

        newFullUser = {
            user: newUser,
            weather: newWeather,
            isLoading: false,
            error: "",
        };
    } catch (error) {
        console.error(error);
        newFullUser = {
            ...newFullUser,
            isLoading: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }

    return newFullUser;
}
