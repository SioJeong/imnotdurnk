import { create } from 'zustand';

const useNavigationStore = create((set) => ({
    navigation: {
        isVisible: false,
        icon1: { iconname: null, isRed: true },
        title: '',
        icon2: { iconname: null, isRed: false },
    },
    setNavigation: (navigation) => set({ navigation }),
}));

export default useNavigationStore;
