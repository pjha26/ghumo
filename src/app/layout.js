import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ClerkProvider } from '@clerk/nextjs'

import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb Clone",
  description: "A clone of Airbnb built with Next.js",
};

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export default async function RootLayout({ children }) {
  let dbUser = null;
  try {
    const user = await currentUser();
    if (user && user.emailAddresses?.[0]?.emailAddress) {
      dbUser = await prisma.user.findUnique({
        where: { email: user.emailAddresses[0].emailAddress },
      });
    }
  } catch (error) {
    console.error('Error fetching user in layout:', error);
  }

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            <Header currentUser={dbUser} />
            <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
