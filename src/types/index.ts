// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currency: 'AED' | 'USD' | 'EUR';
  language: 'en' | 'ar';
  joinedDate: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    twoFactor: boolean;
    aiAssistant: boolean;
  };
  financialProfile: {
    monthlyIncome: number;
    monthlyExpenses: number;
    savingsRate: number;
    debtRatio: number;
    emergencyFund: number;
  };
}

// Account Types
export interface Account {
  id: string;
  name: string;
  bank: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'asset';
  balance: number;
  currency: string;
  accountNumber: string;
  isActive: boolean;
  connectedDate: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  description: string;
  merchant: string;
  category: string;
  subcategory?: string;
  date: string;
  type: 'income' | 'expense' | 'transfer';
  notes?: string;
  tags?: string[];
  aiCategorized?: boolean;
  aiConfidence?: number;
  suggestedCategory?: string;
}

// AI Response Types
export interface AIResponse {
  id: string;
  query: string;
  response: string;
  followUp?: string;
  confidence: number;
  relatedCharts?: string[];
  actions?: string[];
  timestamp: string;
  type: 'spending' | 'budget' | 'goal' | 'general';
}

// Financial Health Score Types
export interface FinancialHealthScore {
  overall: number;
  components: {
    savingsRate: {
      score: number;
      value: number;
      benchmark: number;
      status: 'excellent' | 'good' | 'fair' | 'poor';
    };
    debtRatio: {
      score: number;
      value: number;
      benchmark: number;
      status: 'excellent' | 'good' | 'fair' | 'poor';
    };
    emergencyFund: {
      score: number;
      months: number;
      target: number;
      status: 'excellent' | 'good' | 'fair' | 'poor';
    };
  };
  recommendations: string[];
  trend: 'improving' | 'stable' | 'declining';
  lastUpdated: string;
}

// Smart Recommendations Types
export interface SmartRecommendation {
  id: string;
  type: 'savings' | 'investment' | 'bill' | 'budget' | 'lifestyle';
  title: string;
  description: string;
  potentialSaving: number;
  currency: string;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: number;
  uaeSpecific: boolean;
  timeToImplement: string;
  category: string;
  aiConfidence: number;
}

// Budget Types
export interface Budget {
  id: string;
  userId: string;
  name: string;
  type: 'flex' | 'category';
  period: 'monthly' | 'yearly';
  totalAmount: number;
  currency: string;
  categories: BudgetCategory[];
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgetedAmount: number;
  spentAmount: number;
  currency: string;
  color: string;
  isFlexible: boolean;
}

// Goal Types
export interface Goal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: 'savings' | 'debt' | 'purchase' | 'investment';
  targetAmount: number;
  currentAmount: number;
  currency: string;
  targetDate: string;
  createdDate: string;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  uaeSpecific?: {
    type: 'hajj' | 'property' | 'education' | 'wedding' | 'visa';
  };
}

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  value: number;
  category?: string;
  label?: string;
}

export interface SpendingTrend {
  month: string;
  amount: number;
  category: string;
  change: number; // percentage change from previous month
}

// UAE Specific Types
export interface UAEBank {
  id: string;
  name: string;
  arabicName?: string;
  logo: string;
  supported: boolean;
  features: string[];
}

export interface UAEMerchant {
  id: string;
  name: string;
  arabicName?: string;
  category: string;
  subcategory?: string;
  isLocal: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  arabicName?: string;
  icon: string;
  color: string;
  parentId?: string;
  subcategories?: Category[];
  isUAESpecific: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// Dashboard Widget Types
export interface DashboardWidget {
  id: string;
  type: 'net-worth' | 'accounts' | 'transactions' | 'budget' | 'goals' | 'ai-insights';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  isVisible: boolean;
  data?: any;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
  relatedId?: string;
}