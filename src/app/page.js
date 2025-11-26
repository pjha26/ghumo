import React from 'react';
import CategoryBar from '@/components/Home/CategoryBar';
import FilteredListings from '@/components/Home/FilteredListings';
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
      <FilteredListings initialListings={listings} />
    </div>
  );
}
