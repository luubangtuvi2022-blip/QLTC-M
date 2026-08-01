import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Folder, MoreVertical, Plus, Edit2, Trash2 } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';
import './Projects.css';

const Projects = () => {
  const { projects, tasks, addProject, updateProject, deleteProject } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const getProjectStats = (projectId) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    const total = projectTasks.length;
    const done = projectTasks.filter(t => t.status === 'done').length;
    const progress = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, progress };
  };

  const handleSaveProject = (projectData) => {
    if (projectData.id) {
      updateProject?.(projectData) || addProject(projectData);
    } else {
      addProject(projectData);
    }
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Dự án của bạn</h2>
          <p className="subtitle">Quản lý và theo dõi tiến độ các dự án</p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          <Plus size={18} />
          <span>Dự án mới</span>
        </button>
      </div>

      <div className="projects-grid">
        {projects.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>Bạn chưa có dự án nào.</p>}
        {projects.map(project => {
          const stats = getProjectStats(project.id);
          
          return (
            <div key={project.id} className="card project-card">
              <div className="project-header">
                <div className="project-icon-wrapper" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                  <Folder size={24} />
                </div>
                <div style={{ position: 'relative' }}>
                  <button 
                    className="btn-icon-small" 
                    onClick={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
                  >
                    <MoreVertical size={20} />
                  </button>
                  {activeMenuId === project.id && (
                    <div className="project-menu card fade-in" style={{ position: 'absolute', right: 0, top: '100%', padding: '0.5rem', zIndex: 10, minWidth: '120px' }}>
                      <button className="menu-item" onClick={() => openEditModal(project)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem', textAlign: 'left' }}>
                        <Edit2 size={14} /> Sửa
                      </button>
                      <button className="menu-item text-danger" onClick={() => deleteProject(project.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem', textAlign: 'left', color: 'var(--status-danger)' }}>
                        <Trash2 size={14} /> Xoá
                      </button>
                    </div>
                  )}
                </div>
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

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  );
};

export default Projects;
