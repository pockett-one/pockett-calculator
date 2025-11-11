// Comprehensive FAQ data optimized for SEO and AEO (Answer Engine Optimization)
// Questions are phrased as natural language queries that users would ask

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// General Calculator FAQs - Optimized for "how to use calculator" queries
export const generalCalculatorFAQs: FAQItem[] = [
  {
    question: "What is an online calculator and how does it work?",
    answer: "An online calculator is a web-based tool that performs mathematical calculations directly in your browser without requiring any downloads or installations. It works by using JavaScript to process your inputs instantly and display results in real-time. Online calculators can handle everything from basic arithmetic to complex scientific calculations, all while keeping your data private on your device.",
    category: "general"
  },
  {
    question: "How do I use a free online calculator?",
    answer: "Using a free online calculator is simple: visit the calculator page, click the number buttons or type on your keyboard, select the operation you need (like +, -, ×, ÷), and click equals (=) to see your result. Most online calculators also support keyboard shortcuts - just type numbers and operators directly. No registration or download required.",
    category: "general"
  },
  {
    question: "Are online calculators accurate for important calculations?",
    answer: "Yes, online calculators are highly accurate. Pockett Calculator uses JavaScript's double-precision floating-point arithmetic, which provides accuracy to about 15-17 significant digits. This level of precision is more than sufficient for scientific, engineering, financial, and everyday calculations. For critical applications requiring exact decimal arithmetic (like financial calculations), specialized calculators are available.",
    category: "general"
  },
  {
    question: "Do I need to download or install anything to use an online calculator?",
    answer: "No downloads or installations are required. All calculators on Pockett Calculator are completely web-based and run directly in your browser. Simply visit any calculator page and start using it immediately. This works on all devices - computers, tablets, and smartphones - without any setup.",
    category: "general"
  },
  {
    question: "Can I use an online calculator on my phone or mobile device?",
    answer: "Yes! All Pockett calculators are fully responsive and optimized for mobile devices. The interface automatically adapts to your screen size, with touch-friendly buttons and intuitive gestures. You can use any calculator on smartphones, tablets, laptops, or desktop computers with the same functionality and accuracy.",
    category: "general"
  }
];

// Scientific Calculator FAQs - Optimized for "scientific calculator" queries
export const scientificCalculatorFAQs: FAQItem[] = [
  {
    question: "What is a scientific calculator used for?",
    answer: "A scientific calculator is used for advanced mathematical operations beyond basic arithmetic. It handles trigonometric functions (sin, cos, tan), logarithms, exponentials, square roots, powers, factorials, and more. Students, engineers, scientists, and professionals use scientific calculators for algebra, calculus, physics, chemistry, statistics, and engineering calculations.",
    category: "scientific"
  },
  {
    question: "How do I calculate sin, cos, and tan on a scientific calculator?",
    answer: "To calculate trigonometric functions: first enter your angle value, then click the sin, cos, or tan button. Make sure your calculator is in the correct mode - degrees for angles measured in degrees (like 90°, 180°) or radians for angles in radians (like π, π/2). Most scientific calculators have a DEG/RAD toggle button to switch between modes.",
    category: "scientific"
  },
  {
    question: "What's the difference between a basic calculator and a scientific calculator?",
    answer: "A basic calculator performs simple arithmetic operations: addition, subtraction, multiplication, and division. A scientific calculator includes all basic functions plus advanced operations like trigonometry (sin, cos, tan), logarithms (log, ln), exponentials (e^x), powers (x²), roots (√), factorials (n!), and more. Scientific calculators are essential for higher mathematics, science, and engineering work.",
    category: "scientific"
  },
  {
    question: "How do I calculate logarithms on a scientific calculator online?",
    answer: "To calculate logarithms: enter your number first, then click the 'log' button for base-10 logarithm or 'ln' button for natural logarithm (base-e). For example, to find log(100), enter 100 then click log to get 2. To calculate log with a different base, use the formula: log_b(x) = ln(x) / ln(b).",
    category: "scientific"
  }
];

// Percentage Calculator FAQs - Optimized for "how to calculate percentage" queries
export const percentageCalculatorFAQs: FAQItem[] = [
  {
    question: "How do I calculate what percentage one number is of another?",
    answer: "To find what percentage one number is of another, divide the first number by the second number, then multiply by 100. For example: What percent is 25 of 200? Calculate (25 ÷ 200) × 100 = 12.5%. Use our Percentage Calculator for instant results without manual calculations.",
    category: "percentage"
  },
  {
    question: "How do I calculate percentage increase or decrease?",
    answer: "To calculate percentage increase: subtract the original value from the new value, divide by the original value, then multiply by 100. Formula: ((New - Old) ÷ Old) × 100. For example, an increase from 50 to 75 is ((75-50) ÷ 50) × 100 = 50% increase. For decrease, the result will be negative.",
    category: "percentage"
  },
  {
    question: "How do I add or subtract a percentage from a number?",
    answer: "To add a percentage: multiply the number by (1 + percentage/100). For example, add 20% to 100: 100 × (1 + 20/100) = 100 × 1.20 = 120. To subtract a percentage: multiply by (1 - percentage/100). Subtract 20% from 100: 100 × (1 - 20/100) = 100 × 0.80 = 80.",
    category: "percentage"
  },
  {
    question: "What is the easiest way to calculate percentages quickly?",
    answer: "The easiest way is to use an online percentage calculator for instant, accurate results. However, for quick mental math: to find 10%, divide by 10; to find 20%, divide by 5; to find 25%, divide by 4; to find 50%, divide by 2. For other percentages, find 10% first, then adjust accordingly.",
    category: "percentage"
  }
];

// Age Calculator FAQs - Optimized for "age calculator" queries
export const ageCalculatorFAQs: FAQItem[] = [
  {
    question: "How do I calculate my exact age in years, months, and days?",
    answer: "To calculate your exact age, use an age calculator by entering your birth date and the current date (or any specific date). The calculator will automatically compute your age in years, months, and days, accounting for leap years and varying month lengths. This provides a precise age calculation down to the day.",
    category: "age"
  },
  {
    question: "How many days old am I?",
    answer: "To find out how many days old you are, use an age calculator that shows the total number of days since your birth. Simply enter your date of birth, and the calculator will compute the exact number of days you've been alive, including adjustments for leap years.",
    category: "age"
  },
  {
    question: "When will I be a certain age?",
    answer: "To find out when you'll reach a specific age, use an age calculator with a target age feature. Enter your birth date and the target age you want to reach. The calculator will determine the exact date when you'll be that age, including the day of the week.",
    category: "age"
  }
];

// Date Calculator FAQs - Optimized for "date calculator" queries
export const dateCalculatorFAQs: FAQItem[] = [
  {
    question: "How do I calculate the number of days between two dates?",
    answer: "To calculate days between dates, use a date calculator: enter your start date and end date, and it will automatically compute the exact number of days, weeks, months, and years between them. This accounts for leap years, varying month lengths, and provides accurate results for any date range.",
    category: "date"
  },
  {
    question: "How do I add or subtract days from a date?",
    answer: "To add or subtract days from a date, use a date calculator: enter your starting date and specify how many days, weeks, months, or years you want to add or subtract. The calculator will automatically determine the resulting date, properly handling month boundaries, leap years, and weekends.",
    category: "date"
  },
  {
    question: "How many business days are between two dates?",
    answer: "To calculate business days (weekdays) between two dates, use a date calculator with a business days feature. Enter your start and end dates, and select the business days option. The calculator will exclude weekends (Saturday and Sunday) and provide the count of working days.",
    category: "date"
  }
];

// GPA Calculator FAQs - Optimized for "GPA calculator" queries
export const gpaCalculatorFAQs: FAQItem[] = [
  {
    question: "How do I calculate my GPA (Grade Point Average)?",
    answer: "To calculate your GPA: multiply each course's grade point (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0) by its credit hours, add all results together, then divide by total credit hours. For example: if you got an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course, your GPA is (4.0×3 + 3.0×4) ÷ (3+4) = 24 ÷ 7 = 3.43.",
    category: "gpa"
  },
  {
    question: "What GPA do I need to raise my overall GPA?",
    answer: "To determine what GPA you need to reach a target overall GPA, use a GPA calculator with a target GPA feature. Enter your current GPA, completed credit hours, and target GPA. The calculator will show what GPA you need to earn in your remaining credits to reach your goal.",
    category: "gpa"
  },
  {
    question: "How is weighted GPA different from unweighted GPA?",
    answer: "Unweighted GPA uses a 4.0 scale where A=4.0, B=3.0, regardless of course difficulty. Weighted GPA gives extra points for advanced courses (AP, IB, Honors), often using a 5.0 or higher scale where an A in an AP course might be 5.0. Weighted GPAs reward students for taking challenging courses.",
    category: "gpa"
  }
];

// Privacy & Security FAQs - Optimized for "calculator privacy" queries
export const privacySecurityFAQs: FAQItem[] = [
  {
    question: "Is my calculation data secure and private when using online calculators?",
    answer: "Yes, your data is completely secure and private. All calculations on Pockett Calculator are performed entirely in your web browser using client-side JavaScript. We don't collect, store, transmit, or save any of your calculation inputs or results to any servers. Your data never leaves your device and remains completely private.",
    category: "privacy"
  },
  {
    question: "Do online calculators store my calculation history?",
    answer: "Pockett Calculator does not store your calculation history. Each calculation is performed independently in your browser without any data being saved or transmitted. This ensures complete privacy and keeps the interface fast and simple. Your calculations are temporary and disappear when you close or refresh the page.",
    category: "privacy"
  },
  {
    question: "Are free online calculators safe to use?",
    answer: "Yes, reputable free online calculators like Pockett Calculator are completely safe to use. Our calculators run entirely in your browser, don't require downloads, don't collect personal data, and don't store your calculations. We use standard web technologies with no malicious code. Always verify you're on the correct website (check the URL) when using any online tool.",
    category: "privacy"
  }
];

// Features & Accessibility FAQs - Optimized for "calculator features" queries
export const featuresAccessibilityFAQs: FAQItem[] = [
  {
    question: "Can I use keyboard shortcuts with online calculators?",
    answer: "Yes! Most online calculators support keyboard shortcuts for faster input. Use number keys (0-9) to enter digits, +, -, *, / for operations, Enter or = for equals, C or Escape for clear, and . for decimal point. Keyboard support makes calculations faster and more convenient than clicking buttons.",
    category: "features"
  },
  {
    question: "Do online calculators work offline without internet?",
    answer: "Most online calculators require an initial internet connection to load the page. However, once loaded, the calculations themselves don't require internet as they're performed in your browser. Some calculators with progressive web app features can work offline after the first visit, but this varies by implementation.",
    category: "features"
  },
  {
    question: "Are online calculators free to use or do they require a subscription?",
    answer: "Pockett Calculator is completely free to use with no subscriptions, hidden costs, or premium features. All calculators - from basic to advanced scientific calculators - are 100% free forever. The service is supported through non-intrusive advertising while keeping all functionality accessible to everyone at no cost.",
    category: "features"
  },
  {
    question: "What types of calculators are available online for free?",
    answer: "Pockett Calculator offers a comprehensive suite of free calculators including: Scientific Calculator (trigonometry, logarithms), Percentage Calculator, Fraction Calculator, Age Calculator, Date Calculator, Time Calculator, GPA Calculator, Grade Calculator, Triangle Calculator, Standard Deviation Calculator, Subnet Calculator, Password Generator, Conversion Calculator, and many more specialized tools for math, science, finance, and everyday use.",
    category: "features"
  }
];

// All FAQs combined for the main FAQ page
export const allFAQs: FAQItem[] = [
  ...generalCalculatorFAQs,
  ...scientificCalculatorFAQs,
  ...percentageCalculatorFAQs,
  ...ageCalculatorFAQs,
  ...dateCalculatorFAQs,
  ...gpaCalculatorFAQs,
  ...privacySecurityFAQs,
  ...featuresAccessibilityFAQs
];

// Category labels for organization
export const faqCategories = {
  general: "General Calculator Questions",
  scientific: "Scientific Calculator",
  percentage: "Percentage Calculations",
  age: "Age Calculator",
  date: "Date Calculator",
  gpa: "GPA Calculator",
  privacy: "Privacy & Security",
  features: "Features & Accessibility"
};

