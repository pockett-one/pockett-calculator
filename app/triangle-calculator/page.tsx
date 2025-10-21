'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { BookOpen, Lightbulb, Triangle as TriangleIcon, Ruler } from 'lucide-react';

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

        {/* Understanding Triangles */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">Understanding Triangles</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              A triangle is a polygon with three sides and three angles. The sum of all interior angles in 
              any triangle is always <strong>180 degrees</strong>. This calculator uses the three side lengths 
              to determine the triangle's properties using <strong>Heron's Formula</strong>.
            </p>
            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="text-center mb-3">
                <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto">
                  <polygon points="100,20 30,130 170,130" fill="rgb(59 130 246 / 0.2)" stroke="rgb(59 130 246)" strokeWidth="2"/>
                  <text x="100" y="15" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold">A</text>
                  <text x="25" y="145" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold">B</text>
                  <text x="175" y="145" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold">C</text>
                  <text x="65" y="80" fill="#dc2626" fontSize="11" fontWeight="bold">a</text>
                  <text x="135" y="80" fill="#dc2626" fontSize="11" fontWeight="bold">b</text>
                  <text x="100" y="142" fill="#dc2626" fontSize="11" fontWeight="bold">c</text>
                </svg>
              </div>
              <p className="text-xs text-gray-600 text-center">
                A triangle with sides <strong className="text-red-600">a</strong>, <strong className="text-red-600">b</strong>, and <strong className="text-red-600">c</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Heron's Formula */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Ruler className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Heron's Formula</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              Heron's formula calculates the area of a triangle when you know all three side lengths:
            </p>
            <div className="p-4 bg-white rounded-xl border border-purple-100 space-y-3">
              <div className="font-mono text-center text-lg">
                <div className="text-gray-900 mb-2">Step 1: Calculate semi-perimeter (s)</div>
                <div className="text-purple-700 font-bold">s = (a + b + c) / 2</div>
              </div>
              <div className="border-t border-purple-100 pt-3 font-mono text-center text-lg">
                <div className="text-gray-900 mb-2">Step 2: Calculate area</div>
                <div className="text-purple-700 font-bold">Area = √[s(s-a)(s-b)(s-c)]</div>
              </div>
            </div>
            <div className="p-4 bg-purple-100 rounded-xl">
              <div className="text-sm font-semibold text-purple-900 mb-2">Example: Triangle with sides 3, 4, 5</div>
              <div className="text-sm text-purple-800 space-y-1 font-mono">
                <div>s = (3 + 4 + 5) / 2 = 6</div>
                <div>Area = √[6(6-3)(6-4)(6-5)]</div>
                <div>Area = √[6 × 3 × 2 × 1]</div>
                <div>Area = √36 = <strong>6 square units</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* Triangle Types Visualization */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <TriangleIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Triangle Types</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Equilateral */}
            <div className="p-4 bg-white rounded-xl border border-green-100">
              <div className="text-center mb-3">
                <svg viewBox="0 0 120 120" className="w-full max-w-[100px] mx-auto">
                  <polygon points="60,20 20,100 100,100" fill="rgb(34 197 94 / 0.2)" stroke="rgb(34 197 94)" strokeWidth="2"/>
                  <text x="35" y="65" fill="#16a34a" fontSize="10" fontWeight="bold">5</text>
                  <text x="75" y="65" fill="#16a34a" fontSize="10" fontWeight="bold">5</text>
                  <text x="60" y="110" fill="#16a34a" fontSize="10" fontWeight="bold">5</text>
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-900 mb-1">Equilateral</div>
                <div className="text-gray-600 text-xs">All three sides equal</div>
                <div className="mt-2 text-xs text-gray-500">Example: 5, 5, 5</div>
              </div>
            </div>

            {/* Isosceles */}
            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="text-center mb-3">
                <svg viewBox="0 0 120 120" className="w-full max-w-[100px] mx-auto">
                  <polygon points="60,20 25,100 95,100" fill="rgb(59 130 246 / 0.2)" stroke="rgb(59 130 246)" strokeWidth="2"/>
                  <text x="35" y="65" fill="#2563eb" fontSize="10" fontWeight="bold">5</text>
                  <text x="70" y="65" fill="#2563eb" fontSize="10" fontWeight="bold">5</text>
                  <text x="60" y="110" fill="#dc2626" fontSize="10" fontWeight="bold">6</text>
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-900 mb-1">Isosceles</div>
                <div className="text-gray-600 text-xs">Two sides equal</div>
                <div className="mt-2 text-xs text-gray-500">Example: 5, 5, 6</div>
              </div>
            </div>

            {/* Scalene */}
            <div className="p-4 bg-white rounded-xl border border-red-100">
              <div className="text-center mb-3">
                <svg viewBox="0 0 120 120" className="w-full max-w-[100px] mx-auto">
                  <polygon points="60,20 15,100 105,100" fill="rgb(239 68 68 / 0.2)" stroke="rgb(239 68 68)" strokeWidth="2"/>
                  <text x="30" y="65" fill="#dc2626" fontSize="10" fontWeight="bold">6</text>
                  <text x="75" y="65" fill="#dc2626" fontSize="10" fontWeight="bold">7</text>
                  <text x="60" y="110" fill="#dc2626" fontSize="10" fontWeight="bold">8</text>
                </svg>
              </div>
              <div className="text-sm">
                <div className="font-semibold text-gray-900 mb-1">Scalene</div>
                <div className="text-gray-600 text-xs">All sides different</div>
                <div className="mt-2 text-xs text-gray-500">Example: 6, 7, 8</div>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Examples */}
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-bold text-gray-900">Practical Examples</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-yellow-100">
              <div className="font-semibold text-gray-900 mb-2">🏗️ Construction & Architecture</div>
              <p className="text-sm text-gray-700">
                Calculate roof dimensions, support beam angles, and triangular structural elements
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-yellow-100">
              <div className="font-semibold text-gray-900 mb-2">📐 Land Surveying</div>
              <p className="text-sm text-gray-700">
                Determine property boundaries and plot areas using triangulation measurements
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-yellow-100">
              <div className="font-semibold text-gray-900 mb-2">🎨 Design & Graphics</div>
              <p className="text-sm text-gray-700">
                Create precise triangular shapes and calculate dimensions for logos and artwork
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-yellow-100">
              <div className="font-semibold text-gray-900 mb-2">📚 Education</div>
              <p className="text-sm text-gray-700">
                Learn and verify geometry problems, understand triangle properties and theorems
              </p>
            </div>
          </div>
        </div>

        {/* Triangle Inequality Theorem */}
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Triangle Inequality Theorem</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              For any triangle to be valid, the sum of any two sides must be greater than the third side:
            </p>
            <div className="p-4 bg-white rounded-xl border border-gray-200 font-mono text-center space-y-1">
              <div>a + b &gt; c</div>
              <div>b + c &gt; a</div>
              <div>a + c &gt; b</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="font-semibold text-green-900 mb-1">✓ Valid Triangle</div>
                <div className="text-green-800 text-xs font-mono">
                  Sides: 3, 4, 5<br/>
                  3 + 4 = 7 &gt; 5 ✓<br/>
                  4 + 5 = 9 &gt; 3 ✓<br/>
                  3 + 5 = 8 &gt; 4 ✓
                </div>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <div className="font-semibold text-red-900 mb-1">✗ Invalid Triangle</div>
                <div className="text-red-800 text-xs font-mono">
                  Sides: 1, 2, 5<br/>
                  1 + 2 = 3 &lt; 5 ✗<br/>
                  Cannot form a triangle!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Quick Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">▸</span>
              <span><strong>Right Triangles:</strong> If a² + b² = c², it's a right triangle (Pythagorean theorem)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">▸</span>
              <span><strong>Perimeter:</strong> Simply add all three sides together (a + b + c)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">▸</span>
              <span><strong>Units:</strong> Ensure all sides use the same unit of measurement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">▸</span>
              <span><strong>Equilateral Area:</strong> Can also use formula: Area = (√3/4) × side²</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
