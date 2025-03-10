import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  change,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        {change && (
          <p
            className={cn(
              "ml-2 flex items-baseline text-sm font-semibold",
              change.trend === "up"
                ? "text-green-600 dark:text-green-500"
                : change.trend === "down"
                ? "text-red-600 dark:text-red-500"
                : "text-gray-500 dark:text-gray-400"
            )}
          >
            {change.trend === "up" ? (
              <svg
                className="self-center flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : change.trend === "down" ? (
              <svg
                className="self-center flex-shrink-0 h-5 w-5 text-red-500 dark:text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : null}
            <span className="sr-only">
              {change.trend === "up"
                ? "Increased"
                : change.trend === "down"
                ? "Decreased"
                : "No change"}{" "}
              by
            </span>
            {change.value}%
          </p>
        )}
      </div>
    </div>
  );
}
