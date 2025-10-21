'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  Calculator, 
  Percent, 
  PieChart, 
  Dices, 
  Triangle, 
  BarChart3, 
  Cake, 
  Calendar, 
  Clock, 
  Hourglass, 
  GraduationCap, 
  FileText, 
  Package, 
  Network, 
  Lock, 
  ArrowLeftRight,
  Zap,
  CheckCircle,
  Shield,
  TrendingUp,
  Smartphone
} from 'lucide-react';
import CalculatorMenu from './components/CalculatorMenu';
import StructuredData, { organizationSchema, websiteSchema } from './components/StructuredData';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [isDegrees, setIsDegrees] = useState(true);

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
    const currentValue = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+': return prev + current;
      case '–': return prev - current;
      case '×': return prev * current;
      case '/': return prev / current;
      case 'x^y': return Math.pow(prev, current);
      default: return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
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
    const value = parseFloat(display);
    let result = 0;
    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const angleValue = isDegrees ? toRadians(value) : value;

    switch (func) {
      case 'sin': result = Math.sin(angleValue); break;
      case 'cos': result = Math.cos(angleValue); break;
      case 'tan': result = Math.tan(angleValue); break;
      case 'sin⁻¹': result = isDegrees ? Math.asin(value) * (180 / Math.PI) : Math.asin(value); break;
      case 'cos⁻¹': result = isDegrees ? Math.acos(value) * (180 / Math.PI) : Math.acos(value); break;
      case 'tan⁻¹': result = isDegrees ? Math.atan(value) * (180 / Math.PI) : Math.atan(value); break;
      case 'π': result = Math.PI; break;
      case 'e': result = Math.E; break;
      case 'x²': result = value * value; break;
      case 'x³': result = value * value * value; break;
      case 'eˣ': result = Math.exp(value); break;
      case '10ˣ': result = Math.pow(10, value); break;
      case '√x': result = Math.sqrt(value); break;
      case '∛x': result = Math.cbrt(value); break;
      case 'ln': result = Math.log(value); break;
      case 'log': result = Math.log10(value); break;
      case '1/x': result = 1 / value; break;
      case 'n!': result = factorial(Math.floor(value)); break;
    }
    setDisplay(String(result));
    setNewNumber(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const CalcButton = ({ children, onClick, className = '', variant = 'default' }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'default' | 'number' | 'operator' | 'function' | 'equals';
  }) => {
    const variants = {
      default: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm text-base md:text-lg',
      number: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm text-base md:text-lg',
      operator: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 shadow-sm text-base md:text-lg',
      function: 'bg-gradient-to-b from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 text-xs md:text-sm border border-gray-200 shadow-sm',
      equals: 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white border-gray-900 shadow-lg text-base md:text-lg',
    };

    return (
      <button
        onClick={onClick}
        className={`calc-btn p-3 min-h-[48px] md:min-h-[56px] rounded-lg font-semibold transition-all flex items-center justify-center touch-manipulation select-none ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  const mathCalculators = [
    { name: 'Scientific Calculator', href: '/scientific-calculator', Icon: Calculator },
    { name: 'Fraction Calculator', href: '/fraction-calculator', Icon: PieChart },
    { name: 'Percentage Calculator', href: '/percentage-calculator', Icon: Percent },
    { name: 'Random Number Generator', href: '/random-number-generator', Icon: Dices },
    { name: 'Triangle Calculator', href: '/triangle-calculator', Icon: Triangle },
    { name: 'Standard Deviation', href: '/standard-deviation-calculator', Icon: BarChart3 },
  ];

  const otherCalculators = [
    { name: 'Age Calculator', href: '/age-calculator', Icon: Cake },
    { name: 'Date Calculator', href: '/date-calculator', Icon: Calendar },
    { name: 'Time Calculator', href: '/time-calculator', Icon: Clock },
    { name: 'Hours Calculator', href: '/hours-calculator', Icon: Hourglass },
    { name: 'GPA Calculator', href: '/gpa-calculator', Icon: GraduationCap },
    { name: 'Grade Calculator', href: '/grade-calculator', Icon: FileText },
    { name: 'Concrete Calculator', href: '/concrete-calculator', Icon: Package },
    { name: 'Subnet Calculator', href: '/subnet-calculator', Icon: Network },
    { name: 'Password Generator', href: '/password-generator', Icon: Lock },
    { name: 'Conversion Calculator', href: '/conversion-calculator', Icon: ArrowLeftRight },
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Calculator Menu */}
            <CalculatorMenu />

          {/* Main Content - Scientific Calculator + Content */}
          <div className="lg:col-span-6 space-y-8">
      {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <h1 className="text-5xl md:text-6xl font-black gradient-text tracking-tight">
                Pockett Calculator
          </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Lightning-fast, precision calculations at your fingertips. 
                Professional tools for everyday math.
              </p>
        </div>

            {/* Featured Scientific Calculator */}
            <div className="premium-card rounded-3xl p-6 md:p-8 border-2 border-transparent hover:border-blue-200 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-1 rounded-full mb-3">
                  <span className="text-sm font-bold text-blue-900">Featured Calculator</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">Scientific Calculator</h2>
                <p className="text-sm text-gray-600">Try it now - Full featured calculator with advanced functions</p>
              </div>

              {/* Calculator Display */}
              <div className="calc-display mb-6 min-h-[80px] flex items-center justify-end">
                {display}
                {operation && previousValue !== null && (
                  <div className="absolute top-4 right-4 text-sm text-gray-500">
                    {previousValue} {operation}
                  </div>
                )}
              </div>

              {/* Scientific Functions */}
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                <CalcButton onClick={() => handleScientific('sin')} variant="function">sin</CalcButton>
                <CalcButton onClick={() => handleScientific('cos')} variant="function">cos</CalcButton>
                <CalcButton onClick={() => handleScientific('tan')} variant="function">tan</CalcButton>
                <CalcButton onClick={() => setIsDegrees(!isDegrees)} variant="function">
                  {isDegrees ? 'Deg' : 'Rad'}
                </CalcButton>
                <CalcButton onClick={() => handleScientific('sin⁻¹')} variant="function">sin⁻¹</CalcButton>
                <CalcButton onClick={() => handleScientific('cos⁻¹')} variant="function">cos⁻¹</CalcButton>
                <CalcButton onClick={() => handleScientific('tan⁻¹')} variant="function">tan⁻¹</CalcButton>
              </div>

              <div className="grid grid-cols-7 gap-1.5 mb-2">
                <CalcButton onClick={() => handleScientific('π')} variant="function">π</CalcButton>
                <CalcButton onClick={() => handleScientific('e')} variant="function">e</CalcButton>
                <CalcButton onClick={() => handleOperation('x^y')} variant="function">xʸ</CalcButton>
                <CalcButton onClick={() => handleScientific('x³')} variant="function">x³</CalcButton>
                <CalcButton onClick={() => handleScientific('x²')} variant="function">x²</CalcButton>
                <CalcButton onClick={() => handleScientific('eˣ')} variant="function">eˣ</CalcButton>
                <CalcButton onClick={() => handleScientific('10ˣ')} variant="function">10ˣ</CalcButton>
              </div>

              <div className="grid grid-cols-7 gap-1.5 mb-4">
                <CalcButton onClick={() => handleScientific('√x')} variant="function">√x</CalcButton>
                <CalcButton onClick={() => handleScientific('∛x')} variant="function">∛x</CalcButton>
                <CalcButton onClick={() => handleScientific('ln')} variant="function">ln</CalcButton>
                <CalcButton onClick={() => handleScientific('log')} variant="function">log</CalcButton>
                <CalcButton onClick={() => {}} variant="function">(</CalcButton>
                <CalcButton onClick={() => {}} variant="function">)</CalcButton>
                <CalcButton onClick={() => handleScientific('1/x')} variant="function">1/x</CalcButton>
              </div>

              {/* Basic Calculator */}
              <div className="grid grid-cols-5 gap-2">
                <CalcButton onClick={() => handleScientific('n!')} variant="function">n!</CalcButton>
                <CalcButton onClick={handleClear} variant="operator">AC</CalcButton>
                <CalcButton onClick={() => {}} variant="operator">Back</CalcButton>
                <CalcButton onClick={() => {}} variant="operator">%</CalcButton>
                <CalcButton onClick={() => handleOperation('/')} variant="operator">/</CalcButton>

                <CalcButton onClick={() => handleNumber('7')} variant="number">7</CalcButton>
                <CalcButton onClick={() => handleNumber('8')} variant="number">8</CalcButton>
                <CalcButton onClick={() => handleNumber('9')} variant="number">9</CalcButton>
                <CalcButton onClick={() => handleOperation('+')} variant="operator">+</CalcButton>
                <CalcButton onClick={() => {}} variant="operator">M+</CalcButton>

                <CalcButton onClick={() => handleNumber('4')} variant="number">4</CalcButton>
                <CalcButton onClick={() => handleNumber('5')} variant="number">5</CalcButton>
                <CalcButton onClick={() => handleNumber('6')} variant="number">6</CalcButton>
                <CalcButton onClick={() => handleOperation('–')} variant="operator">–</CalcButton>
                <CalcButton onClick={() => {}} variant="operator">Ans</CalcButton>

                <CalcButton onClick={() => handleNumber('1')} variant="number">1</CalcButton>
                <CalcButton onClick={() => handleNumber('2')} variant="number">2</CalcButton>
                <CalcButton onClick={() => handleNumber('3')} variant="number">3</CalcButton>
                <CalcButton onClick={() => handleOperation('×')} variant="operator">×</CalcButton>
                <CalcButton onClick={() => {}} variant="operator">M-</CalcButton>

                <CalcButton onClick={() => handleNumber('0')} variant="number">0</CalcButton>
                <CalcButton onClick={handleDecimal} variant="number">.</CalcButton>
                <CalcButton onClick={() => {}} variant="number">EXP</CalcButton>
                <CalcButton onClick={handleEquals} variant="equals">=</CalcButton>
                <CalcButton onClick={() => {}} variant="operator">MR</CalcButton>
              </div>
            </div>

            {/* Math Calculators */}
            <div id="math-calculators" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1">Math Calculators</h2>
                  <p className="text-gray-600">Advanced mathematical tools for complex calculations</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {mathCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white border border-gray-200 hover:border-blue-500 rounded-full text-sm font-semibold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-lg hover:scale-105"
                  >
                    <calc.Icon className="w-4 h-4" />
                    <span>{calc.name}</span>
            </Link>
                ))}
              </div>
            </div>

            {/* Other Calculators */}
            <div id="other-calculators" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-1 w-12 bg-gradient-to-r from-red-300 to-red-500 rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent mb-1">Other Calculators</h2>
                  <p className="text-gray-600">Everyday tools for practical calculations</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {otherCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gradient-to-r hover:from-red-400 hover:to-red-500 hover:text-white border border-gray-200 hover:border-red-400 rounded-full text-sm font-semibold text-gray-700 transition-all duration-200 shadow-sm hover:shadow-lg hover:scale-105"
                  >
                    <calc.Icon className="w-4 h-4" />
                    <span>{calc.name}</span>
            </Link>
                ))}
          </div>
        </div>

      {/* Features Section */}
            <div id="features" className="premium-card rounded-3xl p-8 space-y-8 bg-gradient-to-br from-white via-blue-50/30 to-red-50/30">
              <h2 className="text-3xl font-bold text-gray-900 text-center">Why Choose Pockett Calculator?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-3 group">
                  <div className="feature-icon mx-auto bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                    <Zap className="w-8 h-8 text-blue-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Lightning Fast</h3>
                  <p className="text-sm text-gray-600">Instant calculations with zero lag</p>
                </div>
                <div className="text-center space-y-3 group">
                  <div className="feature-icon mx-auto bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-400 group-hover:to-red-500 transition-all duration-300">
                    <CheckCircle className="w-8 h-8 text-red-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">100% Accurate</h3>
                  <p className="text-sm text-gray-600">Precision you can trust</p>
                </div>
                <div className="text-center space-y-3 group">
                  <div className="feature-icon mx-auto bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                    <Smartphone className="w-8 h-8 text-blue-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Mobile Ready</h3>
                  <p className="text-sm text-gray-600">Works perfectly on any device</p>
                </div>
              </div>
            </div>
            </div>

          {/* Right Sidebar - Ad Space */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="ad-slot" style={{ minHeight: '250px' }}>
            <div className="text-center">
                  <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
                  <div className="text-xs text-gray-400">300x250</div>
                </div>
              </div>
              <div className="ad-slot" style={{ minHeight: '250px' }}>
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
                  <div className="text-xs text-gray-400">300x250</div>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
