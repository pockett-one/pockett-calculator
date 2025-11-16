# Calculator.net Clone - Modern Calculator Collection

A comprehensive calculator.net clone built with Next.js, Tailwind CSS, and TypeScript. This project features a modern white, gray, and black color scheme, optimized for Google AdSense integration.

## 🎯 Project Overview

This project duplicates [calculator.net](https://www.calculator.net/) functionality with a modern, minimalist design. It's built specifically for:

1. **Modern Design**: Clean white, gray, and black theme
2. **Next.js & Tailwind**: Fast, responsive, and maintainable
3. **Ad-Driven Revenue**: Google AdSense placeholder slots throughout
4. **Phase II Ready**: Prepared for prompt-based calculators (Finance, Interest, Loan, Tax)

## ✨ Features

### Current Implementation (Phase I)

#### Math Calculators (6)
- ✅ **Scientific Calculator** - Full scientific calculator with trigonometric functions
- ✅ **Fraction Calculator** - Add, subtract, multiply, divide fractions
- ✅ **Percentage Calculator** - Calculate percentages, increases, decreases
- ✅ **Random Number Generator** - Generate random numbers in ranges
- ✅ **Triangle Calculator** - Calculate area, perimeter, angles using Heron's formula
- ✅ **Standard Deviation Calculator** - Population and sample statistics

#### Other Calculators (10)
- ✅ **Age Calculator** - Calculate exact age in years, months, days
- ✅ **Date Calculator** - Add/subtract days, months, years
- ✅ **Time Calculator** - Add/subtract time values
- ✅ **Hours Calculator** - Calculate working hours with breaks
- ✅ **GPA Calculator** - Calculate GPA from grades and credits
- ✅ **Grade Calculator** - Weighted grade calculation
- ✅ **Concrete Calculator** - Calculate concrete needed for projects
- ✅ **Subnet Calculator** - Network subnet calculations
- ✅ **Password Generator** - Generate secure passwords
- ✅ **Conversion Calculator** - Unit conversions (length, weight, temperature)

### Design Features

- 🎨 **Modern UI**: Clean white, gray, and black color palette
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile
- 🚀 **Fast Performance**: Optimized Next.js with server-side rendering
- ♿ **Accessible**: Proper focus states and semantic HTML
- 💰 **Ad Slots**: Google AdSense placeholders strategically placed

### Ad Placement Strategy

The site includes AdSense placeholder slots at:
- Top header banner (728x90)
- Left sidebar (160x600)
- Right sidebar (160x600)
- Content area (300x250)
- Bottom banner (728x90)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
pockett-calculator/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Navigation with ad slots
│   │   └── Footer.tsx          # Footer with links and ads
│   ├── scientific-calculator/
│   ├── percentage-calculator/
│   ├── age-calculator/
│   └── ... (16 calculators total)
│   ├── globals.css             # Global styles and utilities
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Homepage with calculator grid
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts          # Tailwind configuration
└── README.md
```

## 🎨 Design System

### Color Palette

- **Background**: White (#FFFFFF)
- **Text Primary**: Gray 900 (#111827)
- **Text Secondary**: Gray 600 (#4B5563)
- **Borders**: Gray 200-300 (#E5E7EB, #D1D5DB)
- **Accents**: Black (#000000) for buttons and emphasis

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold, large sizes with tight line-height
- **Body**: Regular weight, comfortable reading size

## 🔧 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 3+
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)
- **Icons**: SVG inline icons
- **Deployment**: Vercel-ready

## 📊 Google AdSense Integration

### Current Implementation

All pages include placeholder ad slots with:
- Visual indicators showing ad dimensions
- Semantic HTML structure ready for ad insertion
- Responsive positioning

### To Activate Google AdSense

1. Sign up for Google AdSense account
2. Get your publisher ID
3. Replace placeholder `<div className="ad-slot">` elements with actual AdSense code
4. Add AdSense script to `app/layout.tsx`
5. Configure ad units in AdSense dashboard

Example replacement:
```tsx
// Before (placeholder)
<div className="ad-slot" style={{ minHeight: '90px' }}>
  Google AdSense - Top Banner (728x90)
</div>

// After (actual AdSense)
<ins className="adsbygoogle"
     style={{display:'inline-block',width:'728px',height:'90px'}}
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"></ins>
```

## 🔮 Phase II Roadmap

### Planned Calculators

- **Finance Calculators**
  - Interest Calculator
  - Loan Calculator  
  - Mortgage Calculator
  - Investment Calculator
  - Compound Interest Calculator

- **Tax Calculators**
  - Income Tax Calculator
  - Sales Tax Calculator
  - Tax Bracket Calculator

### Prompt-Based Features

Phase II will include AI-powered calculators that:
- Accept natural language inputs
- Provide contextual explanations
- Suggest related calculations
- Generate detailed reports

## 📝 SEO Optimization

Each calculator page includes:
- Unique meta titles and descriptions
- Semantic HTML structure
- Fast load times
- Mobile-friendly design
- Clean URLs

## 🌐 Deployment

### Deploy to Vercel

The easiest way to deploy:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

No environment variables required for Phase I. Phase II will require:
- `NEXT_PUBLIC_ADSENSE_ID` - Google AdSense publisher ID
- `OPENAI_API_KEY` - For AI-powered calculators (Phase II)

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

### Setup & Configuration
- **[AdSense Setup Guide](docs/ADSENSE_SETUP.md)** - Complete guide for Google AdSense integration, ad components, and monetization
- **[Component Architecture](docs/COMPONENT_ARCHITECTURE.md)** - Reusable component system and layout patterns

### Testing & CI/CD
- **[Testing Setup](docs/TESTING_SETUP.md)** - Test suite configuration and coverage
- **[GitHub Actions Setup](docs/GITHUB_ACTIONS_SETUP.md)** - Automated testing workflows
- **[Branch Protection Setup](docs/BRANCH_PROTECTION_SETUP.md)** - Configure branch protection rules

### SEO & Optimization
- **[SEO Guide](docs/SEO_GUIDE.md)** - Search Engine Optimization implementation
- **[SEO & AEO Optimization](docs/SEO_AEO_OPTIMIZATION.md)** - Comprehensive SEO and Answer Engine Optimization strategies
- **[SEO & AEO Summary](docs/SEO_AEO_SUMMARY.md)** - Quick reference for SEO/AEO implementation

## 📄 License

All rights reserved © 2025 Calculator.net Clone

---

**Built with precision and simplicity | Powered by Next.js, Tailwind CSS & TypeScript**

