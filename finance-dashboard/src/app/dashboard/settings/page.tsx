"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import {
  BellIcon,
  MoonIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface AppearanceSettings {
  darkMode: boolean;
  compactView: boolean;
}

interface PrivacySettings {
  shareData: boolean;
  allowAnalytics: boolean;
}

interface UserSettings {
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  privacy: PrivacySettings;
  language: string;
  currency: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    appearance: {
      darkMode: false,
      compactView: true,
    },
    privacy: {
      shareData: false,
      allowAnalytics: true,
    },
    language: "en",
    currency: "USD",
  });

  const handleToggleNotification = (setting: keyof NotificationSettings) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [setting]: !settings.notifications[setting],
      },
    });
  };

  const handleToggleAppearance = (setting: keyof AppearanceSettings) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [setting]: !settings.appearance[setting],
      },
    });
  };

  const handleTogglePrivacy = (setting: keyof PrivacySettings) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [setting]: !settings.privacy[setting],
      },
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <BellIcon className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Notifications
          </h3>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email updates about your account activity
                </p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onChange={() => handleToggleNotification("email")}
                className={classNames(
                  settings.notifications.email
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.notifications.email
                      ? "translate-x-5"
                      : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Push Notifications
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive push notifications on your mobile device
                </p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onChange={() => handleToggleNotification("push")}
                className={classNames(
                  settings.notifications.push
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.notifications.push
                      ? "translate-x-5"
                      : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  SMS Notifications
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive text messages for important updates
                </p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onChange={() => handleToggleNotification("sms")}
                className={classNames(
                  settings.notifications.sms
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.notifications.sms
                      ? "translate-x-5"
                      : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <MoonIcon className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Appearance
          </h3>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Use dark theme for the dashboard
                </p>
              </div>
              <Switch
                checked={settings.appearance.darkMode}
                onChange={() => handleToggleAppearance("darkMode")}
                className={classNames(
                  settings.appearance.darkMode
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.appearance.darkMode
                      ? "translate-x-5"
                      : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Compact View
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Display more information in less space
                </p>
              </div>
              <Switch
                checked={settings.appearance.compactView}
                onChange={() => handleToggleAppearance("compactView")}
                className={classNames(
                  settings.appearance.compactView
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.appearance.compactView
                      ? "translate-x-5"
                      : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>

      {/* Localization */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Localization
          </h3>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Language
              </label>
              <select
                id="language"
                name="language"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
              >
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="GBP">British Pound (GBP)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="CAD">Canadian Dollar (CAD)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Privacy
          </h3>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Share Data
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow sharing anonymized data to improve services
                </p>
              </div>
              <Switch
                checked={settings.privacy.shareData}
                onChange={() => handleTogglePrivacy("shareData")}
                className={classNames(
                  settings.privacy.shareData
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.privacy.shareData
                      ? "translate-x-5"
                      : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  Allow Analytics
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow usage analytics to improve your experience
                </p>
              </div>
              <Switch
                checked={settings.privacy.allowAnalytics}
                onChange={() => handleTogglePrivacy("allowAnalytics")}
                className={classNames(
                  settings.privacy.allowAnalytics
                    ? "bg-blue-600"
                    : "bg-gray-200 dark:bg-gray-700",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    settings.privacy.allowAnalytics
                      ? "translate-x-5"
                      : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
