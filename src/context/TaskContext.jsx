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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, { ...task, id: uuidv4() }]);
    }
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
    if (project.id) {
      setProjects(projects.map(p => (p.id === project.id ? project : p)));
    } else {
      setProjects([...projects, { ...project, id: uuidv4() }]);
    }
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    // Optional: Delete tasks associated with project, or keep them.
    // Let's delete associated tasks to avoid orphans
    setTasks(tasks.filter(t => t.projectId !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks, projects, addTask, updateTask, updateTaskStatus, deleteTask, addProject, deleteProject
    }}>
      {children}
    </TaskContext.Provider>
  );
};
