import React from 'react';
import { TimerSession } from '../types';
import { Pause, Play, RotateCcw } from 'lucide-react';

interface TimerDisplayProps {
  session: TimerSession;
  onToggle: () => void;
  onReset: () => void;
  onUpdate: (updates: Partial<TimerSession>) => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  session,
  onToggle,
  onReset,
  onUpdate,
}) => {
  const minutes = Math.floor(session.timeRemaining / 60);
  const seconds = session.timeRemaining % 60;
  const isAlmostDone = session.timeRemaining <= 120; // 2 minutes warning

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDuration = parseInt(e.target.value);
    if (!isNaN(newDuration) && newDuration > 0) {
      onUpdate({
        duration: newDuration,
        timeRemaining: newDuration * 60
      });
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg ${isAlmostDone ? 'bg-red-100 dark:bg-red-900' : 'bg-white dark:bg-blue-800'}`}>
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold dark:text-white">{session.name}</h2>
        
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={session.duration}
            onChange={handleDurationChange}
            className="w-20 px-2 py-1 text-lg border rounded dark:bg-blue-700 dark:text-white"
            min="1"
          />
          <span className="text-gray-600 dark:text-gray-300">minutes</span>
        </div>

        <div className={`text-6xl font-bold tabular-nums ${isAlmostDone ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-white'}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {isAlmostDone && (
          <div className="text-red-600 dark:text-red-400 text-xl font-bold animate-pulse">
            It's Almost Time!
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={onToggle}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {session.isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={onReset}
            className="p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};