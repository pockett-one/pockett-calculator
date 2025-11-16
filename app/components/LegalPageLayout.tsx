'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CalculatorMenu from './CalculatorMenu';
import SidebarAd from './SidebarAd';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
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
          <div className="lg:col-span-6">
            {children}
          </div>

          {/* Right Sidebar - Ad Space */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <SidebarAd 
                adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT}
                count={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

