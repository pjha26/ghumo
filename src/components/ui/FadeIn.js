'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * FadeIn Component
 * Scroll-triggered fade-in animation
 * Based on Skiper UI free animation patterns
 */
export const FadeIn = ({
    children,
    className,
    delay = 0,
    duration = 0.6,
    direction = 'up', // 'up', 'down', 'left', 'right'
    blur = true
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    const initial = {
        opacity: 0,
        ...directions[direction],
        ...(blur && { filter: 'blur(4px)' }),
    };

    const animate = {
        opacity: 1,
        y: 0,
        x: 0,
        ...(blur && { filter: 'blur(0px)' }),
    };

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? animate : initial}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
