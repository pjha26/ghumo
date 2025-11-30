'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, X } from 'lucide-react';
import { useFilterStore } from '@/store/filterStore';
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const {
        location,
        setLocation,
        guests: storeGuests,
        setGuests: setStoreGuests,
        searchQuery,
        setSearchQuery
    } = useFilterStore();

    const [activeSection, setActiveSection] = useState(null);
    const [localLocation, setLocalLocation] = useState(location);
    const [guests, setGuests] = useState({ adults: storeGuests || 1, children: 0, infants: 0 });
    const searchRef = useRef(null);

    // Sync local location with store location
    useEffect(() => {
        setLocalLocation(location);
    }, [location]);

    // Debounce location update
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localLocation !== location) {
                setLocation(localLocation);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [localLocation, setLocation, location]);

    // Update store guests when local guests change
    useEffect(() => {
        const total = guests.adults + guests.children; // Infants usually don't count towards capacity
        if (total !== storeGuests) {
            setStoreGuests(total || 1);
        }
    }, [guests, storeGuests, setStoreGuests]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setActiveSection(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const totalGuests = guests.adults + guests.children + guests.infants;

    const handleGuestChange = (type, operation) => {
        setGuests(prev => ({
            ...prev,
            [type]: operation === 'increment'
                ? prev[type] + 1
                : Math.max(0, prev[type] - 1)
        }));
    };

    const clearAll = () => {
        setLocalLocation('');
        setLocation('');
        setGuests({ adults: 1, children: 0, infants: 0 });
        setStoreGuests(1);
        setActiveSection(null);
    };

    const handleSearch = () => {
        // Trigger search or close dropdown
        setActiveSection(null);
        // The store updates already trigger the fetch in FilteredListings
    };

    return (
        <div className={styles.searchWrapper} ref={searchRef}>
            <div className={styles.searchContainer}>
                {/* Location Section */}
                <div
                    className={`${styles.searchSection} ${activeSection === 'location' ? styles.active : ''}`}
                    onClick={() => setActiveSection('location')}
                >
                    <label className={styles.label}>Where</label>
                    <input
                        type="text"
                        placeholder="Search destinations"
                        value={localLocation}
                        onChange={(e) => setLocalLocation(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.divider}></div>

                {/* Guests Section */}
                <div
                    className={`${styles.searchSection} ${styles.guestsSection} ${activeSection === 'guests' ? styles.active : ''}`}
                    onClick={() => setActiveSection('guests')}
                >
                    <label className={styles.label}>Who</label>
                    <div className={styles.input}>
                        {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
                    </div>
                </div>

                {/* Search Button */}
                <button className={styles.searchButton} onClick={handleSearch}>
                    <Search size={24} />
                </button>
            </div>

            {/* Guest Dropdown */}
            {activeSection === 'guests' && (
                <div className={styles.guestDropdown}>
                    <div className={styles.guestRow}>
                        <div className={styles.guestInfo}>
                            <div className={styles.guestType}>Adults</div>
                            <div className={styles.guestDesc}>Age 13+</div>
                        </div>
                        <div className={styles.guestControls}>
                            <button
                                className={styles.guestButton}
                                onClick={() => handleGuestChange('adults', 'decrement')}
                                disabled={guests.adults === 0}
                            >
                                -
                            </button>
                            <span className={styles.guestCount}>{guests.adults}</span>
                            <button
                                className={styles.guestButton}
                                onClick={() => handleGuestChange('adults', 'increment')}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className={styles.guestRow}>
                        <div className={styles.guestInfo}>
                            <div className={styles.guestType}>Children</div>
                            <div className={styles.guestDesc}>Age 2-12</div>
                        </div>
                        <div className={styles.guestControls}>
                            <button
                                className={styles.guestButton}
                                onClick={() => handleGuestChange('children', 'decrement')}
                                disabled={guests.children === 0}
                            >
                                -
                            </button>
                            <span className={styles.guestCount}>{guests.children}</span>
                            <button
                                className={styles.guestButton}
                                onClick={() => handleGuestChange('children', 'increment')}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className={styles.guestRow}>
                        <div className={styles.guestInfo}>
                            <div className={styles.guestType}>Infants</div>
                            <div className={styles.guestDesc}>Under 2</div>
                        </div>
                        <div className={styles.guestControls}>
                            <button
                                className={styles.guestButton}
                                onClick={() => handleGuestChange('infants', 'decrement')}
                                disabled={guests.infants === 0}
                            >
                                -
                            </button>
                            <span className={styles.guestCount}>{guests.infants}</span>
                            <button
                                className={styles.guestButton}
                                onClick={() => handleGuestChange('infants', 'increment')}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {totalGuests > 0 && (
                        <button className={styles.clearButton} onClick={clearAll}>
                            Clear all
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
