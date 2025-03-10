import { formatDate, formatCurrency } from "@/lib/utils";
import { Transaction } from "@/types";

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
  limit?: number;
}

export default function TransactionList({
  transactions,
  title = "Recent Transactions",
  limit = 5,
}: TransactionListProps) {
  const displayTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="bg-white dark:bg-gray-800 overflow-hidden">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {displayTransactions.length > 0 ? (
            displayTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        transaction.type === "income"
                          ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                          : transaction.type === "expense"
                          ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                          : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                      }`}
                    >
                      {transaction.merchant?.name?.charAt(0) ||
                        transaction.description.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.merchant?.name || transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.category || "Uncategorized"} •{" "}
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === "income"
                          ? "text-green-600 dark:text-green-400"
                          : transaction.type === "expense"
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {transaction.type === "income"
                        ? "+"
                        : transaction.type === "expense"
                        ? "-"
                        : ""}
                      {formatCurrency(
                        Math.abs(transaction.amount),
                        transaction.currency
                      )}
                    </p>
                    <p
                      className={`ml-2 text-xs px-2 inline-flex leading-5 font-semibold rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {transaction.status}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-5 sm:px-6 text-center text-gray-500 dark:text-gray-400">
              No transactions found
            </li>
          )}
        </ul>
        {transactions.length > limit && (
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6">
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                View all transactions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
