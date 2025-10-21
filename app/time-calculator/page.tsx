'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Clock } from 'lucide-react';

export default function TimeCalculatorPage() {
  const [hours1, setHours1] = useState('0');
  const [minutes1, setMinutes1] = useState('0');
  const [hours2, setHours2] = useState('0');
  const [minutes2, setMinutes2] = useState('0');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const h1 = parseInt(hours1) || 0;
    const m1 = parseInt(minutes1) || 0;
    const h2 = parseInt(hours2) || 0;
    const m2 = parseInt(minutes2) || 0;

    let totalMinutes = operation === 'add'
      ? (h1 * 60 + m1) + (h2 * 60 + m2)
      : (h1 * 60 + m1) - (h2 * 60 + m2);

    const hours = Math.floor(Math.abs(totalMinutes) / 60);
    const minutes = Math.abs(totalMinutes) % 60;
    const sign = totalMinutes < 0 ? '-' : '';

    setResult(`${sign}${hours}h ${minutes}m`);
  };

  const relatedCalculators = [
    { name: 'Date', href: '/date-calculator', icon: '📅' },
    { name: 'Age', href: '/age-calculator', icon: '🎂' },
    { name: 'Hours', href: '/hours-calculator', icon: '⌚' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
  ];

  return (
    <CalculatorLayout
      title="Time Calculator"
      description="Add or subtract time durations in hours and minutes"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">First Time</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                value={hours1}
                onChange={(e) => setHours1(e.target.value)}
                placeholder="Hours"
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-center"
              />
              <div className="text-xs text-gray-500 text-center mt-1">Hours</div>
            </div>
            <div>
              <input
                type="number"
                value={minutes1}
                onChange={(e) => setMinutes1(e.target.value)}
                placeholder="Minutes"
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-center"
              />
              <div className="text-xs text-gray-500 text-center mt-1">Minutes</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setOperation('add')}
            className={`min-h-[56px] py-3 rounded-xl font-bold transition-all touch-manipulation select-none flex items-center justify-center ${
              operation === 'add' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            ➕ Add
          </button>
          <button
            onClick={() => setOperation('subtract')}
            className={`min-h-[56px] py-3 rounded-xl font-bold transition-all touch-manipulation select-none flex items-center justify-center ${
              operation === 'subtract' ? 'bg-gradient-to-r from-red-300 to-red-400 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300'
            }`}
          >
            ➖ Subtract
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Second Time</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                value={hours2}
                onChange={(e) => setHours2(e.target.value)}
                placeholder="Hours"
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-center"
              />
              <div className="text-xs text-gray-500 text-center mt-1">Hours</div>
            </div>
            <div>
              <input
                type="number"
                value={minutes2}
                onChange={(e) => setMinutes2(e.target.value)}
                placeholder="Minutes"
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-center"
              />
              <div className="text-xs text-gray-500 text-center mt-1">Minutes</div>
            </div>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <Clock className="w-5 h-5" />
          Calculate
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl text-center">
            <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Result</div>
            <div className="text-4xl led-result">{result}</div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
