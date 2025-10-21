'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Hourglass } from 'lucide-react';

export default function HoursCalculatorPage() {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakMinutes, setBreakMinutes] = useState('60');
  const [result, setResult] = useState<{ hours: number; minutes: number } | null>(null);

  const calculate = () => {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const breakMins = parseInt(breakMinutes) || 0;

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const workMinutes = endMinutes - startMinutes - breakMins;

    const hours = Math.floor(workMinutes / 60);
    const minutes = workMinutes % 60;

    setResult({ hours, minutes });
  };

  const relatedCalculators = [
    { name: 'Time', href: '/time-calculator', icon: '⏰' },
    { name: 'Date', href: '/date-calculator', icon: '📅' },
    { name: 'Age', href: '/age-calculator', icon: '🎂' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'GPA', href: '/gpa-calculator', icon: '📊' },
  ];

  return (
    <CalculatorLayout
      title="Hours Calculator"
      description="Calculate work hours between start and end times with break deduction"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Break Duration (minutes)</label>
          <input
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
            placeholder="60"
            className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
          />
        </div>

        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <Hourglass className="w-5 h-5" />
          Calculate Hours
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Total Work Hours</div>
              <div className="text-5xl led-result">
                {result.hours}h {result.minutes}m
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Perfect For</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Calculating daily work hours for timesheets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Tracking billable hours for freelancers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>Managing employee schedules and shifts</span>
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
