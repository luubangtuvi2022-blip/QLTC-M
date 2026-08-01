import React from 'react';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';
import { Clock, Download, Trash2 } from 'lucide-react';
import './History.css';

const History = () => {
  const { activities, clearActivities, tasks, projects } = useTasks();

  const handleExportData = () => {
    const dataStr = JSON.stringify({ tasks, projects, activities }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `quan-ly-cong-viec-backup-${format(new Date(), 'dd-MM-yyyy')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Lịch sử hoạt động</h2>
          <p className="subtitle">Theo dõi các thay đổi và sao lưu dữ liệu</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={clearActivities}>
            <Trash2 size={18} />
            <span>Xoá lịch sử</span>
          </button>
          <button className="btn-primary" onClick={handleExportData}>
            <Download size={18} />
            <span>Lưu dữ liệu (Backup)</span>
          </button>
        </div>
      </div>

      <div className="card history-card">
        {activities.length === 0 ? (
          <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <Clock size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>Chưa có hoạt động nào được ghi nhận.</p>
          </div>
        ) : (
          <ul className="activity-list">
            {activities.map((activity) => (
              <li key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <Clock size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-time">{format(new Date(activity.timestamp), 'dd/MM/yyyy HH:mm')}</span>
                  </div>
                  <p className="activity-details">{activity.details}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
