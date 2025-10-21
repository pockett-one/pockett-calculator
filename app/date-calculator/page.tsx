'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Calendar, Plus } from 'lucide-react';

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState('');
  const [mode, setMode] = useState<'difference' | 'add'>('difference');
  const [result, setResult] = useState<string | null>(null);

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setResult(`${diffDays} days between the dates`);
  };

  const addDays = () => {
    const start = new Date(startDate);
    const numDays = parseInt(days);
    start.setDate(start.getDate() + numDays);
    setResult(`Result: ${start.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`);
  };

  const relatedCalculators = [
    { name: 'Age', href: '/age-calculator', icon: '🎂' },
    { name: 'Time', href: '/time-calculator', icon: '⏰' },
    { name: 'Hours', href: '/hours-calculator', icon: '⌚' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'GPA', href: '/gpa-calculator', icon: '📊' },
  ];

  return (
    <CalculatorLayout
      title="Date Calculator"
      description="Calculate the difference between dates or add/subtract days"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => setMode('difference')}
            className={`min-h-[56px] p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 touch-manipulation select-none ${
              mode === 'difference' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Date Difference
          </button>
          <button
            onClick={() => setMode('add')}
            className={`min-h-[56px] p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 touch-manipulation select-none ${
              mode === 'add' ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300'
            }`}
          >
            <Plus className="w-5 h-5" />
            Add/Subtract Days
          </button>
        </div>

        {mode === 'difference' ? (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
              />
            </div>
            <button onClick={calculateDifference} className="w-full min-h-[56px] py-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none">
              Calculate Difference
            </button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Days to Add (use - for subtract)</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="e.g., 30 or -7"
                className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
              />
            </div>
            <button onClick={addDays} className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none">
              Calculate Date
            </button>
          </>
        )}

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl text-center">
            <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Result</div>
            <div className="text-2xl led-result">{result}</div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
