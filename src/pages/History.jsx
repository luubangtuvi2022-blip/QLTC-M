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

  const handleExportExcel = () => {
    const getProjectName = (id) => {
      const p = projects.find(p => p.id === id);
      return p ? p.name : 'Không có dự án';
    };

    const getStatusText = (status) => {
      switch(status) {
        case 'todo': return 'Chưa bắt đầu';
        case 'inprogress': return 'Đang làm';
        case 'inreview': return 'Chờ duyệt';
        case 'done': return 'Hoàn thành';
        default: return status;
      }
    };

    let tableRows = '';
    tasks.forEach((task, index) => {
      tableRows += `
        <tr>
          <td style="text-align: center;">${index + 1}</td>
          <td>${task.title || ''}</td>
          <td>${task.description || ''}</td>
          <td>${getProjectName(task.projectId)}</td>
          <td style="text-align: center;">${format(new Date(task.date), 'dd/MM/yyyy')}</td>
          <td style="text-align: center;">${getStatusText(task.status)}</td>
          <td></td>
        </tr>
      `;
    });

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #000000; padding: 8px; vertical-align: middle; }
          th { background-color: #f2f2f2; font-weight: bold; text-align: center; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th style="width: 50px;">STT</th>
              <th style="width: 250px;">Tên công việc</th>
              <th style="width: 350px;">Mô tả</th>
              <th style="width: 150px;">Dự án</th>
              <th style="width: 100px;">Ngày hẹn</th>
              <th style="width: 150px;">Trạng thái</th>
              <th style="width: 200px;">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob(['\uFEFF' + html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', `Danh_sach_cong_viec_${format(new Date(), 'dd_MM_yyyy')}.xls`);
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
          <button className="btn-secondary" onClick={handleExportExcel} style={{ backgroundColor: '#10b981', color: 'white', borderColor: '#10b981' }}>
            <Download size={18} />
            <span>Xuất Excel</span>
          </button>
          <button className="btn-primary" onClick={handleExportData}>
            <Download size={18} />
            <span>Backup (JSON)</span>
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
