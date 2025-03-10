"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { Account } from "@/types";
import {
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

interface AccountsListProps {
  accounts: Account[];
  title?: string;
}

export default function AccountsList({
  accounts,
  title = "Your Accounts",
}: AccountsListProps) {
  // Get icon based on account type
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <BanknotesIcon className="h-6 w-6" />;
      case "credit":
        return <CreditCardIcon className="h-6 w-6" />;
      case "savings":
        return <BuildingLibraryIcon className="h-6 w-6" />;
      case "investment":
        return <ArrowTrendingUpIcon className="h-6 w-6" />;
      default:
        return <BanknotesIcon className="h-6 w-6" />;
    }
  };

  // Calculate total balance
  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Total Balance:{" "}
          {formatCurrency(totalBalance, accounts[0]?.currency || "USD")}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 overflow-hidden">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <li
                key={account.id}
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                      {getAccountIcon(account.type)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {account.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {account.type.charAt(0).toUpperCase() +
                          account.type.slice(1)}{" "}
                        • Last updated:{" "}
                        {formatDate(account.lastUpdated, "MMM dd")}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(account.balance, account.currency)}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 sm:px-6 text-center text-gray-500 dark:text-gray-400">
              No accounts found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
