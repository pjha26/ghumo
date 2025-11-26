import React from 'react';
import prisma from '@/lib/prisma';
import DataTable from '@/components/Admin/DataTable';
import UserActions from '@/components/Admin/UserActions';
import Image from 'next/image';

async function getUsers() {
    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return users;
}

export default async function AdminUsersPage() {
    const users = await getUsers();

    const columns = [
        {
            header: 'User',
            accessorKey: 'name',
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                        <Image
                            src={row.image || '/placeholder-user.png'}
                            alt={row.name || 'User'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{row.name || 'Guest'}</p>
                        <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            header: 'Role',
            accessorKey: 'isAdmin',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                    {row.isAdmin ? 'Admin' : 'User'}
                </span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'isBlocked',
            cell: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                    {row.isBlocked ? 'Blocked' : 'Active'}
                </span>
            ),
        },
        {
            header: 'Actions',
            cell: (row) => <UserActions userId={row.id} isBlocked={row.isBlocked} />,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                <p className="text-gray-500">Manage user access and roles</p>
            </div>

            <DataTable columns={columns} data={users} searchKey="name" />
        </div>
    );
}
