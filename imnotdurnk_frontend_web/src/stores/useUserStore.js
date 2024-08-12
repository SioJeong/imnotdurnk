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
        sojuUnsure: false,
        beerUnsure: false,
        voice: '',
    },
    setUser: (newUser) =>
        set((state) => ({ user: { ...state.user, ...newUser } })),
    tmpUser: {
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
        sojuUnsure: false,
        beerUnsure: false,
        voice: '',
    },
    setTmpUser: (newTmpUser) =>
        set((state) => ({ tmpUser: { ...state.tmpUser, ...newTmpUser } })),
    setUserFromTmp: () =>
        set((state) => ({
            user: { ...state.user, ...state.tmpUser },
            tmpUser: {
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
                sojuUnsure: false,
                beerUnsure: false,
                voice: '',
            },
        })),
    isValid: true, // profileUpdate 페이지의 유효성 검사
    setIsValid: (newIsValid) => set({ isValid: newIsValid }),
}));

export default useUserStore;
