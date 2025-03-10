"use client";

import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Investments
      </h1>

      {/* Coming Soon Message */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900">
          <ArrowTrendingUpIcon
            className="h-8 w-8 text-blue-600 dark:text-blue-300"
            aria-hidden="true"
          />
        </div>
        <h2 className="mt-6 text-xl font-medium text-gray-900 dark:text-white">
          Investment Tracking Coming Soon
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We're working on integrating investment tracking features to help you
          monitor your portfolio performance. Check back soon for updates!
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Notified When Available
          </button>
        </div>
      </div>

      {/* Feature Preview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Portfolio Tracking
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Track all your investments in one place, including stocks, bonds,
            ETFs, and cryptocurrencies.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Performance Analysis
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Analyze your investment performance with detailed charts and metrics
            to make informed decisions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Automated Rebalancing
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Get suggestions for rebalancing your portfolio to maintain your
            target asset allocation.
          </p>
        </div>
      </div>
    </div>
  );
}
