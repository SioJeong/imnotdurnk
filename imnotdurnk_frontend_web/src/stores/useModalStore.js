import { create } from 'zustand';

const useModalStore = create((set) => ({
    modals: {},
    openModal: (modalId) =>
        set((state) => ({
            modals: { ...state.modals, [modalId]: true },
        })),
    closeModal: (modalId) =>
        set((state) => ({
            modals: { ...state.modals, [modalId]: false },
        })),
}));

export default useModalStore;
