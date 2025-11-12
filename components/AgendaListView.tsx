
import React, { useMemo } from 'react';
import { Homework, HomeworkStatus, Exam, ExamStatus } from '../types';

interface AgendaListViewProps {
  homeworks: Homework[];
  exams: Exam[];
}

const AgendaListView: React.FC<AgendaListViewProps> = ({ homeworks, exams }) => {
  const upcomingItems = useMemo(() => {
    const homeworkItems = homeworks
      .filter(hw => hw.status !== HomeworkStatus.Completed)
      .map(hw => {
        const d = new Date(hw.dueDate);
        const adjustedDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
        adjustedDate.setHours(23, 59, 59, 999);
        return {
            id: `hw-${hw.id}`,
            type: 'Homework',
            title: hw.assignmentTitle,
            course: hw.courseName,
            date: adjustedDate,
            item: hw
        }
      });

    const examItems = exams
        .filter(ex => ex.status !== ExamStatus.Completed)
        .map(ex => ({
            id: `ex-${ex.id}`,
            type: 'Exam',
            title: ex.examTitle,
            course: ex.courseName,
            date: new Date(ex.examDate),
            item: ex
        }));
    
    return [...homeworkItems, ...examItems].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [homeworks, exams]);

  if (upcomingItems.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Nothing on the Agenda!</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Your upcoming homework and exams will appear here.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {upcomingItems.map(item => {
        const isHomework = item.type === 'Homework';
        const formattedDate = isHomework 
            ? item.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
            : item.date.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });
        
        const now = new Date();
        now.setHours(0,0,0,0);
        const itemDate = new Date(item.date);
        itemDate.setHours(0,0,0,0);
        const daysUntil = Math.ceil((itemDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        let countdownText = '';
        if (daysUntil > 1) countdownText = `${daysUntil} days away`;
        else if (daysUntil === 1) countdownText = 'Tomorrow';
        else if (daysUntil === 0) countdownText = 'Today';
        else countdownText = 'Overdue';

        return (
          <li key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-white ${isHomework ? 'bg-blue-500' : 'bg-red-500'}`}>
                {isHomework ? 'HW' : 'EX'}
            </div>
            <div className="flex-grow">
                <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.course}</p>
            </div>
            <div className="text-right flex-shrink-0 w-40">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{formattedDate}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{countdownText}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default AgendaListView;
