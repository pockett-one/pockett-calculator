'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Package } from 'lucide-react';

export default function ConcreteCalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [result, setResult] = useState<{ volume: number; bags: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);

    if (isNaN(l) || isNaN(w) || isNaN(d)) return;

    // Calculate volume in cubic yards (for feet) or cubic meters
    let volume = 0;
    if (unit === 'feet') {
      volume = (l * w * d) / 27; // Convert cubic feet to cubic yards
    } else {
      volume = l * w * d; // Cubic meters
    }

    // Estimate 80lb bags needed (assuming ~0.6 cubic feet per bag)
    const bags = Math.ceil(volume * 45); // Rough estimate: 45 bags per cubic yard

    setResult({ volume, bags });
  };

  const relatedCalculators = [
    { name: 'Triangle', href: '/triangle-calculator', icon: '△' },
    { name: 'Conversion', href: '/conversion-calculator', icon: '⇄' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', icon: 'σ' },
  ];

  return (
    <CalculatorLayout
      title="Concrete Calculator"
      description="Calculate concrete volume and estimate bags needed for your project"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setUnit('feet')}
            className={`py-3 rounded-xl font-semibold transition-all ${
              unit === 'feet' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            📏 Feet
          </button>
          <button
            onClick={() => setUnit('meters')}
            className={`py-3 rounded-xl font-semibold transition-all ${
              unit === 'meters' ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300'
            }`}
          >
            📐 Meters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Length ({unit})</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Length"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Width ({unit})</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Width"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Depth ({unit})</label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              placeholder="Depth"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" />
          Calculate Concrete
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Volume</div>
                <div className="text-4xl led-result">{result.volume.toFixed(2)}</div>
                <div className="text-xs text-gray-500 mt-2 uppercase tracking-wide">{unit === 'feet' ? 'cubic yards' : 'cubic meters'}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">80lb Bags</div>
                <div className="text-4xl led-result-red">{result.bags}</div>
                <div className="text-xs text-gray-500 mt-2 uppercase tracking-wide">approx.</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Always order 5-10% extra to account for waste and spillage</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>One 80lb bag covers approximately 0.6 cubic feet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>For depth, use 4 inches (0.33 feet) for standard slabs</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
