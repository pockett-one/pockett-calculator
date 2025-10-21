'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Lock } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState('16');
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    const len = parseInt(length);
    if (len < 4 || len > 128) return;

    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (chars === '') return;

    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const relatedCalculators = [
    { name: 'Random Number', href: '/random-number-generator', icon: '🎲' },
    { name: 'Subnet', href: '/subnet-calculator', icon: '🌐' },
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Conversion', href: '/conversion-calculator', icon: '⇄' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
  ];

  return (
    <CalculatorLayout
      title="Password Generator"
      description="Generate strong, secure passwords with customizable options"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password Length: {length}</label>
          <input
            type="range"
            min="4"
            max="128"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="w-5 h-5"
            />
            <div>
              <div className="font-semibold text-gray-900">Uppercase Letters (A-Z)</div>
              <div className="text-xs text-gray-600">Include capital letters</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="w-5 h-5"
            />
            <div>
              <div className="font-semibold text-gray-900">Lowercase Letters (a-z)</div>
              <div className="text-xs text-gray-600">Include small letters</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5"
            />
            <div>
              <div className="font-semibold text-gray-900">Numbers (0-9)</div>
              <div className="text-xs text-gray-600">Include digits</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5"
            />
            <div>
              <div className="font-semibold text-gray-900">Symbols (!@#$%^&*)</div>
              <div className="text-xs text-gray-600">Include special characters</div>
            </div>
          </label>
        </div>

        <button
          onClick={generate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <Lock className="w-5 h-5" />
          Generate Password
        </button>

        {password && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Password</div>
              <div className="p-4 bg-gray-950 rounded-lg border border-gray-700 led-result text-lg break-all">
                {password}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold transition-colors shadow-md"
              >
                📋 Copy to Clipboard
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Password Security Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Use at least 12-16 characters for strong passwords</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Include a mix of uppercase, lowercase, numbers, and symbols</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Never reuse passwords across different accounts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Consider using a password manager to store passwords securely</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
