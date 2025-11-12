
export enum HomeworkStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export enum HomeworkImportance {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface Homework {
  id: string;
  courseName: string;
  assignmentTitle: string;
  dueDate: string;
  status: HomeworkStatus;
  importance: HomeworkImportance;
  notes?: string;
}

export enum ExamStatus {
    Upcoming = 'Upcoming',
    Studying = 'Studying',
    Completed = 'Completed',
}

export enum ExamImportance {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
}

export interface Exam {
    id: string;
    courseName: string;
    examTitle: string;
    examDate: string; // Stored as YYYY-MM-DDTHH:mm
    location?: string;
    topics?: string;
    status: ExamStatus;
    importance: ExamImportance;
}
