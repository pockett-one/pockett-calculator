import { Metadata } from 'next';

interface CalculatorSEOConfig {
  name: string;
  description: string;
  longTailKeywords: string[];
  slug: string;
}

const calculatorSEO: Record<string, CalculatorSEOConfig> = {
  scientific: {
    name: "Scientific Calculator",
    description: "Free online scientific calculator with trigonometric functions (sin, cos, tan), logarithms, exponentials, square roots, and more. Perfect for students, engineers, and scientists.",
    longTailKeywords: [
      "scientific calculator online free",
      "advanced math calculator with steps",
      "trigonometry calculator sin cos tan",
      "logarithm calculator online",
      "exponential calculator",
      "scientific calculator for students",
      "engineering calculator online",
      "scientific calculator with fractions"
    ],
    slug: "/scientific-calculator"
  },
  percentage: {
    name: "Percentage Calculator",
    description: "Calculate percentages easily with our free online percentage calculator. Find what percent one number is of another, calculate percentage increase/decrease, and more.",
    longTailKeywords: [
      "percentage calculator online",
      "how to calculate percentage",
      "percentage increase calculator",
      "percentage decrease calculator",
      "percentage change calculator",
      "percentage difference calculator",
      "percentage of a number calculator",
      "grade percentage calculator"
    ],
    slug: "/percentage-calculator"
  },
  fraction: {
    name: "Fraction Calculator",
    description: "Free fraction calculator for adding, subtracting, multiplying, and dividing fractions. Automatic simplification to lowest terms. Perfect for homework and everyday math.",
    longTailKeywords: [
      "fraction calculator with steps",
      "add fractions calculator",
      "simplify fractions calculator",
      "fraction to decimal calculator",
      "mixed fraction calculator",
      "fraction multiplication calculator",
      "fraction division calculator",
      "reduce fractions calculator"
    ],
    slug: "/fraction-calculator"
  },
  age: {
    name: "Age Calculator",
    description: "Calculate your exact age from date of birth. Find out how old you are in years, months, weeks, days, hours, and even seconds. Perfect for age verification and birthdays.",
    longTailKeywords: [
      "age calculator from date of birth",
      "how old am i calculator",
      "age calculator in years months days",
      "calculate age from birthday",
      "age difference calculator",
      "exact age calculator",
      "age calculator online free",
      "birthday age calculator"
    ],
    slug: "/age-calculator"
  },
  gpa: {
    name: "GPA Calculator",
    description: "Free GPA calculator for college and high school students. Calculate your grade point average using a 4.0 scale. Supports weighted and unweighted GPA calculation.",
    longTailKeywords: [
      "gpa calculator college",
      "gpa calculator high school",
      "cumulative gpa calculator",
      "weighted gpa calculator",
      "grade point average calculator",
      "college gpa calculator with credits",
      "semester gpa calculator",
      "4.0 gpa calculator"
    ],
    slug: "/gpa-calculator"
  },
  triangle: {
    name: "Triangle Calculator",
    description: "Calculate triangle area, perimeter, and type using Heron's formula. Enter three side lengths to find all triangle properties. Perfect for geometry homework and construction.",
    longTailKeywords: [
      "triangle area calculator",
      "triangle perimeter calculator",
      "triangle calculator with steps",
      "heron's formula calculator",
      "triangle type calculator",
      "isosceles triangle calculator",
      "right triangle calculator",
      "triangle solver"
    ],
    slug: "/triangle-calculator"
  },
  standardDeviation: {
    name: "Standard Deviation Calculator",
    description: "Calculate mean, variance, and standard deviation of a dataset. Free online statistics calculator for data analysis. Perfect for students and researchers.",
    longTailKeywords: [
      "standard deviation calculator",
      "variance calculator",
      "mean calculator",
      "statistics calculator online",
      "population standard deviation calculator",
      "sample standard deviation calculator",
      "standard deviation calculator with steps",
      "data analysis calculator"
    ],
    slug: "/standard-deviation-calculator"
  },
  randomNumber: {
    name: "Random Number Generator",
    description: "Generate random numbers within any range. Perfect for lottery numbers, dice rolls, password generation, and random sampling. True random number generation.",
    longTailKeywords: [
      "random number generator",
      "random number picker",
      "lottery number generator",
      "dice roller online",
      "random number generator 1-100",
      "random picker",
      "number randomizer",
      "random integer generator"
    ],
    slug: "/random-number-generator"
  },
  date: {
    name: "Date Calculator",
    description: "Calculate days between two dates or add/subtract days from a date. Perfect for project planning, due dates, and date math. Free online date calculator.",
    longTailKeywords: [
      "date calculator days between",
      "days calculator between dates",
      "add days to date calculator",
      "subtract days from date",
      "date difference calculator",
      "business days calculator",
      "working days calculator",
      "date math calculator"
    ],
    slug: "/date-calculator"
  },
  time: {
    name: "Time Calculator",
    description: "Add or subtract hours, minutes, and seconds. Calculate time duration between two times. Perfect for time tracking and scheduling.",
    longTailKeywords: [
      "time calculator hours minutes",
      "add time calculator",
      "subtract time calculator",
      "time duration calculator",
      "hours calculator",
      "time difference calculator",
      "time addition calculator",
      "hours and minutes calculator"
    ],
    slug: "/time-calculator"
  },
  hours: {
    name: "Hours Calculator",
    description: "Calculate total hours worked, overtime, and time between shifts. Perfect for timesheets, payroll, and work hour tracking.",
    longTailKeywords: [
      "hours calculator for work",
      "timesheet calculator",
      "hours worked calculator",
      "time clock calculator",
      "work hours calculator",
      "overtime calculator",
      "hours between times calculator",
      "payroll hours calculator"
    ],
    slug: "/hours-calculator"
  },
  grade: {
    name: "Grade Calculator",
    description: "Calculate your final grade based on test scores and weights. Supports weighted grades, percentage grades, and letter grades.",
    longTailKeywords: [
      "grade calculator percentage",
      "final grade calculator",
      "weighted grade calculator",
      "test grade calculator",
      "class grade calculator",
      "grade point calculator",
      "letter grade calculator",
      "exam grade calculator"
    ],
    slug: "/grade-calculator"
  },
  concrete: {
    name: "Concrete Calculator",
    description: "Calculate concrete needed for slabs, footings, columns, and more. Convert between cubic yards, cubic feet, and bags of concrete.",
    longTailKeywords: [
      "concrete calculator cubic yards",
      "concrete calculator for slab",
      "how much concrete do i need",
      "concrete yardage calculator",
      "concrete volume calculator",
      "concrete bags calculator",
      "concrete slab calculator",
      "concrete footings calculator"
    ],
    slug: "/concrete-calculator"
  },
  subnet: {
    name: "Subnet Calculator",
    description: "Calculate subnet masks, network addresses, and IP ranges. Perfect for network administrators and IT professionals. CIDR notation support.",
    longTailKeywords: [
      "subnet mask calculator",
      "ip subnet calculator",
      "cidr calculator",
      "network calculator",
      "subnet calculator ipv4",
      "ip range calculator",
      "network subnet calculator",
      "subnet calculator with steps"
    ],
    slug: "/subnet-calculator"
  },
  password: {
    name: "Password Generator",
    description: "Generate strong, secure passwords with customizable length and character types. Create random passwords for maximum security.",
    longTailKeywords: [
      "password generator secure",
      "strong password generator",
      "random password generator",
      "secure password creator",
      "password maker online",
      "password generator with symbols",
      "complex password generator",
      "unique password generator"
    ],
    slug: "/password-generator"
  },
  conversion: {
    name: "Conversion Calculator",
    description: "Convert between units of length, weight, volume, temperature, and more. Free online unit converter for all your conversion needs.",
    longTailKeywords: [
      "unit conversion calculator",
      "metric conversion calculator",
      "length converter",
      "weight converter",
      "temperature converter celsius fahrenheit",
      "volume converter",
      "feet to meters calculator",
      "pounds to kg calculator"
    ],
    slug: "/conversion-calculator"
  }
};

export function getCalculatorMetadata(calculatorKey: string): Metadata {
  const config = calculatorSEO[calculatorKey];
  
  if (!config) {
    return {};
  }
  
  return {
    title: `${config.name} - Free Online Calculator | Pockett Calculator`,
    description: config.description,
    keywords: config.longTailKeywords.join(", "),
    alternates: {
      canonical: config.slug,
    },
    openGraph: {
      title: `${config.name} - Free Online Calculator`,
      description: config.description,
      url: `https://pockettcalculator.com${config.slug}`,
      siteName: 'Pockett Calculator',
      type: 'website',
      images: [
        {
          url: `/og${config.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${config.name} - Pockett Calculator`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${config.name} - Free Online Calculator`,
      description: config.description,
      images: [`/og${config.slug}.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export { calculatorSEO };

