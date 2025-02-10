import { FullUser, MyLocation } from "./Type";
import { Weather } from "./Weather";

export async function getMyLocation(): Promise<FullUser> {
  const newFullUser: FullUser = {
    user: null,
    weather: null,
    isLoading: true,
    error: "",
  };

  try {
    const userLocation = await new Promise<{ latitude: number; longitude: number }>(
      (resolve) => {
        if (!navigator.geolocation) {
          resolve({ latitude: 50.450001, longitude: 30.523333 });
          return;
        }
    
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          () => {
            resolve({ latitude: 50.450001, longitude: 30.523333 });
          }
        );
      }
    );

    const newUser: MyLocation = {
      id: "0",
      title: "My Location",
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    };

    const newWeather = await Weather(newUser);

    newFullUser.user = newUser;
    newFullUser.weather = newWeather;
    newFullUser.isLoading = false;

    return newFullUser;
  } catch (error) {
    console.error(error);
    return {
      ...newFullUser,
      isLoading: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
