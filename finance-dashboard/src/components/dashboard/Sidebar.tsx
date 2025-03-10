"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  HomeIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  ChartPieIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Accounts", href: "/dashboard/accounts", icon: BanknotesIcon },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: CreditCardIcon,
  },
  { name: "Analytics", href: "/dashboard/analytics", icon: ChartPieIcon },
  {
    name: "Investments",
    href: "/dashboard/investments",
    icon: ArrowTrendingUpIcon,
  },
  { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Finance Dashboard
          </h1>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? "text-gray-500 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              John Doe
            </p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              View profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
