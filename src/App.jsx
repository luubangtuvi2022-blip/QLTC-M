import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import TodoList from './pages/TodoList';
import KanbanBoard from './pages/KanbanBoard';
import CalendarView from './pages/CalendarView';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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
    </AuthProvider>
  );
}

export default App;
