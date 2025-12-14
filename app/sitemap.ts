import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pockettcalculator.com'
  // Use a fixed date for consistency, but allow updates
  const lastModified = new Date('2025-01-21')
  
  // Static pages
  const staticPages = [
    '',
    '/faq',
    '/privacy',
    '/terms',
  ]
  
  // Calculator pages
  const calculatorPages = [
    '/scientific-calculator',
    '/fraction-calculator',
    '/percentage-calculator',
    '/random-number-generator',
    '/triangle-calculator',
    '/standard-deviation-calculator',
    '/age-calculator',
    '/date-calculator',
    '/time-calculator',
    '/hours-calculator',
    '/gpa-calculator',
    '/grade-calculator',
    '/concrete-calculator',
    '/subnet-calculator',
    '/password-generator',
    '/conversion-calculator',
  ]
  
  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1.0 : page === '/faq' ? 0.9 : 0.8,
  }))
  
  const calculatorEntries = calculatorPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
  
  return [...staticEntries, ...calculatorEntries]
}

