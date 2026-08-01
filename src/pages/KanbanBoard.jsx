import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTasks } from '../context/TaskContext';
import { MoreVertical, Calendar as CalendarIcon, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import TaskModal from '../components/TaskModal';
import './KanbanBoard.css';

const columns = [
  { id: 'todo', title: 'Chưa bắt đầu', color: 'var(--status-todo)' },
  { id: 'inprogress', title: 'Đang làm', color: 'var(--status-inprogress)' },
  { id: 'inreview', title: 'Đang chờ duyệt', color: 'var(--status-inreview)' },
  { id: 'done', title: 'Hoàn thành', color: 'var(--status-done)' }
];

const KanbanBoard = () => {
  const { tasks, updateTaskStatus, updateTask, deleteTask } = useTasks();
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateTaskStatus(draggableId, destination.droppableId);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const handleSaveTask = (taskData) => {
    updateTask(taskData.id, taskData);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2>Bảng Kanban</h2>
        <p className="subtitle">Kéo thả để cập nhật trạng thái công việc</p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {columns.map((column) => {
            const columnTasks = tasks.filter(task => task.status === column.id);
            return (
              <div key={column.id} className="kanban-column">
                <div className="kanban-column-header">
                  <h3 style={{ borderBottom: `2px solid ${column.color}` }}>{column.title}</h3>
                  <span className="task-count">{columnTasks.length}</span>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      className={`kanban-droppable ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className={`kanban-card card ${snapshot.isDragging ? 'is-dragging' : ''}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="kanban-card-header">
                                <h4>{task.title}</h4>
                                <div style={{ position: 'relative' }}>
                                  <button 
                                    className="btn-icon-small"
                                    onClick={() => setActiveMenuId(activeMenuId === task.id ? null : task.id)}
                                  >
                                    <MoreVertical size={16} />
                                  </button>
                                  {activeMenuId === task.id && (
                                    <div className="project-menu card fade-in" style={{ position: 'absolute', right: 0, top: '100%', padding: '0.5rem', zIndex: 10, minWidth: '120px' }}>
                                      <button className="menu-item" onClick={() => openEditModal(task)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem', textAlign: 'left' }}>
                                        <Edit2 size={14} /> Sửa
                                      </button>
                                      <button className="menu-item text-danger" onClick={() => { deleteTask(task.id); setActiveMenuId(null); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem', textAlign: 'left', color: 'var(--status-danger)' }}>
                                        <Trash2 size={14} /> Xoá
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {task.description && (
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                  {task.description.length > 60 ? task.description.substring(0, 60) + '...' : task.description}
                                </div>
                              )}
                              <div className="kanban-card-footer">
                                <span className="kanban-project">
                                  {task.projectId ? 'Dự án' : 'Không có DA'}
                                </span>
                                <span className="kanban-date">
                                  <CalendarIcon size={14} />
                                  {format(new Date(task.date), 'dd/MM/yyyy')}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
      
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default KanbanBoard;
