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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="pt-3 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Brand */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-lg font-black gradient-text">Pockett Calculator</h3>
                <p className="text-xs text-gray-500">Free Online Calculators</p>
              </div>
            </div>

            {/* Right: Links and Badges */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                  FAQ
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  100% Free
                </span>
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Shield className="w-4 h-4 text-blue-500" />
                  Secure
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-600 text-center sm:text-right mt-2">
            © 2025 <span className="font-semibold text-gray-900">Pockett Calculator</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
