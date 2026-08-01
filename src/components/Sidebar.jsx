import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Kanban, Calendar, FolderKanban, History, LogOut, X, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất', error);
    }
  };

  const navItems = [
    { name: 'Tổng quan', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Dự án', path: '/projects', icon: <FolderKanban size={20} /> },
    { name: 'Danh sách', path: '/todo', icon: <CheckSquare size={20} /> },
    { name: 'Bảng Kanban', path: '/kanban', icon: <Kanban size={20} /> },
    { name: 'Lịch làm việc', path: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Lịch sử', path: '/history', icon: <History size={20} /> },
    { name: 'Hướng dẫn', path: '/guide', icon: <BookOpen size={20} /> },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="logo-icon">
            <CheckSquare size={24} color="#ffffff" />
          </div>
          <h1 className="logo-text">TaskMaster</h1>
        </div>
        <button className="mobile-close-btn" onClick={closeSidebar}>
          <X size={24} />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (window.innerWidth <= 768) closeSidebar();
                }}
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
          <div className="avatar">{currentUser?.email?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="user-info">
            <p className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{currentUser?.email || 'Người dùng'}</p>
            <p className="user-role">Tác giả: Man Nguyen</p>
          </div>
          <button className="btn-icon-small" onClick={handleLogout} title="Đăng xuất" style={{ marginLeft: 'auto', color: 'var(--status-danger)' }}>
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
