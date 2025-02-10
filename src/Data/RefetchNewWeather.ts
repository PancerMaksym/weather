import { FullUser } from "./Type";
import { Weather } from "./Weather";

async function newWeather(user: FullUser, fetchWeather: (user: FullUser, weather: any) => void) {
    if (user.user) {
        const newWeather = await Weather(user.user);
        fetchWeather(user, newWeather);
    }
}

// Функція тепер приймає потрібні дані через аргументи
export const refetchNewWeather = async (
    users: FullUser[],
    savedUsers: FullUser[],
    fetchNewWeather: (user: FullUser, weather: any) => void,
    fetchSavedNewWeather: (user: FullUser, weather: any) => void
) => {
    await Promise.all([
        ...users.map(user => newWeather(user, fetchNewWeather)),
        ...savedUsers.map(user => newWeather(user, fetchSavedNewWeather))
    ]);
};
