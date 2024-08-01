import { create } from 'zustand';

const useLocationStore = create((set) => ({
    mapCenter: null,
    currentLocation: null,
    departure: null,
    destination: null,
    setMapCenter: (coords) => set({ mapCenter: coords }),
    setCurrentLocation: (coords) => set({ currentLocation: coords }),
    setDeparture: (coords) => set({ departure: coords }),
    setDestination: (coords) => set({ destination: coords }),
    resetDepartureAndDestination: () =>
        set({ departure: null, destination: null }),
}));

export default useLocationStore;
