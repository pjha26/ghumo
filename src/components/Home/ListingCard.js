'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useUser } from '@clerk/nextjs';
import Toast from '@/components/Toast/Toast';
import FadeIn from '@/components/ui/FadeIn';
import styles from './ListingCard.module.css';

const ListingCard = ({ listing, priority = false }) => {
    const { user } = useUser();
    const { favoriteIds, toggleFavorite, fetchFavorites } = useFavoriteStore();
    const isFavorite = favoriteIds.includes(listing.id);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    // Fetch favorites on mount if user is logged in
    useEffect(() => {
        if (user && favoriteIds.length === 0) {
            fetchFavorites();
        }
    }, [user, favoriteIds.length, fetchFavorites]);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            // Redirect to sign in if not logged in
            window.location.href = '/sign-in';
            return;
        }

        const wasAlreadyFavorite = isFavorite;
        toggleFavorite(listing.id);

        // Show toast notification
        if (wasAlreadyFavorite) {
            setToastMessage('Removed from favorites');
        } else {
            setToastMessage('Added to favorites');
        }
        setShowToast(true);
    };

    return (
        <>
            <FadeIn
                delay={0.1}
                duration={0.5}
                direction="up"
            >
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    <Link href={`/rooms/${listing.id}`} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <motion.div
                                style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '12px' }}
                                animate={{ scale: isHovered ? 1.05 : 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                <Image
                                    src={listing.images?.[0] || listing.image}
                                    alt={listing.title}
                                    fill
                                    className={styles.image}
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    loading={priority ? "eager" : "lazy"}
                                    priority={priority}
                                />
                            </motion.div>
                            <motion.button
                                onClick={handleFavoriteClick}
                                className={`${styles.favoriteBtn} ${isFavorite ? styles.favorited : ''}`}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Heart
                                    size={24}
                                    color={isFavorite ? "#FF385C" : "white"}
                                    fill={isFavorite ? "#FF385C" : "transparent"}
                                    strokeWidth={2}
                                    className={styles.heartIcon}
                                />
                            </motion.button>
                            <motion.div
                                className={styles.guestFavorite}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Guest favorite
                            </motion.div>

                            {/* Advanced Score Badges */}
                            <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
                                {(listing.workTravelScore ?? 0) >= 8 && (
                                    <motion.span
                                        className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center gap-1"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        💼 {listing.workTravelScore?.toFixed(1)}
                                    </motion.span>
                                )}
                                {(listing.petFriendlyScore ?? 0) >= 8 && (
                                    <motion.span
                                        className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center gap-1"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        🐾 {listing.petFriendlyScore?.toFixed(1)}
                                    </motion.span>
                                )}
                                {(listing.romanticScore ?? 0) >= 8 && (
                                    <motion.span
                                        className="bg-pink-500 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center gap-1"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        💕 {listing.romanticScore?.toFixed(1)}
                                    </motion.span>
                                )}
                                {(listing.adventureScore ?? 0) >= 8 && (
                                    <motion.span
                                        className="bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center gap-1"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.45 }}
                                    >
                                        🏔️ {listing.adventureScore?.toFixed(1)}
                                    </motion.span>
                                )}
                            </div>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.titleRow}>
                                <h3 className={styles.location}>{listing.location}</h3>
                                <div className={styles.rating}>
                                    <Star size={14} fill="currentColor" />
                                    <span>{listing.rating}</span>
                                </div>
                            </div>
                            <p className={styles.distance}>{listing.distance}</p>
                            <p className={styles.date}>{listing.date}</p>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>₹{listing.price.toLocaleString('en-IN')}</span>
                                <span className={styles.night}> night</span>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </FadeIn>

            {showToast && (
                <Toast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
};

export default ListingCard;
