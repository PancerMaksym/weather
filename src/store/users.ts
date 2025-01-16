import { create } from 'zustand';
import { FullUser } from '../Data/Type';
import { NewUser } from '../Data/NewUser';

interface Users {
  users: FullUser[];
  fetchNewUser: () => void;
}

export const useUserserStore = create<Users>((set) => ({
  users: [],
  fetchNewUser: async() => { 
        const newUser = await NewUser();
        console.debug(newUser)
        if (newUser) {  
            set((state) => ({
                users: [...state.users, newUser],  
            }));
        } else {
            console.error("Failed to fetch new user");
        }
    
    },
}));

