import { create } from 'zustand';

export const useFilterStore = create((set) => ({
    // Search
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Price Range
    priceRange: { min: 0, max: 50000 },
    setPriceRange: (range) => set({ priceRange: range }),

    // Location
    location: '',
    setLocation: (location) => set({ location }),

    // Guests
    guests: 1,
    setGuests: (guests) => set({ guests }),

    // Property Type
    propertyTypes: [],
    setPropertyTypes: (types) => set({ propertyTypes: types }),

    // Rating
    minRating: 0,
    setMinRating: (rating) => set({ minRating: rating }),

    // Amenities
    selectedAmenities: [],
    setSelectedAmenities: (amenities) => set({ selectedAmenities: amenities }),

    // Filter Modal
    isFilterModalOpen: false,
    openFilterModal: () => set({ isFilterModalOpen: true }),
    closeFilterModal: () => set({ isFilterModalOpen: false }),

    // Reset all filters
    resetFilters: () => set({
        searchQuery: '',
        priceRange: { min: 0, max: 50000 },
        location: '',
        guests: 1,
        propertyTypes: [],
        minRating: 0,
        selectedAmenities: [],
    }),

    // Get active filter count
    getActiveFilterCount: (state) => {
        let count = 0;
        if (state.searchQuery) count++;
        if (state.priceRange.min > 0 || state.priceRange.max < 50000) count++;
        if (state.location) count++;
        if (state.guests > 1) count++;
        if (state.propertyTypes.length > 0) count++;
        if (state.minRating > 0) count++;
        if (state.selectedAmenities.length > 0) count++;
        return count;
    },
}));
