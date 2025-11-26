import React from 'react';
import ImageGallery from '@/components/Listing/ImageGallery';
import ListingInfo from '@/components/Listing/ListingInfo';
import BookingWidget from '@/components/Listing/BookingWidget';
import prisma from '@/lib/prisma';
import styles from './page.module.css';

import MapWrapper from '@/components/Listing/MapWrapper';

async function getListing(id) {
    try {
        const listing = await prisma.listing.findUnique({
            where: { id: id },
            include: { host: true },
        });
        return listing;
    } catch (error) {
        console.error('Error fetching listing:', error);
        return null;
    }
}

export default async function ListingPage({ params }) {
    const { id } = await params;
    const listing = await getListing(id);

    if (!listing) {
        return <div className="container" style={{ paddingTop: '100px' }}>Listing not found</div>;
    }

    return (
        <div className={`container ${styles.pageContainer}`}>
            <ImageGallery images={listing.images} listingId={listing.id} />
            <div className={styles.contentGrid}>
                <div className={styles.mainContent}>
                    <ListingInfo listing={listing} />
                    <div className={styles.divider}></div>
                    <div style={{ padding: '10px', background: '#ffebee', border: '1px solid red', marginBottom: '20px' }}>
                        <p><strong>Debug Info:</strong></p>
                        <p>Lat: {listing.lat}</p>
                        <p>Lng: {listing.lng}</p>
                    </div>
                    <div className={styles.mapSection}>
                        <h3>Where you'll be</h3>
                        {listing.lat && listing.lng ? (
                            <MapWrapper center={[listing.lat, listing.lng]} />
                        ) : (
                            <p>Location data not available</p>
                        )}
                    </div>
                </div>
                <BookingWidget listing={listing} />
            </div>
        </div>
    );
}
