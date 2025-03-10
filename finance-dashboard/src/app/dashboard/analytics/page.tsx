"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "@/types";
import { formatCurrency, summarizeSpendingByCategory } from "@/lib/utils";
import SpendingChart from "@/components/dashboard/SpendingChart";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">(
    "month"
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/revolut?endpoint=transactions");

        if (response.data.success && response.data.data) {
          setTransactions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter expenses
  const expenses = transactions.filter((tx) => tx.type === "expense");
  const income = transactions.filter((tx) => tx.type === "income");

  // Calculate total spending
  const totalSpending = expenses.reduce(
    (sum, tx) => sum + Math.abs(tx.amount),
    0
  );

  // Calculate total income
  const totalIncome = income.reduce((sum, tx) => sum + tx.amount, 0);

  // Calculate savings rate
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalSpending) / totalIncome) * 100 : 0;

  // Get spending by category
  const spendingByCategory = summarizeSpendingByCategory(expenses);

  // Prepare data for spending over time chart
  const prepareSpendingOverTimeData = () => {
    // Sort transactions by date
    const sortedTransactions = [...expenses].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Group by day/week/month based on timeframe
    const groupedData: Record<string, number> = {};

    sortedTransactions.forEach((tx) => {
      const date = new Date(tx.date);
      let key: string;

      if (timeframe === "week") {
        // Group by day
        key = date.toISOString().split("T")[0];
      } else if (timeframe === "month") {
        // Group by day
        key = date.toISOString().split("T")[0];
      } else {
        // Group by month for year view
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      }

      if (!groupedData[key]) {
        groupedData[key] = 0;
      }

      groupedData[key] += Math.abs(tx.amount);
    });

    // Convert to arrays for chart
    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return {
      labels,
      datasets: [
        {
          label: "Spending",
          data,
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  const spendingOverTimeData = prepareSpendingOverTimeData();

  const spendingOverTimeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Spending Over Time (${timeframe})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
        Analytics
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Total Spending
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(totalSpending, "USD")}
            </dd>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Total Income
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {formatCurrency(totalIncome, "USD")}
            </dd>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              Savings Rate
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {savingsRate.toFixed(1)}%
            </dd>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Spending by Category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Spending by Category
          </h2>
          <div className="h-80">
            <SpendingChart
              data={spendingByCategory.map((cat) => ({
                category: cat.category,
                amount: cat.total,
              }))}
              currency="USD"
            />
          </div>
        </div>

        {/* Spending Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Spending Over Time
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeframe === "week"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeframe === "month"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeframe === "year"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="h-80">
            <Line
              options={spendingOverTimeOptions}
              data={spendingOverTimeData}
            />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Financial Insights
        </h2>
        <div className="space-y-4">
          {spendingByCategory.length > 0 && (
            <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900 rounded-md">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">
                Spending Insight
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                Your highest spending category is{" "}
                <strong>{spendingByCategory[0].category}</strong> at{" "}
                {formatCurrency(spendingByCategory[0].total, "USD")}, which is{" "}
                {((spendingByCategory[0].total / totalSpending) * 100).toFixed(
                  1
                )}
                % of your total expenses.
              </p>
            </div>
          )}

          {savingsRate < 20 && (
            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900 rounded-md">
              <h3 className="font-medium text-red-800 dark:text-red-200">
                Savings Alert
              </h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                Your current savings rate is {savingsRate.toFixed(1)}%, which is
                below the recommended 20%. Consider reducing expenses or finding
                ways to increase your income.
              </p>
            </div>
          )}

          {savingsRate >= 20 && (
            <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900 rounded-md">
              <h3 className="font-medium text-green-800 dark:text-green-200">
                Savings Goal
              </h3>
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                Great job! Your savings rate of {savingsRate.toFixed(1)}% is
                above the recommended 20%. You're on track to build a strong
                financial foundation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
