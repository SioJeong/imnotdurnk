import { create } from 'zustand';

const useNavigationStore = create((set) => ({
    navigation: {
        isVisible: true,
        icon1: { iconname: 'address', isRed: true },
        title: '',
        icon2: { iconname: 'balance', isRed: false },
    },
    setNavigation: (navigation) => set({ navigation }),
}));

export default useNavigationStore;
