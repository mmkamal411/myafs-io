import React, { useState } from 'react';
import { CheckSquare, Plus, Calendar, Tag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'bug' | 'feature' | 'meeting';
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'done';
  dueDate: string;
  subtasks?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implement User Authentication',
    description: 'Add OAuth2 authentication flow',
    category: 'feature',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2024-03-20',
    subtasks: [
      { id: '1-1', title: 'Setup OAuth Provider', completed: true },
      { id: '1-2', title: 'Implement Login Flow', completed: false },
      { id: '1-3', title: 'Add Token Management', completed: false }
    ]
  },
  {
    id: '2',
    title: 'Fix Payment Processing Bug',
    description: 'Users receiving duplicate charges',
    category: 'bug',
    priority: 'high',
    status: 'todo',
    dueDate: '2024-03-19'
  },
  {
    id: '3',
    title: 'Sprint Planning Meeting',
    category: 'meeting',
    priority: 'medium',
    status: 'todo',
    dueDate: '2024-03-18'
  }
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Task['status']) => {
    if (draggedTask) {
      setTasks(tasks.map(task =>
        task.id === draggedTask
          ? { ...task, status }
          : task
      ));
      setDraggedTask(null);
    }
  };

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId && task.subtasks
        ? {
            ...task,
            subtasks: task.subtasks.map(subtask =>
              subtask.id === subtaskId
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          }
        : task
    ));
  };

  const getStatusColumn = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'bug':
        return 'bg-red-100 text-red-600';
      case 'feature':
        return 'bg-blue-100 text-blue-600';
      case 'meeting':
        return 'bg-purple-100 text-purple-600';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-green-100 text-green-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          Sprint Tasks
        </h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gradient text-white text-sm font-medium rounded-lg hover:shadow-md transition-all duration-300">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['todo', 'in_progress', 'done'] as Task['status'][]).map((status) => (
          <div
            key={status}
            className="space-y-4"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status)}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium capitalize">{status.replace('_', ' ')}</h3>
              <span className="px-2 py-1 bg-light-100 rounded-full text-xs font-medium text-gray-600">
                {getStatusColumn(status).length}
              </span>
            </div>

            <div className="space-y-4">
              {getStatusColumn(status).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-move"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {task.subtasks.map((subtask) => (
                        <label
                          key={subtask.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => handleSubtaskToggle(task.id, subtask.id)}
                            className="rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                          />
                          <span className={subtask.completed ? 'line-through text-gray-400' : ''}>
                            {subtask.title}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    {task.subtasks && (
                      <span>
                        {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                      </span>
                     )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;