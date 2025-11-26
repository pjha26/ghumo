'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const { searchQuery, setSearchQuery } = useFilterStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [localQuery, setSearchQuery]);

    return (
        <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
                type="text"
                placeholder="Search destinations, properties..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
}
