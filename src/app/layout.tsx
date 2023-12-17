import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/store/provider';
import { Theme } from 'react-daisyui';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Guess The Number',
  description: 'Guess the number game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen w-screen overflow-hidden bg-slate-900 ${inter.className}`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
