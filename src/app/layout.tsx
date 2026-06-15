import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LaunchDNA - Discover SaaS Opportunities Worth Building',
  description: 'LaunchDNA analyzes real customer conversations and market signals to help founders decide what to build next.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#030303]">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col text-gray-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}
