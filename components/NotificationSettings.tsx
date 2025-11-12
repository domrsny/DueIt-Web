
import React from 'react';
import { BellIcon } from './Icons';

interface NotificationSettingsProps {
    permission: NotificationPermission;
    enabled: boolean;
    onRequestPermission: () => void;
    onToggle: (enabled: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ permission, enabled, onRequestPermission, onToggle }) => {
    const renderContent = () => {
        if (permission === 'denied') {
            return <p className="text-sm text-slate-500 dark:text-slate-400">Notifications are blocked. Please enable them in your browser settings to receive reminders.</p>;
        }
        if (permission === 'default') {
            return <button onClick={onRequestPermission} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Enable reminders</button>;
        }
        if (permission === 'granted') {
            return (
                <div className="flex items-center">
                    <label htmlFor="notification-toggle" className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-3" aria-label="Toggle due date reminders">
                        {enabled ? 'Reminders are ON' : 'Reminders are OFF'}
                    </label>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input
                            type="checkbox"
                            name="notification-toggle"
                            id="notification-toggle"
                            checked={enabled}
                            onChange={(e) => onToggle(e.target.checked)}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-4 appearance-none cursor-pointer"
                        />
                        <label htmlFor="notification-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-600 cursor-pointer"></label>
                    </div>
                    <style>{`
                        .toggle-checkbox:checked { right: 0; border-color: #4f46e5; }
                        .toggle-checkbox:checked + .toggle-label { background-color: #4f46e5; }
                    `}</style>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-slate-700 flex items-center justify-center">
                <BellIcon />
            </div>
            <div className="ml-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Due Date Reminders</h3>
                {renderContent()}
            </div>
        </div>
    );
};

export default NotificationSettings;
