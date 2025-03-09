import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { TopNav } from '@/components/top-nav';
import { Toaster } from '@/components/ui/toaster';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

const Roboto = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-roboto-mono'
});

export const metadata: Metadata = {
  title: 'HARVY DIGITAL CLOUD',
  description: 'Enterprise Resource Planning System'
};

export default function AuthenticatedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} ${Roboto.variable} flex h-full flex-col`}
      >
        <SidebarProvider defaultOpen>
          <div className="flex h-full flex-col">
            <TopNav />
            <div className="flex flex-1 overflow-hidden pt-16">
              {' '}
              {/* Add pt-16 for top nav spacing */}
              <AppSidebar />
              <main className="relative overflow-y-auto bg-background">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
