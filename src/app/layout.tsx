import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';
import { EventProvider } from '@/context/EventContext';
import { CouponProvider } from '@/context/CouponContext';
import { ReferralProvider } from '@/context/ReferralContext';

export const metadata: Metadata = {
  title: 'EventSpotlight',
  description: 'Your stage for unforgettable events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <EventProvider>
          <CouponProvider>
            <ReferralProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </ReferralProvider>
          </CouponProvider>
        </EventProvider>
      </body>
    </html>
  );
}
