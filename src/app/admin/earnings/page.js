import React from 'react';
import prisma from '@/lib/prisma';
import RevenueChart from '@/components/Admin/RevenueChart';
import { DollarSign } from 'lucide-react';

async function getRevenueData() {
    const reservations = await prisma.reservation.findMany({
        where: {
            paymentStatus: 'PAID',
        },
        select: {
            totalPrice: true,
            createdAt: true,
        },
    });

    const monthlyRevenue = {};

    // Initialize all months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(month => monthlyRevenue[month] = 0);

    // Aggregate data
    reservations.forEach(res => {
        const month = new Date(res.createdAt).toLocaleString('default', { month: 'short' });
        monthlyRevenue[month] += res.totalPrice;
    });

    // Format for chart
    const chartData = months.map(month => ({
        name: month,
        total: monthlyRevenue[month],
    }));

    const totalRevenue = reservations.reduce((acc, curr) => acc + curr.totalPrice, 0);

    return { chartData, totalRevenue };
}

export default async function AdminEarningsPage() {
    const { chartData, totalRevenue } = await getRevenueData();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
                <p className="text-gray-500">Revenue analytics and overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-4 rounded-lg bg-green-100 text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString('en-IN')}</h3>
                    </div>
                </div>
            </div>

            <RevenueChart data={chartData} />
        </div>
    );
}
