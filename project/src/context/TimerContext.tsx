import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimerContextType, TimerSession } from '../types';

const defaultSessions: TimerSession[] = [
  { id: 'choir', name: 'Choir', duration: 15, isRunning: false, timeRemaining: 15 * 60 },
  { id: 'worship', name: 'Worship and Praise', duration: 20, isRunning: false, timeRemaining: 20 * 60 },
  { id: 'prayer', name: 'Opening Prayer', duration: 10, isRunning: false, timeRemaining: 10 * 60 },
  { id: 'offering', name: 'Offering', duration: 10, isRunning: false, timeRemaining: 10 * 60 },
  { id: 'welcome', name: 'Welcome Address', duration: 5, isRunning: false, timeRemaining: 5 * 60 },
  { id: 'ministration', name: 'Pastoral Ministration', duration: 45, isRunning: false, timeRemaining: 45 * 60 },
  { id: 'testimonies', name: 'Testimonies', duration: 15, isRunning: false, timeRemaining: 15 * 60 },
  { id: 'announcements', name: 'Announcements', duration: 10, isRunning: false, timeRemaining: 10 * 60 },
];

const TimerContext = createContext<TimerContextType | null>(null);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sessions, setSessions] = useState<TimerSession[]>(defaultSessions);

  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(prevSessions =>
        prevSessions.map(session => {
          if (session.isRunning && session.timeRemaining > 0) {
            return {
              ...session,
              timeRemaining: session.timeRemaining - 1
            };
          }
          return session;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const updateSession = (id: string, updates: Partial<TimerSession>) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === id ? { ...session, ...updates } : session
      )
    );
  };

  const addCustomSession = (name: string, duration: number) => {
    const newSession: TimerSession = {
      id: `custom-${Date.now()}`,
      name,
      duration,
      isRunning: false,
      timeRemaining: duration * 60,
      isCustom: true
    };
    setSessions(prev => [...prev, newSession]);
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const resetSession = (id: string) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === id
          ? { ...session, timeRemaining: session.duration * 60, isRunning: false }
          : session
      )
    );
  };

  const toggleTimer = (id: string) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === id
          ? { ...session, isRunning: !session.isRunning }
          : session
      )
    );
  };

  return (
    <TimerContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        sessions,
        updateSession,
        addCustomSession,
        deleteSession,
        resetSession,
        toggleTimer
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};