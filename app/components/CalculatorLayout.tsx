'use client';

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
import SidebarAd from './SidebarAd';

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
                className="text-slate-400 hover:text-white transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li className="text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <span className="text-violet-300 font-semibold" aria-current="page">
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
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight text-glow">
                {title}
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Calculator Content */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl">
              {children}
            </div>

            {/* Related Calculators */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Related Calculators</h2>
              <div className="flex flex-wrap gap-2">
                {related.map((calc) => {
                  const IconComponent = getIconForCalculator(calc.href);
                  return (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 hover:bg-violet-900/50 border border-white/10 hover:border-violet-500/50 rounded-full text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-violet-500/20"
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
            <div className="sticky top-32">
              <SidebarAd
                adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT}
                count={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
