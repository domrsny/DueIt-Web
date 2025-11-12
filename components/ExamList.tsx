
import React, { useMemo } from 'react';
import { Exam, ExamStatus } from '../types';
import ExamItem from './ExamItem';

interface ExamListProps {
  exams: Exam[];
  onUpdateStatus: (id: string, status: ExamStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (exam: Exam) => void;
}

const ExamList: React.FC<ExamListProps> = ({ exams, onUpdateStatus, onDelete, onEdit }) => {
    const sortedExams = useMemo(() => {
        return [...exams].sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime());
    }, [exams]);


  if (exams.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white">No Exams Scheduled!</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Add an exam above to start tracking it.</p>
      </div>
    );
  }

  return (
    <div>
        <ul className="space-y-4">
          {sortedExams.map((ex) => (
            <ExamItem
              key={ex.id}
              exam={ex}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
    </div>
  );
};

export default ExamList;
