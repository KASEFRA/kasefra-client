interface User {
  id: string
  name: string
  email: string
  avatar: string
  currency: string
  language: string
  joinedDate: string
  preferences: {
    theme: string
    notifications: boolean
    twoFactor: boolean
    aiAssistant: boolean
  }
  financialProfile: {
    monthlyIncome: number
    monthlyExpenses: number
    savingsRate: number
    debtRatio: number
    emergencyFund: number
  }
}

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
    monthlyExpenses: 22800,
    savingsRate: 25.2,
    debtRatio: 13.8,
    emergencyFund: 238000, // Aligned with CASH_ASSETS
  },
};