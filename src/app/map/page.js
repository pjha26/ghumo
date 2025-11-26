import prisma from '@/lib/prisma';
import SmartMap from '@/components/Map/SmartMap';
import styles from './map.module.css';

async function getListings() {
    try {
        const listings = await prisma.listing.findMany({
            where: {
                lat: { not: null },
                lng: { not: null }
            },
            include: {
                host: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            },
            take: 50 // Limit for performance
        });

        return listings;
    } catch (error) {
        console.error('Error fetching listings:', error);
        return [];
    }
}

export default async function MapPage() {
    const listings = await getListings();

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>🗺️ Smart Map Intelligence</h1>
                <p>Explore listings with advanced map layers and insights</p>
            </div>
            <SmartMap listings={listings} />
        </div>
    );
}
