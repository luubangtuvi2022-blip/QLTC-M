import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  writeBatch 
} from 'firebase/firestore';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);

  // Lắng nghe dữ liệu từ Firestore theo thời gian thực
  useEffect(() => {
    const unsubTasks = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTasks(tasksData);
    });

    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProjects(projectsData);
    });

    const activitiesQuery = query(collection(db, 'activities'), orderBy('timestamp', 'desc'), limit(100));
    const unsubActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const activitiesData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setActivities(activitiesData);
    });

    return () => {
      unsubTasks();
      unsubProjects();
      unsubActivities();
    };
  }, []);

  const logActivity = async (action, details) => {
    try {
      const id = uuidv4();
      const newActivity = {
        action,
        details,
        timestamp: new Date().toISOString()
      };
      await setDoc(doc(db, 'activities', id), newActivity);
    } catch (error) {
      console.error('Error logging activity: ', error);
    }
  };

  const addTask = async (task) => {
    if (task.id) {
      // Edit existing task
      try {
        const { id, ...taskData } = task;
        await updateDoc(doc(db, 'tasks', task.id), taskData);
        logActivity('Chỉnh sửa công việc', `Đã cập nhật công việc "${task.title}"`);
      } catch (error) {
        console.error('Error updating task: ', error);
      }
    } else {
      // Add new task
      try {
        const id = uuidv4();
        await setDoc(doc(db, 'tasks', id), { ...task, id });
        logActivity('Tạo công việc', `Đã tạo công việc "${task.title}"`);
      } catch (error) {
        console.error('Error adding task: ', error);
      }
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await updateDoc(doc(db, 'tasks', id), updatedTask);
      logActivity('Chỉnh sửa công việc', `Đã cập nhật công việc "${updatedTask.title || 'Không tên'}"`);
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { status });
      const task = tasks.find(t => t.id === id);
      if (task) {
        logActivity('Cập nhật trạng thái', `Đổi trạng thái công việc "${task.title}" thành "${status}"`);
      }
    } catch (error) {
      console.error('Error updating task status: ', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const task = tasks.find(t => t.id === id);
      await deleteDoc(doc(db, 'tasks', id));
      if (task) logActivity('Xóa công việc', `Đã xóa công việc "${task.title}"`);
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const addProject = async (project) => {
    if (project.id) {
      try {
        const { id, ...projectData } = project;
        await updateDoc(doc(db, 'projects', project.id), projectData);
        logActivity('Chỉnh sửa dự án', `Đã cập nhật dự án "${project.name}"`);
      } catch (error) {
        console.error('Error updating project: ', error);
      }
    } else {
      try {
        const id = uuidv4();
        await setDoc(doc(db, 'projects', id), { ...project, id });
        logActivity('Tạo dự án', `Đã tạo dự án "${project.name}"`);
      } catch (error) {
        console.error('Error adding project: ', error);
      }
    }
  };

  const deleteProject = async (id) => {
    try {
      const project = projects.find(p => p.id === id);
      
      // Batch delete project and associated tasks
      const batch = writeBatch(db);
      
      // Delete project
      const projectRef = doc(db, 'projects', id);
      batch.delete(projectRef);
      
      // Delete all tasks associated with this project
      const projectTasks = tasks.filter(t => t.projectId === id);
      projectTasks.forEach(task => {
        const taskRef = doc(db, 'tasks', task.id);
        batch.delete(taskRef);
      });
      
      await batch.commit();
      
      if (project) logActivity('Xóa dự án', `Đã xóa dự án "${project.name}" và các công việc liên quan`);
    } catch (error) {
      console.error('Error deleting project: ', error);
    }
  };

  const clearActivities = async () => {
    try {
      const batch = writeBatch(db);
      activities.forEach(activity => {
        const activityRef = doc(db, 'activities', activity.id);
        batch.delete(activityRef);
      });
      await batch.commit();
    } catch (error) {
      console.error('Error clearing activities: ', error);
    }
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
