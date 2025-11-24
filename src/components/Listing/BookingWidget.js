'use client';

import React, { useState } from 'react';
import { Star, ChevronDown, Loader2 } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import styles from './BookingWidget.module.css';

const BookingWidget = ({ listing }) => {
    const { isSignedIn, user } = useUser();
    const { openSignIn } = useClerk();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Mock dates for now - in a real app these would come from a date picker
    const checkInDate = new Date('2023-10-22');
    const checkOutDate = new Date('2023-10-27');
    const totalPrice = listing.price * 5 + 2500 + 3500;

    const handleReserve = async () => {
        if (!isSignedIn) {
            openSignIn();
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listingId: listing.id,
                    startDate: checkInDate,
                    endDate: checkOutDate,
                    totalPrice: totalPrice,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to reserve');
            }

            setSuccess(true);
            setTimeout(() => {
                // router.push('/trips'); // Redirect to trips page if it existed
                setSuccess(false);
            }, 3000);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.widget}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.price}>₹{listing.price.toLocaleString('en-IN')}</span>
                        <span className={styles.night}> night</span>
                    </div>
                    <div className={styles.rating}>
                        <Star size={14} fill="currentColor" />
                        <span>{listing.rating}</span>
                        <span className={styles.dot}>·</span>
                        <span className={styles.reviews}>124 reviews</span>
                    </div>
                </div>

                <div className={styles.picker}>
                    <div className={styles.dates}>
                        <div className={styles.checkIn}>
                            <div className={styles.label}>CHECK-IN</div>
                            <div className={styles.value}>10/22/2023</div>
                        </div>
                        <div className={styles.checkOut}>
                            <div className={styles.label}>CHECKOUT</div>
                            <div className={styles.value}>10/27/2023</div>
                        </div>
                    </div>
                    <div className={styles.guests}>
                        <div className={styles.label}>GUESTS</div>
                        <div className={styles.value}>
                            <span>1 guest</span>
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                <button
                    className={styles.reserveBtn}
                    onClick={handleReserve}
                    disabled={isLoading || success}
                    style={{
                        backgroundColor: success ? '#4CAF50' : '',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Loader2 className={styles.spinner} size={20} />
                            Processing...
                        </span>
                    ) : success ? (
                        'Reserved!'
                    ) : (
                        'Reserve'
                    )}
                </button>

                {error && <p style={{ color: 'red', marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>{error}</p>}

                <p className={styles.disclaimer}>You won't be charged yet</p>

                <div className={styles.priceBreakdown}>
                    <div className={styles.row}>
                        <span className={styles.underline}>₹{listing.price.toLocaleString('en-IN')} x 5 nights</span>
                        <span>₹{(listing.price * 5).toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.underline}>Cleaning fee</span>
                        <span>₹2,500</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.underline}>Airbnb service fee</span>
                        <span>₹3,500</span>
                    </div>
                </div>

                <div className={styles.total}>
                    <span>Total before taxes</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
    );
};

export default BookingWidget;
