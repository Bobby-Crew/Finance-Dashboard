"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { formatCurrency } from "@/lib/utils";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

interface SpendingChartProps {
  data: {
    category: string;
    amount: number;
  }[];
  currency?: string;
  title?: string;
}

export default function SpendingChart({
  data,
  currency = "USD",
  title = "Spending by Category",
}: SpendingChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Generate colors for the chart
  const generateColors = (count: number) => {
    const colors = [
      "#3B82F6", // blue-500
      "#10B981", // emerald-500
      "#F59E0B", // amber-500
      "#EF4444", // red-500
      "#8B5CF6", // violet-500
      "#EC4899", // pink-500
      "#6366F1", // indigo-500
      "#14B8A6", // teal-500
      "#F97316", // orange-500
      "#84CC16", // lime-500
    ];

    return Array(count)
      .fill(0)
      .map((_, i) => colors[i % colors.length]);
  };

  // Prepare data for the chart
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: generateColors(data.length),
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
          color: "#6B7280", // text-gray-500
        },
        onClick: (_: any, legendItem: any) => {
          const index = legendItem.index;
          const category = data[index].category;
          setSelectedCategory(selectedCategory === category ? null : category);
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${formatCurrency(
              value,
              currency
            )} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Calculate total spending
  const totalSpending = data.reduce((sum, item) => sum + item.amount, 0);

  // Filter data based on selected category
  const filteredData = selectedCategory
    ? data.filter((item) => item.category === selectedCategory)
    : data;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Spending
          </span>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatCurrency(totalSpending, currency)}
          </span>
        </div>
        {selectedCategory && (
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {selectedCategory}
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(
                filteredData.reduce((sum, item) => sum + item.amount, 0),
                currency
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
