'use client';

import React, { useState, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Lightbulb, Settings, Shapes, TrendingUp, DollarSign, Calculator as CalcIcon, Hash, BookOpen, Sparkles } from 'lucide-react';
import StructuredData, { getCalculatorSchema, getBreadcrumbSchema } from '../components/StructuredData';
import { useCalculatorKeyboard } from '../lib/useCalculatorKeyboard';

export default function ScientificCalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const prev = parseFloat(previousValue);
      let result = 0;
      
      switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = prev / current; break;
        default: result = current;
      }
      
      setDisplay(String(result));
      setPreviousValue(String(result));
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(display);
      let result = 0;
      
      switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = prev / current; break;
        default: result = current;
      }
      
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result = 0;
    
    switch (func) {
      case 'sin': result = Math.sin(current * Math.PI / 180); break;
      case 'cos': result = Math.cos(current * Math.PI / 180); break;
      case 'tan': result = Math.tan(current * Math.PI / 180); break;
      case 'log': result = Math.log10(current); break;
      case 'ln': result = Math.log(current); break;
      case '√': result = Math.sqrt(current); break;
      case 'x²': result = current * current; break;
      case 'x³': result = current * current * current; break;
      case '1/x': result = 1 / current; break;
      case 'π': result = Math.PI; break;
      case 'e': result = Math.E; break;
      default: result = current;
    }
    
    setDisplay(String(result));
    setNewNumber(true);
  };

  // Enable keyboard input when calculator is in focus
  useCalculatorKeyboard({
    onNumber: handleNumber,
    onDecimal: handleDecimal,
    onOperation: handleOperation,
    onEquals: handleEquals,
    onClear: handleClear,
    onScientific: handleScientific,
    calculatorRef,
  });

  const Button = ({ children, onClick, className = '', variant = 'default' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
    variant?: 'default' | 'operation' | 'equals' | 'clear' | 'scientific';
  }) => {
    const baseClass = 'calc-btn font-semibold rounded-2xl transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 min-h-[56px] flex items-center justify-center touch-manipulation select-none';
    const variants = {
      default: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 text-lg md:text-xl',
      operation: 'bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-lg md:text-xl',
      equals: 'bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-lg md:text-xl',
      clear: 'bg-gradient-to-r from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 text-white text-lg md:text-xl',
      scientific: 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-900 border border-blue-300 text-sm md:text-base',
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseClass} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  const relatedCalculators = [
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
    { name: 'Fraction', href: '/fraction-calculator', icon: '¾' },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', icon: 'σ' },
    { name: 'Triangle', href: '/triangle-calculator', icon: '△' },
    { name: 'Random Number', href: '/random-number-generator', icon: '🎲' },
  ];

  const calculatorSchema = getCalculatorSchema(
    "Scientific Calculator - Online Free Advanced Math Calculator",
    "Free online scientific calculator with trigonometric functions (sin, cos, tan), logarithms, exponentials, square roots, and more. Perfect for students, engineers, and scientists.",
    "https://pockettcalculator.com/scientific-calculator"
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://pockettcalculator.com" },
    { name: "Scientific Calculator", url: "https://pockettcalculator.com/scientific-calculator" }
  ]);

  return (
    <>
      <StructuredData data={calculatorSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      <CalculatorLayout
        title="Scientific Calculator"
        description="Advanced calculator with trigonometric, logarithmic, and exponential functions"
        relatedCalculators={relatedCalculators}
      >
        <div ref={calculatorRef} className="space-y-6" tabIndex={0}>
        {/* Display */}
        <div className="calc-display">
          {display}
        </div>

        {/* Scientific Functions */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          <Button variant="scientific" onClick={() => handleScientific('sin')}>sin</Button>
          <Button variant="scientific" onClick={() => handleScientific('cos')}>cos</Button>
          <Button variant="scientific" onClick={() => handleScientific('tan')}>tan</Button>
          <Button variant="scientific" onClick={() => handleScientific('log')}>log</Button>
          <Button variant="scientific" onClick={() => handleScientific('ln')}>ln</Button>
          <Button variant="scientific" onClick={() => handleScientific('√')}>√</Button>
          <Button variant="scientific" onClick={() => handleScientific('x²')}>x²</Button>
          <Button variant="scientific" onClick={() => handleScientific('x³')}>x³</Button>
          <Button variant="scientific" onClick={() => handleScientific('1/x')}>1/x</Button>
          <Button variant="scientific" onClick={() => handleScientific('π')}>π</Button>
          <Button variant="scientific" onClick={() => handleScientific('e')}>e</Button>
          <Button variant="clear" onClick={handleClear}>C</Button>
        </div>

        {/* Main Calculator */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          <Button onClick={() => handleNumber('7')}>7</Button>
          <Button onClick={() => handleNumber('8')}>8</Button>
          <Button onClick={() => handleNumber('9')}>9</Button>
          <Button variant="operation" onClick={() => handleOperation('÷')}>÷</Button>
          
          <Button onClick={() => handleNumber('4')}>4</Button>
          <Button onClick={() => handleNumber('5')}>5</Button>
          <Button onClick={() => handleNumber('6')}>6</Button>
          <Button variant="operation" onClick={() => handleOperation('×')}>×</Button>
          
          <Button onClick={() => handleNumber('1')}>1</Button>
          <Button onClick={() => handleNumber('2')}>2</Button>
          <Button onClick={() => handleNumber('3')}>3</Button>
          <Button variant="operation" onClick={() => handleOperation('-')}>−</Button>
          
          <Button onClick={() => handleNumber('0')}>0</Button>
          <Button onClick={handleDecimal}>.</Button>
          <Button variant="equals" onClick={handleEquals}>=</Button>
          <Button variant="operation" onClick={() => handleOperation('+')}>+</Button>
        </div>

        {/* Detailed Guide */}
        <div className="mt-8 space-y-6">
          {/* How to Use */}
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gray-700" />
              How to Use
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="p-3 bg-white rounded-lg">
                <strong className="text-gray-900">Basic Operations:</strong>
                <p className="mt-1">Use +, −, ×, ÷ buttons for arithmetic. Example: 45 + 23 = 68</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <strong className="text-gray-900">Trigonometry:</strong>
                <p className="mt-1">sin, cos, tan functions work in degrees. Example: sin(30) = 0.5</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <strong className="text-gray-900">Logarithms:</strong>
                <p className="mt-1">log (base 10) and ln (natural log). Example: log(100) = 2</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <strong className="text-gray-900">Powers:</strong>
                <p className="mt-1">x² for square, x³ for cube. Example: 5² = 25, 2³ = 8</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <strong className="text-gray-900">Constants:</strong>
                <p className="mt-1">π (pi ≈ 3.14159) and e (Euler's number ≈ 2.71828)</p>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-blue-600" />
              Practical Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Engineering
                </div>
                <p className="text-gray-700 mb-2">Calculate roof slope: tan(30°) = 0.577</p>
                <p className="text-xs text-gray-500">Input: 30 → tan → Result: 0.577</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Shapes className="w-4 h-4" />
                  Geometry
                </div>
                <p className="text-gray-700 mb-2">Circle circumference: 2 × π × 5 = 31.42</p>
                <p className="text-xs text-gray-500">Input: 2 × π × 5 = Result: 31.42</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Statistics
                </div>
                <p className="text-gray-700 mb-2">Standard deviation uses √(variance)</p>
                <p className="text-xs text-gray-500">Input: 25 → √ → Result: 5</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Finance
                </div>
                <p className="text-gray-700 mb-2">Compound interest: 1000 × e^0.05 = 1051.27</p>
                <p className="text-xs text-gray-500">Natural exponential growth calculations</p>
              </div>
            </div>
          </div>

          {/* Function Reference */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Hash className="w-6 h-6 text-gray-700" />
              Function Reference
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">Function</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-900">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">sin</td>
                    <td className="px-4 py-2 text-gray-700">Sine (in degrees)</td>
                    <td className="px-4 py-2 font-mono text-gray-600">sin(90) = 1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">cos</td>
                    <td className="px-4 py-2 text-gray-700">Cosine (in degrees)</td>
                    <td className="px-4 py-2 font-mono text-gray-600">cos(0) = 1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">tan</td>
                    <td className="px-4 py-2 text-gray-700">Tangent (in degrees)</td>
                    <td className="px-4 py-2 font-mono text-gray-600">tan(45) = 1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">log</td>
                    <td className="px-4 py-2 text-gray-700">Logarithm base 10</td>
                    <td className="px-4 py-2 font-mono text-gray-600">log(1000) = 3</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">ln</td>
                    <td className="px-4 py-2 text-gray-700">Natural logarithm (base e)</td>
                    <td className="px-4 py-2 font-mono text-gray-600">ln(e) = 1</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">√</td>
                    <td className="px-4 py-2 text-gray-700">Square root</td>
                    <td className="px-4 py-2 font-mono text-gray-600">√(16) = 4</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">x²</td>
                    <td className="px-4 py-2 text-gray-700">Square</td>
                    <td className="px-4 py-2 font-mono text-gray-600">7² = 49</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">x³</td>
                    <td className="px-4 py-2 text-gray-700">Cube</td>
                    <td className="px-4 py-2 font-mono text-gray-600">3³ = 27</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-blue-600">1/x</td>
                    <td className="px-4 py-2 text-gray-700">Reciprocal</td>
                    <td className="px-4 py-2 font-mono text-gray-600">1/4 = 0.25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Visual Reference */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Trigonometric Functions Visualization
            </h3>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">Unit Circle Reference (Common Angles)</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">0°</div>
                  <div className="text-gray-600 mt-1">sin = 0, cos = 1</div>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">30°</div>
                  <div className="text-gray-600 mt-1">sin = 0.5, cos = 0.866</div>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">45°</div>
                  <div className="text-gray-600 mt-1">sin = 0.707, cos = 0.707</div>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">60°</div>
                  <div className="text-gray-600 mt-1">sin = 0.866, cos = 0.5</div>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">90°</div>
                  <div className="text-gray-600 mt-1">sin = 1, cos = 0</div>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">180°</div>
                  <div className="text-gray-600 mt-1">sin = 0, cos = -1</div>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">270°</div>
                  <div className="text-gray-600 mt-1">sin = -1, cos = 0</div>
                </div>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="font-bold text-blue-900">360°</div>
                  <div className="text-gray-600 mt-1">sin = 0, cos = 1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </CalculatorLayout>
    </>
  );
}
