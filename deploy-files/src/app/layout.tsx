import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from 'react-hot-toast';
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: "شركة أفق الحياة | Life Horizon Company",
  description: "شركة أفق الحياة لتكنولوجيا المعلومات والخدمات العامة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cairo.className}>
        <ThemeProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                style: {
                  background: '#22c55e',
                  color: '#fff',
                },
              },
              error: {
                duration: 3000,
                style: {
                  background: '#ef4444',
                  color: '#fff',
                },
              },
            }}
          />
          <div className="min-h-screen bg-white dark:bg-dark text-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <WhatsAppFloat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
