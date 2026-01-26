import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { property } from "@/config/property";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${property.hotelName} - Book Direct & Save`,
  description: property.tagline,
  keywords: ["apartments", "booking", "accommodation", property.contactInfo.city, property.hotelName],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
