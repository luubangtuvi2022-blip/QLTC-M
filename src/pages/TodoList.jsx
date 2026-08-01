import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';
import { Trash2, Edit2, Search } from 'lucide-react';
import TaskModal from '../components/TaskModal';
import './TodoList.css';

const TodoList = () => {
  const { tasks, projects, updateTask, updateTaskStatus, deleteTask } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const getStatusText = (status) => {
    switch(status) {
      case 'todo': return 'Chưa bắt đầu';
      case 'inprogress': return 'Đang làm';
      case 'inreview': return 'Chờ duyệt';
      case 'done': return 'Hoàn thành';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getProjectName = (projectId) => {
    const p = projects.find(p => p.id === projectId);
    return p ? p.name : 'Chưa có dự án';
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    updateTask(taskData.id, taskData);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2>Danh sách công việc</h2>
        <p className="subtitle">Quản lý chi tiết các công việc của bạn</p>
      </div>

      <div className="card table-card">
        <div className="table-actions">
          <div className="search-box">
            <Search size={18} className="search-icon-small" />
            <input 
              type="text" 
              placeholder="Tìm công việc..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <select 
            className="input-field select-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="todo">Chưa bắt đầu</option>
            <option value="inprogress">Đang làm</option>
            <option value="inreview">Chờ duyệt</option>
            <option value="done">Hoàn thành</option>
          </select>
        </div>

        <div className="table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>Tên công việc</th>
                <th>Dự án</th>
                <th>Ngày hẹn</th>
                <th>Trạng thái</th>
                <th className="actions-col">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => (
                  <tr key={task.id}>
                    <td>
                      <span className="task-title-cell">{task.title}</span>
                    </td>
                    <td>{getProjectName(task.projectId)}</td>
                    <td>{format(new Date(task.date), 'dd/MM/yyyy')}</td>
                    <td>
                      <select 
                        className={`status-select ${getStatusClass(task.status)}`}
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      >
                        <option value="todo">Chưa bắt đầu</option>
                        <option value="inprogress">Đang làm</option>
                        <option value="inreview">Chờ duyệt</option>
                        <option value="done">Hoàn thành</option>
                      </select>
                    </td>
                    <td className="actions-col">
                      <button className="btn-icon-action edit" onClick={() => openEditModal(task)}>
                        <Edit2 size={16} />
                      </button>
                      <button className="btn-icon-action delete" onClick={() => deleteTask(task.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">Không tìm thấy công việc nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default TodoList;

