'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { BookOpen, Lightbulb, Calculator as CalcIcon } from 'lucide-react';

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

        {/* Understanding Fractions */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Understanding Fractions</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              A fraction represents a part of a whole. It consists of a <strong>numerator</strong> (top number) 
              and a <strong>denominator</strong> (bottom number). The denominator tells you how many equal parts 
              the whole is divided into, and the numerator tells you how many of those parts you have.
            </p>
            <p className="font-mono text-center text-2xl text-gray-900 py-4">
              <span className="text-blue-600">numerator</span> / <span className="text-red-600">denominator</span>
            </p>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Visual Examples</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Example 1/2 */}
            <div className="space-y-2">
              <div className="text-center font-mono text-2xl font-bold text-gray-900">1/2</div>
              <div className="flex gap-1 h-12">
                <div className="flex-1 bg-blue-500 rounded-l-lg flex items-center justify-center text-white text-xs font-bold">1</div>
                <div className="flex-1 bg-gray-200 rounded-r-lg flex items-center justify-center text-gray-500 text-xs">1</div>
              </div>
              <p className="text-xs text-gray-600 text-center">One half (1 out of 2 parts)</p>
            </div>
            {/* Example 3/4 */}
            <div className="space-y-2">
              <div className="text-center font-mono text-2xl font-bold text-gray-900">3/4</div>
              <div className="flex gap-1 h-12">
                <div className="flex-1 bg-blue-500 rounded-l-lg flex items-center justify-center text-white text-xs font-bold">1</div>
                <div className="flex-1 bg-blue-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                <div className="flex-1 bg-blue-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                <div className="flex-1 bg-gray-200 rounded-r-lg flex items-center justify-center text-gray-500 text-xs">4</div>
              </div>
              <p className="text-xs text-gray-600 text-center">Three quarters (3 out of 4 parts)</p>
            </div>
          </div>
        </div>

        {/* Practical Examples */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Practical Examples</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <CalcIcon className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-gray-900">Adding Fractions</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div><strong>1/2 + 1/4 = ?</strong></div>
                <div className="text-gray-600">Step 1: Find common denominator → 2/4 + 1/4</div>
                <div className="text-gray-600">Step 2: Add numerators → 3/4</div>
                <div className="text-green-700 font-bold">Result: 3/4</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <CalcIcon className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-900">Multiplying Fractions</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div><strong>2/3 × 3/4 = ?</strong></div>
                <div className="text-gray-600">Step 1: Multiply numerators → 2 × 3 = 6</div>
                <div className="text-gray-600">Step 2: Multiply denominators → 3 × 4 = 12</div>
                <div className="text-gray-600">Step 3: Simplify → 6/12 = 1/2</div>
                <div className="text-blue-700 font-bold">Result: 1/2</div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-red-100">
              <div className="flex items-center gap-2 mb-2">
                <CalcIcon className="w-4 h-4 text-red-600" />
                <span className="font-semibold text-gray-900">Dividing Fractions</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div><strong>1/2 ÷ 1/4 = ?</strong></div>
                <div className="text-gray-600">Step 1: Flip the second fraction → 1/2 × 4/1</div>
                <div className="text-gray-600">Step 2: Multiply → 4/2</div>
                <div className="text-gray-600">Step 3: Simplify → 2</div>
                <div className="text-red-700 font-bold">Result: 2</div>
              </div>
            </div>
          </div>
        </div>

        {/* Operation Rules */}
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Fraction Operation Rules</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-gray-900">Addition & Subtraction:</div>
              <ul className="space-y-1 text-gray-700">
                <li>• Find common denominator</li>
                <li>• Add/subtract numerators</li>
                <li>• Keep the denominator</li>
                <li>• Simplify if possible</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-gray-900">Multiplication & Division:</div>
              <ul className="space-y-1 text-gray-700">
                <li>• Multiply: numerator × numerator</li>
                <li>• Multiply: denominator × denominator</li>
                <li>• Division: flip & multiply</li>
                <li>• Simplify the result</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Quick Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span>
              <span><strong>Simplification:</strong> Always reduce fractions to their lowest terms by dividing by the GCD</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span>
              <span><strong>Mixed Numbers:</strong> Convert to improper fractions before calculating (e.g., 1½ = 3/2)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">▸</span>
              <span><strong>Zero Denominator:</strong> Never allowed - division by zero is undefined</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
