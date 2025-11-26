'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import ListingCard from '@/components/Home/ListingCard';
import SearchBar from '@/components/Filters/SearchBar';
import FilterModal from '@/components/Filters/FilterModal';
import styles from './FilteredListings.module.css';

export default function FilteredListings({ initialListings }) {
    const [listings, setListings] = useState(initialListings);
    const [loading, setLoading] = useState(false);

    const {
        searchQuery,
        priceRange,
        location,
        guests,
        propertyTypes,
        minRating,
        selectedAmenities,
        openFilterModal,
    } = useFilterStore();

    // Fetch filtered listings
    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();

                if (searchQuery) params.append('q', searchQuery);
                if (priceRange.min > 0) params.append('minPrice', priceRange.min);
                if (priceRange.max < 50000) params.append('maxPrice', priceRange.max);
                if (location) params.append('location', location);
                if (guests > 1) params.append('guests', guests);
                if (propertyTypes.length > 0) params.append('types', propertyTypes.join(','));
                if (minRating > 0) params.append('minRating', minRating);
                if (selectedAmenities.length > 0) params.append('amenities', selectedAmenities.join(','));

                const response = await fetch(`/api/listings/search?${params.toString()}`);
                const data = await response.json();
                setListings(data.listings || []);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [searchQuery, priceRange, location, guests, propertyTypes, minRating, selectedAmenities]);

    const activeFilterCount =
        (searchQuery ? 1 : 0) +
        (priceRange.min > 0 || priceRange.max < 50000 ? 1 : 0) +
        (location ? 1 : 0) +
        (guests > 1 ? 1 : 0) +
        propertyTypes.length +
        (minRating > 0 ? 1 : 0) +
        selectedAmenities.length;

    return (
        <>
            <div className={styles.filterBar}>
                <div className="container">
                    <div className={styles.filterContent}>
                        <SearchBar />
                        <button onClick={openFilterModal} className={styles.filterButton}>
                            <SlidersHorizontal size={20} />
                            <span>Filters</span>
                            {activeFilterCount > 0 && (
                                <span className={styles.badge}>{activeFilterCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`container ${styles.gridContainer}`}>
                {loading && <div className={styles.loading}>Loading...</div>}

                {!loading && listings.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No properties found matching your criteria.</p>
                        <p className={styles.hint}>Try adjusting your filters</p>
                    </div>
                )}

                {!loading && listings.length > 0 && (
                    <div className={styles.grid}>
                        {listings.map((listing, index) => (
                            <ListingCard
                                key={listing.id}
                                listing={listing}
                                priority={index < 4}
                            />
                        ))}
                    </div>
                )}
            </div>

            <FilterModal />
        </>
    );
}
