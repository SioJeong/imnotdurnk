import { create } from 'zustand';

const useNavigationStore = create((set) => ({
    navigation: {
        isVisible: true,
        icon1: null,
        title: '',
        icon2: null,
    },
    setNavigation: (navigation) => set({ navigation }),
}));

export default useNavigationStore;
