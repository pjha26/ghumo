import { create } from 'zustand';

export const useFavoriteStore = create((set, get) => ({
    favoriteIds: [],
    isLoading: false,

    // Initialize favorites from API
    fetchFavorites: async () => {
        try {
            const response = await fetch('/api/favorites');
            if (response.ok) {
                const data = await response.json();
                set({ favoriteIds: data.favoriteIds || [] });
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    },

    // Add to favorites
    addFavorite: async (listingId) => {
        // Optimistic update
        set((state) => ({
            favoriteIds: [...state.favoriteIds, listingId],
        }));

        try {
            const response = await fetch('/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ listingId }),
            });

            if (!response.ok) {
                // Revert on error
                set((state) => ({
                    favoriteIds: state.favoriteIds.filter((id) => id !== listingId),
                }));
            }
        } catch (error) {
            console.error('Error adding favorite:', error);
            // Revert on error
            set((state) => ({
                favoriteIds: state.favoriteIds.filter((id) => id !== listingId),
            }));
        }
    },

    // Remove from favorites
    removeFavorite: async (listingId) => {
        // Optimistic update
        set((state) => ({
            favoriteIds: state.favoriteIds.filter((id) => id !== listingId),
        }));

        try {
            const response = await fetch(`/api/favorites?listingId=${listingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                // Revert on error
                set((state) => ({
                    favoriteIds: [...state.favoriteIds, listingId],
                }));
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
            // Revert on error
            set((state) => ({
                favoriteIds: [...state.favoriteIds, listingId],
            }));
        }
    },

    // Toggle favorite
    toggleFavorite: (listingId) => {
        const { favoriteIds, addFavorite, removeFavorite } = get();
        if (favoriteIds.includes(listingId)) {
            removeFavorite(listingId);
        } else {
            addFavorite(listingId);
        }
    },

    // Check if listing is favorited
    isFavorite: (listingId) => {
        return get().favoriteIds.includes(listingId);
    },
}));
