import React from 'react';
import prisma from '@/lib/prisma';
import DataTable from '@/components/Admin/DataTable';

async function getReservations() {
    const reservations = await prisma.reservation.findMany({
        include: {
            listing: true,
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return reservations;
}

export default async function AdminReservationsPage() {
    const reservations = await getReservations();

    const columns = [
        {
            header: 'Listing',
            accessorKey: 'listing.title',
            cell: (row) => <span className="font-medium">{row.listing?.title || 'Unknown Listing'}</span>,
        },
        {
            header: 'Guest',
            accessorKey: 'user.name',
            cell: (row) => (
                <div>
                    <p className="font-medium">{row.user?.name || 'Unknown Guest'}</p>
                    <p className="text-xs text-gray-500">{row.user?.email}</p>
                </div>
            ),
        },
        {
            header: 'Dates',
            cell: (row) => {
                const start = new Date(row.startDate).toLocaleDateString();
                const end = new Date(row.endDate).toLocaleDateString();
                return (
                    <div className="text-sm">
                        <p>{start}</p>
                        <p className="text-gray-400 text-xs">to</p>
                        <p>{end}</p>
                    </div>
                );
            },
        },
        {
            header: 'Price',
            accessorKey: 'totalPrice',
            cell: (row) => `₹${row.totalPrice.toLocaleString('en-IN')}`,
        },
        {
            header: 'Status',
            accessorKey: 'paymentStatus',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' :
                        row.paymentStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                    }`}>
                    {row.paymentStatus}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
                <p className="text-gray-500">View all booking history</p>
            </div>

            <DataTable columns={columns} data={reservations} searchKey="listing.title" />
        </div>
    );
}
