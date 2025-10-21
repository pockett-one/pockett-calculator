'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Cake } from 'lucide-react';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{years: number; months: number; days: number} | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  const relatedCalculators = [
    { name: 'Date', href: '/date-calculator', icon: '📅' },
    { name: 'Time', href: '/time-calculator', icon: '⏰' },
    { name: 'Hours', href: '/hours-calculator', icon: '⌚' },
    { name: 'GPA', href: '/gpa-calculator', icon: '📊' },
    { name: 'Grade', href: '/grade-calculator', icon: '📝' },
  ];

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Birth Date</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Calculate Age On</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        <button
          onClick={calculateAge}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation select-none"
        >
          <Cake className="w-5 h-5" />
          Calculate Age
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Age</div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-4xl led-result">{result.years}</div>
                  <div className="text-xs text-gray-400 mt-2 uppercase tracking-wide">Years</div>
                </div>
                <div>
                  <div className="text-4xl led-result">{result.months}</div>
                  <div className="text-xs text-gray-400 mt-2 uppercase tracking-wide">Months</div>
                </div>
                <div>
                  <div className="text-4xl led-result">{result.days}</div>
                  <div className="text-xs text-gray-400 mt-2 uppercase tracking-wide">Days</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Features</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Calculate exact age in years, months, and days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Find age on any specific date (past or future)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Perfect for birthday countdowns and milestone tracking</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
