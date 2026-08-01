import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import './Modal.css';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const { projects } = useTasks();
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('todo');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setProjectId(task.projectId);
      setStatus(task.status);
      setDate(task.date ? new Date(task.date).toISOString().slice(0, 10) : '');
    } else {
      setTitle('');
      setProjectId(projects.length > 0 ? projects[0].id : '');
      setStatus('todo');
      setDate(new Date().toISOString().slice(0, 10));
    }
  }, [task, isOpen, projects]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;
    onSave({ 
      id: task?.id, 
      title, 
      projectId, 
      status, 
      date: new Date(date).toISOString() 
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{task ? 'Chỉnh sửa công việc' : 'Tạo công việc mới'}</h3>
          <button className="btn-close" onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên công việc</label>
            <input 
              type="text" 
              className="input-field" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Nhập tên công việc" 
              autoFocus 
            />
          </div>
          <div className="form-group">
            <label>Dự án</label>
            <select 
              className="input-field" 
              value={projectId} 
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
              {projects.length === 0 && <option value="" disabled>Chưa có dự án nào</option>}
            </select>
          </div>
          <div className="form-group">
            <label>Ngày hẹn</label>
            <input 
              type="date" 
              className="input-field" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <select 
              className="input-field" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">Chưa bắt đầu</option>
              <option value="inprogress">Đang làm</option>
              <option value="inreview">Chờ duyệt</option>
              <option value="done">Hoàn thành</option>
            </select>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-primary" disabled={projects.length === 0}>Lưu công việc</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
