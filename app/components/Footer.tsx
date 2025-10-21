import React from 'react';
import Link from 'next/link';
import { Calculator, CheckCircle, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-white to-gray-50">
      {/* Bottom Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="ad-slot" style={{ minHeight: '90px' }}>
          <div className="text-center">
            <div className="text-xs font-bold text-gray-400 mb-1">Advertisement</div>
            <div className="text-xs text-gray-400">Google AdSense - Footer Banner (728x90)</div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Calculator className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl font-black gradient-text">Pockett</h3>
                <p className="text-xs text-gray-500 font-semibold">Calculator</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-md">
              Experience the future of online calculations with Pockett Calculator. Fast, accurate, and beautifully designed 
              calculators that make complex math simple.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Popular Tools</h4>
            <ul className="space-y-3">
              <li><Link href="/scientific-calculator" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Scientific Calculator</Link></li>
              <li><Link href="/percentage-calculator" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Percentage Calculator</Link></li>
              <li><Link href="/age-calculator" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Age Calculator</Link></li>
              <li><Link href="/date-calculator" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Date Calculator</Link></li>
              <li><Link href="/gpa-calculator" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">GPA Calculator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">About Us</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 hover:translate-x-1 inline-block transition-all duration-200">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 <span className="font-semibold text-gray-900">Pockett Calculator</span> · All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-500" />
                Secure & Private
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
