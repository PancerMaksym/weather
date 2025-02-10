import { LatLngExpression } from "leaflet";
import { FullUser } from "../Data/Type";
import { create } from "zustand";

interface Center {
    center: LatLngExpression;
    mapUsers: FullUser[];
    changeCenter: (newUser: FullUser) => void; 
    changeUsers: (users:FullUser[], savedUsers:FullUser[]) => void;
}

export const useMapStore = create<Center>((set) => ({
    center: [50.450001, 30.523333],
    mapUsers: [],
    changeCenter: (newUser: FullUser) => {
        set((state) => {
            if (newUser?.user?.lat && newUser?.user?.lng) {
                return { center: [newUser.user.lat, newUser.user.lng] };
            }
            return state;
        });
    },
    changeUsers: (users:FullUser[], savedUsers:FullUser[]) => {
        set(() => {
            const newMapUsers = [
                ...users,
                ...savedUsers.filter(savedUser => 
                    savedUser.user && 
                    !users.some(user => user.user?.id === savedUser.user?.id)
                ),
            ];    
            return { mapUsers: newMapUsers };
        });
    }
}));
