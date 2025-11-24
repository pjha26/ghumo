import React from 'react';
import CategoryBar from '@/components/Home/CategoryBar';
import ListingCard from '@/components/Home/ListingCard';
import prisma from '@/lib/prisma';
import styles from './page.module.css';

import Hero from '@/components/Home/Hero';

export const dynamic = 'force-dynamic';

async function getListings() {
  try {
    const listings = await prisma.listing.findMany();
    return listings;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

export default async function Home() {
  const listings = await getListings();

  return (
    <div className={styles.home}>
      <Hero />
      <CategoryBar />
      <div className={`container ${styles.gridContainer}`}>
        <div className={styles.grid}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
