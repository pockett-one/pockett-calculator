import { Metadata } from 'next';
import { getCalculatorMetadata } from '../lib/seo-config';

export const metadata: Metadata = getCalculatorMetadata('scientific');

export default function ScientificCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

