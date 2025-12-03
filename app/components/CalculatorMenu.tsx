import React from 'react';
import Link from 'next/link';
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
  ArrowLeftRight
} from 'lucide-react';

const mathCalculators = [
  { name: 'Scientific Calculator', href: '/scientific-calculator', Icon: Calculator },
  { name: 'Fraction Calculator', href: '/fraction-calculator', Icon: PieChart },
  { name: 'Percentage Calculator', href: '/percentage-calculator', Icon: Percent },
  { name: 'Random Number Generator', href: '/random-number-generator', Icon: Dices },
  { name: 'Triangle Calculator', href: '/triangle-calculator', Icon: Triangle },
  { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator', Icon: BarChart3 },
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

export default function CalculatorMenu() {
  return (
    <div className="hidden lg:block lg:col-span-3">
      <div className="sticky top-32">
        <nav className="glass-panel rounded-2xl p-4 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider px-2">All Calculators</h3>

          {/* Math Calculators */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wide px-2 mb-2">Math</h4>
            {mathCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="flex items-center gap-2 px-2 py-2 text-sm text-slate-400 hover:bg-violet-500/10 hover:text-cyan-400 rounded-lg transition-colors"
              >
                <calc.Icon className="w-4 h-4" />
                <span>{calc.name.replace(' Calculator', '')}</span>
              </Link>
            ))}
          </div>

          {/* Other Calculators */}
          <div className="space-y-1 pt-3 border-t border-violet-500/20">
            <h4 className="text-xs font-semibold text-violet-400 uppercase tracking-wide px-2 mb-2">Other</h4>
            {otherCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="flex items-center gap-2 px-2 py-2 text-sm text-slate-400 hover:bg-violet-500/10 hover:text-cyan-400 rounded-lg transition-colors"
              >
                <calc.Icon className="w-4 h-4" />
                <span>{calc.name.replace(' Calculator', '').replace(' Generator', '')}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

