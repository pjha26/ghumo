'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import styles from './GuestCounter.module.css';

export default function GuestCounter() {
    const { guests, setGuests } = useFilterStore();

    return (
        <div className={styles.container}>
            <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className={styles.button}
                disabled={guests <= 1}
            >
                <Minus size={16} />
            </button>
            <span className={styles.value}>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
            <button
                onClick={() => setGuests(guests + 1)}
                className={styles.button}
            >
                <Plus size={16} />
            </button>
        </div>
    );
}
