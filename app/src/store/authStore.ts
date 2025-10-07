import { create } from "zustand";
import { User } from "firebase/auth";
import { persist } from "zustand/middleware";
import { Customer } from "../interfaces/users/Customer";

interface AuthState {
    user: User | null;
    customer: Customer | null;
    setUser: (user: User | null) => void;
    setCustomer: (customer: Customer | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            customer: null,
            setUser: (user) => set({ user }),
            setCustomer: (customer) => set({ customer }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);
