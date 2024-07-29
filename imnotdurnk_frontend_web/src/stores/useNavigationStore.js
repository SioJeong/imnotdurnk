import { create } from 'zustand';

const useNavigationStore = create((set) => ({
    navigation: {
        isVisible: false,
        icon1: { iconname: null, isRed: true, onClick: null },
        title: '',
        icon2: { iconname: null, isRed: false, onClick: null },
    },
    setNavigation: (navigation) => set({ navigation }),
}));

export default useNavigationStore;
