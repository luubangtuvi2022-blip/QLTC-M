import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

const ProjectModal = ({ isOpen, onClose, onSave, project }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#0056b3');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setColor(project.color);
    } else {
      setName('');
      setColor('#0056b3');
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ id: project?.id, name, color });
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{project ? 'Chỉnh sửa dự án' : 'Tạo dự án mới'}</h3>
          <button className="btn-close" onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên dự án</label>
            <input 
              type="text" 
              className="input-field" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Nhập tên dự án" 
              autoFocus 
            />
          </div>
          <div className="form-group">
            <label>Màu sắc</label>
            <input 
              type="color" 
              className="input-field" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              style={{ padding: '0.25rem', height: '40px' }}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-primary">Lưu dự án</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
