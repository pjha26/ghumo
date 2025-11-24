import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb Clone",
  description: "A clone of Airbnb built with Next.js",
};

import AuthModal from "@/components/Auth/AuthModal";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthModal />
          <Header />
          <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
