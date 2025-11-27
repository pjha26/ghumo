'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import TextReveal from '@/components/ui/TextReveal';
import FadeIn from '@/components/ui/FadeIn';
import AnimatedButton from '@/components/ui/AnimatedButton';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Find your next stay',
        subtitle: 'Search deals on hotels, homes, and much more...',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1519681393797-a1e97d77c9c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Discover new adventures',
        subtitle: 'Explore the world with our curated experiences.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Luxury in the city',
        subtitle: 'Experience the best urban getaways.',
    }
];

const Hero = () => {
    const router = useRouter();
    const { isSignedIn } = useUser();

    const handleAction = () => {
        if (isSignedIn) {
            // Scroll to listings or just show a toast
            const element = document.getElementById('listings-section');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push('/sign-in');
        }
    };

    return (
        <div className={styles.heroContainer}>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                effect={'fade'}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, EffectFade, Navigation]}
                className={styles.swiper}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <motion.div
                            className={styles.slideContent}
                            style={{ backgroundImage: `url(${slide.image})` }}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            <div className={styles.overlay}>
                                <div className={styles.textContent}>
                                    <TextReveal
                                        text={slide.title}
                                        className={styles.title}
                                        delay={0.2}
                                        staggerChildren={0.08}
                                    />

                                    <FadeIn
                                        delay={0.6}
                                        direction="up"
                                        className={styles.subtitle}
                                    >
                                        {slide.subtitle}
                                    </FadeIn>

                                    <FadeIn
                                        delay={0.9}
                                        direction="up"
                                        className={styles.buttonGroup}
                                    >
                                        {!isSignedIn && (
                                            <>
                                                <AnimatedButton
                                                    onClick={() => router.push('/sign-up')}
                                                    variant="primary"
                                                >
                                                    Sign Up
                                                </AnimatedButton>
                                                <AnimatedButton
                                                    onClick={() => router.push('/sign-in')}
                                                    variant="secondary"
                                                >
                                                    Log In
                                                </AnimatedButton>
                                            </>
                                        )}
                                        {isSignedIn && (
                                            <AnimatedButton
                                                onClick={handleAction}
                                                variant="primary"
                                            >
                                                Explore Now
                                            </AnimatedButton>
                                        )}
                                    </FadeIn>
                                </div>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
