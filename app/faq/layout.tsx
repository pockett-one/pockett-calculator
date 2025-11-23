import { Metadata } from 'next';
import StructuredData, { getFAQSchema, getBreadcrumbSchema } from '../components/StructuredData';
import { allFAQs } from '../lib/faq-data';

export const metadata: Metadata = {
  title: "FAQ - Calculator Questions Answered | Pockett Calculator",
  description: "Find answers to all your calculator questions. Learn how to use online calculators, calculate percentages, work with scientific functions, and more. Comprehensive FAQ for all calculator types.",
  keywords: "calculator faq, how to use calculator, online calculator help, calculator questions, percentage calculator guide, scientific calculator help, calculator tutorial, free calculator guide",
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: "Frequently Asked Questions - Pockett Calculator",
    description: "Complete guide to using online calculators. Get answers about scientific calculators, percentage calculations, age calculations, and more.",
    url: 'https://pockettcalculator.com/faq',
    siteName: 'Pockett Calculator',
    type: 'website',
    images: [
      {
        url: '/og-faq.png',
        width: 1200,
        height: 630,
        alt: 'Calculator FAQ - Pockett Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator FAQ - All Your Questions Answered',
    description: 'Comprehensive answers to calculator questions. Learn how to use online calculators effectively.',
    images: ['/og-faq.png'],
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data on server side to avoid duplicates
  // This prevents the "Duplicate field 'FAQPage'" error from Google Search Console
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://pockettcalculator.com' },
    { name: 'FAQ', url: 'https://pockettcalculator.com/faq' }
  ]);

  const faqSchema = getFAQSchema(allFAQs);

  return (
    <>
      {/* Structured Data - Rendered once on server side */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      {children}
    </>
  );
}

