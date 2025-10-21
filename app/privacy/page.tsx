import React from 'react';
import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, UserX, Mail } from 'lucide-react';
import LegalPageLayout from '../components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy - Pockett Calculator',
  description: 'Learn how Pockett Calculator protects your privacy and handles your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-extrabold gradient-text mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Last updated: January 20, 2025</p>
      </div>

      {/* Content */}
      <div className="premium-card p-8 rounded-3xl space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-gray-700 leading-relaxed">
              At Pockett Calculator, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              and protect your information when you use our website and calculator tools.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="space-y-4 ml-9">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you visit Pockett Calculator, we may automatically collect certain information about your device, 
                  including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
                  <li>Browser type and version</li>
                  <li>Device type and operating system</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referral source</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Calculator Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  All calculations are performed locally in your browser. We do not store, transmit, or have access 
                  to the numbers or values you enter into our calculators.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Improve and optimize our website and calculator tools</li>
                <li>Understand how users interact with our services</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect and prevent technical issues</li>
                <li>Serve relevant advertisements through Google AdSense</li>
              </ul>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking Technologies</h2>
            </div>
            <div className="ml-9 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                Cookies are files with small amounts of data that may include an anonymous unique identifier.
              </p>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve relevant advertisements</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserX className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
            </div>
            <div className="ml-9 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Google AdSense</h3>
                <p className="text-gray-700 leading-relaxed">
                  We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your 
                  prior visits to our website or other websites. You can opt out of personalized advertising by visiting 
                  Google's <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ads Settings</a>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Analytics Services</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may use third-party analytics services to help us understand how our website is used. These services 
                  may collect information sent by your browser as part of a web page request.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                The security of your data is important to us. While we strive to use commercially acceptable means to 
                protect your information, remember that no method of transmission over the Internet or method of electronic 
                storage is 100% secure. All calculator operations are performed locally in your browser, and we do not 
                store or transmit your calculation data.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                Our website is intended for general audiences and does not knowingly collect personal information from 
                children under 13 years of age. Our calculators are educational tools that can be used by students of all ages.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <UserX className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed mb-3">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to opt-out of certain data processing</li>
                <li>The right to data portability</li>
              </ul>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Changes to This Privacy Policy</h2>
            </div>
            <div className="ml-9">
              <p className="text-gray-700 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy 
                Policy periodically for any changes.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us through 
                  our website or email us at <a href="mailto:privacy@pockettcalculator.com" className="text-blue-600 hover:underline font-semibold">privacy@pockettcalculator.com</a>
                </p>
              </div>
            </div>
          </section>
        </div>
    </LegalPageLayout>
  );
}

