'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { GraduationCap } from 'lucide-react';

interface Course {
  id: number;
  grade: string;
  credits: string;
}

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, grade: '', credits: '' },
  ]);
  const [gpa, setGPA] = useState<string | null>(null);

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), grade: '', credits: '' }]);
  };

  const updateCourse = (id: number, field: 'grade' | 'credits', value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits);
      const points = gradePoints[course.grade];
      if (!isNaN(credits) && points !== undefined) {
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      setGPA((totalPoints / totalCredits).toFixed(2));
    }
  };

  const relatedCalculators = [
    { name: 'Grade', href: '/grade-calculator', icon: '📝' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Age', href: '/age-calculator', icon: '🎂' },
    { name: 'Date', href: '/date-calculator', icon: '📅' },
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
  ];

  return (
    <CalculatorLayout
      title="GPA Calculator"
      description="Calculate your Grade Point Average based on your course grades and credits"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        {courses.map((course, index) => (
          <div key={course.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">Course {index + 1}</span>
              {courses.length > 1 && (
                <button
                  onClick={() => removeCourse(course.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Grade</label>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                >
                  <option value="">Select</option>
                  {Object.keys(gradePoints).map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Credits</label>
                <input
                  type="number"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                  placeholder="3"
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addCourse}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-semibold hover:border-gray-400 hover:text-gray-800 transition-all"
        >
          + Add Course
        </button>

        <button
          onClick={calculateGPA}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <GraduationCap className="w-5 h-5" />
          Calculate GPA
        </button>

        {gpa && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl text-center">
            <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Your GPA</div>
            <div className="text-5xl led-result">{gpa}</div>
            <div className="text-xs text-gray-400 mt-3 uppercase tracking-wide">out of 4.0</div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
