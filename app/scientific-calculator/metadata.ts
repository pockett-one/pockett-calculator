import { Metadata } from 'next';

const baseUrl = 'https://pockettcalculator.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Scientific Calculator Online - Free Advanced Math Calculator | Pockett Calculator",
  description: "Free online scientific calculator with trigonometric functions, logarithms, exponentials, and more. Perfect for students, engineers, and scientists. No download required, works on mobile and desktop.",
  keywords: "scientific calculator online, advanced calculator, trigonometry calculator, logarithm calculator, exponential calculator, free scientific calculator, scientific calculator with steps, engineering calculator",
  alternates: {
    canonical: `${baseUrl}/scientific-calculator`,
  },
  openGraph: {
    title: "Scientific Calculator - Free Online Advanced Math Calculator",
    description: "Advanced scientific calculator with trig functions, logarithms, and more. Free, no registration required.",
    url: `${baseUrl}/scientific-calculator`,
    siteName: 'Pockett Calculator',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og-scientific-calculator.png`,
        width: 1200,
        height: 630,
        alt: 'Scientific Calculator - Pockett Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scientific Calculator - Free Online Advanced Math Calculator',
    description: 'Advanced scientific calculator with trig functions, logarithms, and more.',
    images: [`${baseUrl}/og-scientific-calculator.png`],
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
};

