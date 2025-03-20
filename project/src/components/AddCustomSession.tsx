import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddCustomSessionProps {
  onAdd: (name: string, duration: number) => void;
}

export const AddCustomSession: React.FC<AddCustomSessionProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && duration) {
      onAdd(name, parseInt(duration));
      setName('');
      setDuration('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-blue-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Add Custom Session</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Session Name"
            className="w-full px-4 py-2 border rounded dark:bg-blue-700 dark:text-white"
            required
          />
        </div>
        <div>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (minutes)"
            className="w-full px-4 py-2 border rounded dark:bg-blue-700 dark:text-white"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add Session</span>
        </button>
      </div>
    </form>
  );
};