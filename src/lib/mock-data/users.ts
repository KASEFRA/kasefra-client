import { User } from '@/types';

export const mockUser: User = {
  id: "user-123",
  name: "Omar Hassan",
  email: "omar.hassan@example.com",
  avatar: "/profile.PNG",
  currency: "AED",
  language: "en",
  joinedDate: "2024-01-15",
  preferences: {
    theme: "light",
    notifications: true,
    twoFactor: true,
    aiAssistant: true,
  },
  financialProfile: {
    monthlyIncome: 25000,
    monthlyExpenses: 18000,
    savingsRate: 28,
    debtRatio: 15,
    emergencyFund: 45000,
  },
};