'use client';

import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

export default function Toast({ message, onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className={styles.toast}>
            <div className={styles.content}>
                <CheckCircle size={20} className={styles.icon} />
                <span className={styles.message}>{message}</span>
            </div>
            <button onClick={onClose} className={styles.closeButton}>
                <X size={18} />
            </button>
        </div>
    );
}
