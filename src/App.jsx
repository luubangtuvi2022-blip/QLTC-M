import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import TodoList from './pages/TodoList';
import KanbanBoard from './pages/KanbanBoard';
import CalendarView from './pages/CalendarView';
import History from './pages/History';
import { TaskProvider } from './context/TaskContext';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="todo" element={<TodoList />} />
            <Route path="kanban" element={<KanbanBoard />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
