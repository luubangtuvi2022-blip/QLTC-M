import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', title: 'Thiết kế giao diện', status: 'todo', projectId: 'p1', date: new Date().toISOString() },
      { id: '2', title: 'Phát triển backend', status: 'inprogress', projectId: 'p1', date: new Date().toISOString() },
      { id: '3', title: 'Kiểm thử ứng dụng', status: 'inreview', projectId: 'p2', date: new Date().toISOString() },
      { id: '4', title: 'Triển khai lên server', status: 'done', projectId: 'p2', date: new Date().toISOString() }
    ];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'p1', name: 'Web Quản lý', color: '#0056b3' },
      { id: 'p2', name: 'Mobile App', color: '#10b981' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4() }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...updatedTask } : t)));
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addProject = (project) => {
    setProjects([...projects, { ...project, id: uuidv4() }]);
  };

  return (
    <TaskContext.Provider value={{
      tasks, projects, addTask, updateTask, updateTaskStatus, deleteTask, addProject
    }}>
      {children}
    </TaskContext.Provider>
  );
};
