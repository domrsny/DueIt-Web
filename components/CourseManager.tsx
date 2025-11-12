
import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from './Icons';

interface CourseManagerProps {
    courses: string[];
    onRenameCourse: (oldName: string, newName: string) => void;
    onDeleteCourse: (courseName: string) => void;
}

const CourseManager: React.FC<CourseManagerProps> = ({ courses, onRenameCourse, onDeleteCourse }) => {
    const [renamingCourse, setRenamingCourse] = useState<string | null>(null);
    const [deletingCourse, setDeletingCourse] = useState<string | null>(null);
    const [newCourseName, setNewCourseName] = useState('');

    const handleStartRename = (courseName: string) => {
        setRenamingCourse(courseName);
        setNewCourseName(courseName);
    };

    const handleConfirmRename = (e: React.FormEvent) => {
        e.preventDefault();
        if (renamingCourse && newCourseName.trim() && newCourseName.trim() !== renamingCourse) {
            onRenameCourse(renamingCourse, newCourseName.trim());
        }
        setRenamingCourse(null);
        setNewCourseName('');
    };

    const handleConfirmDelete = () => {
        if (deletingCourse) {
            onDeleteCourse(deletingCourse);
        }
        setDeletingCourse(null);
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Manage Courses</h3>
            {courses.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No courses found. Add homework or an exam to create a course.</p>
            ) : (
                <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                    {courses.map(course => (
                        <li key={course} className="py-3 flex justify-between items-center">
                            <span className="text-slate-700 dark:text-slate-300">{course}</span>
                            <div className="flex items-center space-x-3">
                                <button onClick={() => handleStartRename(course)} className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" aria-label={`Rename ${course}`}>
                                    <PencilIcon />
                                </button>
                                <button onClick={() => setDeletingCourse(course)} className="text-slate-400 hover:text-red-600 dark:hover:text-red-400" aria-label={`Delete ${course}`}>
                                    <TrashIcon />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Rename Modal */}
            {renamingCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={() => setRenamingCourse(null)}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Rename Course</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Renaming "{renamingCourse}" will update it across all related homework and exams.</p>
                        <form onSubmit={handleConfirmRename}>
                            <label htmlFor="newCourseName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">New Course Name</label>
                            <input
                                type="text"
                                id="newCourseName"
                                value={newCourseName}
                                onChange={(e) => setNewCourseName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                                required
                                autoFocus
                            />
                            <div className="mt-6 flex justify-end space-x-3">
                                <button type="button" onClick={() => setRenamingCourse(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Rename</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={() => setDeletingCourse(null)}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Confirm Deletion</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Are you sure you want to delete the course "{deletingCourse}"? This will also remove all associated homework and exams. This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button onClick={() => setDeletingCourse(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManager;
