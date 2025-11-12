
import React from 'react';
import { Homework, HomeworkStatus, HomeworkImportance } from '../types';
import { TrashIcon, PencilIcon } from './Icons';

interface HomeworkItemProps {
  homework: Homework;
  onUpdateStatus: (id: string, status: HomeworkStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (homework: Homework) => void;
}

const statusColors: Record<HomeworkStatus, string> = {
  [HomeworkStatus.NotStarted]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [HomeworkStatus.InProgress]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  [HomeworkStatus.Completed]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const importanceBorderColors: Record<HomeworkImportance, string> = {
    [HomeworkImportance.High]: 'border-red-500 dark:border-red-400',
    [HomeworkImportance.Medium]: 'border-yellow-500 dark:border-yellow-400',
    [HomeworkImportance.Low]: 'border-green-500 dark:border-green-400',
};

const importanceTextColors: Record<HomeworkImportance, string> = {
    [HomeworkImportance.High]: 'text-red-600 dark:text-red-400',
    [HomeworkImportance.Medium]: 'text-yellow-600 dark:text-yellow-400',
    [HomeworkImportance.Low]: 'text-green-600 dark:text-green-400',
};


const HomeworkItem: React.FC<HomeworkItemProps> = ({ homework, onUpdateStatus, onDelete, onEdit }) => {
  const dueDate = new Date(homework.dueDate);
  // Adjust for timezone to avoid off-by-one day errors
  const userTimezoneOffset = dueDate.getTimezoneOffset() * 60000;
  const adjustedDueDate = new Date(dueDate.getTime() + userTimezoneOffset);
  const formattedDueDate = adjustedDueDate.toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <li className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md transition-transform hover:scale-[1.02] border-l-4 ${importanceBorderColors[homework.importance]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{homework.courseName}</p>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{homework.assignmentTitle}</h3>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Due: {formattedDueDate}</p>
            <span className={`text-xs font-bold ${importanceTextColors[homework.importance]}`}>{homework.importance} Priority</span>
          </div>

        </div>
        <div className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[homework.status]}`}>
          {homework.status}
        </div>
      </div>
      {homework.notes && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 border-l-4 border-slate-200 dark:border-slate-600 pl-3 italic">
          {homework.notes}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <select
          value={homework.status}
          onChange={(e) => onUpdateStatus(homework.id, e.target.value as HomeworkStatus)}
          className="block w-40 pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {Object.values(HomeworkStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <div className="flex items-center space-x-2">
            <button
                onClick={() => onEdit(homework)}
                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                aria-label="Edit homework"
            >
                <PencilIcon />
            </button>
            <button
                onClick={() => onDelete(homework.id)}
                className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="Delete homework"
            >
                <TrashIcon />
            </button>
        </div>
      </div>
    </li>
  );
};

export default HomeworkItem;