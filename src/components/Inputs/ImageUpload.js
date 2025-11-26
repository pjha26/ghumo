'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Camera, Plus, Loader2 } from 'lucide-react';
import styles from './ImageUpload.module.css';

const ImageUpload = ({ onChange, value }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Upload failed');
                } else {
                    const text = await response.text();
                    console.error('Non-JSON response:', text);
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
            }

            const data = await response.json();
            onChange(data.url);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert(`Failed to upload image: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <label htmlFor="imageUpload" className={styles.imageWrapper}>
                {isUploading ? (
                    <div className={styles.placeholder}>
                        <Loader2 size={32} className={styles.spinner} color="#717171" />
                    </div>
                ) : value ? (
                    <Image
                        fill
                        style={{ objectFit: 'cover' }}
                        src={value}
                        alt="Profile Image"
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <Camera size={32} color="#717171" />
                    </div>
                )}

                {!isUploading && (
                    <div className={styles.overlay}>
                        <Plus size={20} color="white" />
                    </div>
                )}
            </label>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
                disabled={isUploading}
            />
            <div className={styles.label}>Change photo</div>
        </div>
    );
};

export default ImageUpload;
