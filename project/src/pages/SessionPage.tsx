import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTimer } from '../context/TimerContext';
import { TimerDisplay } from '../components/TimerDisplay';
import { ArrowLeft } from 'lucide-react';

const SessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { sessions, updateSession, deleteSession, resetSession, toggleTimer, darkMode } = useTimer();
  
  const session = sessions.find(s => s.id === id);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Session not found</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-blue-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to All Sessions</span>
        </Link>

        <div className="max-w-2xl mx-auto">
          <TimerDisplay
            session={session}
            onToggle={() => toggleTimer(session.id)}
            onReset={() => resetSession(session.id)}
            onUpdate={(updates) => updateSession(session.id, updates)}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionPage;