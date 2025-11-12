
import React, { useState, useEffect } from 'react';
import { Homework, HomeworkStatus, HomeworkImportance } from '../types';

interface EditHomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  homework: Homework | null;
  onUpdateHomework: (homework: Homework) => void;
  courseNames: string[];
}

const EditHomeworkModal: React.FC<EditHomeworkModalProps> = ({ isOpen, onClose, homework, onUpdateHomework, courseNames }) => {
  const [courseName, setCourseName] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [importance, setImportance] = useState<HomeworkImportance>(HomeworkImportance.Medium);
  const [status, setStatus] = useState<HomeworkStatus>(HomeworkStatus.NotStarted);

  useEffect(() => {
    if (homework) {
      setCourseName(homework.courseName);
      setAssignmentTitle(homework.assignmentTitle);
      setDueDate(homework.dueDate);
      setNotes(homework.notes || '');
      setImportance(homework.importance);
      setStatus(homework.status);
    }
  }, [homework]);

  if (!isOpen || !homework) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !assignmentTitle.trim() || !dueDate) {
      alert('Please fill in all required fields.');
      return;
    }
    onUpdateHomework({
      ...homework,
      courseName,
      assignmentTitle,
      dueDate,
      notes,
      importance,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-2xl p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-3xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Edit Homework</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label htmlFor="edit-courseName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course Name</label>
                <input
                    type="text"
                    id="edit-courseName"
                    list="course-names-list"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
                 <datalist id="course-names-list">
                    {courseNames.map(name => <option key={name} value={name} />)}
                </datalist>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="edit-assignmentTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Assignment Title</label>
                <input
                    type="text"
                    id="edit-assignmentTitle"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
            </div>
            <div>
                <label htmlFor="edit-dueDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Due Date</label>
                <input
                    type="date"
                    id="edit-dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
            </div>
            <div>
                 <label htmlFor="edit-importance" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Importance</label>
                <select
                    id="edit-importance"
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
                <label htmlFor="edit-status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                <select
                    id="edit-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as HomeworkStatus)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                >
                    {Object.values(HomeworkStatus).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
            <div className="md:col-span-2">
                <label htmlFor="edit-notes" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Notes (Optional)</label>
                <textarea
                    id="edit-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                />
            </div>
            <div className="md:col-span-2 mt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save Changes
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditHomeworkModal;
