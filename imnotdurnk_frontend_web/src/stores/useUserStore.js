import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: {
        name: '',
        email: '',
        phone: '',
        password: '',
        passwordCheck: '',
    },
    setUser: (newUser) =>
        set((state) => ({ user: { ...state.user, ...newUser } })),
}));

export default useUserStore;
