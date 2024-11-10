import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { Toaster } from "sonner";
import { ThemeProvider } from 'next-themes';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "repo2ai.com - Extrae y visualiza repositorios de GitHub",
  description: "Accede y descarga el contenido completo de tus repositorios de GitHub de forma estructurada.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth(); 

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
