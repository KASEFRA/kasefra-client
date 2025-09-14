import { User } from '@/types';

export const mockUser: User = {
  id: "user-123",
  name: "Ahmed Al Mansouri",
  email: "ahmed.almansouri@example.com",
  avatar: "/avatars/ahmed.jpg",
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