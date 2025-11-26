import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
  /**
   * Optional unique ID for the script tag to prevent duplicates
   */
  scriptId?: string;
}

export default function StructuredData({ data, scriptId }: StructuredDataProps) {
  // Generate a unique ID based on schema type to prevent duplicates
  const schemaType = data['@type'] || 'schema';
  const uniqueId = scriptId || `structured-data-${schemaType.toLowerCase()}`;
  
  return (
    <script
      id={uniqueId}
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
  // Validate input
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  // Strict validation: Filter out any FAQs that don't have both question and answer
  // This ensures all mainEntity items have required acceptedAnswer field
  // Minimum length checks ensure meaningful content
  const validFAQs = faqs.filter(faq => {
    // Check if faq exists and is an object
    if (!faq || typeof faq !== 'object') {
      return false;
    }

    // Safely extract and validate question
    const question = (faq.question && typeof faq.question === 'string') 
      ? faq.question.trim() 
      : '';
    
    // Safely extract and validate answer
    const answer = (faq.answer && typeof faq.answer === 'string') 
      ? faq.answer.trim() 
      : '';
    
    // Ensure both question and answer exist and have meaningful content
    return (
      question.length > 0 &&
      answer.length > 0 &&
      question.length >= 5 && // Minimum question length
      answer.length >= 10    // Minimum answer length for meaningful content
    );
  });

  // Build mainEntity array with guaranteed acceptedAnswer structure
  // Triple-check that answer is valid before including in schema
  const mainEntity = validFAQs
    .map(faq => {
      // Defensive checks - ensure faq exists and has required properties
      if (!faq || typeof faq !== 'object') {
        return null;
      }

      // Safely extract question and answer with fallbacks
      const question = (faq.question && typeof faq.question === 'string') 
        ? faq.question.trim() 
        : '';
      const answer = (faq.answer && typeof faq.answer === 'string') 
        ? faq.answer.trim() 
        : '';
      
      // Final validation: ensure both question and answer are non-empty
      if (!question || question.length === 0 || !answer || answer.length === 0) {
        return null;
      }
      
      // Ensure minimum lengths are met
      if (question.length < 5 || answer.length < 10) {
        return null;
      }
      
      // Return schema object with guaranteed acceptedAnswer structure
      return {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      };
    })
    .filter((item): item is NonNullable<typeof item> => {
      // Final filter: ensure item is not null and has required structure
      if (!item || typeof item !== 'object') {
        return false;
      }
      // Verify acceptedAnswer structure exists and is valid
      const hasValidType: boolean = item['@type'] === 'Question';
      const hasValidName: boolean = Boolean(item.name && typeof item.name === 'string' && item.name.length > 0);
      const hasAcceptedAnswer: boolean = Boolean(item.acceptedAnswer && typeof item.acceptedAnswer === 'object');
      const hasValidAnswerType: boolean = hasAcceptedAnswer && item.acceptedAnswer['@type'] === 'Answer';
      const hasValidAnswerText: boolean = Boolean(
        hasAcceptedAnswer && 
        item.acceptedAnswer.text && 
        typeof item.acceptedAnswer.text === 'string' && 
        item.acceptedAnswer.text.length > 0
      );
      
      return hasValidType && hasValidName && hasValidAnswerType && hasValidAnswerText;
    });

  // Only return schema if we have valid FAQs
  if (mainEntity.length === 0) {
    return null;
  }

  // Final validation: ensure all items have acceptedAnswer
  const allHaveAcceptedAnswer = mainEntity.every(item => 
    item.acceptedAnswer && 
    item.acceptedAnswer['@type'] === 'Answer' &&
    item.acceptedAnswer.text &&
    typeof item.acceptedAnswer.text === 'string' &&
    item.acceptedAnswer.text.length > 0
  );

  if (!allHaveAcceptedAnswer) {
    // If any item is missing acceptedAnswer, filter them out
    const fullyValidItems = mainEntity.filter(item => 
      item.acceptedAnswer && 
      item.acceptedAnswer['@type'] === 'Answer' &&
      item.acceptedAnswer.text &&
      typeof item.acceptedAnswer.text === 'string' &&
      item.acceptedAnswer.text.length > 0
    );
    
    if (fullyValidItems.length === 0) {
      return null;
    }
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": fullyValidItems
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity
  };
}

