import { create } from "zustand";
import { FullUser, UserWeather } from "../Data/Type";
import { NewUser } from "../Data/NewUser";
import { getMyLocation } from "../Data/MyLocation";

interface Users {
  users: FullUser[];
  fetchNewUser: () => void;
  fetchNewWeather: (prevUser: FullUser, newWeather: UserWeather) => void;
  isFetching: boolean;  
}


export const useUsersStore = create<Users>((set, get) => ({
  users: [],

  isFetching: false,  

  fetchNewUser: async () => {
    if(get().isFetching) return;
    set({isFetching: true});
    set((state) => ({
      users: [
        ...state.users,
        { user: null, weather: null, isLoading: true, error: "" },
      ],
    }));

    let newUser = await NewUser();
    
    if (newUser) {
      set((state) => {
        const index = state.users.findIndex(user => user.isLoading);
        if (index !== -1) { 
          const updatedUsers = [...state.users];
          updatedUsers[index] = newUser; 
          return { users: updatedUsers, isFetching: false }; // Розблокуємо після завершення
        }
        return { isFetching: false }; 
      });  
          
    } else {
      console.error("Failed to fetch new user or user already exists");
    }
  },
  fetchNewWeather: (prevUser: FullUser, newWeather: UserWeather)=>{
    const index = get().users.findIndex(user => user.user?.id===prevUser.user?.id);
    console.log(1);
    if(index != -1 && newWeather){
      set((state)=>{
        const newUsers = state.users;
        newUsers[index].weather = newWeather;
        return {users: newUsers}
      });
    }
  }
}));

getMyLocation().then((user) => {
  useUsersStore.setState((state) => {
    return { users: [user, ...state.users] };
  });
});
