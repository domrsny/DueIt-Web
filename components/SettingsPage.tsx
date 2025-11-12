
import React from 'react';
import NotificationSettings from './NotificationSettings';
import CourseManager from './CourseManager';

interface SettingsPageProps {
    userName: string;
    onUpdateUserName: (name: string) => void;
    courses: string[];
    onRenameCourse: (oldName: string, newName: string) => void;
    onDeleteCourse: (courseName: string) => void;
    notificationPermission: NotificationPermission;
    notificationsEnabled: boolean;
    onRequestPermission: () => void;
    onToggleNotifications: (enabled: boolean) => void;
    onBack: () => void;
    defaultView: string;
    onUpdateDefaultView: (view: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
    userName,
    onUpdateUserName,
    courses,
    onRenameCourse,
    onDeleteCourse,
    notificationPermission,
    notificationsEnabled,
    onRequestPermission,
    onToggleNotifications,
    onBack,
    defaultView,
    onUpdateDefaultView,
}) => {
    return (
        <div>
            <div className="mb-6 flex items-center">
                <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="Go back to main view">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Settings</h2>
            </div>

            <div className="space-y-8">
                {/* Personalization Section */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Personalization</h3>
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => onUpdateUserName(e.target.value)}
                            className="mt-1 block w-full md:w-1/2 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                            placeholder="Enter your name"
                        />
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Preferences</h3>
                    <div>
                        <label htmlFor="defaultView" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Default Landing Page</label>
                        <select
                            id="defaultView"
                            value={defaultView}
                            onChange={(e) => onUpdateDefaultView(e.target.value)}
                            className="mt-1 block w-full md:w-1/2 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                        >
                            <option value="Homework">Homework</option>
                            <option value="Exams">Exams</option>
                            <option value="Agenda">Agenda</option>
                        </select>
                    </div>
                </div>

                {/* Course Management Section */}
                <CourseManager 
                    courses={courses}
                    onRenameCourse={onRenameCourse}
                    onDeleteCourse={onDeleteCourse}
                />
                
                {/* Notification Settings Section */}
                <NotificationSettings
                    permission={notificationPermission}
                    enabled={notificationsEnabled}
                    onRequestPermission={onRequestPermission}
                    onToggle={onToggleNotifications}
                />
            </div>
        </div>
    );
};

export default SettingsPage;
