'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Dices } from 'lucide-react';

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum) || minNum >= maxNum) {
      return;
    }

    const numbers: number[] = [];
    for (let i = 0; i < Math.min(countNum, 100); i++) {
      numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }
    setResults(numbers);
  };

  const relatedCalculators = [
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Password Generator', href: '/password-generator', icon: '🔒' },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', icon: 'σ' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Triangle', href: '/triangle-calculator', icon: '△' },
  ];

  return (
    <CalculatorLayout
      title="Random Number Generator"
      description="Generate random numbers within your specified range"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Count</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              max="100"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <Dices className="w-5 h-5" />
          Generate Random Numbers
        </button>

        {results.length > 0 && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="text-xs font-semibold text-gray-400 mb-4 text-center uppercase tracking-wider">Generated Numbers</div>
            <div className="flex flex-wrap gap-3 justify-center">
              {results.map((num, i) => (
                <div key={i} className="px-5 py-3 bg-gray-950 rounded-lg border-2 border-gray-700 led-result text-2xl">
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Use Cases</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Generate lottery numbers or random picks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Create random samples for testing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Make unbiased decisions with random selection</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
