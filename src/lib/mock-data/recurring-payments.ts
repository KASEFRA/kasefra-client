// Recurring Payments Data - Reusable for dashboard and dedicated recurring payments page

export interface RecurringPayment {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  nextDueDate: string;
  lastPaidDate: string;
  isAutomatic: boolean;
  category: string;
  merchant: string;
  accountId: string;
  isUAESpecific?: boolean;
  daysUntilDue: number;
  status: 'upcoming' | 'due' | 'overdue';
}

export const mockRecurringPayments: RecurringPayment[] = [
  {
    id: "rec-1",
    name: "Joint Credit Card",
    description: "Monthly credit card payment",
    amount: 510.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-01-25",
    lastPaidDate: "2023-12-25",
    isAutomatic: false,
    category: "Credit Card",
    merchant: "American Express",
    accountId: "acc-4",
    daysUntilDue: 1,
    status: "upcoming"
  },
  {
    id: "rec-2",
    name: "Mortgage",
    description: "Monthly mortgage payment",
    amount: 1200.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-01-26",
    lastPaidDate: "2023-12-26",
    isAutomatic: true,
    category: "Housing",
    merchant: "Wells Fargo",
    accountId: "acc-1",
    daysUntilDue: 1,
    status: "due"
  },
  {
    id: "rec-3",
    name: "DEWA Bill",
    description: "Dubai Electricity & Water Authority",
    amount: 420.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-02-05",
    lastPaidDate: "2024-01-05",
    isAutomatic: true,
    category: "Utilities",
    merchant: "DEWA",
    accountId: "acc-1",
    isUAESpecific: true,
    daysUntilDue: 11,
    status: "upcoming"
  },
  {
    id: "rec-4",
    name: "Du Internet",
    description: "Home internet and TV package",
    amount: 299.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-02-15",
    lastPaidDate: "2024-01-15",
    isAutomatic: true,
    category: "Utilities",
    merchant: "Du",
    accountId: "acc-1",
    isUAESpecific: true,
    daysUntilDue: 21,
    status: "upcoming"
  },
  {
    id: "rec-5",
    name: "Emirates Islamic Car Loan",
    description: "Monthly car loan payment",
    amount: 1850.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-02-10",
    lastPaidDate: "2024-01-10",
    isAutomatic: true,
    category: "Transportation",
    merchant: "Emirates Islamic Bank",
    accountId: "acc-2",
    isUAESpecific: true,
    daysUntilDue: 16,
    status: "upcoming"
  },
  {
    id: "rec-6",
    name: "Salik (Toll)",
    description: "Dubai road toll auto-recharge",
    amount: 100.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-02-01",
    lastPaidDate: "2024-01-01",
    isAutomatic: true,
    category: "Transportation",
    merchant: "Salik",
    accountId: "acc-1",
    isUAESpecific: true,
    daysUntilDue: 7,
    status: "upcoming"
  },
  {
    id: "rec-7",
    name: "Netflix",
    description: "Monthly streaming subscription",
    amount: 56.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-02-12",
    lastPaidDate: "2024-01-12",
    isAutomatic: true,
    category: "Entertainment",
    merchant: "Netflix",
    accountId: "acc-3",
    daysUntilDue: 18,
    status: "upcoming"
  },
  {
    id: "rec-8",
    name: "Health Insurance",
    description: "Monthly health insurance premium",
    amount: 450.00,
    currency: "AED",
    frequency: "monthly",
    nextDueDate: "2024-02-20",
    lastPaidDate: "2024-01-20",
    isAutomatic: true,
    category: "Insurance",
    merchant: "Daman Health",
    accountId: "acc-1",
    isUAESpecific: true,
    daysUntilDue: 26,
    status: "upcoming"
  }
];

// Summary data for dashboard
export const recurringPaymentsSummary = {
  totalMonthly: mockRecurringPayments
    .filter(payment => payment.frequency === 'monthly')
    .reduce((sum, payment) => sum + payment.amount, 0),
  remainingThisMonth: 510.00, // Amount due this month
  nextPayment: mockRecurringPayments
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue)[0],
  upcomingCount: mockRecurringPayments
    .filter(payment => payment.daysUntilDue <= 7).length
};