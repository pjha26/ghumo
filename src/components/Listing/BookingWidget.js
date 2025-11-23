import React from 'react';
import { Star, ChevronDown } from 'lucide-react';
import styles from './BookingWidget.module.css';

const BookingWidget = ({ listing }) => {
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

                <button className={styles.reserveBtn}>Reserve</button>

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
                    <span>₹{(listing.price * 5 + 2500 + 3500).toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
    );
};

export default BookingWidget;
