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

  const handleExportExcel = async () => {
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

    // Dynamically import exceljs and file-saver
    const ExcelJS = (await import('exceljs')).default;
    const { saveAs } = await import('file-saver');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh sách công việc');

    // Define columns
    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 6 },
      { header: 'Tên công việc', key: 'title', width: 35 },
      { header: 'Mô tả', key: 'description', width: 50 },
      { header: 'Dự án', key: 'project', width: 20 },
      { header: 'Ngày bắt đầu', key: 'startDate', width: 15 },
      { header: 'Ngày kết thúc', key: 'endDate', width: 15 },
      { header: 'Trạng thái', key: 'status', width: 20 },
      { header: 'Ghi chú', key: 'note', width: 30 }
    ];

    // Add rows
    tasks.forEach((task, index) => {
      worksheet.addRow({
        stt: index + 1,
        title: task.title || '',
        description: task.description || '',
        project: getProjectName(task.projectId),
        startDate: format(new Date(task.startDate || task.date), 'dd/MM/yyyy'),
        endDate: format(new Date(task.date), 'dd/MM/yyyy'),
        status: getStatusText(task.status),
        note: ''
      });
    });

    // Style header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF2F2F2' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    // Style data rows
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell, colNumber) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.alignment = { vertical: 'middle', wrapText: true };
          if (colNumber === 1 || colNumber === 5 || colNumber === 6 || colNumber === 7) {
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
          }
        });
      }
    });

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Danh_sach_cong_viec_${format(new Date(), 'dd_MM_yyyy')}.xlsx`);
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
