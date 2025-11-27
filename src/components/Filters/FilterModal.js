'use client';

import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import PriceRangeSlider from './PriceRangeSlider';
import GuestCounter from './GuestCounter';
import PropertyTypeFilter from './PropertyTypeFilter';
import RatingFilter from './RatingFilter';
import AmenitiesFilter from './AmenitiesFilter';
import WorkTravelScore from './WorkTravelScore';
import BudgetComfortSlider from './BudgetComfortSlider';
import PetFriendlyFilter from './PetFriendlyFilter';
import TravelModeSelector from './TravelModeSelector';
import styles from './FilterModal.module.css';

export default function FilterModal() {
    const { isFilterModalOpen, closeFilterModal, resetFilters } = useFilterStore();

    if (!isFilterModalOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeFilterModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <SlidersHorizontal size={24} />
                        <h2 className={styles.title}>Filters</h2>
                    </div>
                    <button onClick={closeFilterModal} className={styles.closeButton}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {/* Advanced Intelligence Section */}
                    <div className={styles.section}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">✨</span>
                            <h3 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Smart Filters</h3>
                        </div>
                        <TravelModeSelector />
                        <WorkTravelScore />
                        <BudgetComfortSlider />
                        <PetFriendlyFilter />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Price Range</h3>
                        <PriceRangeSlider />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Guests</h3>
                        <GuestCounter />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Property Type</h3>
                        <PropertyTypeFilter />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Minimum Rating</h3>
                        <RatingFilter />
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Amenities</h3>
                        <AmenitiesFilter />
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <button onClick={resetFilters} className={styles.clearButton}>
                        Clear All
                    </button>
                    <button onClick={closeFilterModal} className={styles.applyButton}>
                        Show Results
                    </button>
                </div>
            </div>
        </div>
    );
}
