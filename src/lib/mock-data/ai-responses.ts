import { AIResponse, FinancialHealthScore, SmartRecommendation } from '@/types';

export const mockAIResponses: AIResponse[] = [
  // Spending Analysis
  {
    id: "ai-1",
    query: "How much did I spend on dining this month?",
    response: "You've spent AED 1,245.50 on dining this month, which is 15% higher than last month. Your top spending was at Cheesecake Factory (AED 280) and Shake Shack (AED 195).",
    followUp: "Would you like me to suggest ways to reduce dining expenses?",
    confidence: 0.95,
    relatedCharts: ["dining-trends", "monthly-comparison"],
    actions: ["set-budget", "view-breakdown"],
    timestamp: "2024-01-15T10:30:00Z",
    type: "spending",
  },
  {
    id: "ai-2",
    query: "What's my financial health score?",
    response: "Your financial health score is 75/100 (Good). You have a good savings rate (15%) and low debt ratio (5%), but your emergency fund could be stronger. Consider building it to 6 months of expenses.",
    followUp: "Would you like specific tips to improve your score?",
    confidence: 0.92,
    relatedCharts: ["health-score-breakdown"],
    actions: ["view-breakdown", "get-tips"],
    timestamp: "2024-01-15T14:20:00Z",
    type: "general",
  },
  {
    id: "ai-3",
    query: "Can I afford a AED 5,000 vacation?",
    response: "Based on your current savings rate of AED 800/month and upcoming expenses, you could afford a AED 5,000 vacation in 4 months without affecting your emergency fund goal.",
    followUp: "Would you like me to create a vacation savings goal?",
    confidence: 0.88,
    relatedCharts: ["savings-projection-chart"],
    actions: ["create-goal", "view-savings-plan"],
    timestamp: "2024-01-15T11:15:00Z",
    type: "goal",
  },

  // UAE-Specific Financial Queries
  {
    id: "ai-4",
    query: "When should I pay Zakat?",
    response: "Based on your assets of AED 125,000, your Zakat obligation is AED 3,125 (2.5%). The lunar year ends on Ramadan 15th, so you should pay by March 2025.",
    followUp: "Would you like me to set a reminder and track your Zakat-eligible assets?",
    confidence: 0.94,
    relatedCharts: ["zakat-calculation"],
    actions: ["set-reminder", "track-assets"],
    timestamp: "2024-01-16T09:30:00Z",
    type: "general",
  },
  {
    id: "ai-5",
    query: "How much should I save for Hajj?",
    response: "A typical Hajj costs AED 18,000-25,000. At your current savings rate, you could save AED 20,000 in 15 months. I recommend starting with AED 1,300/month in a dedicated Hajj savings account.",
    followUp: "Should I create a Hajj savings goal and suggest Islamic investment options?",
    confidence: 0.89,
    relatedCharts: ["hajj-savings-timeline"],
    actions: ["create-hajj-goal", "islamic-investments"],
    timestamp: "2024-01-16T11:45:00Z",
    type: "goal",
  },
  {
    id: "ai-6",
    query: "My DEWA bill is unusually high this month",
    response: "Your DEWA bill of AED 420 is 65% higher than your 6-month average of AED 254. This is typical during UAE summer months (June-September) due to AC usage.",
    followUp: "Would you like tips to reduce summer electricity costs?",
    confidence: 0.96,
    relatedCharts: ["dewa-trend-analysis"],
    actions: ["energy-tips", "budget-adjustment"],
    timestamp: "2024-01-16T15:20:00Z",
    type: "spending",
  },
  {
    id: "ai-7",
    query: "Planning for school fee payments in September",
    response: "School fees in UAE typically range AED 15,000-40,000 annually. Based on your expenses, budget AED 2,500/month for the next 8 months to cover September payment smoothly.",
    followUp: "Should I create a school fees savings goal and set monthly reminders?",
    confidence: 0.91,
    relatedCharts: ["education-budget-plan"],
    actions: ["create-education-goal", "set-reminders"],
    timestamp: "2024-01-16T13:10:00Z",
    type: "budget",
  },
  {
    id: "ai-8",
    query: "Best Islamic investment options in UAE",
    response: "Top Sharia-compliant options: ADCB Sukuk (4.2% return), Emirates Islamic Mudaraba (3.8%), and Dubai Islamic Bank equity funds. Your risk profile suggests 60% Sukuk, 40% equity.",
    followUp: "Would you like me to analyze your current portfolio allocation?",
    confidence: 0.85,
    relatedCharts: ["islamic-investment-comparison"],
    actions: ["portfolio-analysis", "investment-calculator"],
    timestamp: "2024-01-16T16:30:00Z",
    type: "goal",
  },
  {
    id: "ai-9",
    query: "Ramadan budget planning advice",
    response: "Families typically spend 30-40% more during Ramadan on food, gifts, and charity. Based on your income, budget an extra AED 1,200 for the month. Focus on Iftar groceries and Zakat al-Fitr.",
    followUp: "Should I create a Ramadan budget category and track charitable giving?",
    confidence: 0.93,
    relatedCharts: ["ramadan-spending-pattern"],
    actions: ["ramadan-budget", "charity-tracker"],
    timestamp: "2024-01-16T17:45:00Z",
    type: "budget",
  },
  {
    id: "ai-10",
    query: "Property down payment strategy for Dubai",
    response: "Dubai properties require 20-25% down payment. For a AED 1.2M property, you need AED 240,000-300,000. At AED 4,000/month savings, you'll reach this in 5-6 years.",
    followUp: "Would you like me to create a property savings goal with Dubai market insights?",
    confidence: 0.87,
    relatedCharts: ["property-savings-timeline"],
    actions: ["create-property-goal", "market-insights"],
    timestamp: "2024-01-16T14:15:00Z",
    type: "goal",
  },

  // Additional Financial Queries
  {
    id: "ai-11",
    query: "Should I switch to Islamic banking?",
    response: "Islamic banks like Emirates Islamic and ADIB offer competitive rates. Your current bank charges AED 45/month in fees vs AED 25 for Islamic alternatives. Annual savings: AED 240.",
    followUp: "Want me to compare specific Islamic banking packages for your needs?",
    confidence: 0.88,
    relatedCharts: ["banking-cost-comparison"],
    actions: ["compare-banks", "switching-guide"],
    timestamp: "2024-01-17T09:20:00Z",
    type: "general",
  },
  {
    id: "ai-12",
    query: "How to optimize my grocery spending?",
    response: "You spend AED 1,450/month on groceries. Shop at Union Coop on weekends for 20% discounts, use Lulu app for offers. Potential savings: AED 290/month.",
    followUp: "Should I create shopping reminders and track discount opportunities?",
    confidence: 0.94,
    relatedCharts: ["grocery-optimization"],
    actions: ["shopping-optimizer", "discount-alerts"],
    timestamp: "2024-01-17T12:30:00Z",
    type: "spending",
  },
  {
    id: "ai-13",
    query: "Metro card vs taxi costs in Dubai",
    response: "Your monthly transport: AED 380 on taxis vs AED 85 with Metro+Bus. Annual savings with public transport: AED 3,540. ADCB Metro card offers 15% cashback.",
    followUp: "Want me to calculate exact route savings and best transport card options?",
    confidence: 0.96,
    relatedCharts: ["transport-cost-analysis"],
    actions: ["route-calculator", "transport-cards"],
    timestamp: "2024-01-17T10:45:00Z",
    type: "spending",
  },
  {
    id: "ai-14",
    query: "Emergency fund target for UAE residents",
    response: "UAE residents should maintain 6-9 months of expenses due to visa dependency. Your monthly expenses are AED 4,200, so target AED 25,000-37,500 emergency fund.",
    followUp: "Should I create an emergency fund goal and suggest the best savings accounts?",
    confidence: 0.95,
    relatedCharts: ["emergency-fund-progress"],
    actions: ["create-emergency-goal", "savings-accounts"],
    timestamp: "2024-01-17T15:10:00Z",
    type: "general",
  },
  {
    id: "ai-15",
    query: "Health insurance costs vs coverage in UAE",
    response: "Your current plan costs AED 4,800/year with AED 500 deductible. Premium plans (AED 8,000/year) offer zero deductible and international coverage - worth it for families.",
    followUp: "Want me to analyze your medical expenses and suggest optimal coverage?",
    confidence: 0.86,
    relatedCharts: ["health-insurance-analysis"],
    actions: ["coverage-analysis", "plan-comparison"],
    timestamp: "2024-01-17T16:25:00Z",
    type: "general",
  },
  {
    id: "ai-16",
    query: "Visa renewal costs and financial planning",
    response: "UAE visa renewal costs AED 2,500-4,000 every 3 years including Emirates ID, medical tests. Budget AED 120/month to avoid financial stress during renewal.",
    followUp: "Should I set up a visa renewal savings goal with timeline reminders?",
    confidence: 0.92,
    relatedCharts: ["visa-renewal-timeline"],
    actions: ["visa-savings-goal", "renewal-reminders"],
    timestamp: "2024-01-17T14:40:00Z",
    type: "budget",
  },
  {
    id: "ai-17",
    query: "End of service benefits calculation",
    response: "Your end-of-service benefit: AED 43,200 (3 years × AED 12,000 salary + gratuity). This should cover 3-4 months transition. Keep separate from investments.",
    followUp: "Want me to help plan your career transition fund strategy?",
    confidence: 0.89,
    relatedCharts: ["eos-benefit-calculation"],
    actions: ["transition-planning", "benefit-calculator"],
    timestamp: "2024-01-17T11:55:00Z",
    type: "general",
  }
];

export const mockFinancialHealthScore: FinancialHealthScore = {
  overall: 78,
  components: {
    savingsRate: {
      score: 92,
      value: 28,
      benchmark: 20,
      status: "excellent",
    },
    debtRatio: {
      score: 85,
      value: 15,
      benchmark: 30,
      status: "good",
    },
    emergencyFund: {
      score: 58,
      months: 2.5,
      target: 6,
      status: "fair",
    },
  },
  recommendations: [
    "Increase your emergency fund to cover 6 months of expenses",
    "Consider investing an additional AED 2,000 monthly",
    "Review your insurance coverage for optimal protection",
  ],
  trend: "improving",
  lastUpdated: "2024-01-12T08:00:00Z",
};

export const mockSmartRecommendations: SmartRecommendation[] = [
  {
    id: "rec-1",
    type: "savings",
    title: "Switch to Emirates Islamic Savings Account",
    description: "Earn 2.5% more on your savings with their current promotional rate for UAE residents.",
    potentialSaving: 3125.00,
    currency: "AED",
    difficulty: "easy",
    priority: 9,
    uaeSpecific: true,
    timeToImplement: "1 hour",
    category: "Banking",
    aiConfidence: 0.91,
  },
  {
    id: "rec-2",
    type: "bill",
    title: "Bundle DEWA with Du Internet",
    description: "Save 15% on utilities by bundling your DEWA bill with Du's home internet service.",
    potentialSaving: 180.00,
    currency: "AED",
    difficulty: "medium",
    priority: 7,
    uaeSpecific: true,
    timeToImplement: "2-3 days",
    category: "Utilities",
    aiConfidence: 0.84,
  },
  {
    id: "rec-3",
    type: "lifestyle",
    title: "Use Careem Credit for Fuel",
    description: "Get 5% cashback on ADNOC fuel purchases when paying with Careem Credit.",
    potentialSaving: 150.00,
    currency: "AED",
    difficulty: "easy",
    priority: 6,
    uaeSpecific: true,
    timeToImplement: "30 minutes",
    category: "Transportation",
    aiConfidence: 0.89,
  },
  {
    id: "rec-4",
    type: "investment",
    title: "ADCB Sukuk Investment",
    description: "Consider Sharia-compliant ADCB Sukuk with 4.2% annual return for low-risk investment.",
    potentialSaving: 2100.00,
    currency: "AED",
    difficulty: "medium",
    priority: 8,
    uaeSpecific: true,
    timeToImplement: "1-2 weeks",
    category: "Investment",
    aiConfidence: 0.76,
  },
  {
    id: "rec-5",
    type: "budget",
    title: "Optimize Grocery Shopping",
    description: "Shop at Union Coop on weekends for 20% discounts on branded items instead of Carrefour.",
    potentialSaving: 200.00,
    currency: "AED",
    difficulty: "easy",
    priority: 5,
    uaeSpecific: true,
    timeToImplement: "Next shopping trip",
    category: "Groceries",
    aiConfidence: 0.93,
  },
];

// Enhanced AI Response Matching System
export const getAIResponse = (query: string): AIResponse | null => {
  const normalizedQuery = query.toLowerCase().trim();

  // Exact match first
  const exactMatch = mockAIResponses.find(response =>
    response.query.toLowerCase() === normalizedQuery
  );
  if (exactMatch) return exactMatch;

  // Keyword-based matching for better user experience
  const keywordMatches = [
    { keywords: ['dining', 'restaurant', 'food', 'eat'], responseId: 'ai-1' },
    { keywords: ['health', 'score', 'financial health'], responseId: 'ai-2' },
    { keywords: ['vacation', 'travel', 'afford', 'trip'], responseId: 'ai-3' },
    { keywords: ['zakat', 'islamic', 'charity'], responseId: 'ai-4' },
    { keywords: ['hajj', 'pilgrimage', 'mecca'], responseId: 'ai-5' },
    { keywords: ['dewa', 'electricity', 'bill', 'high'], responseId: 'ai-6' },
    { keywords: ['school', 'fees', 'education', 'september'], responseId: 'ai-7' },
    { keywords: ['investment', 'islamic', 'sharia', 'sukuk'], responseId: 'ai-8' },
    { keywords: ['ramadan', 'budget', 'iftar'], responseId: 'ai-9' },
    { keywords: ['property', 'dubai', 'down payment', 'house'], responseId: 'ai-10' },
    { keywords: ['banking', 'islamic bank', 'switch'], responseId: 'ai-11' },
    { keywords: ['grocery', 'shopping', 'carrefour', 'lulu'], responseId: 'ai-12' },
    { keywords: ['metro', 'taxi', 'transport', 'dubai'], responseId: 'ai-13' },
    { keywords: ['emergency', 'fund', 'savings'], responseId: 'ai-14' },
    { keywords: ['insurance', 'health', 'medical'], responseId: 'ai-15' },
    { keywords: ['visa', 'renewal', 'emirates id'], responseId: 'ai-16' },
    { keywords: ['end of service', 'gratuity', 'benefit'], responseId: 'ai-17' }
  ];

  // Find best keyword match
  for (const match of keywordMatches) {
    const hasKeyword = match.keywords.some(keyword =>
      normalizedQuery.includes(keyword.toLowerCase())
    );
    if (hasKeyword) {
      const response = mockAIResponses.find(r => r.id === match.responseId);
      if (response) return response;
    }
  }

  // Default fallback response
  return {
    id: 'ai-default',
    query: normalizedQuery,
    response: "I understand you're asking about your finances. I can help with spending analysis, UAE-specific advice like Zakat calculations, Hajj savings, DEWA bills, school fees planning, Islamic investments, and more. Could you be more specific?",
    followUp: "Try asking about dining expenses, financial health score, or specific UAE topics like Zakat or Hajj savings.",
    confidence: 0.70,
    relatedCharts: [],
    actions: ['spending-help', 'uae-advice'],
    timestamp: new Date().toISOString(),
    type: 'general'
  };
};