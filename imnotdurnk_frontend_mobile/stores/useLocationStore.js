import { create } from 'zustand';

const useLocationStore = create((set) => ({
    mapCenter: null,
    currentLocation: null,
    departure: null,
    stopover: [],
    destination: null,
    setMapCenter: (coords) => set({ mapCenter: coords }),
    setCurrentLocation: (coords) => set({ currentLocation: coords }),
    setDeparture: (coords) => set({ departure: coords }),
    setStopover: (coordsArray) => set({ stopover: coordsArray }),
    setDestination: (coords) => set({ destination: coords }),
    resetDepartureAndDestination: () =>
        set({ mapCenter: null, departure: null, destination: null }),
}));

export default useLocationStore;
