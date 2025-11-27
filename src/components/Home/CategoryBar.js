'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './CategoryBar.module.css';
import { categories } from '@/data/mockData';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';

const CategoryBar = () => {
    const [selectedCategory, setSelectedCategory] = useState('Amazing pools');

    return (
        <div className={styles.categoryBar}>
            <div className={`container ${styles.container}`}>
                <StaggerContainer
                    className={styles.scrollContainer}
                    staggerDelay={0.05}
                    initialDelay={0.3}
                >
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.label;
                        return (
                            <StaggerItem key={index} direction="up">
                                <motion.div
                                    className={`${styles.categoryItem} ${isSelected ? styles.selected : ''}`}
                                    onClick={() => setSelectedCategory(category.label)}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={24} strokeWidth={isSelected ? 2 : 1.5} />
                                    <span className={styles.label}>{category.label}</span>
                                </motion.div>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </div>
    );
};

export default CategoryBar;
