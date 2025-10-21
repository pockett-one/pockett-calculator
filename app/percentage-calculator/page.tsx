'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { BookOpen, Lightbulb, BarChart3, Target, Zap, ShoppingCart, FileCheck, TrendingUp as TrendIcon, DollarSign, CreditCard, Book } from 'lucide-react';

export default function PercentageCalculatorPage() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<'what-is' | 'is-what' | 'change'>('what-is');

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    
    if (isNaN(v1) || isNaN(v2)) {
      setResult('Please enter valid numbers');
      return;
    }

    let res = '';
    switch (mode) {
      case 'what-is':
        // What is X% of Y?
        res = `${v1}% of ${v2} is ${(v1 / 100 * v2).toFixed(2)}`;
        break;
      case 'is-what':
        // X is what % of Y?
        res = `${v1} is ${((v1 / v2) * 100).toFixed(2)}% of ${v2}`;
        break;
      case 'change':
        // Percentage change from X to Y
        const change = ((v2 - v1) / v1) * 100;
        res = `${change >= 0 ? 'Increase' : 'Decrease'} of ${Math.abs(change).toFixed(2)}%`;
        break;
    }
    
    setResult(res);
  };

  const relatedCalculators = [
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Fraction', href: '/fraction-calculator', icon: '¾' },
    { name: 'GPA', href: '/gpa-calculator', icon: '📊' },
    { name: 'Grade', href: '/grade-calculator', icon: '📝' },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', icon: 'σ' },
  ];

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages, percent changes, and more with ease"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        {/* Mode Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setMode('what-is')}
            className={`min-h-[56px] p-4 rounded-xl font-semibold transition-all duration-200 touch-manipulation select-none flex items-center justify-center ${
              mode === 'what-is'
                ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            What is X% of Y?
          </button>
          <button
            onClick={() => setMode('is-what')}
            className={`min-h-[56px] p-4 rounded-xl font-semibold transition-all duration-200 touch-manipulation select-none flex items-center justify-center ${
              mode === 'is-what'
                ? 'bg-gradient-to-r from-blue-300 to-blue-400 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300'
            }`}
          >
            X is what % of Y?
          </button>
          <button
            onClick={() => setMode('change')}
            className={`min-h-[56px] p-4 rounded-xl font-semibold transition-all duration-200 touch-manipulation select-none flex items-center justify-center ${
              mode === 'change'
                ? 'bg-gradient-to-r from-red-300 to-red-400 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300'
            }`}
          >
            % Change
          </button>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {mode === 'what-is' ? 'Percentage (%)' : mode === 'is-what' ? 'Value' : 'Original Value'}
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Enter number"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {mode === 'what-is' ? 'Of Value' : mode === 'is-what' ? 'Total Value' : 'New Value'}
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter number"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-98 touch-manipulation select-none"
        >
          Calculate
        </button>

        {/* Result */}
        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Result</div>
              <div className="text-3xl md:text-4xl led-result">{result}</div>
            </div>
          </div>
        )}

        {/* Detailed Guide */}
        <div className="mt-8 space-y-6">
          {/* Understanding Percentages */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Understanding Percentages
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="leading-relaxed">
                A percentage is a way to express a number as a fraction of 100. The symbol % means "per hundred" or "out of 100".
              </p>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="font-bold text-blue-900 mb-2">Formula:</div>
                <div className="font-mono text-gray-900 bg-gray-50 p-3 rounded">
                  Percentage = (Part / Whole) × 100
                </div>
              </div>
              <p className="leading-relaxed">
                For example: If you scored 45 out of 60 points, your percentage is (45 ÷ 60) × 100 = 75%
              </p>
            </div>
          </div>

          {/* Visual Examples */}
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-600" />
              Real-World Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Sales Tax
                </div>
                <div className="text-gray-700 mb-2">What is 8% of $250?</div>
                <div className="bg-blue-50 p-2 rounded text-xs mb-2">
                  Calculation: 250 × (8 ÷ 100) = $20
                </div>
                <div className="text-blue-600 font-semibold">Answer: $20 tax</div>
              </div>
              <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                <div className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  Test Score
                </div>
                <div className="text-gray-700 mb-2">45 is what % of 60?</div>
                <div className="bg-green-50 p-2 rounded text-xs mb-2">
                  Calculation: (45 ÷ 60) × 100 = 75%
                </div>
                <div className="text-green-600 font-semibold">Answer: 75% score</div>
              </div>
              <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
                <div className="font-bold text-red-900 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Discount
                </div>
                <div className="text-gray-700 mb-2">What is 25% of $80?</div>
                <div className="bg-red-50 p-2 rounded text-xs mb-2">
                  Calculation: 80 × (25 ÷ 100) = $20
                </div>
                <div className="text-red-600 font-semibold">Answer: $20 off, pay $60</div>
              </div>
              <div className="p-4 bg-white rounded-lg border-l-4 border-purple-500">
                <div className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                  <TrendIcon className="w-4 h-4" />
                  Growth
                </div>
                <div className="text-gray-700 mb-2">% change from 100 to 150</div>
                <div className="bg-purple-50 p-2 rounded text-xs mb-2">
                  Calculation: ((150-100) ÷ 100) × 100 = 50%
                </div>
                <div className="text-purple-600 font-semibold">Answer: 50% increase</div>
              </div>
            </div>
          </div>

          {/* Percentage Visualization */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-gray-700" />
              Visual Representation
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">25%</span>
                  <span className="text-gray-600">1/4 of the total</span>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-full bg-blue-500" style={{width: '25%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">50%</span>
                  <span className="text-gray-600">1/2 of the total</span>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-full bg-green-500" style={{width: '50%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">75%</span>
                  <span className="text-gray-600">3/4 of the total</span>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-full bg-red-500" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">100%</span>
                  <span className="text-gray-600">The complete total</span>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-full bg-purple-500" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Use Cases */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-600" />
              Common Use Cases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Finance
                </div>
                <ul className="space-y-1 text-gray-700">
                  <li>• Interest rates</li>
                  <li>• Tax calculations</li>
                  <li>• Investment returns</li>
                  <li>• Loan payments</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Shopping
                </div>
                <ul className="space-y-1 text-gray-700">
                  <li>• Discounts & sales</li>
                  <li>• Price comparisons</li>
                  <li>• Tip calculations</li>
                  <li>• Coupon values</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Education
                </div>
                <ul className="space-y-1 text-gray-700">
                  <li>• Test scores</li>
                  <li>• Grade percentages</li>
                  <li>• Attendance rates</li>
                  <li>• Success metrics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Quick Reference Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">Percentage</th>
                    <th className="px-4 py-2 text-left font-semibold">Decimal</th>
                    <th className="px-4 py-2 text-left font-semibold">Fraction</th>
                    <th className="px-4 py-2 text-left font-semibold">Example (of 100)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2">10%</td><td className="px-4 py-2">0.10</td><td className="px-4 py-2">1/10</td><td className="px-4 py-2">10</td></tr>
                  <tr><td className="px-4 py-2">20%</td><td className="px-4 py-2">0.20</td><td className="px-4 py-2">1/5</td><td className="px-4 py-2">20</td></tr>
                  <tr><td className="px-4 py-2">25%</td><td className="px-4 py-2">0.25</td><td className="px-4 py-2">1/4</td><td className="px-4 py-2">25</td></tr>
                  <tr><td className="px-4 py-2">33.33%</td><td className="px-4 py-2">0.3333</td><td className="px-4 py-2">1/3</td><td className="px-4 py-2">33.33</td></tr>
                  <tr><td className="px-4 py-2">50%</td><td className="px-4 py-2">0.50</td><td className="px-4 py-2">1/2</td><td className="px-4 py-2">50</td></tr>
                  <tr><td className="px-4 py-2">75%</td><td className="px-4 py-2">0.75</td><td className="px-4 py-2">3/4</td><td className="px-4 py-2">75</td></tr>
                  <tr><td className="px-4 py-2">100%</td><td className="px-4 py-2">1.00</td><td className="px-4 py-2">1/1</td><td className="px-4 py-2">100</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
