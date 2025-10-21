'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calculator, Search } from 'lucide-react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const allCalculators = [
    { name: 'Scientific Calculator', href: '/scientific-calculator', keywords: ['scientific', 'trig', 'trigonometry', 'sin', 'cos', 'tan'] },
    { name: 'Fraction Calculator', href: '/fraction-calculator', keywords: ['fraction', 'divide', 'multiply'] },
    { name: 'Percentage Calculator', href: '/percentage-calculator', keywords: ['percentage', 'percent', '%'] },
    { name: 'Random Number Generator', href: '/random-number-generator', keywords: ['random', 'number', 'generator'] },
    { name: 'Triangle Calculator', href: '/triangle-calculator', keywords: ['triangle', 'geometry', 'area'] },
    { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator', keywords: ['standard', 'deviation', 'statistics', 'stats'] },
    { name: 'Age Calculator', href: '/age-calculator', keywords: ['age', 'birthday', 'years'] },
    { name: 'Date Calculator', href: '/date-calculator', keywords: ['date', 'calendar', 'days'] },
    { name: 'Time Calculator', href: '/time-calculator', keywords: ['time', 'hours', 'minutes'] },
    { name: 'Hours Calculator', href: '/hours-calculator', keywords: ['hours', 'work', 'timesheet'] },
    { name: 'GPA Calculator', href: '/gpa-calculator', keywords: ['gpa', 'grade', 'school', 'college'] },
    { name: 'Grade Calculator', href: '/grade-calculator', keywords: ['grade', 'school', 'marks'] },
    { name: 'Concrete Calculator', href: '/concrete-calculator', keywords: ['concrete', 'construction', 'building'] },
    { name: 'Subnet Calculator', href: '/subnet-calculator', keywords: ['subnet', 'network', 'ip', 'cidr'] },
    { name: 'Password Generator', href: '/password-generator', keywords: ['password', 'secure', 'generate'] },
    { name: 'Conversion Calculator', href: '/conversion-calculator', keywords: ['conversion', 'convert', 'units'] },
  ];

  const filteredCalculators = allCalculators.filter(calc => 
    searchQuery.length > 0 && (
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  ).slice(0, 8);

  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    if (showSuggestions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSuggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredCalculators.length > 0) {
      router.push(filteredCalculators[0].href);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calculator className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black gradient-text tracking-tight">
                Pockett
              </span>
              <span className="text-xs text-gray-500 font-semibold -mt-1">Calculator</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search calculators... (e.g., percentage, age, subnet)"
                  className="w-full px-5 py-3 pr-12 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent shadow-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Autocomplete Suggestions */}
            {showSuggestions && searchQuery.length > 0 && filteredCalculators.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                {filteredCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="block px-5 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{calc.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
            <Link 
              href="/#math-calculators" 
              className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-all duration-200"
            >
              Math
            </Link>
            <Link 
              href="/#other-calculators" 
              className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-all duration-200"
            >
              Other
            </Link>
            <Link 
              href="/#features" 
              className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-all duration-200"
            >
              Features
            </Link>
          </nav>
        </div>
      </div>

      {/* Top Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="ad-slot" style={{ minHeight: '90px' }}>
          <div className="text-center">
            <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
            <div className="text-xs text-gray-400">Google AdSense - Premium Banner (728x90)</div>
          </div>
        </div>
      </div>
    </header>
  );
}
