
import React from 'react';
import { LogoIcon, SettingsIcon } from './Icons';

interface HeaderProps {
    userName: string;
    onShowSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onShowSettings }) => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md">
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <LogoIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white">
                DueIt
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                {userName ? `Welcome back, ${userName}!` : 'Stay ahead of your deadlines.'}
              </p>
            </div>
        </div>
        <button 
            onClick={onShowSettings} 
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Open settings"
        >
            <SettingsIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
