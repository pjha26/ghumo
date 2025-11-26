'use client';

import React from 'react';
import { useFilterStore } from '@/store/filterStore';
import styles from './PriceRangeSlider.module.css';

export default function PriceRangeSlider() {
    const { priceRange, setPriceRange } = useFilterStore();

    return (
        <div className={styles.container}>
            <div className={styles.values}>
                <span>₹{priceRange.min.toLocaleString('en-IN')}</span>
                <span>₹{priceRange.max.toLocaleString('en-IN')}</span>
            </div>
            <div className={styles.sliders}>
                <input
                    type="range"
                    min="0"
                    max="50000"
                    step="500"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                    className={styles.slider}
                />
                <input
                    type="range"
                    min="0"
                    max="50000"
                    step="500"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                    className={styles.slider}
                />
            </div>
        </div>
    );
}
