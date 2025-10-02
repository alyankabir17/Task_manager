import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

interface TaskFormProps {
  onSuccess?: () => void;
  initialData?: {
    id?: number;
    title: string;
    description: string;
    due_date: string;
  };
}

export function TaskForm({ onSuccess, initialData }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState<Date | null>(
    initialData?.due_date ? new Date(initialData.due_date) : null
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
    
      if (!user) throw new Error('User not authenticated');
    
      const taskData = {
        title,
        description,
        due_date: dueDate?.toISOString(),
        owner_id: user.id,
      };
    
      if (initialData?.id) {
        const { error } = await supabase
          .from('tasks')
          .update(taskData)
          .eq('id', initialData.id);
        if (error) throw error;
        toast.success('Task updated successfully!');
      } else {
        const { error } = await supabase.from('tasks').insert([taskData]);
        if (error) throw error;
        toast.success('Task created successfully!');
      }
    
      onSuccess?.();
      setTitle('');
      setDescription('');
      setDueDate(null);
    } catch (error) {
      // Check if the error has a message property
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };    

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <div className="mt-1">
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="h-48"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}