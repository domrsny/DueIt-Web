
import React, { useState, useEffect } from 'react';
import { Exam, ExamStatus, ExamImportance } from '../types';

interface EditExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: Exam | null;
  onUpdateExam: (exam: Exam) => void;
  courseNames: string[];
}

const EditExamModal: React.FC<EditExamModalProps> = ({ isOpen, onClose, exam, onUpdateExam, courseNames }) => {
  const [courseName, setCourseName] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [examDate, setExamDate] = useState('');
  const [location, setLocation] = useState('');
  const [topics, setTopics] = useState('');
  const [importance, setImportance] = useState<ExamImportance>(ExamImportance.Medium);
  const [status, setStatus] = useState<ExamStatus>(ExamStatus.Upcoming);

  useEffect(() => {
    if (exam) {
      setCourseName(exam.courseName);
      setExamTitle(exam.examTitle);
      setExamDate(exam.examDate);
      setLocation(exam.location || '');
      setTopics(exam.topics || '');
      setImportance(exam.importance);
      setStatus(exam.status);
    }
  }, [exam]);

  if (!isOpen || !exam) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim() || !examTitle.trim() || !examDate) {
      alert('Please fill in all required fields.');
      return;
    }
    onUpdateExam({
      ...exam,
      courseName,
      examTitle,
      examDate,
      location,
      topics,
      importance,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-11/12 max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-3xl leading-none">&times;</button>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Edit Exam</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
                <label htmlFor="edit-exam-courseName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Course Name</label>
                <input
                    type="text"
                    id="edit-exam-courseName"
                    list="course-names-list"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
            </div>
             <div className="md:col-span-2">
                <label htmlFor="edit-examTitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Exam Title</label>
                <input
                    type="text"
                    id="edit-examTitle"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
            </div>
            <div>
                <label htmlFor="edit-examDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date & Time</label>
                <input
                    type="datetime-local"
                    id="edit-examDate"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                    required
                />
            </div>
            <div>
                 <label htmlFor="edit-exam-importance" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Importance</label>
                <select
                    id="edit-exam-importance"
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
                <label htmlFor="edit-exam-status" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
                <select
                    id="edit-exam-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ExamStatus)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                >
                    {Object.values(ExamStatus).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
             <div className="md:col-span-2">
                <label htmlFor="edit-location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location (Optional)</label>
                <input
                    type="text"
                    id="edit-location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white"
                />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="edit-topics" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Topics / Notes (Optional)</label>
                <textarea
                    id="edit-topics"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
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

export default EditExamModal;
