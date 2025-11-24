'use client';

import React from 'react';
import styles from './Hero.module.css';
import useAuthModal from '@/hooks/useAuthModal';

const Hero = () => {
    const authModal = useAuthModal();

    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>Find your next stay</h1>
                <p className={styles.subtitle}>Search deals on hotels, homes, and much more...</p>
                <button onClick={authModal.onOpen} className={styles.ctaButton}>
                    Sign Up / Login
                </button>
            </div>
        </div>
    );
};

export default Hero;
