import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TimerProvider } from './context/TimerContext';
import { useTimer } from './context/TimerContext';
import { Moon, Sun, Clock } from 'lucide-react';
import SessionPage from './pages/SessionPage';
import { AddCustomSession } from './components/AddCustomSession';

function Navigation() {
  const { darkMode, toggleDarkMode, sessions } = useTimer();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-blue-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold dark:text-white">
            Grace Chapel International Timer
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-blue-700 text-gray-800 dark:text-white"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map(session => (
            <Link
              key={session.id}
              to={`/session/${session.id}`}
              className="p-6 bg-white dark:bg-blue-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <Clock className="text-blue-500 dark:text-blue-300" />
                <h2 className="text-xl font-semibold dark:text-white">{session.name}</h2>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Duration: {session.duration} minutes
              </p>
            </Link>
          ))}
          <div className="p-6">
            <AddCustomSession onAdd={(name, duration) => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <TimerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/session/:id" element={<SessionPage />} />
        </Routes>
      </Router>
    </TimerProvider>
  );
}

export default App;