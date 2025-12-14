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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-violet-500/20 shadow-lg shadow-violet-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform duration-300">
              <Calculator className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">Pockett Calculator</h1>
              <p className="text-xs text-slate-400">Free Online Calculators</p>
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
                  className="w-full px-5 py-3 pr-12 text-sm bg-slate-900/50 border border-violet-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent shadow-inner text-slate-200 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Autocomplete Suggestions */}
            {showSuggestions && searchQuery.length > 0 && filteredCalculators.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-violet-500/20 rounded-xl shadow-xl shadow-black/50 overflow-hidden z-50">
                {filteredCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="block px-5 py-3 hover:bg-violet-500/10 transition-colors border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <Calculator className="w-5 h-5 text-slate-500" />
                      <span className="text-sm font-medium text-slate-200">{calc.name}</span>
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
              className="px-3 py-2 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Math
            </Link>
            <Link
              href="/#other-calculators"
              className="px-3 py-2 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Other
            </Link>
            <Link
              href="/#features"
              className="px-3 py-2 text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            >
              Features
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
