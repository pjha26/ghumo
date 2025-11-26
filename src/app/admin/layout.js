import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminSidebar from '@/components/Admin/AdminSidebar';

export default async function AdminLayout({ children }) {
    const user = await currentUser();

    if (!user || !user.emailAddresses?.[0]?.emailAddress) {
        redirect('/sign-in');
    }

    const email = user.emailAddresses[0].emailAddress;
    const dbUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!dbUser || !dbUser.isAdmin) {
        redirect('/');
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
