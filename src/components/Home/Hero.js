'use client';

import React from 'react';
import styles from './Hero.module.css';
import useAuthModal from '@/hooks/useAuthModal';
import { motion } from 'framer-motion';

const Hero = () => {
    const authModal = useAuthModal();

    return (
        <div className={styles.hero}>
            <motion.div
                className={styles.content}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <h1 className={styles.title}>Find your next stay</h1>
                <p className={styles.subtitle}>Search deals on hotels, homes, and much more...</p>
                <button onClick={authModal.onOpen} className={styles.ctaButton}>
                    Sign Up / Login
                </button>
            </motion.div>
        </div>
    );
};

export default Hero;
