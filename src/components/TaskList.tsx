import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

// type TaskFormProps = {
//   initialData: {
//     id?: number;
//     title: string;
//     description: string;
//     due_date: string;
//   };
//   onSuccess: () => void;
// };

type Task = {
  id: number;
  title: string;
  description: string;
  due_date: string;

  onSuccess: () => void;
};

interface TaskListProps {
  isAdmin?: boolean;
  tasks: { id: number, title: string, description: string, due_date: string }[];
  onEdit: (task: { id: number, title: string, description: string, due_date: string }) => void;
}

export function TaskList({ isAdmin, onEdit }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true });

      if (!isAdmin) {
        query = query.eq('owner_id', user?.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      toast.error('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      toast.error('Error deleting task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [isAdmin]);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
              <div
                className="mt-2 prose prose-sm"
                dangerouslySetInnerHTML={{ __html: task.description }}
              />
              <div className="mt-2 text-sm text-gray-500">
                Due: {format(new Date(task.due_date), 'PPpp')}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit?.(task)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}