'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * StaggerContainer Component
 * Container that staggers animations of its children
 * Based on Skiper UI free stagger patterns
 */
export const StaggerContainer = ({
    children,
    className,
    staggerDelay = 0.1,
    initialDelay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: initialDelay,
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

/**
 * StaggerItem Component
 * Individual item to be used within StaggerContainer
 */
export const StaggerItem = ({
    children,
    className,
    direction = 'up'
}) => {
    const directions = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { y: 0, x: 30 },
        right: { y: 0, x: -30 },
    };

    const item = {
        hidden: {
            opacity: 0,
            ...directions[direction],
            filter: 'blur(4px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    return (
        <motion.div
            variants={item}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export default StaggerContainer;
