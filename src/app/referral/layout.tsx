
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';

export default function ReferralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* We don't want the default site header and footer on this special layout */}
      <main className="flex-1">{children}</main>
    </>
  );
}
