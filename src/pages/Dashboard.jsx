import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { CheckSquare, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { tasks, projects } = useTasks();
  const navigate = useNavigate();

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inprogress: tasks.filter(t => t.status === 'inprogress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const pieData = [
    { name: 'Chưa bắt đầu', value: stats.todo, color: '#94a3b8', status: 'todo' },
    { name: 'Đang làm', value: stats.inprogress, color: '#3b82f6', status: 'inprogress' },
    { name: 'Đã xong', value: stats.done, color: '#10b981', status: 'done' },
  ];

  // Group tasks by project
  const projectStats = tasks.reduce((acc, task) => {
    const pId = task.projectId || 'unassigned';
    if (!acc[pId]) acc[pId] = { total: 0, done: 0, notDone: 0 };
    acc[pId].total += 1;
    if (task.status === 'done') acc[pId].done += 1;
    else acc[pId].notDone += 1;
    return acc;
  }, {});

  const barData = Object.keys(projectStats).map(key => {
    const project = projects.find(p => p.id === key);
    const stats = projectStats[key];
    const donePercent = Math.round((stats.done / stats.total) * 100);
    const notDonePercent = 100 - donePercent;

    return {
      name: project ? project.name : 'Không có dự án',
      total: stats.total,
      done: stats.done,
      notDone: stats.notDone,
      donePercent,
      notDonePercent,
      projectId: key === 'unassigned' ? '' : key,
      color: project ? project.color : 'var(--primary-color)'
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="card" style={{ padding: '1rem', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{label}</p>
          <p style={{ color: 'var(--status-done)', fontSize: '0.875rem' }}>
            Đã hoàn thành: {data.done} ({data.donePercent}%)
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Chưa hoàn thành: {data.notDone} ({data.notDonePercent}%)
          </p>
          <p style={{ fontWeight: '500', marginTop: '0.25rem', fontSize: '0.875rem' }}>
            Tổng cộng: {data.total}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleCardClick = (status) => {
    navigate(`/todo?status=${status}`);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2>Tổng quan công việc</h2>
        <p className="subtitle">Theo dõi tiến độ và hiệu suất của bạn</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => handleCardClick('all')}>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <CheckSquare size={24} />
          </div>
          <div className="stat-info">
            <h3>Tổng cộng</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => handleCardClick('todo')}>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Chưa bắt đầu</h3>
            <p className="stat-value">{stats.todo}</p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => handleCardClick('inprogress')}>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Đang tiến hành</h3>
            <p className="stat-value">{stats.inprogress}</p>
          </div>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => handleCardClick('done')}>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <h3>Hoàn thành</h3>
            <p className="stat-value">{stats.done}</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card chart-card">
          <h3 className="chart-title">Phân bố trạng thái</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) => handleCardClick(data.payload.status)}
                  style={{ cursor: 'pointer' }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend onClick={(data) => handleCardClick(data.payload.status)} wrapperStyle={{ cursor: 'pointer' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card chart-card">
          <h3 className="chart-title">Công việc theo dự án</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                
                {/* Phần chưa hoàn thành (Màu nhạt / độ trong suốt 0.3) */}
                <Bar 
                  dataKey="notDone" 
                  stackId="a" 
                  radius={[0, 0, 4, 4]} 
                  onClick={(data) => navigate(`/todo?projectId=${data.projectId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-notdone-${index}`} fill={entry.color} fillOpacity={0.3} />
                  ))}
                </Bar>
                
                {/* Phần đã hoàn thành (Màu đậm) */}
                <Bar 
                  dataKey="done" 
                  stackId="a" 
                  radius={[4, 4, 0, 0]} 
                  onClick={(data) => navigate(`/todo?projectId=${data.projectId}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-done-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
