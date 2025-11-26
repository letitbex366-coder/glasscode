import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
   title: 'Glasscode Innovations',
  // title: 'learning',
  description: 'Build Modern Web Apps & AI Automation That Scale Your Business. We create fast, secure, and intelligent digital solutions using MERN Stack, AI Agents, and smart automation systems.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
