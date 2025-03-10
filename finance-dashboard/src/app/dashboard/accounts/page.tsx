"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Account } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export default function AccountsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/revolut?endpoint=accounts");

        if (response.data.success && response.data.data) {
          setAccounts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Get icon based on account type
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <BanknotesIcon className="h-8 w-8" />;
      case "credit":
        return <CreditCardIcon className="h-8 w-8" />;
      case "savings":
        return <BuildingLibraryIcon className="h-8 w-8" />;
      case "investment":
        return <ArrowTrendingUpIcon className="h-8 w-8" />;
      default:
        return <BanknotesIcon className="h-8 w-8" />;
    }
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
        Accounts
      </h1>

      {/* Total Balance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Total Balance
        </h2>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {formatCurrency(
            accounts.reduce((sum, account) => sum + account.balance, 0),
            accounts[0]?.currency || "USD"
          )}
        </p>
      </div>

      {/* Accounts List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                  {getAccountIcon(account.type)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {account.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {account.type.charAt(0).toUpperCase() +
                      account.type.slice(1)}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Current Balance
                  </span>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(account.balance, account.currency)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Updated
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(account.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Transactions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
