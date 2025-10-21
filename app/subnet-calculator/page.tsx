'use client';

import React, { useState } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { Network } from 'lucide-react';

export default function SubnetCalculatorPage() {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<{
    network: string;
    firstHost: string;
    lastHost: string;
    broadcast: string;
    hosts: number;
    mask: string;
  } | null>(null);

  const calculate = () => {
    const cidrNum = parseInt(cidr);
    if (cidrNum < 0 || cidrNum > 32) return;

    // Calculate subnet mask
    const mask = (0xffffffff << (32 - cidrNum)) >>> 0;
    const maskOctets = [
      (mask >>> 24) & 0xff,
      (mask >>> 16) & 0xff,
      (mask >>> 8) & 0xff,
      mask & 0xff,
    ];

    // Parse IP
    const ipOctets = ip.split('.').map(Number);
    if (ipOctets.length !== 4 || ipOctets.some(o => isNaN(o) || o < 0 || o > 255)) return;

    // Calculate network address
    const network = ipOctets.map((octet, i) => octet & maskOctets[i]);

    // Calculate broadcast address
    const broadcast = network.map((octet, i) => octet | (~maskOctets[i] & 0xff));

    // Calculate first and last host
    const firstHost = [...network];
    firstHost[3] += 1;
    const lastHost = [...broadcast];
    lastHost[3] -= 1;

    // Calculate number of hosts
    const hosts = Math.pow(2, 32 - cidrNum) - 2;

    setResult({
      network: network.join('.'),
      firstHost: firstHost.join('.'),
      lastHost: lastHost.join('.'),
      broadcast: broadcast.join('.'),
      hosts: hosts > 0 ? hosts : 0,
      mask: maskOctets.join('.'),
    });
  };

  const relatedCalculators = [
    { name: 'Password Generator', href: '/password-generator', icon: '🔒' },
    { name: 'Conversion', href: '/conversion-calculator', icon: '⇄' },
    { name: 'Scientific', href: '/scientific-calculator', icon: '√' },
    { name: 'Random Number', href: '/random-number-generator', icon: '🎲' },
    { name: 'Percentage', href: '/percentage-calculator', icon: '%' },
  ];

  return (
    <CalculatorLayout
      title="Subnet Calculator"
      description="Calculate network address, broadcast, host range, and subnet mask from IP/CIDR"
      relatedCalculators={relatedCalculators}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">IP Address</label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="192.168.1.0"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">CIDR (Prefix Length)</label>
            <input
              type="number"
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              placeholder="24"
              min="0"
              max="32"
              className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full min-h-[56px] py-4 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg touch-manipulation select-none flex items-center justify-center gap-2"
        >
          <Network className="w-5 h-5" />
          Calculate Subnet
        </button>

        {result && (
          <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 shadow-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-950 rounded-lg border border-gray-700">
                <div className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wide">Subnet Mask</div>
                <div className="led-result text-lg">{result.mask}</div>
              </div>
              <div className="p-4 bg-gray-950 rounded-lg border border-gray-700">
                <div className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wide">Usable Hosts</div>
                <div className="led-result-red text-lg">{result.hosts.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-gray-950 rounded-lg border border-gray-700">
                <div className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wide">Network Address</div>
                <div className="led-result text-lg">{result.network}/{cidr}</div>
              </div>
              <div className="p-4 bg-gray-950 rounded-lg border border-gray-700">
                <div className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wide">Broadcast Address</div>
                <div className="led-result text-lg">{result.broadcast}</div>
              </div>
              <div className="p-4 bg-gray-950 rounded-lg border border-gray-700">
                <div className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wide">First Usable Host</div>
                <div className="led-result text-lg">{result.firstHost}</div>
              </div>
              <div className="p-4 bg-gray-950 rounded-lg border border-gray-700">
                <div className="text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wide">Last Usable Host</div>
                <div className="led-result text-lg">{result.lastHost}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Common CIDR Values</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div className="p-2 bg-white rounded border border-gray-200">
              <div className="font-bold">/24</div>
              <div className="text-gray-600">254 hosts</div>
            </div>
            <div className="p-2 bg-white rounded border border-gray-200">
              <div className="font-bold">/25</div>
              <div className="text-gray-600">126 hosts</div>
            </div>
            <div className="p-2 bg-white rounded border border-gray-200">
              <div className="font-bold">/26</div>
              <div className="text-gray-600">62 hosts</div>
            </div>
            <div className="p-2 bg-white rounded border border-gray-200">
              <div className="font-bold">/27</div>
              <div className="text-gray-600">30 hosts</div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
