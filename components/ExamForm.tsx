
import React, { useState } from 'react';
import { Exam, ExamStatus, ExamImportance } from '../types';
import { PlusIcon } from './Icons';

interface ExamFormProps {
  onAddExam: (exam: Omit<Exam, 'id'>) => void;
  courseNames: string[];
}

const ExamForm: React.FC<ExamFormProps> = ({ onAddExam, courseNames }) => {
  const [courseName, setCourseName] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [examDate, setExamDate] = useState('');
  const [location, setLocation] = useState('');
  const [topics, setTopics] = useState('');
  const [importance, setImportance] = useState<ExamImportance>(ExamImportance.Medium);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !examTitle.trim() || !examDate) {
      alert('Please fill in all required fields.');
      return;
    }
    onAddExam({
      courseName,
      examTitle,
      examDate,
      location,
      topics,
      status: ExamStatus.Upcoming,
      importance,
    });
    setCourseName('');
    setExamTitle('');
    setExamDate('');
    setLocation('');
    setTopics('');
    setImportance(ExamImportance.Medium);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Add New Exam</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label htmlFor="exam-courseName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course Name</label>
                <input
                    type="text"
                    id="exam-courseName"
                    list="course-names-list"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    placeholder="e.g., MATH 201"
                    required
                />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="examTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exam Title</label>
                <input
                    type="text"
                    id="examTitle"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    placeholder="e.g., Midterm 1"
                    required
                />
            </div>
            <div>
                <label htmlFor="examDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date & Time</label>
                <input
                    type="datetime-local"
                    id="examDate"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
            </div>
            <div>
                 <label htmlFor="exam-importance" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Importance</label>
                <select
                    id="exam-importance"
                    value={importance}
                    onChange={(e) => setImportance(e.target.value as ExamImportance)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                >
                    {Object.values(ExamImportance).map((level) => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>
            </div>
             <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location (Optional)</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    placeholder="e.g., Room 201, Online"
                />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="topics" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Topics / Notes (Optional)</label>
                <textarea
                    id="topics"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    placeholder="e.g., Chapters 1-4, focus on derivatives."
                />
            </div>
            <div className="md:col-span-2">
                <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <PlusIcon /> <span className="ml-2">Add Exam</span>
                </button>
            </div>
        </form>
    </div>
  );
};

export default ExamForm;
