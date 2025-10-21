'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Dices, BookOpen, Lightbulb, BarChart3, Sparkles } from 'lucide-react';

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

        {/* What is Random Number Generation */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">What is Random Number Generation?</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Random number generation is the process of producing a sequence of numbers that cannot be predicted 
              better than by random chance. This calculator uses a <strong>pseudorandom number generator (PRNG)</strong>, 
              which creates numbers that appear random and are suitable for most everyday uses.
            </p>
            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="font-mono text-center text-lg text-gray-900">
                Random({min || 1}, {max || 100}) → <span className="text-blue-600 font-bold">?</span>
              </div>
              <p className="text-xs text-gray-600 text-center mt-2">
                Each number in the range has an equal probability of being selected
              </p>
            </div>
          </div>
        </div>

        {/* Practical Applications */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Practical Applications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-gray-900">Gaming & Lottery</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Lottery number selection</li>
                <li>• Dice roll simulation</li>
                <li>• Random team assignments</li>
                <li>• Prize giveaway selections</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-900">Testing & Development</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Test data generation</li>
                <li>• Random sampling</li>
                <li>• Monte Carlo simulations</li>
                <li>• Load testing scenarios</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Dices className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-gray-900">Decision Making</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Random order selection</li>
                <li>• Unbiased choices</li>
                <li>• Survey randomization</li>
                <li>• Statistical sampling</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-gray-900">Security & Cryptography</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Session ID generation</li>
                <li>• Random salt values</li>
                <li>• Nonce generation</li>
                <li>• Authentication codes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Examples */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Common Examples</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-purple-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Dice Roll (1-6)</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-mono">Min: 1, Max: 6</span>
              </div>
              <div className="text-sm text-gray-600">
                Simulates a standard six-sided die roll
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Lottery (1-49)</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-mono">Min: 1, Max: 49, Count: 6</span>
              </div>
              <div className="text-sm text-gray-600">
                Generate 6 random lottery numbers from 1 to 49
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-green-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Percentage (0-100)</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-mono">Min: 0, Max: 100</span>
              </div>
              <div className="text-sm text-gray-600">
                Random percentage value for probability simulations
              </div>
            </div>
          </div>
        </div>

        {/* Probability Distribution Visual */}
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Uniform Distribution</h3>
          <p className="text-sm text-gray-700 mb-4">
            Random number generators use a <strong>uniform distribution</strong>, meaning every number in the 
            range has an equal chance of being selected.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-gray-600 w-8">1</span>
              <div className="flex-1 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                Equal Probability
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-gray-600 w-8">2</span>
              <div className="flex-1 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                Equal Probability
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-gray-600 w-8">...</span>
              <div className="flex-1 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                Equal Probability
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-gray-600 w-8">N</span>
              <div className="flex-1 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                Equal Probability
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center">
            Each number has probability = 1 / (max - min + 1)
          </p>
        </div>

        {/* Tips */}
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Tips for Best Results</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span>
              <span><strong>Uniqueness:</strong> Numbers may repeat - if you need unique numbers, generate more than needed and filter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span>
              <span><strong>Range:</strong> Larger ranges provide more variation in results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span>
              <span><strong>Cryptography:</strong> For security-critical applications, use dedicated cryptographic RNG libraries</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span>
              <span><strong>Testing:</strong> Great for generating test data, but use fixed seeds for reproducible tests</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
