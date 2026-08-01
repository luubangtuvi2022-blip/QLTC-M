import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Folder, MoreVertical, Plus } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const { projects, tasks } = useTasks();

  const getProjectStats = (projectId) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    const total = projectTasks.length;
    const done = projectTasks.filter(t => t.status === 'done').length;
    const progress = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, progress };
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Dự án của bạn</h2>
          <p className="subtitle">Quản lý và theo dõi tiến độ các dự án</p>
        </div>
        <button className="btn-primary">
          <Plus size={18} />
          <span>Dự án mới</span>
        </button>
      </div>

      <div className="projects-grid">
        {projects.map(project => {
          const stats = getProjectStats(project.id);
          
          return (
            <div key={project.id} className="card project-card">
              <div className="project-header">
                <div className="project-icon-wrapper" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                  <Folder size={24} />
                </div>
                <button className="btn-icon-small">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="project-info">
                <h3>{project.name}</h3>
                <p className="task-summary">{stats.done} / {stats.total} công việc</p>
              </div>

              <div className="project-progress">
                <div className="progress-header">
                  <span>Tiến độ</span>
                  <span style={{ fontWeight: 600 }}>{stats.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${stats.progress}%`, backgroundColor: project.color }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
