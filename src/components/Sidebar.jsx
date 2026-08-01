import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Kanban, Calendar, FolderKanban } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Tổng quan', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Dự án', path: '/projects', icon: <FolderKanban size={20} /> },
    { name: 'Danh sách', path: '/todo', icon: <CheckSquare size={20} /> },
    { name: 'Bảng Kanban', path: '/kanban', icon: <Kanban size={20} /> },
    { name: 'Lịch làm việc', path: '/calendar', icon: <Calendar size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <CheckSquare size={24} color="#ffffff" />
        </div>
        <h1 className="logo-text">TaskMaster</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-info">
            <p className="user-name">Admin User</p>
            <p className="user-role">Quản lý</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
