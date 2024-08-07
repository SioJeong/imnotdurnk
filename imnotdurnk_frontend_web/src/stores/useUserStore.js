import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: {
        name: '',
        nickname: '',
        email: '',
        phone: '',
        address: '',
        detailedAddress: '',
        postalCode: '',
        emergencyCall: '',
        beerCapacity: 0,
        sojuCapacity: 0,
        latitude: '',
        longitude: '',
        unsure: true,
        voice: '',
    },
    setUser: (newUser) =>
        set((state) => ({ user: { ...state.user, ...newUser } })),
}));

export default useUserStore;
