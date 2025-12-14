import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQProps {
  items: FAQItem[];
  defaultOpenFirst?: boolean;
}

export default function FAQ({ items, defaultOpenFirst = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenFirst ? 0 : null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="glass-panel rounded-xl overflow-hidden border border-violet-500/20 hover:border-cyan-500/30 transition-colors"
        >
          <button
            onClick={() => toggleQuestion(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="text-base font-semibold text-slate-200 pr-4">
              {item.question}
            </h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" aria-hidden="true" />
            )}
          </button>
          <div
            id={`faq-answer-${index}`}
            className={`px-6 pb-4 text-slate-400 text-sm leading-relaxed transition-all ${openIndex === index ? 'block' : 'hidden'
              }`}
            role="region"
            aria-hidden={openIndex !== index}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

// Common Calculator FAQs
export const commonCalculatorFAQs: FAQItem[] = [
  {
    question: "How accurate is Pockett Calculator?",
    answer: "Pockett Calculator uses JavaScript's built-in Math library which provides double-precision floating-point arithmetic. This means calculations are accurate to about 15-17 significant digits, which is more than sufficient for most scientific, engineering, and everyday calculations."
  },
  {
    question: "Do I need to install or download anything to use these calculators?",
    answer: "No installation required! All calculators on Pockett Calculator are web-based and run directly in your browser. Simply visit the page and start calculating. No downloads, no registration, and no plugins needed."
  },
  {
    question: "Can I use Pockett Calculator on my phone or tablet?",
    answer: "Yes! All calculators are fully responsive and optimized for mobile devices. Whether you're on a smartphone, tablet, laptop, or desktop, you'll get a seamless experience with touch-friendly buttons and adaptive layouts."
  },
  {
    question: "Is Pockett Calculator really free?",
    answer: "Yes, absolutely! All calculators are 100% free to use with no hidden costs, subscriptions, or premium features. We support the service through non-intrusive advertising while keeping all functionality completely free for everyone."
  },
  {
    question: "What's the difference between the basic calculator and scientific calculator?",
    answer: "The basic calculator handles standard arithmetic operations (addition, subtraction, multiplication, division). The scientific calculator includes advanced functions like trigonometry (sin, cos, tan), logarithms, exponents, square roots, and more - perfect for students, engineers, and professionals."
  },
  {
    question: "Can I use keyboard shortcuts with the calculator?",
    answer: "Yes! You can use your keyboard's number pad and operator keys for faster input. Number keys (0-9) input digits, +/-/* for operations, Enter for equals, and Escape or C for clear."
  },
  {
    question: "Does the calculator save my calculation history?",
    answer: "Currently, the calculators perform individual calculations without saving history. Each calculation is independent, ensuring your privacy and keeping the interface clean and fast."
  },
  {
    question: "What calculator tools are available on Pockett Calculator?",
    answer: "We offer a comprehensive suite including Scientific Calculator, Percentage Calculator, Fraction Calculator, Age Calculator, Date Calculator, Time Calculator, GPA Calculator, Grade Calculator, Triangle Calculator, Standard Deviation Calculator, Subnet Calculator, Password Generator, and many more specialized calculators."
  },
  {
    question: "How do I calculate percentages?",
    answer: "Use our dedicated Percentage Calculator for quick percentage calculations. It can help you find what percentage one number is of another, calculate percentage increase/decrease, add or subtract percentages, and more with simple inputs."
  },
  {
    question: "Is my data secure when using these calculators?",
    answer: "Yes! All calculations are performed locally in your browser. We don't collect, store, or transmit your calculation data to any servers. Your inputs and results remain completely private on your device."
  }
];
