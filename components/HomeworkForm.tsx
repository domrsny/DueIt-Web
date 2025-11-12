import React, { useState } from 'react';
import { Homework, HomeworkStatus, HomeworkImportance } from '../types';
import { PlusIcon } from './Icons';

interface HomeworkFormProps {
  onAddHomework: (homework: Omit<Homework, 'id'>) => void;
  courseNames: string[];
}

const HomeworkForm: React.FC<HomeworkFormProps> = ({ onAddHomework, courseNames }) => {
  const [courseName, setCourseName] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [importance, setImportance] = useState<HomeworkImportance>(HomeworkImportance.Medium);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !assignmentTitle.trim() || !dueDate) {
      alert('Please fill in all required fields.');
      return;
    }
    onAddHomework({
      courseName,
      assignmentTitle,
      dueDate,
      notes,
      status: HomeworkStatus.NotStarted,
      importance,
    });
    setCourseName('');
    setAssignmentTitle('');
    setDueDate('');
    setNotes('');
    setImportance(HomeworkImportance.Medium);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Add New Homework</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label htmlFor="courseName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course Name</label>
                <input
                    type="text"
                    id="courseName"
                    list="course-names-list"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    placeholder="e.g., COMP SCI 101"
                    required
                />
                <datalist id="course-names-list">
                    {courseNames.map(name => <option key={name} value={name} />)}
                </datalist>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="assignmentTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Assignment Title</label>
                <input
                    type="text"
                    id="assignmentTitle"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    placeholder="e.g., Problem Set 3"
                    required
                />
            </div>
            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
            </div>
            <div>
                 <label htmlFor="importance" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Importance</label>
                <select
                    id="importance"
                    value={importance}
                    onChange={(e) => setImportance(e.target.value as HomeworkImportance)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                >
                    {Object.values(HomeworkImportance).map((level) => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes (Optional)</label>
                <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    placeholder="e.g., Chapter 5, focus on diagrams."
                />
            </div>
            <div className="md:col-span-2">
                <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <PlusIcon /> <span className="ml-2">Add Homework</span>
                </button>
            </div>
        </form>
    </div>
  );
};

export default HomeworkForm;