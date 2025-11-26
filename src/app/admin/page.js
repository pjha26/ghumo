import React from 'react';
import prisma from '@/lib/prisma';
import { Users, Building2, CalendarDays, DollarSign } from 'lucide-react';

async function getStats() {
    const [userCount, listingCount, reservationCount, revenueResult] = await Promise.all([
        prisma.user.count(),
        prisma.listing.count(),
        prisma.reservation.count(),
        prisma.reservation.aggregate({
            _sum: {
                totalPrice: true,
            },
            where: {
                paymentStatus: 'PAID',
            },
        }),
    ]);

    return {
        users: userCount,
        listings: listingCount,
        reservations: reservationCount,
        revenue: revenueResult._sum.totalPrice || 0,
    };
}

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`p-4 rounded-lg ${color} bg-opacity-10`}>
            <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">Welcome back, Admin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={Users}
                    color="bg-blue-500 text-blue-500"
                />
                <StatCard
                    title="Total Listings"
                    value={stats.listings}
                    icon={Building2}
                    color="bg-purple-500 text-purple-500"
                />
                <StatCard
                    title="Total Reservations"
                    value={stats.reservations}
                    icon={CalendarDays}
                    color="bg-orange-500 text-orange-500"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.revenue.toLocaleString('en-IN')}`}
                    icon={DollarSign}
                    color="bg-green-500 text-green-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="flex items-center justify-center h-48 text-gray-400">
                        Chart Placeholder
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
                    <div className="flex items-center justify-center h-48 text-gray-400">
                        List Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
