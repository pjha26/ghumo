import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Language Store
 * Manages the current language selection across the application
 * Persists language preference to localStorage
 */
export const useLanguageStore = create(
    persist(
        (set) => ({
            // Current language code (default: English)
            language: 'en',

            // Set language
            setLanguage: (language) => set({ language }),

            // Reset to default language
            resetLanguage: () => set({ language: 'en' }),
        }),
        {
            name: 'airbnb-language-storage', // localStorage key
        }
    )
);
