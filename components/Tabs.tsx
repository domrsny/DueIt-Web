
import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select a tab</label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab}>{tab}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  tab === activeTab
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-300'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                aria-current={tab === activeTab ? 'page' : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
