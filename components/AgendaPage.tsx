
import React, { useState } from 'react';
import { Homework, Exam } from '../types';
import AgendaListView from './AgendaListView';
import AgendaCalendarView from './AgendaCalendarView';

interface AgendaPageProps {
  homeworks: Homework[];
  exams: Exam[];
}

const AgendaPage: React.FC<AgendaPageProps> = ({ homeworks, exams }) => {
  const [view, setView] = useState<'list' | 'calendar'>('list');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Agenda</h2>
        <div className="flex space-x-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-lg">
          <button
            onClick={() => setView('list')}
            aria-pressed={view === 'list'}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${view === 'list' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
          >
            List
          </button>
          <button
            onClick={() => setView('calendar')}
            aria-pressed={view === 'calendar'}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${view === 'calendar' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
          >
            Calendar
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <AgendaListView homeworks={homeworks} exams={exams} />
      ) : (
        <AgendaCalendarView homeworks={homeworks} exams={exams} />
      )}
    </div>
  );
};

export default AgendaPage;
