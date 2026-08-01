import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import vi from 'date-fns/locale/vi';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTasks } from '../context/TaskContext';
import TaskModal from '../components/TaskModal';
import './CalendarView.css';

const locales = {
  'vi': vi,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const { tasks, updateTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Controlled state for Calendar
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = tasks.map(task => ({
    ...task,
    start: new Date(task.date),
    end: new Date(task.date),
  }));

  const eventStyleGetter = (event) => {
    let backgroundColor = 'var(--status-todo)';
    if (event.status === 'inprogress') backgroundColor = 'var(--status-inprogress)';
    if (event.status === 'inreview') backgroundColor = 'var(--status-inreview)';
    if (event.status === 'done') backgroundColor = 'var(--status-done)';

    const style = {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: '0',
      display: 'block',
      padding: '2px 5px',
      cursor: 'pointer'
    };
    return { style };
  };

  const handleSelectEvent = (event) => {
    setEditingTask(event);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    updateTask(taskData.id, taskData);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2>Lịch làm việc</h2>
        <p className="subtitle">Lên kế hoạch và theo dõi thời gian công việc</p>
      </div>
      <div className="card calendar-card">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 240px)' }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          
          view={currentView}
          onView={(view) => setCurrentView(view)}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          
          culture="vi"
          messages={{
            today: 'Hôm nay',
            previous: 'Trước',
            next: 'Sau',
            month: 'Tháng',
            week: 'Tuần',
            day: 'Ngày',
            agenda: 'Lịch trình'
          }}
        />
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

export default CalendarView;
