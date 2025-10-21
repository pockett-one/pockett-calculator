import { Metadata } from 'next';
import { getCalculatorMetadata } from '../lib/seo-config';

export const metadata: Metadata = getCalculatorMetadata('fraction');

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
