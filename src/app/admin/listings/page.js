import React from 'react';
import prisma from '@/lib/prisma';
import ListingsTable from '@/components/Admin/ListingsTable';

async function getListings() {
    const listings = await prisma.listing.findMany({
        orderBy: {
            id: 'desc',
        },
    });
    return listings;
}

export default async function AdminListingsPage() {
    const listings = await getListings();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Listings</h1>
                    <p className="text-gray-400">Manage all property listings</p>
                </div>
                <button className="bg-[#FF385C] text-white px-4 py-2 rounded-lg font-medium hover:brightness-95 transition-all shadow-lg shadow-red-900/20">
                    Create Listing
                </button>
            </div>

            <ListingsTable listings={listings} />
        </div>
    );
}
