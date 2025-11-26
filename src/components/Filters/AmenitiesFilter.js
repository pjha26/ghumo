'use client';

import React from 'react';
import { useFilterStore } from '@/store/filterStore';
import styles from './AmenitiesFilter.module.css';

const AMENITIES = [
    { value: 'WiFi', label: 'WiFi', icon: '📶' },
    { value: 'Pool', label: 'Pool', icon: '🏊' },
    { value: 'Parking', label: 'Parking', icon: '🅿️' },
    { value: 'Kitchen', label: 'Kitchen', icon: '🍳' },
    { value: 'AC', label: 'Air Conditioning', icon: '❄️' },
    { value: 'TV', label: 'TV', icon: '📺' },
    { value: 'Gym', label: 'Gym', icon: '💪' },
    { value: 'Washer', label: 'Washer', icon: '🧺' },
];

export default function AmenitiesFilter() {
    const { selectedAmenities, setSelectedAmenities } = useFilterStore();

    const toggleAmenity = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    return (
        <div className={styles.grid}>
            {AMENITIES.map((amenity) => (
                <button
                    key={amenity.value}
                    onClick={() => toggleAmenity(amenity.value)}
                    className={`${styles.amenityButton} ${selectedAmenities.includes(amenity.value) ? styles.active : ''}`}
                >
                    <span className={styles.icon}>{amenity.icon}</span>
                    <span className={styles.label}>{amenity.label}</span>
                </button>
            ))}
        </div>
    );
}
