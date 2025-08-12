import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Link from "next/link";

const interSans = Inter({
  variable: "--font-inter-sans",
});

export const metadata: Metadata = {
  title: "✈️ SkyQuest | Find Your Perfect Flight",
  description:
    "Easily search and compare flights to your favorite destinations. Enter your details and explore the best travel options in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <header className="bg-gray-100 shadow">
          <div className="max-w-6xl mx-auto flex items-center justify-between p-2 md:p-4">
            <Link href="/">
              <h1 className="text-2xl font-extrabold">SkyQuest</h1>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
