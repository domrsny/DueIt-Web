
import React, { useState, useMemo, useCallback } from 'react';
import { Homework, HomeworkStatus, Exam, ExamStatus } from '../types';

interface AgendaCalendarViewProps {
  homeworks: Homework[];
  exams: Exam[];
}

const AgendaCalendarView: React.FC<AgendaCalendarViewProps> = ({ homeworks, exams }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const itemsByDate = useMemo(() => {
    const map = new Map<string, any[]>();
    homeworks
      .filter(hw => hw.status !== HomeworkStatus.Completed)
      .forEach(hw => {
        const [year, month, day] = hw.dueDate.split('-').map(Number);
        const dateKey = new Date(year, month - 1, day).toISOString().split('T')[0];
        if (!map.has(dateKey)) map.set(dateKey, []);
        map.get(dateKey)?.push({ type: 'Homework', item: hw });
      });
    
    exams
      .filter(ex => ex.status !== ExamStatus.Completed)
      .forEach(ex => {
        const dateKey = ex.examDate.split('T')[0];
        if (!map.has(dateKey)) map.set(dateKey, []);
        map.get(dateKey)?.push({ type: 'Exam', item: ex });
      });
    return map;
  }, [homeworks, exams]);

  const generateCalendarDays = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ key: `blank-${i}`, isBlank: true });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = date.toISOString().split('T')[0];
      const items = itemsByDate.get(dateKey) || [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      days.push({
        key: dateKey,
        day,
        date,
        isToday: date.getTime() === today.getTime(),
        items
      });
    }
    return days;
  }, [currentDate, itemsByDate]);

  const calendarDays = generateCalendarDays();
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} aria-label="Previous month" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">&lt;</button>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={() => changeMonth(1)} aria-label="Next month" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-slate-600 dark:text-slate-300">
        {weekdays.map(day => <div key={day} className="py-2">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(dayInfo => 
          dayInfo.isBlank ? <div key={dayInfo.key}></div> : (
            <div key={dayInfo.key} className={`relative pt-2 pb-1 border border-slate-200 dark:border-slate-700 h-28 sm:h-32 flex flex-col ${dayInfo.isToday ? 'bg-indigo-50 dark:bg-indigo-900/50' : ''}`}>
              <span className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full ${dayInfo.isToday ? 'bg-indigo-600 text-white font-bold' : ''}`}>
                {dayInfo.day}
              </span>
              <div className="overflow-y-auto px-1 text-left">
                {dayInfo.items.map((item, index) => (
                   <div key={index} className={`truncate text-xs px-1 py-0.5 rounded mb-1 ${item.type === 'Homework' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200'}`} title={item.item.assignmentTitle || item.item.examTitle}>
                     {item.item.assignmentTitle || item.item.examTitle}
                   </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
export default AgendaCalendarView;
