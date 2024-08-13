import { create } from 'zustand';

const useNavigationStore = create((set) => ({
    navigation: {
        isVisible: false,
        icon1: { iconname: 'empty', isRed: false },
        title: '',
        icon2: { iconname: 'empty', isRed: false },
    },
    setNavigation: (navigation) => set({ navigation }),
}));

export default useNavigationStore;
