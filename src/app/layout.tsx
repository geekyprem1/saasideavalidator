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
  title: 'SaaSRadar AI - SaaS Opportunity Intelligence Platform',
  description: 'Validate your SaaS ideas, scan customer feedback from Reddit and Play Store, detect market gaps, and generate code-ready blueprints for Claude Code.',
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
