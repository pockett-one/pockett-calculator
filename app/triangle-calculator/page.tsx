'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

export default function TriangleCalculatorPage() {
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [result, setResult] = useState<{ area: number; perimeter: number; type: string } | null>(null);

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      return;
    }

    // Check if valid triangle
    if (a + b <= c || b + c <= a || a + c <= b) {
      alert('Invalid triangle: sum of any two sides must be greater than the third side');
      return;
    }

    // Calculate perimeter
    const perimeter = a + b + c;

    // Calculate area using Heron's formula
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // Determine triangle type
    let type = 'Scalene';
    if (a === b && b === c) type = 'Equilateral';
    else if (a === b || b === c || a === c) type = 'Isosceles';

    setResult({ area, perimeter, type });
  };

  const relatedCalculators = [
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', icon: 'σ' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Conversion', href: '/conversion-calculator', icon: '⇄' },
    { name: 'Concrete', href: '/concrete-calculator', icon: '🏗️' },
  ];

  return (
    <CalculatorLayout
      title="Triangle Calculator"
      description="Calculate area, perimeter, and triangle type from three sides"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Side A</label>
            <input
              type="number"
              value={sideA}
              onChange={(e) => setSideA(e.target.value)}
              placeholder="Length"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Side B</label>
            <input
              type="number"
              value={sideB}
              onChange={(e) => setSideB(e.target.value)}
              placeholder="Length"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Side C</label>
            <input
              type="number"
              value={sideC}
              onChange={(e) => setSideC(e.target.value)}
              placeholder="Length"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none"
        >
          △ Calculate Triangle
        </button>

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Area</div>
                  <div className="text-2xl led-result">{result.area.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 mt-2 uppercase tracking-wide">sq units</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Perimeter</div>
                  <div className="text-2xl led-result">{result.perimeter.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 mt-2 uppercase tracking-wide">units</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Type</div>
                  <div className="text-2xl led-result-red">{result.type}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Triangle Types</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div><strong>Equilateral:</strong> All three sides are equal</div>
            <div><strong>Isosceles:</strong> Two sides are equal</div>
            <div><strong>Scalene:</strong> All sides are different</div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
