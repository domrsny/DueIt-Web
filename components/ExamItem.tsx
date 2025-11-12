
import React from 'react';
import { Exam, ExamStatus, ExamImportance } from '../types';
import { TrashIcon, PencilIcon } from './Icons';

interface ExamItemProps {
  exam: Exam;
  onUpdateStatus: (id: string, status: ExamStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (exam: Exam) => void;
}

const statusColors: Record<ExamStatus, string> = {
  [ExamStatus.Upcoming]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [ExamStatus.Studying]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [ExamStatus.Completed]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const importanceBorderColors: Record<ExamImportance, string> = {
    [ExamImportance.High]: 'border-red-500 dark:border-red-400',
    [ExamImportance.Medium]: 'border-yellow-500 dark:border-yellow-400',
    [ExamImportance.Low]: 'border-green-500 dark:border-green-400',
};

const importanceTextColors: Record<ExamImportance, string> = {
    [ExamImportance.High]: 'text-red-600 dark:text-red-400',
    [ExamImportance.Medium]: 'text-yellow-600 dark:text-yellow-400',
    [ExamImportance.Low]: 'text-green-600 dark:text-green-400',
};

const ExamItem: React.FC<ExamItemProps> = ({ exam, onUpdateStatus, onDelete, onEdit }) => {
  const examDate = new Date(exam.examDate);
  const formattedExamDate = examDate.toLocaleString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  return (
    <li className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md transition-transform hover:scale-[1.02] border-l-4 ${importanceBorderColors[exam.importance]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{exam.courseName}</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exam.examTitle}</h3>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-sm text-slate-500 dark:text-slate-400">{formattedExamDate}</p>
            <span className={`text-xs font-bold ${importanceTextColors[exam.importance]}`}>{exam.importance} Priority</span>
          </div>
          {exam.location && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Location: {exam.location}</p>}

        </div>
        <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[exam.status]}`}>
          {exam.status}
        </div>
      </div>
      {exam.topics && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 border-l-4 border-slate-200 dark:border-slate-600 pl-3 italic">
          {exam.topics}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <select
          value={exam.status}
          onChange={(e) => onUpdateStatus(exam.id, e.target.value as ExamStatus)}
          className="block w-40 pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {Object.values(ExamStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <div className="flex items-center space-x-2">
            <button
                onClick={() => onEdit(exam)}
                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Edit exam"
            >
                <PencilIcon />
            </button>
            <button
                onClick={() => onDelete(exam.id)}
                className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="Delete exam"
            >
                <TrashIcon />
            </button>
        </div>
      </div>
    </li>
  );
};

export default ExamItem;
