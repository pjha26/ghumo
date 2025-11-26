import React from 'react';
import prisma from '@/lib/prisma';
import UsersTable from '@/components/Admin/UsersTable';

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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Users</h1>
                <p className="text-gray-400">Manage user access and roles</p>
            </div>

            <UsersTable users={users} />
        </div>
    );
}
