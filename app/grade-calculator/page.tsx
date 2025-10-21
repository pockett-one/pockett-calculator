'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { FileText } from 'lucide-react';

interface Assignment {
  id: number;
  name: string;
  score: string;
  maxScore: string;
}

export default function GradeCalculatorPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: '', score: '', maxScore: '' },
  ]);
  const [result, setResult] = useState<{ percentage: number; grade: string } | null>(null);

  const addAssignment = () => {
    setAssignments([...assignments, { id: Date.now(), name: '', score: '', maxScore: '' }]);
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const removeAssignment = (id: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const calculateGrade = () => {
    let totalScore = 0;
    let totalMax = 0;

    assignments.forEach(assignment => {
      const score = parseFloat(assignment.score);
      const maxScore = parseFloat(assignment.maxScore);
      if (!isNaN(score) && !isNaN(maxScore) && maxScore > 0) {
        totalScore += score;
        totalMax += maxScore;
      }
    });

    if (totalMax > 0) {
      const percentage = (totalScore / totalMax) * 100;
      let grade = 'F';
      if (percentage >= 90) grade = 'A';
      else if (percentage >= 80) grade = 'B';
      else if (percentage >= 70) grade = 'C';
      else if (percentage >= 60) grade = 'D';

      setResult({ percentage, grade });
    }
  };

  const relatedCalculators = [
    { name: 'GPA', href: '/gpa-calculator', icon: '📊' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Age', href: '/age-calculator', icon: '🎂' },
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', icon: 'σ' },
  ];

  return (
    <CalculatorLayout
      title="Grade Calculator"
      description="Calculate your overall grade percentage and letter grade from multiple assignments"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        {assignments.map((assignment, index) => (
          <div key={assignment.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">Assignment {index + 1}</span>
              {assignments.length > 1 && (
                <button
                  onClick={() => removeAssignment(assignment.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={assignment.name}
                onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                placeholder="Name (optional)"
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              <input
                type="number"
                value={assignment.score}
                onChange={(e) => updateAssignment(assignment.id, 'score', e.target.value)}
                placeholder="Score"
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              <input
                type="number"
                value={assignment.maxScore}
                onChange={(e) => updateAssignment(assignment.id, 'maxScore', e.target.value)}
                placeholder="Max Score"
                className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addAssignment}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-semibold hover:border-gray-400 hover:text-gray-800 transition-all"
        >
          + Add Assignment
        </button>

        <button
          onClick={calculateGrade}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Calculate Grade
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Percentage</div>
                <div className="text-5xl led-result">{result.percentage.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Letter Grade</div>
                <div className="text-5xl led-result-red">{result.grade}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
