'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronDown, ChevronUp, Loader2, Plus, Minus, Calendar as CalendarIcon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import { format, differenceInDays, addDays } from 'date-fns';
import styles from './BookingWidget.module.css';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const BookingWidget = ({ listing }) => {
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // UI States
    const [showGuestPicker, setShowGuestPicker] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef(null);
    const guestPickerRef = useRef(null);

    // State
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 5),
            key: 'selection'
        }
    ]);

    const [guests, setGuests] = useState({
        adults: 1,
        children: 0,
        infants: 0
    });

    // Close pickers when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
            if (guestPickerRef.current && !guestPickerRef.current.contains(event.target)) {
                setShowGuestPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Calculate nights and prices
    const nights = differenceInDays(dateRange[0].endDate, dateRange[0].startDate);
    const basePrice = listing.price * nights;
    const cleaningFee = 2500;
    const serviceFee = 3500;
    const totalGuests = guests.adults + guests.children;
    const guestSurcharge = totalGuests > 2 ? (totalGuests - 2) * 500 * nights : 0;
    const totalPrice = basePrice + cleaningFee + serviceFee + guestSurcharge;

    const handleGuestChange = (type, operation) => {
        setGuests(prev => {
            const newValue = operation === 'increment' ? prev[type] + 1 : Math.max(0, prev[type] - 1);
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
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    listingId: listing.id,
                    listingTitle: listing.title,
                    startDate: dateRange[0].startDate.toISOString(),
                    endDate: dateRange[0].endDate.toISOString(),
                    totalPrice: totalPrice,
                    guests: guests,
                    nights: nights,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL received');
            }

        } catch (err) {
            console.error('Checkout error:', err);
            setError(err.message);
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
                    <div className={styles.dates} onClick={() => setShowDatePicker(!showDatePicker)}>
                        <div className={styles.checkIn}>
                            <div className={styles.label}>CHECK-IN</div>
                            <div className={styles.value}>{format(dateRange[0].startDate, 'MM/dd/yyyy')}</div>
                        </div>
                        <div className={styles.checkOut}>
                            <div className={styles.label}>CHECKOUT</div>
                            <div className={styles.value}>{format(dateRange[0].endDate, 'MM/dd/yyyy')}</div>
                        </div>
                    </div>

                    {showDatePicker && (
                        <div className={styles.datePickerPopup} ref={datePickerRef}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={item => setDateRange([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                minDate={new Date()}
                                rangeColors={['#FF385C']}
                            />
                            <div className={styles.datePickerFooter}>
                                <button
                                    className={styles.closeDateBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDatePicker(false);
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={styles.guests} onClick={() => setShowGuestPicker(!showGuestPicker)}>
                        <div className={styles.label}>GUESTS</div>
                        <div className={styles.value}>
                            <span>{totalGuestCount} {totalGuestCount === 1 ? 'guest' : 'guests'}</span>
                            {showGuestPicker ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                    </div>

                    {showGuestPicker && (
                        <div className={styles.guestPicker} ref={guestPickerRef}>
                            {['adults', 'children', 'infants'].map((type) => (
                                <div key={type} className={styles.guestRow}>
                                    <div>
                                        <div className={styles.guestType}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </div>
                                        <div className={styles.guestDesc}>
                                            {type === 'adults' ? 'Age 13+' : type === 'children' ? 'Ages 2-12' : 'Under 2'}
                                        </div>
                                    </div>
                                    <div className={styles.guestControls}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleGuestChange(type, 'decrement');
                                            }}
                                            disabled={type === 'adults' ? guests.adults <= 1 : guests[type] <= 0}
                                            className={styles.guestBtn}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className={styles.guestCount}>{guests[type]}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleGuestChange(type, 'increment');
                                            }}
                                            className={styles.guestBtn}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                className={styles.closeGuestBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowGuestPicker(false);
                                }}
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>

                <button
                    className={styles.reserveBtn}
                    onClick={handleReserve}
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.7 : 1 }}
                >
                    {isLoading ? (
                        <span className={styles.loadingSpan}>
                            <Loader2 className={styles.spinner} size={20} />
                            Redirecting...
                        </span>
                    ) : (
                        'Reserve'
                    )}
                </button>

                {error && <p className={styles.errorText}>{error}</p>}

                <p className={styles.disclaimer}>You won't be charged yet</p>

                <div className={styles.priceBreakdown}>
                    <div className={styles.row}>
                        <span className={styles.underline}>₹{listing.price.toLocaleString('en-IN')} x {nights} nights</span>
                        <span>₹{basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    {guestSurcharge > 0 && (
                        <div className={styles.row}>
                            <span className={styles.underline}>Extra guest fee</span>
                            <span>₹{guestSurcharge.toLocaleString('en-IN')}</span>
                        </div>
                    )}
                    <div className={styles.row}>
                        <span className={styles.underline}>Cleaning fee</span>
                        <span>₹2,500</span>
                    </div>
                    <div className={styles.row}>
                        <span className={styles.underline}>Service fee</span>
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
