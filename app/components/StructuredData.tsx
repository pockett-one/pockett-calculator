import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Pockett Calculator",
  "url": "https://pockettcalculator.com",
  "logo": "https://pockettcalculator.com/logo.png",
  "description": "Free online calculators for math, science, finance, and everyday calculations.",
  "sameAs": [
    // Add your social media URLs here
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "availableLanguage": "English"
  }
};

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Pockett Calculator",
  "url": "https://pockettcalculator.com",
  "description": "Free online calculators for quick and accurate calculations",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://pockettcalculator.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// WebApplication Schema for Calculator Tools
export function getCalculatorSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "url": url,
    "description": description,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Free to use",
      "No registration required",
      "Mobile-friendly",
      "Instant results",
      "Accurate calculations"
    ]
  };
}

// BreadcrumbList Schema
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// HowTo Schema for Calculators
export function getHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };
}

// FAQPage Schema
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  // Strict validation: Filter out any FAQs that don't have both question and answer
  // This ensures all mainEntity items have required acceptedAnswer field
  // Minimum length checks ensure meaningful content
  const validFAQs = faqs.filter(faq => {
    const question = typeof faq.question === 'string' ? faq.question.trim() : '';
    const answer = typeof faq.answer === 'string' ? faq.answer.trim() : '';
    
    // Ensure both question and answer exist and have meaningful content
    return (
      question.length > 0 &&
      answer.length > 0 &&
      question.length >= 5 && // Minimum question length
      answer.length >= 10    // Minimum answer length for meaningful content
    );
  });

  // Build mainEntity array with guaranteed acceptedAnswer structure
  // Double-check that answer is valid before including in schema
  const mainEntity = validFAQs
    .map(faq => {
      const question = faq.question.trim();
      const answer = faq.answer.trim();
      
      // Final validation: ensure answer is not empty
      if (!answer || answer.length === 0) {
        return null;
      }
      
      return {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Only return schema if we have valid FAQs
  if (mainEntity.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };
}

