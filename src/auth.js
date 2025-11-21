import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET || 'secret',
    providers: [
        Credentials({
            async authorize(credentials) {
                if (credentials.id && credentials.password) {
                    const user = {
                        id: '1',
                        name: 'Demo User',
                        email: credentials.id,
                        image: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                    };
                    return user;
                }
                return null;
            },
        }),
    ],
});
