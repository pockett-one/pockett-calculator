'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

export default function StandardDeviationCalculatorPage() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<{
    mean: number;
    variance: number;
    stdDev: number;
    count: number;
  } | null>(null);

  const calculate = () => {
    const nums = numbers
      .split(/[\s,]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (nums.length === 0) return;

    const count = nums.length;
    const mean = nums.reduce((sum, n) => sum + n, 0) / count;
    const variance = nums.reduce((sum, n) => sum + Math.pow(n - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    setResult({ mean, variance, stdDev, count });
  };

  const relatedCalculators = [
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Random Number', href: '/random-number-generator', icon: '🎲' },
    { name: 'Triangle', href: '/triangle-calculator', icon: '△' },
    { name: 'GPA', href: '/gpa-calculator', icon: '📊' },
  ];

  return (
    <CalculatorLayout
      title="Standard Deviation Calculator"
      description="Calculate mean, variance, and standard deviation of a dataset"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter Numbers (comma or space separated)
          </label>
          <textarea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="e.g., 10, 20, 30, 40, 50"
            rows={4}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 resize-none"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none"
        >
          σ Calculate Statistics
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Count</div>
                <div className="text-2xl led-result">{result.count}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Mean (μ)</div>
                <div className="text-2xl led-result">{result.mean.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Variance (σ²)</div>
                <div className="text-2xl led-result">{result.variance.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Std Dev (σ)</div>
                <div className="text-2xl led-result-red">{result.stdDev.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">What is Standard Deviation?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span><strong>Mean (μ):</strong> The average of all numbers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span><strong>Variance (σ²):</strong> Average of squared differences from the mean</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span><strong>Standard Deviation (σ):</strong> Measure of how spread out numbers are</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
