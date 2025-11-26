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
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121212' }}>
            <AdminSidebar />
            <main style={{ flex: 1, marginLeft: '256px', padding: '32px' }}>
                {children}
            </main>
        </div>
    );
}
