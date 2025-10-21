import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HorizontalAdBanner from "./components/HorizontalAdBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pockett Calculator - Lightning-Fast Online Calculators",
  description: "Pockett Calculator offers lightning-fast, precision calculators for all your needs. Scientific, percentage, age, GPA and 10+ more calculators. 100% free, no registration required.",
  keywords: "pockett calculator, online calculator, scientific calculator, percentage calculator, math calculator, free calculator, age calculator, GPA calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white`} suppressHydrationWarning>
        <Header />
        <HorizontalAdBanner />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
