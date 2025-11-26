import React from 'react';
import prisma from '@/lib/prisma';
import DataTable from '@/components/Admin/DataTable';
import ListingActions from '@/components/Admin/ListingActions';
import Image from 'next/image';

async function getListings() {
    const listings = await prisma.listing.findMany({
        orderBy: {
            id: 'desc', // Using ID as proxy for creation time since createdAt might not be on Listing
        },
    });
    return listings;
}

export default async function AdminListingsPage() {
    const listings = await getListings();

    const columns = [
        {
            header: 'Image',
            accessorKey: 'image',
            cell: (row) => (
                <div className="relative w-16 h-12 rounded-md overflow-hidden bg-gray-100">
                    <Image
                        src={row.images?.[0] || row.image || '/placeholder.png'}
                        alt={row.title}
                        fill
                        className="object-cover"
                    />
                </div>
            ),
        },
        {
            header: 'Title',
            accessorKey: 'title',
            cell: (row) => <span className="font-medium text-gray-900">{row.title}</span>,
        },
        {
            header: 'Location',
            accessorKey: 'location',
        },
        {
            header: 'Price',
            accessorKey: 'price',
            cell: (row) => `₹${row.price.toLocaleString('en-IN')}`,
        },
        {
            header: 'Actions',
            cell: (row) => <ListingActions listingId={row.id} />,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Listings</h1>
                    <p className="text-gray-500">Manage all property listings</p>
                </div>
                <button className="bg-[#FF385C] text-white px-4 py-2 rounded-lg font-medium hover:brightness-95 transition-all">
                    Create Listing
                </button>
            </div>

            <DataTable columns={columns} data={listings} searchKey="title" />
        </div>
    );
}
