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
    tmpUser: {
        isValid: true,
        //유효성 검사 통과된건 tmpUser에 저장하고 isAvaiable=true로 바꿈
        //그 후 전역상태,api 모두 프로필이 업데이트되면 true로 바꾸고, 모든 값 비움
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
    setTmpUser: (newTmpUser) =>
        set((state) => ({ tmpUser: { ...state.tmpUser, ...newTmpUser } })),
}));

export default useUserStore;
