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
    LogOut
} from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import styles from './AdminSidebar.module.css';

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
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Panel</h1>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <SignOutButton>
                    <button className={styles.signOutButton}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </SignOutButton>
            </div>
        </div>
    );
};

export default AdminSidebar;
