'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    CalendarDays,
    Users,
    DollarSign,
    Settings,
    LogOut
} from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Building2, label: 'Listings', href: '/admin/listings' },
    { icon: CalendarDays, label: 'Reservations', href: '/admin/reservations' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: DollarSign, label: 'Earnings', href: '/admin/earnings' },
];

const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-[#FF385C]">Admin Panel</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-[#FF385C] text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <SignOutButton>
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </SignOutButton>
            </div>
        </div>
    );
};

export default AdminSidebar;
