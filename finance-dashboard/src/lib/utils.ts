import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date | string, formatString: string = 'MMM dd, yyyy'): string {
  return format(new Date(date), formatString);
}

/**
 * Formats a currency amount
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Calculates the percentage change between two numbers
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Groups transactions by category
 */
export function groupTransactionsByCategory(transactions: any[]) {
  return transactions.reduce((acc, transaction) => {
    const category = transaction.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(transaction);
    return acc;
  }, {});
}

/**
 * Summarizes spending by category
 */
export function summarizeSpendingByCategory(transactions: any[]) {
  const grouped = groupTransactionsByCategory(transactions);
  
  return Object.entries(grouped).map(([category, transactions]) => {
    const categoryTransactions = transactions as any[];
    const total = categoryTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return {
      category,
      total,
      count: categoryTransactions.length,
    };
  }).sort((a, b) => b.total - a.total);
} 