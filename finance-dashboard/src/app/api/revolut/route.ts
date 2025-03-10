import { NextResponse } from 'next/server';
import { Account, Transaction, ApiResponse } from '@/types';

// Mock data for demonstration purposes
const mockAccounts: Account[] = [
  {
    id: 'acc_1',
    name: 'Main Account',
    type: 'checking',
    balance: 2547.83,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'acc_2',
    name: 'Savings',
    type: 'savings',
    balance: 15750.42,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'acc_3',
    name: 'Credit Card',
    type: 'credit',
    balance: -450.19,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'acc_4',
    name: 'Investment Portfolio',
    type: 'investment',
    balance: 8320.75,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 'tx_1',
    accountId: 'acc_1',
    amount: -85.43,
    currency: 'USD',
    description: 'Grocery Shopping',
    category: 'Groceries',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    merchant: {
      name: 'Whole Foods',
      logo: '',
    },
    type: 'expense',
    status: 'completed',
  },
  {
    id: 'tx_2',
    accountId: 'acc_1',
    amount: -35.20,
    currency: 'USD',
    description: 'Restaurant',
    category: 'Dining',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    merchant: {
      name: 'Chipotle',
      logo: '',
    },
    type: 'expense',
    status: 'completed',
  },
  {
    id: 'tx_3',
    accountId: 'acc_1',
    amount: 2500.00,
    currency: 'USD',
    description: 'Salary',
    category: 'Income',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
    merchant: {
      name: 'Employer Inc.',
      logo: '',
    },
    type: 'income',
    status: 'completed',
  },
  {
    id: 'tx_4',
    accountId: 'acc_1',
    amount: -120.50,
    currency: 'USD',
    description: 'Electricity Bill',
    category: 'Utilities',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    type: 'expense',
    status: 'completed',
  },
  {
    id: 'tx_5',
    accountId: 'acc_1',
    amount: -9.99,
    currency: 'USD',
    description: 'Streaming Service',
    category: 'Entertainment',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    merchant: {
      name: 'Netflix',
      logo: '',
    },
    type: 'expense',
    status: 'completed',
  },
  {
    id: 'tx_6',
    accountId: 'acc_1',
    amount: -65.30,
    currency: 'USD',
    description: 'Gas Station',
    category: 'Transportation',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    merchant: {
      name: 'Shell',
      logo: '',
    },
    type: 'expense',
    status: 'completed',
  },
  {
    id: 'tx_7',
    accountId: 'acc_3',
    amount: -450.19,
    currency: 'USD',
    description: 'Credit Card Payment',
    category: 'Debt',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(), // 6 days ago
    type: 'expense',
    status: 'pending',
  },
  {
    id: 'tx_8',
    accountId: 'acc_2',
    amount: 500.00,
    currency: 'USD',
    description: 'Savings Deposit',
    category: 'Transfer',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), // 8 days ago
    type: 'transfer',
    status: 'completed',
  },
];

// GET handler for accounts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');

  try {
    // Return accounts
    if (endpoint === 'accounts') {
      const response: ApiResponse<Account[]> = {
        success: true,
        data: mockAccounts,
      };
      return NextResponse.json(response);
    }

    // Return transactions
    if (endpoint === 'transactions') {
      const accountId = searchParams.get('accountId');
      let filteredTransactions = mockTransactions;

      if (accountId) {
        filteredTransactions = mockTransactions.filter(tx => tx.accountId === accountId);
      }

      const response: ApiResponse<Transaction[]> = {
        success: true,
        data: filteredTransactions,
      };
      return NextResponse.json(response);
    }

    // Return both accounts and transactions
    if (endpoint === 'dashboard') {
      const response: ApiResponse<{ accounts: Account[], transactions: Transaction[] }> = {
        success: true,
        data: {
          accounts: mockAccounts,
          transactions: mockTransactions,
        },
      };
      return NextResponse.json(response);
    }

    // Default response if no valid endpoint is specified
    return NextResponse.json({
      success: false,
      error: 'Invalid endpoint specified',
    }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
} 