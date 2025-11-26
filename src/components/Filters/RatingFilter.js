'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import styles from './RatingFilter.module.css';

const RATINGS = [0, 3, 4, 4.5, 5];

export default function RatingFilter() {
    const { minRating, setMinRating } = useFilterStore();

    return (
        <div className={styles.container}>
            {RATINGS.map((rating) => (
                <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`${styles.ratingButton} ${minRating === rating ? styles.active : ''}`}
                >
                    {rating === 0 ? (
                        'Any'
                    ) : (
                        <>
                            <Star size={16} fill={minRating === rating ? 'white' : '#FFB800'} color="#FFB800" />
                            {rating}+
                        </>
                    )}
                </button>
            ))}
        </div>
    );
}
