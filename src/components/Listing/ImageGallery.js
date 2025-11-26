'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Share, Heart, X, Grid } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useUser } from '@clerk/nextjs';
import Toast from '@/components/Toast/Toast';
import styles from './ImageGallery.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageGallery({ images, listingId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const { user } = useUser();
    const { favoriteIds, toggleFavorite } = useFavoriteStore();
    const isFavorite = favoriteIds.includes(listingId);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setToastMessage('Link copied to clipboard');
        setShowToast(true);
    };

    const handleSave = () => {
        if (!user) {
            window.location.href = '/sign-in';
            return;
        }

        toggleFavorite(listingId);
        setToastMessage(isFavorite ? 'Removed from favorites' : 'Saved to favorites');
        setShowToast(true);
    };

    return (
        <div className={styles.galleryContainer}>
            {/* Action Buttons */}
            <div className={styles.actionButtons}>
                <button
                    className={styles.actionButton}
                    onClick={handleShare}
                >
                    <Share size={16} />
                    <span className={styles.actionText}>Share</span>
                </button>
                <button
                    className={styles.actionButton}
                    onClick={handleSave}
                >
                    <Heart size={16} fill={isFavorite ? "#FF385C" : "transparent"} color={isFavorite ? "#FF385C" : "currentColor"} />
                    <span className={styles.actionText}>{isFavorite ? 'Saved' : 'Save'}</span>
                </button>
            </div>

            {/* Mobile Carousel */}
            <div className={styles.mobileCarousel}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className={styles.swiper}
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.mobileImageWrapper}>
                                <Image
                                    src={src}
                                    alt={`Listing image ${index + 1}`}
                                    fill
                                    className={styles.image}
                                    priority={index === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className={styles.desktopGrid}>
                <div className={styles.mainImage}>
                    <Image
                        src={images[0]}
                        alt="Main listing image"
                        fill
                        className={styles.image}
                        priority
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <div className={styles.subImages}>
                    {images.slice(1, 5).map((src, index) => (
                        <div key={index} className={styles.subImageWrapper}>
                            <Image
                                src={src}
                                alt={`Listing image ${index + 2}`}
                                fill
                                className={styles.image}
                                onClick={() => setIsModalOpen(true)}
                            />
                            {index === 3 && images.length > 5 && (
                                <button
                                    className={styles.showAllButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <Grid size={16} />
                                    Show all photos
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <button
                        className={styles.closeButton}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <X size={24} />
                    </button>

                    <div className={styles.modalContent}>
                        {images.map((src, index) => (
                            <div key={index} className={styles.modalImageWrapper}>
                                <Image
                                    src={src}
                                    alt={`Full screen image ${index + 1}`}
                                    width={1200}
                                    height={800}
                                    className={styles.modalImage}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}
