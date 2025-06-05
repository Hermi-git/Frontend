import './App.css'
import { useState } from 'react';

const initialTasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    const newTaskObj = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      dueDate: newDueDate || null,
    };
    setTasks([newTaskObj, ...tasks]);
    setNewTask('');
    setNewDueDate('');
    setError('');
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center px-4 py-8">
      <div className="backdrop-blur-md bg-white/70 p-10 sm:p-12 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/40">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">Task Manager</h1>
  
        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          {['all', 'completed', 'pending'].map((status) => (
            <button
              key={status}
              className={`px-5 py-2.5 rounded-full text-lg font-semibold transition duration-200 ${
                filter === status
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white/60 text-gray-800 hover:bg-indigo-100'
              }`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
  
        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="mb-8 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg bg-white/90"
            placeholder="Enter new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition shadow text-lg font-semibold"
          >
            Add
          </button>
        </form>
  
        {error && <div className="text-red-500 text-base mb-6">{error}</div>}
  
        {/* Task List */}
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-5 rounded-2xl border transition-shadow ${
                task.completed
                  ? 'bg-green-100 line-through text-gray-500'
                  : 'bg-white/80 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className="w-6 h-6 accent-green-600 cursor-pointer"
                  />
                  <span className="font-semibold text-xl">{task.title}</span>
                </div>
                {task.dueDate && (
                  <span className="text-base text-indigo-600 font-semibold sm:ml-6">
                    📅 Due: {task.dueDate}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-600 hover:text-red-800 px-3 py-1 rounded-full text-3xl transition"
                title="Delete task"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  
}

export default App
