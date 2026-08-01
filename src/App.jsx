import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import TodoList from './pages/TodoList';
import KanbanBoard from './pages/KanbanBoard';
import CalendarView from './pages/CalendarView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="todo" element={<TodoList />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="calendar" element={<CalendarView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
