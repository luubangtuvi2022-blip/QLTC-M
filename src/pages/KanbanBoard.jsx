import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useTasks } from '../context/TaskContext';
import { MoreVertical, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import './KanbanBoard.css';

const columns = [
  { id: 'todo', title: 'Chưa bắt đầu', color: 'var(--status-todo)' },
  { id: 'inprogress', title: 'Đang làm', color: 'var(--status-inprogress)' },
  { id: 'inreview', title: 'Đang chờ duyệt', color: 'var(--status-inreview)' },
  { id: 'done', title: 'Hoàn thành', color: 'var(--status-done)' }
];

const KanbanBoard = () => {
  const { tasks, updateTaskStatus } = useTasks();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateTaskStatus(draggableId, destination.droppableId);
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
                                <button className="btn-icon-small">
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                              <div className="kanban-card-footer">
                                <span className="kanban-project">
                                  {task.projectId === 'p1' ? 'Web' : 'Mobile'}
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
    </div>
  );
};

export default KanbanBoard;
