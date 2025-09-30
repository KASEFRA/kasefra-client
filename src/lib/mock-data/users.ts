import { User } from '@/types';

export const mockUser: User = {
  id: "user-123",
  name: "Areeb Hafeel",
  email: "areebhafeel@technx.com",
  avatar: "/profile.PNG",
  currency: "AED",
  language: "en",
  joinedDate: "2023-01-15",
  preferences: {
    theme: "light",
    notifications: true,
    twoFactor: true,
    aiAssistant: true,
  },
  financialProfile: {
    monthlyIncome: 30500,
    monthlyExpenses: 22000,
    savingsRate: 27.9,
    debtRatio: 0.8,
    emergencyFund: 65000,
  },
};