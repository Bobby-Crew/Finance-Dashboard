"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Account, Transaction, BalanceSummary, SpendingSummary } from "@/types";
import {
  formatCurrency,
  calculatePercentageChange,
  summarizeSpendingByCategory,
} from "@/lib/utils";
import StatCard from "@/components/dashboard/StatCard";
import TransactionList from "@/components/dashboard/TransactionList";
import AccountsList from "@/components/dashboard/AccountsList";
import SpendingChart from "@/components/dashboard/SpendingChart";
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balanceSummary, setBalanceSummary] = useState<BalanceSummary | null>(
    null
  );
  const [spendingSummary, setSpendingSummary] =
    useState<SpendingSummary | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/revolut?endpoint=dashboard");

        if (response.data.success && response.data.data) {
          const { accounts, transactions } = response.data.data;

          setAccounts(accounts);
          setTransactions(transactions);

          // Calculate balance summary
          const totalBalance = accounts.reduce(
            (sum: number, account: Account) => sum + account.balance,
            0
          );
          const previousBalance = totalBalance - 500; // Mock previous balance for demo
          const change = calculatePercentageChange(
            totalBalance,
            previousBalance
          );

          setBalanceSummary({
            totalBalance,
            currency: accounts[0]?.currency || "USD",
            change: {
              amount: totalBalance - previousBalance,
              percentage: change,
              period: "month",
            },
          });

          // Calculate spending summary
          const expenses = transactions.filter(
            (tx: Transaction) => tx.type === "expense"
          );
          const totalSpent = expenses.reduce(
            (sum: number, tx: Transaction) => sum + Math.abs(tx.amount),
            0
          );
          const spendingByCategory = summarizeSpendingByCategory(expenses);

          setSpendingSummary({
            totalSpent,
            currency: accounts[0]?.currency || "USD",
            categories: spendingByCategory.map((item) => ({
              category: item.category,
              amount: item.total,
              percentage: (item.total / totalSpent) * 100,
            })),
            period: "month",
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={formatCurrency(
            balanceSummary?.totalBalance || 0,
            balanceSummary?.currency
          )}
          icon={<BanknotesIcon className="h-6 w-6" />}
          change={
            balanceSummary
              ? {
                  value: Math.abs(
                    parseFloat(balanceSummary.change.percentage.toFixed(1))
                  ),
                  trend: balanceSummary.change.percentage >= 0 ? "up" : "down",
                }
              : undefined
          }
        />

        <StatCard
          title="Monthly Income"
          value={formatCurrency(
            transactions
              .filter((tx) => tx.type === "income")
              .reduce((sum, tx) => sum + tx.amount, 0),
            balanceSummary?.currency
          )}
          icon={<ArrowTrendingUpIcon className="h-6 w-6" />}
          change={{
            value: 2.5,
            trend: "up",
          }}
        />

        <StatCard
          title="Monthly Expenses"
          value={formatCurrency(
            transactions
              .filter((tx) => tx.type === "expense")
              .reduce((sum, tx) => sum + Math.abs(tx.amount), 0),
            balanceSummary?.currency
          )}
          icon={<ArrowTrendingDownIcon className="h-6 w-6" />}
          change={{
            value: 1.8,
            trend: "down",
          }}
        />

        <StatCard
          title="Pending Transactions"
          value={transactions.filter((tx) => tx.status === "pending").length}
          icon={<CreditCardIcon className="h-6 w-6" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Accounts List */}
        <div className="lg:col-span-1">
          <AccountsList accounts={accounts} />
        </div>

        {/* Spending Chart */}
        <div className="lg:col-span-2">
          {spendingSummary && (
            <SpendingChart
              data={spendingSummary.categories.map((cat) => ({
                category: cat.category,
                amount: cat.amount,
              }))}
              currency={spendingSummary.currency}
            />
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <TransactionList transactions={transactions} limit={5} />
      </div>
    </div>
  );
}
