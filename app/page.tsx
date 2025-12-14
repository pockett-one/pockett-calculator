'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Binary,
  Activity,
  Orbit,
  Sigma,
  Shapes,
  Shuffle,
  Hourglass,
  Calendar,
  Clock,
  Box,
  Network,
  Lock,
  ArrowLeftRight,
  Cpu,
  Terminal,
  Hash,
  ChevronRight,
  Zap
} from 'lucide-react';
import CalculatorMenu from './components/CalculatorMenu';
import StructuredData, { organizationSchema, websiteSchema } from './components/StructuredData';
import FAQ, { commonCalculatorFAQs } from './components/FAQ';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [isDegrees, setIsDegrees] = useState(true);
  const [expression, setExpression] = useState('');

  // ... (Calculator Logic remains the same) ...
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
      setExpression(`${currentValue} ${op}`);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
      setExpression(`${result} ${op}`);
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
      setExpression(`${previousValue} ${operation} ${currentValue} =`);
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
    setExpression('');
  };

  const handleScientific = (func: string) => {
    const value = parseFloat(display);
    let result = 0;
    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const angleValue = isDegrees ? toRadians(value) : value;

    switch (func) {
      case 'sin': result = Math.sin(angleValue); setExpression(`sin(${value})`); break;
      case 'cos': result = Math.cos(angleValue); setExpression(`cos(${value})`); break;
      case 'tan': result = Math.tan(angleValue); setExpression(`tan(${value})`); break;
      case 'sin⁻¹': result = isDegrees ? Math.asin(value) * (180 / Math.PI) : Math.asin(value); setExpression(`sin⁻¹(${value})`); break;
      case 'cos⁻¹': result = isDegrees ? Math.acos(value) * (180 / Math.PI) : Math.acos(value); setExpression(`cos⁻¹(${value})`); break;
      case 'tan⁻¹': result = isDegrees ? Math.atan(value) * (180 / Math.PI) : Math.atan(value); setExpression(`tan⁻¹(${value})`); break;
      case 'π': result = Math.PI; setExpression('π'); break;
      case 'e': result = Math.E; setExpression('e'); break;
      case 'x²': result = value * value; setExpression(`${value}²`); break;
      case 'x³': result = value * value * value; setExpression(`${value}³`); break;
      case 'eˣ': result = Math.exp(value); setExpression(`e^${value}`); break;
      case '10ˣ': result = Math.pow(10, value); setExpression(`10^${value}`); break;
      case '√x': result = Math.sqrt(value); setExpression(`√${value}`); break;
      case '∛x': result = Math.cbrt(value); setExpression(`∛${value}`); break;
      case 'ln': result = Math.log(value); setExpression(`ln(${value})`); break;
      case 'log': result = Math.log10(value); setExpression(`log(${value})`); break;
      case '1/x': result = 1 / value; setExpression(`1/${value}`); break;
      case 'n!': result = factorial(Math.floor(value)); setExpression(`${Math.floor(value)}!`); break;
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (/^[0-9+\-*/=.]$/.test(key) || key === 'Enter' || key === 'Escape' || key.toLowerCase() === 'c') {
        event.preventDefault();
      }
      if (/^[0-9]$/.test(key)) handleNumber(key);
      else if (key === '.') handleDecimal();
      else if (key === '+') handleOperation('+');
      else if (key === '-') handleOperation('–');
      else if (key === '*') handleOperation('×');
      else if (key === '/') handleOperation('/');
      else if (key === 'Enter' || key === '=') handleEquals();
      else if (key === 'Escape' || key.toLowerCase() === 'c') handleClear();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, previousValue, operation, newNumber]);

  const CalcButton = ({ children, onClick, className = '', variant = 'default' }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    variant?: 'default' | 'number' | 'operator' | 'function' | 'equals';
  }) => {
    const variantStyles = {
      default: 'calc-btn-default',
      number: 'calc-btn-default text-zinc-100',
      operator: 'calc-btn-operator',
      function: 'calc-btn-function',
      equals: 'calc-btn-equals',
    };

    return (
      <button
        onClick={onClick}
        className={`calc-btn p-3 min-h-[56px] ${variantStyles[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  // Technical Icons Mapping
  const tools = [
    { name: 'Scientific', href: '/scientific-calculator', Icon: Binary, desc: 'Advanced Ops' },
    { name: 'Fraction', href: '/fraction-calculator', Icon: Shapes, desc: 'Ratios' },
    { name: 'Percentage', href: '/percentage-calculator', Icon: Sigma, desc: 'Rates' },
    { name: 'Random', href: '/random-number-generator', Icon: Shuffle, desc: 'Entropy' },
    { name: 'Triangle', href: '/triangle-calculator', Icon: Orbit, desc: 'Geometry' },
    { name: 'Statistics', href: '/standard-deviation-calculator', Icon: Activity, desc: 'Analysis' },
    { name: 'Age', href: '/age-calculator', Icon: Hash, desc: 'Chronology' },
    { name: 'Date', href: '/date-calculator', Icon: Calendar, desc: 'Scheduling' },
    { name: 'Time', href: '/time-calculator', Icon: Clock, desc: 'Duration' },
    { name: 'Hours', href: '/hours-calculator', Icon: Hourglass, desc: 'Tracking' },
    { name: 'Subnet', href: '/subnet-calculator', Icon: Network, desc: 'IP/CIDR' },
    { name: 'Password', href: '/password-generator', Icon: Lock, desc: 'Security' },
    { name: 'Convert', href: '/conversion-calculator', Icon: ArrowLeftRight, desc: 'Units' },
    { name: 'Concrete', href: '/concrete-calculator', Icon: Box, desc: 'Volume' },
  ];

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />

      <div className="min-h-screen pb-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Left Sidebar - Menu (3 Cols) */}
            <div className="hidden lg:block lg:col-span-2 xl:col-span-2">
              <div className="sticky top-8">
                <CalculatorMenu />
              </div>
            </div>

            {/* Main Content (7 Cols) */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-8">

              {/* Tech Hero */}
              <div className="border-b border-violet-500/20 pb-8 mb-8">
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">
                  <Terminal className="w-4 h-4" />
                  <span>System Ready</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                  Pockett <span className="text-violet-500">/</span> Engine
                </h1>
                <p className="text-slate-400 max-w-xl font-mono text-sm leading-relaxed">
                  High-precision calculation suite. Optimized for developers, engineers, and data analysis. Zero latency.
                </p>
              </div>

              {/* Main Calculator - Cyber Deck Style */}
              <div className="glass-panel rounded-xl p-1 border-violet-500/20 bg-slate-900/30">
                <div className="bg-slate-950/50 rounded-lg p-6 border border-violet-500/10">
                  <div className="flex justify-between items-center mb-6 border-b border-violet-500/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-cyan-400/70 uppercase">Scientific Mode</span>
                    </div>
                    <Cpu className="w-4 h-4 text-violet-400/50" />
                  </div>

                  {/* Display */}
                  <div className="calc-display rounded-sm border-violet-500/20 bg-black/40">
                    <div className="text-xs text-slate-400 mb-1 font-mono h-4 flex justify-end">
                      {expression}
                    </div>
                    <div className="text-3xl font-mono text-cyan-400 text-glow">
                      {display}
                    </div>
                  </div>

                  {/* Keypad */}
                  <div className="grid gap-2">
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      <CalcButton onClick={() => handleScientific('sin')} variant="function">sin</CalcButton>
                      <CalcButton onClick={() => handleScientific('cos')} variant="function">cos</CalcButton>
                      <CalcButton onClick={() => handleScientific('tan')} variant="function">tan</CalcButton>
                      <CalcButton onClick={() => setIsDegrees(!isDegrees)} variant="function" className="text-[10px]">
                        {isDegrees ? 'DEG' : 'RAD'}
                      </CalcButton>
                      <CalcButton onClick={() => handleScientific('sin⁻¹')} variant="function">sin⁻¹</CalcButton>
                      <CalcButton onClick={() => handleScientific('cos⁻¹')} variant="function">cos⁻¹</CalcButton>
                      <CalcButton onClick={() => handleScientific('tan⁻¹')} variant="function">tan⁻¹</CalcButton>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-4 grid grid-cols-4 gap-2">
                        <CalcButton onClick={handleClear} variant="operator" className="text-red-400">CLR</CalcButton>
                        <CalcButton onClick={() => { }} variant="operator">DEL</CalcButton>
                        <CalcButton onClick={() => handleOperation('/')} variant="operator">÷</CalcButton>
                        <CalcButton onClick={() => handleOperation('×')} variant="operator">×</CalcButton>

                        <CalcButton onClick={() => handleNumber('7')} variant="number">7</CalcButton>
                        <CalcButton onClick={() => handleNumber('8')} variant="number">8</CalcButton>
                        <CalcButton onClick={() => handleNumber('9')} variant="number">9</CalcButton>
                        <CalcButton onClick={() => handleOperation('–')} variant="operator">–</CalcButton>

                        <CalcButton onClick={() => handleNumber('4')} variant="number">4</CalcButton>
                        <CalcButton onClick={() => handleNumber('5')} variant="number">5</CalcButton>
                        <CalcButton onClick={() => handleNumber('6')} variant="number">6</CalcButton>
                        <CalcButton onClick={() => handleOperation('+')} variant="operator">+</CalcButton>

                        <CalcButton onClick={() => handleNumber('1')} variant="number">1</CalcButton>
                        <CalcButton onClick={() => handleNumber('2')} variant="number">2</CalcButton>
                        <CalcButton onClick={() => handleNumber('3')} variant="number">3</CalcButton>
                        <CalcButton onClick={handleEquals} variant="equals" className="row-span-2">=</CalcButton>

                        <CalcButton onClick={() => handleNumber('0')} variant="number" className="col-span-2">0</CalcButton>
                        <CalcButton onClick={handleDecimal} variant="number">.</CalcButton>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <CalcButton onClick={() => handleScientific('π')} variant="function">π</CalcButton>
                        <CalcButton onClick={() => handleScientific('e')} variant="function">e</CalcButton>
                        <CalcButton onClick={() => handleScientific('√x')} variant="function">√</CalcButton>
                        <CalcButton onClick={() => handleScientific('x²')} variant="function">x²</CalcButton>
                        <CalcButton onClick={() => handleOperation('x^y')} variant="function">xʸ</CalcButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Grid Tools */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Box className="w-5 h-5 text-violet-500" />
                    Tool Matrix
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} className="group">
                      <div className="glass-panel p-4 h-full flex flex-col justify-between min-h-[120px]">
                        <div className="flex justify-between items-start">
                          <tool.Icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                          <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-mono text-slate-500 mb-1">{tool.desc}</div>
                          <div className="font-semibold text-slate-200 group-hover:text-white">{tool.name}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="pt-8 border-t border-violet-500/20">
                <h2 className="text-xl font-bold text-white mb-6">System FAQ</h2>
                <div className="glass-panel rounded-xl p-6">
                  <FAQ items={commonCalculatorFAQs.slice(0, 4)} />
                </div>
              </div>

            </div>

            {/* Right Sidebar - Ads (3 Cols) */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-3">
              <div className="sticky top-8 space-y-6">
                <div className="ad-slot-nebula h-[250px] w-full rounded-lg">
                  <span>Ad Space 300x250</span>
                </div>
                <div className="ad-slot-nebula h-[600px] w-full rounded-lg">
                  <span>Ad Space 300x600</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
