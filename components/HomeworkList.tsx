
import React, { useMemo } from 'react';
import { Homework, HomeworkStatus, HomeworkImportance } from '../types';
import HomeworkItem from './HomeworkItem';

interface HomeworkListProps {
  homeworks: Homework[];
  onUpdateStatus: (id: string, status: HomeworkStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (homework: Homework) => void;
}

const HomeworkList: React.FC<HomeworkListProps> = ({ homeworks, onUpdateStatus, onDelete, onEdit }) => {
  const groupedHomeworks = useMemo(() => {
    const groups: Record<HomeworkImportance, Homework[]> = {
      [HomeworkImportance.High]: [],
      [HomeworkImportance.Medium]: [],
      [HomeworkImportance.Low]: [],
    };

    const sorted = [...homeworks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    
    for (const hw of sorted) {
      groups[hw.importance].push(hw);
    }
    
    return groups;
  }, [homeworks]);

  if (homeworks.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">All Clear!</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">You have no pending homework. Add one above to get started.</p>
      </div>
    );
  }

  const importanceOrder: HomeworkImportance[] = [HomeworkImportance.High, HomeworkImportance.Medium, HomeworkImportance.Low];

  return (
    <div>
      {importanceOrder.map((importance) => {
        const group = groupedHomeworks[importance];
        if (group.length === 0) {
          return null;
        }
        return (
          <div key={importance} className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 border-b-2 border-slate-200 dark:border-slate-700 pb-2">{importance} Priority</h2>
            <ul className="space-y-4">
              {group.map((hw) => (
                <HomeworkItem
                  key={hw.id}
                  homework={hw}
                  onUpdateStatus={onUpdateStatus}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default HomeworkList;