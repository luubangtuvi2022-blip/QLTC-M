import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('activities');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities));
  }, [activities]);

  const logActivity = (action, details) => {
    const newActivity = {
      id: uuidv4(),
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 100)); // keep last 100
  };

  const addTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      logActivity('Chỉnh sửa công việc', `Đã cập nhật công việc "${task.title}"`);
    } else {
      const newTask = { ...task, id: uuidv4() };
      setTasks([...tasks, newTask]);
      logActivity('Tạo công việc', `Đã tạo công việc "${task.title}"`);
    }
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...updatedTask } : t)));
    logActivity('Chỉnh sửa công việc', `Đã cập nhật công việc "${updatedTask.title || 'Không tên'}"`);
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
    const task = tasks.find(t => t.id === id);
    if (task) {
      logActivity('Cập nhật trạng thái', `Đổi trạng thái công việc "${task.title}" thành "${status}"`);
    }
  };

  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(t => t.id !== id));
    if (task) logActivity('Xóa công việc', `Đã xóa công việc "${task.title}"`);
  };

  const addProject = (project) => {
    if (project.id) {
      setProjects(projects.map(p => (p.id === project.id ? project : p)));
      logActivity('Chỉnh sửa dự án', `Đã cập nhật dự án "${project.name}"`);
    } else {
      setProjects([...projects, { ...project, id: uuidv4() }]);
      logActivity('Tạo dự án', `Đã tạo dự án "${project.name}"`);
    }
  };

  const deleteProject = (id) => {
    const project = projects.find(p => p.id === id);
    setProjects(projects.filter(p => p.id !== id));
    setTasks(tasks.filter(t => t.projectId !== id));
    if (project) logActivity('Xóa dự án', `Đã xóa dự án "${project.name}" và các công việc liên quan`);
  };

  const clearActivities = () => {
    setActivities([]);
  };

  return (
    <TaskContext.Provider value={{
      tasks, projects, activities, 
      addTask, updateTask, updateTaskStatus, deleteTask, 
      addProject, deleteProject, clearActivities
    }}>
      {children}
    </TaskContext.Provider>
  );
};
