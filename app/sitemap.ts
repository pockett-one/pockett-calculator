import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pockettcalculator.com'
  
  // Static pages
  const staticPages = [
    '',
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
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page === '' ? 1 : 0.8,
  }))
  
  const calculatorEntries = calculatorPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
  
  return [...staticEntries, ...calculatorEntries]
}

