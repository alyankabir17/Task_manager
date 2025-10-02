import { useState, useEffect } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string; due_date: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload(); // This will refresh the page
  };



  useEffect(() => {
    // Fetch tasks from Supabase
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('tasks').select('*');
        if (error) throw error;
        setTasks(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
        } else {
          setError('An unknown error occurred');
          toast.error('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <h1 className="align-center text-xl font-bold text-gray-900">
                <button
                  onClick={refreshPage}
                  className="text-xl font-bold text-gray-900 hover:text-blue-600 mt-5"
                >
                  Task Manager
                </button>
              </h1>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div>
        {error && <div className="error">{error}</div>} 
        {/* {success && <div className="success">{success}</div>}  */}
      </div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Task Search */}
          <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            placeholder="Search tasks"
          />
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(!showForm);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 sm:px-6 sm:py-3 lg:px-8 lg:py-4"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </button>

          </div>

          {/* Task Form */}
          {showForm && (
            <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
            <TaskForm
              initialData={editingTask || { title: '', description: '', due_date: '' }} // Provide default values if editingTask is null
              onSuccess={() => {
                setShowForm(false);
                setEditingTask(null);
                toast.success('Task saved successfully!');
              }}
            />
          </div>
          
          )}

          {/* Task List */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {loading ? (
              <p>Loading tasks...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onEdit={(task) => {
                  if (task && task.id) {
                    setEditingTask(null);
                    setShowForm(true);
                  }
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
