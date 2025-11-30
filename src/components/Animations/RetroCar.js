'use client';

import React from 'react';
import Image from 'next/image';
import styles from './RetroCar.module.css';

export default function RetroCar({ onClose }) {
    return (
        <div className={styles.overlay}>
            <button className={styles.closeButton} onClick={onClose}>×</button>

            <div className={styles.scene}>
                {/* Tagline */}
                <div className={styles.tagline}>
                    ek rasta hai zindagi jo tham gaye toh kuch nhi
                </div>

                {/* Clouds */}
                <div className={`${styles.cloud} ${styles.cloud1}`}></div>
                <div className={`${styles.cloud} ${styles.cloud2}`}></div>

                {/* Car Image */}
                <div className={styles.carContainer}>
                    <div className={styles.carImageWrapper}>
                        <Image
                            src="/modern-car.png"
                            alt="Modern Sports Car"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                    {/* Spinning Wheels Overlay (Optional, if image wheels aren't enough) */}
                    {/* We'll rely on the image for realism, maybe add spinning rims later if needed */}
                    <div className={styles.carShadow}></div>
                </div>

                {/* Road */}
                <div className={styles.road}>
                    <div className={styles.roadLine}></div>
                </div>
            </div>
        </div>
    );
}
