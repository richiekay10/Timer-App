export interface TimerSession {
  id: string;
  name: string;
  duration: number; // in minutes
  isRunning: boolean;
  timeRemaining: number; // in seconds
  isCustom?: boolean;
}

export interface TimerContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  sessions: TimerSession[];
  updateSession: (id: string, updates: Partial<TimerSession>) => void;
  addCustomSession: (name: string, duration: number) => void;
  deleteSession: (id: string) => void;
  resetSession: (id: string) => void;
  toggleTimer: (id: string) => void;
}