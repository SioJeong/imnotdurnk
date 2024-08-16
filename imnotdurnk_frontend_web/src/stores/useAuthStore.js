import { create } from 'zustand';

const useAuthStore = create((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    clearAccessToken: () => set({ accessToken: null }),
    isAuthenticated: false,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
}));

export default useAuthStore;