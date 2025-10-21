'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { BookOpen, Lightbulb, BarChart3, TrendingUp } from 'lucide-react';

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

        {/* Understanding Standard Deviation */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-900">What is Standard Deviation?</h3>
          </div>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Standard deviation (σ) is a measure of how spread out numbers are from their average (mean). 
              A <strong>low standard deviation</strong> means data points are close to the mean, while a 
              <strong> high standard deviation</strong> means data is more spread out.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 bg-white rounded-xl border border-blue-100">
                <div className="text-xs font-semibold text-blue-900 mb-2">Mean (μ)</div>
                <div className="text-sm text-gray-700">The average of all data points</div>
                <div className="font-mono text-xs text-blue-700 mt-2">μ = Σx / n</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-purple-100">
                <div className="text-xs font-semibold text-purple-900 mb-2">Variance (σ²)</div>
                <div className="text-sm text-gray-700">Average squared deviation from mean</div>
                <div className="font-mono text-xs text-purple-700 mt-2">σ² = Σ(x-μ)² / n</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-red-100">
                <div className="text-xs font-semibold text-red-900 mb-2">Std Dev (σ)</div>
                <div className="text-sm text-gray-700">Square root of variance</div>
                <div className="font-mono text-xs text-red-700 mt-2">σ = √(σ²)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Calculation */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-900">Step-by-Step Calculation</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-purple-100">
              <div className="font-semibold text-purple-900 mb-3">Example: Dataset [2, 4, 4, 4, 5, 5, 7, 9]</div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-900 mb-1">Step 1: Calculate the Mean</div>
                  <div className="font-mono text-blue-800">
                    μ = (2 + 4 + 4 + 4 + 5 + 5 + 7 + 9) / 8 = 40 / 8 = <strong>5</strong>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-900 mb-1">Step 2: Find deviations from mean</div>
                  <div className="font-mono text-purple-800 text-xs space-y-1">
                    <div>2 - 5 = -3</div>
                    <div>4 - 5 = -1 (×3)</div>
                    <div>5 - 5 = 0 (×2)</div>
                    <div>7 - 5 = 2</div>
                    <div>9 - 5 = 4</div>
                  </div>
                </div>

                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="font-semibold text-red-900 mb-1">Step 3: Square each deviation</div>
                  <div className="font-mono text-red-800 text-xs">
                    9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = <strong>32</strong>
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-900 mb-1">Step 4: Calculate variance</div>
                  <div className="font-mono text-green-800">
                    σ² = 32 / 8 = <strong>4</strong>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-semibold text-yellow-900 mb-1">Step 5: Calculate standard deviation</div>
                  <div className="font-mono text-yellow-800">
                    σ = √4 = <strong>2</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Representation */}
        <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Visual Distribution</h3>
          <div className="space-y-6">
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-3">Low Standard Deviation (Data clustered near mean)</div>
              <div className="flex items-end gap-1 h-32">
                <div className="flex-1 bg-gray-200 rounded-t" style={{height: '20%'}}></div>
                <div className="flex-1 bg-green-300 rounded-t" style={{height: '40%'}}></div>
                <div className="flex-1 bg-green-400 rounded-t" style={{height: '60%'}}></div>
                <div className="flex-1 bg-green-500 rounded-t" style={{height: '100%'}}></div>
                <div className="flex-1 bg-green-500 rounded-t" style={{height: '100%'}}></div>
                <div className="flex-1 bg-green-400 rounded-t" style={{height: '60%'}}></div>
                <div className="flex-1 bg-green-300 rounded-t" style={{height: '40%'}}></div>
                <div className="flex-1 bg-gray-200 rounded-t" style={{height: '20%'}}></div>
              </div>
              <div className="text-center mt-2">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-mono">
                  σ = 1.2 (Low spread)
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-gray-900 mb-3">High Standard Deviation (Data widely spread)</div>
              <div className="flex items-end gap-1 h-32">
                <div className="flex-1 bg-red-400 rounded-t" style={{height: '70%'}}></div>
                <div className="flex-1 bg-red-300 rounded-t" style={{height: '50%'}}></div>
                <div className="flex-1 bg-red-300 rounded-t" style={{height: '45%'}}></div>
                <div className="flex-1 bg-red-500 rounded-t" style={{height: '100%'}}></div>
                <div className="flex-1 bg-red-500 rounded-t" style={{height: '95%'}}></div>
                <div className="flex-1 bg-red-300 rounded-t" style={{height: '48%'}}></div>
                <div className="flex-1 bg-red-300 rounded-t" style={{height: '55%'}}></div>
                <div className="flex-1 bg-red-400 rounded-t" style={{height: '75%'}}></div>
              </div>
              <div className="text-center mt-2">
                <div className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-mono">
                  σ = 4.8 (High spread)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Applications */}
        <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-200">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-bold text-gray-900">Practical Applications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-yellow-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-yellow-600" />
                <span className="font-semibold text-gray-900">Finance & Investing</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Measure stock volatility</li>
                <li>• Assess investment risk</li>
                <li>• Portfolio analysis</li>
                <li>• Market trend evaluation</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-900">Quality Control</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Manufacturing consistency</li>
                <li>• Process improvement</li>
                <li>• Defect rate analysis</li>
                <li>• Performance metrics</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-gray-900">Education & Research</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Test score analysis</li>
                <li>• Research data evaluation</li>
                <li>• Survey result interpretation</li>
                <li>• Performance comparisons</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-gray-900">Sports & Health</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Athlete performance tracking</li>
                <li>• Health metrics monitoring</li>
                <li>• Training consistency</li>
                <li>• Clinical trial analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Real-World Examples</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="font-semibold text-gray-900 mb-2">📊 Stock Market Analysis</div>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Stock A:</strong> Returns = [2%, 3%, 2.5%, 3.5%, 2%] → σ = 0.6% (Low volatility)</p>
                <p><strong>Stock B:</strong> Returns = [-5%, 10%, -2%, 8%, -4%] → σ = 6.5% (High volatility)</p>
                <p className="text-xs text-gray-600 italic">Lower σ = More stable, Higher σ = More risky</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="font-semibold text-gray-900 mb-2">📚 Exam Scores</div>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Class A:</strong> Scores = [85, 87, 86, 88, 84] → σ = 1.5 (Consistent performance)</p>
                <p><strong>Class B:</strong> Scores = [60, 95, 70, 90, 75] → σ = 13.2 (Varied performance)</p>
                <p className="text-xs text-gray-600 italic">Lower σ = Students performing similarly</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="font-semibold text-gray-900 mb-2">🏭 Manufacturing Quality</div>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Machine A:</strong> Part lengths = [10.1, 10.0, 10.1, 9.9, 10.0] mm → σ = 0.08mm</p>
                <p><strong>Machine B:</strong> Part lengths = [9.5, 10.5, 9.8, 10.3, 9.9] mm → σ = 0.38mm</p>
                <p className="text-xs text-gray-600 italic">Machine A produces more consistent parts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interpreting Results */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Interpreting Standard Deviation</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white rounded-lg border border-blue-100">
              <div className="font-semibold text-blue-900 mb-1">68-95-99.7 Rule (Normal Distribution)</div>
              <ul className="space-y-1 text-xs">
                <li>• <strong>68%</strong> of data falls within 1σ of the mean</li>
                <li>• <strong>95%</strong> of data falls within 2σ of the mean</li>
                <li>• <strong>99.7%</strong> of data falls within 3σ of the mean</li>
              </ul>
            </div>
            <div className="grid md:grid-cols-3 gap-2 text-xs">
              <div className="p-2 bg-green-100 rounded-lg text-center">
                <div className="font-semibold text-green-900">Low σ</div>
                <div className="text-green-700">Data is consistent</div>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg text-center">
                <div className="font-semibold text-yellow-900">Medium σ</div>
                <div className="text-yellow-700">Moderate variation</div>
              </div>
              <div className="p-2 bg-red-100 rounded-lg text-center">
                <div className="font-semibold text-red-900">High σ</div>
                <div className="text-red-700">Data is spread out</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Quick Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">▸</span>
              <span><strong>Sample vs Population:</strong> This calculator uses population standard deviation (divides by n)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">▸</span>
              <span><strong>Outliers:</strong> Extreme values significantly increase standard deviation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">▸</span>
              <span><strong>Zero σ:</strong> Means all values are identical</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 mt-0.5">▸</span>
              <span><strong>Units:</strong> Standard deviation has the same units as your original data</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
