'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import StructuredData, { getFAQSchema, getBreadcrumbSchema } from '../components/StructuredData';
import { 
  allFAQs, 
  faqCategories,
  generalCalculatorFAQs,
  scientificCalculatorFAQs,
  percentageCalculatorFAQs,
  ageCalculatorFAQs,
  dateCalculatorFAQs,
  gpaCalculatorFAQs,
  privacySecurityFAQs,
  featuresAccessibilityFAQs,
  type FAQItem 
} from '../lib/faq-data';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQs based on search query and category
  const filteredFAQs = allFAQs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get FAQs by category for organized display
  const categorizedFAQs = {
    general: generalCalculatorFAQs,
    scientific: scientificCalculatorFAQs,
    percentage: percentageCalculatorFAQs,
    age: ageCalculatorFAQs,
    date: dateCalculatorFAQs,
    gpa: gpaCalculatorFAQs,
    privacy: privacySecurityFAQs,
    features: featuresAccessibilityFAQs
  };

  // Breadcrumb schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://pockettcalculator.com' },
    { name: 'FAQ', url: 'https://pockettcalculator.com/faq' }
  ]);

  // FAQ schema for SEO
  const faqSchema = getFAQSchema(allFAQs);

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about using online calculators, from basic operations to advanced features
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answers... (e.g., 'how to calculate percentage')"
                className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                All Questions
              </button>
              {Object.entries(faqCategories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {searchQuery && (
            <div className="text-center mb-6 text-gray-600">
              Found {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </div>
          )}

          {/* FAQ List */}
          {selectedCategory === 'all' && !searchQuery ? (
            // Organized by category
            <div className="space-y-12">
              {Object.entries(categorizedFAQs).map(([categoryKey, faqs]) => (
                <div key={categoryKey}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    {faqCategories[categoryKey as keyof typeof faqCategories]}
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => {
                      const globalIndex = allFAQs.indexOf(faq);
                      return (
                        <FAQCard
                          key={globalIndex}
                          faq={faq}
                          index={globalIndex}
                          isOpen={openIndex === globalIndex}
                          onToggle={() => toggleQuestion(globalIndex)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Filtered results
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => {
                  const globalIndex = allFAQs.indexOf(faq);
                  return (
                    <FAQCard
                      key={globalIndex}
                      faq={faq}
                      index={globalIndex}
                      isOpen={openIndex === globalIndex}
                      onToggle={() => toggleQuestion(globalIndex)}
                    />
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">No results found for "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Still have questions */}
          <div className="mt-16 text-center premium-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Try our calculators directly or explore other resources.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
              >
                Browse Calculators
              </Link>
              <Link
                href="/privacy"
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// FAQ Card Component
interface FAQCardProps {
  faq: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQCard({ faq, index, isOpen, onToggle }: FAQCardProps) {
  return (
    <div className="premium-card rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
          {faq.question}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
        )}
      </button>
      <div
        id={`faq-answer-${index}`}
        className={`px-6 pb-5 text-gray-700 text-sm md:text-base leading-relaxed transition-all ${
          isOpen ? 'block' : 'hidden'
        }`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        aria-hidden={!isOpen}
      >
        {faq.answer}
      </div>
    </div>
  );
}

