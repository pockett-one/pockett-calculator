import React from 'react';
import { Metadata } from 'next';
import { FileText, AlertCircle, CheckCircle, XCircle, Scale, RefreshCw } from 'lucide-react';
import LegalPageLayout from '../components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service - Pockett Calculator',
  description: 'Read the terms and conditions for using Pockett Calculator.',
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 shadow-lg">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold gradient-text mb-4">Terms of Service</h1>
        <p className="text-gray-600">Last updated: January 20, 2025</p>
      </div>

      {/* Content */}
      <div className="premium-card p-8 rounded-3xl space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Pockett Calculator. By accessing or using our website and calculator tools, you agree to be 
              bound by these Terms of Service. Please read them carefully before using our services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Pockett Calculator, you accept and agree to be bound by the terms and provision 
                of this agreement. If you do not agree to these Terms of Service, please do not use our website.
              </p>
            </div>
          </section>

          {/* Use of Service */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Use of Service</h2>
            </div>
            <div className="ml-9 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Permitted Use</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Pockett Calculator provides free online calculator tools for personal, educational, and professional use. 
                  You may use our calculators for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Mathematical calculations and computations</li>
                  <li>Educational purposes</li>
                  <li>Business and professional applications</li>
                  <li>Personal financial planning</li>
                  <li>Any lawful purpose</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prohibited Use</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You agree NOT to use our service to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit malicious code or viruses</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the service</li>
                  <li>Use automated scripts to scrape or copy content</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Accuracy Disclaimer */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Accuracy and Reliability</h2>
            </div>
            <div className="ml-9 space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-gray-800 font-semibold mb-2">Important Notice:</p>
                <p className="text-gray-700 leading-relaxed">
                  While we strive to ensure the accuracy of our calculators, Pockett Calculator is provided "as is" 
                  without any warranties or guarantees of accuracy. All calculations should be independently verified 
                  for critical applications.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We make no representations or warranties about the accuracy, reliability, completeness, or timeliness 
                of the calculations or results provided by our tools. Users are responsible for verifying the accuracy 
                of all calculations for their specific needs.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed mb-3">
                The content, features, and functionality of Pockett Calculator, including but not limited to text, 
                graphics, logos, icons, images, and software, are the exclusive property of Pockett Calculator and 
                are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works, publicly display, or exploit any 
                content from our website without our prior written permission.
              </p>
            </div>
          </section>

          {/* User Conduct */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">User Conduct</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree to use Pockett Calculator responsibly and in compliance with all applicable laws. You are 
                solely responsible for your conduct while using our service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to terminate or restrict your access to our service if we believe you have 
                violated these Terms of Service.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Links and Advertisements</h2>
            </div>
            <div className="ml-9 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites and advertisements (including Google AdSense) 
                that are not owned or controlled by Pockett Calculator. We have no control over, and assume no 
                responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by 
                your use of any third-party content, goods, or services available through such websites.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed mb-3">
                To the fullest extent permitted by applicable law, Pockett Calculator shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                <li>Loss of profits or revenue</li>
                <li>Loss of data or information</li>
                <li>Business interruption</li>
                <li>Errors in calculations or results</li>
                <li>Any other commercial damages or losses</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Our total liability to you for any claims arising from the use of our service shall not exceed the 
                amount you paid to us (if any) during the twelve months prior to the event giving rise to the claim.
              </p>
            </div>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">Disclaimer of Warranties</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed mb-3">
                Pockett Calculator is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, 
                either express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy or reliability of results</li>
                <li>Uninterrupted or error-free service</li>
              </ul>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Indemnification</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Pockett Calculator and its affiliates, officers, 
                directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including 
                reasonable attorneys' fees, arising out of or in any way connected with your use of our service or 
                violation of these Terms of Service.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Changes to These Terms</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms of Service at any time. We will provide notice 
                of any material changes by posting the new Terms of Service on this page and updating the "Last updated" 
                date. Your continued use of the service after any changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction 
                in which Pockett Calculator operates, without regard to its conflict of law provisions.
              </p>
            </div>
          </section>

          {/* Severability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Severability</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms of Service is found to be unenforceable or invalid, that provision 
                shall be limited or eliminated to the minimum extent necessary so that these Terms of Service shall 
                otherwise remain in full force and effect.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-2xl border border-gray-200">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-gray-700 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at{' '}
                  <a href="mailto:info@pockett.io" className="text-blue-600 hover:underline font-semibold">
                    info@pockett.io
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Acceptance */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your Acceptance</h2>
                <p className="text-gray-700 leading-relaxed">
                  By using Pockett Calculator, you signify your acceptance of these Terms of Service. If you do not 
                  agree to these terms, please do not use our service.
                </p>
              </div>
            </div>
          </section>
        </div>
    </LegalPageLayout>
  );
}

