import React from 'react';
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
  const { tasks } = useTasks();

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inprogress: tasks.filter(t => t.status === 'inprogress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const pieData = [
    { name: 'Chưa bắt đầu', value: stats.todo, color: '#94a3b8' },
    { name: 'Đang làm', value: stats.inprogress, color: '#3b82f6' },
    { name: 'Đã xong', value: stats.done, color: '#10b981' },
  ];

  // Group tasks by project
  const projectStats = tasks.reduce((acc, task) => {
    acc[task.projectId] = (acc[task.projectId] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(projectStats).map(key => ({
    name: key === 'p1' ? 'Web Quản lý' : key === 'p2' ? 'Mobile App' : 'Dự án khác',
    tasks: projectStats[key]
  }));

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2>Tổng quan công việc</h2>
        <p className="subtitle">Theo dõi tiến độ và hiệu suất của bạn</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <CheckSquare size={24} />
          </div>
          <div className="stat-info">
            <h3>Tổng cộng</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Chưa bắt đầu</h3>
            <p className="stat-value">{stats.todo}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Đang tiến hành</h3>
            <p className="stat-value">{stats.inprogress}</p>
          </div>
        </div>
        <div className="stat-card">
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
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
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
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="tasks" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
