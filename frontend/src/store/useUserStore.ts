import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    [key: string]: any; // Allow other properties if needed later
}

interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: User, token: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            setUser: (user, token) => set({ user, token, isAuthenticated: true }),
            clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: 'user-storage', // name of the item in local storage
        }
    )
);
