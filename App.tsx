
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Homework, HomeworkStatus, HomeworkImportance, Exam, ExamStatus, ExamImportance } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { getStudyTips } from './services/geminiService';
import Header from './components/Header';
import HomeworkForm from './components/HomeworkForm';
import HomeworkList from './components/HomeworkList';
import AITipsModal from './components/AITipsModal';
import { SparklesIcon } from './components/Icons';
import EditHomeworkModal from './components/EditHomeworkModal';
import Tabs from './components/Tabs';
import ExamForm from './components/ExamForm';
import ExamList from './components/ExamList';
import EditExamModal from './components/EditExamModal';
import AgendaPage from './components/AgendaPage';
import SettingsPage from './components/SettingsPage';

function App() {
  const [defaultView, setDefaultView] = useLocalStorage<string>('defaultView', 'Agenda');
  const [activeTab, setActiveTab] = useState(defaultView);
  const [view, setView] = useState<'main' | 'settings'>('main');

  // --- User State ---
  const [userName, setUserName] = useLocalStorage<string>('userName', '');

  // --- Homework State ---
  const [homeworks, setHomeworks] = useLocalStorage<Homework[]>('homeworks', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiTips, setAiTips] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingHomework, setEditingHomework] = useState<Homework | null>(null);

  // --- Exam State ---
  const [exams, setExams] = useLocalStorage<Exam[]>('exams', []);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  // --- Notification State ---
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('notificationsEnabled', false);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  // --- Data Migration for Importance ---
  useEffect(() => {
    setHomeworks(prevHomeworks => {
        const needsMigration = prevHomeworks.some(hw => !hw.importance);
        if (needsMigration) {
            return prevHomeworks.map(hw => ({
                ...hw,
                importance: hw.importance || HomeworkImportance.Medium,
            }));
        }
        return prevHomeworks;
    });
  }, [setHomeworks]);
  // ------------------------------------

  const uniqueCourseNames = useMemo(() => {
    const homeworkCourses = homeworks.map(hw => hw.courseName.trim()).filter(Boolean);
    const examCourses = exams.map(ex => ex.courseName.trim()).filter(Boolean);
    const courseSet = new Set([...homeworkCourses, ...examCourses]);
    return Array.from(courseSet).sort();
  }, [homeworks, exams]);

  const handleRequestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
        alert('This browser does not support desktop notification');
        return;
    }
    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    if (permission === 'granted') {
        setNotificationsEnabled(true);
    }
  }, [setNotificationsEnabled]);

  const handleToggleNotifications = (enabled: boolean) => {
      setNotificationsEnabled(enabled);
  };
  
  // --- Homework Handlers ---
  const handleAddHomework = useCallback((homework: Omit<Homework, 'id'>) => {
    const newHomework = { ...homework, id: Date.now().toString() };
    setHomeworks(prev => [...prev, newHomework]);
  }, [setHomeworks]);

  const handleDeleteHomework = useCallback((id: string) => {
    setHomeworks(prev => prev.filter(hw => hw.id !== id));
    const sentNotifications = JSON.parse(localStorage.getItem('sentNotifications') || '{}');
    delete sentNotifications[id];
    localStorage.setItem('sentNotifications', JSON.stringify(sentNotifications));
  }, [setHomeworks]);

  const handleUpdateStatus = useCallback((id: string, status: HomeworkStatus) => {
    setHomeworks(prev => prev.map(hw => hw.id === id ? { ...hw, status } : hw));
     if (status === HomeworkStatus.Completed) {
        const sentNotifications = JSON.parse(localStorage.getItem('sentNotifications') || '{}');
        delete sentNotifications[id];
        localStorage.setItem('sentNotifications', JSON.stringify(sentNotifications));
    }
  }, [setHomeworks]);

  const handleStartEdit = useCallback((homework: Homework) => {
    setEditingHomework(homework);
    setIsEditModalOpen(true);
  }, []);

  const handleUpdateHomework = useCallback((updatedHomework: Homework) => {
    setHomeworks(prev => prev.map(hw => hw.id === updatedHomework.id ? updatedHomework : hw));
    setIsEditModalOpen(false);
    setEditingHomework(null);
  }, [setHomeworks]);
  
  const handleGetStudyTips = async () => {
    setIsModalOpen(true);
    setIsLoadingAi(true);
    const tips = await getStudyTips(homeworks);
    setAiTips(tips);
    setIsLoadingAi(false);
  };

  // --- Exam Handlers ---
  const handleAddExam = useCallback((exam: Omit<Exam, 'id'>) => {
    const newExam = { ...exam, id: Date.now().toString() };
    setExams(prev => [...prev, newExam]);
  }, [setExams]);

  const handleDeleteExam = useCallback((id: string) => {
    setExams(prev => prev.filter(ex => ex.id !== id));
  }, [setExams]);

  const handleUpdateExamStatus = useCallback((id: string, status: ExamStatus) => {
    setExams(prev => prev.map(ex => ex.id === id ? { ...ex, status } : ex));
  }, [setExams]);

  const handleStartEditExam = useCallback((exam: Exam) => {
    setEditingExam(exam);
    setIsEditExamModalOpen(true);
  }, []);

  const handleUpdateExam = useCallback((updatedExam: Exam) => {
    setExams(prev => prev.map(ex => ex.id === updatedExam.id ? updatedExam : ex));
    setIsEditExamModalOpen(false);
    setEditingExam(null);
  }, [setExams]);

  // --- Course Management Handlers ---
  const handleRenameCourse = useCallback((oldName: string, newName: string) => {
    setHomeworks(prev => prev.map(hw => hw.courseName === oldName ? { ...hw, courseName: newName } : hw));
    setExams(prev => prev.map(ex => ex.courseName === oldName ? { ...ex, courseName: newName } : ex));
  }, [setHomeworks, setExams]);

  const handleDeleteCourse = useCallback((courseName: string) => {
    setHomeworks(prev => prev.filter(hw => hw.courseName !== courseName));
    setExams(prev => prev.filter(ex => ex.courseName !== courseName));
  }, [setHomeworks, setExams]);

    // --- useEffect for sending notifications ---
    useEffect(() => {
        if (notificationPermission !== 'granted' || !notificationsEnabled) {
            return;
        }

        const sentNotifications = JSON.parse(localStorage.getItem('sentNotifications') || '{}');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        homeworks.forEach(hw => {
            if (hw.status === HomeworkStatus.Completed || sentNotifications[hw.id]) {
                return;
            }

            const dueDate = new Date(hw.dueDate);
            const userTimezoneOffset = dueDate.getTimezoneOffset() * 60000;
            const adjustedDueDate = new Date(dueDate.getTime() + userTimezoneOffset);
            
            if (
                adjustedDueDate.getFullYear() === tomorrow.getFullYear() &&
                adjustedDueDate.getMonth() === tomorrow.getMonth() &&
                adjustedDueDate.getDate() === tomorrow.getDate()
            ) {
                 new Notification('Homework Due Tomorrow!', {
                    body: `${hw.courseName}: "${hw.assignmentTitle}" is due tomorrow.`,
                });
                sentNotifications[hw.id] = true;
            }
        });

        localStorage.setItem('sentNotifications', JSON.stringify(sentNotifications));

      }, [homeworks, notificationPermission, notificationsEnabled]);
      // ------------------------------------------
  
  const renderContent = () => {
    switch(activeTab) {
      case 'Exams':
        return (
          <>
            <ExamForm onAddExam={handleAddExam} courseNames={uniqueCourseNames} />
            <div className="mt-8">
              <ExamList 
                exams={exams}
                onUpdateStatus={handleUpdateExamStatus}
                onDelete={handleDeleteExam}
                onEdit={handleStartEditExam}
              />
            </div>
          </>
        );
      case 'Agenda':
        return <AgendaPage homeworks={homeworks} exams={exams} />;
      case 'Homework':
      default:
        return (
          <>
            <HomeworkForm onAddHomework={handleAddHomework} courseNames={uniqueCourseNames} />
             <div className="mt-6 flex justify-end">
                <button
                    onClick={handleGetStudyTips}
                    disabled={homeworks.filter(h => h.status !== HomeworkStatus.Completed).length === 0}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <SparklesIcon />
                    Get Study Plan
                </button>
            </div>
            <div className="mt-4">
                <HomeworkList
                    homeworks={homeworks}
                    onUpdateStatus={handleUpdateStatus}
                    onDelete={handleDeleteHomework}
                    onEdit={handleStartEdit}
                />
            </div>
          </>
        );
    }
  };


  if (view === 'settings') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <Header userName={userName} onShowSettings={() => setView('settings')} />
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <SettingsPage
                userName={userName}
                onUpdateUserName={setUserName}
                courses={uniqueCourseNames}
                onRenameCourse={handleRenameCourse}
                onDeleteCourse={handleDeleteCourse}
                notificationPermission={notificationPermission}
                notificationsEnabled={notificationsEnabled}
                onRequestPermission={handleRequestPermission}
                onToggleNotifications={handleToggleNotifications}
                onBack={() => setView('main')}
                defaultView={defaultView}
                onUpdateDefaultView={setDefaultView}
            />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header userName={userName} onShowSettings={() => setView('settings')} />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Tabs 
          tabs={['Homework', 'Exams', 'Agenda']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>

      <AITipsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tips={aiTips}
        isLoading={isLoadingAi}
      />
      <EditHomeworkModal
        isOpen={isEditModalOpen}
        onClose={() => {
            setIsEditModalOpen(false);
            setEditingHomework(null);
        }}
        homework={editingHomework}
        onUpdateHomework={handleUpdateHomework}
        courseNames={uniqueCourseNames}
      />
      <EditExamModal
        isOpen={isEditExamModalOpen}
        onClose={() => {
            setIsEditExamModalOpen(false);
            setEditingExam(null);
        }}
        exam={editingExam}
        onUpdateExam={handleUpdateExam}
        courseNames={uniqueCourseNames}
      />
    </div>
  );
}

export default App;
