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

const StatCard = ({ title, value, icon: Icon, bgColor, iconColor }) => (
    <div style={{
        backgroundColor: '#1E1E1E',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        border: '1px solid #333333',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'transform 0.2s',
    }}>
        <div style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: bgColor,
        }}>
            <Icon size={24} color={iconColor} />
        </div>
        <div>
            <p style={{ fontSize: '14px', color: '#9CA3AF', fontWeight: 500, margin: 0 }}>{title}</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: '4px 0 0 0' }}>{value}</h3>
        </div>
    </div>
);

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', margin: 0 }}>Dashboard</h1>
                <p style={{ color: '#9CA3AF', marginTop: '8px' }}>Welcome back, Admin</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
            }}>
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={Users}
                    bgColor="rgba(59, 130, 246, 0.2)"
                    iconColor="#60A5FA"
                />
                <StatCard
                    title="Total Listings"
                    value={stats.listings}
                    icon={Building2}
                    bgColor="rgba(168, 85, 247, 0.2)"
                    iconColor="#C084FC"
                />
                <StatCard
                    title="Total Reservations"
                    value={stats.reservations}
                    icon={CalendarDays}
                    bgColor="rgba(249, 115, 22, 0.2)"
                    iconColor="#FB923C"
                />
                <StatCard
                    title="Total Revenue"
                    value={`₹${stats.revenue.toLocaleString('en-IN')}`}
                    icon={DollarSign}
                    bgColor="rgba(34, 197, 94, 0.2)"
                    iconColor="#4ADE80"
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '32px'
            }}>
                <div style={{
                    backgroundColor: '#1E1E1E',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    border: '1px solid #333333'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Recent Activity</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '192px', color: '#6B7280' }}>
                        Chart Placeholder
                    </div>
                </div>

                <div style={{
                    backgroundColor: '#1E1E1E',
                    padding: '24px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                    border: '1px solid #333333'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>Recent Bookings</h2>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '192px', color: '#6B7280' }}>
                        List Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
