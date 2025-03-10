// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Account types
export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  currency: string;
  lastUpdated: string;
}

// Transaction types
export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  currency: string;
  description: string;
  category?: string;
  date: string;
  merchant?: {
    name: string;
    logo?: string;
  };
  type: 'income' | 'expense' | 'transfer';
  status: 'completed' | 'pending' | 'failed';
}

// Dashboard types
export interface BalanceSummary {
  totalBalance: number;
  currency: string;
  change: {
    amount: number;
    percentage: number;
    period: 'day' | 'week' | 'month';
  };
}

export interface SpendingSummary {
  totalSpent: number;
  currency: string;
  categories: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  period: 'day' | 'week' | 'month' | 'year';
}

export interface IncomeSummary {
  totalIncome: number;
  currency: string;
  sources: {
    source: string;
    amount: number;
    percentage: number;
  }[];
  period: 'day' | 'week' | 'month' | 'year';
}

// Chart data types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Revolut API specific types
export interface RevolutTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface RevolutAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  state: string;
  public: boolean;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface RevolutTransaction {
  id: string;
  type: string;
  state: string;
  reference: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  amount: {
    value: number;
    currency: string;
  };
  fee: {
    value: number;
    currency: string;
  };
  merchant?: {
    name: string;
    city: string;
    category_code: string;
    country: string;
  };
} 