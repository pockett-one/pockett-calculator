'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

export default function FractionCalculatorPage() {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState<'+' | '-' | '×' | '÷'>('+');
  const [result, setResult] = useState<string | null>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplify = (numerator: number, denominator: number): string => {
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    const num = numerator / divisor;
    const den = denominator / divisor;
    
    if (den === 1) return `${num}`;
    if (den === 0) return 'Undefined';
    
    return `${num}/${den}`;
  };

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    if (d1 === 0 || d2 === 0) {
      setResult('Error: Denominator cannot be zero');
      return;
    }

    let resultNum = 0;
    let resultDen = 1;

    switch (operation) {
      case '+':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case '-':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case '×':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case '÷':
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }

    const simplified = simplify(resultNum, resultDen);
    setResult(`${n1}/${d1} ${operation} ${n2}/${d2} = ${simplified}`);
  };

  const relatedCalculators = [
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Conversion', href: '/conversion-calculator', icon: '⇄' },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', icon: 'σ' },
    { name: 'Triangle', href: '/triangle-calculator', icon: '△' },
  ];

  return (
    <CalculatorLayout
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions with automatic simplification"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        {/* First Fraction */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">First Fraction</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Numerator"
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors text-center"
            />
            <div className="text-2xl font-bold text-gray-400">/</div>
            <input
              type="number"
              value={den1}
              onChange={(e) => setDen1(e.target.value)}
              placeholder="Denominator"
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors text-center"
            />
          </div>
        </div>

        {/* Operation */}
        <div className="grid grid-cols-4 gap-3">
          {['+', '-', '×', '÷'].map((op, idx) => {
            const colors = [
              'from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600',
              'from-red-300 to-red-400 hover:from-red-400 hover:to-red-500',
              'from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500',
              'from-red-400 to-red-500 hover:from-red-500 hover:to-red-600'
            ];
            return (
              <button
                key={op}
                onClick={() => setOperation(op as '+' | '-' | '×' | '÷')}
                className={`py-3 rounded-xl font-bold text-xl transition-all duration-200 ${
                  operation === op
                    ? `bg-gradient-to-r ${colors[idx]} text-white shadow-lg`
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {op}
              </button>
            );
          })}
        </div>

        {/* Second Fraction */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Second Fraction</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Numerator"
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors text-center"
            />
            <div className="text-2xl font-bold text-gray-400">/</div>
            <input
              type="number"
              value={den2}
              onChange={(e) => setDen2(e.target.value)}
              placeholder="Denominator"
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 transition-colors text-center"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-98"
        >
          Calculate
        </button>

        {/* Result */}
        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Result</div>
              <div className="text-2xl md:text-3xl led-result break-all">{result}</div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Enter the numerator and denominator for each fraction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Select the operation: Add (+), Subtract (−), Multiply (×), or Divide (÷)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Click Calculate to see the result in simplified form</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Example: 1/2 + 1/4 = 3/4</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
