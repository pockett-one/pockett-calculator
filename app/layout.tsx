import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HorizontalAdBanner from "./components/HorizontalAdBanner";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pockett Calculator - Free Online Calculators for Math, Science & Everyday Use",
  description: "Free online calculators for quick and accurate calculations. Scientific calculator, percentage calculator, fraction calculator, age calculator, GPA calculator, and more. No downloads, 100% free, mobile-friendly.",
  keywords: [
    "free online calculator",
    "scientific calculator online",
    "percentage calculator",
    "fraction calculator with steps",
    "age calculator from date of birth",
    "GPA calculator college",
    "triangle area calculator",
    "standard deviation calculator",
    "random number generator",
    "date calculator days between",
    "time calculator hours",
    "grade percentage calculator",
    "concrete calculator cubic yards",
    "subnet mask calculator",
    "password generator secure",
    "unit conversion calculator"
  ].join(", "),
  authors: [{ name: "Pockett Calculator" }],
  creator: "Pockett Calculator",
  publisher: "Pockett Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pockettcalculator.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pockett Calculator - Free Online Calculators",
    description: "Lightning-fast, accurate calculators for math, science, finance, and everyday calculations. 100% free, no registration required.",
    url: 'https://pockettcalculator.com',
    siteName: 'Pockett Calculator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pockett Calculator - Free Online Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pockett Calculator - Free Online Calculators',
    description: 'Lightning-fast calculators for all your needs. Scientific, percentage, age, GPA, and more.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon-128x128.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} antialiased bg-white`} suppressHydrationWarning>
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
