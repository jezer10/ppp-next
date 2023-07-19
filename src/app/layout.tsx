import { siteConfig } from '@/config/site';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const inter = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? ''),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Educational'],
  authors: [
    {
      name: 'Mijail Palomino',
    },
  ],
  creator: 'Mijail Palomino',
};
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
