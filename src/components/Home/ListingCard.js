'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './ListingCard.module.css';

const ListingCard = ({ listing }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/rooms/${listing.id}`} className={styles.card}>
                <div className={styles.imageContainer}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                            src={listing.images?.[0] || listing.image}
                            alt={listing.title}
                            fill
                            className={styles.image}
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                        />
                    </div>
                    <button className={styles.favoriteBtn}>
                        <Heart size={24} color="white" strokeWidth={2} className={styles.heartIcon} />
                    </button>
                    <div className={styles.guestFavorite}>Guest favorite</div>
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
    );
};

export default ListingCard;
