import { create } from "zustand";
import { FullUser, UserWeather } from "../Data/Type";
import { loadSavedUsers } from "../Data/LoadSavedUsers";
import { useEffect } from "react";

interface UsersStore {
  savedUsers: FullUser[];
  addUser: (newUser: FullUser) => void;
  deleteUser: (deleteUser: FullUser) => void;
  fetchSavedNewWeather: (prevUser: FullUser, newWeather: UserWeather) => void;
}

export const useSavedUsersStore = create<UsersStore>((set, get) => ({
  savedUsers: loadSavedUsers(), // Початкове завантаження з локального сховища
  
  addUser: (newUser: FullUser) => {
    set((state) => {
      if (state.savedUsers.find((user) => user.user?.id === newUser.user?.id)) {
        console.warn("User already exists!");
        return state;
      }
      const updatedUsers = [...state.savedUsers, newUser];
      localStorage.setItem("weather", JSON.stringify(updatedUsers)); // Оновлення localStorage
      return { savedUsers: updatedUsers };
    });
  },

  deleteUser: (deleteUser: FullUser) => {
    set((state) => {
      const filteredUsers = state.savedUsers.filter(
        (user) => user.user?.id !== deleteUser.user?.id
      );

      localStorage.setItem("weather", JSON.stringify(filteredUsers));

      return { savedUsers: filteredUsers };
    });
  },
  fetchSavedNewWeather: (prevUser: FullUser, newWeather: UserWeather)=>{
    const index = get().savedUsers.findIndex(user => user.user?.id===prevUser.user?.id);
    if(index != -1 && newWeather){
      set((state)=>{
        const newUsers = state.savedUsers;
        newUsers[index].weather = newWeather;
        return {savedUsers: newUsers}
      });
    }
  }
}));

export function useLoadUsers() {
  useEffect(() => {
    const users = loadSavedUsers();
    if (users.length > 0) {
      useSavedUsersStore.setState({ savedUsers: users });
    }
  }, []);
}
