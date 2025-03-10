"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity ease-linear duration-300`}
      >
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          } transition-opacity ease-linear duration-300`}
          onClick={toggleMobileMenu}
        />
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition ease-in-out duration-300 transform`}
        >
          <Sidebar />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header
          onMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
