"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export default function Header({
  onMenuToggle,
  isMobileMenuOpen,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              type="button"
              className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
              onClick={onMenuToggle}
            >
              <span className="sr-only">Open sidebar</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className={cn(
                      "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600",
                      "rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100",
                      "placeholder-gray-500 dark:placeholder-gray-400",
                      "focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500",
                      "focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    )}
                    placeholder="Search transactions, accounts..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="flex-shrink-0 p-1 rounded-full text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="max-w-xs bg-white dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                    JD
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
