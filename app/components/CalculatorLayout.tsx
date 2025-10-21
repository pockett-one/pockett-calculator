import React from 'react';
import Link from 'next/link';
import { 
  ChevronRight,
  Calculator,
  Percent,
  PieChart,
  Dices,
  Triangle,
  BarChart3,
  Cake,
  Calendar,
  Clock,
  Hourglass,
  GraduationCap,
  FileText,
  Package,
  Network,
  Lock,
  ArrowLeftRight
} from 'lucide-react';
import CalculatorMenu from './CalculatorMenu';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  relatedCalculators?: Array<{ name: string; href: string; icon?: string }>;
}

// Icon mapping for calculator names to Lucide icons
const getIconForCalculator = (href: string) => {
  const iconMap: Record<string, any> = {
    '/scientific-calculator': Calculator,
    '/percentage-calculator': Percent,
    '/fraction-calculator': PieChart,
    '/random-number-generator': Dices,
    '/triangle-calculator': Triangle,
    '/standard-deviation-calculator': BarChart3,
    '/age-calculator': Cake,
    '/date-calculator': Calendar,
    '/time-calculator': Clock,
    '/hours-calculator': Hourglass,
    '/gpa-calculator': GraduationCap,
    '/grade-calculator': FileText,
    '/concrete-calculator': Package,
    '/subnet-calculator': Network,
    '/password-generator': Lock,
    '/conversion-calculator': ArrowLeftRight,
  };
  return iconMap[href] || Calculator;
};

export default function CalculatorLayout({ 
  title, 
  description, 
  children,
  relatedCalculators = []
}: CalculatorLayoutProps) {
  const defaultRelated = [
    { name: 'Scientific', href: '/scientific-calculator' },
    { name: 'Percentage', href: '/percentage-calculator' },
    { name: 'Age', href: '/age-calculator' },
    { name: 'GPA', href: '/gpa-calculator' },
    { name: 'Date', href: '/date-calculator' },
  ];

  const related = relatedCalculators.length > 0 ? relatedCalculators : defaultRelated;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                href="/" 
                className="text-gray-500 hover:text-gray-900 transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li className="text-gray-400">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <span className="text-gray-900 font-semibold" aria-current="page">
                {title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Calculator Menu */}
          <CalculatorMenu />

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Page Header */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-black gradient-text tracking-tight">
                {title}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Calculator Content */}
            <div className="premium-card rounded-3xl p-6 md:p-8">
              {children}
            </div>

            {/* Related Calculators */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Related Calculators</h2>
              <div className="flex flex-wrap gap-2">
                {related.map((calc) => {
                  const IconComponent = getIconForCalculator(calc.href);
                  return (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-900 hover:text-white border border-gray-200 hover:border-gray-900 rounded-full text-sm font-semibold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{calc.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Ad Space */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-6">
              <div className="ad-slot" style={{ minHeight: '250px' }}>
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
                  <div className="text-xs text-gray-400">300x250</div>
                </div>
              </div>
              <div className="ad-slot" style={{ minHeight: '250px' }}>
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
                  <div className="text-xs text-gray-400">300x250</div>
                </div>
              </div>
              <div className="ad-slot" style={{ minHeight: '250px' }}>
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
                  <div className="text-xs text-gray-400">300x250</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
