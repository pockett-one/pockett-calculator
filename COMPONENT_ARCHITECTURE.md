# Component Architecture - Pockett Calculator

## Overview
This document describes the reusable component architecture for maintaining consistency across all pages.

## Core Components

### 1. HorizontalAdBanner Component
**Location:** `app/components/HorizontalAdBanner.tsx`

**Purpose:** Displays a horizontal ad banner below the sticky header on all pages.

**Features:**
- Responsive ad sizes (728x90 for desktop, 320x50 for mobile)
- Subtle gray background with border
- Centered within max-width container
- Consistent spacing across all pages
- Google AdSense placeholder ready

**Usage:**
```tsx
import HorizontalAdBanner from './components/HorizontalAdBanner';

<HorizontalAdBanner />
```

**Integrated in:** Root layout (`app/layout.tsx`) - appears on every page automatically

---

### 2. CalculatorMenu Component
**Location:** `app/components/CalculatorMenu.tsx`

**Purpose:** Provides a consistent left sidebar navigation menu for all calculators.

**Features:**
- Displays all 16 calculators organized by category (Math & Other)
- Lucide React icons for each calculator
- Color-coded hover effects (blue for Math, red for Other)
- Sticky positioning (stays visible while scrolling)
- Hidden on mobile (lg: breakpoint)
- Automatically trims calculator names for cleaner display

**Usage:**
```tsx
import CalculatorMenu from './components/CalculatorMenu';

<CalculatorMenu />
```

**Used in:**
- Landing page (`app/page.tsx`)
- Calculator pages (`app/components/CalculatorLayout.tsx`)
- Legal pages (`app/components/LegalPageLayout.tsx`)

---

### 3. CalculatorLayout Component
**Location:** `app/components/CalculatorLayout.tsx`

**Purpose:** Provides a consistent 3-column layout for all calculator pages.

**Features:**
- Left sidebar: CalculatorMenu (3 cols)
- Main content: Calculator interface (6 cols)
- Right sidebar: Ad slots (3 cols)
- Breadcrumb navigation (Home > Calculator Title)
- Page header with title and description
- Related calculators section with icons
- Responsive design (collapses on mobile)

**Props:**
```typescript
interface CalculatorLayoutProps {
  title: string;                    // Calculator page title
  description: string;               // Calculator description
  children: React.ReactNode;         // Calculator content
  relatedCalculators?: Array<{       // Optional related calculators
    name: string; 
    href: string; 
    icon?: string;
  }>;
}
```

**Usage:**
```tsx
import CalculatorLayout from '../components/CalculatorLayout';

<CalculatorLayout
  title="Scientific Calculator"
  description="Advanced mathematical calculations with trigonometric and logarithmic functions"
  relatedCalculators={[
    { name: 'Percentage', href: '/percentage-calculator' },
    { name: 'Fraction', href: '/fraction-calculator' },
  ]}
>
  {/* Your calculator content here */}
</CalculatorLayout>
```

**Used in:**
- All 16 calculator pages (e.g., `app/scientific-calculator/page.tsx`)

---

### 4. LegalPageLayout Component
**Location:** `app/components/LegalPageLayout.tsx`

**Purpose:** Provides a consistent 3-column layout for legal/informational pages.

**Features:**
- Left sidebar: CalculatorMenu (3 cols)
- Main content: Legal content (6 cols)
- Right sidebar: Ad slots (3 cols)
- Breadcrumb navigation (Home > Page Title)
- Responsive design (collapses on mobile)

**Props:**
```typescript
interface LegalPageLayoutProps {
  title: string;           // Page title for breadcrumb
  children: React.ReactNode; // Page content
}
```

**Usage:**
```tsx
import LegalPageLayout from '../components/LegalPageLayout';

<LegalPageLayout title="Privacy Policy">
  {/* Your legal content here */}
</LegalPageLayout>
```

**Used in:**
- Privacy Policy page (`app/privacy/page.tsx`)
- Terms of Service page (`app/terms/page.tsx`)

---

## Layout Grid System

All pages use a consistent 12-column grid system:

```
┌──────────────┬─────────────────┬──────────────┐
│  Calculator  │  Main Content   │   Ad Space   │
│     Menu     │                 │              │
│   (3 cols)   │    (6 cols)     │   (3 cols)   │
│   Sticky     │                 │   Sticky     │
└──────────────┴─────────────────┴──────────────┘
```

**Desktop (lg breakpoint):**
- Left: 3 columns (25%)
- Center: 6 columns (50%)
- Right: 3 columns (25%)

**Mobile:**
- All columns stack vertically
- Left sidebar (CalculatorMenu) hidden
- Only main content visible

---

## Calculator Data Structure

The calculator menu uses a centralized data structure:

```typescript
const mathCalculators = [
  { name: 'Scientific Calculator', href: '/scientific-calculator', Icon: Calculator },
  { name: 'Fraction Calculator', href: '/fraction-calculator', Icon: PieChart },
  // ... more math calculators
];

const otherCalculators = [
  { name: 'Age Calculator', href: '/age-calculator', Icon: Cake },
  { name: 'Date Calculator', href: '/date-calculator', Icon: Calendar },
  // ... more other calculators
];
```

**Benefits:**
- Single source of truth for all calculator links
- Easy to add new calculators
- Automatic icon assignment
- Consistent naming across the site

---

## Icon System

### Lucide React Icons
All icons use the professional [Lucide React](https://lucide.dev/) library.

**Icon Mapping:**
```typescript
Calculator      → Scientific Calculator
Percent         → Percentage Calculator
PieChart        → Fraction Calculator
Dices           → Random Number Generator
Triangle        → Triangle Calculator
BarChart3       → Standard Deviation Calculator
Cake            → Age Calculator
Calendar        → Date Calculator
Clock           → Time Calculator
Hourglass       → Hours Calculator
GraduationCap   → GPA Calculator
FileText        → Grade Calculator
Package         → Concrete Calculator
Network         → Subnet Calculator
Lock            → Password Generator
ArrowLeftRight  → Conversion Calculator
```

**Icon Resolution:**
The `CalculatorLayout` component includes a `getIconForCalculator()` function that automatically resolves the correct icon based on the calculator's href.

---

## Adding a New Calculator

To add a new calculator to the site:

### 1. Create the calculator page
```bash
mkdir app/new-calculator
touch app/new-calculator/page.tsx
```

### 2. Use CalculatorLayout
```tsx
import CalculatorLayout from '../components/CalculatorLayout';
import { YourIcon } from 'lucide-react';

export default function NewCalculatorPage() {
  return (
    <CalculatorLayout
      title="New Calculator"
      description="Description of your calculator"
    >
      {/* Your calculator UI */}
    </CalculatorLayout>
  );
}
```

### 3. Add to CalculatorMenu
Edit `app/components/CalculatorMenu.tsx`:

```tsx
// Add to appropriate array
const mathCalculators = [
  // ... existing calculators
  { name: 'New Calculator', href: '/new-calculator', Icon: YourIcon },
];
```

### 4. Update icon mapping in CalculatorLayout
Edit `app/components/CalculatorLayout.tsx`:

```tsx
const iconMap: Record<string, any> = {
  // ... existing mappings
  '/new-calculator': YourIcon,
};
```

That's it! Your new calculator will automatically:
- Appear in the left sidebar menu on all pages
- Have the correct icon everywhere
- Follow the consistent 3-column layout
- Work on mobile and desktop

---

## Benefits of This Architecture

✅ **DRY (Don't Repeat Yourself):** Menu is defined once, used everywhere  
✅ **Consistency:** All pages have the same layout and navigation  
✅ **Maintainability:** Update menu in one place, changes apply site-wide  
✅ **Scalability:** Easy to add new calculators  
✅ **Professional Icons:** Lucide React icons are consistent and clean  
✅ **Responsive:** Mobile-friendly out of the box  
✅ **SEO:** Proper breadcrumbs and semantic HTML  

---

## Future Enhancements

Consider these improvements:

1. **Active State Highlighting:** Highlight the current calculator in the menu
2. **Category Collapse:** Allow users to collapse/expand Math/Other categories
3. **Search Integration:** Add search within the sidebar menu
4. **Favorites:** Let users pin favorite calculators to the top
5. **Recently Used:** Show recently accessed calculators

---

Last updated: January 21, 2025

