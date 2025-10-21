'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';

export default function ConversionCalculatorPage() {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState<string | null>(null);

  const conversions: Record<string, Record<string, number>> = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      kilometers: 0.001,
      miles: 0.000621371,
      centimeters: 100,
    },
    weight: {
      kilograms: 1,
      pounds: 2.20462,
      ounces: 35.274,
      grams: 1000,
      tons: 0.001,
    },
  };

  const units = {
    length: ['meters', 'feet', 'inches', 'kilometers', 'miles', 'centimeters'],
    weight: ['kilograms', 'pounds', 'ounces', 'grams', 'tons'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    if (category === 'temperature') {
      let res = 0;
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') res = (val * 9/5) + 32;
      else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') res = (val - 32) * 5/9;
      else if (fromUnit === 'celsius' && toUnit === 'kelvin') res = val + 273.15;
      else if (fromUnit === 'kelvin' && toUnit === 'celsius') res = val - 273.15;
      else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') res = (val - 32) * 5/9 + 273.15;
      else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') res = (val - 273.15) * 9/5 + 32;
      else res = val;
      setResult(`${val} ${fromUnit} = ${res.toFixed(2)} ${toUnit}`);
    } else {
      const baseValue = val / conversions[category][fromUnit];
      const convertedValue = baseValue * conversions[category][toUnit];
      setResult(`${val} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`);
    }
  };

  const relatedCalculators = [
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Concrete', href: '/concrete-calculator', icon: '🏗️' },
    { name: 'Triangle', href: '/triangle-calculator', icon: '△' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Fraction', href: '/fraction-calculator', icon: '¾' },
  ];

  return (
    <CalculatorLayout
      title="Conversion Calculator"
      description="Convert between different units of length, weight, and temperature"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
          <div className="grid grid-cols-3 gap-3">
            {['length', 'weight', 'temperature'].map((cat, idx) => {
              const colors = [
                'from-blue-400 to-blue-500 hover:from-blue-500',
                'from-red-400 to-red-500 hover:from-red-500',
                'from-blue-300 to-blue-400 hover:from-blue-400'
              ];
              const icons = ['📏', '⚖️', '🌡️'];
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat as any);
                    setFromUnit(units[cat as keyof typeof units][0]);
                    setToUnit(units[cat as keyof typeof units][1]);
                  }}
                  className={`py-3 rounded-xl font-semibold capitalize transition-all ${
                    category === cat 
                      ? `bg-gradient-to-r ${colors[idx]} text-white shadow-lg` 
                      : 'bg-white border-2 border-gray-200 text-gray-700'
                  }`}
                >
                  {icons[idx]} {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 capitalize"
            >
              {units[category].map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 capitalize"
            >
              {units[category].map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={convert}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none"
        >
          ⇄ Convert
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl text-center">
            <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Result</div>
            <div className="text-2xl led-result break-all">{result}</div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Conversions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-bold">1 meter</div>
              <div className="text-gray-600">= 3.28 feet</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-bold">1 kilogram</div>
              <div className="text-gray-600">= 2.20 pounds</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-bold">0°C</div>
              <div className="text-gray-600">= 32°F</div>
            </div>
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <div className="font-bold">1 mile</div>
              <div className="text-gray-600">= 1.609 km</div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
