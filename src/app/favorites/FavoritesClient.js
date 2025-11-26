'use client';

import React from 'react';
import ListingCard from '@/components/Home/ListingCard';
import { Heart } from 'lucide-react';
import styles from './favorites.module.css';

export default function FavoritesClient({ initialFavorites }) {
    return (
        <div className={styles.container}>
            <div className="container">
                <div className={styles.header}>
                    <div className={styles.titleRow}>
                        <Heart size={32} color="#FF385C" fill="#FF385C" />
                        <h1 className={styles.title}>Your Favorites</h1>
                    </div>
                    <p className={styles.subtitle}>
                        {initialFavorites.length === 0
                            ? "You haven't saved any favorites yet"
                            : `${initialFavorites.length} ${initialFavorites.length === 1 ? 'property' : 'properties'} saved`}
                    </p>
                </div>

                {initialFavorites.length === 0 ? (
                    <div className={styles.empty}>
                        <Heart size={64} color="#E5E7EB" />
                        <h2>No favorites yet</h2>
                        <p>Start exploring and save your favorite properties by clicking the heart icon</p>
                        <a href="/" className={styles.exploreButton}>
                            Explore Properties
                        </a>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {initialFavorites.map((listing, index) => (
                            <ListingCard
                                key={listing.id}
                                listing={listing}
                                priority={index < 4}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
