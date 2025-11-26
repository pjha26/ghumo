import React from 'react';
import prisma from '@/lib/prisma';
import ReservationsTable from '@/components/Admin/ReservationsTable';

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Reservations</h1>
        <p className="text-gray-400">View all booking history</p>
      </div>

      <ReservationsTable reservations={reservations} />
    </div>
  );
}
