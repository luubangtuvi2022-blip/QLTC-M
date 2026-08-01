import React, { useState } from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import TaskModal from './TaskModal';
import './Header.css';

const Header = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { tasks, addTask } = useTasks();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find tasks that are due soon (today or past due) and not done
  const dueTasks = tasks.filter(task => {
    if (task.status === 'done') return false;
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1; // Due today, tomorrow, or past due
  });

  return (
    <header className="header glass-panel">
      <div className="header-search">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Tìm kiếm công việc, dự án..." 
        />
      </div>
      
      <div className="header-actions">
        <div style={{ position: 'relative' }}>
          <button className="btn-icon" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={20} />
            {dueTasks.length > 0 && <span className="notification-badge"></span>}
          </button>
          
          {showNotifications && (
            <div className="notifications-dropdown card fade-in" style={{
              position: 'absolute', top: '100%', right: 0, width: '300px', marginTop: '0.5rem', padding: '1rem', zIndex: 50
            }}>
              <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Thông báo</h4>
              {dueTasks.length > 0 ? (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {dueTasks.map(t => (
                    <li key={t.id} style={{ fontSize: '0.8rem', padding: '0.5rem', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
                      Công việc <strong>{t.title}</strong> sắp đến hạn!
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Không có thông báo nào.</p>
              )}
            </div>
          )}
        </div>

        <button className="btn-primary" onClick={() => setIsTaskModalOpen(true)}>
          <Plus size={18} />
          <span>Tạo mới</span>
        </button>
      </div>

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        onSave={addTask}
      />
    </header>
  );
};

export default Header;
