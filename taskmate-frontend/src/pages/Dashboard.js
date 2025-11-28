import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useTheme } from '../contexts/ThemeContext';

const GROUPS = ['All', 'pending', 'in_progress', 'completed'];

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [group, setGroup] = useState('All');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: '',
    status: 'pending',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { fetchUser(); fetchData(); }, []);

  useEffect(() => {
    if (group === 'All') setFiltered(tasks);
    else setFiltered(tasks.filter(t => t.status === group));
  }, [tasks, group]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('users/me/');
      setUser(res.data);
    } catch (err) {
      console.warn('User fetch failed', err);
    }
  };

  const fetchData = async () => {
    try {
      const tasksRes = await axios.get('tasks/');
      setTasks(tasksRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch tasks');
      if (err.response?.status === 401) navigate('/login');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      // The backend Task model doesn't include deadline/severity fields yet.
      // We'll send them, but if backend ignores them it's safe.
      const payload = { ...newTask };
      const res = await axios.post('tasks/', payload);
      setTasks(prev => [res.data, ...prev]);
      setNewTask({ title: '', description: '', deadline: '', status: 'pending' });
    } catch (err) {
      console.error('Create task error:', err);
      setError('Failed to create task');
    }
  };

  // Modal submit waits for creation before closing
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateTask(e);
      setIsModalOpen(false);
    } catch (err) {
      // error handled in handleCreateTask
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`tasks/${id}/`);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Delete error', err);
      setError('Failed to delete task');
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditedTask({ title: task.title, description: task.description, status: task.status });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedTask({});
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.patch(`tasks/${id}/`, editedTask);
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
      setEditingId(null);
      setEditedTask({});
    } catch (err) {
      console.error('Edit save error', err);
      setError('Failed to update task');
    }
  };

  const markComplete = async (id) => {
    try {
      const res = await axios.patch(`tasks/${id}/`, { status: 'completed' });
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (err) {
      console.error('Complete error', err);
      setError('Failed to complete task');
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-gray-900' : 'bg-white'} min-h-screen`}> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-red-700'}`}>
              Hello{user ? `, ${user.first_name || user.username}` : ''}
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome back — manage your tasks</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`px-3 py-2 rounded-md border ${isDarkMode ? 'border-gray-700 text-white' : 'border-red-200 text-red-700'}`}
            >
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className={`hidden lg:block ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-red-50'} p-6 rounded-lg shadow`}> 
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-red-700'}`}>Add Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  required
                  className="w-full p-2 rounded border"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  className="w-full p-2 rounded border"
                  value={newTask.deadline}
                  onChange={e => setNewTask({...newTask, deadline: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full p-2 rounded border"
                  value={newTask.description}
                  onChange={e => setNewTask({...newTask, description: e.target.value})}
                />
              </div>

              <div className="flex gap-2">
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Add</button>
                <button type="button" onClick={() => setNewTask({title:'',description:'',deadline:'',status:'pending'})} className="px-4 py-2 bg-gray-200 rounded">Reset</button>
              </div>
            </form>
          </aside>

          <main className="lg:col-span-2 w-full max-w-3xl mx-auto lg:mx-0">
            <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} p-6 rounded-lg shadow`}> 
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {GROUPS.map(g => (
                    <button
                      key={g}
                      onClick={() => setGroup(g)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${group === g ? (isDarkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white') : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-red-50 text-red-700')}`}
                    >{g === 'All' ? 'All' : g.replace('_',' ')}</button>
                  ))}
                </div>
                <div className="text-sm text-gray-500">Total: {tasks.length}</div>
              </div>

              <div className="grid gap-4">
                {filtered.length === 0 && <div className={`p-6 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-red-50'} text-center`}>No tasks yet — click + to add one!</div>}

                {filtered.map(task => (
                  <article key={task.id} className={`p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-red-100'}`}>
                    {editingId === task.id ? (
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <input className="w-full p-2 rounded border mb-2" value={editedTask.title} onChange={e => setEditedTask({...editedTask, title: e.target.value})} />
                            <textarea className="w-full p-2 rounded border" rows={3} value={editedTask.description} onChange={e => setEditedTask({...editedTask, description: e.target.value})} />
                            <div className="mt-2 flex items-center gap-2">
                              <label className="text-sm">Status</label>
                              <select className="p-1 rounded border text-sm" value={editedTask.status} onChange={e => setEditedTask({...editedTask, status: e.target.value})}>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <button onClick={() => saveEdit(task.id)} className="px-3 py-1 text-sm rounded bg-red-600 text-white">Save</button>
                            <button onClick={cancelEdit} className="px-3 py-1 text-sm rounded border">Cancel</button>
                            <button onClick={() => handleDelete(task.id)} className="px-3 py-1 text-sm rounded text-red-600">Delete</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-red-700 dark:text-white">{task.title}</h3>
                          <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{task.description}</p>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <span className={`px-2 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{task.status.replace('_',' ')}</span>
                            <span className="text-gray-400">{new Date(task.created_at).toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button onClick={() => startEdit(task)} className="px-3 py-1 text-sm rounded border border-red-200 text-red-600">Edit</button>
                          <button onClick={() => markComplete(task.id)} className="px-3 py-1 text-sm rounded bg-red-600 text-white">Complete</button>
                          <button onClick={() => handleDelete(task.id)} className="px-3 py-1 text-sm rounded text-red-600">Delete</button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </main>
        </div>

        {/* Floating + button that opens add-task modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          aria-label="Add task"
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl shadow-lg"
        >
          +
        </button>

        {/* Add Task Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-red-700'}`}>Create New Task</h2>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input required className="w-full p-2 rounded border" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deadline</label>
                  <input type="date" className="w-full p-2 rounded border" value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea rows={3} className="w-full p-2 rounded border" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Create</button>
                  <button type="button" onClick={() => { setIsModalOpen(false); setNewTask({title:'',description:'',deadline:'',status:'pending'}); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
