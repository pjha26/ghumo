'use client';

import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Loader2, Plus, Minus } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import styles from './BookingWidget.module.css';

const BookingWidget = ({ listing }) => {
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showGuestPicker, setShowGuestPicker] = useState(false);
    const [guests, setGuests] = useState({
        adults: 1,
        children: 0,
        infants: 0
    });

    // Mock dates for now - in a real app these would come from a date picker
    const checkInDate = new Date('2023-10-22');
    const checkOutDate = new Date('2023-10-27');
    const nights = 5;

    // Calculate prices
    const basePrice = listing.price * nights;
    const cleaningFee = 2500;
    const serviceFee = 3500;
    const totalGuests = guests.adults + guests.children;
    const guestSurcharge = totalGuests > 2 ? (totalGuests - 2) * 500 * nights : 0; // ₹500 per extra guest per night
    const totalPrice = basePrice + cleaningFee + serviceFee + guestSurcharge;

    const handleGuestChange = (type, operation) => {
        setGuests(prev => {
            const newValue = operation === 'increment' ? prev[type] + 1 : Math.max(0, prev[type] - 1);

            // Ensure at least 1 adult
            if (type === 'adults' && newValue < 1) return prev;

            return { ...prev, [type]: newValue };
        });
    };

    const handleReserve = async () => {
        if (!isSignedIn) {
            router.push('/sign-in');
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
                    startDate: checkInDate.toISOString(),
                    endDate: checkOutDate.toISOString(),
                    totalPrice: totalPrice,
                    guests: totalGuests,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.details || data.error || 'Failed to reserve');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/trips'); // Redirect to trips page
            }, 2000);

        } catch (err) {
            console.error('Booking error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const totalGuestCount = guests.adults + guests.children + guests.infants;

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
                    <div className={styles.guests} onClick={() => setShowGuestPicker(!showGuestPicker)}>
                        <div className={styles.label}>GUESTS</div>
                        <div className={styles.value}>
                            <span>{totalGuestCount} {totalGuestCount === 1 ? 'guest' : 'guests'}</span>
                            {showGuestPicker ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                    </div>

                    {showGuestPicker && (
                        <div className={styles.guestPicker}>
                            <div className={styles.guestRow}>
                                <div>
                                    <div className={styles.guestType}>Adults</div>
                                    <div className={styles.guestDesc}>Age 13+</div>
                                </div>
                                <div className={styles.guestControls}>
                                    <button
                                        onClick={() => handleGuestChange('adults', 'decrement')}
                                        disabled={guests.adults <= 1}
                                        className={styles.guestBtn}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className={styles.guestCount}>{guests.adults}</span>
                                    <button
                                        onClick={() => handleGuestChange('adults', 'increment')}
                                        className={styles.guestBtn}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.guestRow}>
                                <div>
                                    <div className={styles.guestType}>Children</div>
                                    <div className={styles.guestDesc}>Ages 2-12</div>
                                </div>
                                <div className={styles.guestControls}>
                                    <button
                                        onClick={() => handleGuestChange('children', 'decrement')}
                                        disabled={guests.children <= 0}
                                        className={styles.guestBtn}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className={styles.guestCount}>{guests.children}</span>
                                    <button
                                        onClick={() => handleGuestChange('children', 'increment')}
                                        className={styles.guestBtn}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.guestRow}>
                                <div>
                                    <div className={styles.guestType}>Infants</div>
                                    <div className={styles.guestDesc}>Under 2</div>
                                </div>
                                <div className={styles.guestControls}>
                                    <button
                                        onClick={() => handleGuestChange('infants', 'decrement')}
                                        disabled={guests.infants <= 0}
                                        className={styles.guestBtn}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className={styles.guestCount}>{guests.infants}</span>
                                    <button
                                        onClick={() => handleGuestChange('infants', 'increment')}
                                        className={styles.guestBtn}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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
                        <span className={styles.underline}>₹{listing.price.toLocaleString('en-IN')} x {nights} nights</span>
                        <span>₹{basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    {guestSurcharge > 0 && (
                        <div className={styles.row}>
                            <span className={styles.underline}>Extra guest fee ({totalGuests - 2} guests)</span>
                            <span>₹{guestSurcharge.toLocaleString('en-IN')}</span>
                        </div>
                    )}
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
