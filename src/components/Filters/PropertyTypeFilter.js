'use client';

import React from 'react';
import { useFilterStore } from '@/store/filterStore';
import styles from './PropertyTypeFilter.module.css';

const PROPERTY_TYPES = [
    { value: 'Hotel', label: 'Hotel', icon: '🏨' },
    { value: 'Apartment', label: 'Apartment', icon: '🏢' },
    { value: 'Villa', label: 'Villa', icon: '🏡' },
    { value: 'Resort', label: 'Resort', icon: '🏖️' },
];

export default function PropertyTypeFilter() {
    const { propertyTypes, setPropertyTypes } = useFilterStore();

    const toggleType = (type) => {
        if (propertyTypes.includes(type)) {
            setPropertyTypes(propertyTypes.filter((t) => t !== type));
        } else {
            setPropertyTypes([...propertyTypes, type]);
        }
    };

    return (
        <div className={styles.grid}>
            {PROPERTY_TYPES.map((type) => (
                <button
                    key={type.value}
                    onClick={() => toggleType(type.value)}
                    className={`${styles.typeButton} ${propertyTypes.includes(type.value) ? styles.active : ''}`}
                >
                    <span className={styles.icon}>{type.icon}</span>
                    <span className={styles.label}>{type.label}</span>
                </button>
            ))}
        </div>
    );
}
